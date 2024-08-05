export function conditionalCookieBanner() {
  const params = new URLSearchParams(window.location.search)

  if (params.has('no-cookie-banner')) return

  /** Finsweet Cookie Consent script */
  const script = document.createElement('script')
  script.src =
    'https://cdn.jsdelivr.net/npm/@finsweet/cookie-consent@1/fs-cc.js'
  script.setAttribute('fs-cc-domain', '.listenalphabeats.com')
  script.setAttribute('fs-cc-mode', 'opt-in')
  script.async = true

  /** Cookie Consent Boost script */
  const boostScript = document.createElement('script')
  boostScript.src =
    'https://cdn.jsdelivr.net/gh/digital-sparks/cookie-consent-boost@1/dist/index.js'
  boostScript.async = true

  document.head.appendChild(script)
  document.head.appendChild(boostScript)
}
