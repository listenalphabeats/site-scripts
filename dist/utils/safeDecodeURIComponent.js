function safeDecodeURIComponent(str) {
  return isURLEncoded(str) ? decodeURIComponent(str) : str;
}
function isURLEncoded(str) {
  try {
    const decodedStr = decodeURIComponent(str);
    return encodeURIComponent(decodedStr) !== str;
  } catch (e) {
    return false;
  }
}
