<template>
  <aside
    class="themed-nav flex h-full flex-col border-r transition-all duration-200"
    :class="collapsed ? 'w-[76px]' : 'w-64'"
    :style="{ borderColor: 'var(--border-color)' }"
  >
    <div class="flex h-16 items-center gap-2 border-b border-white/10 px-4">
      <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow">
        <img :src="egsLogo" alt="EGS logo" class="h-5 w-5 object-contain" />
      </div>
      <div v-if="!collapsed" class="leading-none">
        <p class="text-sm font-extrabold tracking-wide text-white">EGS</p>
        <p class="-mt-0.5 text-[10px] font-semibold tracking-[0.2em] text-brand-gold-400">GAMING</p>
      </div>
      <button
        type="button"
        class="ml-auto hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-white lg:flex"
        aria-label="Collapse sidebar"
        @click="$emit('toggle')"
      >
        <AppIcon :name="collapsed ? 'chevronRight' : 'menu'" :size="16" />
      </button>
    </div>

    <nav class="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
      <RouterLink
        v-for="item in navItems"
        :key="item.id"
        :to="item.route"
        class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition"
        :class="isActive(item.route)
          ? 'bg-brand-gold-500 text-brand-blue-950 shadow'
          : 'text-white/75 hover:bg-white/10 hover:text-white'"
      >
        <AppIcon :name="item.icon" :size="18" />
        <span v-if="!collapsed">{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="border-t border-white/10 p-3">
      <button
        type="button"
        class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/75 transition hover:bg-red-500/15 hover:text-red-300"
        @click="handleLogout"
      >
        <AppIcon name="logout" :size="18" />
        <span v-if="!collapsed">Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import AppIcon from '../common/AppIcon.vue'
import egsLogo from '@/assets/brand/egs-logo.png'
import { useAuthStore } from '@/store/auth'

defineProps({
  collapsed: { type: Boolean, default: false }
})
defineEmits(['toggle'])

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
  { id: 'slots', label: 'Slots', icon: 'slots', route: '/slots' },
  { id: 'blackjack', label: 'Blackjack', icon: 'crown', route: '/blackjack' },
  { id: 'roulette', label: 'Roulette', icon: 'live', route: '/roulette' },
  { id: 'game-shows', label: 'Game Shows', icon: 'fish', route: '/game-shows' },
  { id: 'sportsbook', label: 'Sportsbook', icon: 'sports', route: '/sportsbook' },
  { id: 'rewards', label: 'Rewards', icon: 'gift', route: '/rewards' },
  { id: 'casino-lobby', label: 'Casino Lobby', icon: 'fire', route: '/casino-lobby' },
  { id: 'game-providers', label: 'Game Providers', icon: 'controller', route: '/game-providers' }
]

function isActive(path) {
  return route.path === path
}

function handleLogout() {
  auth.logout()
  router.push({ name: 'Login' })
}
</script>
