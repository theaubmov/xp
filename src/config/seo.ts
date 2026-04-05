const ROBOTS_DIRECTIVES = 'noindex, nofollow, noarchive, nosnippet, noimageindex'

function upsertMetaTag(name: string, content: string) {
  let meta = document.head.querySelector(`meta[name="${name}"]`)

  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', name)
    document.head.appendChild(meta)
  }

  meta.setAttribute('content', content)
}

export function applySeoGuards() {
  upsertMetaTag('robots', ROBOTS_DIRECTIVES)
  upsertMetaTag('googlebot', ROBOTS_DIRECTIVES)
}
