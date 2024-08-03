export const logFunctionNames = () => {
  return {
    name: 'log-function-names',
    renderChunk(code, chunk) {
      const functionNames = []
      const functionRegex = /export\s+function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)/g
      let match
      while ((match = functionRegex.exec(code)) !== null) {
        functionNames.push(match[1])
      }
      console.log('Functions in chunk:', chunk.fileName)
      console.log(functionNames)
      return null
    },
  }
}
