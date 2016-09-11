const basePath = (process.env.NODE_ENV === 'production') ? '/toggl-balance' : '/'

export function getBasePath () {
  return basePath
}

export function getPath (path) {
  if (basePath === '/') return path
  return basePath + path
}
