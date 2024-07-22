function runAfterConsentResolved({
  callback,
  fallback,
  timeout = 18e3
}) {
  const start = Date.now();
  const checkFsCC = setInterval(() => {
    if (window.FsCC && window.FsCC.consentController) {
      clearInterval(checkFsCC);
      if (window.FsCC.store.confirmed) {
        callback();
        return;
      }
      const updateConsentsHandler = () => {
        if (window.FsCC.store.confirmed) {
          clearTimeout(checkConfirmation);
          callback();
        }
      };
      const checkConfirmation = setTimeout(() => {
        window.FsCC.consentController.off(
          "updateconsents",
          updateConsentsHandler
        );
        fallback();
      }, timeout);
      window.FsCC.consentController.on("updateconsents", updateConsentsHandler);
    } else if (Date.now() - start >= timeout) {
      clearInterval(checkFsCC);
      fallback();
    }
  }, 500);
}
