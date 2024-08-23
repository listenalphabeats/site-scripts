import { BrowserCookies, RewardfulBrowserCookie } from '../types'
import { getCookie, getNewsletterDiscountParams } from '../utils'

/** @deprecated */
export function handleDiscount() {
  /** Wait for Rewardful cookie */
  setTimeout(() => handleDiscountFn(), 400)

  function handleDiscountFn() {
    const discountBadgeDiv = document.getElementById('discount-badge')
    const discountBadgeTitle = document.getElementById('discount-badge-title')
    const annualDiv = document.getElementById(
      'plan-annual'
    ) as HTMLAnchorElement | null
    const monthlyDiv = document.getElementById(
      'plan-monthly'
    ) as HTMLAnchorElement | null

    /** HELPERS =============================================== */
    function parsePageCurrentPrice() {
      const annualPrice = Number(
        annualDiv?.querySelector('.price')?.textContent?.replace('$', '') ||
          '149'
      )
      const monthlyPrice = Number(
        monthlyDiv?.querySelector('.price')?.textContent?.replace('$', '') ||
          '15.99'
      )
      return { annualPrice, monthlyPrice }
    }

    function updatePrice(
      oldPrice: number,
      newPrice: number,
      div: HTMLAnchorElement | null
    ) {
      if (!div || newPrice === oldPrice) return
      const strikedPriceDiv = div.querySelector(
        '.price-strikethrough'
      ) as HTMLDivElement | null
      const priceDiv = div.querySelector('.price') as HTMLDivElement | null
      if (strikedPriceDiv) {
        strikedPriceDiv.innerText = `$${oldPrice.toFixed(2)}`
        strikedPriceDiv.style.display = 'block'
      }
      if (priceDiv) {
        priceDiv.innerText = '$' + newPrice.toFixed(2)
        priceDiv.style.display = 'block'
      }
    }

    function applyPlanDiscount(
      before: ReturnType<typeof parsePageCurrentPrice>,
      value,
      isPercentage = false
    ) {
      if (isPercentage) {
        updatePrice(before.annualPrice, before.annualPrice * value, annualDiv)
        updatePrice(
          before.monthlyPrice,
          before.monthlyPrice * value,
          monthlyDiv
        )
      } else {
        updatePrice(before.annualPrice, before.annualPrice - value, annualDiv)
        updatePrice(
          before.monthlyPrice,
          before.monthlyPrice - value,
          monthlyDiv
        )
      }
    }

    function applyHeadbandDiscount(value, isPercentage = false) {
      const currentPriceDiv = document.querySelector(
        '#headband-yes .price'
      ) as HTMLDivElement | null
      if (!currentPriceDiv) return
      const priceBefore = Number(
        currentPriceDiv.textContent?.replace('$', '') || '449'
      )
      const newPrice = isPercentage ? priceBefore * value : priceBefore - value
      currentPriceDiv.innerText = '$' + newPrice.toFixed(2)

      const strikedPriceDiv = document.querySelector(
        '#headband-yes .text-style-strikethrough'
      ) as HTMLDivElement | null

      if (!strikedPriceDiv) return
      const before = Number(
        strikedPriceDiv.textContent?.replace('$', '') || '499'
      )

      const newStrikedPrice = isPercentage ? before * value : before - value

      strikedPriceDiv.innerText = '$' + newStrikedPrice.toFixed(2)
    }

    function showDiscountBadge(discountName) {
      discountBadgeDiv?.setAttribute('style', 'display: flex;')
      if (discountBadgeTitle) {
        discountBadgeTitle.textContent = discountName
      }
    }

    /** MAIN CODE ===================================================== */
    const before = parsePageCurrentPrice()
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

    const newsletterDiscount = before.annualPrice * (newsletterPercentOff / 100)
    const rewardfulDiscount = before.annualPrice * (rewardfulPercentOff / 100)

    const maxDiscount = Math.max(
      newsletterDiscount,
      rewardfulDiscount,
      newsletterAmountOff,
      rewardfulAmountOff
    )

    if (maxDiscount === 0) return

    if (rewardfulAmountOff === maxDiscount) {
      applyPlanDiscount(before, rewardfulAmountOff)
      showDiscountBadge(rewardful?.coupon?.name || '')
      applyHeadbandDiscount(rewardfulAmountOff)
    } else if (newsletterAmountOff === maxDiscount) {
      applyPlanDiscount(before, newsletterAmountOff)
      const discountName = new URLSearchParams(newsletterParams || '').get(
        'discountName'
      )
      applyHeadbandDiscount(newsletterAmountOff)
      showDiscountBadge(discountName)
    } else {
      const discountMultiplier =
        1 - Math.max(newsletterPercentOff, rewardfulPercentOff) / 100
      applyPlanDiscount(before, discountMultiplier, true)
      applyHeadbandDiscount(discountMultiplier, true)
      const discountName =
        (newsletterPercentOff > rewardfulPercentOff
          ? new URLSearchParams(newsletterParams || '').get('discountName')
          : rewardful?.coupon?.name) || 'Discount'
      showDiscountBadge(discountName)
    }
  }
}
