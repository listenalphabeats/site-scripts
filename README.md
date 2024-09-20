```html
<!--
<script defer src="https://cdn.jsdelivr.net/gh/listenalphabeats/site-scripts@1.0.32/dist/bundle.js"></script>
-->

<script>
  const script = document.createElement('script')
  script.defer = true
  script.src =
    window.location.host === 'staging-alphabeats.webflow.io'
      ? 'http://localhost:3000/dist/bundle.js?v=' + new Date().getTime()
      : 'https://cdn.jsdelivr.net/gh/listenalphabeats/site-scripts@1.0.32/dist/bundle.js'
  document.head.appendChild(script)
</script>
```
