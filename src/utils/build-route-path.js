export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-z]+)/g

  const getRouteParams = path.replaceAll(
    routeParametersRegex,
    '(?<$1>[a-z0-9-_]+)'
  )

  const pathRegex = new RegExp(`^${getRouteParams}(?<query>\\?(.*))?$`)

  return pathRegex
}
