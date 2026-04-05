export interface Media {
  id: string
  filePath: string
  name: string
  viewURL: string
  downloadURL: string
  description: string
  created_date: any
  tags: []
}

export interface MediaListFiles {
  totalPages: number
  pageSize: number
  content: {
    PUBLIC: Media[]
    PRIVATE: Media[]
  }
}

export interface MediaResponse {
  path: any
  tenantId: any
  files: MediaListFiles
}
