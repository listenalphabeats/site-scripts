var F=(e=>(e.RewardfulReferral="rewardful.referral",e))(F||{});function safeDecodeURIComponent(e){return V(e)?decodeURIComponent(e):e}function V(e){try{const t=decodeURIComponent(e);return encodeURIComponent(t)!==e}catch{return!1}}function getCookie(e){e+="=";const n=document.cookie.split(";").find(i=>i.trim().substring(0,e.length)===e);return n?JSON.parse(safeDecodeURIComponent(n.trim().substring(e.length))):null}const NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID="newsletterDiscountParams";function getNewsletterDiscountParams(){return localStorage.getItem(NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID)}function isGooglebot(){return/Googlebot/.test(window.navigator.userAgent)}function runAfterConsentResolved({callback:e,fallback:t,timeout:n=18e3}){const c=Date.now(),i=setInterval(()=>{if(window.FsCC&&window.FsCC.consentController){if(clearInterval(i),window.FsCC.store.confirmed){e();return}const s=()=>{var a;(a=window.FsCC)!=null&&a.store.confirmed&&(clearTimeout(o),e())},o=setTimeout(()=>{var a,l;(l=(a=window.FsCC)==null?void 0:a.consentController)==null||l.off("updateconsents",s),t()},n);window.FsCC.consentController.on("updateconsents",s)}else Date.now()-c>=n&&(clearInterval(i),t())},500)}function runWhenAvailable(e,t,n=100,c=4e3){const i=Date.now();function s(){typeof window[e]=="function"?t():Date.now()-i<c?setTimeout(s,n):console.error(`${e} is not available after ${c}ms`)}s()}function runWhenPostHogIsReady({getFeatureFlag:e,callback:t,fallback:n,timeout:c=2e3}){const i=Date.now(),s=setInterval(()=>{e()!==void 0?(clearInterval(s),t()):Date.now()-i>=c&&(clearInterval(s),n())},500)}function protectCIOFormsWithRecaptcha(){const e="6LfVlSEqAAAAAGmKB7MxaOG6vhSpe3o5bRffZ_gX",t=window.location.host==="staging-alphabeats.webflow.io"?"https://api.development.listenalphabeats.nl/v1/forms":"https://api.listenalphabeats.com/v1/forms",n=document.createElement("script");n.async=!0,n.src=`https://www.google.com/recaptcha/api.js?render=${e}`,document.head.appendChild(n);let c=!1;async function i(s){var h;const o=s.target,a=o.dataset.cioFormId;if(c){console.debug("form already isSubmitting:",c);return}if(!o.checkValidity()){console.debug("form is not valid");return}if(!a){console.debug("Form is not cunnected to CustomerIo");return}if(s.preventDefault(),s.stopPropagation(),!((h=window.grecaptcha)!=null&&h.execute)){console.debug("No reCAPTCHA available, cancelling CIO submission");return}c=!0;const l=Object.fromEntries(new FormData(o));l.email&&(l.email=String(l.email).toLowerCase());const p=await window.grecaptcha.execute(e,{action:"submit"}),w={data:l,recaptchaToken:p};console.debug("payload:",w);const g={method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(w)};try{const d=await fetch(`${t}/${a}/submit`,g);console.debug("resp.status:",d.status);const r=o.querySelector('input[type="submit"]');r?r.click():o.submit()}catch(d){console.debug("error:",d)}finally{c=!1}}document.addEventListener("submit",i),window.addEventListener("load",function(){[...document.forms].forEach(s=>{s.addEventListener("submit",i)})})}function handleNewsletterDiscountPopup(){var I,L,P;const e="couponId=ZdKIcH6B&percentOff=10&discountName=10% Newsletter Discount",t="discount-modal",n="discount-modal-background",c="discount-modal-close-button",i="discount-form",s="formSubmittedAt",o="formDismissedAt";function a(f){const v={show:"flex",hide:"none"}[f],D=document.getElementById(t);D&&(D.style.display=v)}function l(){a("show"),(window.dataLayer||[]).push({event:"show-newsletter-discount-popup"})}function p(){a("hide")}function w(){localStorage.setItem(s,String(new Date().getTime())),localStorage.setItem(NEWSLETTER_DISCOUNT_PARAMS_STORAGE_ID,e);const f=document.querySelector(".popup-modal_success-message-wrapper a");f&&(f.removeAttribute("href"),f.addEventListener("click",p))}function g(){localStorage.setItem(o,String(new Date().getTime())),p()}if(isGooglebot()||!["/","/product","/shop"].includes(window.location.pathname)||getCookie(F.RewardfulReferral)||localStorage.getItem(s))return;const h=localStorage.getItem(o);if(h&&new Date().getTime()-Number(h)<24*60*60*1e3)return;const d=4e3;function r(){var f;return(f=window.posthog)==null?void 0:f.getFeatureFlag("newsletter-discount-popup-timeout-2")}function y(){const f=r()==="test-15sec-delay"?15e3:d;setTimeout(l,f)}function A(){setTimeout(l,d)}runWhenPostHogIsReady({getFeatureFlag:r,callback:y,fallback:A}),(I=document.getElementById(i))==null||I.addEventListener("submit",w),(L=document.getElementById(c))==null||L.addEventListener("click",g),(P=document.getElementById(n))==null||P.addEventListener("click",g)}function setSubmitBtnsDisabledAttr(e){document.querySelectorAll('form input[type="submit"]').forEach(function(n){e?n.setAttribute("disabled","true"):n.removeAttribute("disabled")})}function recaptchaCallback(){setSubmitBtnsDisabledAttr(!1)}function M(e){const t=document.getElementById(e),n=document.querySelector(`#${e} .recaptcha-wrapper`);!t||!n||(n.style.display=t.checkValidity()?"flex":"none")}function showRecaptchaOnValidForm(e){const t=document.querySelector(`#${e} input[type=email]`),n=document.querySelector(`#${e} input[type=checkbox]`);t==null||t.addEventListener("input",()=>M(e)),n==null||n.addEventListener("change",()=>M(e))}function conditionalCookieBanner(){if(new URLSearchParams(window.location.search).has("no-cookie-banner"))return;const t=document.createElement("script");t.src="https://cdn.jsdelivr.net/npm/@finsweet/cookie-consent@1/fs-cc.js",t.setAttribute("fs-cc-domain",".listenalphabeats.com"),t.setAttribute("fs-cc-mode","opt-in"),t.async=!0;const n=document.createElement("script");n.src="https://cdn.jsdelivr.net/gh/digital-sparks/cookie-consent-boost@1/dist/index.js",n.async=!0,document.head.appendChild(t),document.head.appendChild(n)}function handleDiscount(){setTimeout(()=>X(),400)}function X(){var T,R,k,x;const e=document.getElementById("title-price"),t=document.getElementById("discount-badge"),n=document.getElementById("discount-badge-title"),c=e==null?void 0:e.querySelector("span"),i=document.getElementById("title-price-mob"),s=i==null?void 0:i.querySelector("span"),o=document.getElementById("year-bundle-price"),a=document.getElementById("month-bundle-price");function l(){var E,S,_,O,$;const m=parseFloat(((E=c==null?void 0:c.textContent)==null?void 0:E.replace("$",""))||"689"),u=parseFloat(((_=(S=e==null?void 0:e.childNodes)==null?void 0:S[1].nodeValue)==null?void 0:_.trim().replace("$",""))||"499"),C=parseFloat(((O=o==null?void 0:o.textContent)==null?void 0:O.split("$")[1])||"499"),b=parseFloat((($=a==null?void 0:a.textContent)==null?void 0:$.split("$")[1])||"365.99");return{titleStrikedPrice:m,titleCurrentPrice:u,yearBundlePrice:C,monthBundlePrice:b}}function p(m,u,C){if(C){const b=C.textContent;b&&(C.innerHTML=b.replace(/\$[0-9,.]+/,`<span class="text-style-strikethrough text-color-neutral-82 text-weight-normal">$${m.toFixed(2)}</span> $${u.toFixed(2)}`))}}function w(m,u){e&&(c&&(c.textContent=`$${m.toFixed(2)}`),e.childNodes[1].nodeValue=` $${u.toFixed(2)}`),i&&(s&&(s.textContent=`$${m.toFixed(2)}`),i.childNodes[1].nodeValue=` $${u.toFixed(2)}`)}function g(m,u,C=!1){const b=m.titleCurrentPrice,E=m.yearBundlePrice,S=m.monthBundlePrice;C?(w(b,b*u),p(E,E*u,o),p(S,S*u,a)):(w(b,b-u),p(E,E-u,o),p(S,S-u,a))}function h(m){t==null||t.setAttribute("style","display: flex;"),n&&(n.textContent=m)}const d=l(),r=getCookie(F.RewardfulReferral),y=getNewsletterDiscountParams(),A=Number(new URLSearchParams(y||"").get("percentOff")||0),I=((T=r==null?void 0:r.coupon)==null?void 0:T.percent_off)||0,L=((R=r==null?void 0:r.coupon)==null?void 0:R.amount_off)||0,P=d.yearBundlePrice,f=P*(A/100),v=P*(I/100),D=Math.max(f,v,L);if(D!==0)if(L===D)g(d,L),t==null||t.setAttribute("style","display: flex;"),h(((k=r==null?void 0:r.coupon)==null?void 0:k.name)||"");else{const m=1-Math.max(A,I)/100;g(d,m,!0);const u=(A>I?new URLSearchParams(y||"").get("discountName"):(x=r==null?void 0:r.coupon)==null?void 0:x.name)||"Discount";h(u)}}function handleAddToCartPricing(){const e="https://accounts.listenalphabeats.com/sign-up";let t="YEARLY",n="";const c=document.getElementById("plan-annual"),i=document.getElementById("plan-monthly"),s=document.getElementById("payment-upfront"),o=document.getElementById("payment-klarna"),a=document.getElementById("product-buy-primary-btn"),l=document.getElementById("product-buy-primary-btn-mobile");function p(){t="YEARLY",n="",i==null||i.classList.remove("active"),c==null||c.classList.add("active"),o==null||o.classList.remove("disabled"),g(),d()}function w(){t="MONTHLY",c==null||c.classList.remove("active"),i==null||i.classList.add("active"),o==null||o.classList.add("disabled"),g(),d()}function g(){n="",o==null||o.classList.remove("active"),s==null||s.classList.add("active"),d()}function h(){n="klarna",s==null||s.classList.remove("active"),o==null||o.classList.add("active"),d()}function d(){let r=e+"?plan="+t;const y=getNewsletterDiscountParams();y&&(r+="&"+y),n&&(r+="&paymentProvider="+n),a&&(a.href=r),l&&(l.href=r)}c==null||c.addEventListener("click",p),i==null||i.addEventListener("click",w),s==null||s.addEventListener("click",g),o==null||o.addEventListener("click",h),d()}conditionalCookieBanner();protectCIOFormsWithRecaptcha();document.addEventListener("DOMContentLoaded",()=>{runAfterConsentResolved({callback:handleNewsletterDiscountPopup,fallback:handleNewsletterDiscountPopup,timeout:18e3})});;