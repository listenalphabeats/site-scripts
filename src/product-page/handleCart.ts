import {
  CES_DISCOUNT_OFFER,
  MUSE_IN_BOX_TRIAL_SEARCH_PARAM,
  OFFER_GENERIC_SEARCH_PARAM,
} from '../config'
import { getBrainbitCESOffer, getMuseCESOffer } from '../offers'
import { BundleType } from '../types'
import { getSearchParam, isStaging } from '../utils'
import { parsePriceValue } from './utils'
import { showCESOfferBadges } from './utils/showCESOfferBadges'

export function handleCart() {
  type HtmlAEl = HTMLAnchorElement | null

  const elements = {
    imageSetDefault: document.getElementById(
      'default-product-image-carousel'
    ) as HtmlAEl,
    imageSetMuse: document.getElementById(
      BundleType.MUSE + '-product-image-carousel'
    ) as HtmlAEl,
    imageSetBrainbit: document.getElementById(
      BundleType.BRAINBIT + '-product-image-carousel'
    ) as HtmlAEl,

    subscriptionOnly: document.getElementById(
      BundleType.SUBSCRIPTION_ONLY
    ) as HtmlAEl,
    subscriptionOnlyMonthly: document.getElementById(
      BundleType.SUBSCRIPTION_ONLY + '-monthly'
    ) as HtmlAEl,
    bundleMuse: document.getElementById('bundle-' + BundleType.MUSE) as HtmlAEl,
    bundleBrainbit: document.getElementById(
      'bundle-' + BundleType.BRAINBIT
    ) as HtmlAEl,
    paymentUpfront: document.getElementById('payment-upfront') as HtmlAEl,
    paymentKlarna: document.getElementById('payment-klarna') as HtmlAEl,

    primaryBuyButton: document.getElementById(
      'product-buy-primary-btn'
    ) as HtmlAEl,
  }

  function setActive(element, isActive) {
    element?.classList[isActive ? 'add' : 'remove']('active')
  }

  function setDisplay(element, display) {
    if (element) element.style.display = display ? 'flex' : 'none'
  }

  const isCESOffer =
    getSearchParam('offer') === CES_DISCOUNT_OFFER ||
    getSearchParam('offer') === OFFER_GENERIC_SEARCH_PARAM

  const noDiscountProps = {
    discountName: '',
    amountOff: 0,
    couponId: '',
  }

  const bundles = {
    [BundleType.SUBSCRIPTION_ONLY]: noDiscountProps,
    [BundleType.SUBSCRIPTION_ONLY + '-monthly']: noDiscountProps,
    [BundleType.MUSE]: isCESOffer ? getMuseCESOffer() : noDiscountProps,
    [BundleType.BRAINBIT]: isCESOffer ? getBrainbitCESOffer() : noDiscountProps,
  }

  function handleMuseInBoxBadge() {
    const requestParams = new URLSearchParams(window.location.search)
    if (!requestParams.has(MUSE_IN_BOX_TRIAL_SEARCH_PARAM)) return
    const badgeAnnualSubDefault = document.getElementById(
      'badge-annual-sub-offer'
    )
    const badgeAnnualSubMonthTrial = document.getElementById(
      'badge-annual-sub-month-trial'
    )

    setDisplay(badgeAnnualSubDefault, false)
    setDisplay(badgeAnnualSubMonthTrial, true)
  }

  function handleCartChange() {
    let bundleType = BundleType.SUBSCRIPTION_ONLY
    let plan = 'YEARLY'
    let paymentProvider = ''

    function updatePrimaryButtonUrl() {
      const url = isStaging()
        ? 'https://accounts.development.listenalphabeats.nl/sign-up'
        : 'https://accounts.listenalphabeats.com/sign-up'

      let params = new URLSearchParams([
        ['bundleType', bundleType],
        ['plan', plan],
      ])

      if (paymentProvider) params.append('paymentProvider', paymentProvider)

      if (plan === 'YEARLY') {
        const { discountName, amountOff, couponId } = bundles[bundleType]
        if (discountName) params.append('discountName', discountName)
        if (amountOff) params.append('amountOff', String(amountOff))
        if (couponId) params.append('couponId', couponId)

        if (bundleType === BundleType.SUBSCRIPTION_ONLY) {
          params.append('trialBadge', '7-day free trial included')
        }

        /** Handle Muse In Box 1m Trial */
        const requestParams = new URLSearchParams(window.location.search)
        if (
          bundleType === BundleType.SUBSCRIPTION_ONLY &&
          requestParams.has(MUSE_IN_BOX_TRIAL_SEARCH_PARAM)
        ) {
          params.set('bundleType', BundleType.MUSE_IN_BOX)
          params.set('trialBadge', 'Muse 1-month free trial included')
        }
      }

      if (elements.primaryBuyButton) {
        elements.primaryBuyButton.href = `${url}?${params}`
      }
    }

    function setSubscriptionOnly() {
      bundleType = BundleType.SUBSCRIPTION_ONLY
      plan = 'YEARLY'

      setDisplay(elements.imageSetDefault, true)
      setDisplay(elements.imageSetMuse, false)
      setDisplay(elements.imageSetBrainbit, false)

      paymentProvider = ''
      setDisplay(elements.paymentKlarna, false)
      setPaymentUpfront()

      setActive(elements.subscriptionOnly, true)
      setActive(elements.subscriptionOnlyMonthly, false)
      setActive(elements.bundleBrainbit, false)
      setActive(elements.bundleMuse, false)
      updatePrimaryButtonUrl()
    }

    function setSubscriptionOnlyMonthly() {
      bundleType = BundleType.SUBSCRIPTION_ONLY
      plan = 'MONTHLY'

      setDisplay(elements.imageSetDefault, true)
      setDisplay(elements.imageSetMuse, false)
      setDisplay(elements.imageSetBrainbit, false)

      paymentProvider = ''
      setDisplay(elements.paymentKlarna, false)
      setPaymentUpfront()

      setActive(elements.subscriptionOnly, false)
      setActive(elements.subscriptionOnlyMonthly, true)
      setActive(elements.bundleBrainbit, false)
      setActive(elements.bundleMuse, false)
      updatePrimaryButtonUrl()
    }

    function setBundleMuse() {
      bundleType = BundleType.MUSE
      plan = 'YEARLY'
      setDisplay(elements.paymentKlarna, true)

      setDisplay(elements.imageSetDefault, false)
      setDisplay(elements.imageSetMuse, true)
      setDisplay(elements.imageSetBrainbit, false)

      setActive(elements.subscriptionOnly, false)
      setActive(elements.subscriptionOnlyMonthly, false)
      setActive(elements.bundleBrainbit, false)
      setActive(elements.bundleMuse, true)
      updatePrimaryButtonUrl()
    }

    function setBundleBrainbit() {
      bundleType = BundleType.BRAINBIT
      plan = 'YEARLY'
      setDisplay(elements.paymentKlarna, true)

      setDisplay(elements.imageSetDefault, false)
      setDisplay(elements.imageSetMuse, false)
      setDisplay(elements.imageSetBrainbit, true)

      setActive(elements.subscriptionOnly, false)
      setActive(elements.subscriptionOnlyMonthly, false)
      setActive(elements.bundleBrainbit, true)
      setActive(elements.bundleMuse, false)
      updatePrimaryButtonUrl()
    }

    function setPaymentUpfront() {
      paymentProvider = ''
      setActive(elements.paymentUpfront, true)
      setActive(elements.paymentKlarna, false)
      updatePrimaryButtonUrl()
    }

    function setPaymentKlarna() {
      paymentProvider = 'klarna'
      setActive(elements.paymentUpfront, false)
      setActive(elements.paymentKlarna, true)
      updatePrimaryButtonUrl()
    }

    elements.subscriptionOnly?.addEventListener('click', setSubscriptionOnly)
    elements.subscriptionOnlyMonthly?.addEventListener(
      'click',
      setSubscriptionOnlyMonthly
    )
    elements.bundleMuse?.addEventListener('click', setBundleMuse)
    elements.bundleBrainbit?.addEventListener('click', setBundleBrainbit)

    elements.paymentUpfront?.addEventListener('click', setPaymentUpfront)
    elements.paymentKlarna?.addEventListener('click', setPaymentKlarna)

    if (isCESOffer) {
      setBundleMuse()
    } else {
      setSubscriptionOnly()
    }

    updatePrimaryButtonUrl()
  }

  handleCartChange()
  handleMuseInBoxBadge()

  if (isCESOffer) {
    showCESOfferBadges()
    const museOrigPriceElement = elements.bundleMuse?.querySelector(
      '.price.text-style-strikethrough'
    )

    const museOrigPrice =
      museOrigPriceElement && parsePriceValue(museOrigPriceElement)

    if (museOrigPrice) {
      const museOfferPrice = museOrigPrice - getMuseCESOffer().amountOff

      const musePriceToPayElement =
        elements.bundleMuse?.querySelector('.price.to-pay')

      if (musePriceToPayElement) {
        musePriceToPayElement.textContent = `$${museOfferPrice}`
        setDisplay(museOrigPriceElement, true)
      }
    }

    const brainbitOrigPriceElement = elements.bundleBrainbit?.querySelector(
      '.price.text-style-strikethrough'
    )

    const brainbitOrigPrice =
      brainbitOrigPriceElement && parsePriceValue(brainbitOrigPriceElement)

    if (brainbitOrigPrice) {
      const brainbitOfferPrice =
        brainbitOrigPrice - getBrainbitCESOffer().amountOff

      const brainbitPriceToPayElement =
        elements.bundleBrainbit?.querySelector('.price.to-pay')

      if (brainbitPriceToPayElement) {
        brainbitPriceToPayElement.textContent = `$${brainbitOfferPrice}`
        setDisplay(brainbitOrigPriceElement, true)
      }
    }
  }
}
