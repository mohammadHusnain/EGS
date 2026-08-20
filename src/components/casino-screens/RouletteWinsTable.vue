<template>
  <div class="themed-surface rounded-xl border p-3 sm:p-4" :style="{ borderColor: 'var(--border-color)' }">
    <div class="mb-3 inline-flex gap-0.5 rounded-lg p-0.5" :style="{ background: 'var(--bg-app)' }">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        class="rounded-md px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:text-sm"
        :class="active === tab.key ? 'bg-brand-blue-600 text-white shadow' : 'text-app-secondary hover:text-app-primary'"
        @click="active = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <transition name="fade-slide" mode="out-in">
      <div v-if="active === 'description'" key="description" class="space-y-2 py-2 text-xs leading-relaxed text-app-secondary sm:text-sm">
        <p>
          American Roulette is played on a wheel with numbers 0, 00 and 1&ndash;36. Place bets on single numbers,
          number groups, colors or odd/even before the ball drops &mdash; a straight-up single number bet pays 35:1.
        </p>
        <p>Theoretical RTP for this table is <span class="font-semibold text-app-primary">96.50%</span>.</p>
      </div>

      <div v-else :key="active" class="overflow-x-auto">
        <table class="w-full min-w-[560px] border-collapse text-left text-xs sm:text-sm">
          <thead>
            <tr class="text-app-secondary" :style="{ background: 'var(--bg-app)' }">
              <th class="rounded-l-md px-3 py-2 font-medium">#</th>
              <th class="px-3 py-2 font-medium">User</th>
              <th class="px-3 py-2 font-medium">Bet Amount</th>
              <th class="px-3 py-2 font-medium">Multiplier</th>
              <th class="px-3 py-2 font-medium">Payout</th>
              <th class="rounded-r-md px-3 py-2 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in rows"
              :key="row.user + i"
              class="border-b transition hover:bg-black/5"
              :style="{ borderColor: 'var(--border-color)' }"
            >
              <td class="px-3 py-2.5 font-semibold text-app-primary">{{ i + 1 }}</td>
              <td class="px-3 py-2.5">
                <div class="flex items-center gap-2">
                  <span
                    class="grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold text-white"
                    :style="{ background: row.avatarColor }"
                  >
                    {{ row.user.charAt(0) }}
                  </span>
                  <span class="text-app-secondary">{{ row.user }}</span>
                </div>
              </td>
              <td class="px-3 py-2.5 text-app-primary">{{ row.bet }}</td>
              <td class="px-3 py-2.5 text-app-secondary">{{ row.multiplier }}</td>
              <td class="px-3 py-2.5 font-semibold text-app-primary">{{ row.payout }}</td>
              <td class="px-3 py-2.5 text-app-secondary">{{ row.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const tabs = [
  { key: 'big', label: 'Big Wins' },
  { key: 'lucky', label: 'Lucky Wins' },
  { key: 'description', label: 'Description' }
]

const active = ref('big')

const bigWins = [
  { user: 'Diamond', bet: '$20,000,000', multiplier: '8.21x', payout: '$164,224.00', date: 'Nov 10, 4:26 AM', avatarColor: '#7a5af8' },
  { user: 'Skyler', bet: '$8,400,000', multiplier: '5.60x', payout: '$47,040,000.00', date: 'Nov 10, 3:58 AM', avatarColor: '#1642c4' },
  { user: 'RoyalFlush', bet: '$2,150,000', multiplier: '35.00x', payout: '$75,250,000.00', date: 'Nov 10, 2:14 AM', avatarColor: '#e6a800' },
  { user: 'NovaBets', bet: '$960,000', multiplier: '17.5x', payout: '$16,800,000.00', date: 'Nov 9, 11:47 PM', avatarColor: '#0f8b5f' },
  { user: 'LuckyCharm', bet: '$500,000', multiplier: '2.00x', payout: '$1,000,000.00', date: 'Nov 9, 10:32 PM', avatarColor: '#b8244a' }
]

const luckyWins = [
  { user: 'Pinwheel', bet: '$120', multiplier: '35.00x', payout: '$4,200.00', date: 'Nov 10, 4:41 AM', avatarColor: '#7a5af8' },
  { user: 'Redline', bet: '$85', multiplier: '17.5x', payout: '$1,487.50', date: 'Nov 10, 4:19 AM', avatarColor: '#1642c4' },
  { user: 'Streaker', bet: '$60', multiplier: '2.00x', payout: '$120.00', date: 'Nov 10, 3:52 AM', avatarColor: '#e6a800' },
  { user: 'MidnightBet', bet: '$45', multiplier: '11.00x', payout: '$495.00', date: 'Nov 10, 3:03 AM', avatarColor: '#0f8b5f' },
  { user: 'GoldenSpin', bet: '$30', multiplier: '3.00x', payout: '$90.00', date: 'Nov 10, 1:12 AM', avatarColor: '#b8244a' }
]

const rows = ref(bigWins)

watch(active, (val) => {
  if (val === 'big') rows.value = bigWins
  if (val === 'lucky') rows.value = luckyWins
})
</script>
