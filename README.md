```js
<script>
  const script = document.createElement('script'); script.defer = true;
  script.src = 'http://localhost:3000/dist/bundle.js?v=' + new Date().getTime();
  document.head.appendChild(script);
</script>
```
