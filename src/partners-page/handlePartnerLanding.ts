import { isStaging, PARTNERS_PATH, setPartnerNameInStorage } from '../utils'

export function handlePartnerLanding() {
  type PartnerAttrs = {
    discountName: string
    couponId: string
    amountOff?: string
    percentOff?: string
  }

  const partners: Record<string, PartnerAttrs> = {
    usat: {
      discountName: 'USAT 15% Off',
      couponId: isStaging() ? 'pdSuKVbv' : 'cpvIXqMd',
      percentOff: '15',
    },
  }

  if (!window.location.pathname.includes(`/${PARTNERS_PATH}/`)) return

  const paymentUpfrontElements =
    document.querySelectorAll<HTMLAnchorElement>('#payment-upfront')
  const paymentKlarnaElements =
    document.querySelectorAll<HTMLAnchorElement>('#payment-klarna')
  const primaryCtaBtns = document.querySelectorAll<HTMLAnchorElement>(
    '#product-buy-primary-btn'
  )

  function initPartner() {
    const name = window.location.pathname.split(`/${PARTNERS_PATH}/`)[1]
    if (name) {
      setPartnerNameInStorage(name)
      return name
    }
    return undefined
  }

  function toggleActive(element, isActive) {
    element?.classList[isActive ? 'add' : 'remove']('active')
  }

  const partnerName = initPartner()

  if (!partnerName || !partners[partnerName]) return

  const partnerAttrs = partners[partnerName]
  let paymentProvider = ''

  function updatePrimaryButtonUrl() {
    if (!partnerName || !partners[partnerName]) return
    const url = isStaging()
      ? 'https://accounts.development.listenalphabeats.nl/sign-up'
      : 'https://accounts.listenalphabeats.com/sign-up'

    const params = new URLSearchParams([
      ['partner', partnerName],
      ['couponId', partnerAttrs.couponId],
      ['discountName', partnerAttrs.discountName],
    ])
    if (partnerAttrs.amountOff) {
      params.append('amountOff', partnerAttrs.amountOff)
    } else if (partnerAttrs.percentOff) {
      params.append('percentOff', partnerAttrs.percentOff)
    }
    if (paymentProvider) params.append('paymentProvider', paymentProvider)
    primaryCtaBtns.forEach(el => (el.href = `${url}?${params}`))
  }

  function setPaymentUpfront() {
    paymentProvider = ''
    paymentUpfrontElements.forEach(el => toggleActive(el, true))
    paymentKlarnaElements.forEach(el => toggleActive(el, false))
    updatePrimaryButtonUrl()
  }

  function setPaymentKlarna() {
    paymentProvider = 'klarna'
    paymentUpfrontElements.forEach(el => toggleActive(el, false))
    paymentKlarnaElements.forEach(el => toggleActive(el, true))
    updatePrimaryButtonUrl()
  }

  paymentUpfrontElements.forEach(el =>
    el.addEventListener('click', setPaymentUpfront)
  )
  paymentKlarnaElements.forEach(el =>
    el.addEventListener('click', setPaymentKlarna)
  )

  updatePrimaryButtonUrl()
}
