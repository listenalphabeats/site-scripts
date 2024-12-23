import {
  conditionalCookieBanner,
  handleNewsletterDiscountPopup,
} from './features'
import { guardCioFormsWithRecaptcha, runAfterConsentResolved } from './utils'

export * from './utils'
export * from './features'
export * from './product-page'
export * from './muse-page'
export * from './partners-page'

conditionalCookieBanner()
guardCioFormsWithRecaptcha()

document.addEventListener('DOMContentLoaded', () => {
  runAfterConsentResolved({
    callback: handleNewsletterDiscountPopup,
    fallback: handleNewsletterDiscountPopup,
    timeout: 4000,
  })
})
