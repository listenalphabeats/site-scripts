const SIGN_UP_BASIC_URL = "https://accounts.listenalphabeats.com/sign-up";
let plan = "YEARLY";
let paymentProvider = "";
const annualButton = document.getElementById("plan-annual");
const monthlyButton = document.getElementById("plan-monthly");
const paymentUpfront = document.getElementById("payment-upfront");
const paymentKlarna = document.getElementById("payment-klarna");
const primaryButtonDesktop = document.getElementById("product-buy-primary-btn");
const primaryButtonMobile = document.getElementById(
  "product-buy-primary-btn-mobile"
);
function setPlanYearly() {
  plan = "YEARLY";
  paymentProvider = "";
  monthlyButton.classList.remove("active");
  annualButton.classList.add("active");
  paymentKlarna.classList.remove("disabled");
  selectUpfront();
}
function setPlanMonthly() {
  plan = "MONTHLY";
  annualButton.classList.remove("active");
  monthlyButton.classList.add("active");
  paymentKlarna.classList.add("disabled");
  selectUpfront();
}
function selectUpfront() {
  paymentProvider = "";
  paymentKlarna.classList.remove("active");
  paymentUpfront.classList.add("active");
}
function selectKlarna() {
  paymentProvider = "klarna";
  paymentUpfront.classList.remove("active");
  paymentKlarna.classList.add("active");
}
function getNewsletterDiscountParams() {
  return window.NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID ? localStorage.getItem(window.NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID) : void 0;
}
function navigateToSignUp() {
  let url = SIGN_UP_BASIC_URL + "?plan=" + plan;
  const newsletterDisountParams = getNewsletterDiscountParams();
  if (newsletterDisountParams) {
    url += "&" + newsletterDisountParams;
  }
  if (paymentProvider) {
    url += "&paymentProvider=" + paymentProvider;
  }
  window.location.href = url;
}
function handlePricingSelectAndSignupNav() {
  annualButton.addEventListener("click", setPlanYearly);
  monthlyButton.addEventListener("click", setPlanMonthly);
  paymentUpfront.addEventListener("click", selectUpfront);
  paymentKlarna.addEventListener("click", selectKlarna);
  primaryButtonDesktop.addEventListener("click", navigateToSignUp);
  primaryButtonMobile.addEventListener("click", navigateToSignUp);
}
document.addEventListener("DOMContentLoaded", handlePricingSelectAndSignupNav);
