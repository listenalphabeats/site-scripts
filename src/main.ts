import { conditionalCookieBanner } from './features'
import { getPartnerNameInStorage, guardCioFormsWithRecaptcha } from './utils'

export * from './utils'
export * from './features'
export * from './product-page'

conditionalCookieBanner()
guardCioFormsWithRecaptcha()

document.addEventListener('DOMContentLoaded', () => {
  if (getPartnerNameInStorage()) {
    return
  }

  /**
   * No popup during Black Friday.
   * Uncomment/cleanup next.
   */
  // runAfterConsentResolved({
  //   callback: handleNewsletterDiscountPopup,
  //   fallback: handleNewsletterDiscountPopup,
  //   timeout: 4000,
  // })
})
