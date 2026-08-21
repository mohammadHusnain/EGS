<template>
  <DashboardLayout title="Dashboard">
    <div class="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      <!-- Hero banner -->
      <HeroBanner :image="bannerA" alt="Casino dashboard promotion" title="Your Casino Command Center" subtitle="Track wins, explore new releases, and jump back into your favorite tables." />

      <!-- Quick actions -->
      <QuickActions :actions="quickActions" class="sm:max-w-md" />

      <!-- Stat cards -->
      <div class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="glass-card p-4 sm:p-5"
        >
          <div class="flex items-center justify-between">
            <span class="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue-50 text-brand-blue-700 dark:bg-white/10 dark:text-brand-gold-400">
              <AppIcon :name="stat.icon" :size="18" />
            </span>
            <span class="text-xs font-semibold text-emerald-500">{{ stat.change }}</span>
          </div>
          <p class="mt-3 text-xl font-black text-app-primary sm:text-2xl">{{ stat.value }}</p>
          <p class="text-xs text-app-secondary">{{ stat.label }}</p>
        </div>
      </div>

      <!-- Jackpots -->
      <div>
        <div class="mb-3 flex items-end justify-between">
          <div>
            <h2 class="text-base font-bold text-app-primary sm:text-lg">Jackpots</h2>
            <p class="text-xs text-app-secondary">Live progressive pools — climbing every second</p>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="jp in jackpots"
            :key="jp.id"
            class="group relative overflow-hidden rounded-2xl border p-5 shadow-sm"
            :style="{ borderColor: 'var(--border-color)', background: jp.glow }"
          >
            <img
              :src="jp.image"
              :alt="jp.title"
              class="pointer-events-none absolute -right-4 bottom-0 h-40 w-40 object-contain opacity-90 drop-shadow-2xl transition-transform duration-300 group-hover:scale-105 sm:h-48 sm:w-48"
            />
            <div class="relative z-10 max-w-[70%]">
              <span class="inline-flex items-center rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-gold-300">
                {{ jp.badge }}
              </span>
              <p class="mt-3 text-xs font-semibold text-white/70">{{ jp.provider }}</p>
              <p class="text-lg font-black text-white">{{ jp.title }}</p>
              <p class="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/50">Progressive Jackpot</p>
              <p class="mt-2 text-2xl font-black text-brand-gold-300 sm:text-3xl">{{ jp.amount }}</p>
              <p class="mt-1 text-xs font-bold text-emerald-400">{{ jp.trend }}</p>
              <RouterLink
                :to="jp.to"
                class="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-gold-500 px-4 py-2 text-xs font-bold text-brand-blue-950 shadow transition hover:bg-brand-gold-400"
              >
                Play Now
                <AppIcon name="chevronRight" :size="13" />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Popular games -->
      <div>
        <div class="mb-3 flex items-end justify-between">
          <div>
            <h2 class="text-base font-bold text-app-primary sm:text-lg">Popular Games</h2>
            <p class="text-xs text-app-secondary">Top picks this week</p>
          </div>
          <RouterLink to="/casino-lobby" class="text-xs font-bold text-brand-blue-600 hover:underline dark:text-brand-gold-400">
            View All →
          </RouterLink>
        </div>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          <div
            v-for="game in popularGames"
            :key="game.key"
            class="group relative overflow-hidden rounded-2xl border themed-surface shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            :style="{ borderColor: 'var(--border-color)' }"
          >
            <div class="relative flex h-32 items-center justify-center overflow-hidden bg-gradient-to-br sm:h-36" :class="game.gradient">
              <img :src="game.image" :alt="game.title" class="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105" />
              <span
                class="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white shadow"
                :class="game.badgeClass"
              >
                {{ game.badge }}
              </span>
              <button
                type="button"
                class="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white opacity-0 shadow transition-opacity group-hover:opacity-100"
                aria-label="Add to favorites"
              >
                <AppIcon name="gift" :size="13" />
              </button>
            </div>
            <div class="p-3">
              <p class="truncate text-sm font-bold text-app-primary">{{ game.title }}</p>
              <p class="text-xs text-app-secondary">{{ game.provider }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent activity -->
      <div class="rounded-2xl border themed-surface p-4 shadow-sm sm:p-5" :style="{ borderColor: 'var(--border-color)' }">
        <h2 class="mb-3 text-sm font-bold text-app-primary sm:text-base">Recent Activity</h2>
        <ul class="divide-y" :style="{ borderColor: 'var(--border-color)' }">
          <li v-for="row in activity" :key="row.id" class="flex items-center justify-between py-2.5 text-sm">
            <span class="flex items-center gap-2 text-app-primary">
              <AppIcon :name="row.icon" :size="16" class="text-brand-blue-600 dark:text-brand-gold-400" />
              {{ row.text }}
            </span>
            <span class="text-xs text-app-secondary">{{ row.time }}</span>
          </li>
        </ul>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import HeroBanner from '@/components/gaming/HeroBanner.vue'
import bannerA from '@/assets/games/hero_roulette.png'
import QuickActions from '@/components/gaming/QuickActions.vue'
import { hotGames, jackpotGames, slotGames, providers, quickActions } from '@/data/games'

const stats = [
  { label: 'Active Players', value: '12,480', change: '+4.2%', icon: 'user' },
  { label: 'Total Wagers', value: '$382K', change: '+8.9%', icon: 'crown' },
  { label: 'Live Games', value: '146', change: '+1.1%', icon: 'controller' },
  { label: 'Jackpots Won', value: '38', change: '+12%', icon: 'gift' }
]

// Jackpot hero cards — real game art from src/assets/games, no placeholders.
const jackpots = [
  {
    id: 'golden-empire',
    image: hotGames[1].image,
    badge: 'JILI JACKPOT',
    provider: 'JILI GAMES',
    title: 'Golden Empire',
    amount: '$284,912.50',
    trend: '+$3.40/sec avg',
    to: '/slots',
    glow: 'radial-gradient(circle at 80% 30%, rgba(245,158,11,0.35), transparent 60%), var(--surface-alt, #14213a)'
  },
  {
    id: 'fortune-gems',
    image: hotGames[2].image,
    badge: 'FTG JACKPOT',
    provider: 'FTG GAMES',
    title: 'Fortune Gems',
    amount: '$156,340.20',
    trend: '+$1.85/sec avg',
    to: '/slots',
    glow: 'radial-gradient(circle at 80% 30%, rgba(168,85,247,0.35), transparent 60%), var(--surface-alt, #14213a)'
  },
  {
    id: 'super-ace',
    image: hotGames[0].image,
    badge: 'QG JACKPOT',
    provider: 'QORA GAMES',
    title: 'Super Ace',
    amount: '$97,205.75',
    trend: '+$0.92/sec avg',
    to: '/slots',
    glow: 'radial-gradient(circle at 80% 30%, rgba(16,185,129,0.35), transparent 60%), var(--surface-alt, #14213a)'
  }
]

const badgeVariants = [
  { badge: 'HOT', badgeClass: 'bg-red-600' },
  { badge: 'JACKPOT', badgeClass: 'bg-brand-gold-500 !text-brand-blue-950' },
  { badge: 'NEW', badgeClass: 'bg-emerald-600' }
]

const rawPopularGames = [
  ...jackpotGames,
  ...hotGames,
  ...slotGames,
  ...providers
]

const popularGames = rawPopularGames.map((game, i) => ({
  key: `${game.id}-${i}`,
  title: game.title,
  image: game.image,
  gradient: game.gradient,
  provider: game.name || 'EGS Gaming',
  ...badgeVariants[i % badgeVariants.length]
}))

const activity = [
  { id: 1, icon: 'crown', text: 'Player won Golden Empire jackpot', time: '2m ago' },
  { id: 2, icon: 'login', text: 'New player registered', time: '9m ago' },
  { id: 3, icon: 'withdraw', text: 'Withdrawal processed — $420', time: '21m ago' },
  { id: 4, icon: 'fire', text: 'Super Ace trending in Hot section', time: '40m ago' }
]
</script>
