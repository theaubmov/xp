import type { AxiosPromise } from 'axios'
import type { API } from '@/wrapper'

export interface TokenWrapper {
  getBearerToken: () => AxiosPromise<any>
}

export default (API: API): TokenWrapper => ({
  getBearerToken: () => {
    const url =
      '/iam-service/oauth/token?username=test-dl&password=hgr&provider=other&grant_type=password&clientId=60e58d799594680001e19768&checkB2B=false&tenantId=60e5e3f87ec7860001b6a824'
    const request = API.http.post(url)
    return API.handleError(request)
  }
})
