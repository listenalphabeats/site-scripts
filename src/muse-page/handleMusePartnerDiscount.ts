import { OFFER_MUSERS_ACTIVATION_SEARCH_PARAM } from '../config'

export function handleMusePartnerDiscount() {
  const params = new URLSearchParams(window.location.search)
  if (!params.has(OFFER_MUSERS_ACTIVATION_SEARCH_PARAM)) return

  function setDisplay(element, display) {
    if (element) element.style.display = display ? 'flex' : 'none'
  }

  const ctaFreeTrial = document.getElementById('free-trial')
  const ctaPreOrder = document.getElementById('pre-order')

  if (!ctaFreeTrial || !ctaPreOrder) return

  setDisplay(ctaFreeTrial, true)
  setDisplay(ctaPreOrder, false)

  const button = ctaFreeTrial.querySelector('a')
  if (!button) return

  const url = new URL(button.href)
  url.searchParams.set(OFFER_MUSERS_ACTIVATION_SEARCH_PARAM, 'true')
  button.href = url.toString()
}
