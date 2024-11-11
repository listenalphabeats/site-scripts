var ab=function(h){"use strict";var C=(i=>(i.RewardfulReferral="rewardful.referral",i))(C||{}),B=(i=>(i.SUBSCRIPTION_ONLY="subscription-only",i.BRAINBIT="brainbit",i.MUSE="muse",i))(B||{});function M(i){function a(t){try{const y=decodeURIComponent(t);return encodeURIComponent(y)!==t}catch{return!1}}return a(i)?decodeURIComponent(i):i}function R(i){i+="=";const t=document.cookie.split(";").find(p=>p.trim().substring(0,i.length)===i);return t?JSON.parse(M(t.trim().substring(i.length))):null}const k="newsletterDiscountParams";function D(){return localStorage.getItem(k)}function _(){return/Googlebot/.test(window.navigator.userAgent)}function N(){return window.location.host==="staging-alphabeats.webflow.io"}function j({callback:i,fallback:a,timeout:t=18e3}){const y=Date.now(),p=setInterval(()=>{if(window.FsCC&&window.FsCC.consentController){if(clearInterval(p),window.FsCC.store.confirmed){i();return}const m=()=>{var n;(n=window.FsCC)!=null&&n.store.confirmed&&(clearTimeout(u),i())},u=setTimeout(()=>{var n,e;(e=(n=window.FsCC)==null?void 0:n.consentController)==null||e.off("updateconsents",m),a()},t);window.FsCC.consentController.on("updateconsents",m)}else Date.now()-y>=t&&(clearInterval(p),a())},500)}function F(){const i=N()?"6LcapSQqAAAAAOeM26drG-7e7aEq3Vj6e55WZtEg":"6Ld69iQqAAAAAOG5DHH8-UHywMnTBpgptTbQWDUb",a=N()?"https://api.development.listenalphabeats.nl/v1/forms":"https://api.listenalphabeats.com/v1/forms",t=document.createElement("script");t.async=!0,t.src=`https://www.google.com/recaptcha/enterprise.js?render=${i}`,document.head.appendChild(t);function y(){const e=document.querySelector(".grecaptcha-badge");e&&(e.style.right="-100%",setTimeout(()=>{e.style.visibility="visible"},400))}function p(e){const r=document.querySelector(".grecaptcha-badge");r&&(r.style.right={visible:"-186px",hidden:"-100%"}[e])}let m=!1;function u(){m=!1,p("hidden")}async function n(e){var P,O;const r=e.target,c=r.dataset.cioFormId;function l(){e.preventDefault(),e.stopPropagation()}if(m||!r.checkValidity()||!c)return;l();const o=(P=window.grecaptcha)==null?void 0:P.enterprise;if(!(o!=null&&o.execute)){(O=window.Sentry)==null||O.captureMessage("grecaptcha.enterprise.execute is not available","warning");return}m=!0;const d=Object.fromEntries(new FormData(r)),b=Object.keys(d).filter(f=>f.includes("email"));b.length&&b.forEach(f=>d[f]=String(d[f]).toLowerCase()),o.ready(()=>{o.execute(i,{action:"submit"}).then(I=>{const T={method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({data:d,recaptchaToken:I})};return fetch(`${a}/${c}/submit`,T)}).then(()=>{u()}).catch(I=>{var g;(g=window.Sentry)==null||g.captureException(I),u()});const f=r.querySelector('input[type="submit"]');f?f.click():r.submit()})}document.addEventListener("submit",e=>{n(e),u()}),window.addEventListener("load",function(){y(),[...document.forms].forEach(e=>{e.addEventListener("submit",r=>{n(r)}),e.dataset.cioFormId&&(e.addEventListener("focusin",()=>{p("visible")}),e.addEventListener("focusout",()=>setTimeout(()=>p("hidden"),4e3)))})})}const v="partners";function Y(i){localStorage.setItem("partner",i)}function A(){return localStorage.getItem("partner")}function U(i){return window.location.replace(`/${v}/${i}`)}function G(){var b,P,O;const a=`couponId=${N()?"8ENDZLrc":"FynlZTlc"}&amountOff=25&discountName=$25 Off Annual Plan`,t="discount-modal-a",y="discount-modal-background-a",p="discount-modal-close-button-a",m="discount-form-a",u="formSubmittedAt",n="formDismissedAt";function e(f){const I={show:"flex",hide:"none"}[f],g=document.getElementById(t);g&&(g.style.display=I)}function r(){e("show"),(window.dataLayer||[]).push({event:"show-newsletter-discount-popup"})}function c(){e("hide")}function l(){localStorage.setItem(u,String(new Date().getTime())),localStorage.setItem(k,a);const f=document.querySelector("#discount-form-a .popup-modal_success-message-wrapper a");f&&(f.removeAttribute("href"),f.addEventListener("click",c))}function o(){localStorage.setItem(n,String(new Date().getTime())),c()}if(_()||!["/","/product","/shop"].includes(window.location.pathname)||R(C.RewardfulReferral)||localStorage.getItem(u))return;const d=localStorage.getItem(n);d&&new Date().getTime()-Number(d)<864e5||(setTimeout(r,2e3),(b=document.getElementById(m))==null||b.addEventListener("submit",l),(P=document.getElementById(p))==null||P.addEventListener("click",o),(O=document.getElementById(y))==null||O.addEventListener("click",o))}function K(){if(new URLSearchParams(window.location.search).has("no-cookie-banner"))return;const a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/@finsweet/cookie-consent@1/fs-cc.js",a.setAttribute("fs-cc-domain",".listenalphabeats.com"),a.setAttribute("fs-cc-mode","opt-in"),a.async=!0;const t=document.createElement("script");t.src="https://cdn.jsdelivr.net/gh/digital-sparks/cookie-consent-boost@1/dist/index.js",t.async=!0,document.head.appendChild(a),document.head.appendChild(t)}function q(){const i=A();if(i){U(i);return}setTimeout(()=>{p(),m(),u()},200);const a={annual:{price:149,strikedPrice:149},monthly:{price:15.99,strikedPrice:15.99},brainbit:{annual:{price:449,strikedPrice:449},monthly:{price:499,strikedPrice:499}}},t={annualButton:document.getElementById("plan-annual"),monthlyButton:document.getElementById("plan-monthly"),headbandYes:document.getElementById("headband-yes"),headbandNo:document.getElementById("headband-no"),paymentUpfront:document.getElementById("payment-upfront"),paymentKlarna:document.getElementById("payment-klarna"),annualFeatures:document.querySelectorAll(".annual-feature"),primaryButtonDesktop:document.getElementById("product-buy-primary-btn")};function y(n,e,r){if(!n)return;const c=n.querySelector(".price-strikethrough"),l=n.querySelector(".price");c&&(c.innerText="$"+e.toFixed(2),c.style.display=e===r?"none":"block"),l&&(l.innerText="$"+r.toFixed(2))}function p(){y(t.annualButton,a.annual.strikedPrice,a.annual.price),y(t.monthlyButton,a.monthly.strikedPrice,a.monthly.price),y(t.headbandYes,a.brainbit.annual.strikedPrice,a.brainbit.annual.price)}function m(){var T,L,w,S;const n=document.getElementById("discount-badge"),e=document.getElementById("discount-badge-title");function r(s){n==null||n.setAttribute("style","display: flex;"),e&&(e.textContent=s)}const c=R(C.RewardfulReferral),l=D(),o=Number(new URLSearchParams(l||"").get("percentOff")||0),d=Number(new URLSearchParams(l||"").get("amountOff")||0),b=((T=c==null?void 0:c.coupon)==null?void 0:T.percent_off)||0,P=((L=c==null?void 0:c.coupon)==null?void 0:L.amount_off)||0,O=a.annual.price*(o/100),f=a.annual.price*(b/100),I=Math.max(O,f,d,P);if(I===0)return;let g="";if(P===I)g=((w=c==null?void 0:c.coupon)==null?void 0:w.name)||"";else if(d===I)g=new URLSearchParams(l||"").get("discountName")||"",a.annual.price-=d,y(t.annualButton,a.annual.strikedPrice,a.annual.price);else{g=(o>b?new URLSearchParams(l||"").get("discountName"):(S=c==null?void 0:c.coupon)==null?void 0:S.name)||"Discount";const E=1-Math.max(o,b)/100;a.annual.price*=E,a.monthly.price*=E,a.brainbit.annual.price*=E,a.brainbit.monthly.price*=E,p()}r(g)}function u(){var I,g,T,L,w,S;const n=N()?"https://accounts.development.listenalphabeats.nl/sign-up":"https://accounts.listenalphabeats.com/sign-up";let e="YEARLY",r="",c=!0;function l(s,E){s==null||s.classList[E?"add":"remove"]("active")}function o(s,E){s&&(s.style.display=E?"flex":"none")}function d(){let s=`${n}?plan=${e}`;const E=D();E&&e==="YEARLY"&&(s+=`&${E}`),r&&(s+=`&paymentProvider=${r}`),c||(s+="&includeBrainbit=false"),t.primaryButtonDesktop&&(t.primaryButtonDesktop.href=s)}function b(s){e=s?"YEARLY":"MONTHLY",l(t.annualButton,s),l(t.monthlyButton,!s),t.annualFeatures.forEach(E=>o(E,s&&(E!==t.paymentKlarna||c))),O(),s?y(t.headbandYes,a.brainbit.annual.strikedPrice,a.brainbit.annual.price):y(t.headbandYes,a.brainbit.monthly.strikedPrice,a.brainbit.monthly.price)}function P(s){c=s,l(t.headbandYes,s),l(t.headbandNo,!s),t.paymentKlarna&&o(t.paymentKlarna,s&&e!=="MONTHLY"),O()}function O(){r="",l(t.paymentUpfront,!0),l(t.paymentKlarna,!1),d()}function f(){r="klarna",l(t.paymentUpfront,!1),l(t.paymentKlarna,!0),d()}(I=t.annualButton)==null||I.addEventListener("click",()=>b(!0)),(g=t.monthlyButton)==null||g.addEventListener("click",()=>b(!1)),(T=t.headbandYes)==null||T.addEventListener("click",()=>P(!0)),(L=t.headbandNo)==null||L.addEventListener("click",()=>P(!1)),(w=t.paymentUpfront)==null||w.addEventListener("click",O),(S=t.paymentKlarna)==null||S.addEventListener("click",f),d()}}function W(){const i=A();if(i){U(i);return}setTimeout(()=>{y()},200);const a={[B.SUBSCRIPTION_ONLY]:{discountName:"Black Friday discount",couponId:N()?"D3mgjtkT":"aWmdtFSD",amountOff:"70",ctaTitle:"Order now"},[B.SUBSCRIPTION_ONLY+"-monthly"]:{ctaTitle:"Order now"},[B.MUSE]:{discountName:"Black Friday discount",couponId:N()?"9oEGjT70":"hryuMkbo",amountOff:"200",ctaTitle:"Pre-order now"},[B.BRAINBIT]:{discountName:"Black Friday discount",couponId:N()?"OjjWjGvV":"2oEzwWNL",amountOff:"199",ctaTitle:"Order now"}},t={subscriptionOnly:document.getElementById(B.SUBSCRIPTION_ONLY),subscriptionOnlyMonthly:document.getElementById(B.SUBSCRIPTION_ONLY+"-monthly"),bundleMuse:document.getElementById("bundle-"+B.MUSE),bundleBrainbit:document.getElementById("bundle-"+B.BRAINBIT),paymentUpfront:document.getElementById("payment-upfront"),paymentKlarna:document.getElementById("payment-klarna"),shippingMuse:document.getElementById("shipping-"+B.MUSE),shippingBrainbit:document.getElementById("shipping-"+B.BRAINBIT),primaryBuyButton:document.getElementById("product-buy-primary-btn")};function y(){var O,f,I,g,T,L;let p=B.SUBSCRIPTION_ONLY,m="YEARLY",u="";function n(w,S){w==null||w.classList[S?"add":"remove"]("active")}function e(w,S){w&&(w.style.display=S?"flex":"none")}function r(){const w=N()?"https://accounts.development.listenalphabeats.nl/sign-up":"https://accounts.listenalphabeats.com/sign-up",S=new URLSearchParams([["bundleType",p],["plan",m]]),{discountName:s,amountOff:E,couponId:$}=m==="MONTHLY"?{}:a[p];s&&S.append("discountName",s),E&&S.append("amountOff",E),$&&S.append("couponId",$),u&&S.append("paymentProvider",u),t.primaryBuyButton&&(t.primaryBuyButton.href=`${w}?${S}`,t.primaryBuyButton.innerText=a[p].ctaTitle)}function c(){p=B.SUBSCRIPTION_ONLY,m="YEARLY",u="",e(t.paymentKlarna,!1),b(),e(t.shippingMuse,!1),e(t.shippingBrainbit,!1),n(t.subscriptionOnly,!0),n(t.subscriptionOnlyMonthly,!1),n(t.bundleBrainbit,!1),n(t.bundleMuse,!1),r()}function l(){p=B.SUBSCRIPTION_ONLY,m="MONTHLY",u="",e(t.paymentKlarna,!1),b(),e(t.shippingMuse,!1),e(t.shippingBrainbit,!1),n(t.subscriptionOnly,!1),n(t.subscriptionOnlyMonthly,!0),n(t.bundleBrainbit,!1),n(t.bundleMuse,!1),r()}function o(){p=B.MUSE,m="YEARLY",e(t.paymentKlarna,!0),e(t.shippingMuse,!0),e(t.shippingBrainbit,!1),n(t.subscriptionOnly,!1),n(t.subscriptionOnlyMonthly,!1),n(t.bundleBrainbit,!1),n(t.bundleMuse,!0),r()}function d(){p=B.BRAINBIT,m="YEARLY",e(t.paymentKlarna,!0),e(t.shippingMuse,!1),e(t.shippingBrainbit,!0),n(t.subscriptionOnly,!1),n(t.subscriptionOnlyMonthly,!1),n(t.bundleBrainbit,!0),n(t.bundleMuse,!1),r()}function b(){u="",n(t.paymentUpfront,!0),n(t.paymentKlarna,!1),r()}function P(){u="klarna",n(t.paymentUpfront,!1),n(t.paymentKlarna,!0),r()}(O=t.subscriptionOnly)==null||O.addEventListener("click",c),(f=t.subscriptionOnlyMonthly)==null||f.addEventListener("click",l),(I=t.bundleMuse)==null||I.addEventListener("click",o),(g=t.bundleBrainbit)==null||g.addEventListener("click",d),(T=t.paymentUpfront)==null||T.addEventListener("click",b),(L=t.paymentKlarna)==null||L.addEventListener("click",P),c(),r()}}function H(){const i={amaze:{discountName:"Amaze Creator Bundle discount",couponId:N()?"YiM3PNXT":"Gu2jGXBe",amountOff:"199"},usat:{discountName:"USAT 15% Off",couponId:N()?"YcvRrNe2":"9xjBd0Rf",percentOff:"15"}};if(!window.location.pathname.includes(`/${v}/`))return;const a=document.querySelectorAll("#payment-upfront"),t=document.querySelectorAll("#payment-klarna"),y=document.querySelectorAll("#product-buy-primary-btn");function p(){const o=window.location.pathname.split(`/${v}/`)[1];if(o)return Y(o),o}function m(o,d){o==null||o.classList[d?"add":"remove"]("active")}const u=p();if(!u||!i[u])return;const n=i[u];let e="";function r(){if(!u||!i[u])return;const o=N()?"https://accounts.development.listenalphabeats.nl/sign-up":"https://accounts.listenalphabeats.com/sign-up",d=new URLSearchParams([["partner",u],["couponId",n.couponId],["discountName",n.discountName]]);n.amountOff?d.append("amountOff",n.amountOff):n.percentOff&&d.append("percentOff",n.percentOff),e&&d.append("paymentProvider",e),y.forEach(b=>b.href=`${o}?${d}`)}function c(){e="",a.forEach(o=>m(o,!0)),t.forEach(o=>m(o,!1)),r()}function l(){e="klarna",a.forEach(o=>m(o,!1)),t.forEach(o=>m(o,!0)),r()}a.forEach(o=>o.addEventListener("click",c)),t.forEach(o=>o.addEventListener("click",l)),r()}return K(),F(),document.addEventListener("DOMContentLoaded",()=>{A()}),h.NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID=k,h.PARTNERS_PATH=v,h.conditionalCookieBanner=K,h.getCookie=R,h.getNewsletterDiscountParams=D,h.getPartnerNameInStorage=A,h.guardCioFormsWithRecaptcha=F,h.handleCartBlackFriday=W,h.handleCartWithDiscount=q,h.handleNewsletterDiscountPopup=G,h.handlePartnerLanding=H,h.isGooglebot=_,h.isStaging=N,h.redirectToPartnerPage=U,h.runAfterConsentResolved=j,h.safeDecodeURIComponent=M,h.setPartnerNameInStorage=Y,Object.defineProperty(h,Symbol.toStringTag,{value:"Module"}),h}({});
