import { BrowserCookies, RewardfulBrowserCookie } from '../types'
import { getCookie, getNewsletterDiscountParams } from '../utils'

export function handleDiscount() {
  /** Wait for Rewardful cookie */
  setTimeout(() => handleDiscountFn(), 400)
}

function handleDiscountFn() {
  const titlePriceDiv = document.getElementById('title-price')
  const discountBadgeDiv = document.getElementById('discount-badge')
  const discountBadgeTitle = document.getElementById('discount-badge-title')
  const strikedSpan = titlePriceDiv?.querySelector('span')
  const titlePriceDivMob = document.getElementById('title-price-mob')
  const strikedSpanMob = titlePriceDivMob?.querySelector('span')
  const yearBundleDiv = document.getElementById('year-bundle-price')
  const monthBundleDiv = document.getElementById('month-bundle-price')

  /** HELPERS =============================================== */
  function parsePageCurrentPrice() {
    const titleStrikedPrice = parseFloat(
      strikedSpan?.textContent?.replace('$', '') || '689'
    )
    const titleCurrentPrice = parseFloat(
      titlePriceDiv?.childNodes?.[1].nodeValue?.trim().replace('$', '') || '499'
    )
    const yearBundlePrice = parseFloat(
      yearBundleDiv?.textContent?.split('$')[1] || '499'
    )
    const monthBundlePrice = parseFloat(
      monthBundleDiv?.textContent?.split('$')[1] || '365.99'
    )

    return {
      titleStrikedPrice,
      titleCurrentPrice,
      yearBundlePrice,
      monthBundlePrice,
    }
  }

  function updateBundlePriceHtml(oldPrice, newPrice, div) {
    if (div) {
      const originalText = div.textContent
      if (originalText) {
        div.innerHTML = originalText.replace(
          /\$[0-9,.]+/,
          `<span class="text-style-strikethrough text-color-neutral-82 text-weight-normal">$${oldPrice.toFixed(
            2
          )}</span> $${newPrice.toFixed(2)}`
        )
      }
    }
  }

  function upTitlePrice(strikedAfter, currentAfter) {
    if (titlePriceDiv) {
      if (strikedSpan) {
        strikedSpan.textContent = `$${strikedAfter.toFixed(2)}`
      }
      titlePriceDiv.childNodes[1].nodeValue = ` $${currentAfter.toFixed(2)}`
    }
    if (titlePriceDivMob) {
      if (strikedSpanMob) {
        strikedSpanMob.textContent = `$${strikedAfter.toFixed(2)}`
      }
      titlePriceDivMob.childNodes[1].nodeValue = ` $${currentAfter.toFixed(2)}`
    }
  }

  function applyDiscount(before, value, isPercentage = false) {
    const titlePrice = before.titleCurrentPrice
    const yearPrice = before.yearBundlePrice
    const monthPrice = before.monthBundlePrice

    if (isPercentage) {
      upTitlePrice(titlePrice, titlePrice * value)
      updateBundlePriceHtml(yearPrice, yearPrice * value, yearBundleDiv)
      updateBundlePriceHtml(monthPrice, monthPrice * value, monthBundleDiv)
    } else {
      upTitlePrice(titlePrice, titlePrice - value)
      updateBundlePriceHtml(yearPrice, yearPrice - value, yearBundleDiv)
      updateBundlePriceHtml(monthPrice, monthPrice - value, monthBundleDiv)
    }
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

  const yearPrice = before.yearBundlePrice
  const newsletterDiscount = yearPrice * (newsletterPercentOff / 100)
  const rewardfulDiscount = yearPrice * (rewardfulPercentOff / 100)

  const maxDiscount = Math.max(
    newsletterDiscount,
    rewardfulDiscount,
    newsletterAmountOff,
    rewardfulAmountOff
  )

  if (maxDiscount === 0) return

  if (rewardfulAmountOff === maxDiscount) {
    applyDiscount(before, rewardfulAmountOff)
    discountBadgeDiv?.setAttribute('style', 'display: flex;')
    showDiscountBadge(rewardful?.coupon?.name || '')
  } else if (newsletterAmountOff === maxDiscount) {
    applyDiscount(before, newsletterAmountOff)
    const discountName = new URLSearchParams(newsletterParams || '').get(
      'discountName'
    )
    discountBadgeDiv?.setAttribute('style', 'display: flex;')
    showDiscountBadge(discountName)
  } else {
    const discountMultiplier =
      1 - Math.max(newsletterPercentOff, rewardfulPercentOff) / 100
    applyDiscount(before, discountMultiplier, true)
    const discountName =
      (newsletterPercentOff > rewardfulPercentOff
        ? new URLSearchParams(newsletterParams || '').get('discountName')
        : rewardful?.coupon?.name) || 'Discount'
    showDiscountBadge(discountName)
  }
}
