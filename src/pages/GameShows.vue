<template>
  <DashboardLayout title="Game Shows">
    <div class="mx-auto max-w-[1400px] space-y-4 p-4 sm:p-6 lg:p-8">
      <BackButton label="Back to Game Shows" to="/dashboard" />

      <!-- Header -->
      <div class="themed-surface flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3" :style="{ borderColor: 'var(--border-color)' }">
        <div class="flex items-center gap-2.5">
          <button
            type="button"
            class="flex h-8 w-8 items-center justify-center rounded-lg text-app-secondary transition hover:-translate-x-0.5 hover:bg-black/5"
            aria-label="Go back"
            @click="$router.back()"
          >
            <AppIcon name="chevronRight" :size="16" class="rotate-180" />
          </button>
          <div>
            <h2 class="text-base font-bold text-app-primary sm:text-lg">Ice Fishing</h2>
            <p class="text-[11px] font-medium uppercase tracking-wide text-app-secondary">Live Game Show &middot; Pragmatic Play</p>
          </div>
          <span class="ml-1 inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-500">
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            Live
          </span>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2 rounded-lg px-2 py-1" :style="{ backgroundColor: 'var(--bg-app)' }">
            <span class="text-xs font-medium text-app-secondary">Fun Play</span>
            <button
              type="button"
              class="relative h-5 w-9 shrink-0 rounded-full transition-colors"
              :style="{ backgroundColor: realPlay ? 'var(--accent-gold)' : 'var(--border-color)' }"
              aria-label="Toggle real play"
              @click="realPlay = !realPlay"
            >
              <span
                class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200"
                :class="realPlay ? 'translate-x-4' : 'translate-x-0.5'"
              />
            </button>
            <span class="text-xs font-medium text-app-secondary">Real Play</span>
          </div>

          <button v-for="tool in headerTools" :key="tool.name" type="button" class="flex h-8 w-8 items-center justify-center rounded-lg text-app-secondary transition hover:scale-105 hover:bg-black/5 active:scale-95" :aria-label="tool.label" :title="tool.label">
            <GameShowsIcon :name="tool.name" :size="16" />
          </button>
        </div>
      </div>

      <!-- Game info + live feed -->
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-[220px_1fr]">
        <!-- Left game info card -->
        <div class="themed-surface flex flex-col gap-3 rounded-xl border p-3" :style="{ borderColor: 'var(--border-color)' }">
          <div class="relative flex aspect-[3/4] w-full flex-col items-center justify-end overflow-hidden rounded-lg">
            <img :src="cardImage" alt="Ice Fishing game card" class="absolute inset-0 h-full w-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-brand-blue-950/85 via-brand-blue-900/10 to-transparent" />
            <div class="relative z-10 mb-3 px-2 text-center text-white">
              <p class="font-serif text-xl font-semibold drop-shadow">Ice Fishing</p>
              <p class="text-[10px] font-medium uppercase tracking-wide text-white/80">Pragmatic Play</p>
            </div>
          </div>
          <p class="font-serif text-sm font-semibold text-app-primary">Ice Fishing</p>
          <div class="flex flex-col gap-1.5 rounded-lg p-2 text-xs" :style="{ backgroundColor: 'var(--bg-app)' }">
            <div class="flex items-center justify-between">
              <span class="text-app-secondary">Bets</span>
              <span class="font-semibold text-app-primary">{{ betsCount }}</span>
            </div>
            <div class="h-px w-full" :style="{ backgroundColor: 'var(--border-color)' }" />
            <div class="flex items-center justify-between">
              <span class="text-app-secondary">RTP</span>
              <span class="font-semibold text-app-primary">96.50%</span>
            </div>
          </div>
        </div>

        <!-- Live feed -->
        <div class="relative overflow-hidden rounded-xl" :style="{ backgroundColor: 'var(--bg-nav)' }">
          <img :src="liveFeedImage" alt="Live dealer feed" class="h-full max-h-[280px] w-full object-cover opacity-90" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          <div class="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/40 py-1 pl-1 pr-3 backdrop-blur-sm">
            <img :src="avatarImage" alt="Host" class="h-7 w-7 rounded-full border-2 object-cover" :style="{ borderColor: 'var(--accent-gold)' }" />
            <div class="leading-tight">
              <p class="text-xs font-semibold text-white">Host Amelia</p>
              <p class="text-[10px] text-white/70">Studio 3</p>
            </div>
          </div>

          <div class="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-white backdrop-blur-sm">
            <GameShowsIcon name="history" :size="14" />
            <span class="text-xs font-semibold">Round #{{ roundNumber }}</span>
          </div>
        </div>
      </div>

      <!-- Wheel + betting panel -->
      <div class="themed-surface flex flex-col items-center gap-5 rounded-xl border p-4 sm:p-6" :style="{ borderColor: 'var(--border-color)' }">
        <PrizeWheel :segments="wheelSegments" :spinning="spinning" :target-rotation="targetRotation" :size="260" class="my-2" />

        <transition name="fade-slide">
          <div v-if="lastResult" class="rounded-lg bg-brand-gold-500/15 px-4 py-1.5 text-sm font-bold text-brand-gold-600">
            Landed on {{ lastResult }} &mdash; nice one!
          </div>
        </transition>

        <!-- Chip selector -->
        <div class="flex flex-wrap items-center justify-center gap-2">
          <button
            v-for="chip in chips"
            :key="chip"
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-full border-2 text-[11px] font-bold shadow-sm transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-90"
            :class="betAmount === chip ? 'text-white' : 'text-app-primary'"
            :style="{
              borderColor: 'var(--accent-gold)',
              backgroundColor: betAmount === chip ? 'var(--accent-gold)' : 'var(--bg-app)'
            }"
            @click="betAmount = chip"
          >
            ${{ chip }}
          </button>
        </div>

        <!-- Bet + spin controls -->
        <div class="flex w-full max-w-md flex-wrap items-center justify-center gap-3">
          <div class="flex flex-1 items-center justify-between gap-3 rounded-lg px-3 py-2" :style="{ backgroundColor: 'var(--bg-app)' }">
            <span class="text-xs font-medium text-app-secondary">Bet Amount</span>
            <span class="text-sm font-bold text-app-primary">${{ betAmount.toLocaleString() }}</span>
          </div>
          <button
            type="button"
            class="rounded-lg bg-brand-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-150 hover:bg-brand-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="spinning"
            @click="spin"
          >
            {{ spinning ? 'Spinning…' : 'Spin' }}
          </button>
        </div>
      </div>

      <!-- Wins table -->
      <WinsTable :big-wins="bigWins" :lucky-wins="luckyWins" />
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref } from 'vue'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import BackButton from '@/components/common/BackButton.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import GameShowsIcon from '@/components/casino-screens/GameShowsIcon.vue'
import PrizeWheel from '@/components/casino-screens/PrizeWheel.vue'
import WinsTable from '@/components/casino-screens/WinsTable.vue'
import cardImage from '@/assets/casino/game-shows/card-ice-fishing.png'
import liveFeedImage from '@/assets/casino/game-shows/live-feed.png'
import avatarImage from '@/assets/casino/game-shows/avatar.png'

const realPlay = ref(false)
const betsCount = ref('8,092,694')
const roundNumber = ref(4821)

const headerTools = [
  { name: 'settings', label: 'Settings' },
  { name: 'refresh', label: 'Round history' },
  { name: 'star', label: 'Add to favorites' }
]

// Wheel — alternating brand colors, weighted toward lower multipliers like a
// real money wheel, with one rare high-value gold segment.
const wheelSegments = [
  { label: '1x', color: '#1642c4', text: '#ffffff' },
  { label: '2x', color: '#ffd24d', text: '#0a1a4d' },
  { label: '1x', color: '#245bea', text: '#ffffff' },
  { label: '5x', color: '#ffc107', text: '#0a1a4d' },
  { label: '1x', color: '#1642c4', text: '#ffffff' },
  { label: '2x', color: '#ffd24d', text: '#0a1a4d' },
  { label: '1x', color: '#245bea', text: '#ffffff' },
  { label: '10x', color: '#e6a800', text: '#0a1a4d' },
  { label: '1x', color: '#1642c4', text: '#ffffff' },
  { label: '2x', color: '#ffd24d', text: '#0a1a4d' },
  { label: '1x', color: '#245bea', text: '#ffffff' },
  { label: '20x', color: '#b88400', text: '#ffffff' }
]

const chips = [10, 50, 100, 500]
const betAmount = ref(50)

const spinning = ref(false)
const targetRotation = ref(0)
const lastResult = ref('')
let currentRotation = 0

function spin() {
  if (spinning.value) return
  spinning.value = true
  lastResult.value = ''

  const segCount = wheelSegments.length
  const segAngle = 360 / segCount
  const winningIndex = Math.floor(Math.random() * segCount)
  // Spin several full turns then settle so the winning segment sits under
  // the top pointer.
  const extraTurns = 6 * 360
  const settleAngle = 360 - winningIndex * segAngle
  currentRotation += extraTurns + settleAngle
  targetRotation.value = currentRotation

  window.setTimeout(() => {
    spinning.value = false
    lastResult.value = wheelSegments[winningIndex].label
  }, 3200)
}

// Mock leaderboard data
const avatarColors = ['#245bea', '#ffc107', '#7a5af8', '#22c55e', '#ef4444', '#0ea5e9']
function makeRows(seedMultiplier) {
  const names = ['Diamond', 'Nova', 'Kestrel', 'Orion', 'Blaze', 'Vega']
  return names.map((user, i) => ({
    id: `${seedMultiplier}-${i}`,
    user,
    avatarColor: avatarColors[i % avatarColors.length],
    bet: `$${(20000 * (i + 1)).toLocaleString()}`,
    multiplier: `${(seedMultiplier + i * 1.7).toFixed(2)}x`,
    payout: `$${(164224 - i * 12000).toLocaleString()}.00`,
    date: `Nov ${10 - i}, 4:26 AM`
  }))
}

const bigWins = makeRows(8.21)
const luckyWins = makeRows(2.15)
</script>
