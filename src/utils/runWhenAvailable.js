function runWhenAvailable(
  functionName,
  callback,
  interval = 100,
  timeout = 4000
) {
  const startTime = Date.now()

  function checkFunction() {
    if (typeof window[functionName] === 'function') {
      callback()
    } else if (Date.now() - startTime < timeout) {
      setTimeout(checkFunction, interval)
    } else {
      console.error(`${functionName} is not available after ${timeout}ms`)
    }
  }

  checkFunction()
}

window.runWhenAvailable = runWhenAvailable
