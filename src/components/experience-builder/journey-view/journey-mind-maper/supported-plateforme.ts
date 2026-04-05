import { createMockArtworkDataUrl } from '@/helpers/mock-asset'

export interface plateformItem {
  title: string
  thumbnail: string
  color: string
  configuration: any
}

export const plateforms: plateformItem[] = [
  {
    title: 'NextgenTV',
    thumbnail: createMockArtworkDataUrl({
      title: 'NextGenTV',
      subtitle: 'Broadcast channel',
      accent: '#6d28d9',
      eyebrow: 'Platform'
    }),
    color: 'purple',
    configuration: {
      dataSource: [],
      source: {},
      destination: {},
      channel: {
        channelType: 'MEF',
        mefType: 'BROADCASTER_APP',
        packageName: 'Emoticons__BA1',
        command: 'MEF_HELD',
        rpcFilename: 'held.xml',
        destinationAttribute: 'model.entities[*].deviceId',
        contents: [],
        communication: {
          type: 'BROADBAND'
        }
      }
    }
  },
  {
    title: 'Facebook',
    thumbnail: createMockArtworkDataUrl({
      title: 'Facebook',
      subtitle: 'Social channel',
      accent: '#3C5B9A',
      eyebrow: 'Platform'
    }),
    color: '#3C5B9A',
    configuration: {
      dataSource: [],
      source: {},
      destination: {},
      channel: {
        channelType: 'Facebook',
        mefType: '',
        packageName: '',
        command: '',
        rpcFilename: '',
        destinationAttribute: 'model.entities[*].deviceId',
        contents: []
      }
    }
  },
  {
    title: 'Linkedin',
    thumbnail: createMockArtworkDataUrl({
      title: 'LinkedIn',
      subtitle: 'Professional channel',
      accent: '#2867B2',
      eyebrow: 'Platform'
    }),
    color: '#2867B2',
    configuration: {
      dataSource: [],
      source: {},
      destination: {},
      channel: {
        channelType: 'Linkedin',
        mefType: '',
        packageName: '',
        command: '',
        rpcFilename: '',
        destinationAttribute: 'model.entities[*].deviceId',
        contents: []
      }
    }
  },
  {
    title: 'Twitter',
    thumbnail: createMockArtworkDataUrl({
      title: 'Twitter',
      subtitle: 'Social channel',
      accent: '#00CDFF',
      eyebrow: 'Platform'
    }),
    color: '#00CDFF',
    configuration: {
      dataSource: [],
      source: {},
      destination: {},
      channel: {
        channelType: 'Twitter',
        mefType: '',
        packageName: '',
        command: '',
        rpcFilename: '',
        destinationAttribute: 'model.entities[*].deviceId',
        contents: []
      }
    }
  },
  {
    title: 'Instagram',
    thumbnail: createMockArtworkDataUrl({
      title: 'Instagram',
      subtitle: 'Social channel',
      accent: '#FB480B',
      eyebrow: 'Platform'
    }),
    color: '#FB480B',
    configuration: {
      dataSource: [],
      source: {},
      destination: {},
      channel: {
        channelType: 'Instagram',
        mefType: '',
        packageName: '',
        command: '',
        rpcFilename: '',
        destinationAttribute: 'model.entities[*].deviceId',
        contents: []
      }
    }
  },
  {
    title: 'Dashboard',
    thumbnail: createMockArtworkDataUrl({
      title: 'Dashboard',
      subtitle: 'Operational channel',
      accent: '#6E4AFA',
      eyebrow: 'Platform'
    }),
    color: '#6E4AFA',
    configuration: {
      dataSource: [],
      source: {},
      destination: {},
      channel: {
        channelType: 'Dashboard',
        mefType: '',
        packageName: '',
        command: '',
        rpcFilename: '',
        destinationAttribute: 'model.entities[*].deviceId',
        contents: []
      }
    }
  },
  {
    title: 'Chart',
    thumbnail: createMockArtworkDataUrl({
      title: 'Chart',
      subtitle: 'Analytics channel',
      accent: '#BB5156',
      eyebrow: 'Platform'
    }),
    color: '#BB5156',
    configuration: {
      dataSource: [],
      source: {},
      destination: {},
      channel: {
        channelType: 'Chart',
        mefType: '',
        packageName: '',
        command: '',
        rpcFilename: '',
        destinationAttribute: 'model.entities[*].deviceId',
        contents: []
      }
    }
  },
  {
    title: 'Email',
    thumbnail: createMockArtworkDataUrl({
      title: 'Email',
      subtitle: 'Message channel',
      accent: '#01C8BD',
      eyebrow: 'Platform'
    }),
    color: '#01C8BD',
    configuration: {
      dataSource: [],
      source: {},
      destination: {},
      channel: {
        channelType: 'Email',
        mefType: '',
        packageName: '',
        command: '',
        rpcFilename: '',
        destinationAttribute: 'model.entities[*].deviceId',
        contents: []
      }
    }
  }
]

export const plateformTitle = [
  'NextGenTv',
  'Dashboard',
  'Email',
  'HTML',
  'SMS',
  'Signage',
  'Facebook',
  'Twitter',
  'Linkedin',
  'Whatsapp',
  'Instagram'
]
