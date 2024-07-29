function disableButtons(disabled) {
  const buttons = document.querySelectorAll('form input[type="submit"]');
  buttons.forEach(function(button) {
    button.disabled = disabled ? true : false;
  });
}
function recaptchaCallback() {
  disableButtons(false);
}
window.addEventListener("load", () => {
  disableButtons(true);
});
