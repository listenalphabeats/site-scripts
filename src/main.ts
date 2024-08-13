import { conditionalCookieBanner } from './features'
import { guardCioFormsWithRecaptcha } from './utils'

export * from './utils'
export * from './features'
export * from './product-page'

conditionalCookieBanner()
guardCioFormsWithRecaptcha()
