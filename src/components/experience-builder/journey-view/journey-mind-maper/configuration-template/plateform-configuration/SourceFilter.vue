<script lang="ts" setup>
import { useConfigurationMindMapper } from '@/stores/configuration-mind-mapper'
import { computed, onMounted, ref } from 'vue'
import { useDataSourceStore } from '@/stores/data-sources'
import { find } from 'lodash'
import { v4 as uuidv4 } from 'uuid'

enum SourceFilterValue {
  STATIC = 'STATIC',
  SOURCE_ATTR = 'SOURCE_ATTR',
  TRIGGER_ATTR = 'TRIGGER_ATTR'
}

interface CustomSourceFilterProps {
  filter?: {
    id: string
    attribute: string
    type: string
    value: any
  }
}

const props = defineProps<CustomSourceFilterProps>()
const emit = defineEmits(['saveFilter', 'updateFilter'])
const configurationMindMapper = useConfigurationMindMapper()
const dataSourceStore = useDataSourceStore()

const selectedSourceFilter = ref(null as any)
const selectedSourceAttributeFilter = ref(null as any)
const sourceAttribute = ref([] as string[])
const sourceValue = ref(null as any)

const sourceFilter = computed(() => {
  return [
    {
      label: 'STATIC',
      value: SourceFilterValue.STATIC,
      disable: false
    },
    {
      label: 'TRIGGER ATTRIBUTE',
      value: SourceFilterValue.TRIGGER_ATTR,
      disable: false
    }
  ]
})

const isDisabled = computed(() => {
  return (
    !selectedSourceFilter.value ||
    !selectedSourceAttributeFilter.value ||
    !sourceValue.value
  )
})

const updateSourceFilter = async () => {
  const filter = selectedSourceFilter.value
  const configurationSource: any =
    configurationMindMapper.currentConfiguration.item.configuration.source

  switch (filter.value) {
    case SourceFilterValue.STATIC:
      sourceAttribute.value = await dataSourceStore.getValue(
        configurationSource
      )
      break
    case SourceFilterValue.TRIGGER_ATTR:
      console.log('TRIGGER_ATTR')
      break
    default:
      break
  }
}

const save = () => {
  const filter = {
    id: uuidv4(),
    type: selectedSourceFilter.value.value,
    attribute: selectedSourceAttributeFilter.value,
    value: sourceValue.value
  }
  emit('saveFilter', filter)
}

const update = () => {
  const filter = {
    id: props.filter?.id,
    type: selectedSourceFilter.value.value,
    attribute: selectedSourceAttributeFilter.value,
    value: JSON.stringify(sourceValue.value)
  }
  emit('updateFilter', filter)
}

onMounted(async () => {
  if (props.filter) {
    selectedSourceFilter.value = find(sourceFilter.value, [
      'value',
      props.filter.type
    ])
    await updateSourceFilter()
    selectedSourceAttributeFilter.value = props.filter.attribute
    sourceValue.value = JSON.parse(props.filter.value)
  }
})
</script>
<template>
  <q-card-section>
    <q-select
      v-model="selectedSourceFilter"
      :options="sourceFilter"
      :option-value="(opt) => opt.value"
      :option-label="(opt) => opt.label"
      :option-disable="(opt) => opt.disable"
      @update:model-value="updateSourceFilter"
      label="Source Filters"
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
      v-if="sourceAttribute.length"
      v-model="selectedSourceAttributeFilter"
      :options="sourceAttribute"
      label="Source Attributes"
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
      v-if="sourceAttribute.length"
      v-model="sourceValue"
      class="q-py-xs"
      type="textarea"
      label="Source Value"
      outlined
      dense
    />
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
