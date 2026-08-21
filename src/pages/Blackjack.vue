<template>
  <DashboardLayout title="Blackjack">
    <!-- Forced dark theme, matching the fixed dark reference screenshot. -->
    <div class="dark min-h-full w-full flex-1 bg-brand-blue-950 pb-28">
      <div class="mx-auto max-w-[1600px] px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <BackButton />

        <!-- Top bar: gold Register (left) / logo / gray Login (right) -->
        <div class="mt-4 flex items-center justify-between rounded-xl bg-brand-blue-900/70 px-3 py-2.5 shadow-md">
          <button type="button" class="rounded-lg bg-brand-gold-500 px-3.5 py-1.5 text-xs font-bold text-brand-blue-950 shadow hover:bg-brand-gold-400">
            Register
          </button>
          <Logo />
          <button type="button" class="rounded-lg bg-white/15 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-white/25">
            Login
          </button>
        </div>

        <!-- Announcement / search bar -->
        <div class="mt-3 flex items-center justify-between rounded-xl bg-brand-blue-900/60 px-3.5 py-2.5 text-white/80">
          <div class="flex min-w-0 items-center gap-2">
            <AppIcon name="sound" :size="15" class="shrink-0 text-brand-gold-400" />
            <p class="truncate text-xs">Welcome to Master System — new players get a 100% bonus!</p>
          </div>
          <AppIcon name="flag" :size="15" class="shrink-0 text-white/60" />
        </div>

        <div class="pt-3">
          <HeroBanner :image="bannerA" alt="Blackjack promotion" title="Classic Blackjack Tables" subtitle="Beat the dealer live or practice your strategy at your own pace." />
        </div>

        <div class="pt-3 sm:max-w-md">
          <QuickActionsDark :actions="quickActions" />
        </div>

        <!-- Two-pane: icon sidebar + provider panel list, widened on desktop -->
        <div class="mt-3 flex gap-3 pb-4 lg:gap-6">
          <nav class="flex w-16 shrink-0 flex-col items-center gap-1 rounded-xl bg-brand-blue-900/50 py-2 lg:w-24">
            <button
              v-for="item in sidebarCategories"
              :key="item.id"
              type="button"
              class="flex w-full flex-col items-center gap-1 rounded-lg px-1 py-2.5 text-[9px] font-semibold transition lg:text-[10px]"
              :class="activeCategory === item.id ? 'bg-brand-gold-500 text-brand-blue-950' : 'text-white/65 hover:bg-white/10 hover:text-white'"
              @click="activeCategory = item.id"
            >
              <AppIcon :name="item.icon" :size="17" />
              <span class="truncate leading-tight">{{ item.label }}</span>
            </button>
          </nav>

          <main class="min-w-0 flex-1 space-y-6">
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <button
                v-for="provider in providers"
                :key="provider.id"
                type="button"
                class="group relative flex h-28 w-full items-center overflow-hidden rounded-2xl text-left shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                @click="openProvider(provider)"
              >
                <div class="absolute inset-0 bg-gradient-to-br" :class="provider.gradient" />
                <img
                  v-if="provider.image"
                  :src="provider.image"
                  :alt="provider.title"
                  loading="lazy"
                  class="relative z-10 ml-auto h-full object-contain py-2 pr-3 transition-transform duration-300 group-hover:scale-105"
                />
                <div class="absolute inset-y-0 left-0 z-10 flex w-3/5 flex-col justify-center p-4">
                  <p class="text-[10px] font-bold uppercase tracking-widest text-white/70">{{ provider.name }}</p>
                  <p class="mt-1 text-lg font-black text-white drop-shadow">{{ provider.title }}</p>
                </div>
              </button>
            </div>

            <!-- Wide-screen filler: table game catalog reusing existing card
                 art so the desktop layout isn't just a stretched sidebar. -->
            <div>
              <DarkSectionHeading title="More Table Games" icon="fire" />
              <div class="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                <GameCard v-for="game in allGames" :key="game.id" :game="game" @play="openProvider" />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>

    <BottomNavigation :items="bottomNavB" v-model:active="activeBottom" />
  </DashboardLayout>
</template>

<script setup>
import { h, ref } from 'vue'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import BackButton from '@/components/common/BackButton.vue'
import Logo from '@/components/common/Logo.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import HeroBanner from '@/components/gaming/HeroBanner.vue'
import bannerA from '@/assets/games/hero_sweet_rush.png'
import GameCard from '@/components/gaming/GameCard.vue'
import BottomNavigation from '@/components/navigation/BottomNavigation.vue'
import { sidebarCategories, providers, allGames, bottomNavB, quickActions } from '@/data/games'

const activeCategory = ref('slots')
const activeBottom = ref('login')

// Section heading styled for the always-dark screen.
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

// Quick action row styled for the always-dark screen.
const QuickActionsDark = {
  props: { actions: Array },
  setup(props) {
    return () =>
      h(
        'div',
        { class: 'grid grid-cols-3 gap-2.5' },
        props.actions.map((action) =>
          h(
            'div',
            { key: action.id, class: 'flex flex-col items-center gap-1.5 rounded-xl bg-brand-blue-900/50 py-3 text-white' },
            [
              h('span', { class: 'flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-brand-gold-400' }, [
                h(AppIcon, { name: action.icon, size: 18 })
              ]),
              h('span', { class: 'text-[11px] font-semibold' }, action.label)
            ]
          )
        )
      )
  }
}

function openProvider(provider) {
  console.info('Opening provider (mock):', provider.title)
}
</script>
