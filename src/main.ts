import {
  conditionalCookieBanner,
  handleNewsletterDiscountPopup,
} from './features'
import { protectCIOFormsWithRecaptcha, runAfterConsentResolved } from './utils'

export * from './utils'
export * from './features'
export * from './product-page'

conditionalCookieBanner()
protectCIOFormsWithRecaptcha()

document.addEventListener('DOMContentLoaded', () => {
  runAfterConsentResolved({
    callback: handleNewsletterDiscountPopup,
    fallback: handleNewsletterDiscountPopup,
    timeout: 18000,
  })
})
