<template>
  <DashboardLayout title="Slots">
    <!-- Forced dark theme: this screen always renders dark regardless of the
         app-wide theme toggle, matching the fixed dark reference screenshot. -->
    <div class="dark min-h-full w-full flex-1 bg-brand-blue-950 pb-24">
      <div class="mx-auto max-w-[1600px] px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <BackButton label="Back to Lobby" to="/casino-lobby" />

        <!-- Top bar: hamburger + centered logo pill -->
        <div class="mt-4 flex items-center justify-between rounded-xl bg-brand-blue-900/70 px-3 py-2.5 shadow-md">
          <button type="button" class="flex h-9 w-9 items-center justify-center rounded-lg text-white/85 hover:bg-white/10" aria-label="Open menu">
            <AppIcon name="menu" :size="20" />
          </button>
          <Logo />
          <span class="w-9" />
        </div>

        <!-- Login / Register tabs, gold underline on active -->
        <div class="mt-3 flex items-center justify-center gap-8 border-b border-white/10 pb-0">
          <button
            type="button"
            class="relative pb-2.5 text-sm font-bold transition"
            :class="authTab === 'login' ? 'text-white' : 'text-white/50 hover:text-white/80'"
            @click="authTab = 'login'"
          >
            Login
            <span v-if="authTab === 'login'" class="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand-gold-500" />
          </button>
          <button
            type="button"
            class="relative pb-2.5 text-sm font-bold transition"
            :class="authTab === 'register' ? 'text-white' : 'text-white/50 hover:text-white/80'"
            @click="authTab = 'register'"
          >
            Register
            <span v-if="authTab === 'register'" class="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand-gold-500" />
          </button>
        </div>

        <div class="pt-3">
          <HeroBanner :image="bannerB" alt="Slots promotion" title="Spin Into Big Wins" subtitle="Hundreds of slot titles from top studios, updated daily." />
        </div>

        <!-- Category pill row -->
        <div class="mt-3">
          <div class="flex items-center gap-2 overflow-x-auto rounded-xl bg-brand-blue-900/60 px-2 py-2.5 lg:flex-wrap lg:overflow-visible">
            <button
              v-for="item in categoryNav"
              :key="item.id"
              type="button"
              class="flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition"
              :class="activeCategory === item.id ? 'bg-brand-gold-500 text-brand-blue-950 shadow' : 'text-white/70 hover:bg-white/10 hover:text-white'"
              @click="activeCategory = item.id"
            >
              <AppIcon :name="item.icon" :size="14" />
              {{ item.label }}
            </button>
          </div>
        </div>

        <div class="pt-4 pb-4 lg:flex lg:items-start lg:gap-6">
          <main class="min-w-0 flex-1">
            <DarkSectionHeading title="Hot" icon="fire" />
            <div class="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              <GameCard v-for="game in hotGames" :key="game.id" :game="game" @play="openGame" />
            </div>

            <DarkSectionHeading title="Jackpot" icon="crown" class="mt-6" />
            <div class="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              <GameCard v-for="(game, i) in jackpotDisplay" :key="game.id" :game="game" @play="openGame" />
            </div>

            <DarkSectionHeading title="Slots" icon="slots" class="mt-6" />
            <div class="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              <GameCard v-for="game in slotGames" :key="game.id" :game="game" :show-title="false" @play="openGame" />
            </div>

            <!-- Wide-screen filler: reuse the full game catalog again so the
                 desktop grid doesn't trail off into empty space. -->
            <DarkSectionHeading title="More Games" icon="controller" class="mt-6" />
            <div class="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              <GameCard v-for="game in allGames" :key="`more-${game.id}`" :game="game" @play="openGame" />
            </div>
          </main>

          <!-- Desktop-only right rail: fills the extra width with providers
               and a live jackpot ticker built from real data already used above. -->
          <aside class="mt-6 hidden shrink-0 space-y-4 lg:mt-0 lg:block lg:w-72">
            <div class="rounded-2xl bg-brand-blue-900/50 p-4">
              <DarkSectionHeading title="Top Providers" icon="crown" />
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

            <div class="rounded-2xl bg-brand-blue-900/50 p-4">
              <DarkSectionHeading title="Jackpot Ticker" icon="gift" />
              <ul class="space-y-2.5">
                <li
                  v-for="(game, i) in jackpotDisplay"
                  :key="`ticker-${game.id}`"
                  class="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2"
                >
                  <span class="truncate text-xs font-semibold text-white/85">{{ game.title }}</span>
                  <span class="shrink-0 text-xs font-black text-brand-gold-400">{{ jackpotAmounts[i] }}</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>

    <BottomNavigation :items="bottomNavA" v-model:active="activeBottom" />
  </DashboardLayout>
</template>

<script setup>
import { computed, h, ref } from 'vue'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import BackButton from '@/components/common/BackButton.vue'
import Logo from '@/components/common/Logo.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import HeroBanner from '@/components/gaming/HeroBanner.vue'
import bannerB from '@/assets/games/hero_ice_fishing.png'
import GameCard from '@/components/gaming/GameCard.vue'
import BottomNavigation from '@/components/navigation/BottomNavigation.vue'
import { categoryNav, hotGames, jackpotGames, slotGames, allGames, providers, jackpotAmounts, bottomNavA } from '@/data/games'

const authTab = ref('login')
const activeCategory = ref('home')
const activeBottom = ref('home')

// Section heading styled for the always-dark screen (independent of the
// global light/dark theme toggle), so it stays legible either way.
const DarkSectionHeading = {
  props: { title: String, icon: String },
  setup(props) {
    return () =>
      h('div', { class: 'mb-3 flex items-center gap-2' }, [
        h(AppIcon, { name: props.icon, size: 18, class: 'text-brand-gold-400' }),
        h('h2', { class: 'text-sm font-bold uppercase tracking-wide text-white sm:text-base' }, props.title)
      ])
  }
}

const jackpotDisplay = computed(() =>
  jackpotGames.map((game, i) => ({ ...game, badge: jackpotAmounts[i] || game.badge }))
)

function openGame(game) {
  console.info('Launching game (mock):', game.title)
}
</script>
