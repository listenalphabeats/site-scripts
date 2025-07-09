import { OFFER_MUSERS_ACTIVATION_SEARCH_PARAM } from '../config'
import { isStaging } from '../utils'
import { getOfferMusersPartner } from '../offers'

export function handleMusePartnerDiscount() {
  const params = new URLSearchParams(window.location.search)
  if (!params.has(OFFER_MUSERS_ACTIVATION_SEARCH_PARAM)) return

  function setDisplay(element, display) {
    if (element) element.style.display = display ? 'flex' : 'none'
  }

  const ctaFreeTrial = document.getElementById('free-trial')
  const ctaPreOrder = document.getElementById('pre-order')
  const ctaActivationOffer = document.getElementById('activation-offer')

  if (!ctaFreeTrial || !ctaPreOrder || !ctaActivationOffer) return

  setDisplay(ctaFreeTrial, false)
  setDisplay(ctaPreOrder, false)
  setDisplay(ctaActivationOffer, true)

  const button = ctaActivationOffer.querySelector('a')
  if (!button) return

  const baseUrl = isStaging()
    ? 'https://accounts.development.listenalphabeats.nl'
    : 'https://accounts.listenalphabeats.com'

  const offer = getOfferMusersPartner()

  // Create URL and set parameters programmatically
  const signupUrl = new URL('/sign-up', baseUrl)
  signupUrl.searchParams.set('bundleType', 'subscription-only')
  signupUrl.searchParams.set('plan', 'YEARLY')
  signupUrl.searchParams.set('discountName', '15% Muse partner discount')
  signupUrl.searchParams.set('amountOff', offer.amountOff.toString())
  signupUrl.searchParams.set('couponId', offer.couponId)
  signupUrl.searchParams.set('trialBadge', '7-day free trial included')

  button.href = signupUrl.toString()
}
