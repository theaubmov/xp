// eslint-disable-next-line no-undef
const { v4: uuidv4 } = require('uuid')

const TENANT_ID = '618b6fdef5dacc0001a6b1b0'
const LEGACY_TENANT_ID = '59ce808c99298e1e06660c09'
const USER_ID = '1194'

const palette = {
  cobalt: '#0f4c81',
  gold: '#d97706',
  coral: '#e76f51',
  jade: '#0f766e',
  plum: '#7c3aed',
  slate: '#0f172a',
  blush: '#be185d',
  cyan: '#0284c7'
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function createMockSvg({
  title,
  subtitle = 'Local mock',
  accent = palette.cobalt,
  background = palette.slate,
  eyebrow = 'Mobius'
}) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" role="img" aria-label="${escapeXml(
    title
  )}">
    <defs>
      <linearGradient id="wash" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="${background}" />
        <stop offset="100%" stop-color="${accent}" />
      </linearGradient>
      <linearGradient id="panel" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stop-color="rgba(255,255,255,0.16)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0.04)" />
      </linearGradient>
      <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="1200" height="720" fill="url(#wash)" />
    <rect width="1200" height="720" fill="url(#grid)" />
    <circle cx="210" cy="110" r="170" fill="rgba(255,255,255,0.08)" />
    <circle cx="1040" cy="640" r="240" fill="rgba(255,255,255,0.08)" />
    <rect x="58" y="60" width="1084" height="600" rx="36" fill="rgba(15,23,42,0.28)" stroke="rgba(255,255,255,0.18)" />
    <rect x="104" y="116" width="992" height="488" rx="28" fill="url(#panel)" stroke="rgba(255,255,255,0.16)" />
    <text x="108" y="164" fill="rgba(255,255,255,0.72)" font-size="28" font-family="Trebuchet MS, Segoe UI, sans-serif" letter-spacing="7">${escapeXml(
      eyebrow.toUpperCase()
    )}</text>
    <text x="108" y="284" fill="#f8fafc" font-size="82" font-weight="700" font-family="Georgia, Times New Roman, serif">${escapeXml(
      title
    )}</text>
    <text x="108" y="350" fill="rgba(248,250,252,0.86)" font-size="34" font-family="Trebuchet MS, Segoe UI, sans-serif">${escapeXml(
      subtitle
    )}</text>
    <rect x="108" y="418" width="280" height="12" rx="6" fill="rgba(255,255,255,0.18)" />
    <rect x="108" y="454" width="420" height="12" rx="6" fill="rgba(255,255,255,0.18)" />
    <rect x="108" y="490" width="360" height="12" rx="6" fill="rgba(255,255,255,0.18)" />
    <rect x="778" y="182" width="248" height="248" rx="28" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" />
    <rect x="816" y="220" width="172" height="18" rx="9" fill="#f8fafc" opacity="0.92" />
    <rect x="816" y="262" width="126" height="18" rx="9" fill="#f8fafc" opacity="0.48" />
    <rect x="816" y="330" width="58" height="58" rx="16" fill="${accent}" />
    <rect x="894" y="330" width="94" height="18" rx="9" fill="#f8fafc" opacity="0.92" />
    <rect x="894" y="364" width="76" height="14" rx="7" fill="#f8fafc" opacity="0.48" />
    <rect x="778" y="462" width="320" height="94" rx="24" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" />
    <rect x="812" y="498" width="120" height="18" rx="9" fill="#f8fafc" opacity="0.92" />
    <rect x="812" y="532" width="224" height="14" rx="7" fill="#f8fafc" opacity="0.48" />
  </svg>`
}

function createSvgDataUrl(config) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    createMockSvg(config)
  )}`
}

function createSvgBase64(config) {
  return Buffer.from(createMockSvg(config)).toString('base64')
}

function nowMinus(daysAgo, hourOffset = 0) {
  return Date.now() - daysAgo * 24 * 60 * 60 * 1000 + hourOffset * 60 * 60 * 1000
}

function pageConfig(items) {
  return items.map((title) => ({ title }))
}

function buildRenderableConfig(theme) {
  return {
    canvasBackgroundColor: theme.background,
    elements: [
      {
        heroCta: {
          type: 'button',
          action: 'open',
          target: 'details'
        }
      },
      {
        reminderCard: {
          type: 'panel',
          action: 'toggle',
          target: 'sidebar'
        }
      }
    ],
    animations: [],
    resizePlayer: {},
    renderComponents: {
      callouts: [{ key: 'headline', value: theme.title }]
    },
    iterationLabels: [],
    dataSource: {
      source: [],
      context: [],
      target: [],
      custom: []
    },
    validation: {}
  }
}

function createPageDefinition({
  name,
  channelType,
  accent,
  description,
  configTitles,
  customEvents = [],
  devicesCompatibility = {
    phone: true,
    tablet: true,
    tv: false
  },
  orientationsCompatibility = {
    landscape: true,
    portrait: true
  }
}) {
  const id = uuidv4()
  const appId = uuidv4()
  const timestamp = nowMinus(Math.floor(Math.random() * 24) + 3)
  const thumbnailId = `thumb-page-${slugify(name)}`
  return {
    id,
    owner: TENANT_ID,
    name,
    type: 'page',
    accessible: true,
    dependencies: {
      schemaIds: []
    },
    customEvents,
    creationTimeMs: timestamp - 450000,
    updatedTimeMs: timestamp,
    details: {
      description,
      channelType,
      resolutions: ['1920x1080', '1280x720'],
      published: true,
      lastPublishedTimeMs: timestamp,
      content: {
        untaggedBaId: appId,
        baAppConfig: {
          thumbnail: thumbnailId,
          entryPageURL: '/mock/entry.html',
          appName: name,
          files: [
            {
              path: '/mock/index.html',
              url: '/mock/index.html',
              type: 'text/html',
              content: {
                pre: '',
                body: `<section>${escapeXml(name)}</section>`,
                post: ''
              }
            }
          ],
          config: buildRenderableConfig({
            title: name,
            background: palette.slate
          })
        },
        baAppName: name,
        published: true,
        userId: USER_ID,
        version: '1.0.0',
        createdAt: timestamp - 450000,
        tenantId: TENANT_ID,
        tag: 'stable',
        id: appId,
        updatedAt: timestamp
      },
      devicesCompatibility,
      updatedTimeMs: timestamp,
      createdTimeMs: timestamp - 450000,
      tenantId: TENANT_ID,
      name,
      orientationsCompatibility,
      contentType: 'BA',
      thumbnail: thumbnailId,
      configuration: pageConfig(configTitles)
    }
  }
}

function createBroadCastApp(page, accent) {
  const timestamp = page.updatedTimeMs
  return {
    id: page.details.content.id,
    tenantId: TENANT_ID,
    userId: USER_ID,
    createdAt: timestamp - 250000,
    updatedAt: timestamp,
    version: '1.2.0',
    published: true,
    baAppConfig: {
      entryPageURL: '/mock/index.html',
      bbandEntryPageUrl: '/mock/index.html',
      thumbnail: `thumb-app-${slugify(page.name)}`,
      config: page.details.content.baAppConfig.config,
      files: page.details.content.baAppConfig.files,
      app_name: page.name
    },
    baAppName: page.name,
    untaggedBaId: page.details.content.untaggedBaId,
    tag: page.details.channelType.toLowerCase(),
    otherVersions: [
      {
        baAppId: page.details.content.id,
        version: '1.1.0',
        tag: 'preview',
        createdAt: timestamp - 1000000,
        published: false
      }
    ]
  }
}

function createDashboard(name, accent, columns, daysAgo) {
  const id = uuidv4()
  return {
    id,
    name,
    creationTime: nowMinus(daysAgo),
    components: [],
    additionalProperties: {
      columns,
      title: name,
      thumbnail: `thumb-dashboard-${slugify(name)}`,
      dashboardDomStyles: `--accent:${accent};`
    },
    tenantID: TENANT_ID
  }
}

function createTemplate(name, accent, daysAgo, active) {
  const timestamp = nowMinus(daysAgo)
  return {
    id: uuidv4(),
    name,
    tenantId: TENANT_ID,
    subTenantId: TENANT_ID,
    thumbnail: `thumb-template-${slugify(name)}`,
    template: {
      accent
    },
    status: active,
    createdAt: timestamp - 100000,
    updatedAt: timestamp,
    tags: ['local', 'mock']
  }
}

function createChart(name, chartType, accent, daysAgo) {
  const timestamp = nowMinus(daysAgo)
  return {
    id: uuidv4(),
    name,
    createdTimeMs: timestamp - 250000,
    updatedTimeMs: timestamp,
    tenantID: TENANT_ID,
    sourceType: 'QUERY',
    sourceIds: [],
    chartType,
    provider: 'mobius-mock',
    propertyList: [],
    orderByMap: {},
    groupByList: [],
    metadata: {
      accent
    }
  }
}

function createAnimation(name, accent, daysAgo) {
  const timestamp = nowMinus(daysAgo)
  return {
    id: uuidv4(),
    name,
    tenantID: TENANT_ID,
    serviceId: 'mobius',
    userId: USER_ID,
    animationType: 'ticker',
    requestID: uuidv4(),
    animations: [
      {
        id: 1,
        backgroundColor: {
          red: '15',
          green: '23',
          blue: '42'
        },
        width: '1280',
        height: '120',
        left: '0',
        textElements: [],
        scrollElements: []
      }
    ],
    destinationPath: `/animations/${slugify(name)}.json`,
    pvrRequired: false,
    pvrRequestModel: {},
    modelType: 'ticker',
    templateId: uuidv4(),
    feedURL: {
      source: accent
    },
    creationTimeMs: timestamp
  }
}

function createDataSource(name, description, type, daysAgo, schemaId) {
  return {
    id: uuidv4(),
    owner: LEGACY_TENANT_ID,
    name,
    schemaId,
    description,
    type,
    accessible: true,
    dependencies: {
      schemaIds: schemaId ? [schemaId] : []
    },
    updatedTimeMs: nowMinus(daysAgo)
  }
}

function createTrigger(name, description, type, daysAgo) {
  return {
    id: uuidv4(),
    owner: LEGACY_TENANT_ID,
    name,
    description,
    type,
    accessible: true,
    dependencies: {
      schemaIds: []
    },
    updatedTimeMs: nowMinus(daysAgo)
  }
}

function createLegacyTabItem(title, description, daysAgo) {
  return {
    id: uuidv4(),
    title,
    description,
    lastUpdate: new Date(nowMinus(daysAgo)).toISOString()
  }
}

function createMediaItem(name, kind, accent, daysAgo, description) {
  const id = uuidv4()
  const mockPoster = createSvgDataUrl({
    title: name,
    subtitle:
      kind === 'image'
        ? 'Mock image asset'
        : kind === 'video'
          ? 'Mock video asset'
          : 'Mock audio asset',
    accent,
    eyebrow: kind.toUpperCase()
  })

  return {
    id,
    filePath: `/${kind}/${slugify(name)}`,
    name,
    viewURL: mockPoster,
    downloadURL: mockPoster,
    description,
    created_date: nowMinus(daysAgo),
    tags: ['mock', kind],
    kind
  }
}

function toExperiencePage(page) {
  return {
    id: page.id,
    title: page.name,
    description: page.details.description,
    platform: page.details.channelType,
    isPublished: 'published',
    resolutions: page.details.resolutions,
    thumbnail: createSvgDataUrl({
      title: page.name,
      subtitle: page.details.channelType,
      accent: palette.cyan
    }),
    devicesCompatibility: page.details.devicesCompatibility,
    orientationsCompatibility: page.details.orientationsCompatibility,
    createdAt: new Date(page.creationTimeMs).toISOString(),
    updatedAt: new Date(page.updatedTimeMs).toISOString(),
    configuration: page.details.configuration
  }
}

function createPlatformNode(id, label, accent, x, y) {
  return {
    id,
    type: 'plateforme-node',
    position: { x, y },
    label,
    data: {
      thumbnail: createSvgDataUrl({
        title: label,
        subtitle: 'Channel',
        accent,
        eyebrow: 'Platform'
      }),
      plateform: label,
      source: {
        input: 'left',
        output: 'right'
      },
      configuration: {
        dataSource: [],
        source: {},
        destination: {},
        channel: {
          channelType: label,
          mefType: label === 'NextGenTv' ? 'BROADCASTER_APP' : '',
          packageName: '',
          command: '',
          rpcFilename: '',
          destinationAttribute: 'model.entities[*].deviceId',
          contents: [],
          communication:
            label === 'NextGenTv'
              ? {
                  type: 'BROADBAND'
                }
              : undefined
        }
      }
    },
    events: {}
  }
}

function createPageNode(page, id, x, y) {
  return {
    id,
    type: 'page-node',
    position: { x, y },
    label: page.name,
    data: {
      id: page.id,
      owner: page.owner,
      details: page.details,
      configuration: page.details.configuration,
      customEvent: page.customEvents || [],
      accessible: page.accessible,
      dependencies: page.dependencies
    },
    events: {}
  }
}

function createContextEdge({
  id,
  source,
  target,
  sourceHandle,
  color,
  label
}) {
  return {
    id,
    source,
    target,
    sourceHandle,
    type: 'context',
    animated: true,
    style: {
      stroke: color
    },
    labelBgStyle: {
      fill: color
    },
    label,
    data: {
      trigger: {
        triggerType: 'ONETIME',
        triggerName: label,
        triggerIcon: 'fa-solid fa-play'
      }
    }
  }
}

function createExperience({
  name,
  description,
  accent,
  tags,
  pages,
  platforms,
  dashboards,
  gitSource = ''
}) {
  const id = uuidv4()
  const timestamp = new Date(nowMinus(Math.floor(Math.random() * 18) + 1))
  const elements = [
    {
      id: 'start-node',
      type: 'start-node',
      label: name,
      sourcePosition: 'right',
      position: {
        x: 0,
        y: 0
      },
      connectable: false,
      events: {}
    }
  ]

  const layoutPlatforms = platforms.map((platform, index) =>
    createPlatformNode(
      `platform-${slugify(platform.title)}`,
      platform.title,
      platform.color,
      280 + index * 210,
      index % 2 === 0 ? -120 : 60
    )
  )

  const layoutPages = pages.map((page, index) =>
    createPageNode(page, `page-node-${page.id}`, 40 + index * 220, 240)
  )

  elements.push(...layoutPlatforms, ...layoutPages)

  const platformEdges = layoutPlatforms.map((platformNode) => ({
    id: `edge-start-${platformNode.id}`,
    source: 'start-node',
    target: platformNode.id,
    sourceHandle: 'right',
    animated: true,
    style: {
      stroke: platformNode.data.configuration.channel.channelType === 'Dashboard'
        ? palette.plum
        : accent
    },
    labelBgStyle: {
      fill: accent
    }
  }))

  const journeyEdges = layoutPages.map((pageNode, index) =>
    createContextEdge({
      id: `edge-${pageNode.id}-${layoutPlatforms[index % layoutPlatforms.length].id}`,
      source: pageNode.id,
      target: layoutPlatforms[index % layoutPlatforms.length].id,
      sourceHandle: slugify(
        pageNode.data.configuration[0]?.title || 'Launch Experience'
      ),
      color: accent,
      label: 'One Time (Manually)'
    })
  )

  elements.push(...platformEdges, ...journeyEdges)

  const configuration = {
    NextGenTv: [],
    Dashboard: [],
    Email: [],
    HTML: [],
    SMS: [],
    Signage: [],
    Facebook: [],
    Twitter: [],
    Linkedin: [],
    Whatsapp: [],
    Instagram: []
  }

  pages.forEach((page, index) => {
    const targetKey = platforms[index % platforms.length].title
    if (!configuration[targetKey]) {
      configuration[targetKey] = []
    }
    configuration[targetKey].push({
      id: page.id,
      isActive: true
    })
  })

  return {
    id,
    name,
    description,
    category: 'Mock Experience',
    status: 'draft',
    tenant: 'mobius@local.mock',
    version: '1.0.0',
    createdAt: timestamp.toISOString(),
    updatedAt: timestamp.toISOString(),
    gitSource,
    tags,
    medias: [],
    details: {
      thumbnail: createSvgDataUrl({
        title: name,
        subtitle: 'Local mock experience',
        accent
      })
    },
    thumbnail: createSvgDataUrl({
      title: name,
      subtitle: 'Local mock experience',
      accent
    }),
    configuration,
    pages: pages.map(toExperiencePage),
    experienceElements: elements,
    performance: dashboards.map((dashboard) => dashboard.id),
    published: false,
    tenantId: TENANT_ID
  }
}

function createMockState() {
  const pages = [
    createPageDefinition({
      name: 'Election Night Hub',
      channelType: 'NextGenTv',
      accent: palette.cobalt,
      description: 'Real-time election stories, maps, and second-screen prompts.',
      configTitles: ['Launch Experience', 'Open Results'],
      customEvents: [
        {
          id: 'AlertOverlay',
          type: 'custom-alert'
        }
      ],
      devicesCompatibility: {
        phone: true,
        tablet: true,
        tv: true
      },
      orientationsCompatibility: {
        landscape: true,
        portrait: false
      }
    }),
    createPageDefinition({
      name: 'Storm Center',
      channelType: 'Dashboard',
      accent: palette.jade,
      description: 'Operational weather dashboard with alerts, radar, and shelter status.',
      configTitles: ['Inspect Panel', 'Share Forecast'],
      devicesCompatibility: {
        phone: true,
        tablet: true,
        tv: true
      },
      orientationsCompatibility: {
        landscape: true,
        portrait: false
      }
    }),
    createPageDefinition({
      name: 'Fundraising Drive',
      channelType: 'Email',
      accent: palette.coral,
      description: 'Donation funnel with pledge tracking and matching sponsors.',
      configTitles: ['Donate Now', 'View Packages']
    }),
    createPageDefinition({
      name: 'Campus Alerts',
      channelType: 'SMS',
      accent: palette.gold,
      description: 'Urgent notifications for closures, drills, and incident response.',
      configTitles: ['Confirm Receipt', 'Open Safety Plan']
    }),
    createPageDefinition({
      name: 'Retail Signage Loop',
      channelType: 'Signage',
      accent: palette.blush,
      description: 'Storefront signage with rotating offers and QR activations.',
      configTitles: ['Claim Offer', 'Show Menu'],
      orientationsCompatibility: {
        landscape: false,
        portrait: true
      }
    }),
    createPageDefinition({
      name: 'Learning Quest',
      channelType: 'Instagram',
      accent: palette.plum,
      description: 'Interactive micro-learning path for classroom and mobile audiences.',
      configTitles: ['Start Lesson', 'Reveal Hint']
    })
  ]

  const apps = pages.map((page, index) =>
    createBroadCastApp(
      page,
      [palette.cobalt, palette.jade, palette.coral, palette.gold][index % 4]
    )
  )

  const dashboards = [
    createDashboard('Broadcast Health', palette.cobalt, 4, 3),
    createDashboard('Weather Intelligence', palette.jade, 3, 6),
    createDashboard('Audience Pulse', palette.coral, 4, 9),
    createDashboard('Retail Conversion Wall', palette.gold, 2, 11)
  ]

  const templates = [
    createTemplate('Newsroom Launchpad', palette.cobalt, 5, true),
    createTemplate('Donation Weekender', palette.coral, 7, true),
    createTemplate('Retail Loop Portrait', palette.blush, 10, false),
    createTemplate('Campus Incident Pack', palette.gold, 12, true)
  ]

  const charts = [
    createChart('County Turnout Mix', 'pie', palette.cobalt, 2),
    createChart('Shelter Capacity', 'bar', palette.jade, 4),
    createChart('Contribution Velocity', 'line', palette.coral, 5),
    createChart('Audience Reach Radar', 'scatter', palette.gold, 6),
    createChart('Response Gauge', 'gauge', palette.plum, 8),
    createChart('Retail Zone Heat', 'area', palette.blush, 9)
  ]

  const animations = [
    createAnimation('Election Crawl', palette.cobalt, 3),
    createAnimation('Weather Alert Strip', palette.jade, 6),
    createAnimation('Retail Offer Ticker', palette.blush, 10)
  ]

  const analytics = [
    createDataSource(
      'Regional turnout query',
      'Mock analytics source for live participation metrics.',
      'QUERY',
      2
    ),
    createDataSource(
      'Weather severity query',
      'Mock analytics source for weather alert intensity.',
      'QUERY',
      4
    ),
    createDataSource(
      'Donation velocity query',
      'Mock analytics source for pledge conversion.',
      'QUERY',
      6
    )
  ]

  const groups = [
    createDataSource(
      'Household profile schema',
      'Audience attributes used for personalization.',
      'GROUP',
      3,
      'household-profile'
    ),
    createDataSource(
      'Campus responder schema',
      'Responder roster and region ownership map.',
      'GROUP',
      5,
      'campus-responder'
    ),
    createDataSource(
      'Storefront zone schema',
      'Retail location and device installation layout.',
      'GROUP',
      7,
      'storefront-zone'
    )
  ]

  const contexts = [
    createTrigger(
      'device_connected',
      'user session just became active',
      'context',
      2
    ),
    createTrigger(
      'weather_warning',
      'weather severity exceeded configured threshold',
      'context',
      4
    ),
    createTrigger(
      'checkout_started',
      'viewer opened the conversion funnel',
      'context',
      8
    )
  ]

  const triggerGroups = [
    createTrigger(
      'campus_staff',
      'staff members subscribed to emergency updates',
      'group_definition',
      5
    ),
    createTrigger(
      'vip_donors',
      'high value supporters with premium journeys',
      'group_definition',
      7
    )
  ]

  const queries = [
    createLegacyTabItem('Turnout summary', 'Election participation snapshot', 2),
    createLegacyTabItem('Donation funnel', 'Donation stage summary', 5),
    createLegacyTabItem('Weather incident summary', 'Open alerts by county', 9)
  ]

  const legacyGroups = [
    createLegacyTabItem('Supporters', 'Mock donor segments', 3),
    createLegacyTabItem('First Responders', 'Mock emergency teams', 4),
    createLegacyTabItem('Retail Regions', 'Mock signage territories', 11)
  ]

  const legacyContexts = [
    createLegacyTabItem('Device context', 'Viewer device conditions', 3),
    createLegacyTabItem('Weather context', 'Regional weather events', 6),
    createLegacyTabItem('Store context', 'Retail location telemetry', 8)
  ]

  const media = [
    createMediaItem(
      'County Results Card',
      'image',
      palette.cobalt,
      2,
      'Editable image asset for the election experience.'
    ),
    createMediaItem(
      'Weather Radar Motion',
      'video',
      palette.jade,
      4,
      'Looping weather radar preview placeholder.'
    ),
    createMediaItem(
      'Pledge Theme Bed',
      'audio',
      palette.coral,
      7,
      'Audio placeholder for donation campaign ambience.'
    ),
    createMediaItem(
      'Emergency CTA Frame',
      'image',
      palette.gold,
      5,
      'Visual mock used in alert flows.'
    ),
    createMediaItem(
      'Retail Promo Reel',
      'video',
      palette.blush,
      9,
      'Animated mock poster for in-store preview.'
    )
  ]

  const experiences = [
    createExperience({
      name: 'Election Command Center',
      description:
        'A local mock experience for election coverage, mobile prompts, and broadcast-ready follow ups.',
      accent: palette.cobalt,
      tags: ['News', 'Broadcast', 'Realtime'],
      pages: [pages[0], pages[1], pages[2]],
      platforms: [
        { title: 'NextGenTv', color: palette.cobalt },
        { title: 'Dashboard', color: palette.plum },
        { title: 'Email', color: palette.coral }
      ],
      dashboards: [dashboards[0], dashboards[2]]
    }),
    createExperience({
      name: 'Storm Response Studio',
      description:
        'A local mock journey for emergency alerts, operational dashboards, and responder routing.',
      accent: palette.jade,
      tags: ['Weather', 'Alerts', 'Operations'],
      pages: [pages[1], pages[3]],
      platforms: [
        { title: 'Dashboard', color: palette.jade },
        { title: 'SMS', color: palette.gold }
      ],
      dashboards: [dashboards[1]]
    }),
    createExperience({
      name: 'Public Media Fundraiser',
      description:
        'A mock donor journey with donation asks, recap mailers, and interactive conversion moments.',
      accent: palette.coral,
      tags: ['Fundraising', 'Membership', 'Email'],
      pages: [pages[2], pages[5]],
      platforms: [
        { title: 'Email', color: palette.coral },
        { title: 'Instagram', color: palette.blush }
      ],
      dashboards: [dashboards[2]]
    }),
    createExperience({
      name: 'Retail Momentum Loop',
      description:
        'A mock signage and mobile experience for location-aware promotions and performance tracking.',
      accent: palette.gold,
      tags: ['Retail', 'Signage', 'Mobile'],
      pages: [pages[4], pages[5]],
      platforms: [
        { title: 'Signage', color: palette.gold },
        { title: 'Instagram', color: palette.plum }
      ],
      dashboards: [dashboards[3]]
    })
  ]

  return {
    experiences,
    pages,
    dashboards,
    templates,
    charts,
    animations,
    apps,
    analytics,
    groups,
    contexts,
    triggerGroups,
    queries,
    legacyGroups,
    legacyContexts,
    media,
    engagements: []
  }
}

function createQueryIterationPayload(name) {
  return {
    model: {
      metadata: {
        columns: [
          {
            name: `${name} metric`
          },
          {
            name: `${name} status`
          },
          {
            name: `${name} region`
          }
        ]
      }
    }
  }
}

function createGroupIterationPayload(name) {
  return {
    attributes: [
      {
        key: 'deviceId',
        type: 'String'
      },
      {
        key: 'region',
        type: 'String'
      },
      {
        key: `${slugify(name)}Score`,
        type: 'Number'
      }
    ]
  }
}

module.exports = {
  TENANT_ID,
  LEGACY_TENANT_ID,
  USER_ID,
  createMockState,
  createSvgDataUrl,
  createSvgBase64,
  createQueryIterationPayload,
  createGroupIterationPayload
}
