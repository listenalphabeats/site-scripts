import { conditionalCookieBanner, setSubmitBtnsDisabledAttr } from './features'

export * from './utils'
export * from './features'
export * from './product-page'

conditionalCookieBanner()

document.addEventListener('DOMContentLoaded', () => {
  setSubmitBtnsDisabledAttr(true)
})
