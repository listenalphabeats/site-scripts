function getCookie(name) {
  name += "=";
  const cookies = document.cookie.split(";");
  const cookie = cookies.find((c) => c.trim().substring(0, name.length) === name);
  const data = cookie ? JSON.parse(safeDecodeURIComponent(cookie.trim().substring(name.length))) : null;
  return data;
}
