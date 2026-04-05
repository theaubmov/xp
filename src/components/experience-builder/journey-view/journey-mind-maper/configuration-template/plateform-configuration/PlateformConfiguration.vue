<script lang="ts" setup>
import { useConfigurationMindMapper } from '@/stores/configuration-mind-mapper'
import { useDataSourceStore } from '@/stores/data-sources'
import { useVueFlow } from '@braks/vue-flow'
import { find, findIndex, get, pullAt } from 'lodash'
import { computed, onMounted, ref } from 'vue'
import DestinationFilterComponent from './DestinationFilter.vue'
import SourceFilterComponent from './SourceFilter.vue'

const configurationMindMapper = useConfigurationMindMapper()
const { applyNodeChanges, addNodes, getNode } = useVueFlow()
const dataSourceStore = useDataSourceStore()

const tab = ref('source')
const selectedDataSourceForSource = ref(null as any)
const selectedDataSourceForDestination = ref(null as any)
const selectedIterationForSource = ref(null as any)
const selectedIterationForDestination = ref(null as any)

const communicationType = ref([] as string[])
const selectedCommunication = ref('')
const selectedAddFilter = ref<'source-filter' | 'destination-filter' | ''>('')
const selectedDestinationUpdateFilter = ref(null as any)
const selectedSourceUpdateFilter = ref(null as any)

const channelPackageName = ref(null as any)
const channelRPCFilename = ref(null as any)
const channelServiceId = ref(null as any)
const channelDstinationAttribute = ref(null as any)
const channelDstinationAttributeList = ref([] as any[])

const iterationType = [
  {
    label: 'NONE (default)',
    value: 'NONE'
  },
  {
    label: 'PER ROW',
    value: 'PER_ROW'
  },
  {
    label: 'OVER ATTRIBUTES',
    value: 'OVER_ATTRIBUTES'
  }
]

const dataSource = computed(() => {
  return configurationMindMapper.currentConfiguration.item.configuration
    .dataSource
})

const isAddDestinationFilterDisabled = computed(() => {
  return !get(
    configurationMindMapper,
    'currentConfiguration.item.configuration.destination.id',
    null
  )
})

const isAddSourceFilterDisabled = computed(() => {
  return !get(
    configurationMindMapper,
    'currentConfiguration.item.configuration.source.id',
    null
  )
})

const sourceFilter = computed(() => {
  return get(
    configurationMindMapper,
    'currentConfiguration.item.configuration.source.filters',
    []
  )
})

const destinationFilter = computed(() => {
  return get(
    configurationMindMapper,
    'currentConfiguration.item.configuration.destination.filters',
    []
  )
})

const save = () => {
  const nodeId = configurationMindMapper.currentConfiguration.nodeId
  if (!nodeId) return
  const node = getNode.value(nodeId)

  let source = {} as any
  if (selectedDataSourceForSource.value) {
    const type = selectedDataSourceForSource.value.type == 'group_definition'
    source = {
      type: type ? 'GROUP' : 'ANALYTICS',
      id: selectedDataSourceForSource.value.id,
      schemaId: selectedDataSourceForSource.value.schemaId,
      owner: selectedDataSourceForSource.value.owner,
      iteration: {
        type: selectedIterationForSource.value?.value
      },
      filters: get(
        configurationMindMapper,
        'currentConfiguration.item.configuration.source.filters',
        []
      )
    }
  }

  let destination = {} as any
  if (selectedDataSourceForDestination.value) {
    const type = selectedDataSourceForDestination.value.type
    destination = {
      type: type == 'group_definition' ? 'GROUP' : 'ANALYTICS',
      id: selectedDataSourceForDestination.value.id,
      schemaId: selectedDataSourceForDestination.value.schemaId,
      owner: selectedDataSourceForDestination.value.owner,
      iteration: {
        type: selectedIterationForDestination.value?.value
      },
      filters: get(
        configurationMindMapper,
        'currentConfiguration.item.configuration.destination.filters',
        []
      )
    }
  }

  const channel = {
    ...configurationMindMapper.currentConfiguration.item.configuration.channel,
    communication: {
      type: selectedCommunication.value
    },
    packageName: channelPackageName.value,
    rpcFilename: channelRPCFilename.value,
    serviceId: channelServiceId.value,
    destinationAttribute: channelDstinationAttribute.value
  }

  const configuration = {
    channel: channel,
    destination: destination,
    source: source,
    dataSource: dataSource.value
  }

  if (!node) return
  applyNodeChanges([{ type: 'remove', id: nodeId }])
  const data = {
    ...node?.data,
    configuration
  }
  node.data = data
  addNodes([node])
  configurationMindMapper.reset()
}

const saveFilter = (filter: any, index: string) => {
  const nodeId = configurationMindMapper.currentConfiguration.nodeId
  if (!nodeId) return
  const node = getNode.value(nodeId)

  if (!node) return
  applyNodeChanges([{ type: 'remove', id: nodeId }])
  node.data.configuration[index].filters.push(filter)
  addNodes([node])
  goBack()
}

const updateFilter = (filter: any, index: string) => {
  const nodeId = configurationMindMapper.currentConfiguration.nodeId
  if (!nodeId) return
  const node = getNode.value(nodeId)

  if (!node) return
  applyNodeChanges([{ type: 'remove', id: nodeId }])
  const filterIndex = findIndex(node.data.configuration[index].filters, {
    id: filter.id
  })
  node.data.configuration[index].filters.splice(filterIndex, 1, { ...filter })
  addNodes([node])
  goBack()
}

const deleteFilter = (NodeId: number, index: string) => {
  const nodeId = configurationMindMapper.currentConfiguration.nodeId
  if (!nodeId) return
  const node = getNode.value(nodeId)

  if (!node) return
  applyNodeChanges([{ type: 'remove', id: nodeId }])
  pullAt(node.data.configuration[index].filters, NodeId)
  addNodes([node])
}

const editDestinationFilter = (filter: any) => {
  selectedDestinationUpdateFilter.value = filter
  selectedAddFilter.value = 'destination-filter'
}

const editSourceFilter = (filter: any) => {
  selectedSourceUpdateFilter.value = filter
  selectedAddFilter.value = 'source-filter'
}

const goBack = () => {
  selectedAddFilter.value = ''
  selectedDestinationUpdateFilter.value = null
  selectedSourceUpdateFilter.value = null
}

onMounted(async () => {
  try {
    const channelType = get(
      configurationMindMapper.currentConfiguration,
      'item.configuration.channel.channelType'
    )
    if (channelType === 'MEF') {
      communicationType.value = ['BROADBAND', 'BROADCAST']
      selectedCommunication.value =
        configurationMindMapper.currentConfiguration.item.configuration.channel.communication.type
    }

    const sourceId = get(
      configurationMindMapper.currentConfiguration,
      'item.configuration.source.id'
    )
    if (sourceId) {
      selectedDataSourceForSource.value = find(dataSource.value, [
        'id',
        sourceId
      ])
    }

    const destinationId = get(
      configurationMindMapper.currentConfiguration,
      'item.configuration.destination.id'
    )
    if (destinationId) {
      selectedDataSourceForDestination.value = find(dataSource.value, [
        'id',
        destinationId
      ])
    }

    const sourceIterationId = get(
      configurationMindMapper.currentConfiguration,
      'item.configuration.source.iteration.type'
    )
    if (sourceIterationId) {
      selectedIterationForSource.value = find(iterationType, [
        'value',
        sourceIterationId
      ])
    }

    const destinationIterationId = get(
      configurationMindMapper.currentConfiguration,
      'item.configuration.destination.iteration.type'
    )
    if (destinationIterationId) {
      selectedIterationForDestination.value = find(iterationType, [
        'value',
        destinationIterationId
      ])
    }

    const packageName = get(
      configurationMindMapper.currentConfiguration,
      'item.configuration.channel.packageName'
    )
    if (packageName) {
      channelPackageName.value = packageName
    }

    const rpcFilename = get(
      configurationMindMapper.currentConfiguration,
      'item.configuration.channel.rpcFilename'
    )
    if (rpcFilename) {
      channelRPCFilename.value = rpcFilename
    }

    const serviceId = get(
      configurationMindMapper.currentConfiguration,
      'item.configuration.channel.serviceId'
    )
    if (serviceId) {
      channelServiceId.value = serviceId
    }

    channelDstinationAttribute.value = get(
      configurationMindMapper.currentConfiguration,
      'item.configuration.channel.destinationAttribute'
    )
    channelDstinationAttributeList.value = await dataSourceStore.getValue(
      get(
        configurationMindMapper,
        'currentConfiguration.item.configuration.source',
        null
      )
    )
  } catch (err) {
    console.log(err)
  }
})
</script>
<template>
  <div
    class="row justify-between items-center q-py-md q-px-md"
    style="width: 100%"
  >
    <div class="col-8 text-start text-weight-bold">
      {{ configurationMindMapper.currentConfiguration.title }}
    </div>
    <q-space></q-space>
    <div class="col-auto">
      <q-btn
        @click="configurationMindMapper.reset()"
        class="q-px-none"
        flat
        round
      >
        <q-icon class="cursor-pointer" name="fa-solid fa-close" size="xs" />
      </q-btn>
    </div>
  </div>
  <div class="q-px-md" v-if="!selectedAddFilter">
    <q-tabs class="configuration-tabs" v-model="tab">
      <q-tab name="source">
        <template v-slot:default>
          Source <span class="tab-span">(optional)</span>
        </template>
      </q-tab>
      <q-tab name="destination">
        <template v-slot:default>
          Destination <span class="tab-span">(required)</span>
        </template>
      </q-tab>
      <q-tab
        name="additional-configuration"
        v-if="communicationType.length > 0"
      >
        <template v-slot:default>
          configuration<span class="tab-span">(additional)</span>
        </template>
      </q-tab>
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="source">
        <q-select
          v-model="selectedDataSourceForSource"
          :options="dataSource"
          option-label="name"
          label="Data Source"
          class="q-py-xs"
          hide-dropdown-icon
          outlined
          dense
        >
          <template v-slot:append>
            <q-icon size="xs" name="fa-solid fa-angle-down" />
          </template>
        </q-select>
        <q-select
          v-model="selectedIterationForSource"
          :options="iterationType"
          label="Iteration"
          class="q-py-xs"
          hide-dropdown-icon
          outlined
          dense
        >
          <template v-slot:append>
            <q-icon size="xs" name="fa-solid fa-angle-down" />
          </template>
        </q-select>
        <div class="row justify-end items-center q-pt-md">
          <div
            class="col-auto text-start text-weight-bold"
            v-if="sourceFilter.length"
          >
            Filters
          </div>
          <q-space></q-space>
          <q-btn
            color="primary"
            label="Add filter"
            @click="selectedAddFilter = 'source-filter'"
            :disable="isAddSourceFilterDisabled"
            flat
            dense
          />
        </div>
        <q-separator v-if="sourceFilter.length"></q-separator>
        <q-banner
          v-for="(filter, index) in sourceFilter"
          :key="filter.attribute"
          class="text-black q-my-sm"
          style="background-color: #f8f8f8"
          inline-actions
          rounded
          dense
        >
          <span style="display: flex"> Type : {{ filter.type }} </span>
          <span style="display: flex">
            Attribute : {{ filter.attribute }}
          </span>

          <template v-slot:action>
            <q-btn flat rounded @click="editSourceFilter(filter)">
              <q-icon
                class="cursor-pointer"
                name="fa-solid fa-pen-to-square"
                size="xs"
              />
            </q-btn>
            <q-btn flat rounded @click="deleteFilter(index, 'source')">
              <q-icon
                class="cursor-pointer"
                name="fa-solid fa-trash"
                size="xs"
              />
            </q-btn>
          </template>
        </q-banner>
      </q-tab-panel>
      <q-tab-panel name="destination">
        <q-select
          v-model="selectedDataSourceForDestination"
          :options="dataSource"
          option-label="name"
          label="Data Source"
          class="q-py-xs"
          hide-dropdown-icon
          outlined
          dense
        >
          <template v-slot:append>
            <q-icon size="xs" name="fa-solid fa-angle-down" />
          </template>
        </q-select>
        <q-select
          v-model="selectedIterationForDestination"
          :options="iterationType"
          label="Iteration"
          class="q-py-xs"
          hide-dropdown-icon
          outlined
          dense
        >
          <template v-slot:append>
            <q-icon size="xs" name="fa-solid fa-angle-down" />
          </template>
        </q-select>
        <div class="row justify-end items-center q-pt-md">
          <div
            class="col-auto text-start text-weight-bold"
            v-if="destinationFilter.length"
          >
            Filters
          </div>
          <q-space></q-space>
          <q-btn
            color="primary"
            label="Add filter"
            @click="selectedAddFilter = 'destination-filter'"
            :disable="isAddDestinationFilterDisabled"
            flat
            dense
          />
        </div>
        <q-separator v-if="destinationFilter.length"></q-separator>
        <q-banner
          v-for="(filter, index) in destinationFilter"
          :key="filter.attribute"
          class="text-black q-my-sm"
          style="background-color: #f8f8f8"
          inline-actions
          rounded
          dense
        >
          <span style="display: flex"> Type : {{ filter.type }} </span>
          <span style="display: flex">
            Attribute : {{ filter.attribute }}
          </span>

          <template v-slot:action>
            <q-btn flat rounded @click="editDestinationFilter(filter)">
              <q-icon
                class="cursor-pointer"
                name="fa-solid fa-pen-to-square"
                size="xs"
              />
            </q-btn>
            <q-btn flat rounded @click="deleteFilter(index, 'destination')">
              <q-icon
                class="cursor-pointer"
                name="fa-solid fa-trash"
                size="xs"
              />
            </q-btn>
          </template>
        </q-banner>
      </q-tab-panel>
      <q-tab-panel
        name="additional-configuration"
        label="Additional Configuration"
        v-if="communicationType.length > 0"
      >
        <q-select
          v-model="selectedCommunication"
          :options="communicationType"
          label="Communication Type"
          class="q-py-xs"
          hide-dropdown-icon
          outlined
          dense
        >
          <template v-slot:append>
            <q-icon size="xs" name="fa-solid fa-angle-down" />
          </template>
        </q-select>
        <q-input
          v-model="channelPackageName"
          class="q-py-xs"
          label="Package Name"
          outlined
          dense
        />
        <q-input
          v-model="channelRPCFilename"
          class="q-py-xs"
          label="RPC File Name"
          outlined
          dense
        />
        <q-input
          v-model="channelServiceId"
          class="q-py-xs"
          label="Service Id"
          outlined
          dense
        />
        <q-select
          v-model="channelDstinationAttribute"
          :options="channelDstinationAttributeList"
          label="Destination Attributes"
          class="q-py-xs"
          hide-dropdown-icon
          outlined
          dense
        >
          <template v-slot:append>
            <q-icon size="xs" name="fa-solid fa-angle-down" />
          </template>
        </q-select>
      </q-tab-panel>
    </q-tab-panels>
    <div class="row q-tab-panel justify-end">
      <q-btn color="accent" label="save" @click="save" />
    </div>
  </div>

  <div class="q-px-md" v-if="selectedAddFilter !== ''">
    <q-btn @click="goBack" class="q-px-none go-back" flat>
      <q-icon class="cursor-pointer" name="fa-solid fa-arrow-left" size="xs" />
      <span class="q-pl-sm">Go Back</span>
    </q-btn>
    <destination-filter-component
      v-if="selectedAddFilter === 'destination-filter'"
      :filter="selectedDestinationUpdateFilter"
      @save-filter="(filter:any) => saveFilter(filter, 'destination')"
      @update-filter="(filter:any) => updateFilter(filter, 'destination')"
    />
    <source-filter-component
      v-if="selectedAddFilter === 'source-filter'"
      :filter="selectedSourceUpdateFilter"
      @save-filter="(filter:any) => saveFilter(filter, 'source')"
      @update-filter="(filter:any) => updateFilter(filter, 'source')"
    />
  </div>
</template>
<style lang="scss">
.q-item__section--side > .q-icon {
  font-size: 16px;
}
.configuration-tabs .q-tab--active .q-tab__indicator {
  background-color: $primary !important;
}
.tab-span {
  font-size: 10px;
  text-transform: lowercase;
}
.go-back {
  align-items: center;
  line-height: 0;
}
</style>
