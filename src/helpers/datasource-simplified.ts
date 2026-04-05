import { forEach } from 'lodash'

export interface DataSource {
  context: any | DataSourceKeyValue[]
  custom: any | DataSourceKeyValue[]
  source: any | DataSourceKeyValue[]
  target: any | DataSourceKeyValue[]
  [key: string]: DataSourceKeyValue[]
}

export interface DataSourceKeyValue {
  key: string
  value: any
}

export function templateDataSourceParser(dataSource: DataSource) {
  const formatedDataSource = []
  forEach(Object.keys(dataSource), (key) => {
    if (dataSource[key]) {
      formatedDataSource.push(dataSource[key])
      return false
    }
  })
}

export function baDataSourceParser(dataSource: DataSource) {
  const formatedDataSource = []
  forEach(Object.keys(dataSource), (key) => {
    if (dataSource[key]) {
      formatedDataSource.push(dataSource[key])
      return false
    }
  })
}

// function dataSourceKeyValueParser(dataSourceKeyValue: DataSourceKeyValue[]) {
//   const dataSource = {}
//   forEach()
// }
// export class FormatDataSourceListItem {
//   dataList: DataSourceItem[]

//   constructor(data: DataSource) {

//   }
// }
