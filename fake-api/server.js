// eslint-disable-next-line no-undef
const jsonServer = require('json-server')
// eslint-disable-next-line no-undef
const { v4: uuidv4 } = require('uuid')
const {
  TENANT_ID,
  LEGACY_TENANT_ID,
  createMockState,
  createSvgDataUrl,
  createSvgBase64,
  createQueryIterationPayload,
  createGroupIterationPayload
} = require('./mock-data')

const server = jsonServer.create()
const middlewares = jsonServer.defaults()

let state = createMockState()

server.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type,authorization'
  )
  res.setHeader('Access-Control-Allow-Credentials', true)

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }

  next()
})

server.use(middlewares)

server.post(
  '/content-service/v1.0/content/upload/EXP/:tenantId/:subTenantId',
  async (req, res) => {
    const rawBody = await collectRawBody(req)
    const filename =
      rawBody.toString('utf8').match(/filename="([^"]+)"/)?.[1] ||
      `mock-upload-${state.media.length + 1}.png`
    const media = createUploadedMedia(filename)
    state.media.unshift(media)

    res.status(200).jsonp({
      id: media.id,
      fileName: media.name,
      contentType: media.kind,
      url: media.viewURL,
      viewURL: media.viewURL,
      downloadUrl: media.downloadURL
    })
  }
)

server.use(jsonServer.bodyParser)

server.get('/health', (req, res) => {
  res.jsonp({
    status: 'ok',
    service: 'mobius-local-mock'
  })
})

server.get('/api/experiences', (req, res) => {
  res.jsonp(state.experiences)
})

server.post('/api/experiences', (req, res) => {
  const experience = createBlankExperience(req.body)
  state.experiences.unshift(experience)
  res.status(201).jsonp(experience)
})

server.get('/api/experiences/:id', (req, res) => {
  const experience = findExperience(req.params.id)
  if (!experience) {
    return res.status(404).jsonp({ message: 'Experience not found' })
  }
  res.jsonp(experience)
})

server.patch('/api/experiences/:id', (req, res) => {
  const experience = findExperience(req.params.id)
  if (!experience) {
    return res.status(404).jsonp({ message: 'Experience not found' })
  }

  Object.assign(experience, req.body, {
    updatedAt: new Date().toISOString()
  })

  res.jsonp(experience)
})

server.delete('/api/experiences/:id', (req, res) => {
  const removed = removeById(state.experiences, req.params.id)
  if (!removed) {
    return res.status(404).jsonp({ message: 'Experience not found' })
  }
  res.status(200).jsonp({ status: 'deleted' })
})

server.post('/api/experiences/:id/media', (req, res) => {
  const experience = findExperience(req.params.id)
  if (!experience) {
    return res.status(404).jsonp({ message: 'Experience not found' })
  }

  experience.medias.push(req.body)
  experience.updatedAt = new Date().toISOString()
  res.status(201).jsonp(experience)
})

server.get('/api/experiences/:id/platform-device', (req, res) => {
  const experience = findExperience(req.params.id)
  if (!experience) {
    return res.status(404).jsonp({ message: 'Experience not found' })
  }

  res.jsonp(buildPlatformDeviceSupport(experience))
})

server.get('/api/queries', (req, res) => {
  res.jsonp(filterLegacyItems(state.queries, req.query.q))
})

server.get('/api/groups', (req, res) => {
  res.jsonp(filterLegacyItems(state.legacyGroups, req.query.q))
})

server.get('/api/context', (req, res) => {
  res.jsonp(filterLegacyItems(state.legacyContexts, req.query.q))
})

server.get('/engagements-web/v1.0/:tenantId/experiences', (req, res) => {
  const page = getNumber(req.query.page, 0)
  const size = getNumber(req.query.size, 10)
  const paginated = paginate(
    state.experiences,
    page,
    size,
    sortByDateDescending('updatedAt')
  )

  res.jsonp({
    totalElements: state.experiences.length,
    totalPages: paginated.totalPages,
    currentPage: paginated.currentPage,
    size,
    experience: paginated.items
  })
})

server.get('/engagements-web/v1.0/:tenantId/experiences/:id', (req, res) => {
  const experience = findExperience(req.params.id)
  if (!experience) {
    return res.status(404).jsonp({ message: 'Experience not found' })
  }

  res.jsonp(experience)
})

server.post('/engagements-web/v1.0/:tenantId/experiences', (req, res) => {
  const experience = createBlankExperience(req.body)
  state.experiences.unshift(experience)

  res.status(201).jsonp({
    id: experience.id,
    msg: 'Experience created in local mock',
    status: 'success',
    tenantId: TENANT_ID,
    experience
  })
})

server.put('/engagements-web/v1.0/:tenantId/experiences/:id', (req, res) => {
  const experience = findExperience(req.params.id)
  if (!experience) {
    return res.status(404).jsonp({ message: 'Experience not found' })
  }

  Object.assign(experience, req.body, {
    updatedAt: new Date().toISOString()
  })
  res.jsonp(experience)
})

server.delete(
  '/engagements-web/v1.0/:tenantId/experiences/:id',
  (req, res) => {
    const removed = removeById(state.experiences, req.params.id)
    if (!removed) {
      return res.status(404).jsonp({ message: 'Experience not found' })
    }

    res.status(200).jsonp({ status: 'deleted' })
  }
)

server.post('/engagements-web/v1.0/:tenantId/engagements', (req, res) => {
  const engagement = {
    id: uuidv4(),
    status: 'QUEUED',
    createdAt: new Date().toISOString(),
    dto: req.body
  }

  state.engagements.unshift(engagement)
  res.status(201).jsonp(engagement)
})

server.get('/tf-web/v1.0/:tenantId/search', (req, res) => {
  const page = getNumber(req.query.page, 0)
  const size = getNumber(req.query.size, 20)
  const keyword = String(req.query.keyword || req.query.byName || '').trim()
  const categories = normalizeCategories(req.query.category, req.query.categoey)

  if (categories.includes('experiences')) {
    const experiences = filterItems(
      state.experiences,
      keyword,
      (item) => `${item.name} ${item.description} ${item.tags.join(' ')}`
    )
    const paginated = paginate(
      experiences,
      page,
      size,
      sortByDateDescending('updatedAt')
    )

    return res.jsonp({
      tenantId: TENANT_ID,
      totalPages: paginated.totalPages,
      totalRecords: experiences.length,
      currentPage: paginated.currentPage,
      sizePerpage: size,
      experience: paginated.items
    })
  }

  if (categories.includes('pages')) {
    const pages = filterItems(
      state.pages,
      keyword,
      (item) => `${item.name} ${item.details.description} ${item.details.channelType}`
    )
    const paginated = paginate(
      pages,
      page,
      size,
      sortByDateDescending('updatedTimeMs')
    )

    return res.jsonp({
      pages: paginated.items,
      totalPages: paginated.totalPages,
      totalRecords: pages.length,
      sizePerPage: size,
      currentPage: paginated.currentPage,
      tenantId: TENANT_ID
    })
  }

  if (categories.includes('dashboards')) {
    const dashboards = filterItems(
      state.dashboards,
      keyword,
      (item) => `${item.name} ${item.additionalProperties.title}`
    )
    const paginated = paginate(
      dashboards,
      page,
      size,
      sortByDateDescending('creationTime')
    )

    return res.jsonp({
      totalRecords: dashboards.length,
      totalPages: paginated.totalPages,
      currentPage: paginated.currentPage,
      sizePerPage: size,
      dashboards: paginated.items
    })
  }

  if (categories.includes('analytics') || categories.includes('groups')) {
    const analytics = categories.includes('analytics')
      ? filterItems(
          state.analytics,
          keyword,
          (item) => `${item.name} ${item.description}`
        )
      : []
    const groups =
      categories.includes('groups') && !categories.includes('contexts')
        ? filterItems(
            state.groups,
            keyword,
            (item) => `${item.name} ${item.description}`
          )
        : []

    if (categories.includes('contexts')) {
      const contexts = filterItems(
        state.contexts,
        keyword,
        (item) => `${item.name} ${item.description}`
      )
      const triggerGroups = filterItems(
        state.triggerGroups,
        keyword,
        (item) => `${item.name} ${item.description}`
      )
      const paginatedContexts = paginate(
        contexts,
        page,
        size,
        sortByDateDescending('updatedTimeMs')
      )
      const paginatedGroups = paginate(
        triggerGroups,
        page,
        size,
        sortByDateDescending('updatedTimeMs')
      )

      return res.jsonp({
        tenantId: LEGACY_TENANT_ID,
        totalPages: Math.max(
          paginatedContexts.totalPages,
          paginatedGroups.totalPages
        ),
        totalRecords: contexts.length + triggerGroups.length,
        currentPage: page,
        sizePerPage: size,
        contexts: paginatedContexts.items,
        groups: paginatedGroups.items
      })
    }

    const paginatedAnalytics = paginate(
      analytics,
      page,
      size,
      sortByDateDescending('updatedTimeMs')
    )
    const paginatedGroups = paginate(
      groups,
      page,
      size,
      sortByDateDescending('updatedTimeMs')
    )

    return res.jsonp({
      tenantId: LEGACY_TENANT_ID,
      totalPages: Math.max(
        paginatedAnalytics.totalPages,
        paginatedGroups.totalPages
      ),
      totalRecords: analytics.length + groups.length,
      currentPage: page,
      sizePerPage: size,
      analytics: paginatedAnalytics.items,
      groups: paginatedGroups.items
    })
  }

  return res.jsonp({
    totalRecords: 0,
    totalPages: 1,
    currentPage: 0,
    sizePerPage: size,
    data: []
  })
})

server.get('/tf-web/v1.0/:tenantId/analytic-queries/:id/data', (req, res) => {
  const query = state.analytics.find((item) => item.id === req.params.id)
  res.jsonp(createQueryIterationPayload(query?.name || 'Mock query'))
})

server.get('/tf-web/v1.0/:owner/schemas/:id', (req, res) => {
  const group = state.groups.find((item) => item.schemaId === req.params.id)
  res.jsonp(createGroupIterationPayload(group?.name || 'Mock group'))
})

server.get('/tf-web/v2.0/:tenantId/dashboards', (req, res) => {
  const page = getNumber(req.query.page, 0)
  const size = getNumber(req.query.size, 20)
  const paginated = paginate(
    state.dashboards,
    page,
    size,
    sortByDateDescending('creationTime')
  )

  res.jsonp({
    totalRecords: state.dashboards.length,
    totalPages: paginated.totalPages,
    currentPage: paginated.currentPage,
    sizePerPage: size,
    data: paginated.items
  })
})

server.delete('/tf-web/v2.0/:tenantId/dashboards/:id', (req, res) => {
  removeById(state.dashboards, req.params.id)
  res.status(200).jsonp({ status: 'deleted' })
})

server.get('/tf-web/v2.0/:tenantId/graphs', (req, res) => {
  const page = getNumber(req.query.page, 0)
  const size = getNumber(req.query.size, 20)
  const paginated = paginate(
    state.charts,
    page,
    size,
    sortByDateDescending('updatedTimeMs')
  )

  res.jsonp({
    totalRecords: state.charts.length,
    totalPages: paginated.totalPages,
    currentPage: paginated.currentPage,
    sizePerPage: size,
    data: paginated.items
  })
})

server.delete('/tf-web/v2.0/:tenantId/graphs/:id', (req, res) => {
  removeById(state.charts, req.params.id)
  res.status(200).jsonp({ status: 'deleted' })
})

server.get(
  '/broadcasterappstore-service/:tenantId/:userId/baApp',
  (req, res) => {
    const page = getNumber(req.query.page, 0)
    const size = getNumber(req.query.size, 20)
    const paginated = paginate(
      state.apps,
      page,
      size,
      sortByDateDescending('updatedAt')
    )

    res.jsonp({
      totalRecords: state.apps.length,
      totalPages: paginated.totalPages,
      currentPage: paginated.currentPage,
      sizePerPage: size,
      data: paginated.items
    })
  }
)

server.get(
  '/broadcasterappstore-service/:tenantId/:userId/search',
  (req, res) => {
    const page = getNumber(req.query.page, 0)
    const size = getNumber(req.query.size, 20)
    const keyword = String(req.query.byName || '').trim()
    const filtered = filterItems(
      state.apps,
      keyword,
      (item) => `${item.baAppName} ${item.baAppConfig.app_name}`
    )
    const paginated = paginate(
      filtered,
      page,
      size,
      sortByDateDescending('updatedAt')
    )

    res.jsonp({
      totalRecords: filtered.length,
      totalPages: paginated.totalPages,
      currentPage: paginated.currentPage,
      sizePerPage: size,
      data: paginated.items
    })
  }
)

server.delete(
  '/broadcasterappstore-service/:tenantId/:userId/baApp/:id',
  (req, res) => {
    removeById(state.apps, req.params.id)
    res.status(200).jsonp({ status: 'deleted' })
  }
)

server.get('/template-service/v1.0/:tenantId/:subTenantId/templates', (req, res) => {
  const page = getNumber(req.query.page, 0)
  const size = getNumber(req.query.size, 20)
  const paginated = paginate(
    state.templates,
    page,
    size,
    sortByDateDescending('updatedAt')
  )

  res.jsonp({
    templates: paginated.items,
    total_records: state.templates.length,
    total_pages: paginated.totalPages,
    totalRecords: state.templates.length,
    sizePerPage: size,
    currentPage: paginated.currentPage
  })
})

server.get('/template-service/v1.0/ADMIN/ADMIN/templates/search', (req, res) => {
  const page = getNumber(req.query.page, 0)
  const size = getNumber(req.query.size, 20)
  const keyword = String(req.query.query || '').trim()
  const filtered = filterItems(
    state.templates,
    keyword,
    (item) => `${item.name} ${(item.tags || []).join(' ')}`
  )
  const paginated = paginate(
    filtered,
    page,
    size,
    sortByDateDescending('updatedAt')
  )

  res.jsonp({
    templates: paginated.items,
    total_records: filtered.length,
    total_pages: paginated.totalPages,
    totalRecords: filtered.length,
    sizePerPage: size,
    currentPage: paginated.currentPage
  })
})

server.delete(
  '/template-service/v1.0/:tenantId/:subTenantId/templates/:id',
  (req, res) => {
    removeById(state.templates, req.params.id)
    res.status(200).jsonp({ status: 'deleted' })
  }
)

server.get('/content-service/v1.0/files/:tenantId', (req, res) => {
  const page = getNumber(req.query.page, 0)
  const size = getNumber(req.query.size, 20)
  const contentType = String(req.query.contentType || 'image')
  const filtered = state.media.filter((item) => item.kind === contentType)
  const paginated = paginate(
    filtered,
    page,
    size,
    sortByDateDescending('created_date')
  )

  res.jsonp({
    path: null,
    tenantId: TENANT_ID,
    files: {
      totalPages: paginated.totalPages,
      pageSize: size,
      content: {
        PUBLIC: paginated.items,
        PRIVATE: []
      }
    }
  })
})

server.delete('/content-service/v1.0/content/:id', (req, res) => {
  removeById(state.media, req.params.id)
  res.status(200).jsonp({ status: 'deleted' })
})

server.get(
  '/content-service/v1.0/base64-content/:tenantId/:subTenantId/:userId/:imageId',
  (req, res) => {
    const label = prettifyImageId(req.params.imageId)
    res.jsonp({
      base64: createSvgBase64({
        title: label,
        subtitle: 'Local mock thumbnail',
        accent: pickAccentFromId(req.params.imageId)
      }),
      mimeType: 'image/svg+xml'
    })
  }
)

server.get('/xcode-service/v1.0/animations', (req, res) => {
  const page = getNumber(req.query.page, 0)
  const size = getNumber(req.query.size, 20)
  const paginated = paginate(
    state.animations,
    page,
    size,
    sortByDateDescending('creationTimeMs')
  )

  res.jsonp({
    totalElements: state.animations.length,
    totalPages: paginated.totalPages,
    size,
    content: paginated.items
  })
})

server.post('/iam-service/oauth/token', (req, res) => {
  res.jsonp({
    access_token: 'mobius-local-mock-token',
    token_type: 'Bearer',
    expires_in: 3600
  })
})

server.listen(8080, () => {
  console.log('Mobius local mock API running on http://localhost:8080')
})

function collectRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []

    req.on('data', (chunk) => {
      chunks.push(Buffer.from(chunk))
    })

    req.on('end', () => {
      resolve(Buffer.concat(chunks))
    })

    req.on('error', reject)
  })
}

function createUploadedMedia(filename) {
  const kind = inferMediaKind(filename)
  const title = filename.replace(/\.[^/.]+$/, '')
  const accentMap = {
    image: '#0f4c81',
    video: '#0f766e',
    audio: '#be185d'
  }
  const visual = createSvgDataUrl({
    title,
    subtitle: `Uploaded ${kind} placeholder`,
    accent: accentMap[kind],
    eyebrow: 'Upload'
  })

  return {
    id: uuidv4(),
    filePath: `/${kind}/${filename}`,
    name: filename,
    viewURL: visual,
    downloadURL: visual,
    description: 'Uploaded into the local mock library.',
    created_date: Date.now(),
    tags: ['upload', kind],
    kind
  }
}

function inferMediaKind(filename) {
  const extension = String(filename.split('.').pop() || '').toLowerCase()

  if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(extension)) {
    return 'image'
  }

  if (['mp4', 'mov', 'avi', 'm4v', 'wmv'].includes(extension)) {
    return 'video'
  }

  return 'audio'
}

function createBlankExperience(payload = {}) {
  const timestamp = new Date().toISOString()
  const thumbnail =
    payload.thumbnail ||
    createSvgDataUrl({
      title: payload.name || 'New Experience',
      subtitle: 'Created in local mock',
      accent: '#0f4c81'
    })

  return {
    id: uuidv4(),
    name: payload.name || 'Untitled Experience',
    description: payload.description || 'Local mock experience',
    category: payload.category || 'Mock Experience',
    status: payload.status || 'draft',
    tenant: payload.tenant || 'mobius@local.mock',
    version: payload.version || 1,
    createdAt: timestamp,
    updatedAt: timestamp,
    gitSource: payload.gitSource || '',
    tags: payload.tags || [],
    medias: payload.medias || [],
    details: {
      thumbnail
    },
    thumbnail,
    configuration: payload.configuration || {
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
    },
    pages: payload.pages || [],
    experienceElements:
      payload.experienceElements ||
      [
        {
          id: 'start-node',
          type: 'start-node',
          label: payload.name || 'New Experience',
          sourcePosition: 'right',
          position: { x: 0, y: 0 },
          connectable: false,
          events: {}
        }
      ],
    performance: payload.performance || [],
    published: payload.published || false,
    tenantId: payload.tenantId || TENANT_ID
  }
}

function buildPlatformDeviceSupport(experience) {
  const listConfiguration = [
    'NextGenTv',
    'Dashboard',
    'Email',
    'HTML',
    'SMS',
    'Signage',
    'Facebook',
    'Twitter',
    'Linkedin',
    'Whatsapp',
    'Instagram'
  ]

  return listConfiguration.reduce((accumulator, key) => {
    const entries = Array.isArray(experience.configuration?.[key])
      ? experience.configuration[key]
      : []

    accumulator[key] = entries.map((entry) => {
      const page = experience.pages.find((item) => item.id === entry.id)
      return {
        ...entry,
        resolutions: page?.resolutions,
        title: page?.title,
        orientation: page?.orientationsCompatibility?.landscape
          ? 'landscape'
          : 'portrait',
        devicesCompatibility: page?.devicesCompatibility,
        status: page?.isPublished
      }
    })
    return accumulator
  }, {})
}

function findExperience(id) {
  return state.experiences.find((item) => item.id === id)
}

function filterLegacyItems(items, search) {
  const keyword = String(search || '').trim().toLowerCase()
  if (!keyword) {
    return items
  }

  return items.filter((item) =>
    `${item.title} ${item.description}`.toLowerCase().includes(keyword)
  )
}

function normalizeCategories(category, misspelledCategory) {
  const values = []

  if (Array.isArray(category)) {
    values.push(...category)
  } else if (category) {
    values.push(category)
  }

  if (Array.isArray(misspelledCategory)) {
    values.push(...misspelledCategory)
  } else if (misspelledCategory) {
    values.push(misspelledCategory)
  }

  return values.map((item) => String(item).toLowerCase())
}

function filterItems(items, keyword, selector) {
  if (!keyword) {
    return items
  }

  const normalized = keyword.toLowerCase()
  return items.filter((item) => selector(item).toLowerCase().includes(normalized))
}

function paginate(items, page, size, sorter) {
  const sortedItems = sorter ? [...items].sort(sorter) : [...items]
  const safeSize = Math.max(size, 1)
  const totalPages = Math.max(Math.ceil(sortedItems.length / safeSize), 1)
  const safePage = Math.min(Math.max(page, 0), totalPages - 1)
  const start = safePage * safeSize

  return {
    items: sortedItems.slice(start, start + safeSize),
    currentPage: safePage,
    totalPages
  }
}

function getNumber(value, fallback) {
  const numeric = Number(value)
  return Number.isFinite(numeric) ? numeric : fallback
}

function sortByDateDescending(key) {
  return function (left, right) {
    return Number(new Date(right[key])) - Number(new Date(left[key]))
  }
}

function removeById(collection, id) {
  const index = collection.findIndex((item) => item.id === id)
  if (index === -1) {
    return false
  }

  collection.splice(index, 1)
  return true
}

function prettifyImageId(imageId) {
  return String(imageId)
    .replace(/^thumb-/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function pickAccentFromId(imageId) {
  const value = String(imageId)
  if (value.includes('dashboard')) return '#7c3aed'
  if (value.includes('template')) return '#e76f51'
  if (value.includes('app')) return '#0f4c81'
  if (value.includes('page')) return '#0284c7'
  return '#0f766e'
}
