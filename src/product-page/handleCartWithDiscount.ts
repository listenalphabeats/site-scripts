import { BrowserCookies, RewardfulBrowserCookie } from '../types'
import {
  getCookie,
  getNewsletterDiscountParams,
  getPartnerNameInStorage,
  isStaging,
  redirectToPartnerPage,
} from '../utils'

/** @deprecated */
export function handleCartWithDiscount() {
  const partner = getPartnerNameInStorage()
  if (partner) {
    redirectToPartnerPage(partner)
    return
  }

  /** Wait for Rewardful cookie */
  setTimeout(() => {
    updatePrices()
    applyDiscountFn()
    handleCartChange()
  }, 200)

  const pricing = {
    annual: { price: 149, strikedPrice: 149 },
    monthly: { price: 15.99, strikedPrice: 15.99 },
    brainbit: {
      annual: { price: 449, strikedPrice: 449 },
      monthly: { price: 499, strikedPrice: 499 },
    },
  }

  type HtmlAEl = HTMLAnchorElement | null

  const elements = {
    annualButton: document.getElementById('plan-annual') as HtmlAEl,
    monthlyButton: document.getElementById('plan-monthly') as HtmlAEl,
    headbandYes: document.getElementById('headband-yes') as HtmlAEl,
    headbandNo: document.getElementById('headband-no') as HtmlAEl,
    paymentUpfront: document.getElementById('payment-upfront') as HtmlAEl,
    paymentKlarna: document.getElementById('payment-klarna') as HtmlAEl,
    annualFeatures: document.querySelectorAll('.annual-feature'),
    primaryButtonDesktop: document.getElementById(
      'product-buy-primary-btn'
    ) as HtmlAEl,
  }

  function updatePrice(div: HtmlAEl, strikedPrice: number, price: number) {
    if (!div) return
    const strikedPriceDiv = div.querySelector(
      '.price-strikethrough'
    ) as HTMLDivElement | null
    const priceDiv = div.querySelector('.price') as HTMLDivElement | null

    if (strikedPriceDiv) {
      strikedPriceDiv.innerText = '$' + strikedPrice.toFixed(2)
      strikedPriceDiv.style.display = strikedPrice === price ? 'none' : 'block'
    }

    if (priceDiv) priceDiv.innerText = '$' + price.toFixed(2)
  }

  function updatePrices() {
    updatePrice(
      elements.annualButton,
      pricing.annual.strikedPrice,
      pricing.annual.price
    )
    updatePrice(
      elements.monthlyButton,
      pricing.monthly.strikedPrice,
      pricing.monthly.price
    )
    updatePrice(
      elements.headbandYes,
      pricing.brainbit.annual.strikedPrice,
      pricing.brainbit.annual.price
    )
  }

  function applyDiscountFn() {
    const discountBadgeDiv = document.getElementById('discount-badge')
    const discountBadgeTitleDiv = document.getElementById(
      'discount-badge-title'
    )

    function showDiscountBadge(discountName: string) {
      discountBadgeDiv?.setAttribute('style', 'display: flex;')
      if (discountBadgeTitleDiv) {
        discountBadgeTitleDiv.textContent = discountName
      }
    }
    const rewardful = getCookie<RewardfulBrowserCookie>(
      BrowserCookies.RewardfulReferral
    )
    const newsletterParams = getNewsletterDiscountParams()
    const newsletterPercentOff = Number(
      new URLSearchParams(newsletterParams || '').get('percentOff') || 0
    )
    const newsletterAmountOff = Number(
      new URLSearchParams(newsletterParams || '').get('amountOff') || 0
    )
    const rewardfulPercentOff = rewardful?.coupon?.percent_off || 0
    const rewardfulAmountOff = rewardful?.coupon?.amount_off || 0
    const newsletterDiscount =
      pricing.annual.price * (newsletterPercentOff / 100)
    const rewardfulDiscount = pricing.annual.price * (rewardfulPercentOff / 100)
    const maxDiscount = Math.max(
      newsletterDiscount,
      rewardfulDiscount,
      newsletterAmountOff,
      rewardfulAmountOff
    )

    if (maxDiscount === 0) return

    let discountBadgeTitle = ''
    if (rewardfulAmountOff === maxDiscount) {
      discountBadgeTitle = rewardful?.coupon?.name || ''
    } else if (newsletterAmountOff === maxDiscount) {
      const discountName = new URLSearchParams(newsletterParams || '').get(
        'discountName'
      )
      discountBadgeTitle = discountName || ''
      /** Handle `$25 Off Annual Plan` discount */
      pricing.annual.price -= newsletterAmountOff
      updatePrice(
        elements.annualButton,
        pricing.annual.strikedPrice,
        pricing.annual.price
      )
    } else {
      const discountName =
        (newsletterPercentOff > rewardfulPercentOff
          ? new URLSearchParams(newsletterParams || '').get('discountName')
          : rewardful?.coupon?.name) || 'Discount'

      discountBadgeTitle = discountName

      const multiplier =
        1 - Math.max(newsletterPercentOff, rewardfulPercentOff) / 100

      pricing.annual.price *= multiplier
      pricing.monthly.price *= multiplier
      pricing.brainbit.annual.price *= multiplier
      pricing.brainbit.monthly.price *= multiplier
      updatePrices()
    }

    showDiscountBadge(discountBadgeTitle)
  }

  function handleCartChange() {
    const SIGN_UP_BASIC_URL = isStaging()
      ? 'https://accounts.development.listenalphabeats.nl/sign-up'
      : 'https://accounts.listenalphabeats.com/sign-up'

    let plan = 'YEARLY'
    let paymentProvider = ''
    let includeBrainbit = true

    function toggleActive(element, isActive) {
      element?.classList[isActive ? 'add' : 'remove']('active')
    }

    function toggleDisplay(element, display) {
      if (element) element.style.display = display ? 'flex' : 'none'
    }

    function updatePrimaryButtonUrl() {
      let url = `${SIGN_UP_BASIC_URL}?plan=${plan}`
      const newsletterDiscountParams = getNewsletterDiscountParams()

      if (newsletterDiscountParams && plan === 'YEARLY')
        url += `&${newsletterDiscountParams}`
      if (paymentProvider) url += `&paymentProvider=${paymentProvider}`
      if (!includeBrainbit) url += '&includeBrainbit=false'

      if (elements.primaryButtonDesktop)
        elements.primaryButtonDesktop.href = url
    }

    function setPlan(isYearly) {
      plan = isYearly ? 'YEARLY' : 'MONTHLY'
      toggleActive(elements.annualButton, isYearly)
      toggleActive(elements.monthlyButton, !isYearly)
      elements.annualFeatures.forEach(el =>
        toggleDisplay(
          el,
          isYearly && (el !== elements.paymentKlarna || includeBrainbit)
        )
      )
      setPaymentUpfront()

      if (isYearly) {
        updatePrice(
          elements.headbandYes,
          pricing.brainbit.annual.strikedPrice,
          pricing.brainbit.annual.price
        )
      } else {
        updatePrice(
          elements.headbandYes,
          pricing.brainbit.monthly.strikedPrice,
          pricing.brainbit.monthly.price
        )
      }
    }

    function setBrainbit(included) {
      includeBrainbit = included
      toggleActive(elements.headbandYes, included)
      toggleActive(elements.headbandNo, !included)
      if (elements.paymentKlarna)
        toggleDisplay(elements.paymentKlarna, included && plan !== 'MONTHLY')
      setPaymentUpfront()
    }

    function setPaymentUpfront() {
      paymentProvider = ''
      toggleActive(elements.paymentUpfront, true)
      toggleActive(elements.paymentKlarna, false)
      updatePrimaryButtonUrl()
    }

    function setPaymentKlarna() {
      paymentProvider = 'klarna'
      toggleActive(elements.paymentUpfront, false)
      toggleActive(elements.paymentKlarna, true)
      updatePrimaryButtonUrl()
    }

    elements.annualButton?.addEventListener('click', () => setPlan(true))
    elements.monthlyButton?.addEventListener('click', () => setPlan(false))
    elements.headbandYes?.addEventListener('click', () => setBrainbit(true))
    elements.headbandNo?.addEventListener('click', () => setBrainbit(false))
    elements.paymentUpfront?.addEventListener('click', setPaymentUpfront)
    elements.paymentKlarna?.addEventListener('click', setPaymentKlarna)

    updatePrimaryButtonUrl()
  }
}
