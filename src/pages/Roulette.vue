<template>
  <DashboardLayout title="American Roulette">
    <div class="mx-auto max-w-[1400px] space-y-4 p-4 sm:p-6 lg:p-8">
      <BackButton label="Back to Casino" to="/casino-lobby" />

      <!-- Header bar: title, live badge, settings, fun/real toggle -->
      <div class="themed-surface flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3 shadow-sm" :style="{ borderColor: 'var(--border-color)' }">
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="grid h-8 w-8 place-items-center rounded-lg text-app-primary transition hover:bg-black/5"
            aria-label="Back"
            @click="$router.back()"
          >
            <AppIcon name="chevronRight" :size="16" class="rotate-180" />
          </button>
          <h2 class="text-sm font-bold text-app-primary sm:text-base">American Roulette</h2>
          <span class="inline-flex items-center gap-1.5 rounded-full bg-rose-600/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            <span class="h-1.5 w-1.5 rounded-full bg-white live-pulse" />
            Live
          </span>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1.5 text-app-secondary">
            <button type="button" class="grid h-8 w-8 place-items-center rounded-lg transition hover:bg-black/5 hover:text-app-primary" title="Settings">
              <RouletteIcon name="gear" :size="16" />
            </button>
            <button type="button" class="grid h-8 w-8 place-items-center rounded-lg transition hover:bg-black/5 hover:text-app-primary" title="Switch table">
              <RouletteIcon name="shuffle" :size="16" />
            </button>
            <button
              type="button"
              class="grid h-8 w-8 place-items-center rounded-lg transition hover:bg-black/5 hover:text-app-primary"
              :class="{ 'text-brand-gold-500': favorited }"
              title="Favorite"
              @click="favorited = !favorited"
            >
              <RouletteIcon name="star" :size="16" />
            </button>
            <button type="button" class="grid h-8 w-8 place-items-center rounded-lg transition hover:bg-black/5 hover:text-app-primary" title="Fullscreen">
              <RouletteIcon name="fullscreen" :size="16" />
            </button>
          </div>

          <div class="flex items-center gap-2 text-xs font-medium text-app-secondary">
            <span :class="{ 'text-app-primary': !realPlay }">Fun Play</span>
            <button
              type="button"
              role="switch"
              :aria-checked="realPlay"
              class="relative h-5 w-9 shrink-0 rounded-full transition-colors"
              :class="realPlay ? 'bg-brand-gold-500' : 'bg-black/20'"
              @click="realPlay = !realPlay"
            >
              <span
                class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform"
                :class="realPlay ? 'translate-x-4' : 'translate-x-0.5'"
              />
            </button>
            <span :class="{ 'text-app-primary': realPlay }">Real Play</span>
          </div>
        </div>
      </div>

      <!-- Game info + live table -->
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-[0.75fr_1.7fr]">
        <!-- Game info card -->
        <div class="glass-card flex w-full flex-shrink-0 flex-col gap-3 p-3">
          <div class="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
            <img :src="gameThumb" alt="American Roulette table" class="absolute inset-0 h-full w-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-blue-500/85" />
            <div class="absolute inset-x-0 bottom-0 space-y-0.5 p-3 text-white">
              <p class="font-serif text-lg font-semibold drop-shadow">American Roulette</p>
              <p class="text-[10px] tracking-wide text-white/80">PRAGMATIC PLAY</p>
            </div>
          </div>
          <p class="font-serif text-sm font-semibold text-app-primary">American Roulette</p>
          <div class="space-y-1.5 rounded-lg p-2.5 text-[11px]" :style="{ background: 'var(--bg-app)' }">
            <div class="flex items-center justify-between">
              <span class="text-app-secondary">Bets</span>
              <span class="font-medium text-app-primary">8,092,694</span>
            </div>
            <div class="h-px w-full" :style="{ background: 'var(--border-color)' }" />
            <div class="flex items-center justify-between">
              <span class="text-app-secondary">RTP</span>
              <span class="font-medium text-app-primary">96.50%</span>
            </div>
          </div>
        </div>

        <!-- Live table -->
        <div class="glass-card flex min-w-0 w-full flex-col gap-3 p-3 sm:p-4">
          <div class="relative aspect-[16/9] w-full overflow-hidden rounded-xl shadow-card">
            <img :src="tableLive" alt="Live American Roulette table" class="absolute inset-0 h-full w-full object-cover" />
            <div class="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
              <span class="h-1.5 w-1.5 rounded-full bg-rose-500 live-pulse" />
              Live Dealer
            </div>
            <div class="absolute right-3 top-3 flex gap-1.5">
              <span
                v-for="n in lastResults"
                :key="n.value + n.color"
                class="grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold text-white shadow"
                :class="n.color === 'red' ? 'bg-rose-600' : n.color === 'black' ? 'bg-neutral-800' : 'bg-emerald-600'"
              >
                {{ n.value }}
              </span>
            </div>
          </div>

          <RouletteBettingGrid :chip-on="lastPlaced" @place="onPlace" />

          <!-- Chip selector -->
          <div class="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-2.5" :style="{ borderColor: 'var(--border-color)' }">
            <div class="flex items-center gap-2">
              <button
                v-for="chip in chips"
                :key="chip.value"
                type="button"
                class="chip grid h-9 w-9 place-items-center rounded-full border-2 border-white/70 text-[10px] font-bold text-white shadow-md transition hover:-translate-y-1 active:translate-y-0 active:scale-95 sm:h-10 sm:w-10 sm:text-xs"
                :style="{ background: chip.color }"
                :class="{ 'ring-2 ring-offset-1 ring-brand-gold-400': selectedChip === chip.value }"
                @click="selectedChip = chip.value"
              >
                {{ chip.label }}
              </button>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" class="rounded-lg px-3 py-1.5 text-xs font-semibold text-app-secondary transition hover:bg-black/5" @click="clearBets">
                Clear
              </button>
              <button type="button" class="btn-glossy-blue px-4 py-1.5 text-xs font-semibold">
                Bet ${{ selectedChip }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Wins table -->
      <RouletteWinsTable />
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref } from 'vue'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import BackButton from '@/components/common/BackButton.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import RouletteIcon from '@/components/casino-screens/RouletteIcon.vue'
import RouletteBettingGrid from '@/components/casino-screens/RouletteBettingGrid.vue'
import RouletteWinsTable from '@/components/casino-screens/RouletteWinsTable.vue'
import tableLive from '@/assets/casino/roulette/table-live.png'
import gameThumb from '@/assets/casino/roulette/game-thumb.png'

const favorited = ref(false)
const realPlay = ref(false)
const selectedChip = ref(25)
const lastPlaced = ref('')

const chips = [
  { value: 1, label: '$1', color: '#e5e5e5' },
  { value: 5, label: '$5', color: '#b8244a' },
  { value: 25, label: '$25', color: '#1642c4' },
  { value: 100, label: '$100', color: '#0a1a4d' },
  { value: 500, label: '$500', color: '#e6a800' }
]

const lastResults = [
  { value: 17, color: 'black' },
  { value: 32, color: 'red' },
  { value: 0, color: 'green' }
]

function onPlace(key) {
  lastPlaced.value = key
  // Mock interaction only — no real gaming/wagering logic in this build.
  console.info('Placed bet (mock):', key, 'chip', selectedChip.value)
}

function clearBets() {
  lastPlaced.value = ''
}
</script>

<style scoped>
.live-pulse {
  animation: live-pulse 1.6s ease-in-out infinite;
}
@keyframes live-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.45;
    transform: scale(1.4);
  }
}

.chip {
  background-image: repeating-conic-gradient(rgba(255, 255, 255, 0.25) 0deg 10deg, transparent 10deg 20deg);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
</style>
