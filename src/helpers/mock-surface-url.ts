export type MockSurfaceMode = 'experience' | 'designer' | 'dashboard'

export function buildMockSurfaceUrl(
  mode: MockSurfaceMode,
  params: Record<string, string | number | undefined> = {}
) {
  const searchParams = new URLSearchParams()
  searchParams.set('mode', mode)

  Object.keys(params).forEach((key) => {
    const value = params[key]
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value))
    }
  })

  return `${window.location.origin}/#/mock-surface?${searchParams.toString()}`
}
