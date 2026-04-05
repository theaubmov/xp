import Api from '@/wrapper'

const defaultMockApiUrl = import.meta.env.PROD
  ? '/.netlify/functions/api'
  : 'http://localhost:8080'

const localMockApiUrl = import.meta.env.VITE_MOCK_API_URL || defaultMockApiUrl

export const api = Api(localMockApiUrl)
export const apiUrlGain = Api(localMockApiUrl)
