export function runWhenAvailable({
  getMethod,
  callback,
  interval = 100,
  timeout = 2000,
}) {
  const startTime = Date.now()
  const checkMethod = setInterval(() => {
    if (typeof getMethod() === 'function') {
      clearInterval(checkMethod)
      callback()
    } else if (Date.now() - startTime >= timeout) {
      clearInterval(checkMethod)
      console.warn(`method is not available after ${timeout}ms`)
    }
  }, interval)
}
