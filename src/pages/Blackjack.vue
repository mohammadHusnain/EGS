<template>
  <DashboardLayout title="Blackjack">
    <div class="mx-auto max-w-[1400px] space-y-4 p-4 sm:p-6 lg:p-8">
      <BackButton />

      <!-- Betting Panel -->
      <section class="themed-surface overflow-hidden rounded-2xl border shadow-card" :style="{ borderColor: 'var(--border-color)' }">
        <!-- Header bar -->
        <div class="flex flex-wrap items-center justify-between gap-3 border-b bg-black/[0.02] px-4 py-3 dark:bg-white/[0.03]" :style="{ borderColor: 'var(--border-color)' }">
          <button
            type="button"
            class="flex items-center gap-1.5 text-sm font-semibold text-app-primary transition hover:opacity-70"
            @click="$router.back()"
          >
            <AppIcon name="chevronRight" :size="16" class="rotate-180" />
            Blackjack
          </button>

          <div class="flex flex-wrap items-center gap-4 sm:gap-6">
            <div class="flex items-center gap-3 text-app-secondary">
              <button
                v-for="tool in tools"
                :key="tool.name"
                type="button"
                class="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 hover:text-app-primary dark:hover:bg-white/10"
                :aria-label="tool.label"
                :title="tool.label"
              >
                <BlackjackIcon :name="tool.name" :size="15" />
              </button>
            </div>

            <div class="flex items-center gap-2 text-xs font-medium text-app-secondary">
              <span :class="!realPlay ? 'text-app-primary' : ''">Fun Play</span>
              <button
                type="button"
                role="switch"
                :aria-checked="realPlay"
                class="relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200"
                :class="realPlay ? 'bg-brand-gold-500' : 'bg-brand-blue-300'"
                @click="realPlay = !realPlay"
              >
                <span
                  class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200"
                  :class="realPlay ? 'translate-x-4' : 'translate-x-0.5'"
                />
              </button>
              <span :class="realPlay ? 'text-app-primary' : ''">Real Play</span>
            </div>
          </div>
        </div>

        <!-- Game details -->
        <div class="flex flex-col gap-4 p-4 lg:flex-row">
          <!-- Info card -->
          <div class="flex w-full shrink-0 flex-col gap-3 lg:w-56">
            <div class="group relative aspect-[3/4] w-full overflow-hidden rounded-xl">
              <img :src="gameThumb" alt="Blackjack table art" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-brand-blue-950/90 via-brand-blue-900/10 to-transparent" />
              <div class="absolute inset-x-0 bottom-0 space-y-0.5 p-3 text-center text-white">
                <p class="font-serif text-lg font-semibold drop-shadow">Blackjack</p>
                <p class="text-[10px] font-medium tracking-wide text-white/80">EVOLUTION</p>
              </div>
            </div>

            <h3 class="font-serif text-base font-semibold text-app-primary">Blackjack</h3>

            <div class="space-y-1 rounded-lg bg-black/[0.03] p-2 text-[11px] dark:bg-white/[0.05]">
              <div class="flex items-center justify-between">
                <span class="text-app-secondary">Bets</span>
                <span class="font-medium text-app-primary">8,092,694</span>
              </div>
              <div class="h-px w-full" :style="{ backgroundColor: 'var(--border-color)' }" />
              <div class="flex items-center justify-between">
                <span class="text-app-secondary">RTP</span>
                <span class="font-medium text-app-primary">96.50%</span>
              </div>
            </div>
          </div>

          <!-- Live dealer viewport -->
          <div class="relative min-h-[280px] flex-1 overflow-hidden rounded-xl bg-black sm:min-h-[360px]">
            <img :src="dealerTable" alt="Live blackjack dealer table" class="absolute inset-0 h-full w-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/30" />

            <!-- Live badge -->
            <div class="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-red-600/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">
              <span class="relative flex h-1.5 w-1.5">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80" />
                <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              Live
            </div>

            <div class="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur">
              <BlackjackIcon name="volume" :size="12" />
              4,213 watching
            </div>

            <!-- Dealer / seat labels -->
            <div class="absolute bottom-24 left-1/2 -translate-x-1/2 rounded-lg bg-black/50 px-3 py-1 text-center text-xs font-semibold text-white backdrop-blur sm:bottom-28">
              {{ dealerName }}
              <span class="block text-[10px] font-normal text-white/70">Dealing shoe · 6 decks</span>
            </div>

            <!-- Betting controls -->
            <div class="absolute inset-x-0 bottom-0 space-y-2.5 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="flex items-center gap-2 text-white">
                  <span class="text-[11px] text-white/70">Your Bet</span>
                  <span class="text-lg font-bold tabular-nums">${{ betAmount.toLocaleString() }}</span>
                </div>
                <button
                  type="button"
                  class="rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/80 transition hover:bg-white/20 disabled:opacity-40"
                  :disabled="betAmount === 0 || dealing"
                  @click="betAmount = 0"
                >
                  Clear
                </button>
              </div>

              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-2">
                  <button
                    v-for="chip in chips"
                    :key="chip.value"
                    type="button"
                    class="chip-btn relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed text-[10px] font-bold text-white shadow-lg transition-transform duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 sm:h-10 sm:w-10"
                    :class="chip.class"
                    :disabled="dealing"
                    :aria-label="`Bet chip ${chip.value}`"
                    @click="placeChip(chip.value)"
                  >
                    {{ chip.label }}
                  </button>
                </div>

                <button
                  type="button"
                  class="deal-btn rounded-full bg-brand-gold-500 px-5 py-2 text-xs font-bold text-brand-blue-950 shadow-lg transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                  :disabled="betAmount === 0"
                  :class="{ 'is-dealing': dealing }"
                  @click="deal"
                >
                  {{ dealing ? 'Dealing…' : 'Deal Hand' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Wins table -->
      <section class="themed-surface rounded-2xl border p-3 shadow-card sm:p-4" :style="{ borderColor: 'var(--border-color)' }">
        <div class="mb-3 inline-flex items-center gap-0.5 rounded-xl bg-black/[0.04] p-1 dark:bg-white/[0.06]">
          <button
            v-for="tab in tabs"
            :key="tab"
            type="button"
            class="rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200 sm:text-sm"
            :class="activeTab === tab
              ? 'bg-brand-blue-600 text-white shadow'
              : 'text-app-secondary hover:text-app-primary'"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>

        <transition name="fade-slide" mode="out-in">
          <!-- Description tab -->
          <div v-if="activeTab === 'Description'" key="description" class="space-y-3 text-sm text-app-secondary">
            <p>
              Blackjack is a live-dealer card game streamed in real time from a professional studio. Play against
              the dealer, aim for a hand value as close to 21 as possible without going over, and use Hit, Stand,
              Double, or Split at the table to shape your hand.
            </p>
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div v-for="fact in facts" :key="fact.label" class="rounded-lg bg-black/[0.03] p-3 dark:bg-white/[0.05]">
                <p class="text-[11px] text-app-secondary">{{ fact.label }}</p>
                <p class="mt-0.5 text-sm font-semibold text-app-primary">{{ fact.value }}</p>
              </div>
            </div>
          </div>

          <!-- Big Wins / Lucky Wins table -->
          <div v-else :key="activeTab" class="overflow-x-auto rounded-xl" :style="{ border: '1px solid var(--border-color)' }">
            <table class="w-full min-w-[560px] text-left text-xs sm:text-sm">
              <thead>
                <tr class="bg-black/[0.03] text-app-primary dark:bg-white/[0.05]">
                  <th class="w-10 px-3 py-2.5 font-semibold">#</th>
                  <th class="px-3 py-2.5 font-semibold">User</th>
                  <th class="px-3 py-2.5 font-semibold">Bet Amount</th>
                  <th class="px-3 py-2.5 font-semibold">Multiplier</th>
                  <th class="px-3 py-2.5 font-semibold">Payout</th>
                  <th class="px-3 py-2.5 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, i) in activeRows"
                  :key="row.user + i"
                  class="border-t transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.04]"
                  :style="{ borderColor: 'var(--border-color)' }"
                >
                  <td class="px-3 py-2.5 text-app-primary">{{ i + 1 }}</td>
                  <td class="px-3 py-2.5">
                    <div class="flex items-center gap-2">
                      <img :src="avatarBadge" alt="" class="h-4 w-4 shrink-0" />
                      <span class="text-app-secondary">{{ row.user }}</span>
                    </div>
                  </td>
                  <td class="px-3 py-2.5 text-app-primary">{{ row.bet }}</td>
                  <td class="px-3 py-2.5 text-app-secondary">{{ row.multiplier }}</td>
                  <td class="px-3 py-2.5 font-semibold text-brand-gold-600 dark:text-brand-gold-400">{{ row.payout }}</td>
                  <td class="px-3 py-2.5 text-app-secondary">{{ row.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </transition>
      </section>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import BackButton from '@/components/common/BackButton.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import BlackjackIcon from '@/components/casino-screens/BlackjackIcon.vue'
import dealerTable from '@/assets/casino/blackjack/dealer-table.jpg'
import gameThumb from '@/assets/casino/blackjack/game-thumb.png'
import avatarBadge from '@/assets/casino/blackjack/avatar-badge.svg'

const realPlay = ref(false)
const dealing = ref(false)
const betAmount = ref(0)
const activeTab = ref('Big Wins')
const dealerName = 'Dealer Sofia'

const tools = [
  { name: 'gear', label: 'Table settings' },
  { name: 'shuffle', label: 'Switch table' },
  { name: 'star', label: 'Add to favorites' }
]

const tabs = ['Big Wins', 'Lucky Wins', 'Description']

const chips = [
  { value: 1, label: '$1', class: 'bg-brand-blue-400 border-white/70' },
  { value: 5, label: '$5', class: 'bg-red-500 border-white/70' },
  { value: 25, label: '$25', class: 'bg-brand-blue-700 border-brand-gold-300' },
  { value: 100, label: '$100', class: 'bg-black border-brand-gold-400' },
  { value: 500, label: '$500', class: 'bg-brand-gold-600 border-white/70' }
]

const facts = [
  { label: 'Provider', value: 'Evolution' },
  { label: 'RTP', value: '96.50%' },
  { label: 'Min Bet', value: '$1' },
  { label: 'Max Bet', value: '$5,000' }
]

const bigWins = [
  { user: 'Diamond', bet: '$20,000,000', multiplier: '8.21x', payout: '$164,224.00', date: 'Nov 10, 4:26 AM' },
  { user: 'Diamond', bet: '$20,000,000', multiplier: '8.21x', payout: '$164,224.00', date: 'Nov 10, 4:26 AM' },
  { user: 'Diamond', bet: '$20,000,000', multiplier: '8.21x', payout: '$164,224.00', date: 'Nov 10, 4:26 AM' },
  { user: 'Diamond', bet: '$20,000,000', multiplier: '8.21x', payout: '$164,224.00', date: 'Nov 10, 4:26 AM' },
  { user: 'Diamond', bet: '$20,000,000', multiplier: '8.21x', payout: '$164,224.00', date: 'Nov 10, 4:26 AM' }
]

const luckyWins = [
  { user: 'Nova99', bet: '$1,200', multiplier: '2.5x', payout: '$3,000.00', date: 'Nov 10, 3:58 AM' },
  { user: 'RedFox', bet: '$800', multiplier: '3.1x', payout: '$2,480.00', date: 'Nov 10, 3:41 AM' },
  { user: 'LuckyLee', bet: '$450', multiplier: '5.0x', payout: '$2,250.00', date: 'Nov 10, 3:22 AM' },
  { user: 'MintyBet', bet: '$2,000', multiplier: '1.8x', payout: '$3,600.00', date: 'Nov 10, 2:59 AM' },
  { user: 'AceHigh', bet: '$300', multiplier: '4.2x', payout: '$1,260.00', date: 'Nov 10, 2:37 AM' }
]

const activeRows = computed(() => (activeTab.value === 'Lucky Wins' ? luckyWins : bigWins))

function placeChip(value) {
  if (dealing.value) return
  betAmount.value += value
}

function deal() {
  if (betAmount.value === 0 || dealing.value) return
  dealing.value = true
  // Mock interaction only — no real gaming logic in this build.
  setTimeout(() => {
    dealing.value = false
  }, 1400)
}
</script>

<style scoped>
.chip-btn {
  background-image: repeating-conic-gradient(rgba(255, 255, 255, 0.18) 0deg 10deg, transparent 10deg 20deg);
}

.deal-btn.is-dealing {
  animation: pulse-deal 0.7s ease-in-out infinite;
}

@keyframes pulse-deal {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.96);
  }
}
</style>
