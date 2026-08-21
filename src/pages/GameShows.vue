<template>
  <DashboardLayout title="Game Shows">
    <!-- Forced light theme (CSS vars pinned locally, see Roulette.vue). -->
    <div class="flex min-h-full w-full flex-1 flex-col bg-slate-100 text-slate-900" :style="forcedLightVars">
      <div class="mx-auto w-full max-w-[1600px] flex-1 px-4 pt-4 pb-28 sm:px-6 sm:pt-6 lg:px-8">
        <BackButton class="mt-0" label="Back to Game Shows" to="/dashboard" />

        <!-- Top bar: plain text links, no pills -->
        <div class="mt-4 flex items-center justify-between px-1 py-2.5">
          <button type="button" class="text-sm font-bold text-brand-blue-600 hover:underline">Register</button>
          <LightLogo />
          <button type="button" class="text-sm font-bold text-brand-blue-600 hover:underline">Login</button>
        </div>

        <!-- Bell / chat thin bar -->
        <div class="flex items-center justify-between rounded-lg bg-white px-3.5 py-2 shadow-sm">
          <AppIcon name="bell" :size="17" class="text-slate-500" />
          <AppIcon name="chat" :size="17" class="text-slate-500" />
        </div>

        <div class="pt-3">
          <HeroBanner :image="bannerA" alt="Game shows promotion" title="Interactive Game Shows" subtitle="Live hosts, big prizes, and real-time play with the crowd." />
        </div>

        <!-- Quick action tiles -->
        <div class="grid grid-cols-3 gap-2.5 pt-3 sm:max-w-md">
          <div
            v-for="action in quickActionsLight"
            :key="action.id"
            class="flex flex-col items-center gap-1.5 rounded-xl bg-white py-3 text-slate-700 shadow-sm"
          >
            <span class="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue-50 text-brand-blue-600">
              <AppIcon :name="action.icon" :size="18" />
            </span>
            <span class="text-[11px] font-semibold">{{ action.label }}</span>
          </div>
        </div>

        <div class="pt-5 lg:flex lg:items-start lg:gap-6">
          <main class="min-w-0 flex-1">
            <!-- Hot section -->
            <div class="mb-3 flex items-center gap-2">
              <span class="text-red-500"><AppIcon name="fire" :size="18" /></span>
              <h2 class="text-sm font-bold uppercase tracking-wide text-slate-800">Hot</h2>
            </div>
            <div class="grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-4">
              <button
                type="button"
                class="group relative col-span-2 flex h-32 overflow-hidden rounded-2xl bg-gradient-to-br text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:h-36"
                :class="homeLightHotGames[0].gradient"
                @click="openGame(homeLightHotGames[0])"
              >
                <img :src="homeLightHotGames[0].image" :alt="homeLightHotGames[0].title" class="absolute inset-0 h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105" />
                <div class="absolute inset-x-0 bottom-0 border-t border-white/30 bg-white/15 px-3 py-1.5 backdrop-blur-sm">
                  <p class="truncate text-xs font-bold text-white drop-shadow">{{ homeLightHotGames[0].title }}</p>
                </div>
              </button>
              <button
                v-for="game in homeLightHotGames.slice(1)"
                :key="game.id"
                type="button"
                class="group relative flex h-32 overflow-hidden rounded-2xl bg-gradient-to-br text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:h-36"
                :class="game.gradient"
                @click="openGame(game)"
              >
                <img :src="game.image" :alt="game.title" class="absolute inset-0 h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105" />
                <div class="absolute inset-x-0 bottom-0 border-t border-white/30 bg-white/15 px-2 py-1 backdrop-blur-sm">
                  <p class="truncate text-xs font-bold text-white drop-shadow">{{ game.title }}</p>
                </div>
              </button>
            </div>
            <div class="mt-3 flex justify-center gap-1.5">
              <span v-for="n in 3" :key="n" class="h-1.5 rounded-full bg-slate-300 transition-all" :class="n === 1 ? 'w-4 bg-brand-blue-600' : 'w-1.5'" />
            </div>

            <!-- Half-width promo cards -->
            <div class="grid grid-cols-2 gap-2.5 pt-4 sm:grid-cols-4">
              <PromoTile title="Slots" icon="slots" gradient="from-amber-400 via-orange-500 to-red-600" />
              <PromoTile title="LiveCasino" icon="live" gradient="from-rose-500 via-pink-600 to-fuchsia-700" />
              <PromoTile title="Play For Fun" icon="controller" gradient="from-sky-500 via-blue-600 to-indigo-700" />
              <PromoTile title="Fish" icon="fish" gradient="from-teal-500 via-cyan-600 to-blue-700" />
            </div>

            <!-- Wide-screen filler: reuse the full game catalog beneath the
                 promo tiles so the desktop layout uses the extra width. -->
            <div class="pt-6">
              <div class="mb-3 flex items-center gap-2">
                <span class="text-brand-blue-600"><AppIcon name="controller" :size="18" /></span>
                <h2 class="text-sm font-bold uppercase tracking-wide text-slate-800">More Games</h2>
              </div>
              <div class="grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-4">
                <button
                  v-for="game in allGames"
                  :key="`more-${game.id}`"
                  type="button"
                  class="group relative flex h-32 overflow-hidden rounded-2xl bg-gradient-to-br text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:h-36"
                  :class="game.gradient"
                  @click="openGame(game)"
                >
                  <img :src="game.image" :alt="game.title" class="absolute inset-0 h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105" />
                  <div class="absolute inset-x-0 bottom-0 border-t border-white/30 bg-white/15 px-2 py-1 backdrop-blur-sm">
                    <p class="truncate text-xs font-bold text-white drop-shadow">{{ game.title }}</p>
                  </div>
                </button>
              </div>
            </div>
          </main>

          <!-- Desktop-only right rail: live providers panel to fill extra width. -->
          <aside class="mt-6 hidden shrink-0 space-y-4 lg:mt-0 lg:block lg:w-72">
            <div class="rounded-2xl bg-white p-4 shadow-sm">
              <div class="mb-3 flex items-center gap-2">
                <span class="text-brand-blue-600"><AppIcon name="crown" :size="18" /></span>
                <h2 class="text-sm font-bold uppercase tracking-wide text-slate-800">Top Providers</h2>
              </div>
              <div class="space-y-2.5">
                <button
                  v-for="provider in providers"
                  :key="provider.id"
                  type="button"
                  class="group relative flex h-16 w-full items-center overflow-hidden rounded-xl text-left shadow transition hover:-translate-y-0.5 hover:shadow-lg"
                  @click="openGame(provider)"
                >
                  <div class="absolute inset-0 bg-gradient-to-br" :class="provider.gradient" />
                  <img v-if="provider.image" :src="provider.image" :alt="provider.title" class="relative z-10 ml-auto h-full object-contain py-1.5 pr-2" />
                  <div class="absolute inset-y-0 left-0 z-10 flex w-3/5 flex-col justify-center px-3">
                    <p class="text-[9px] font-bold uppercase tracking-widest text-white/70">{{ provider.name }}</p>
                    <p class="truncate text-xs font-black text-white drop-shadow">{{ provider.title }}</p>
                  </div>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <BottomNavigation :items="bottomNavD" v-model:active="activeBottom" />
    </div>
  </DashboardLayout>
</template>

<script setup>
import { h, ref } from 'vue'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import BackButton from '@/components/common/BackButton.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import HeroBanner from '@/components/gaming/HeroBanner.vue'
import bannerA from '@/assets/games/hero_ice_fishing.png'
import BottomNavigation from '@/components/navigation/BottomNavigation.vue'
import egsLogo from '@/assets/brand/egs-logo.png'
import { quickActionsLight, homeLightHotGames, allGames, providers, bottomNavD } from '@/data/games'

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

// No real character art for these placeholder promo tiles (Slots /
// LiveCasino / Play For Fun / Fish) — styled gradient + icon card instead of
// a fabricated image, per the "no invented provider art" constraint.
const PromoTile = {
  props: { title: String, icon: String, gradient: String },
  setup(props) {
    return () =>
      h(
        'div',
        { class: `group relative flex h-28 items-end overflow-hidden rounded-2xl bg-gradient-to-br p-3 shadow-sm ${props.gradient}` },
        [
          h(AppIcon, { name: props.icon, size: 34, class: 'absolute right-3 top-3 text-white/25' }),
          h('p', { class: 'text-sm font-bold text-white drop-shadow' }, props.title)
        ]
      )
  }
}

function openGame(game) {
  console.info('Launching game (mock):', game.title)
}
</script>
