<template>
  <DashboardLayout title="Sportsbook">
    <div class="mx-auto max-w-[1600px] space-y-4 p-4 sm:p-6 lg:p-8">
      <BackButton />

      <div class="grid grid-cols-1 gap-4 lg:grid-cols-[220px_1fr] lg:items-start lg:gap-6">
        <!-- Category sidebar -->
        <aside class="themed-surface rounded-xl border p-3 shadow-sm lg:sticky lg:top-4" :style="{ borderColor: 'var(--border-color)' }">
          <p class="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wide text-app-secondary">Sports</p>
          <nav class="flex flex-col gap-1">
            <button
              v-for="cat in categories"
              :key="cat.key"
              type="button"
              class="group relative flex w-full items-center gap-2.5 overflow-hidden rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-200"
              :class="activeCategory === cat.key
                ? 'text-brand-blue-950 shadow'
                : 'text-app-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-app-primary'"
              :style="activeCategory === cat.key ? { background: 'linear-gradient(120deg, var(--accent-gold), #ffe38a)' } : {}"
              @click="activeCategory = cat.key"
            >
              <SportsbookIcon :name="cat.icon" :size="17" class="shrink-0 transition-transform duration-200" :class="activeCategory === cat.key ? 'scale-110' : 'group-hover:scale-105'" />
              <span class="flex-1 truncate">{{ cat.label }}</span>
              <span
                v-if="cat.count"
                class="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
                :class="activeCategory === cat.key ? 'bg-black/10 text-brand-blue-950' : 'themed-surface text-app-secondary'"
                :style="activeCategory !== cat.key ? { border: '1px solid var(--border-color)' } : {}"
              >
                {{ cat.count }}
              </span>
            </button>
          </nav>
        </aside>

        <!-- Main content -->
        <section class="min-w-0 space-y-5">
          <!-- Header -->
          <div class="themed-surface flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 shadow-sm" :style="{ borderColor: 'var(--border-color)' }">
            <div class="flex items-center gap-2.5">
              <span class="flex h-10 w-10 items-center justify-center rounded-full" :style="{ background: 'linear-gradient(135deg, var(--accent-gold), #ffb020)' }">
                <SportsbookIcon name="boxing" :size="20" class="text-brand-blue-950" />
              </span>
              <div>
                <h1 class="text-lg font-bold text-app-primary sm:text-xl">Boxing</h1>
                <p class="text-xs text-app-secondary">{{ totalMatches }} upcoming matchups</p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <div class="themed-surface flex items-center gap-1 rounded-lg border p-1" :style="{ borderColor: 'var(--border-color)' }">
                <button
                  v-for="filter in filters"
                  :key="filter"
                  type="button"
                  class="rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition-colors duration-200"
                  :class="activeFilter === filter ? 'bg-brand-blue-600 text-white' : 'text-app-secondary hover:text-app-primary'"
                  @click="activeFilter = filter"
                >
                  {{ filter }}
                </button>
              </div>
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-lg text-app-secondary transition hover:bg-black/5 hover:text-app-primary dark:hover:bg-white/5"
                aria-label="Sort matches"
                title="Sort matches"
              >
                <SportsbookIcon name="trending" :size="16" />
              </button>
            </div>
          </div>

          <!-- Date-grouped matchups -->
          <transition-group name="fade-slide" tag="div" class="space-y-6">
            <div v-for="group in visibleGroups" :key="group.label">
              <div class="mb-3 flex items-center gap-3">
                <SportsbookIcon name="clock" :size="14" class="text-app-secondary" />
                <h2 class="text-sm font-semibold text-app-primary">{{ group.label }}</h2>
                <span class="h-px flex-1" :style="{ backgroundColor: 'var(--border-color)' }" />
                <span class="text-xs font-medium text-app-secondary">{{ group.matches.length }} matches</span>
              </div>

              <div class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                <article
                  v-for="match in group.matches"
                  :key="match.id"
                  class="themed-surface group flex flex-col gap-3 rounded-xl border p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  :style="{ borderColor: 'var(--border-color)' }"
                >
                  <!-- Match meta -->
                  <div class="flex flex-col gap-1">
                    <div class="flex items-center gap-1.5 text-[11px] text-app-secondary">
                      <span>🥊</span>
                      <p class="flex-1 truncate">{{ match.category }}</p>
                      <SportsbookIcon name="layers" :size="12" class="shrink-0 opacity-60" />
                    </div>
                    <div class="flex items-center gap-1.5 text-[11px] font-semibold" :style="{ color: 'var(--accent-gold)' }">
                      <span>{{ match.time }}</span>
                      <span v-if="match.live" class="flex items-center gap-1 rounded-full bg-red-500/15 px-1.5 py-0.5 text-red-500">
                        <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                        LIVE
                      </span>
                    </div>
                  </div>

                  <!-- Fighters -->
                  <div class="space-y-2">
                    <div v-for="(fighter, idx) in [match.fighterA, match.fighterB]" :key="fighter.name" class="flex items-center justify-between gap-2">
                      <div class="flex min-w-0 items-center gap-2">
                        <span
                          class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm shadow-inner"
                          :class="idx === 0 ? 'bg-brand-blue-100 dark:bg-brand-blue-900' : 'bg-brand-gold-300/40 dark:bg-brand-gold-700/40'"
                        >
                          {{ fighter.flag }}
                        </span>
                        <div class="min-w-0">
                          <p class="truncate text-[12.5px] font-semibold text-app-primary">{{ fighter.name }}</p>
                          <p class="truncate text-[10px] text-app-secondary">{{ fighter.record }}</p>
                        </div>
                      </div>
                      <span class="flex h-6 min-w-[24px] items-center justify-center rounded-md px-1 text-xs font-semibold text-app-primary" :style="{ backgroundColor: 'var(--bg-app)' }">
                        {{ fighter.score }}
                      </span>
                    </div>
                  </div>

                  <span class="h-px w-full" :style="{ backgroundColor: 'var(--border-color)' }" />

                  <!-- Odds -->
                  <div class="grid grid-cols-3 gap-2">
                    <button
                      v-for="option in match.odds"
                      :key="option.key"
                      type="button"
                      class="flex flex-col items-center justify-center gap-0.5 rounded-lg px-2 py-1.5 text-center transition-all duration-150 active:scale-95"
                      :class="isSelected(match.id, option.key)
                        ? 'scale-[1.03] text-brand-blue-950 shadow'
                        : 'text-app-primary hover:-translate-y-0.5 hover:shadow'"
                      :style="isSelected(match.id, option.key)
                        ? { background: 'linear-gradient(135deg, var(--accent-gold), #ffe38a)' }
                        : { backgroundColor: 'var(--bg-app)' }"
                      @click="toggleOdds(match.id, option.key)"
                    >
                      <span class="text-[10px] font-medium uppercase tracking-wide opacity-70">{{ option.label }}</span>
                      <span class="text-xs font-bold">{{ option.value.toFixed(2) }}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    class="w-full rounded-full py-2 text-xs font-semibold text-brand-blue-950 transition-all duration-200 hover:brightness-105 active:scale-[0.98]"
                    :style="{ background: 'linear-gradient(135deg, var(--accent-gold), #ffe38a)' }"
                  >
                    View all markets
                  </button>
                </article>
              </div>
            </div>
          </transition-group>

          <p v-if="!visibleGroups.length" class="themed-surface rounded-xl border p-8 text-center text-sm text-app-secondary" :style="{ borderColor: 'var(--border-color)' }">
            No live matchups right now — check back soon.
          </p>
        </section>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import BackButton from '@/components/common/BackButton.vue'
import SportsbookIcon from '@/components/casino-screens/SportsbookIcon.vue'

const categories = [
  { key: 'boxing', label: 'Boxing', icon: 'boxing', count: 8 },
  { key: 'american-football', label: 'American Football', icon: 'americanFootball', count: 5 },
  { key: 'football', label: 'Football', icon: 'football', count: 12 },
  { key: 'basketball', label: 'Basketball', icon: 'basketball', count: 6 },
  { key: 'tennis', label: 'Tennis', icon: 'tennis', count: 4 },
  { key: 'ice-hockey', label: 'Ice Hockey', icon: 'iceHockey', count: 3 },
  { key: 'baseball', label: 'Baseball', icon: 'baseball', count: 7 }
]

const activeCategory = ref('boxing')
const filters = ['all', 'live', 'today']
const activeFilter = ref('all')

// Mock matchups — no real odds/backend wiring in this build.
const matches = [
  {
    id: 'm1', time: 'Today, 15:00', live: true,
    category: 'Heavyweight · WBA/WBO/IBF Title (12 Rounds)',
    fighterA: { name: 'Usyk, Oleksandr', record: '22-0, 14 KO', flag: '🇺🇦', score: '0' },
    fighterB: { name: 'Joshua, Anthony', record: '28-3, 25 KO', flag: '🇬🇧', score: '0' },
    odds: [
      { key: '1', label: '1', value: 1.65 },
      { key: 'x', label: 'Draw', value: 12.0 },
      { key: '2', label: '2', value: 2.35 }
    ]
  },
  {
    id: 'm2', time: 'Today, 15:00', live: true,
    category: 'Cruiserweight · Non-Title (10 Rounds)',
    fighterA: { name: 'Beterbiev, Artur', record: '20-0, 20 KO', flag: '🇷🇺', score: '2' },
    fighterB: { name: 'Bivol, Dmitry', record: '23-0, 12 KO', flag: '🇰🇬', score: '1' },
    odds: [
      { key: '1', label: '1', value: 1.90 },
      { key: 'x', label: 'Draw', value: 15.0 },
      { key: '2', label: '2', value: 1.95 }
    ]
  },
  {
    id: 'm3', time: 'Today, 18:30', live: false,
    category: 'eBoxing · HeavyWeight (1 Round, 2 Min)',
    fighterA: { name: 'Fury, Tyson', record: '34-1, 24 KO', flag: '🇬🇧', score: '0' },
    fighterB: { name: 'Wilder, Deontay', record: '43-3, 42 KO', flag: '🇺🇸', score: '0' },
    odds: [
      { key: '1', label: '1', value: 1.10 },
      { key: 'x', label: 'Draw', value: 2.60 },
      { key: '2', label: '2', value: 2.00 }
    ]
  },
  {
    id: 'm4', time: 'Today, 18:30', live: false,
    category: 'Middleweight · Unification (12 Rounds)',
    fighterA: { name: 'Alvarez, Canelo', record: '61-2, 39 KO', flag: '🇲🇽', score: '0' },
    fighterB: { name: 'Golovkin, Gennady', record: '42-2, 37 KO', flag: '🇰🇿', score: '0' },
    odds: [
      { key: '1', label: '1', value: 1.45 },
      { key: 'x', label: 'Draw', value: 13.0 },
      { key: '2', label: '2', value: 2.75 }
    ]
  },
  {
    id: 'm5', time: 'Today, 21:00', live: false,
    category: 'Welterweight · Undisputed (12 Rounds)',
    fighterA: { name: 'Spence Jr, Errol', record: '28-1, 22 KO', flag: '🇺🇸', score: '0' },
    fighterB: { name: 'Crawford, Terence', record: '40-0, 31 KO', flag: '🇺🇸', score: '0' },
    odds: [
      { key: '1', label: '1', value: 2.10 },
      { key: 'x', label: 'Draw', value: 14.0 },
      { key: '2', label: '2', value: 1.72 }
    ]
  },
  {
    id: 'm6', time: 'Today, 21:00', live: false,
    category: 'Bantamweight · Title Defense (12 Rounds)',
    fighterA: { name: 'Inoue, Naoya', record: '27-0, 24 KO', flag: '🇯🇵', score: '0' },
    fighterB: { name: 'Nery, Luis', record: '35-1, 27 KO', flag: '🇲🇽', score: '0' },
    odds: [
      { key: '1', label: '1', value: 1.20 },
      { key: 'x', label: 'Draw', value: 11.0 },
      { key: '2', label: '2', value: 4.50 }
    ]
  },
  {
    id: 'm7', time: 'Tomorrow, 10:00', live: false,
    category: 'Lightweight · Title Bout (12 Rounds)',
    fighterA: { name: 'Garcia, Ryan', record: '24-1, 20 KO', flag: '🇺🇸', score: '0' },
    fighterB: { name: 'Haney, Devin', record: '31-0, 15 KO', flag: '🇺🇸', score: '0' },
    odds: [
      { key: '1', label: '1', value: 2.60 },
      { key: 'x', label: 'Draw', value: 13.0 },
      { key: '2', label: '2', value: 1.50 }
    ]
  },
  {
    id: 'm8', time: 'Tomorrow, 13:15', live: false,
    category: 'Cruiserweight · Title Unification (12 Rounds)',
    fighterA: { name: 'Opetaia, Jai', record: '25-0, 19 KO', flag: '🇦🇺', score: '0' },
    fighterB: { name: 'Briedis, Mairis', record: '28-2, 20 KO', flag: '🇱🇻', score: '0' },
    odds: [
      { key: '1', label: '1', value: 1.55 },
      { key: 'x', label: 'Draw', value: 12.5 },
      { key: '2', label: '2', value: 2.50 }
    ]
  }
]

const totalMatches = computed(() => matches.length)

const groupedByTime = computed(() => {
  const order = []
  const map = new Map()
  for (const match of matches) {
    if (!map.has(match.time)) {
      map.set(match.time, [])
      order.push(match.time)
    }
    map.get(match.time).push(match)
  }
  return order.map((label) => ({ label, matches: map.get(label) }))
})

const visibleGroups = computed(() => {
  return groupedByTime.value
    .map((group) => ({
      label: group.label,
      matches: group.matches.filter((match) => {
        if (activeFilter.value === 'live') return match.live
        if (activeFilter.value === 'today') return group.label.startsWith('Today')
        return true
      })
    }))
    .filter((group) => group.matches.length)
})

// Track which odds button is selected per matchup — mock UI state only.
const selectedOdds = ref({})

function toggleOdds(matchId, optionKey) {
  const current = selectedOdds.value[matchId]
  selectedOdds.value = {
    ...selectedOdds.value,
    [matchId]: current === optionKey ? null : optionKey
  }
}

function isSelected(matchId, optionKey) {
  return selectedOdds.value[matchId] === optionKey
}
</script>
