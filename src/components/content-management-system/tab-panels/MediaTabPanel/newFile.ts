import { ref } from 'vue'
import ImageTabPanelVue from './tabs/ImageTabPanel.vue.js'

export default await (async () => {
  const tab = ref('images')
  const __VLS_Component = (await import('vue')).defineComponent({
    setup() {
      ;() => {
        // @ts-ignore
        ;[]
        // @ts-ignore
        ;[tab, ImageTabPanelVue]
      }
      return {}
    }
  })
  const __VLS_slots = (await import('./MediaTabPanel.vue.__VLS_template.jsx'))
    .default
  return {} as typeof __VLS_Component &
    (new () => { $slots: typeof __VLS_slots })
})()
