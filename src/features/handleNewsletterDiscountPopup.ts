import { BrowserCookies } from '../types'
import {
  getCookie,
  isGooglebot,
  NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID,
  runWhenPostHogIsReady,
} from '../utils'

export function handleNewsletterDiscountPopup() {
  const NEWSLETTER_DISCOUNT_PARAMS =
    'couponId=FjYlGRQJ&amountOff=25&discountName=$25 Newsletter Discount'
  const MODAL_ID = 'discount-modal-a'
  const BACKDROP_ID = 'discount-modal-background-a'
  const CLOSE_BTN_ID = 'discount-modal-close-button-a'
  const FORM_ID = 'discount-form-a'

  const FORM_SUBMITTED_AT_STORAGE_ID = 'formSubmittedAt'
  const FORM_DISMISSED_AT_STORAGE_ID = 'formDismissedAt'

  /** HELPERS ===================================================== */

  function setModal(state) {
    const displayValue = { show: 'flex', hide: 'none' }[state]
    const modal = document.getElementById(MODAL_ID)
    if (modal) modal.style.display = displayValue
  }

  function showModal() {
    setModal('show')
    const dataLayer = window.dataLayer || []
    dataLayer.push({ event: 'show-newsletter-discount-popup' })
  }

  function hideModal() {
    setModal('hide')
  }

  function submitForm() {
    localStorage.setItem(
      FORM_SUBMITTED_AT_STORAGE_ID,
      String(new Date().getTime())
    )

    localStorage.setItem(
      NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID,
      NEWSLETTER_DISCOUNT_PARAMS
    )

    /** No redirect to /product on 'Continue browsing' */
    const successContinueBtn = document.querySelector(
      '#discount-form-a .popup-modal_success-message-wrapper a'
    )
    if (successContinueBtn) {
      successContinueBtn.removeAttribute('href')
      successContinueBtn.addEventListener('click', hideModal)
    }
  }

  function dismissForm() {
    localStorage.setItem(
      FORM_DISMISSED_AT_STORAGE_ID,
      String(new Date().getTime())
    )
    hideModal()
  }

  /** MAIN CODE ===================================================== */
  if (isGooglebot()) {
    return
  }

  if (!['/', '/product', '/shop'].includes(window.location.pathname)) {
    return
  }

  if (getCookie(BrowserCookies.RewardfulReferral)) {
    return
  }

  /** No run if submitted earlier */
  if (localStorage.getItem(FORM_SUBMITTED_AT_STORAGE_ID)) {
    return
  }

  const dismissedAt = localStorage.getItem(FORM_DISMISSED_AT_STORAGE_ID)
  /** No run if dismissed within last 24 hours */
  if (
    dismissedAt &&
    new Date().getTime() - Number(dismissedAt) < 24 * 60 * 60 * 1000
  ) {
    return
  }

  /** SHOW MODAL */
  const defaultDelay = 4000

  function getFeatureFlag() {
    return window.posthog?.getFeatureFlag('newsletter-discount-popup-timeout-2')
  }

  function callback() {
    const delay = getFeatureFlag() === 'test-15sec-delay' ? 15000 : defaultDelay
    setTimeout(showModal, delay)
  }

  function fallback() {
    setTimeout(showModal, defaultDelay)
  }

  runWhenPostHogIsReady({ getFeatureFlag, callback, fallback })

  /** Attach listeners */
  document.getElementById(FORM_ID)?.addEventListener('submit', submitForm)
  document.getElementById(CLOSE_BTN_ID)?.addEventListener('click', dismissForm)
  document.getElementById(BACKDROP_ID)?.addEventListener('click', dismissForm)
}
