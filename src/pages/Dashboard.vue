<template>
  <DashboardLayout title="Dashboard">
    <div class="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      <!-- Stat cards -->
      <div class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="rounded-2xl border themed-surface p-4 shadow-sm sm:p-5"
          :style="{ borderColor: 'var(--border-color)' }"
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

      <!-- Quick links -->
      <div class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <RouterLink
          v-for="link in quickLinks"
          :key="link.to"
          :to="link.to"
          class="group overflow-hidden rounded-2xl border themed-surface shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          :style="{ borderColor: 'var(--border-color)' }"
        >
          <div class="relative flex h-28 items-center justify-center sm:h-32" :class="link.gradient">
            <span class="text-4xl">{{ link.emoji }}</span>
            <span class="absolute right-2 top-2 rounded-full bg-black/30 p-1.5 opacity-0 shadow transition-opacity group-hover:opacity-100">
              <AppIcon name="chevronRight" :size="14" class="text-white" />
            </span>
          </div>
          <div class="p-3">
            <p class="text-sm font-bold text-app-primary">{{ link.title }}</p>
            <p class="text-xs text-app-secondary">{{ link.desc }}</p>
          </div>
        </RouterLink>
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

const stats = [
  { label: 'Active Players', value: '12,480', change: '+4.2%', icon: 'user' },
  { label: 'Total Wagers', value: '$382K', change: '+8.9%', icon: 'crown' },
  { label: 'Live Games', value: '146', change: '+1.1%', icon: 'controller' },
  { label: 'Jackpots Won', value: '38', change: '+12%', icon: 'gift' }
]

const quickLinks = [
  { to: '/slots', emoji: '🎰', title: 'Slots', desc: 'Sweet Rush Bonanza', gradient: 'bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-emerald-700' },
  { to: '/blackjack', emoji: '🃏', title: 'Blackjack', desc: 'Live dealer table', gradient: 'bg-gradient-to-br from-indigo-800 via-brand-blue-700 to-purple-800' },
  { to: '/roulette', emoji: '🎡', title: 'Roulette', desc: 'American Roulette', gradient: 'bg-gradient-to-br from-red-800 via-brand-blue-800 to-brand-blue-900' },
  { to: '/game-shows', emoji: '🐟', title: 'Game Shows', desc: 'Ice Fishing', gradient: 'bg-gradient-to-br from-cyan-800 via-brand-blue-700 to-brand-blue-900' },
  { to: '/sportsbook', emoji: '🥊', title: 'Sportsbook', desc: 'Boxing odds', gradient: 'bg-gradient-to-br from-amber-800 via-brand-blue-800 to-brand-blue-900' },
  { to: '/rewards', emoji: '🏆', title: 'Rewards', desc: 'VIP rank progress', gradient: 'bg-gradient-to-br from-brand-gold-600 via-brand-blue-800 to-brand-blue-900' },
  { to: '/casino-lobby', emoji: '🏠', title: 'Casino Lobby', desc: 'Hot, Jackpot & Slots', gradient: 'bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-emerald-700' },
  { to: '/game-providers', emoji: '🕹️', title: 'Game Providers', desc: 'Providers & categories', gradient: 'bg-gradient-to-br from-indigo-800 via-brand-blue-700 to-purple-800' }
]

const activity = [
  { id: 1, icon: 'crown', text: 'Player won Golden Empire jackpot', time: '2m ago' },
  { id: 2, icon: 'login', text: 'New player registered', time: '9m ago' },
  { id: 3, icon: 'withdraw', text: 'Withdrawal processed — $420', time: '21m ago' },
  { id: 4, icon: 'fire', text: 'Super Ace trending in Hot section', time: '40m ago' }
]
</script>
