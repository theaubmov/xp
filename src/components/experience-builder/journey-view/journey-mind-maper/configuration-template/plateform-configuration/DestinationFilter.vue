<script lang="ts" setup>
import { useConfigurationMindMapper } from '@/stores/configuration-mind-mapper'
import { computed, onMounted, ref } from 'vue'
import { useDataSourceStore } from '@/stores/data-sources'
import { find, get } from 'lodash'
import { v4 as uuidv4 } from 'uuid'

enum DestinationFilterValue {
  STATIC = 'STATIC',
  SOURCE_ATTR = 'SOURCE_ATTR',
  TRIGGER_ATTR = 'TRIGGER_ATTR'
}

interface CustomDestinationFilterProps {
  filter?: {
    id: string
    attribute: string
    type: string
    value: any
  }
}

const props = defineProps<CustomDestinationFilterProps>()
const emit = defineEmits(['saveFilter', 'updateFilter'])
const configurationMindMapper = useConfigurationMindMapper()
const dataSourceStore = useDataSourceStore()

const selectedDestinationFilter = ref(null as any)
const selectedDestinationAttributeFilter = ref(null as any)
const selectDestinationValue = ref([] as any[])
const destinationAttribute = ref([] as string[])
const destinationValue = ref(null as any)

const destinationFilter = computed(() => {
  return [
    {
      label: 'STATIC',
      value: DestinationFilterValue.STATIC,
      disable: false
    },
    {
      label: 'SOURCE ATTRIBUTE',
      value: DestinationFilterValue.SOURCE_ATTR,
      disable: !get(
        configurationMindMapper,
        'currentConfiguration.item.configuration.source.id',
        null
      )
    },
    {
      label: 'TRIGGER ATTRIBUTE',
      value: DestinationFilterValue.TRIGGER_ATTR,
      disable:
        !configurationMindMapper.currentConfiguration.item.configuration
          .dataSource.length
    }
  ]
})

const isDisabled = computed(() => {
  return (
    !selectedDestinationFilter.value ||
    !selectedDestinationAttributeFilter.value ||
    !destinationValue.value
  )
})

const updateDestinationFilter = async () => {
  const filter = selectedDestinationFilter.value
  const configurationDestination: any =
    configurationMindMapper.currentConfiguration.item.configuration.destination

  switch (filter.value) {
    case DestinationFilterValue.STATIC:
      destinationAttribute.value = await dataSourceStore.getValue(
        configurationDestination
      )
      break
    case DestinationFilterValue.SOURCE_ATTR:
      destinationAttribute.value = await dataSourceStore.getValue(
        configurationDestination
      )
      selectDestinationValue.value = await dataSourceStore.getValue(
        get(
          configurationMindMapper,
          'currentConfiguration.item.configuration.source',
          null
        )
      )
      break
    case DestinationFilterValue.TRIGGER_ATTR:
      console.log('TRIGGER_ATTR')
      break
    default:
      break
  }
}

const save = () => {
  const filter = {
    id: uuidv4(),
    type: selectedDestinationFilter.value.value,
    attribute: selectedDestinationAttributeFilter.value,
    value: destinationValue.value
  }
  emit('saveFilter', filter)
}

const update = () => {
  const filter = {
    id: props.filter?.id,
    type: selectedDestinationFilter.value.value,
    attribute: selectedDestinationAttributeFilter.value,
    value: JSON.stringify(destinationValue.value)
  }
  emit('updateFilter', filter)
}

onMounted(async () => {
  if (props.filter) {
    selectedDestinationFilter.value = find(destinationFilter.value, [
      'value',
      props.filter.type
    ])
    await updateDestinationFilter()
    selectedDestinationAttributeFilter.value = props.filter.attribute
    destinationValue.value = JSON.parse(props.filter.value)
  }
})
</script>
<template>
  <q-card-section>
    <q-select
      v-model="selectedDestinationFilter"
      :options="destinationFilter"
      :option-value="(opt) => opt.value"
      :option-label="(opt) => opt.label"
      :option-disable="(opt) => opt.disable"
      @update:model-value="updateDestinationFilter"
      label="Destination Filters"
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
      v-if="destinationAttribute.length"
      v-model="selectedDestinationAttributeFilter"
      :options="destinationAttribute"
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
    <q-input
      v-if="
        destinationAttribute.length &&
        selectedDestinationFilter.value == DestinationFilterValue.STATIC
      "
      v-model="destinationValue"
      class="q-py-xs"
      type="textarea"
      label="Destination Value"
      outlined
      dense
    />
    <q-select
      v-if="
        destinationAttribute.length &&
        selectedDestinationFilter.value == DestinationFilterValue.SOURCE_ATTR
      "
      v-model="destinationValue"
      :options="selectDestinationValue"
      label="Destination Value"
      class="q-py-xs"
      hide-dropdown-icon
      outlined
      dense
    >
      <template v-slot:append>
        <q-icon size="xs" name="fa-solid fa-angle-down" />
      </template>
    </q-select>
    <div class="row q-tab-panel justify-end">
      <q-btn
        v-if="filter"
        label="Update Filter"
        color="accent"
        :disable="isDisabled"
        @click="update"
      />
      <q-btn
        v-else
        label="Add Filter"
        color="accent"
        :disable="isDisabled"
        @click="save"
      />
    </div>
  </q-card-section>
</template>
