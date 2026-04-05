export interface animationBackgrounds {
  red: string
  green: string
  blue: string
}

export interface animationProperties {
  id: number
  backgroundColor: animationBackgrounds
  width: string
  height: string
  left: string
  textElements: any
  scrollElements: any
}

export interface Animation {
  id: string
  name: string
  tenantID: string
  serviceId: string
  userId: string
  animationType: string
  requestID: string
  animations: animationProperties[]
  destinationPath: string
  pvrRequired: boolean
  pvrRequestModel: any
  modelType: string
  templateId: string
  feedURL: {
    source: string
  }
  creationTimeMs: number
}

export interface AnimationsResponse {
  totalElements: number
  totalPages: number
  size: number
  content: Animation[]
}
