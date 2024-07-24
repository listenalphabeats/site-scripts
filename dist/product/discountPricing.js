const titlePriceDiv = document.getElementById("title-price");
const strikedSpan = titlePriceDiv == null ? void 0 : titlePriceDiv.querySelector("span");
const titlePriceDivMob = document.getElementById("title-price-mob");
const strikedSpanMob = titlePriceDivMob == null ? void 0 : titlePriceDivMob.querySelector("span");
const yearBundleDiv = document.getElementById("year-bundle-price");
const monthBundleDiv = document.getElementById("month-bundle-price");
function parsePageCurrentPrice() {
  var _a, _b, _c, _d, _e;
  const titleStrikedPrice = parseFloat(
    ((_a = strikedSpan == null ? void 0 : strikedSpan.textContent) == null ? void 0 : _a.replace("$", "")) || "689"
  );
  const titleCurrentPrice = parseFloat(
    ((_c = (_b = titlePriceDiv == null ? void 0 : titlePriceDiv.childNodes) == null ? void 0 : _b[1].nodeValue) == null ? void 0 : _c.trim().replace("$", "")) || "499"
  );
  const yearBundlePrice = parseFloat(
    ((_d = yearBundleDiv == null ? void 0 : yearBundleDiv.textContent) == null ? void 0 : _d.split("$")[1]) || "499"
  );
  const monthBundlePrice = parseFloat(
    ((_e = monthBundleDiv == null ? void 0 : monthBundleDiv.textContent) == null ? void 0 : _e.split("$")[1]) || "365.99"
  );
  return {
    titleStrikedPrice,
    titleCurrentPrice,
    yearBundlePrice,
    monthBundlePrice
  };
}
function updateBundlePriceHtml(oldPrice, newPrice, div) {
  if (div) {
    const originalText = div.textContent;
    if (originalText) {
      div.innerHTML = originalText.replace(
        /\$[0-9,.]+/,
        `<span class="text-style-strikethrough text-color-neutral-82 text-weight-normal">$${oldPrice.toFixed(
          2
        )}</span> $${newPrice.toFixed(2)}`
      );
    }
  }
}
function upTitlePrice(strikedAfter, currentAfter) {
  if (titlePriceDiv) {
    if (strikedSpan) {
      strikedSpan.textContent = `$${strikedAfter.toFixed(2)}`;
    }
    titlePriceDiv.childNodes[1].nodeValue = ` $${currentAfter.toFixed(2)}`;
  }
  if (titlePriceDivMob) {
    if (strikedSpanMob) {
      strikedSpanMob.textContent = `$${strikedAfter.toFixed(2)}`;
    }
    titlePriceDivMob.childNodes[1].nodeValue = ` $${currentAfter.toFixed(2)}`;
  }
}
function applyDiscount(before, value, isPercentage = false) {
  const titlePrice = before.titleCurrentPrice;
  const yearPrice = before.yearBundlePrice;
  const monthPrice = before.monthBundlePrice;
  if (isPercentage) {
    upTitlePrice(titlePrice, titlePrice * value);
    updateBundlePriceHtml(yearPrice, yearPrice * value, yearBundleDiv);
    updateBundlePriceHtml(monthPrice, monthPrice * value, monthBundleDiv);
  } else {
    upTitlePrice(titlePrice, titlePrice - value);
    updateBundlePriceHtml(yearPrice, yearPrice - value, yearBundleDiv);
    updateBundlePriceHtml(monthPrice, monthPrice - value, monthBundleDiv);
  }
}
function discountPricing() {
  var _a, _b;
  const before = parsePageCurrentPrice();
  const rewardful = getCookie("rewardful.referral");
  const newsletterParams = getNewsletterDiscountParams();
  const newsletterPercentOff = Number(
    new URLSearchParams(newsletterParams || "").get("percentOff") || 0
  );
  const rewardfulPercentOff = ((_a = rewardful == null ? void 0 : rewardful.coupon) == null ? void 0 : _a.percent_off) || 0;
  const rewardfulAmountOff = ((_b = rewardful == null ? void 0 : rewardful.coupon) == null ? void 0 : _b.amount_off) || 0;
  const yearPrice = before.yearBundlePrice;
  const newsletterDiscount = yearPrice * (newsletterPercentOff / 100);
  const rewardfulDiscount = yearPrice * (rewardfulPercentOff / 100);
  const maxDiscount = Math.max(
    newsletterDiscount,
    rewardfulDiscount,
    rewardfulAmountOff
  );
  if (maxDiscount === 0) return;
  if (rewardfulAmountOff === maxDiscount) {
    applyDiscount(before, rewardfulAmountOff);
  } else {
    const discountMultiplier = 1 - Math.max(newsletterPercentOff, rewardfulPercentOff) / 100;
    applyDiscount(before, discountMultiplier, true);
  }
}
discountPricing();
