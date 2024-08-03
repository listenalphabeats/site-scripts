function toggleOnFormValidity(formId) {
  const form = document.getElementById(formId) as HTMLFormElement | null
  const recaptchaDiv = document.querySelector<HTMLDivElement>(
    `#${formId} .recaptcha-wrapper`
  )
  if (!form || !recaptchaDiv) return
  recaptchaDiv.style.display = form.checkValidity() ? 'flex' : 'none'
}

export function showRecaptchaOnValidForm(formId) {
  const emailInput = document.querySelector(`#${formId} input[type=email]`)
  const checkboxInput = document.querySelector(
    `#${formId} input[type=checkbox]`
  )
  emailInput?.addEventListener('input', () => toggleOnFormValidity(formId))
  checkboxInput?.addEventListener('change', () => toggleOnFormValidity(formId))
}
