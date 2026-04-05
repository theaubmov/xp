<script lang="ts" setup>
import { useConfigurationMindMapper } from '@/stores/configuration-mind-mapper'
import { computed, onMounted, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { find, get } from 'lodash'

enum CustomEventTypeValue {
  TIMER = 'TIMER',
  CLICK = 'CLICK',
  DATE = 'DATE',
  FILTER = 'FILTER'
}

enum CustomActionTypeValue {
  OVERWRITE = 'OVERWRITE',
  OVERLAY = 'OVERLAY',
  UNDERLAY = 'UNDERLAY'
}
enum CustomRepeatTypeValue {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY'
}

interface CustomEventProps {
  event?: {
    id: string
    name: string
    type: string
    details: any
  }
}

const props = defineProps<CustomEventProps>()
const emit = defineEmits(['saveCustomEvent', 'updateCustomEvent'])
const configurationMindMapper = useConfigurationMindMapper()

const selectedEventType = ref(null as any)
const eventName = ref(null as any)
const eventDetail = ref(null as any)
const eventDetailDate = ref(null as any)
const eventDetailTime = ref(null as any)
const eventDetailRepeat = ref(null as any)
const selectedActionType = ref(null as any)
const actionExecutedFor = ref(null as any)
const actionExecutedEach = ref(null as any)

const eventTypeList = computed(() => {
  return [
    {
      label: 'TIMER',
      value: CustomEventTypeValue.TIMER,
      disable: false
    },
    {
      label: 'CLICK',
      value: CustomEventTypeValue.CLICK,
      disable: false
    },
    {
      label: 'FILTER',
      value: CustomEventTypeValue.FILTER,
      disable: false
    },
    {
      label: 'DATE',
      value: CustomEventTypeValue.DATE,
      disable: false
    }
  ]
})
const actionTypeList = computed(() => {
  return [
    {
      label: 'OVERWRITE',
      value: CustomActionTypeValue.OVERWRITE,
      disable: false
    },
    {
      label: 'OVERLAY',
      value: CustomActionTypeValue.OVERLAY,
      disable: false
    },
    {
      label: 'UNDERLAY',
      value: CustomActionTypeValue.UNDERLAY,
      disable: false
    }
  ]
})
const repeatTypeList = computed(() => {
  return [
    {
      label: 'DAILY',
      value: CustomRepeatTypeValue.DAILY,
      disable: false
    },
    {
      label: 'WEEKLY',
      value: CustomRepeatTypeValue.WEEKLY,
      disable: false
    },
    {
      label: 'MONTHLY',
      value: CustomRepeatTypeValue.MONTHLY,
      disable: false
    }
  ]
})
const CurrentEventValue = computed(() => {
  let details: any = {
    element_selected: ''
  }
  switch (selectedEventType.value) {
    case CustomEventTypeValue.CLICK:
      details = { ...details, element_selector: eventDetail.value }
      break
    case CustomEventTypeValue.TIMER:
      details = { ...details, timer_input: eventDetail.value }
      break
    case CustomEventTypeValue.DATE:
      details = {
        ...details,
        date: eventDetailDate.value,
        time: eventDetailTime.value,
        repeat: eventDetailRepeat.value
      }
      break
    default:
      break
  }

  return {
    id: 'id_' + configurationMindMapper.currentConfiguration.item.id + uuidv4(),
    name: eventName.value,
    type: selectedEventType.value?.value,
    details: details,
    action: {
      type: selectedActionType.value?.value,
      executed_for: actionExecutedFor.value,
      executed_each: actionExecutedEach.value
    }
  }
})

const isDisabled = computed(() => {
  return !eventName.value || !selectedEventType.value || !eventDetail.value
})

const save = () => {
  emit('saveCustomEvent', CurrentEventValue.value)
}

const update = () => {
  emit('updateCustomEvent', CurrentEventValue.value)
}

const resetRelatedInput = () => {
  eventDetail.value = null
  eventDetailDate.value = null
  eventDetailTime.value = null
  eventDetailRepeat.value = null
}

onMounted(async () => {
  eventName.value = props.event?.name
  selectedEventType.value = find(eventTypeList.value, [
    'value',
    props.event?.type
  ])
  eventDetail.value = get(props.event, 'details.element_selector', '')
    ? get(props.event, 'details.element_selector')
    : get(props.event, 'details.timer_input')
  selectedActionType.value = find(actionTypeList.value, [
    'value',
    get(props.event, 'details.action.type')
  ])
  actionExecutedFor.value = get(props.event, 'details.action.executed_for', '')
  actionExecutedEach.value = get(
    props.event,
    'details.action.executed_each',
    ''
  )
})
</script>
<template>
  <q-card-section>
    <q-input
      v-model="eventName"
      class="q-py-xs"
      label="Event Name"
      outlined
      dense
    />
    <q-select
      v-model="selectedEventType"
      :options="eventTypeList"
      :option-value="(opt) => opt.value"
      :option-label="(opt) => opt.label"
      :option-disable="(opt) => opt.disable"
      @update:model-value="resetRelatedInput()"
      label="Event Type"
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
      v-if="selectedEventType?.value === CustomEventTypeValue.CLICK"
      v-model="eventDetail"
      class="q-py-xs"
      label="Element Selector"
      placeholder="(#id | .className )"
      outlined
      dense
    />
    <q-input
      v-if="selectedEventType?.value === CustomEventTypeValue.TIMER"
      v-model="eventDetail"
      mask="fulltime"
      class="q-py-xs"
      label="Timer"
      placeholder="__:__:__"
      outlined
      dense
    />
    <template v-if="selectedEventType?.value === CustomEventTypeValue.DATE">
      <q-input
        v-model="eventDetailDate"
        mask="date"
        class="q-py-xs"
        label="Date"
        outlined
        dense
      />
      <q-input
        v-model="eventDetailTime"
        mask="fulltime"
        class="q-py-xs"
        label="Time"
        outlined
        dense
      />
      <q-select
        v-model="eventDetailRepeat"
        :options="repeatTypeList"
        :option-value="(opt) => opt.value"
        :option-label="(opt) => opt.label"
        :option-disable="(opt) => opt.disable"
        label="Repeat Each"
        class="q-py-xs"
        hide-dropdown-icon
        outlined
        dense
      >
        <template v-slot:append>
          <q-icon size="xs" name="fa-solid fa-angle-down" />
        </template>
      </q-select>
    </template>
    <q-separator class="q-my-sm"></q-separator>
    <q-select
      v-model="selectedActionType"
      :options="actionTypeList"
      :option-value="(opt) => opt.value"
      :option-label="(opt) => opt.label"
      :option-disable="(opt) => opt.disable"
      label="Action Type"
      class="q-py-xs"
      hide-dropdown-icon
      outlined
      dense
    >
      <template v-slot:append>
        <q-icon size="xs" name="fa-solid fa-angle-down" />
      </template>
    </q-select>
    <div class="q-py-xs row items-start">
      <div class="col-6">
        <q-input
          v-model="actionExecutedFor"
          label="Executed For"
          outlined
          dense
          style="width: 95%"
        >
          <template v-slot:append>
            <span style="font-size: 10px">min</span>
          </template>
        </q-input>
      </div>
      <div class="col-6">
        <q-input
          v-model="actionExecutedEach"
          label="Executed Each"
          outlined
          dense
          style="width: 95%; margin: 0 0 0 auto"
        >
          <template v-slot:append>
            <span style="font-size: 10px">min</span>
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-tab-panel justify-end">
      <q-btn
        v-if="!event"
        label="Add Custom Event"
        color="accent"
        :disable="isDisabled"
        @click="save"
      />
      <q-btn
        v-else
        label="Update Custom Event"
        color="accent"
        :disable="isDisabled"
        @click="update"
      />
    </div>
  </q-card-section>
</template>
