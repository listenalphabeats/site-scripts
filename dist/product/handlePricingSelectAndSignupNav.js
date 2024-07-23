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
  updatePrimaryButtonUrls();
}
function setPlanMonthly() {
  plan = "MONTHLY";
  annualButton.classList.remove("active");
  monthlyButton.classList.add("active");
  paymentKlarna.classList.add("disabled");
  selectUpfront();
  updatePrimaryButtonUrls();
}
function selectUpfront() {
  paymentProvider = "";
  paymentKlarna.classList.remove("active");
  paymentUpfront.classList.add("active");
  updatePrimaryButtonUrls();
}
function selectKlarna() {
  paymentProvider = "klarna";
  paymentUpfront.classList.remove("active");
  paymentKlarna.classList.add("active");
  updatePrimaryButtonUrls();
}
function getNewsletterDiscountParams() {
  return window.NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID ? localStorage.getItem(window.NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID) : void 0;
}
function updatePrimaryButtonUrls() {
  let url = SIGN_UP_BASIC_URL + "?plan=" + plan;
  const newsletterDiscountParams = getNewsletterDiscountParams();
  if (newsletterDiscountParams) {
    url += "&" + newsletterDiscountParams;
  }
  if (paymentProvider) {
    url += "&paymentProvider=" + paymentProvider;
  }
  primaryButtonDesktop.href = url;
  primaryButtonMobile.href = url;
}
function handlePricingSelectAndSignupNav() {
  annualButton.addEventListener("click", setPlanYearly);
  monthlyButton.addEventListener("click", setPlanMonthly);
  paymentUpfront.addEventListener("click", selectUpfront);
  paymentKlarna.addEventListener("click", selectKlarna);
}
document.addEventListener("DOMContentLoaded", handlePricingSelectAndSignupNav);
