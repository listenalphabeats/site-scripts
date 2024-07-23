import { RewardfulBrowserCookie } from '../types'
import { getCookie } from '../utils'
import { getNewsletterDiscountParams } from './utils'

const titlePriceDiv = document.getElementById('title-price')
const strikedSpan = titlePriceDiv?.querySelector('span')
const yearBundleDiv = document.getElementById('year-bundle-price')
const monthBundleDiv = document.getElementById('month-bundle-price')

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

function upTitlePrice(strikedAfter, currentAfter) {
  if (!titlePriceDiv) return
  if (strikedSpan) {
    strikedSpan.textContent = `$${strikedAfter.toFixed(2)}`
  }
  titlePriceDiv.childNodes[1].nodeValue = ` $${currentAfter.toFixed(2)}`
}

function upYearBundlePrice(oldPrice, newPrice) {
  if (yearBundleDiv) {
    yearBundleDiv.innerHTML = `1-Year bundle - <span class="text-style-strikethrough text-color-neutral-82 text-weight-normal">$${oldPrice.toFixed(
      2
    )}</span> $${newPrice.toFixed(2)}`
  }
}

function upMonthBundlePrice(oldPrice, newPrice) {
  if (monthBundleDiv) {
    monthBundleDiv.innerHTML = `1-Month bundle - <span class="text-style-strikethrough text-color-neutral-82 text-weight-normal">$${oldPrice.toFixed(
      2
    )}</span> $${newPrice.toFixed(2)}`
  }
}

export function discountPricing() {
  const before = parsePageCurrentPrice()
  const newsletterDiscountParams = getNewsletterDiscountParams()
  const rewardful = getCookie<RewardfulBrowserCookie>('rewardful.referral')

  let amountOff = 0
  let percentOff = 0
  if (newsletterDiscountParams) {
    const params = new URLSearchParams(newsletterDiscountParams)
    percentOff = Number(params.get('percentOff') || 0)
  } else if (rewardful?.coupon) {
    if (rewardful.coupon.amount_off) {
      amountOff = rewardful.coupon.amount_off
    } else if (rewardful.coupon.percent_off) {
      percentOff = rewardful.coupon.percent_off
    }
  }

  if (amountOff) {
    upTitlePrice(before.titleCurrentPrice, before.titleCurrentPrice - amountOff)
    upYearBundlePrice(
      before.yearBundlePrice,
      before.yearBundlePrice - amountOff
    )
    upMonthBundlePrice(
      before.monthBundlePrice,
      before.monthBundlePrice - amountOff
    )
  } else if (percentOff) {
    upTitlePrice(
      before.titleCurrentPrice,
      before.titleCurrentPrice * (1 - percentOff / 100)
    )
    upYearBundlePrice(
      before.yearBundlePrice,
      before.yearBundlePrice * (1 - percentOff / 100)
    )
    upMonthBundlePrice(
      before.monthBundlePrice,
      before.monthBundlePrice * (1 - percentOff / 100)
    )
  }
}

discountPricing()
