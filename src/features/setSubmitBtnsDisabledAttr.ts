export function setSubmitBtnsDisabledAttr(bool: boolean) {
  const buttons = document.querySelectorAll('form input[type="submit"]')
  buttons.forEach(function (button) {
    if (bool) {
      button.setAttribute('disabled', 'true')
    } else {
      button.removeAttribute('disabled')
    }
  })
}

/** To be passed to reCAPTCHA with `data-callback` attr */
export function recaptchaCallback() {
  setSubmitBtnsDisabledAttr(false)
}
