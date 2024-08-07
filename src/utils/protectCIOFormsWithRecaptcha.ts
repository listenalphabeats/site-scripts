export function protectCIOFormsWithRecaptcha() {
  const RECAPTCHA_SITE_KEY = '6LfVlSEqAAAAAGmKB7MxaOG6vhSpe3o5bRffZ_gX'
  const endpoint =
    window.location.host === 'staging-alphabeats.webflow.io'
      ? 'https://api.development.listenalphabeats.nl/v1/forms'
      : 'https://api.listenalphabeats.com/v1/forms'

  const recaptchaScript = document.createElement('script')
  recaptchaScript.async = true
  recaptchaScript.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
  document.head.appendChild(recaptchaScript)

  let isSubmitting = false

  async function handleSubmit(event: SubmitEvent) {
    const form = event.target as HTMLFormElement
    const cioFormId = form.dataset.cioFormId

    if (isSubmitting) {
      console.debug('form already isSubmitting:', isSubmitting)
      return
    }
    if (!form.checkValidity()) {
      console.debug('form is not valid')
      return
    }
    if (!cioFormId) {
      console.debug('Form is not cunnected to CustomerIo')
      return
    }

    /** Hold off native submission */
    event.preventDefault()
    event.stopPropagation()

    if (!window.grecaptcha?.execute) {
      console.debug('No reCAPTCHA available, cancelling CIO submission')
      return
    }

    isSubmitting = true

    const formData = Object.fromEntries(new FormData(form))

    if (formData.email) {
      formData.email = String(formData.email).toLowerCase()
    }

    const recaptchaToken = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
      action: 'submit',
    })

    const payload = { data: formData, recaptchaToken }

    console.debug('payload:', payload)

    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    }

    try {
      const resp = await fetch(`${endpoint}/${cioFormId}/submit`, options)
      console.debug('resp.status:', resp.status)

      /** Replay native submit */
      const submitButton = form.querySelector(
        'input[type="submit"]'
      ) as HTMLButtonElement
      if (submitButton) {
        submitButton.click()
      } else {
        form.submit()
      }
    } catch (error) {
      console.debug('error:', error)
    } finally {
      isSubmitting = false
    }
  }

  /** Add global event listener for form submission */
  document.addEventListener('submit', handleSubmit)
  window.addEventListener('load', function () {
    ;[...document.forms].forEach(form => {
      form.addEventListener('submit', handleSubmit)
    })
  })
}
