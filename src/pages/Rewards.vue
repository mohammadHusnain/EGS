<template>
  <DashboardLayout title="Rewards">
    <div class="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-8">
      <BackButton />

      <HeroBanner :image="bannerA" alt="Rewards promotion" title="Earn As You Play" subtitle="Level up your rank and unlock exclusive bonuses and prizes." />

      <!-- Page header -->
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <AppIcon name="crown" :size="22" class="text-brand-gold-500" />
          <h2 class="text-xl font-bold text-app-primary sm:text-2xl">VIP Rewards</h2>
        </div>
        <p class="text-sm text-app-secondary">
          Claim your recurring bonuses and climb the VIP ladder for better perks.
        </p>
      </div>

      <!-- Reward chip cards -->
      <section
        class="themed-surface rounded-2xl border p-3 sm:p-4"
        :style="{ borderColor: 'var(--border-color)', boxShadow: 'var(--card-shadow)' }"
      >
        <div class="mb-3 flex items-center gap-2">
          <RewardsIcon name="bolt" :size="16" class="text-brand-gold-500" />
          <h3 class="text-sm font-semibold text-app-primary sm:text-base">Recurring Rewards</h3>
        </div>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <RewardChipCard
            v-for="reward in rewards"
            :key="reward.id"
            :reward="reward"
            @claim="handleClaim"
          />
        </div>
      </section>

      <!-- Rank progress -->
      <section
        class="themed-surface rounded-2xl border p-4 sm:p-5"
        :style="{ borderColor: 'var(--border-color)', boxShadow: 'var(--card-shadow)' }"
      >
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
          <!-- Progress bar block -->
          <div class="flex flex-col justify-center gap-3">
            <div class="flex items-center gap-2">
              <RewardsIcon name="trophy" :size="18" class="text-brand-gold-500" />
              <h3 class="text-lg font-bold text-app-primary sm:text-xl">Your Rank Progress</h3>
            </div>

            <div class="flex flex-col gap-1.5">
              <div
                class="h-2.5 w-full overflow-hidden rounded-full"
                :style="{ backgroundColor: 'var(--bg-app)' }"
              >
                <div
                  class="progress-fill h-full rounded-full bg-gradient-to-r from-brand-gold-400 to-brand-gold-600"
                  :style="{ width: mounted ? progressPercent + '%' : '0%' }"
                />
              </div>

              <div class="flex items-center justify-between text-[11px] font-medium text-app-secondary sm:text-xs">
                <span class="tracking-wide">{{ currentRankLabel }}</span>
                <span class="flex items-center gap-1 text-app-primary">
                  <img :src="nextBadge" alt="" class="h-3.5 w-3.5" />
                  {{ nextRankLabel }}
                </span>
              </div>

              <div class="flex items-center justify-between text-xs">
                <p class="text-app-secondary">
                  <span class="font-semibold text-app-primary">${{ wagered.toLocaleString() }}</span>
                  / ${{ wagerGoal.toLocaleString() }}.00 Wagered
                </p>
                <p class="font-semibold text-app-primary">{{ progressPercent }}% Complete</p>
              </div>
            </div>
          </div>

          <!-- Rank ladder block -->
          <div class="flex flex-col items-stretch gap-3">
            <div class="flex items-center justify-end gap-2">
              <button
                type="button"
                class="rounded-full bg-brand-gold-500 px-3.5 py-1.5 text-xs font-semibold text-brand-blue-950 transition hover:bg-brand-gold-400"
                :disabled="progressPercent < 100"
                :class="progressPercent < 100 ? 'cursor-not-allowed opacity-50' : 'claim-rank-pulse'"
                @click="claimRankUp"
              >
                Claim Rank Up
              </button>
              <button
                type="button"
                class="rounded-full border px-3.5 py-1.5 text-xs font-semibold text-app-primary transition hover:opacity-80"
                :style="{ borderColor: 'var(--border-color)' }"
                @click="showAllRanks = !showAllRanks"
              >
                View All Ranks
              </button>
            </div>

            <div
              class="flex items-center justify-between gap-2 rounded-xl p-3 sm:p-4"
              :style="{ backgroundColor: 'var(--bg-app)' }"
            >
              <RankBadge v-for="rank in visibleRanks" :key="rank.label" :rank="rank" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import BackButton from '@/components/common/BackButton.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import RewardsIcon from '@/components/casino-screens/RewardsIcon.vue'
import RewardChipCard from '@/components/casino-screens/RewardChipCard.vue'
import RankBadge from '@/components/casino-screens/RankBadge.vue'
import HeroBanner from '@/components/gaming/HeroBanner.vue'
import bannerA from '@/assets/games/hero_roulette.png'
import badgeBronze from '@/assets/casino/rewards/badge-bronze.svg'

// ---- Mock data only — no backend wiring in this build ----
const rewards = ref([
  {
    id: 'rakeback',
    title: 'Rakeback',
    status: 'No funds',
    subtitle: 'No funds',
    value: 1,
    claimable: false,
    badge: null,
    ringGradient: 'conic-gradient(from 0deg, #2e90fa 0deg 24deg, transparent 24deg 36deg, #2e90fa 36deg 60deg, transparent 60deg 72deg, #2e90fa 72deg 96deg, transparent 96deg 108deg, #2e90fa 108deg 132deg, transparent 132deg 144deg, #2e90fa 144deg 168deg, transparent 168deg 180deg, #2e90fa 180deg 204deg, transparent 204deg 216deg, #2e90fa 216deg 240deg, transparent 240deg 252deg, #2e90fa 252deg 276deg, transparent 276deg 288deg, #2e90fa 288deg 312deg, transparent 312deg 324deg, #2e90fa 324deg 348deg, transparent 348deg 360deg)',
    borderColor: '#2e90fa',
    coreColor: '#1570ef'
  },
  {
    id: 'daily',
    title: 'Daily',
    status: 'Ready',
    subtitle: 'No funds',
    value: 5,
    claimable: true,
    badge: '12h',
    ringGradient: 'conic-gradient(from 0deg, #16b364 0deg 24deg, transparent 24deg 36deg, #16b364 36deg 60deg, transparent 60deg 72deg, #16b364 72deg 96deg, transparent 96deg 108deg, #16b364 108deg 132deg, transparent 132deg 144deg, #16b364 144deg 168deg, transparent 168deg 180deg, #16b364 180deg 204deg, transparent 204deg 216deg, #16b364 216deg 240deg, transparent 240deg 252deg, #16b364 252deg 276deg, transparent 276deg 288deg, #16b364 288deg 312deg, transparent 312deg 324deg, #16b364 324deg 348deg, transparent 348deg 360deg)',
    borderColor: '#16b364',
    coreColor: '#099250'
  },
  {
    id: 'weekly',
    title: 'Weekly',
    status: '3d left',
    subtitle: 'No funds',
    value: 25,
    claimable: false,
    badge: null,
    ringGradient: 'conic-gradient(from 0deg, #7a5af8 0deg 24deg, transparent 24deg 36deg, #7a5af8 36deg 60deg, transparent 60deg 72deg, #7a5af8 72deg 96deg, transparent 96deg 108deg, #7a5af8 108deg 132deg, transparent 132deg 144deg, #7a5af8 144deg 168deg, transparent 168deg 180deg, #7a5af8 180deg 204deg, transparent 204deg 216deg, #7a5af8 216deg 240deg, transparent 240deg 252deg, #7a5af8 252deg 276deg, transparent 276deg 288deg, #7a5af8 288deg 312deg, transparent 312deg 324deg, #7a5af8 324deg 348deg, transparent 348deg 360deg)',
    borderColor: '#7a5af8',
    coreColor: '#6938ef'
  },
  {
    id: 'pre-monthly',
    title: 'Pre Monthly',
    status: 'Locked',
    subtitle: 'No funds',
    value: '?',
    claimable: false,
    badge: null,
    ringGradient: 'conic-gradient(from 0deg, #6b7280 0deg 24deg, transparent 24deg 36deg, #6b7280 36deg 60deg, transparent 60deg 72deg, #6b7280 72deg 96deg, transparent 96deg 108deg, #6b7280 108deg 132deg, transparent 132deg 144deg, #6b7280 144deg 168deg, transparent 168deg 180deg, #6b7280 180deg 204deg, transparent 204deg 216deg, #6b7280 216deg 240deg, transparent 240deg 252deg, #6b7280 252deg 276deg, transparent 276deg 288deg, #6b7280 288deg 312deg, transparent 312deg 324deg, #6b7280 324deg 348deg, transparent 348deg 360deg)',
    borderColor: '#6b7280',
    coreColor: '#9ca3af'
  },
  {
    id: 'monthly',
    title: 'Monthly',
    status: '18d left',
    subtitle: 'No funds',
    value: 200,
    claimable: false,
    badge: null,
    ringGradient: 'conic-gradient(from 0deg, #ef4444 0deg 24deg, transparent 24deg 36deg, #ef4444 36deg 60deg, transparent 60deg 72deg, #ef4444 72deg 96deg, transparent 96deg 108deg, #ef4444 108deg 132deg, transparent 132deg 144deg, #ef4444 144deg 168deg, transparent 168deg 180deg, #ef4444 180deg 204deg, transparent 204deg 216deg, #ef4444 216deg 240deg, transparent 240deg 252deg, #ef4444 252deg 276deg, transparent 276deg 288deg, #ef4444 288deg 312deg, transparent 312deg 324deg, #ef4444 324deg 348deg, transparent 348deg 360deg)',
    borderColor: '#ef4444',
    coreColor: '#dc2626'
  }
])

const ranks = ref([
  { label: 'Bronze I', tier: 'bronze', locked: true, current: false },
  { label: 'Bronze II', tier: 'bronze', locked: true, current: false },
  { label: 'Bronze III', tier: 'bronze', locked: true, current: false },
  { label: 'Bronze IV', tier: 'bronze', locked: false, current: true },
  { label: 'Silver I', tier: 'silver', locked: true, current: false }
])

const wagered = ref(0)
const wagerGoal = 4000
const currentRankLabel = 'UNRANKED'
const nextRankLabel = 'BRONZE'
const nextBadge = badgeBronze
const showAllRanks = ref(false)
const mounted = ref(false)

const visibleRanks = computed(() => ranks.value)

const progressPercent = computed(() => {
  const pct = Math.round((wagered.value / wagerGoal) * 100)
  return Math.min(100, Math.max(0, pct))
})

onMounted(() => {
  // Trigger the progress bar fill animation shortly after mount.
  requestAnimationFrame(() => {
    mounted.value = true
  })
})

function handleClaim(reward) {
  // Mock interaction only — no real reward/claim logic in this build.
  console.info('Claiming reward (mock):', reward.title)
  reward.claimable = false
  reward.status = 'Claimed'
}

function claimRankUp() {
  console.info('Claim rank up (mock)')
}
</script>

<style scoped>
.progress-fill {
  transition: width 1.1s cubic-bezier(0.22, 1, 0.36, 1);
}

.claim-rank-pulse {
  animation: rank-pulse 2.4s ease-in-out infinite;
}

@keyframes rank-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.4);
  }
  50% {
    box-shadow: 0 0 0 7px rgba(255, 193, 7, 0);
  }
}
</style>
