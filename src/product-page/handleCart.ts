import { MUSE_IN_BOX_TRIAL_SEARCH_PARAM } from '../config'
import { BundleType } from '../types'
import { isStaging } from '../utils'

export function handleCart() {
  function setActive(element, isActive) {
    element?.classList[isActive ? 'add' : 'remove']('active')
  }

  function setDisplay(element, display) {
    if (element) element.style.display = display ? 'flex' : 'none'
  }

  const bundles = {
    [BundleType.SUBSCRIPTION_ONLY]: {
      ctaTitle: 'Order now',
    },
    [BundleType.SUBSCRIPTION_ONLY + '-monthly']: {
      ctaTitle: 'Order now',
    },
    [BundleType.MUSE]: {
      ctaTitle: 'Order now',
    },
    [BundleType.BRAINBIT]: {
      ctaTitle: 'Order now',
    },
  }

  type HtmlAEl = HTMLAnchorElement | null

  const elements = {
    imageSetDefault: document.getElementById(
      'default-product-image-carousel'
    ) as HtmlAEl,
    imageSetMuse: document.getElementById(
      BundleType.MUSE + '-product-image-carousel'
    ) as HtmlAEl,
    imageSetBrainbit: document.getElementById(
      BundleType.BRAINBIT + '-product-image-carousel'
    ) as HtmlAEl,

    subscriptionOnly: document.getElementById(
      BundleType.SUBSCRIPTION_ONLY
    ) as HtmlAEl,
    subscriptionOnlyMonthly: document.getElementById(
      BundleType.SUBSCRIPTION_ONLY + '-monthly'
    ) as HtmlAEl,
    bundleMuse: document.getElementById('bundle-' + BundleType.MUSE) as HtmlAEl,
    bundleBrainbit: document.getElementById(
      'bundle-' + BundleType.BRAINBIT
    ) as HtmlAEl,
    paymentUpfront: document.getElementById('payment-upfront') as HtmlAEl,
    paymentKlarna: document.getElementById('payment-klarna') as HtmlAEl,

    shippingMuse: document.getElementById(
      'shipping-' + BundleType.MUSE
    ) as HtmlAEl,
    shippingBrainbit: document.getElementById(
      'shipping-' + BundleType.BRAINBIT
    ) as HtmlAEl,

    primaryBuyButton: document.getElementById(
      'product-buy-primary-btn'
    ) as HtmlAEl,
  }

  function handleMuseInBoxBadge() {
    const requestParams = new URLSearchParams(window.location.search)
    if (!requestParams.has(MUSE_IN_BOX_TRIAL_SEARCH_PARAM)) return
    const badgeAnnualSubDefault = document.getElementById(
      'badge-annual-sub-offer'
    )
    const badgeAnnualSubMonthTrial = document.getElementById(
      'badge-annual-sub-month-trial'
    )

    setDisplay(badgeAnnualSubDefault, false)
    setDisplay(badgeAnnualSubMonthTrial, true)
  }

  function handleCartChange() {
    let bundleType = BundleType.SUBSCRIPTION_ONLY
    let plan = 'YEARLY'
    let paymentProvider = ''

    function updatePrimaryButtonUrl() {
      const url = isStaging()
        ? 'https://accounts.development.listenalphabeats.nl/sign-up'
        : 'https://accounts.listenalphabeats.com/sign-up'

      let params = new URLSearchParams([
        ['bundleType', bundleType],
        ['plan', plan],
      ])

      if (paymentProvider) params.append('paymentProvider', paymentProvider)

      if (plan === 'YEARLY') {
        /** Handle Muse In Box 1m Trial */
        const requestParams = new URLSearchParams(window.location.search)
        if (
          bundleType === BundleType.SUBSCRIPTION_ONLY &&
          requestParams.has(MUSE_IN_BOX_TRIAL_SEARCH_PARAM)
        ) {
          params = new URLSearchParams([
            ['bundleType', BundleType.MUSE_IN_BOX],
            ['discountName', 'Muse 1-month free trial included'],
          ])
        }
      }

      if (elements.primaryBuyButton) {
        elements.primaryBuyButton.href = `${url}?${params}`
        elements.primaryBuyButton.innerText = bundles[bundleType].ctaTitle
      }
    }

    function setSubscriptionOnly() {
      bundleType = BundleType.SUBSCRIPTION_ONLY
      plan = 'YEARLY'

      setDisplay(elements.imageSetDefault, true)
      setDisplay(elements.imageSetMuse, false)
      setDisplay(elements.imageSetBrainbit, false)

      paymentProvider = ''
      setDisplay(elements.paymentKlarna, false)
      setPaymentUpfront()

      setDisplay(elements.shippingMuse, false)
      setDisplay(elements.shippingBrainbit, false)

      setActive(elements.subscriptionOnly, true)
      setActive(elements.subscriptionOnlyMonthly, false)
      setActive(elements.bundleBrainbit, false)
      setActive(elements.bundleMuse, false)
      updatePrimaryButtonUrl()
    }

    function setSubscriptionOnlyMonthly() {
      bundleType = BundleType.SUBSCRIPTION_ONLY
      plan = 'MONTHLY'

      setDisplay(elements.imageSetDefault, true)
      setDisplay(elements.imageSetMuse, false)
      setDisplay(elements.imageSetBrainbit, false)

      paymentProvider = ''
      setDisplay(elements.paymentKlarna, false)
      setPaymentUpfront()

      setDisplay(elements.shippingMuse, false)
      setDisplay(elements.shippingBrainbit, false)

      setActive(elements.subscriptionOnly, false)
      setActive(elements.subscriptionOnlyMonthly, true)
      setActive(elements.bundleBrainbit, false)
      setActive(elements.bundleMuse, false)
      updatePrimaryButtonUrl()
    }

    function setBundleMuse() {
      bundleType = BundleType.MUSE
      plan = 'YEARLY'
      setDisplay(elements.paymentKlarna, true)

      setDisplay(elements.imageSetDefault, false)
      setDisplay(elements.imageSetMuse, true)
      setDisplay(elements.imageSetBrainbit, false)

      setDisplay(elements.shippingMuse, true)
      setDisplay(elements.shippingBrainbit, false)

      setActive(elements.subscriptionOnly, false)
      setActive(elements.subscriptionOnlyMonthly, false)
      setActive(elements.bundleBrainbit, false)
      setActive(elements.bundleMuse, true)
      updatePrimaryButtonUrl()
    }

    function setBundleBrainbit() {
      bundleType = BundleType.BRAINBIT
      plan = 'YEARLY'
      setDisplay(elements.paymentKlarna, true)

      setDisplay(elements.imageSetDefault, false)
      setDisplay(elements.imageSetMuse, false)
      setDisplay(elements.imageSetBrainbit, true)

      setDisplay(elements.shippingMuse, false)
      setDisplay(elements.shippingBrainbit, true)

      setActive(elements.subscriptionOnly, false)
      setActive(elements.subscriptionOnlyMonthly, false)
      setActive(elements.bundleBrainbit, true)
      setActive(elements.bundleMuse, false)
      updatePrimaryButtonUrl()
    }

    function setPaymentUpfront() {
      paymentProvider = ''
      setActive(elements.paymentUpfront, true)
      setActive(elements.paymentKlarna, false)
      updatePrimaryButtonUrl()
    }

    function setPaymentKlarna() {
      paymentProvider = 'klarna'
      setActive(elements.paymentUpfront, false)
      setActive(elements.paymentKlarna, true)
      updatePrimaryButtonUrl()
    }

    elements.subscriptionOnly?.addEventListener('click', setSubscriptionOnly)
    elements.subscriptionOnlyMonthly?.addEventListener(
      'click',
      setSubscriptionOnlyMonthly
    )
    elements.bundleMuse?.addEventListener('click', setBundleMuse)
    elements.bundleBrainbit?.addEventListener('click', setBundleBrainbit)

    elements.paymentUpfront?.addEventListener('click', setPaymentUpfront)
    elements.paymentKlarna?.addEventListener('click', setPaymentKlarna)

    setSubscriptionOnly()
    updatePrimaryButtonUrl()
  }

  handleCartChange()
  handleMuseInBoxBadge()
}
