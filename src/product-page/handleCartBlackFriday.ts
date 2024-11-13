import { BundleType } from '../types'
import {
  getPartnerNameInStorage,
  isStaging,
  redirectToPartnerPage,
} from '../utils'

export function handleCartBlackFriday() {
  const partner = getPartnerNameInStorage()
  if (partner) {
    redirectToPartnerPage(partner)
    return
  }

  setTimeout(() => {
    handleCartChange()
  }, 200)

  const bundles = {
    [BundleType.SUBSCRIPTION_ONLY]: {
      discountName: 'Black Friday discount',
      couponId: isStaging() ? 'D3mgjtkT' : 'aWmdtFSD',
      amountOff: '70',
      ctaTitle: 'Order now',
    },
    [BundleType.SUBSCRIPTION_ONLY + '-monthly']: {
      ctaTitle: 'Order now',
    },
    [BundleType.MUSE]: {
      discountName: 'Black Friday discount',
      couponId: isStaging() ? '9oEGjT70' : 'hryuMkbo',
      amountOff: '200',
      ctaTitle: 'Pre-order now',
    },
    [BundleType.BRAINBIT]: {
      discountName: 'Black Friday discount',
      couponId: isStaging() ? 'OjjWjGvV' : '2oEzwWNL',
      amountOff: '199',
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

  function handleCartChange() {
    let bundleType = BundleType.SUBSCRIPTION_ONLY
    let plan = 'YEARLY'
    let paymentProvider = ''

    function setActive(element, isActive) {
      element?.classList[isActive ? 'add' : 'remove']('active')
    }

    function setDisplay(element, display) {
      if (element) element.style.display = display ? 'flex' : 'none'
    }

    function updatePrimaryButtonUrl() {
      const url = isStaging()
        ? 'https://accounts.development.listenalphabeats.nl/sign-up'
        : 'https://accounts.listenalphabeats.com/sign-up'

      const params = new URLSearchParams([
        ['bundleType', bundleType],
        ['plan', plan],
      ])

      if (plan === 'YEARLY') {
        const { discountName, amountOff, couponId } = bundles[bundleType]
        if (discountName) params.append('discountName', discountName)
        if (amountOff) params.append('amountOff', amountOff)
        if (couponId) params.append('couponId', couponId)
      }

      if (paymentProvider) params.append('paymentProvider', paymentProvider)

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
}
