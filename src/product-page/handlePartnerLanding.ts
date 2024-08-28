import { isStaging, PARTNERS_PATH, setPartnerNameInStorage } from '../utils'

export function handlePartnerLanding() {
  type PartnerAttrs = {
    discountName: string
    couponId: string
    amountOff: string
  }

  const partners: Record<string, PartnerAttrs> = {
    amaze: {
      discountName: 'Amaze Creator Bundle discount',
      couponId: isStaging() ? 'YiM3PNXT' : 'Gu2jGXBe',
      amountOff: '199',
    },
  }

  if (!window.location.pathname.includes(`/${PARTNERS_PATH}/`)) return

  type HtmlEl = HTMLAnchorElement | null

  const paymentUpfrontEl = document.getElementById('payment-upfront') as HtmlEl
  const paymentKlarnaEl = document.getElementById('payment-klarna') as HtmlEl
  const primaryCtaBtn = document.getElementById(
    'product-buy-primary-btn'
  ) as HtmlEl

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
      ['amountOff', partnerAttrs.amountOff],
      ['discountName', partnerAttrs.discountName],
    ])
    if (paymentProvider) params.append('paymentProvider', paymentProvider)
    if (primaryCtaBtn) primaryCtaBtn.href = `${url}?${params}`
  }

  function setPaymentUpfront() {
    paymentProvider = ''
    toggleActive(paymentUpfrontEl, true)
    toggleActive(paymentKlarnaEl, false)
    updatePrimaryButtonUrl()
  }

  function setPaymentKlarna() {
    paymentProvider = 'klarna'
    toggleActive(paymentUpfrontEl, false)
    toggleActive(paymentKlarnaEl, true)
    updatePrimaryButtonUrl()
  }

  paymentUpfrontEl?.addEventListener('click', setPaymentUpfront)
  paymentKlarnaEl?.addEventListener('click', setPaymentKlarna)

  updatePrimaryButtonUrl()
}
