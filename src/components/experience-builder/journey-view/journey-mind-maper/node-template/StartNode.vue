<script lang="ts" setup>
import type { NodeProps } from '@braks/vue-flow'
import { Handle, Position } from '@braks/vue-flow'
import { plateforms, type plateformItem } from '../supported-plateforme'

export interface CustomNodeEvents {
  addPlateformEvent: (input: plateformItem) => void
}
interface CustomNodeProps extends NodeProps<any, CustomNodeEvents> {
  id: string
  label: string
  sourcePosition: Position
  events: CustomNodeEvents
}
const nodeProps = defineProps<CustomNodeProps>()
</script>

<template>
  <div>
    <q-card class="start-node shadow-0">
      <q-card-section class="q-pa-sm">
        {{ nodeProps.label }}
      </q-card-section>
      <q-btn
        round
        size="xs"
        color="primary"
        icon="fa-solid fa-plus"
        class="absolute"
      >
        <q-menu class="shadow-1">
          <q-list style="min-width: 100px">
            <q-item
              v-for="plateform in plateforms"
              :key="plateform.title"
              clickable
              @click="nodeProps.events.addPlateformEvent(plateform)"
              v-close-popup
            >
              <q-item-section>{{ plateform.title }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-card>
    <Handle id="right" type="source" :position="Position.Right" />
    <Handle id="left" type="source" :position="Position.Left" />
    <Handle id="bottom" type="source" :position="Position.Bottom" />
    <Handle id="top" type="source" :position="Position.Top" />
  </div>
</template>
<style lang="scss" scoped>
.start-node {
  border-radius: 3px;
  width: 150px;
  font-size: 12px;
  color: var(--vf-node-text);
  text-align: center;
  border-width: 1px;
  border-style: solid;
}
.start-node .q-btn {
  bottom: -12px;
  right: -10px;
}
</style>
