export function guardCioFormsWithRecaptcha() {
  const isStaging = window.location.host === 'staging-alphabeats.webflow.io'
  const RECAPTCHA_SITE_KEY = isStaging
    ? '6LcapSQqAAAAAOeM26drG-7e7aEq3Vj6e55WZtEg'
    : '6Ld69iQqAAAAAOG5DHH8-UHywMnTBpgptTbQWDUb'
  const endpoint = isStaging
    ? 'https://api.development.listenalphabeats.nl/v1/forms'
    : 'https://api.listenalphabeats.nl/v1/forms'

  const recaptchaScript = document.createElement('script')
  recaptchaScript.async = true
  recaptchaScript.src = `https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`
  document.head.appendChild(recaptchaScript)

  function initBadgeVisibility() {
    const badge = document.querySelector(
      '.grecaptcha-badge'
    ) as HTMLDivElement | null
    if (badge) {
      badge.style.right = '-100%'
      setTimeout(() => {
        badge.style.visibility = 'visible'
      }, 400)
    }
  }

  function setBadgePosition(state: 'visible' | 'hidden') {
    const badge = document.querySelector(
      '.grecaptcha-badge'
    ) as HTMLDivElement | null
    if (badge) {
      console.debug('badge:', badge)
      badge.style.right = { visible: '-186px', hidden: '-100%' }[state]
    }
  }

  let isSubmitting = false

  function cleanup() {
    isSubmitting = false
    setBadgePosition('hidden')
  }

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
      window.Sentry?.captureMessage(
        'grecaptcha.enterprise.execute is not available',
        'warning'
      )
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
          cleanup()
        })
        .catch(error => {
          window.Sentry?.captureException(error)
          cleanup()
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
    cleanup()
  })
  window.addEventListener('load', function () {
    initBadgeVisibility()
    ;[...document.forms].forEach(form => {
      form.addEventListener('submit', event => {
        handleSubmit(event)
      })
      if (form.dataset.cioFormId) {
        form.addEventListener('focusin', () => {
          setBadgePosition('visible')
        })
        form.addEventListener('focusout', () =>
          setTimeout(() => setBadgePosition('hidden'), 4000)
        )
      }
    })
  })
}
