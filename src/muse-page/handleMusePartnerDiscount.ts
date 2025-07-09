import { OFFER_MUSERS_ACTIVATION_SEARCH_PARAM } from '../config'

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

  const url = new URL(button.href)
  url.searchParams.set('offer', OFFER_MUSERS_ACTIVATION_SEARCH_PARAM)
  url.searchParams.set('tabIndex', '0')
  button.href = url.toString()
}
