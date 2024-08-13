export function guardCioFormsWithRecaptcha() {
  const isStaging = window.location.host === 'staging-alphabeats.webflow.io'
  const RECAPTCHA_SITE_KEY = isStaging
    ? '6LcapSQqAAAAAOeM26drG-7e7aEq3Vj6e55WZtEg'
    : '6Ld69iQqAAAAAOG5DHH8-UHywMnTBpgptTbQWDUb'
  const endpoint = isStaging
    ? 'https://api.development.listenalphabeats.nl/v1/forms'
    : 'https://api.listenalphabeats.nl/v1/forms'

  const recaptchaScript = document.createElement('script')
  recaptchaScript.src = `https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`
  document.head.appendChild(recaptchaScript)

  let isSubmitting = false

  async function handleSubmit(event: SubmitEvent) {
    const form = event.target as HTMLFormElement
    const cioFormId = form.dataset.cioFormId

    function cancelNativeFlow() {
      event.preventDefault()
      event.stopPropagation()
    }

    if (isSubmitting) {
      return
    }
    if (!form.checkValidity()) {
      return
    }
    if (!cioFormId) {
      return
    }

    cancelNativeFlow()

    const recaptcha = window.grecaptcha?.enterprise

    if (!recaptcha?.execute) {
      return
    }

    isSubmitting = true

    const formData = Object.fromEntries(new FormData(form))

    const emailKeys = Object.keys(formData).filter(key => key.includes('email'))
    if (emailKeys.length) {
      emailKeys.forEach(
        key => (formData[key] = String(formData[key]).toLowerCase())
      )
    }

    recaptcha.ready(() => {
      recaptcha
        .execute(RECAPTCHA_SITE_KEY, { action: 'submit' })
        .then(recaptchaToken => {
          const payload = { data: formData, recaptchaToken }
          const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(payload),
          }

          return fetch(`${endpoint}/${cioFormId}/submit`, options)
        })
        .then(() => {
          isSubmitting = false
        })
        .catch(error => {
          console.debug('Error:', error)
          isSubmitting = false
        })

      /** Replay native for Webflow submission and form state change. */
      const submitButton = form.querySelector(
        'input[type="submit"]'
      ) as HTMLButtonElement
      if (submitButton) {
        submitButton.click()
      } else {
        form.submit()
      }
    })
  }

  /** Add global event listener for form submission */
  document.addEventListener('submit', event => {
    handleSubmit(event)
    isSubmitting = false
  })
  window.addEventListener('load', function () {
    ;[...document.forms].forEach(form => {
      form.addEventListener('submit', event => {
        handleSubmit(event)
      })
    })
  })
}
