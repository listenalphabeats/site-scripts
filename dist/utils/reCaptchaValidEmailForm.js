document.querySelector(
  `#wf-form-Newsletter-Popup .recaptcha-wrapper`
);
function toggleOnFormValidity(formId) {
  const form = document.getElementById(formId);
  const recaptchaDiv = document.querySelector(`#${formId} .recaptcha-wrapper`);
  if (!form) return;
  recaptchaDiv.style.display = form.checkValidity() ? "flex" : "none";
}
function reCaptchaValidEmailForm(formId) {
  const emailInput = document.querySelector(`#${formId} input[type=email]`);
  const checkboxInput = document.querySelector(
    `#${formId} input[type=checkbox]`
  );
  emailInput.addEventListener("input", () => toggleOnFormValidity(formId));
  checkboxInput.addEventListener("change", () => toggleOnFormValidity(formId));
}
window.reCaptchaValidEmailForm = reCaptchaValidEmailForm;
