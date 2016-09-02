export function inline (stylesheet) {
  const { _definition: definition } = stylesheet
  return Object.keys(definition)
    .filter(key => !/^[:@]/.test(key))
    .reduce((acc, key) => ({
      ...acc,
      [key]: definition[key],
    }), {})
}
