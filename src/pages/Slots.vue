<template>
  <DashboardLayout title="Slots">
    <div class="mx-auto max-w-[1600px] space-y-4 p-4 sm:p-6 lg:p-8">
      <BackButton label="Back to Lobby" to="/casino-lobby" />

      <!-- Game Header -->
      <div class="themed-surface flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3 sm:p-4" :style="{ borderColor: 'var(--border-color)' }">
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="flex h-8 w-8 items-center justify-center rounded-lg text-app-secondary transition hover:bg-black/5 hover:text-app-primary"
            aria-label="Back"
            @click="$router.back()"
          >
            <AppIcon name="chevronRight" :size="16" class="rotate-180" />
          </button>
          <div>
            <h2 class="text-sm font-bold text-app-primary sm:text-base">{{ game.title }}</h2>
            <p class="text-[11px] text-app-secondary">{{ game.provider }}</p>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex items-center gap-3 text-app-secondary">
            <button type="button" class="transition hover:text-brand-gold-400" aria-label="Settings" @click="showSettings = !showSettings">
              <SlotsIcon name="gear" :size="18" />
            </button>
            <button
              type="button"
              class="transition hover:text-brand-gold-400"
              :class="{ 'animate-spin-slow text-brand-gold-400': isSpinning }"
              aria-label="Refresh"
              @click="quickSpin"
            >
              <SlotsIcon name="refresh" :size="18" />
            </button>
            <button type="button" class="transition hover:text-brand-gold-400" :class="{ 'text-brand-gold-400': isFavorite }" aria-label="Favorite" @click="isFavorite = !isFavorite">
              <SlotsIcon name="star" :size="18" />
            </button>
          </div>

          <div class="flex items-center gap-2 text-[11px] font-medium text-app-secondary">
            <span :class="{ 'text-app-primary': !funPlay }">Fun Play</span>
            <button
              type="button"
              class="relative h-5 w-9 rounded-full transition"
              :class="funPlay ? 'bg-brand-gold-500' : 'bg-black/10 dark:bg-white/10'"
              role="switch"
              :aria-checked="funPlay"
              aria-label="Toggle play mode"
              @click="funPlay = !funPlay"
            >
              <span
                class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all"
                :class="funPlay ? 'left-4' : 'left-0.5'"
              />
            </button>
            <span :class="{ 'text-app-primary': funPlay }">Real Play</span>
          </div>
        </div>
      </div>

      <!-- Game Details + Reel -->
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-[0.85fr_0.85fr_1.3fr]">
        <!-- Game Info Panel -->
        <div class="glass-card flex w-full flex-col gap-3 p-3">
          <div class="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
            <img :src="sweetRushCard" :alt="game.title" class="absolute inset-0 h-full w-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div class="absolute inset-x-0 bottom-0 p-3 text-center text-white">
              <p class="text-base font-bold [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">{{ game.title }}</p>
              <p class="mt-0.5 text-[10px] uppercase tracking-wide text-white/80">{{ game.provider }}</p>
            </div>
          </div>

          <p class="text-sm font-bold text-app-primary">{{ game.title }}</p>

          <div class="space-y-1.5 rounded-lg bg-black/5 p-2 text-xs dark:bg-white/5">
            <div class="flex items-center justify-between">
              <span class="text-app-secondary">Bets</span>
              <span class="font-medium text-app-primary">{{ game.bets }}</span>
            </div>
            <div class="h-px w-full" :style="{ backgroundColor: 'var(--border-color)' }" />
            <div class="flex items-center justify-between">
              <span class="text-app-secondary">RTP</span>
              <span class="font-medium text-app-primary">{{ game.rtp }}</span>
            </div>
          </div>
        </div>

        <!-- Betting controls -->
        <div class="glass-card flex w-full flex-col justify-center gap-2.5 p-3.5">
          <div class="flex items-center justify-between text-[11px] text-app-secondary">
            <span>Balance</span>
            <span class="font-semibold text-app-primary">${{ balance.toFixed(2) }}</span>
          </div>

          <div>
            <p class="mb-1 text-[11px] text-app-secondary">Bet Amount</p>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                class="flex h-7 w-7 shrink-0 items-center justify-center rounded-md themed-surface border text-app-primary transition hover:bg-black/5 disabled:opacity-40"
                :style="{ borderColor: 'var(--border-color)' }"
                :disabled="betAmount <= betStep || isSpinning"
                @click="betAmount = Math.max(betStep, +(betAmount - betStep).toFixed(2))"
              >
                <SlotsIcon name="minus" :size="12" />
              </button>
              <div class="flex h-7 flex-1 items-center justify-center rounded-md themed-surface border text-xs font-bold text-app-primary" :style="{ borderColor: 'var(--border-color)' }">
                ${{ betAmount.toFixed(2) }}
              </div>
              <button
                type="button"
                class="flex h-7 w-7 shrink-0 items-center justify-center rounded-md themed-surface border text-app-primary transition hover:bg-black/5 disabled:opacity-40"
                :style="{ borderColor: 'var(--border-color)' }"
                :disabled="isSpinning"
                @click="betAmount = +(betAmount + betStep).toFixed(2)"
              >
                <SlotsIcon name="plus" :size="12" />
              </button>
            </div>
          </div>

          <div class="flex items-center gap-1.5 pt-1">
            <button
              type="button"
              class="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg text-xs font-semibold transition"
              :class="autoplay ? 'bg-brand-gold-500 text-black' : 'themed-surface border text-app-primary hover:bg-black/5'"
              :style="!autoplay ? { borderColor: 'var(--border-color)' } : {}"
              @click="autoplay = !autoplay"
            >
              <SlotsIcon name="autoplay" :size="13" />
              Auto
            </button>
            <button
              type="button"
              class="btn-glossy relative flex h-9 flex-[1.4] items-center justify-center gap-1.5 text-xs font-bold"
              :disabled="isSpinning || betAmount > balance"
              @click="spin"
            >
              <SlotsIcon name="spin" :size="14" :class="{ 'animate-spin': isSpinning }" />
              {{ isSpinning ? 'Spinning…' : 'Spin' }}
            </button>
          </div>
        </div>

        <!-- Reel Area -->
        <div class="glass-card relative w-full overflow-hidden p-0">
          <div class="relative aspect-[16/10] w-full sm:aspect-auto sm:h-full sm:min-h-[288px]">
            <img :src="sweetRushReel" alt="Sweet Rush Bonanza reel" class="absolute inset-0 h-full w-full rounded-2xl object-cover" />
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 via-transparent to-black/10" />

            <!-- Win pulse overlay -->
            <transition name="win-pop">
              <div v-if="lastWin" class="absolute inset-0 flex items-center justify-center bg-black/40">
                <div class="win-pulse rounded-2xl bg-black/60 px-6 py-4 text-center backdrop-blur-sm">
                  <p class="text-[11px] font-medium uppercase tracking-widest text-brand-gold-300">Big Win</p>
                  <p class="text-2xl font-extrabold text-brand-gold-400 [text-shadow:0_2px_10px_rgba(255,193,7,0.6)]">
                    +${{ lastWin.toFixed(2) }}
                  </p>
                </div>
              </div>
            </transition>

            <!-- Reel highlight frame while spinning -->
            <div v-if="isSpinning" class="reel-frame pointer-events-none absolute inset-3 rounded-lg border-2 border-brand-gold-400/70" />
          </div>
        </div>
      </div>

      <!-- Wins Table -->
      <div class="themed-surface rounded-xl border p-3 sm:p-4" :style="{ borderColor: 'var(--border-color)' }">
        <!-- Tabs -->
        <div class="mb-3 inline-flex items-center gap-0.5 rounded-lg bg-black/5 p-1 dark:bg-white/5">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            class="rounded-md px-3.5 py-1.5 text-xs font-medium transition"
            :class="activeTab === tab.id ? 'bg-brand-blue-600 text-white shadow-sm' : 'text-app-secondary hover:text-app-primary'"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <transition name="fade-slide" mode="out-in">
          <!-- Big Wins / Lucky Wins share the leaderboard table shape -->
          <div v-if="activeTab === 'big' || activeTab === 'lucky'" :key="activeTab" class="overflow-x-auto rounded-lg" :style="{ border: '1px solid var(--border-color)' }">
            <table class="w-full min-w-[560px] border-collapse text-left text-xs">
              <thead>
                <tr class="bg-black/5 dark:bg-white/5">
                  <th class="w-10 px-3 py-2 font-semibold text-app-primary">#</th>
                  <th class="px-3 py-2 font-semibold text-app-primary">User</th>
                  <th class="px-3 py-2 font-semibold text-app-primary">Bet Amount</th>
                  <th class="px-3 py-2 font-semibold text-app-primary">Multiplier</th>
                  <th class="px-3 py-2 font-semibold text-app-primary">Payout</th>
                  <th class="px-3 py-2 font-semibold text-app-primary">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, i) in activeTab === 'big' ? bigWins : luckyWins"
                  :key="row.id"
                  class="border-t transition hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
                  :style="{ borderColor: 'var(--border-color)' }"
                >
                  <td class="px-3 py-2.5 text-app-secondary">{{ i + 1 }}</td>
                  <td class="px-3 py-2.5">
                    <div class="flex items-center gap-2">
                      <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-gold-300 to-brand-gold-600 text-[10px] font-bold text-black">
                        {{ row.user.charAt(0) }}
                      </div>
                      <span class="font-medium text-app-secondary">{{ row.user }}</span>
                    </div>
                  </td>
                  <td class="px-3 py-2.5 font-medium text-app-primary">${{ row.betAmount }}</td>
                  <td class="px-3 py-2.5 text-app-secondary">{{ row.multiplier }}x</td>
                  <td class="px-3 py-2.5 font-semibold text-brand-gold-500">${{ row.payout }}</td>
                  <td class="px-3 py-2.5 text-app-secondary">{{ row.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Description -->
          <div v-else key="description" class="space-y-3 rounded-lg p-1 text-xs leading-relaxed text-app-secondary">
            <p>
              <span class="font-bold text-app-primary">{{ game.title }}</span>
              is a high-volatility video slot from {{ game.provider }} featuring a candy-crush themed
              board, tumbling reels, and multiplier bombs that can stack up to huge win potential.
            </p>
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div class="rounded-lg bg-black/5 p-2.5 dark:bg-white/5">
                <p class="text-[10px] uppercase tracking-wide text-app-secondary">RTP</p>
                <p class="mt-0.5 font-bold text-app-primary">{{ game.rtp }}</p>
              </div>
              <div class="rounded-lg bg-black/5 p-2.5 dark:bg-white/5">
                <p class="text-[10px] uppercase tracking-wide text-app-secondary">Volatility</p>
                <p class="mt-0.5 font-bold text-app-primary">High</p>
              </div>
              <div class="rounded-lg bg-black/5 p-2.5 dark:bg-white/5">
                <p class="text-[10px] uppercase tracking-wide text-app-secondary">Max Win</p>
                <p class="mt-0.5 font-bold text-app-primary">21,175x</p>
              </div>
              <div class="rounded-lg bg-black/5 p-2.5 dark:bg-white/5">
                <p class="text-[10px] uppercase tracking-wide text-app-secondary">Paylines</p>
                <p class="mt-0.5 font-bold text-app-primary">Cluster Pays</p>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import BackButton from '@/components/common/BackButton.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import SlotsIcon from '@/components/casino-screens/SlotsIcon.vue'
import sweetRushCard from '@/assets/casino/slots/sweet-rush-card.png'
import sweetRushReel from '@/assets/casino/slots/sweet-rush-reel.png'

const game = {
  title: 'Sweet Rush Bonanza',
  provider: 'Pragmatic Play',
  bets: '8,092,694',
  rtp: '96.50%'
}

const tabs = [
  { id: 'big', label: 'Big Wins' },
  { id: 'lucky', label: 'Lucky Wins' },
  { id: 'description', label: 'Description' }
]
const activeTab = ref('big')

const funPlay = ref(true)
const showSettings = ref(false)
const isFavorite = ref(false)

const balance = ref(100000)
const betStep = 5
const betAmount = ref(20)
const isSpinning = ref(false)
const autoplay = ref(false)
const lastWin = ref(null)

function spin() {
  if (isSpinning.value || betAmount.value > balance.value) return
  isSpinning.value = true
  lastWin.value = null
  balance.value = +(balance.value - betAmount.value).toFixed(2)

  window.setTimeout(() => {
    isSpinning.value = false
    // Mock outcome only — no real RNG/gaming logic in this build.
    const win = Math.random() < 0.35 ? +(betAmount.value * (2 + Math.random() * 12)).toFixed(2) : 0
    if (win > 0) {
      balance.value = +(balance.value + win).toFixed(2)
      lastWin.value = win
      window.setTimeout(() => {
        lastWin.value = null
      }, 1800)
    }
    if (autoplay.value) spin()
  }, 1400)
}

function quickSpin() {
  if (!isSpinning.value) spin()
}

// Mock leaderboard data (static — no backend in this build).
const bigWins = [
  { id: 1, user: 'Diamond', betAmount: '20,000,000', multiplier: '8.21', payout: '164,224.00', date: 'Nov 10, 4:26 AM' },
  { id: 2, user: 'Phoenix', betAmount: '12,500,000', multiplier: '11.40', payout: '142,500.00', date: 'Nov 10, 3:58 AM' },
  { id: 3, user: 'Raven99', betAmount: '9,800,000', multiplier: '6.75', payout: '66,150.00', date: 'Nov 10, 2:41 AM' },
  { id: 4, user: 'Nova', betAmount: '7,200,000', multiplier: '14.02', payout: '100,944.00', date: 'Nov 9, 11:19 PM' },
  { id: 5, user: 'Zephyr', betAmount: '5,000,000', multiplier: '9.33', payout: '46,650.00', date: 'Nov 9, 10:02 PM' }
]

const luckyWins = [
  { id: 1, user: 'Comet', betAmount: '150.00', multiplier: '520.10', payout: '78,015.00', date: 'Nov 10, 5:02 AM' },
  { id: 2, user: 'Blaze', betAmount: '80.00', multiplier: '812.55', payout: '65,004.00', date: 'Nov 10, 4:11 AM' },
  { id: 3, user: 'Orion', betAmount: '50.00', multiplier: '640.00', payout: '32,000.00', date: 'Nov 10, 1:37 AM' },
  { id: 4, user: 'Sable', betAmount: '25.00', multiplier: '990.20', payout: '24,755.00', date: 'Nov 9, 9:48 PM' },
  { id: 5, user: 'Vega', betAmount: '10.00', multiplier: '1120.00', payout: '11,200.00', date: 'Nov 9, 8:03 PM' }
]
</script>

<style scoped>
@keyframes spin-slow {
  to {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spin-slow 1.6s linear infinite;
}

.spin-btn:not(:disabled):hover {
  filter: brightness(1.06);
}
.spin-btn:not(:disabled):active {
  filter: brightness(0.94);
}

@keyframes reel-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.45);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(255, 193, 7, 0);
  }
}
.reel-frame {
  animation: reel-pulse 1s ease-in-out infinite;
}

.win-pop-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.win-pop-leave-active {
  transition: all 0.35s ease;
}
.win-pop-enter-from {
  opacity: 0;
  transform: scale(0.85);
}
.win-pop-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
.win-pulse {
  animation: reel-pulse 1.1s ease-in-out infinite;
}
</style>
