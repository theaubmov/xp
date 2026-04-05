import type {
  AxiosError,
  AxiosPromise,
  AxiosInstance,
  AxiosResponse
} from 'axios'
import axios from 'axios'
import experienceApi, { type ExperienceApiWrapper } from '@/wrapper/experience'
import experiencev2Api, {
  type ExperienceV2Wrapper
} from '@/wrapper/experienceV2'
import uploaderApi, { type UploaderApiWrapper } from '@/wrapper/uploader'
import broadcastApp, { type BroadCastAppWrapper } from '@/wrapper/broadcast-app'
import pagesApi, { type PagesWrapper } from '@/wrapper/pages'
import type { MediaWrapper } from '@/wrapper/media'
import media from './media'
import template from './template'
import type { TemplateWrapper } from '@/wrapper/template'
import type { ContentServiceWrapper } from './content-service'
import contentService from './content-service'
import dataSourceApi, { type DataSourceWrapper } from './data-source'
import dashboard, { type DashboardsWrapper } from './dashboard'
import chart, { type ChartWrapper } from './chart'
import animation, { type AnimationsWrapper } from './animation'
import triggerApi, { type TriggerWrapper } from './trigger'
import tokenApi, { type TokenWrapper } from './token'
import EngagementApi, { type EngagementWrapper } from './engagement'

export interface ApiWrapper {
  experience: ExperienceApiWrapper
  experiencev2: ExperienceV2Wrapper
  uploader: UploaderApiWrapper
  broadcastApp: BroadCastAppWrapper
  media: MediaWrapper
  templates: TemplateWrapper
  pages: PagesWrapper
  contentService: ContentServiceWrapper
  dataSources: DataSourceWrapper
  dashboard: DashboardsWrapper
  animation: AnimationsWrapper
  chart: ChartWrapper
  trigger: TriggerWrapper
  token: TokenWrapper
  engagement: EngagementWrapper
}

export interface API {
  url: string
  http: AxiosInstance
  handleError<T>(request: AxiosPromise): Promise<AxiosResponse<T>>
}

const errorCallbacks = {
  onForbiddenError: (error: Error) => {
    console.log('forbidden error', error)
  }
}

export default function (url: string): ApiWrapper {
  const handleError = function <T>(
    request: AxiosPromise
  ): Promise<AxiosResponse<T>> {
    return request
      .then(function <t>(response: AxiosResponse<t>) {
        return response
      })
      .catch(function (error: AxiosError) {
        if (error.response?.status === 403) {
          errorCallbacks.onForbiddenError(error)
        }
        throw error
      })
  }

  const API = {
    url,
    http: axios.create({
      baseURL: url,
      timeout: 20000
    }),
    handleError
  }

  return {
    experience: experienceApi(API),
    experiencev2: experiencev2Api(API),
    uploader: uploaderApi(API),
    broadcastApp: broadcastApp(API),
    media: media(API),
    templates: template(API),
    pages: pagesApi(API),
    contentService: contentService(API),
    dataSources: dataSourceApi(API),
    dashboard: dashboard(API),
    animation: animation(API),
    chart: chart(API),
    trigger: triggerApi(API),
    token: tokenApi(API),
    engagement: EngagementApi(API)
  }
}
