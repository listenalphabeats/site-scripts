import { getNewsletterDiscountParams } from '../utils'

export function handleAddToCartPricing() {
  const SIGN_UP_BASIC_URL = 'https://accounts.listenalphabeats.com/sign-up'

  let plan = 'YEARLY' // Yearly plan by default
  let paymentProvider = ''

  const annualButton = document.getElementById('plan-annual')
  const monthlyButton = document.getElementById('plan-monthly')

  const paymentUpfront = document.getElementById('payment-upfront')
  const paymentKlarna = document.getElementById('payment-klarna')

  const primaryButtonDesktop = document.getElementById(
    'product-buy-primary-btn'
  ) as HTMLAnchorElement | null
  const primaryButtonMobile = document.getElementById(
    'product-buy-primary-btn-mobile'
  ) as HTMLAnchorElement | null

  /** HELPERS =============================================== */
  function setPlanYearly() {
    plan = 'YEARLY'
    paymentProvider = ''
    monthlyButton?.classList.remove('active')
    annualButton?.classList.add('active')
    paymentKlarna?.classList.remove('disabled')
    selectUpfront()
    updatePrimaryButtonUrls()
  }
  function setPlanMonthly() {
    plan = 'MONTHLY'
    annualButton?.classList.remove('active')
    monthlyButton?.classList.add('active')
    paymentKlarna?.classList.add('disabled')
    selectUpfront()
    updatePrimaryButtonUrls()
  }
  function selectUpfront() {
    paymentProvider = ''
    paymentKlarna?.classList.remove('active')
    paymentUpfront?.classList.add('active')
    updatePrimaryButtonUrls()
  }
  function selectKlarna() {
    paymentProvider = 'klarna'
    paymentUpfront?.classList.remove('active')
    paymentKlarna?.classList.add('active')
    updatePrimaryButtonUrls()
  }

  function updatePrimaryButtonUrls() {
    let url = SIGN_UP_BASIC_URL + '?plan=' + plan
    const newsletterDiscountParams = getNewsletterDiscountParams()

    if (newsletterDiscountParams) {
      url += '&' + newsletterDiscountParams
    }

    if (paymentProvider) {
      url += '&paymentProvider=' + paymentProvider
    }

    if (primaryButtonDesktop) primaryButtonDesktop.href = url
    if (primaryButtonMobile) primaryButtonMobile.href = url
  }

  /** MAIN CODE ===================================================== */
  annualButton?.addEventListener('click', setPlanYearly)
  monthlyButton?.addEventListener('click', setPlanMonthly)
  paymentUpfront?.addEventListener('click', selectUpfront)
  paymentKlarna?.addEventListener('click', selectKlarna)
  updatePrimaryButtonUrls()
}
