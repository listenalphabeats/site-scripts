export function getNewsletterDiscountParams() {
  return window.NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID
    ? localStorage.getItem(window.NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID)
    : undefined
}
