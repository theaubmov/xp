export interface MockArtworkOptions {
  title: string
  subtitle?: string
  accent?: string
  background?: string
  eyebrow?: string
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function createMockArtworkDataUrl({
  title,
  subtitle = 'Local mock',
  accent = '#0f4c81',
  background = '#0f172a',
  eyebrow = 'Mobius'
}: MockArtworkOptions) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" role="img" aria-label="${escapeXml(
    title
  )}">
    <defs>
      <linearGradient id="wash" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="${background}" />
        <stop offset="100%" stop-color="${accent}" />
      </linearGradient>
      <pattern id="grid" width="52" height="52" patternUnits="userSpaceOnUse">
        <path d="M 52 0 L 0 0 0 52" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="1200" height="720" fill="url(#wash)" />
    <rect width="1200" height="720" fill="url(#grid)" />
    <circle cx="184" cy="134" r="164" fill="rgba(255,255,255,0.08)" />
    <circle cx="1048" cy="640" r="224" fill="rgba(255,255,255,0.08)" />
    <rect x="62" y="58" width="1076" height="604" rx="34" fill="rgba(15,23,42,0.3)" stroke="rgba(255,255,255,0.18)" />
    <text x="112" y="158" fill="rgba(248,250,252,0.72)" font-size="28" font-family="Trebuchet MS, Segoe UI, sans-serif" letter-spacing="7">${escapeXml(
      eyebrow.toUpperCase()
    )}</text>
    <text x="112" y="286" fill="#f8fafc" font-size="84" font-weight="700" font-family="Georgia, Times New Roman, serif">${escapeXml(
      title
    )}</text>
    <text x="112" y="354" fill="rgba(248,250,252,0.86)" font-size="34" font-family="Trebuchet MS, Segoe UI, sans-serif">${escapeXml(
      subtitle
    )}</text>
    <rect x="112" y="426" width="278" height="12" rx="6" fill="rgba(255,255,255,0.18)" />
    <rect x="112" y="460" width="418" height="12" rx="6" fill="rgba(255,255,255,0.18)" />
    <rect x="112" y="494" width="362" height="12" rx="6" fill="rgba(255,255,255,0.18)" />
    <rect x="788" y="190" width="250" height="250" rx="28" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" />
    <rect x="826" y="228" width="172" height="18" rx="9" fill="#f8fafc" opacity="0.92" />
    <rect x="826" y="268" width="126" height="18" rx="9" fill="#f8fafc" opacity="0.48" />
    <rect x="826" y="334" width="58" height="58" rx="16" fill="${accent}" />
    <rect x="904" y="334" width="94" height="18" rx="9" fill="#f8fafc" opacity="0.92" />
    <rect x="904" y="368" width="76" height="14" rx="7" fill="#f8fafc" opacity="0.48" />
    <rect x="788" y="470" width="310" height="92" rx="24" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" />
    <rect x="822" y="506" width="120" height="18" rx="9" fill="#f8fafc" opacity="0.92" />
    <rect x="822" y="540" width="220" height="14" rx="7" fill="#f8fafc" opacity="0.48" />
  </svg>`

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export function buildMockBase64ImageSource(
  base64?: string,
  mimeType = 'image/svg+xml'
) {
  if (!base64) {
    return ''
  }

  return `data:${mimeType};base64,${base64}`
}

export const defaultMockThumbnail = createMockArtworkDataUrl({
  title: 'Mobius Asset',
  subtitle: 'Served by the local mock layer',
  accent: '#0f766e'
})

export const emptyStateArtwork = createMockArtworkDataUrl({
  title: 'Nothing Here Yet',
  subtitle: 'The local mock is ready when new content is added.',
  accent: '#be185d'
})
