import {
  conditionalCookieBanner,
  handleNewsletterDiscountPopup,
} from './features'
import {
  getPartnerNameInStorage,
  guardCioFormsWithRecaptcha,
  runAfterConsentResolved,
} from './utils'

export * from './utils'
export * from './features'
export * from './product-page'

conditionalCookieBanner()
guardCioFormsWithRecaptcha()

document.addEventListener('DOMContentLoaded', () => {
  if (getPartnerNameInStorage()) {
    return
  }

  runAfterConsentResolved({
    callback: handleNewsletterDiscountPopup,
    fallback: handleNewsletterDiscountPopup,
    timeout: 4000,
  })
})
