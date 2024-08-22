var T=(t=>(t.RewardfulReferral="rewardful.referral",t))(T||{});function safeDecodeURIComponent(t){return j(t)?decodeURIComponent(t):t}function j(t){try{const o=decodeURIComponent(t);return encodeURIComponent(o)!==t}catch{return!1}}function $(t){t+="=";const s=document.cookie.split(";").find(e=>e.trim().substring(0,t.length)===t);return s?JSON.parse(safeDecodeURIComponent(s.trim().substring(t.length))):null}const NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID="newsletterDiscountParams";function getNewsletterDiscountParams(){return localStorage.getItem(NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID)}function isGooglebot(){return/Googlebot/.test(window.navigator.userAgent)}function runAfterConsentResolved({callback:t,fallback:o,timeout:s=18e3}){const i=Date.now(),e=setInterval(()=>{if(window.FsCC&&window.FsCC.consentController){if(clearInterval(e),window.FsCC.store.confirmed){t();return}const a=()=>{var r;(r=window.FsCC)!=null&&r.store.confirmed&&(clearTimeout(m),t())},m=setTimeout(()=>{var r,b;(b=(r=window.FsCC)==null?void 0:r.consentController)==null||b.off("updateconsents",a),o()},s);window.FsCC.consentController.on("updateconsents",a)}else Date.now()-i>=s&&(clearInterval(e),o())},500)}function runWhenAvailable(t,o,s=100,i=4e3){const e=Date.now();function a(){typeof window[t]=="function"?o():Date.now()-e<i?setTimeout(a,s):console.error(`${t} is not available after ${i}ms`)}a()}function runWhenPostHogIsReady({getFeatureFlag:t,callback:o,fallback:s,timeout:i=2e3}){const e=Date.now(),a=setInterval(()=>{t()!==void 0?(clearInterval(a),o()):Date.now()-e>=i&&(clearInterval(a),s())},500)}function guardCioFormsWithRecaptcha(){const t=window.location.host==="staging-alphabeats.webflow.io",o=t?"6LcapSQqAAAAAOeM26drG-7e7aEq3Vj6e55WZtEg":"6Ld69iQqAAAAAOG5DHH8-UHywMnTBpgptTbQWDUb",s=t?"https://api.development.listenalphabeats.nl/v1/forms":"https://api.listenalphabeats.nl/v1/forms",i=document.createElement("script");i.async=!0,i.src=`https://www.google.com/recaptcha/enterprise.js?render=${o}`,document.head.appendChild(i);function e(){const c=document.querySelector(".grecaptcha-badge");c&&(c.style.right="-100%",setTimeout(()=>{c.style.visibility="visible"},400))}function a(c){const d=document.querySelector(".grecaptcha-badge");d&&(console.debug("badge:",d),d.style.right={visible:"-186px",hidden:"-100%"}[c])}let m=!1;function r(){m=!1,a("hidden")}async function b(c){var p,E;const d=c.target,I=d.dataset.cioFormId;function w(){c.preventDefault(),c.stopPropagation()}if(m||!d.checkValidity()||!I)return;w();const h=(p=window.grecaptcha)==null?void 0:p.enterprise;if(!(h!=null&&h.execute)){(E=window.Sentry)==null||E.captureMessage("grecaptcha.enterprise.execute is not available","warning");return}m=!0;const y=Object.fromEntries(new FormData(d)),l=Object.keys(y).filter(n=>n.includes("email"));l.length&&l.forEach(n=>y[n]=String(y[n]).toLowerCase()),h.ready(()=>{h.execute(o,{action:"submit"}).then(f=>{const L={method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({data:y,recaptchaToken:f})};return fetch(`${s}/${I}/submit`,L)}).then(()=>{r()}).catch(f=>{var C;(C=window.Sentry)==null||C.captureException(f),r()});const n=d.querySelector('input[type="submit"]');n?n.click():d.submit()})}document.addEventListener("submit",c=>{b(c),r()}),window.addEventListener("load",function(){e(),[...document.forms].forEach(c=>{c.addEventListener("submit",d=>{b(d)}),c.dataset.cioFormId&&(c.addEventListener("focusin",()=>{a("visible")}),c.addEventListener("focusout",()=>setTimeout(()=>a("hidden"),4e3)))})})}function handleNewsletterDiscountPopup(){var h,y,l;const t="couponId=FjYlGRQJ&amountOff=25&discountName=$25 Newsletter Discount",o="discount-modal-a",s="discount-modal-background-a",i="discount-modal-close-button-a",e="discount-form-a",a="formSubmittedAt",m="formDismissedAt";function r(p){const E={show:"flex",hide:"none"}[p],n=document.getElementById(o);n&&(n.style.display=E)}function b(){r("show"),(window.dataLayer||[]).push({event:"show-newsletter-discount-popup"})}function c(){r("hide")}function d(){localStorage.setItem(a,String(new Date().getTime())),localStorage.setItem(NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID,t);const p=document.querySelector("#discount-form-a .popup-modal_success-message-wrapper a");p&&(p.removeAttribute("href"),p.addEventListener("click",c))}function I(){localStorage.setItem(m,String(new Date().getTime())),c()}if(isGooglebot()||!["/","/product","/shop"].includes(window.location.pathname)||$(T.RewardfulReferral)||localStorage.getItem(a))return;const w=localStorage.getItem(m);w&&new Date().getTime()-Number(w)<24*60*60*1e3||(setTimeout(b,2e3),(h=document.getElementById(e))==null||h.addEventListener("submit",d),(y=document.getElementById(i))==null||y.addEventListener("click",I),(l=document.getElementById(s))==null||l.addEventListener("click",I))}function conditionalCookieBanner(){if(new URLSearchParams(window.location.search).has("no-cookie-banner"))return;const o=document.createElement("script");o.src="https://cdn.jsdelivr.net/npm/@finsweet/cookie-consent@1/fs-cc.js",o.setAttribute("fs-cc-domain",".listenalphabeats.com"),o.setAttribute("fs-cc-mode","opt-in"),o.async=!0;const s=document.createElement("script");s.src="https://cdn.jsdelivr.net/gh/digital-sparks/cookie-consent-boost@1/dist/index.js",s.async=!0,document.head.appendChild(o),document.head.appendChild(s)}function handleDiscount(){setTimeout(()=>Q(),400)}function Q(){var R,F,k,x;const t=document.getElementById("title-price"),o=document.getElementById("discount-badge"),s=document.getElementById("discount-badge-title"),i=t==null?void 0:t.querySelector("span"),e=document.getElementById("title-price-mob"),a=e==null?void 0:e.querySelector("span"),m=document.getElementById("year-bundle-price"),r=document.getElementById("month-bundle-price"),b=document.querySelectorAll(".save-badge");function c(){var B,P,v,O,N;const u=parseFloat(((B=i==null?void 0:i.textContent)==null?void 0:B.replace("$",""))||"689"),g=parseFloat(((v=(P=t==null?void 0:t.childNodes)==null?void 0:P[1].nodeValue)==null?void 0:v.trim().replace("$",""))||"499"),A=parseFloat(((O=m==null?void 0:m.textContent)==null?void 0:O.split("$")[1])||"499"),S=parseFloat(((N=r==null?void 0:r.textContent)==null?void 0:N.split("$")[1])||"365.99");return{titleStrikedPrice:u,titleCurrentPrice:g,yearBundlePrice:A,monthBundlePrice:S}}function d(u,g,A){if(A){const S=A.textContent;S&&(A.innerHTML=S.replace(/\$[0-9,.]+/,`<span class="text-style-strikethrough text-color-neutral-82 text-weight-normal">$${u.toFixed(2)}</span> $${g.toFixed(2)}`))}}function I(u,g){t&&(i&&(i.textContent=`$${u.toFixed(2)}`),t.childNodes[1].nodeValue=` $${g.toFixed(2)}`),e&&(a&&(a.textContent=`$${u.toFixed(2)}`),e.childNodes[1].nodeValue=` $${g.toFixed(2)}`)}function w(u,g,A=!1){const S=u.titleCurrentPrice,B=u.yearBundlePrice,P=u.monthBundlePrice;A?(I(S,S*g),d(B,B*g,m),d(P,P*g,r)):(I(S,S-g),d(B,B-g,m),d(P,P-g,r))}function h(u){o==null||o.setAttribute("style","display: flex;"),s&&(s.textContent=u)}const y=c(),l=$(T.RewardfulReferral),p=getNewsletterDiscountParams(),E=Number(new URLSearchParams(p||"").get("percentOff")||0),n=Number(new URLSearchParams(p||"").get("amountOff")||0),f=((R=l==null?void 0:l.coupon)==null?void 0:R.percent_off)||0,C=((F=l==null?void 0:l.coupon)==null?void 0:F.amount_off)||0,L=y.yearBundlePrice,q=L*(E/100),H=L*(f/100),D=Math.max(q,H,n,C);if(D!==0)if(b.forEach(u=>u.style.visibility="hidden"),C===D)w(y,C),o==null||o.setAttribute("style","display: flex;"),h(((k=l==null?void 0:l.coupon)==null?void 0:k.name)||"");else if(n===D){w(y,n);const u=new URLSearchParams(p||"").get("discountName");o==null||o.setAttribute("style","display: flex;"),h(u)}else{const u=1-Math.max(E,f)/100;w(y,u,!0);const g=(E>f?new URLSearchParams(p||"").get("discountName"):(x=l==null?void 0:l.coupon)==null?void 0:x.name)||"Discount";h(g)}}function handleAddToCartPricing(){var w,h,y,l,p,E;const t="https://accounts.listenalphabeats.com/sign-up";let o="YEARLY",s="",i=!0;const e={annualButton:document.getElementById("plan-annual"),monthlyButton:document.getElementById("plan-monthly"),headbandYes:document.getElementById("headband-yes"),headbandNo:document.getElementById("headband-no"),paymentUpfront:document.getElementById("payment-upfront"),paymentKlarna:document.getElementById("payment-klarna"),annualFeatures:document.querySelectorAll(".annual-feature"),primaryButtonDesktop:document.getElementById("product-buy-primary-btn")};function a(n,f){n==null||n.classList[f?"add":"remove"]("active")}function m(n,f){n&&(n.style.display=f?"flex":"none")}function r(){let n=`${t}?plan=${o}`;const f=getNewsletterDiscountParams();f&&(n+=`&${f}`),s&&(n+=`&paymentProvider=${s}`),i||(n+="&includeBrainbit=false"),e.primaryButtonDesktop&&(e.primaryButtonDesktop.href=n)}function b(n){o=n?"YEARLY":"MONTHLY",a(e.annualButton,n),a(e.monthlyButton,!n),e.annualFeatures.forEach(f=>m(f,n&&(f!==e.paymentKlarna||i))),d()}function c(n){i=n,a(e.headbandYes,n),a(e.headbandNo,!n),e.paymentKlarna&&m(e.paymentKlarna,n&&o!=="MONTHLY"),d()}function d(){s="",a(e.paymentUpfront,!0),a(e.paymentKlarna,!1),r()}function I(){s="klarna",a(e.paymentUpfront,!1),a(e.paymentKlarna,!0),r()}(w=e.annualButton)==null||w.addEventListener("click",()=>b(!0)),(h=e.monthlyButton)==null||h.addEventListener("click",()=>b(!1)),(y=e.headbandYes)==null||y.addEventListener("click",()=>c(!0)),(l=e.headbandNo)==null||l.addEventListener("click",()=>c(!1)),(p=e.paymentUpfront)==null||p.addEventListener("click",d),(E=e.paymentKlarna)==null||E.addEventListener("click",I),r()}conditionalCookieBanner();guardCioFormsWithRecaptcha();document.addEventListener("DOMContentLoaded",()=>{runAfterConsentResolved({callback:handleNewsletterDiscountPopup,fallback:handleNewsletterDiscountPopup,timeout:4e3})});;