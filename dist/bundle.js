var k=(e=>(e.RewardfulReferral="rewardful.referral",e))(k||{});function safeDecodeURIComponent(e){return G(e)?decodeURIComponent(e):e}function G(e){try{const t=decodeURIComponent(e);return encodeURIComponent(t)!==e}catch{return!1}}function getCookie(e){e+="=";const n=document.cookie.split(";").find(o=>o.trim().substring(0,e.length)===e);return n?JSON.parse(safeDecodeURIComponent(n.trim().substring(e.length))):null}const NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID="newsletterDiscountParams";function getNewsletterDiscountParams(){return localStorage.getItem(NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID)}function isGooglebot(){return/Googlebot/.test(window.navigator.userAgent)}function runAfterConsentResolved({callback:e,fallback:t,timeout:n=18e3}){const s=Date.now(),o=setInterval(()=>{if(window.FsCC&&window.FsCC.consentController){if(clearInterval(o),window.FsCC.store.confirmed){e();return}const i=()=>{var a;(a=window.FsCC)!=null&&a.store.confirmed&&(clearTimeout(c),e())},c=setTimeout(()=>{var a,f;(f=(a=window.FsCC)==null?void 0:a.consentController)==null||f.off("updateconsents",i),t()},n);window.FsCC.consentController.on("updateconsents",i)}else Date.now()-s>=n&&(clearInterval(o),t())},500)}function runWhenAvailable(e,t,n=100,s=4e3){const o=Date.now();function i(){typeof window[e]=="function"?t():Date.now()-o<s?setTimeout(i,n):console.error(`${e} is not available after ${s}ms`)}i()}function runWhenPostHogIsReady({getFeatureFlag:e,callback:t,fallback:n,timeout:s=2e3}){const o=Date.now(),i=setInterval(()=>{e()!==void 0?(clearInterval(i),t()):Date.now()-o>=s&&(clearInterval(i),n())},500)}function handleNewsletterDiscountPopup(){var S,L,D;const e="couponId=ZdKIcH6B&percentOff=10&discountName=10% Newsletter Discount",t="discount-modal",n="discount-modal-background",s="discount-modal-close-button",o="discount-form",i="formSubmittedAt",c="formDismissedAt";function a(u){const A={show:"flex",hide:"none"}[u],R=document.getElementById(t);R&&(R.style.display=A)}function f(){a("show"),(window.dataLayer||[]).push({event:"show-newsletter-discount-popup"})}function p(){a("hide")}function I(){localStorage.setItem(i,String(new Date().getTime())),localStorage.setItem(NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID,e);const u=document.querySelector(".popup-modal_success-message-wrapper a");u&&(u.removeAttribute("href"),u.addEventListener("click",p))}function g(){localStorage.setItem(c,String(new Date().getTime())),p()}if(isGooglebot()||getCookie(k.RewardfulReferral)||localStorage.getItem(i))return;const w=localStorage.getItem(c);if(w&&new Date().getTime()-Number(w)<24*60*60*1e3)return;const m=4e3;function r(){var u;return(u=window.posthog)==null?void 0:u.getFeatureFlag("newsletter-discount-popup-timeout-2")}function y(){const u=r()==="test-15sec-delay"?15e3:m;setTimeout(f,u)}function P(){setTimeout(f,m)}runWhenPostHogIsReady({getFeatureFlag:r,callback:y,fallback:P}),(S=document.getElementById(o))==null||S.addEventListener("submit",I),(L=document.getElementById(s))==null||L.addEventListener("click",g),(D=document.getElementById(n))==null||D.addEventListener("click",g)}function setSubmitBtnsDisabledAttr(e){document.querySelectorAll('form input[type="submit"]').forEach(function(n){e?n.setAttribute("disabled","true"):n.removeAttribute("disabled")})}function recaptchaCallback(){setSubmitBtnsDisabledAttr(!1)}function M(e){const t=document.getElementById(e),n=document.querySelector(`#${e} .recaptcha-wrapper`);!t||!n||(n.style.display=t.checkValidity()?"flex":"none")}function showRecaptchaOnValidForm(e){const t=document.querySelector(`#${e} input[type=email]`),n=document.querySelector(`#${e} input[type=checkbox]`);t==null||t.addEventListener("input",()=>M(e)),n==null||n.addEventListener("change",()=>M(e))}const J="no-cookie-banner";function conditionalCookieBanner(){if(new URLSearchParams(window.location.search).has(J))return;const t=document.createElement("script");t.src="https://cdn.jsdelivr.net/npm/@finsweet/cookie-consent@1/fs-cc.js",t.setAttribute("fs-cc-domain",".listenalphabeats.com"),t.setAttribute("fs-cc-mode","opt-in"),t.async=!0;const n=document.createElement("script");n.src="https://cdn.jsdelivr.net/gh/digital-sparks/cookie-consent-boost@1/dist/index.js",n.async=!0,document.head.appendChild(t),document.head.appendChild(n)}function handleDiscount(){setTimeout(()=>z(),400)}function z(){var T,v,_,x;const e=document.getElementById("title-price"),t=document.getElementById("discount-badge"),n=document.getElementById("discount-badge-title"),s=e==null?void 0:e.querySelector("span"),o=document.getElementById("title-price-mob"),i=o==null?void 0:o.querySelector("span"),c=document.getElementById("year-bundle-price"),a=document.getElementById("month-bundle-price");function f(){var C,b,O,B,$;const l=parseFloat(((C=s==null?void 0:s.textContent)==null?void 0:C.replace("$",""))||"689"),d=parseFloat(((O=(b=e==null?void 0:e.childNodes)==null?void 0:b[1].nodeValue)==null?void 0:O.trim().replace("$",""))||"499"),E=parseFloat(((B=c==null?void 0:c.textContent)==null?void 0:B.split("$")[1])||"499"),h=parseFloat((($=a==null?void 0:a.textContent)==null?void 0:$.split("$")[1])||"365.99");return{titleStrikedPrice:l,titleCurrentPrice:d,yearBundlePrice:E,monthBundlePrice:h}}function p(l,d,E){if(E){const h=E.textContent;h&&(E.innerHTML=h.replace(/\$[0-9,.]+/,`<span class="text-style-strikethrough text-color-neutral-82 text-weight-normal">$${l.toFixed(2)}</span> $${d.toFixed(2)}`))}}function I(l,d){e&&(s&&(s.textContent=`$${l.toFixed(2)}`),e.childNodes[1].nodeValue=` $${d.toFixed(2)}`),o&&(i&&(i.textContent=`$${l.toFixed(2)}`),o.childNodes[1].nodeValue=` $${d.toFixed(2)}`)}function g(l,d,E=!1){const h=l.titleCurrentPrice,C=l.yearBundlePrice,b=l.monthBundlePrice;E?(I(h,h*d),p(C,C*d,c),p(b,b*d,a)):(I(h,h-d),p(C,C-d,c),p(b,b-d,a))}function w(l){t==null||t.setAttribute("style","display: flex;"),n&&(n.textContent=l)}const m=f(),r=getCookie(k.RewardfulReferral),y=getNewsletterDiscountParams(),P=Number(new URLSearchParams(y||"").get("percentOff")||0),S=((T=r==null?void 0:r.coupon)==null?void 0:T.percent_off)||0,L=((v=r==null?void 0:r.coupon)==null?void 0:v.amount_off)||0,D=m.yearBundlePrice,u=D*(P/100),A=D*(S/100),R=Math.max(u,A,L);if(R!==0)if(L===R)g(m,L),t==null||t.setAttribute("style","display: flex;"),w(((_=r==null?void 0:r.coupon)==null?void 0:_.name)||"");else{const l=1-Math.max(P,S)/100;g(m,l,!0);const d=(P>S?new URLSearchParams(y||"").get("discountName"):(x=r==null?void 0:r.coupon)==null?void 0:x.name)||"Discount";w(d)}}function handleAddToCartPricing(){const e="https://accounts.listenalphabeats.com/sign-up";let t="YEARLY",n="";const s=document.getElementById("plan-annual"),o=document.getElementById("plan-monthly"),i=document.getElementById("payment-upfront"),c=document.getElementById("payment-klarna"),a=document.getElementById("product-buy-primary-btn"),f=document.getElementById("product-buy-primary-btn-mobile");function p(){t="YEARLY",n="",o==null||o.classList.remove("active"),s==null||s.classList.add("active"),c==null||c.classList.remove("disabled"),g(),m()}function I(){t="MONTHLY",s==null||s.classList.remove("active"),o==null||o.classList.add("active"),c==null||c.classList.add("disabled"),g(),m()}function g(){n="",c==null||c.classList.remove("active"),i==null||i.classList.add("active"),m()}function w(){n="klarna",i==null||i.classList.remove("active"),c==null||c.classList.add("active"),m()}function m(){let r=e+"?plan="+t;const y=getNewsletterDiscountParams();y&&(r+="&"+y),n&&(r+="&paymentProvider="+n),a&&(a.href=r),f&&(f.href=r)}s==null||s.addEventListener("click",p),o==null||o.addEventListener("click",I),i==null||i.addEventListener("click",g),c==null||c.addEventListener("click",w),m()}window.addEventListener("load",()=>{setSubmitBtnsDisabledAttr(!0)});conditionalCookieBanner();document.addEventListener("DOMContentLoaded",()=>{setSubmitBtnsDisabledAttr(!0),runAfterConsentResolved({callback:handleNewsletterDiscountPopup,fallback:handleNewsletterDiscountPopup,timeout:18e3})});;