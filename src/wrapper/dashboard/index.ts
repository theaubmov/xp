import type { AxiosPromise } from 'axios'
import type { API } from '@/wrapper'
import type { DashboardsResponse } from '@/interfaces/dashboard.interface'

export interface DashboardsWrapper {
  getDashboards: (page: number) => AxiosPromise<DashboardsResponse>
  searchDashboards: (
    query: string,
    page: number
  ) => AxiosPromise<DashboardsResponse>
  deleteDashboard: (id: string) => AxiosPromise<DashboardsResponse>
}

export default (API: API): DashboardsWrapper => ({
  getDashboards: (page: number) => {
    const url = `/tf-web/v2.0/618b6fdef5dacc0001a6b1b0/dashboards?sort=creationTime,desc&page=${page}&size=20`
    const request = API.http.get(url)
    return API.handleError(request)
  },
  searchDashboards: (query: string, page: number) => {
    const url = `tf-web/v1.0/59ce808c99298e1e06660c09/search?category=dashboards&keyword=${query}&page=${page}&size=20`
    const request = API.http.get(url)
    return API.handleError(request)
  },
  deleteDashboard: (id: string) => {
    const url = `/tf-web/v2.0/618b6fdef5dacc0001a6b1b0/dashboards/${id}`
    const request = API.http.delete(url)
    return API.handleError(request)
  }
})
