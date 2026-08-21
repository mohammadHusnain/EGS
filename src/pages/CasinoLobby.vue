<template>
  <DashboardLayout title="Casino Lobby">
    <div class="mx-auto max-w-[1600px] space-y-4 p-4 pb-24 sm:p-6 lg:p-8">
      <BackButton />

      <AppHeader variant="a" />
      <AuthTabs v-model:active="authTab" class="rounded-xl sm:max-w-md" />

      <HeroBanner :image="bannerB" alt="Casino lobby promotion" title="The Full Casino Floor" subtitle="Every table, every provider, all in one lobby." />

      <div class="themed-surface -mx-4 border-y px-4 sm:mx-0 sm:rounded-xl sm:border" :style="{ borderColor: 'var(--border-color)' }">
        <CategoryNav :items="categoryNav" v-model:active="activeCategory" />
      </div>

      <div class="pb-4">
        <GameSection title="Hot" icon="fire" :games="hotGames" @play="openGame" />
        <GameSection title="Jackpot" icon="crown" :games="jackpotGames" @play="openGame" />
        <GameSection title="Slots" icon="slots" :games="slotGames" @play="openGame" />
        <GameSection title="Providers" icon="controller" :games="providers" @play="openGame" />
        <GameSection title="More Games" icon="gift" :games="allGames" @play="openGame" />
      </div>
    </div>

    <BottomNavigation :items="bottomNavA" v-model:active="activeBottom" />
  </DashboardLayout>
</template>

<script setup>
import { ref } from 'vue'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import BackButton from '@/components/common/BackButton.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AuthTabs from '@/components/navigation/AuthTabs.vue'
import HeroBanner from '@/components/gaming/HeroBanner.vue'
import bannerB from '@/assets/games/hero_ice_fishing.png'
import CategoryNav from '@/components/navigation/CategoryNav.vue'
import GameSection from '@/components/gaming/GameSection.vue'
import BottomNavigation from '@/components/navigation/BottomNavigation.vue'
import { categoryNav, hotGames, jackpotGames, slotGames, providers, allGames, bottomNavA } from '@/data/games'

const authTab = ref('login')
const activeCategory = ref('home')
const activeBottom = ref('home')

function openGame(game) {
  // Mock interaction only — no real gaming logic in this build.
  console.info('Launching game (mock):', game.title)
}
</script>
