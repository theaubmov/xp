import type { AxiosPromise } from 'axios'
import type { API } from '@/wrapper'
import type { ChartResponse } from '@/interfaces/chart.interface'

export interface ChartWrapper {
  getCharts: (page: number) => AxiosPromise<ChartResponse>
  deleteChart: (id: string) => AxiosPromise<ChartResponse>
}

export default (API: API): ChartWrapper => ({
  getCharts: (page: number) => {
    const url = `/tf-web/v2.0/618b6fdef5dacc0001a6b1b0/graphs?page=${page}&size=20`
    const request = API.http.get(url)
    return API.handleError(request)
  },
  deleteChart: (id: string) => {
    const url = `/tf-web/v2.0/618b6fdef5dacc0001a6b1b0/graphs/${id}`
    const request = API.http.delete(url)
    return API.handleError(request)
  }
})
