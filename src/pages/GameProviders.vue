<template>
  <DashboardLayout title="Game Providers">
    <div class="mx-auto max-w-[1600px] space-y-4 p-4 pb-24 sm:p-6 lg:p-8">
      <BackButton />

      <AppHeader variant="b" />
      <UtilityBar />
      <HeroBanner :image="bannerA" alt="Game providers promotion" title="Top-Rated Providers" subtitle="Explore the studios behind your favorite games." />
      <QuickActions :actions="quickActions" class="sm:max-w-md" />

      <div class="flex gap-3 pb-4 lg:gap-6">
        <CategorySidebar :items="sidebarCategories" v-model:active="activeCategory" class="themed-surface rounded-xl border lg:w-56" />

        <main class="min-w-0 flex-1">
          <SectionHeading title="Providers" icon="controller" />
          <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
            <ProviderCard v-for="provider in providers" :key="provider.id" :provider="provider" @play="openProvider" />
          </div>

          <!-- Wide-screen filler: surface the wider game catalog beneath the
               provider list so the page uses the full desktop width. -->
          <SectionHeading title="Featured Games" icon="fire" class="mt-8" />
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <GameCard v-for="game in allGames" :key="game.id" :game="game" @play="openProvider" />
          </div>
        </main>
      </div>
    </div>

    <BottomNavigation :items="bottomNavB" v-model:active="activeBottom" />
  </DashboardLayout>
</template>

<script setup>
import { ref } from 'vue'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import BackButton from '@/components/common/BackButton.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import UtilityBar from '@/components/gaming/UtilityBar.vue'
import HeroBanner from '@/components/gaming/HeroBanner.vue'
import bannerA from '@/assets/games/hero_sweet_rush.png'
import QuickActions from '@/components/gaming/QuickActions.vue'
import CategorySidebar from '@/components/navigation/CategorySidebar.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import ProviderCard from '@/components/gaming/ProviderCard.vue'
import GameCard from '@/components/gaming/GameCard.vue'
import BottomNavigation from '@/components/navigation/BottomNavigation.vue'
import { sidebarCategories, providers, allGames, bottomNavB, quickActions } from '@/data/games'

const activeCategory = ref('slots')
const activeBottom = ref('login')

function openProvider(provider) {
  console.info('Opening provider (mock):', provider.title)
}
</script>
