<template>
  <DashboardLayout title="Roulette">
    <!-- Forced light theme (CSS vars pinned locally so shared components like
         BottomNavigation stay light even if the app-wide theme is dark). -->
    <div class="flex min-h-full w-full flex-1 flex-col bg-slate-100 text-slate-900" :style="forcedLightVars">
      <div class="mx-auto w-full max-w-[1600px] flex-1 px-4 pt-4 pb-28 sm:px-6 sm:pt-6 lg:px-8">
        <BackButton class="mt-0" label="Back to Casino" to="/casino-lobby" />

        <!-- Top bar: blue Register link / logo / blue Login pill -->
        <div class="mt-4 flex items-center justify-between rounded-xl bg-white px-3 py-2.5 shadow-sm">
          <button type="button" class="text-xs font-bold text-brand-blue-600 hover:underline">Register</button>
          <LightLogo />
          <button type="button" class="rounded-full bg-brand-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow hover:bg-brand-blue-700">
            Login
          </button>
        </div>

        <div class="pt-3">
          <HeroBanner :image="bannerB" alt="Roulette promotion" title="Roulette, Every Variant" subtitle="European, American, and speed tables — place your bets." />
        </div>

        <!-- Speaker / mute bar -->
        <div class="mt-3 flex items-center gap-2 rounded-lg bg-slate-200/70 px-3.5 py-2 text-slate-500">
          <AppIcon name="sound" :size="15" />
          <p class="truncate text-xs">Welcome to Master System</p>
        </div>

        <!-- Welcome / auth prompt -->
        <div class="mt-3 flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm">
          <p class="text-sm font-semibold text-slate-700">Welcome, Please log in!</p>
          <div class="flex shrink-0 gap-2">
            <button type="button" class="rounded-full bg-brand-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow">Login</button>
            <button type="button" class="rounded-full bg-slate-200 px-3.5 py-1.5 text-xs font-bold text-slate-600">Register</button>
          </div>
        </div>

        <!-- Two-pane: light icon sidebar + tile grid, widened on desktop -->
        <div class="mt-3 flex gap-3 lg:gap-6">
          <nav class="flex w-16 shrink-0 flex-col items-center gap-1 rounded-xl bg-white py-2 shadow-sm lg:w-24">
            <button
              v-for="item in sidebarCategories"
              :key="item.id"
              type="button"
              class="flex w-full flex-col items-center gap-1 rounded-lg px-1 py-2.5 text-[9px] font-semibold transition lg:text-[10px]"
              :class="activeCategory === item.id ? 'bg-brand-blue-50 text-brand-blue-700' : 'text-slate-500 hover:bg-slate-50'"
              @click="activeCategory = item.id"
            >
              <AppIcon :name="item.icon" :size="17" />
              <span class="truncate leading-tight">{{ item.label }}</span>
            </button>
          </nav>

          <main class="min-w-0 flex-1 space-y-6 pb-4">
            <div class="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              <button
                v-for="tile in lightProviderTiles"
                :key="tile.id"
                type="button"
                class="group relative flex h-32 flex-col overflow-hidden rounded-xl bg-white text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:h-36"
                @click="openTile(tile)"
              >
                <span v-if="tile.ribbon" class="absolute right-0 top-0 z-10 rounded-bl-lg bg-red-500 px-1.5 py-0.5 text-[8px] font-bold text-white">{{ tile.ribbon }}</span>
                <img v-if="tile.image" :src="tile.image" :alt="tile.title" class="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105" />
                <span v-else class="flex h-full w-full items-center justify-center bg-brand-blue-50 text-brand-blue-600">
                  <AppIcon name="slots" :size="22" />
                </span>
                <p class="absolute inset-x-0 bottom-0 truncate border-t border-white/40 bg-white/70 px-2 py-1 text-[10px] font-bold text-slate-800 backdrop-blur-sm lg:text-xs">{{ tile.title }}</p>
              </button>
            </div>

            <!-- Wide-screen filler: reuse the full game catalog so the desktop
                 grid isn't just a stretched sidebar on large screens. -->
            <div>
              <LightSectionHeading title="More Games" icon="fire" />
              <div class="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <button
                  v-for="game in allGames"
                  :key="`more-${game.id}`"
                  type="button"
                  class="group relative flex h-32 flex-col overflow-hidden rounded-xl bg-white text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:h-36"
                  @click="openTile(game)"
                >
                  <img v-if="game.image" :src="game.image" :alt="game.title" class="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105" />
                  <p class="absolute inset-x-0 bottom-0 truncate border-t border-white/40 bg-white/70 px-2 py-1 text-[10px] font-bold text-slate-800 backdrop-blur-sm lg:text-xs">{{ game.title }}</p>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      <BottomNavigation :items="bottomNavC" v-model:active="activeBottom" />
    </div>
  </DashboardLayout>
</template>

<script setup>
import { h, ref } from 'vue'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import BackButton from '@/components/common/BackButton.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import HeroBanner from '@/components/gaming/HeroBanner.vue'
import bannerB from '@/assets/games/hero_roulette.png'
import BottomNavigation from '@/components/navigation/BottomNavigation.vue'
import egsLogo from '@/assets/brand/egs-logo.png'
import { sidebarCategories, lightProviderTiles, allGames, bottomNavC } from '@/data/games'

const activeCategory = ref('slots')
const activeBottom = ref('home')

const forcedLightVars = {
  '--bg-app': '#f4f7ff',
  '--bg-surface': '#ffffff',
  '--bg-header': '#1642c4',
  '--bg-nav': '#0f2570',
  '--text-primary': '#0a1a4d',
  '--text-secondary': '#5b6b9a',
  '--border-color': '#e3e9fb',
  '--card-shadow': '0 4px 14px rgba(10, 26, 77, 0.1)'
}

// Logo mark styled for the light screens (dark wordmark instead of white).
const LightLogo = {
  setup() {
    return () =>
      h('div', { class: 'flex select-none items-center gap-2' }, [
        h('div', { class: 'flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue-50 shadow-sm sm:h-9 sm:w-9' }, [
          h('img', { src: egsLogo, alt: 'EGS logo', class: 'h-5 w-5 object-contain sm:h-6 sm:w-6' })
        ]),
        h('div', { class: 'leading-none' }, [
          h('p', { class: 'text-sm font-extrabold tracking-wide text-slate-900 sm:text-base' }, 'EGS'),
          h('p', { class: '-mt-0.5 text-[10px] font-semibold tracking-[0.2em] text-brand-blue-600 sm:text-xs' }, 'GAMING')
        ])
      ])
  }
}

// Section heading styled for the light screens.
const LightSectionHeading = {
  props: { title: String, icon: String },
  setup(props) {
    return () =>
      h('div', { class: 'mb-3 flex items-center gap-2' }, [
        h('span', { class: 'text-red-500' }, [h(AppIcon, { name: props.icon, size: 18 })]),
        h('h2', { class: 'text-sm font-bold uppercase tracking-wide text-slate-800 sm:text-base' }, props.title)
      ])
  }
}

function openTile(tile) {
  console.info('Opening provider tile (mock):', tile.title)
}
</script>
