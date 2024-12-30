import { CES_DISCOUNT_OFFER } from '../config'
import { redirectWithParams } from '../utils'

/** @deprecated in favor of inline JS in webflow-site/partners-page-before-closing-body.html */
export function redirectAmazeToProduct() {
  if (window.location.pathname === '/partners/amaze') {
    redirectWithParams({
      path: '/product',
      searchParams: new URLSearchParams({
        offer: CES_DISCOUNT_OFFER,
        tabIndex: '1',
      }),
    })
  }
}
