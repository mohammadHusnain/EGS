<template>
  <div class="themed-surface flex flex-col overflow-hidden rounded-xl border" :style="{ borderColor: 'var(--border-color)' }">
    <div class="flex items-center gap-1 border-b p-2" :style="{ borderColor: 'var(--border-color)' }">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        class="rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150 active:scale-95 sm:text-sm"
        :class="active === tab.id ? 'bg-brand-blue-600 text-white shadow-sm' : 'text-app-secondary hover:bg-black/5'"
        @click="active = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <transition name="fade-slide" mode="out-in">
      <div v-if="active === 'description'" key="description" class="p-4 text-sm leading-relaxed text-app-secondary">
        <p>
          <span class="font-semibold text-app-primary">Ice Fishing</span> is a live money-wheel game show. Place a bet on
          a multiplier segment, watch the host spin the wheel, and cash out when the pointer lands on your number.
          RTP <span class="font-semibold text-app-primary">96.50%</span> · Provider
          <span class="font-semibold text-app-primary">Pragmatic Play</span>.
        </p>
      </div>

      <div v-else key="table" class="overflow-x-auto">
        <table class="w-full min-w-[560px] border-collapse text-left text-xs sm:text-sm">
          <thead>
            <tr class="text-app-secondary" :style="{ backgroundColor: 'var(--bg-app)' }">
              <th class="border-b px-3 py-2 font-semibold" :style="{ borderColor: 'var(--border-color)' }">#</th>
              <th class="border-b px-3 py-2 font-semibold" :style="{ borderColor: 'var(--border-color)' }">User</th>
              <th class="border-b px-3 py-2 font-semibold" :style="{ borderColor: 'var(--border-color)' }">Bet Amount</th>
              <th class="border-b px-3 py-2 font-semibold" :style="{ borderColor: 'var(--border-color)' }">Multiplier</th>
              <th class="border-b px-3 py-2 font-semibold" :style="{ borderColor: 'var(--border-color)' }">Payout</th>
              <th class="border-b px-3 py-2 font-semibold" :style="{ borderColor: 'var(--border-color)' }">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in rows"
              :key="row.id"
              class="transition-colors hover:bg-black/[0.03]"
            >
              <td class="border-b px-3 py-2.5 text-app-secondary" :style="{ borderColor: 'var(--border-color)' }">{{ i + 1 }}</td>
              <td class="border-b px-3 py-2.5" :style="{ borderColor: 'var(--border-color)' }">
                <div class="flex items-center gap-2">
                  <div
                    class="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    :style="{ backgroundColor: row.avatarColor }"
                  >
                    {{ row.user.slice(0, 1) }}
                  </div>
                  <span class="font-medium text-app-primary">{{ row.user }}</span>
                </div>
              </td>
              <td class="border-b px-3 py-2.5 font-medium text-app-primary" :style="{ borderColor: 'var(--border-color)' }">{{ row.bet }}</td>
              <td class="border-b px-3 py-2.5 font-semibold text-brand-gold-600" :style="{ borderColor: 'var(--border-color)' }">{{ row.multiplier }}</td>
              <td class="border-b px-3 py-2.5 font-semibold text-emerald-600" :style="{ borderColor: 'var(--border-color)' }">{{ row.payout }}</td>
              <td class="border-b px-3 py-2.5 text-app-secondary" :style="{ borderColor: 'var(--border-color)' }">{{ row.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  bigWins: { type: Array, required: true },
  luckyWins: { type: Array, required: true }
})

const tabs = [
  { id: 'big', label: 'Big Wins' },
  { id: 'lucky', label: 'Lucky Wins' },
  { id: 'description', label: 'Description' }
]

const active = ref('big')

const rows = ref(props.bigWins)

watch(active, (val) => {
  if (val === 'big') rows.value = props.bigWins
  if (val === 'lucky') rows.value = props.luckyWins
})
</script>
