export function modifyOutputPlugin() {
  return {
    name: 'modify-output-plugin',
    generateBundle(_, bundle) {
      for (const [fileName, file] of Object.entries(bundle)) {
        if (fileName === 'main.js') {
          delete bundle[fileName]
          return
        }
        const anyFile: any = file
        if (
          anyFile.type === 'chunk' &&
          fileName.includes('.js') &&
          typeof anyFile.code === 'string'
        ) {
          anyFile.code = restoreExportedFnNames(anyFile.code)
        }
      }
    },
  }
}

function restoreExportedFnNames(input: string): string {
  // Regular expressions to match function declarations and the export statement
  const exportStatementRegex = /export\s*\{([^}]+)\}/

  // Match the export statement
  const exportMatch = input.match(exportStatementRegex)

  if (!exportMatch) return input

  // Extract function mappings from the export statement
  const exportMappings = exportMatch[1].split(',').map(item => {
    const [shortName, longName] = item.split(/\s+as\s+/).map(s => s.trim())
    return { shortName, longName }
  })

  // Replace short function names with long names in the code
  let processedCode = input
  exportMappings.forEach(mapping => {
    let functionNameRegex
    if (/^[a-zA-Z_]\w*$/.test(mapping.shortName)) {
      // If the short name is a valid identifier (letters, digits, underscores), use \b
      functionNameRegex = new RegExp(`\\b${mapping.shortName}\\b`, 'g')
    } else {
      // Otherwise, treat it as a special character
      const escapedShortName = mapping.shortName.replace(
        /[-\/\\^$*+?.()|[\]{}]/g,
        '\\$&'
      )
      functionNameRegex = new RegExp(`${escapedShortName}(?!\\w)`, 'g')
    }

    processedCode = processedCode.replace(functionNameRegex, mapping.longName)
  })

  // Remove the export statement
  processedCode = processedCode.replace(exportStatementRegex, '')

  return processedCode.trim()
}
