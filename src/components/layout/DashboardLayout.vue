<template>
  <div class="flex h-screen w-full flex-col overflow-hidden" style="background-color: var(--bg-app)">
    <!-- Top navbar -->
    <header
      class="relative z-40 flex h-16 shrink-0 items-center gap-3 border-b border-white/10 bg-brand-blue-950/75 px-4 shadow-sm backdrop-blur-xl sm:px-6"
      :style="{ borderColor: 'var(--border-color)' }"
    >
      <!-- Logo -->
      <RouterLink to="/dashboard" class="flex shrink-0 items-center gap-2">
        <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow">
          <img :src="egsLogo" alt="EGS logo" class="h-5 w-5 object-contain" />
        </div>
        <div class="hidden leading-none sm:block">
          <p class="text-sm font-extrabold tracking-wide text-white">EGS</p>
          <p class="-mt-0.5 text-[10px] font-semibold tracking-[0.2em] text-brand-gold-400">GAMING</p>
        </div>
      </RouterLink>

      <!-- Center pill nav (desktop) -->
      <nav class="hidden flex-1 items-center justify-center gap-1 overflow-x-auto lg:flex">
        <RouterLink
          v-for="item in navItems"
          :key="item.id"
          :to="item.route"
          class="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition"
          :class="isActive(item.route)
            ? 'glass-card !border-brand-gold-400/40 bg-brand-gold-500/90 text-brand-blue-950 shadow backdrop-blur-md'
            : 'text-white/75 hover:bg-white/10 hover:text-white'"
        >
          <AppIcon :name="item.icon" :size="15" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>

      <!-- Mobile hamburger -->
      <button
        type="button"
        class="flex h-9 w-9 items-center justify-center rounded-lg text-white/80 hover:bg-white/10 lg:hidden"
        aria-label="Open menu"
        @click="mobileOpen = true"
      >
        <AppIcon name="menu" :size="20" />
      </button>

      <!-- Right cluster -->
      <div class="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
        <div class="hidden items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white sm:flex">
          <AppIcon name="crown" :size="14" class="text-brand-gold-400" />
          <span>$128,450.00</span>
          <button type="button" class="flex h-5 w-5 items-center justify-center rounded-full text-white/60 hover:text-white" aria-label="Refresh balance">
            <AppIcon name="transfer" :size="12" />
          </button>
        </div>

        <RouterLink
          to="/rewards"
          class="btn-glossy hidden shrink-0 px-3.5 py-1.5 text-xs font-bold sm:block"
        >
          Deposit
        </RouterLink>

        <button type="button" class="relative flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:bg-white/10" aria-label="Notifications">
          <AppIcon name="bell" :size="18" />
          <span class="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-brand-blue-950" />
        </button>

        <ThemeSwitcher />

        <div class="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue-600 text-sm font-bold text-white">
          A
        </div>
      </div>
    </header>

    <!-- Mobile nav drawer -->
    <transition name="fade-slide">
      <div v-if="mobileOpen" class="fixed inset-0 z-50 lg:hidden">
        <div class="absolute inset-0 bg-black/50" @click="mobileOpen = false" />
        <div class="themed-nav absolute inset-x-0 top-0 flex max-h-[85vh] flex-col gap-1 overflow-y-auto border-b p-3 shadow-xl" :style="{ borderColor: 'var(--border-color)' }">
          <div class="mb-1 flex items-center justify-between px-1">
            <span class="text-xs font-bold uppercase tracking-wide text-white/50">Menu</span>
            <button type="button" class="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 hover:bg-white/10" aria-label="Close menu" @click="mobileOpen = false">
              <AppIcon name="chevronDown" :size="18" />
            </button>
          </div>
          <RouterLink
            v-for="item in navItems"
            :key="item.id"
            :to="item.route"
            class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition"
            :class="isActive(item.route)
              ? 'glass-card !border-brand-gold-400/40 bg-brand-gold-500/90 text-brand-blue-950 shadow'
              : 'text-white/75 hover:bg-white/10 hover:text-white'"
            @click="mobileOpen = false"
          >
            <AppIcon :name="item.icon" :size="18" />
            <span>{{ item.label }}</span>
          </RouterLink>
          <button
            type="button"
            class="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/75 transition hover:bg-red-500/15 hover:text-red-300"
            @click="handleLogout"
          >
            <AppIcon name="logout" :size="18" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </transition>

    <main ref="mainRef" class="min-w-0 flex-1 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppIcon from '../common/AppIcon.vue'
import ThemeSwitcher from '../common/ThemeSwitcher.vue'
import egsLogo from '@/assets/brand/egs-logo.png'
import { useAuthStore } from '@/store/auth'
import { useLenis } from '@/composables/useLenis'

defineProps({
  title: { type: String, default: 'Dashboard' }
})

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const mobileOpen = ref(false)
const mainRef = ref(null)

useLenis(mainRef)

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
