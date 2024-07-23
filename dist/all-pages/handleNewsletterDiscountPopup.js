const NEWSLETTER_DISCOUNT_PARAMS = "couponId=ZdKIcH6B&percentOff=10&discountName=10% Newsletter Discount";
const MODAL_ID = "discount-modal";
const BACKDROP_ID = "discount-modal-background";
const CLOSE_BTN_ID = "discount-modal-close-button";
const FORM_ID = "discount-form";
const FORM_SUBMITTED_AT_STORAGE_ID = "formSubmittedAt";
const FORM_DISMISSED_AT_STORAGE_ID = "formDismissedAt";
function isGooglebot() {
  return /Googlebot/.test(window.navigator.userAgent);
}
function setModal(state) {
  const displayValue = { show: "flex", hide: "none" }[state];
  document.getElementById(MODAL_ID).style.display = displayValue;
}
function showModal() {
  setModal("show");
  const dataLayer = window.dataLayer || [];
  dataLayer.push({ event: "show-newsletter-discount-popup" });
}
function hideModal() {
  setModal("hide");
}
function submitForm() {
  localStorage.setItem(FORM_SUBMITTED_AT_STORAGE_ID, (/* @__PURE__ */ new Date()).getTime());
  if (window.NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID) {
    localStorage.setItem(
      window.NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID,
      NEWSLETTER_DISCOUNT_PARAMS
    );
  }
  const successContinueBtn = document.querySelector(
    ".popup-modal_success-message-wrapper a"
  );
  if (successContinueBtn) {
    successContinueBtn.removeAttribute("href");
    successContinueBtn.addEventListener("click", hideModal);
  }
}
function dismissForm() {
  localStorage.setItem(FORM_DISMISSED_AT_STORAGE_ID, (/* @__PURE__ */ new Date()).getTime());
  hideModal();
}
function handleNewsletterDiscountPopup() {
  if (isGooglebot()) {
    return;
  }
  if (Rewardful && Rewardful._cookie) {
    return;
  }
  if (localStorage.getItem(FORM_SUBMITTED_AT_STORAGE_ID)) {
    return;
  }
  const dismissedAt = localStorage.getItem(FORM_DISMISSED_AT_STORAGE_ID);
  if (dismissedAt && (/* @__PURE__ */ new Date()).getTime() - dismissedAt < 24 * 60 * 60 * 1e3) {
    return;
  }
  const defaultDelay = 4e3;
  function getFeatureFlag() {
    var _a;
    return (_a = window.posthog) == null ? void 0 : _a.getFeatureFlag(
      "newsletter-discount-popup-timeout-2"
    );
  }
  function callback() {
    const delay = getFeatureFlag() === "test-15sec-delay" ? 15e3 : defaultDelay;
    setTimeout(showModal, delay);
  }
  function fallback() {
    setTimeout(showModal, defaultDelay);
  }
  runWhenPostHogIsReady({ getFeatureFlag, callback, fallback });
  document.getElementById(FORM_ID).addEventListener("submit", submitForm);
  document.getElementById(CLOSE_BTN_ID).addEventListener("click", dismissForm);
  document.getElementById(BACKDROP_ID).addEventListener("click", dismissForm);
}
document.addEventListener("DOMContentLoaded", () => {
  runAfterConsentResolved({
    callback: handleNewsletterDiscountPopup,
    fallback: handleNewsletterDiscountPopup,
    timeout: 18e3
  });
});
