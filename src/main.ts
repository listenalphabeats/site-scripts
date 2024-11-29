import { conditionalCookieBanner } from './features'
import { guardCioFormsWithRecaptcha } from './utils'

export * from './utils'
export * from './features'
export * from './product-page'
export * from './muse-page'
conditionalCookieBanner()
guardCioFormsWithRecaptcha()

document.addEventListener('DOMContentLoaded', () => {
  /**
   * No popup during Black Friday.
   * Uncomment/cleanup next.
   */
  // if (!getPartnerNameInStorage()) {
  // runAfterConsentResolved({
  //   callback: handleNewsletterDiscountPopup,
  //   fallback: handleNewsletterDiscountPopup,
  //   timeout: 4000,
  // })
  // }
})
