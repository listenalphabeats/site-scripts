```html
<!-- LOCAL -->
<script>
  const script = document.createElement('script')
  script.defer = true
  script.src =
    window.location.host === 'staging-alphabeats.webflow.io'
      ? 'http://localhost:3001/dist/bundle.js?v=' + new Date().getTime()
      : 'https://cdn.jsdelivr.net/gh/listenalphabeats/site-scripts@1.1.21/dist/bundle.js'
  document.head.appendChild(script)
</script>
```

```html
<!-- CDN -->
<script src="https://cdn.jsdelivr.net/gh/listenalphabeats/site-scripts@1.1.21/dist/bundle.js"></script>
```
