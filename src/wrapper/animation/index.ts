import type { AxiosPromise } from 'axios'
import type { API } from '@/wrapper'
import type { AnimationsResponse } from '@/interfaces/animation.interface'

export interface AnimationsWrapper {
  getAnimations: (page: number) => AxiosPromise<AnimationsResponse>
}

export default (API: API): AnimationsWrapper => ({
  getAnimations: (page: number) => {
    const url = `/xcode-service/v1.0/animations?page=${page}`
    const request = API.http.get(url)
    return API.handleError(request)
  }
})
