const titlePriceDiv = document.getElementById("title-price");
const strikedSpan = titlePriceDiv == null ? void 0 : titlePriceDiv.querySelector("span");
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
function upTitlePrice(strikedAfter, currentAfter) {
  if (!titlePriceDiv) return;
  if (strikedSpan) {
    strikedSpan.textContent = `$${strikedAfter.toFixed(2)}`;
  }
  titlePriceDiv.childNodes[1].nodeValue = ` $${currentAfter.toFixed(2)}`;
}
function upYearBundlePrice(oldPrice, newPrice) {
  if (yearBundleDiv) {
    yearBundleDiv.innerHTML = `1-Year bundle - <span class="text-style-strikethrough text-color-neutral-82">$${oldPrice.toFixed(
      2
    )}</span> $${newPrice.toFixed(2)}`;
  }
}
function upMonthBundlePrice(oldPrice, newPrice) {
  if (monthBundleDiv) {
    monthBundleDiv.innerHTML = `1-Month bundle - <span class="text-style-strikethrough text-color-neutral-82">$${oldPrice.toFixed(
      2
    )}</span> $${newPrice.toFixed(2)}`;
  }
}
function discountPricing() {
  const before = parsePageCurrentPrice();
  const newsletterDiscountParams = getNewsletterDiscountParams();
  const rewardful = getCookie("rewardful.referral");
  let amountOff = 0;
  let percentOff = 0;
  if (newsletterDiscountParams) {
    const params = new URLSearchParams(newsletterDiscountParams);
    percentOff = Number(params.get("percentOff") || 0);
  } else if (rewardful == null ? void 0 : rewardful.coupon) {
    if (rewardful.coupon.amount_off) {
      amountOff = rewardful.coupon.amount_off;
    } else if (rewardful.coupon.percent_off) {
      percentOff = rewardful.coupon.percent_off;
    }
  }
  if (amountOff) {
    upTitlePrice(before.titleCurrentPrice, before.titleCurrentPrice - amountOff);
    upYearBundlePrice(
      before.yearBundlePrice,
      before.yearBundlePrice - amountOff
    );
    upMonthBundlePrice(
      before.monthBundlePrice,
      before.monthBundlePrice - amountOff
    );
  } else if (percentOff) {
    upTitlePrice(
      before.titleCurrentPrice,
      before.titleCurrentPrice * (1 - percentOff / 100)
    );
    upYearBundlePrice(
      before.yearBundlePrice,
      before.yearBundlePrice * (1 - percentOff / 100)
    );
    upMonthBundlePrice(
      before.monthBundlePrice,
      before.monthBundlePrice * (1 - percentOff / 100)
    );
  }
}
discountPricing();
