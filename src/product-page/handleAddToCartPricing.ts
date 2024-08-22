import { getNewsletterDiscountParams } from '../utils'

export function handleAddToCartPricing() {
  const SIGN_UP_BASIC_URL = 'https://accounts.listenalphabeats.com/sign-up'

  let plan = 'YEARLY'
  let paymentProvider = ''
  let includeBrainbit = true

  const elements = {
    annualButton: document.getElementById('plan-annual'),
    monthlyButton: document.getElementById('plan-monthly'),
    headbandYes: document.getElementById('headband-yes'),
    headbandNo: document.getElementById('headband-no'),
    paymentUpfront: document.getElementById('payment-upfront'),
    paymentKlarna: document.getElementById('payment-klarna'),
    annualFeatures: document.querySelectorAll('.annual-feature'),
    primaryButtonDesktop: document.getElementById(
      'product-buy-primary-btn'
    ) as HTMLAnchorElement | null,
  }

  function toggleActive(element, isActive) {
    element?.classList[isActive ? 'add' : 'remove']('active')
  }

  function toggleDisplay(element, display) {
    if (element) element.style.display = display ? 'flex' : 'none'
  }

  function updatePrimaryButtonUrl() {
    let url = `${SIGN_UP_BASIC_URL}?plan=${plan}`
    const newsletterDiscountParams = getNewsletterDiscountParams()

    if (newsletterDiscountParams) url += `&${newsletterDiscountParams}`
    if (paymentProvider) url += `&paymentProvider=${paymentProvider}`
    if (!includeBrainbit) url += '&includeBrainbit=false'

    if (elements.primaryButtonDesktop) elements.primaryButtonDesktop.href = url
  }

  function setPlan(isYearly) {
    plan = isYearly ? 'YEARLY' : 'MONTHLY'
    toggleActive(elements.annualButton, isYearly)
    toggleActive(elements.monthlyButton, !isYearly)
    elements.annualFeatures.forEach(el =>
      toggleDisplay(
        el,
        isYearly && (el !== elements.paymentKlarna || includeBrainbit)
      )
    )
    setPaymentUpfront()
  }

  function setBrainbit(included) {
    includeBrainbit = included
    toggleActive(elements.headbandYes, included)
    toggleActive(elements.headbandNo, !included)
    if (elements.paymentKlarna)
      toggleDisplay(elements.paymentKlarna, included && plan !== 'MONTHLY')
    setPaymentUpfront()
  }

  function setPaymentUpfront() {
    paymentProvider = ''
    toggleActive(elements.paymentUpfront, true)
    toggleActive(elements.paymentKlarna, false)
    updatePrimaryButtonUrl()
  }

  function setPaymentKlarna() {
    paymentProvider = 'klarna'
    toggleActive(elements.paymentUpfront, false)
    toggleActive(elements.paymentKlarna, true)
    updatePrimaryButtonUrl()
  }

  elements.annualButton?.addEventListener('click', () => setPlan(true))
  elements.monthlyButton?.addEventListener('click', () => setPlan(false))
  elements.headbandYes?.addEventListener('click', () => setBrainbit(true))
  elements.headbandNo?.addEventListener('click', () => setBrainbit(false))
  elements.paymentUpfront?.addEventListener('click', setPaymentUpfront)
  elements.paymentKlarna?.addEventListener('click', setPaymentKlarna)

  updatePrimaryButtonUrl()
}
