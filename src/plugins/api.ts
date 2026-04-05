import Api from '@/wrapper'

const localMockApiUrl = import.meta.env.VITE_MOCK_API_URL || 'http://localhost:8080'

export const api = Api(localMockApiUrl)
export const apiUrlGain = Api(localMockApiUrl)
