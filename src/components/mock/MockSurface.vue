<script setup lang="ts">
import type { MockSurfaceMode } from '@/helpers/mock-surface-url'
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    mode?: MockSurfaceMode
    identifier?: string
    title?: string
    subtitle?: string
  }>(),
  {
    mode: 'experience',
    identifier: '',
    title: '',
    subtitle: ''
  }
)

const viewport = ref<'phone' | 'tablet' | 'stage'>('tablet')
const scenario = ref<'default' | 'live' | 'qa'>('default')

const skins = {
  experience: {
    eyebrow: 'Runtime Preview',
    title: 'Audience-facing mock runtime',
    subtitle:
      'A local stand-in for the deployed player, focused on flows, messaging, and device feel.',
    accent: '#d97706',
    accentSoft: 'rgba(217,119,6,0.18)',
    ink: '#1c1917',
    backdrop:
      'linear-gradient(135deg, #f7efe4 0%, #f1dbc4 46%, #f4efe8 100%)',
    panel: 'rgba(252, 248, 243, 0.82)'
  },
  designer: {
    eyebrow: 'Design Studio',
    title: 'Composable mock designer',
    subtitle:
      'A local studio surface that stands in for the remote designer while preserving creation cues.',
    accent: '#0f766e',
    accentSoft: 'rgba(15,118,110,0.18)',
    ink: '#052e2b',
    backdrop:
      'linear-gradient(135deg, #eef8f4 0%, #d5efe7 44%, #f3fbf7 100%)',
    panel: 'rgba(246, 252, 249, 0.86)'
  },
  dashboard: {
    eyebrow: 'Operations Board',
    title: 'Local dashboard preview',
    subtitle:
      'A local stand-in for production dashboard delivery with KPI, trend, and telemetry panels.',
    accent: '#7c3aed',
    accentSoft: 'rgba(124,58,237,0.18)',
    ink: '#22123c',
    backdrop:
      'linear-gradient(135deg, #f2ebff 0%, #e4d4ff 48%, #f8f5ff 100%)',
    panel: 'rgba(250, 246, 255, 0.86)'
  }
} as const

const skin = computed(() => skins[props.mode])

const surfaceTitle = computed(() => props.title || skin.value.title)
const surfaceSubtitle = computed(() => props.subtitle || skin.value.subtitle)
const surfaceId = computed(() => props.identifier || 'local-mock')

const stageStats = computed(() => {
  if (props.mode === 'designer') {
    return [
      ['Layers', '12'],
      ['States', '4'],
      ['Bindings', '7']
    ]
  }

  if (props.mode === 'dashboard') {
    return [
      ['Widgets', '8'],
      ['Alerts', '3'],
      ['Refresh', '15s']
    ]
  }

  return [
    ['Screens', '3'],
    ['Triggers', '5'],
    ['Channels', '4']
  ]
})

const railSections = computed(() => {
  if (props.mode === 'designer') {
    return [
      {
        label: 'Canvas',
        items: ['Hero module', 'Live ticker', 'Context dock']
      },
      {
        label: 'Assets',
        items: ['Mock thumbnails', 'Media shelf', 'Template tokens']
      },
      {
        label: 'Bindings',
        items: ['Regional turnout', 'Weather severity', 'Donor velocity']
      }
    ]
  }

  if (props.mode === 'dashboard') {
    return [
      {
        label: 'Signals',
        items: ['Reach pulse', 'Completion rate', 'Viewer drop-offs']
      },
      {
        label: 'Segments',
        items: ['Broadcast', 'Mobile', 'Signage']
      },
      {
        label: 'Alerts',
        items: ['Threshold drift', 'Creative mismatch', 'Stale feed']
      }
    ]
  }

  return [
    {
      label: 'Scenes',
      items: ['Opening module', 'Context branch', 'Conversion rail']
    },
    {
      label: 'Audience',
      items: ['First-time viewers', 'Subscribers', 'Responders']
    },
    {
      label: 'Controls',
      items: ['Route change', 'Prompt fire', 'Asset swap']
    }
  ]
})

const capabilityList = computed(() => {
  if (props.mode === 'designer') {
    return [
      'Canvas composition and layout density',
      'Inspector panels and component states',
      'Data binding, assets, and template cues'
    ]
  }

  if (props.mode === 'dashboard') {
    return [
      'Dashboard selection and KPI framing',
      'Trend cards, alerts, and telemetry grouping',
      'High-level operational validation'
    ]
  }

  return [
    'Page preview and runtime staging',
    'CTA hierarchy and content sequencing',
    'Device and scenario switching'
  ]
})

const scenarioLabels = {
  default: 'Default',
  live: 'Live Ops',
  qa: 'QA Pass'
}

const viewportLabels = {
  phone: 'Phone',
  tablet: 'Tablet',
  stage: 'Stage'
}

const viewportOptions = [
  { key: 'phone', label: viewportLabels.phone },
  { key: 'tablet', label: viewportLabels.tablet },
  { key: 'stage', label: viewportLabels.stage }
] as const

const scenarioOptions = [
  { key: 'default', label: scenarioLabels.default },
  { key: 'live', label: scenarioLabels.live },
  { key: 'qa', label: scenarioLabels.qa }
] as const

function setViewport(value: 'phone' | 'tablet' | 'stage') {
  viewport.value = value
}

function setScenario(value: 'default' | 'live' | 'qa') {
  scenario.value = value
}
</script>

<template>
  <section
    class="mock-surface"
    :style="{
      '--mock-accent': skin.accent,
      '--mock-accent-soft': skin.accentSoft,
      '--mock-ink': skin.ink,
      '--mock-backdrop': skin.backdrop,
      '--mock-panel': skin.panel
    }"
  >
    <div class="mock-surface__grain"></div>

    <header class="mock-surface__header">
      <div>
        <p class="eyebrow">{{ skin.eyebrow }}</p>
        <h1>{{ surfaceTitle }}</h1>
        <p class="subhead">{{ surfaceSubtitle }}</p>
      </div>
      <div class="meta-block">
        <span class="meta-pill">ID {{ surfaceId }}</span>
        <span class="meta-pill">Local mock active</span>
      </div>
    </header>

    <div class="mock-surface__shell">
      <aside class="rail">
        <div v-for="section in railSections" :key="section.label" class="rail-card">
          <p class="rail-label">{{ section.label }}</p>
          <ul>
            <li v-for="item in section.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </aside>

      <main class="stage">
        <div class="stage-toolbar">
          <div class="stage-stats">
            <div v-for="([label, value]) in stageStats" :key="label" class="stat-chip">
              <span>{{ label }}</span>
              <strong>{{ value }}</strong>
            </div>
          </div>
          <div class="toolbar-group">
            <button
              v-for="option in viewportOptions"
              :key="option.key"
              class="toolbar-pill"
              :class="{ active: viewport === option.key }"
              @click="setViewport(option.key)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <div
          class="canvas"
          :class="[`canvas--${props.mode}`, `canvas--${viewport}`]"
        >
          <template v-if="props.mode === 'designer'">
            <div class="designer-board">
              <div class="designer-board__frame">
                <div class="designer-board__ruler"></div>
                <div class="designer-board__hero">
                  <span>Hero</span>
                  <h2>Regional signal panel</h2>
                  <p>Layer, theme, and data binding represented entirely by the local mock.</p>
                </div>
                <div class="designer-board__row">
                  <article class="designer-card selected">
                    <small>Selected Layer</small>
                    <strong>Context Dock</strong>
                    <span>Bound to weather severity query</span>
                  </article>
                  <article class="designer-card">
                    <small>Reusable Module</small>
                    <strong>Audience Pulse Rail</strong>
                    <span>Template-driven card stack</span>
                  </article>
                </div>
              </div>
              <div class="designer-board__inspector">
                <p>Properties</p>
                <div class="inspector-row"><span>Layout</span><strong>Grid-break</strong></div>
                <div class="inspector-row"><span>Accent</span><strong>Adaptive</strong></div>
                <div class="inspector-row"><span>Variant</span><strong>Broadcast Wide</strong></div>
              </div>
            </div>
          </template>

          <template v-else-if="props.mode === 'dashboard'">
            <div class="dashboard-board">
              <div class="dashboard-kpis">
                <article class="kpi-card">
                  <span>Activation</span>
                  <strong>91%</strong>
                  <small>Up 6.4%</small>
                </article>
                <article class="kpi-card">
                  <span>Completion</span>
                  <strong>63%</strong>
                  <small>Steady vs yesterday</small>
                </article>
                <article class="kpi-card">
                  <span>Alert Debt</span>
                  <strong>03</strong>
                  <small>Requires review</small>
                </article>
              </div>
              <div class="trend-panel">
                <div class="trend-panel__header">
                  <span>Trend Simulation</span>
                  <strong>Audience Pulse</strong>
                </div>
                <div class="bars">
                  <span style="height: 36%"></span>
                  <span style="height: 54%"></span>
                  <span style="height: 48%"></span>
                  <span style="height: 70%"></span>
                  <span style="height: 62%"></span>
                  <span style="height: 84%"></span>
                  <span style="height: 76%"></span>
                </div>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="runtime-board">
              <div class="runtime-board__screen">
                <div class="runtime-tag">Experience runtime</div>
                <h2>Live prompt staging</h2>
                <p>
                  CTA hierarchy, scene order, and message timing are represented here without relying on the remote player.
                </p>
                <div class="runtime-actions">
                  <button>Primary prompt</button>
                  <button class="secondary">Context branch</button>
                </div>
              </div>
              <div class="runtime-board__queue">
                <article>
                  <small>Scene 01</small>
                  <strong>Hero block</strong>
                </article>
                <article>
                  <small>Scene 02</small>
                  <strong>Data callout</strong>
                </article>
                <article>
                  <small>Scene 03</small>
                  <strong>Response module</strong>
                </article>
              </div>
            </div>
          </template>
        </div>
      </main>

      <aside class="inspector">
        <div class="inspector-card">
          <p class="rail-label">Scenario</p>
          <div class="scenario-grid">
            <button
              v-for="option in scenarioOptions"
              :key="option.key"
              class="scenario-pill"
              :class="{ active: scenario === option.key }"
              @click="setScenario(option.key)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <div class="inspector-card">
          <p class="rail-label">Coverage</p>
          <ul class="coverage-list">
            <li v-for="capability in capabilityList" :key="capability">
              {{ capability }}
            </li>
          </ul>
        </div>

        <div class="inspector-card">
          <p class="rail-label">Notes</p>
          <div class="note-block">
            <strong>Purpose</strong>
            <span>This surface is intentionally local and deterministic.</span>
          </div>
          <div class="note-block">
            <strong>Use</strong>
            <span>Validate navigation, layout, and creation flow without external services.</span>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped lang="scss">
.mock-surface {
  position: relative;
  min-height: 100%;
  padding: 28px;
  overflow: hidden;
  background: var(--mock-backdrop);
  color: var(--mock-ink);
  font-family: 'Trebuchet MS', 'Segoe UI', sans-serif;

  &__grain {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.12;
    background-image:
      radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.24) 1px, transparent 0),
      linear-gradient(180deg, rgba(255, 255, 255, 0.1), transparent 22%);
    background-size: 12px 12px, 100% 100%;
    mix-blend-mode: multiply;
  }

  &__header,
  &__shell {
    position: relative;
    z-index: 1;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    align-items: flex-start;
    margin-bottom: 26px;
  }

  &__shell {
    display: grid;
    grid-template-columns: 240px minmax(0, 1fr) 280px;
    gap: 18px;
    align-items: stretch;
    min-height: calc(100vh - 170px);
  }

  h1 {
    margin: 8px 0 12px;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(2rem, 4vw, 3.4rem);
    line-height: 0.92;
  }
}

.eyebrow,
.rail-label {
  margin: 0;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.72;
}

.subhead {
  max-width: 760px;
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  opacity: 0.82;
}

.meta-block {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}

.meta-pill,
.toolbar-pill,
.scenario-pill,
.stat-chip,
.rail-card,
.inspector-card,
.canvas,
.stage-toolbar {
  backdrop-filter: blur(14px);
}

.meta-pill,
.toolbar-pill,
.scenario-pill {
  border: 1px solid rgba(17, 24, 39, 0.1);
  border-radius: 999px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.62);
  color: inherit;
}

.rail,
.inspector {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.rail-card,
.inspector-card,
.stage-toolbar,
.canvas {
  border: 1px solid rgba(17, 24, 39, 0.08);
  border-radius: 26px;
  background: var(--mock-panel);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
}

.rail-card,
.inspector-card {
  padding: 18px;
}

.rail-card ul,
.coverage-list {
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
}

.rail-card li,
.coverage-list li {
  position: relative;
  padding-left: 14px;
  margin-bottom: 10px;
  line-height: 1.45;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.52rem;
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: var(--mock-accent);
  }
}

.stage {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.stage-toolbar {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: center;
  padding: 16px 18px;
}

.stage-stats,
.toolbar-group,
.scenario-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.stat-chip {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.6);
  font-size: 0.88rem;

  strong {
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 1rem;
  }
}

.toolbar-pill,
.scenario-pill {
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;

  &.active {
    background: var(--mock-accent);
    border-color: var(--mock-accent);
    color: #fff;
    transform: translateY(-1px);
  }
}

.canvas {
  flex: 1;
  min-height: 540px;
  padding: 22px;
  position: relative;
  overflow: hidden;
}

.canvas--phone {
  min-height: 460px;
}

.canvas--stage {
  min-height: 620px;
}

.designer-board,
.dashboard-board,
.runtime-board {
  height: 100%;
}

.designer-board {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 18px;
}

.designer-board__frame,
.designer-board__inspector,
.trend-panel,
.runtime-board__screen,
.runtime-board__queue article,
.kpi-card {
  border-radius: 24px;
  border: 1px solid rgba(17, 24, 39, 0.08);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.72));
}

.designer-board__frame {
  padding: 18px;
}

.designer-board__ruler {
  height: 36px;
  margin-bottom: 18px;
  border-radius: 18px;
  background:
    linear-gradient(90deg, var(--mock-accent-soft), transparent 60%),
    repeating-linear-gradient(
      90deg,
      rgba(15, 23, 42, 0.1) 0 2px,
      transparent 2px 28px
    );
}

.designer-board__hero {
  padding: 28px;
  border-radius: 24px;
  background: linear-gradient(135deg, var(--mock-accent-soft), rgba(255, 255, 255, 0.78));
  margin-bottom: 18px;

  span {
    display: inline-block;
    padding: 6px 10px;
    border-radius: 999px;
    margin-bottom: 10px;
    background: rgba(255, 255, 255, 0.82);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  h2 {
    margin: 0 0 10px;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(1.8rem, 2.8vw, 2.6rem);
  }

  p {
    max-width: 32rem;
    margin: 0;
    line-height: 1.5;
  }
}

.designer-board__row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.designer-card {
  padding: 18px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(17, 24, 39, 0.08);

  small,
  span {
    display: block;
    opacity: 0.68;
  }

  strong {
    display: block;
    margin: 10px 0 8px;
    font-size: 1.1rem;
  }

  &.selected {
    border-color: var(--mock-accent);
    box-shadow: inset 0 0 0 1px var(--mock-accent);
  }
}

.designer-board__inspector {
  padding: 22px;

  p {
    margin: 0 0 18px;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 1.4rem;
  }
}

.inspector-row,
.note-block {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 12px 0;
  border-top: 1px solid rgba(17, 24, 39, 0.08);
  line-height: 1.4;
}

.inspector-row:first-of-type {
  border-top: 0;
}

.dashboard-board {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 18px;
}

.dashboard-kpis {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.kpi-card {
  padding: 22px;

  span,
  small {
    display: block;
    opacity: 0.68;
  }

  strong {
    display: block;
    margin: 8px 0 10px;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(2rem, 3vw, 2.8rem);
  }
}

.trend-panel {
  padding: 22px;
  display: flex;
  flex-direction: column;
}

.trend-panel__header {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 18px;
  font-size: 0.95rem;

  strong {
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 1.2rem;
  }
}

.bars {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: end;
  gap: 16px;
  height: 100%;
  min-height: 260px;

  span {
    display: block;
    border-radius: 18px 18px 10px 10px;
    background: linear-gradient(180deg, var(--mock-accent), rgba(255, 255, 255, 0.88));
    box-shadow: inset 0 -10px 24px rgba(255, 255, 255, 0.24);
  }
}

.runtime-board {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 18px;
}

.runtime-board__screen {
  padding: 28px;
  background:
    linear-gradient(140deg, rgba(255, 255, 255, 0.86), var(--mock-accent-soft)),
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.82), transparent 36%);

  h2 {
    margin: 16px 0 12px;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(2rem, 3vw, 2.8rem);
  }

  p {
    max-width: 34rem;
    line-height: 1.56;
  }
}

.runtime-tag {
  display: inline-flex;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.84);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.75rem;
  font-weight: 700;
}

.runtime-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;

  button {
    border: 0;
    border-radius: 999px;
    padding: 12px 18px;
    cursor: pointer;
    background: var(--mock-accent);
    color: #fff;
    font-weight: 700;
  }

  .secondary {
    background: rgba(255, 255, 255, 0.82);
    color: var(--mock-ink);
  }
}

.runtime-board__queue {
  display: grid;
  gap: 14px;

  article {
    padding: 18px;
  }

  small,
  strong {
    display: block;
  }

  strong {
    margin-top: 8px;
    font-size: 1.1rem;
  }
}

.note-block {
  align-items: flex-start;

  span {
    text-align: right;
    opacity: 0.74;
  }
}

@media (max-width: 1180px) {
  .mock-surface {
    padding: 18px;

    &__shell {
      grid-template-columns: 1fr;
    }
  }

  .designer-board,
  .runtime-board {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .mock-surface__header,
  .stage-toolbar,
  .dashboard-kpis,
  .designer-board__row {
    grid-template-columns: 1fr;
    display: grid;
  }

  .stage-toolbar {
    justify-content: flex-start;
  }

  .canvas {
    min-height: 420px;
  }
}
</style>
