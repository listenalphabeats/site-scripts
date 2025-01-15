import {
  conditionalCookieBanner,
  handleNewsletterDiscountPopup,
} from './features'
import {
  guardCioFormsWithRecaptcha,
  handleInternalUserEnrollment,
  runAfterConsentResolved,
} from './utils'

export * from './utils'
export * from './features'
export * from './product-page'
export * from './muse-page'
export * from './partners-page'

conditionalCookieBanner()
guardCioFormsWithRecaptcha()
handleInternalUserEnrollment()

document.addEventListener('DOMContentLoaded', () => {
  runAfterConsentResolved({
    callback: handleNewsletterDiscountPopup,
    fallback: handleNewsletterDiscountPopup,
    timeout: 4000,
  })
})
