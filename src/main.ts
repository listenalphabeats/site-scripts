import {
  conditionalCookieBanner,
  handleNewsletterDiscountPopup,
  setSubmitBtnsDisabledAttr,
} from './features'
import { runAfterConsentResolved } from './utils'

export * from './utils'
export * from './features'
export * from './product-page'

/** As no disabled buttons by default from Webflow */
window.addEventListener('load', () => {
  setSubmitBtnsDisabledAttr(true)
})

conditionalCookieBanner()

document.addEventListener('DOMContentLoaded', () => {
  setSubmitBtnsDisabledAttr(true)
  runAfterConsentResolved({
    callback: handleNewsletterDiscountPopup,
    fallback: handleNewsletterDiscountPopup,
    timeout: 18000,
  })
})
