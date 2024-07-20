const BASE_URL = "https://cdn.jsdelivr.net/gh/listenalphabeats/site-scripts";

export function getScriptString(tagVersion, path) {
  return `<script src="${BASE_URL}@${tagVersion}/${path}" defer></script>`;
}
