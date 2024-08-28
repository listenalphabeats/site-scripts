var ab=function(m){"use strict";var B=(e=>(e.RewardfulReferral="rewardful.referral",e))(B||{});function N(e){function t(o){try{const p=decodeURIComponent(o);return encodeURIComponent(p)!==o}catch{return!1}}return t(e)?decodeURIComponent(e):e}function L(e){e+="=";const o=document.cookie.split(";").find(h=>h.trim().substring(0,e.length)===e);return o?JSON.parse(N(o.trim().substring(e.length))):null}const k="newsletterDiscountParams";function T(){return localStorage.getItem(k)}function O(){return/Googlebot/.test(window.navigator.userAgent)}function I(){return window.location.host==="staging-alphabeats.webflow.io"}function _({callback:e,fallback:t,timeout:o=18e3}){const p=Date.now(),h=setInterval(()=>{if(window.FsCC&&window.FsCC.consentController){if(clearInterval(h),window.FsCC.store.confirmed){e();return}const f=()=>{var i;(i=window.FsCC)!=null&&i.store.confirmed&&(clearTimeout(s),e())},s=setTimeout(()=>{var i,n;(n=(i=window.FsCC)==null?void 0:i.consentController)==null||n.off("updateconsents",f),t()},o);window.FsCC.consentController.on("updateconsents",f)}else Date.now()-p>=o&&(clearInterval(h),t())},500)}function U(){const e=I()?"6LcapSQqAAAAAOeM26drG-7e7aEq3Vj6e55WZtEg":"6Ld69iQqAAAAAOG5DHH8-UHywMnTBpgptTbQWDUb",t=I()?"https://api.development.listenalphabeats.nl/v1/forms":"https://api.listenalphabeats.com/v1/forms",o=document.createElement("script");o.async=!0,o.src=`https://www.google.com/recaptcha/enterprise.js?render=${e}`,document.head.appendChild(o);function p(){const n=document.querySelector(".grecaptcha-badge");n&&(n.style.right="-100%",setTimeout(()=>{n.style.visibility="visible"},400))}function h(n){const a=document.querySelector(".grecaptcha-badge");a&&(a.style.right={visible:"-186px",hidden:"-100%"}[n])}let f=!1;function s(){f=!1,h("hidden")}async function i(n){var S,P;const a=n.target,u=a.dataset.cioFormId;function b(){n.preventDefault(),n.stopPropagation()}if(f||!a.checkValidity()||!u)return;b();const r=(S=window.grecaptcha)==null?void 0:S.enterprise;if(!(r!=null&&r.execute)){(P=window.Sentry)==null||P.captureMessage("grecaptcha.enterprise.execute is not available","warning");return}f=!0;const l=Object.fromEntries(new FormData(a)),E=Object.keys(l).filter(d=>d.includes("email"));E.length&&E.forEach(d=>l[d]=String(l[d]).toLowerCase()),r.ready(()=>{r.execute(e,{action:"submit"}).then(y=>{const C={method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({data:l,recaptchaToken:y})};return fetch(`${t}/${u}/submit`,C)}).then(()=>{s()}).catch(y=>{var w;(w=window.Sentry)==null||w.captureException(y),s()});const d=a.querySelector('input[type="submit"]');d?d.click():a.submit()})}document.addEventListener("submit",n=>{i(n),s()}),window.addEventListener("load",function(){p(),[...document.forms].forEach(n=>{n.addEventListener("submit",a=>{i(a)}),n.dataset.cioFormId&&(n.addEventListener("focusin",()=>{h("visible")}),n.addEventListener("focusout",()=>setTimeout(()=>h("hidden"),4e3)))})})}const D="partners";function F(e){localStorage.setItem("partner",e)}function M(){return localStorage.getItem("partner")}function G(e){return window.location.replace(`/${D}/${e}`)}function R(){var E,S,P;const t=`couponId=${I()?"8ENDZLrc":"FynlZTlc"}&amountOff=25&discountName=$25 Off Annual Plan`,o="discount-modal-a",p="discount-modal-background-a",h="discount-modal-close-button-a",f="discount-form-a",s="formSubmittedAt",i="formDismissedAt";function n(d){const y={show:"flex",hide:"none"}[d],w=document.getElementById(o);w&&(w.style.display=y)}function a(){n("show"),(window.dataLayer||[]).push({event:"show-newsletter-discount-popup"})}function u(){n("hide")}function b(){localStorage.setItem(s,String(new Date().getTime())),localStorage.setItem(k,t);const d=document.querySelector("#discount-form-a .popup-modal_success-message-wrapper a");d&&(d.removeAttribute("href"),d.addEventListener("click",u))}function r(){localStorage.setItem(i,String(new Date().getTime())),u()}if(O()||!["/","/product","/shop"].includes(window.location.pathname)||L(B.RewardfulReferral)||localStorage.getItem(s))return;const l=localStorage.getItem(i);l&&new Date().getTime()-Number(l)<864e5||(setTimeout(a,2e3),(E=document.getElementById(f))==null||E.addEventListener("submit",b),(S=document.getElementById(h))==null||S.addEventListener("click",r),(P=document.getElementById(p))==null||P.addEventListener("click",r))}function $(){if(new URLSearchParams(window.location.search).has("no-cookie-banner"))return;const t=document.createElement("script");t.src="https://cdn.jsdelivr.net/npm/@finsweet/cookie-consent@1/fs-cc.js",t.setAttribute("fs-cc-domain",".listenalphabeats.com"),t.setAttribute("fs-cc-mode","opt-in"),t.async=!0;const o=document.createElement("script");o.src="https://cdn.jsdelivr.net/gh/digital-sparks/cookie-consent-boost@1/dist/index.js",o.async=!0,document.head.appendChild(t),document.head.appendChild(o)}function Y(){setTimeout(()=>{p(),h(),f()},200);const e={annual:{price:149,strikedPrice:149},monthly:{price:15.99,strikedPrice:15.99},brainbit:{annual:{price:449,strikedPrice:449},monthly:{price:499,strikedPrice:499}}},t={annualButton:document.getElementById("plan-annual"),monthlyButton:document.getElementById("plan-monthly"),headbandYes:document.getElementById("headband-yes"),headbandNo:document.getElementById("headband-no"),paymentUpfront:document.getElementById("payment-upfront"),paymentKlarna:document.getElementById("payment-klarna"),annualFeatures:document.querySelectorAll(".annual-feature"),primaryButtonDesktop:document.getElementById("product-buy-primary-btn")};function o(s,i,n){if(!s)return;const a=s.querySelector(".price-strikethrough"),u=s.querySelector(".price");a&&(a.innerText="$"+i.toFixed(2),a.style.display=i===n?"none":"block"),u&&(u.innerText="$"+n.toFixed(2))}function p(){o(t.annualButton,e.annual.strikedPrice,e.annual.price),o(t.monthlyButton,e.monthly.strikedPrice,e.monthly.price),o(t.headbandYes,e.brainbit.annual.strikedPrice,e.brainbit.annual.price)}function h(){var w,C,v,A;const s=document.getElementById("discount-badge"),i=document.getElementById("discount-badge-title");function n(c){s==null||s.setAttribute("style","display: flex;"),i&&(i.textContent=c)}const a=L(B.RewardfulReferral),u=T(),b=Number(new URLSearchParams(u||"").get("percentOff")||0),r=Number(new URLSearchParams(u||"").get("amountOff")||0),l=((w=a==null?void 0:a.coupon)==null?void 0:w.percent_off)||0,E=((C=a==null?void 0:a.coupon)==null?void 0:C.amount_off)||0,S=e.annual.price*(b/100),P=e.annual.price*(l/100),d=Math.max(S,P,r,E);if(d===0)return;let y="";if(E===d)y=((v=a==null?void 0:a.coupon)==null?void 0:v.name)||"";else if(r===d)y=new URLSearchParams(u||"").get("discountName")||"",e.annual.price-=r,o(t.annualButton,e.annual.strikedPrice,e.annual.price);else{y=(b>l?new URLSearchParams(u||"").get("discountName"):(A=a==null?void 0:a.coupon)==null?void 0:A.name)||"Discount";const g=1-Math.max(b,l)/100;e.annual.price*=g,e.monthly.price*=g,e.brainbit.annual.price*=g,e.brainbit.monthly.price*=g,p()}n(y)}function f(){var d,y,w,C,v,A;const s=I()?"https://accounts.development.listenalphabeats.nl/sign-up":"https://accounts.listenalphabeats.com/sign-up";let i="YEARLY",n="",a=!0;function u(c,g){c==null||c.classList[g?"add":"remove"]("active")}function b(c,g){c&&(c.style.display=g?"flex":"none")}function r(){let c=`${s}?plan=${i}`;const g=T();g&&i==="YEARLY"&&(c+=`&${g}`),n&&(c+=`&paymentProvider=${n}`),a||(c+="&includeBrainbit=false"),t.primaryButtonDesktop&&(t.primaryButtonDesktop.href=c)}function l(c){i=c?"YEARLY":"MONTHLY",u(t.annualButton,c),u(t.monthlyButton,!c),t.annualFeatures.forEach(g=>b(g,c&&(g!==t.paymentKlarna||a))),S(),c?o(t.headbandYes,e.brainbit.annual.strikedPrice,e.brainbit.annual.price):o(t.headbandYes,e.brainbit.monthly.strikedPrice,e.brainbit.monthly.price)}function E(c){a=c,u(t.headbandYes,c),u(t.headbandNo,!c),t.paymentKlarna&&b(t.paymentKlarna,c&&i!=="MONTHLY"),S()}function S(){n="",u(t.paymentUpfront,!0),u(t.paymentKlarna,!1),r()}function P(){n="klarna",u(t.paymentUpfront,!1),u(t.paymentKlarna,!0),r()}(d=t.annualButton)==null||d.addEventListener("click",()=>l(!0)),(y=t.monthlyButton)==null||y.addEventListener("click",()=>l(!1)),(w=t.headbandYes)==null||w.addEventListener("click",()=>E(!0)),(C=t.headbandNo)==null||C.addEventListener("click",()=>E(!1)),(v=t.paymentUpfront)==null||v.addEventListener("click",S),(A=t.paymentKlarna)==null||A.addEventListener("click",P),r()}}function j(){const e={amaze:{discountName:"Amaze Creator Bundle discount",couponId:I()?"YiM3PNXT":"Gu2jGXBe",amountOff:"199"}};if(!window.location.pathname.includes(`/${D}/`))return;const t=document.getElementById("payment-upfront"),o=document.getElementById("payment-klarna"),p=document.getElementById("product-buy-primary-btn");function h(){const r=window.location.pathname.split(`/${D}/`)[1];if(r)return F(r),r}function f(r,l){r==null||r.classList[l?"add":"remove"]("active")}const s=h();if(!s||!e[s])return;const i=e[s];let n="";function a(){if(!s||!e[s])return;const r=I()?"https://accounts.development.listenalphabeats.nl/sign-up":"https://accounts.listenalphabeats.com/sign-up",l=new URLSearchParams([["partner",s],["couponId",i.couponId],["amountOff",i.amountOff],["discountName",i.discountName]]);n&&l.append("paymentProvider",n),p&&(p.href=`${r}?${l}`)}function u(){n="",f(t,!0),f(o,!1),a()}function b(){n="klarna",f(t,!1),f(o,!0),a()}t==null||t.addEventListener("click",u),o==null||o.addEventListener("click",b),a()}return $(),U(),document.addEventListener("DOMContentLoaded",()=>{M()||_({callback:R,fallback:R,timeout:4e3})}),m.NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID=k,m.PARTNERS_PATH=D,m.conditionalCookieBanner=$,m.getCookie=L,m.getNewsletterDiscountParams=T,m.getPartnerNameInStorage=M,m.guardCioFormsWithRecaptcha=U,m.handleCartWithDiscount=Y,m.handleNewsletterDiscountPopup=R,m.handlePartnerLanding=j,m.isGooglebot=O,m.isStaging=I,m.redirectToPartnerPage=G,m.runAfterConsentResolved=_,m.safeDecodeURIComponent=N,m.setPartnerNameInStorage=F,Object.defineProperty(m,Symbol.toStringTag,{value:"Module"}),m}({});
