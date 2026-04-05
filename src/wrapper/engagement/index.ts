import type { AxiosPromise } from 'axios'
import type { API } from '@/wrapper'
import type { DataSourceGetResponse } from '@/interfaces/data-source.interface'
import { useTokenStore } from '@/stores/token'

export interface EngagementWrapper {
  createEngagement: (current: any) => AxiosPromise<DataSourceGetResponse>
}

export default (API: API): EngagementWrapper => ({
  createEngagement: async (dto: any) => {
    const tokenValue = await useTokenStore().getBearerToken()
    const url = '/engagements-web/v1.0/618b6fdef5dacc0001a6b1b0/engagements'
    const request = API.http.post(url, dto, {
      headers: {
        Authorization: `Bearer ${tokenValue}`
      }
    })
    return API.handleError(request)
  }
})
