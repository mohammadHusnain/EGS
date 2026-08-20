<template>
  <div class="flex flex-col items-center gap-1.5">
    <p class="text-[10px] font-semibold tracking-wide sm:text-[11px]" :style="{ color: labelColor }">
      {{ rank.label }}
    </p>

    <div
      class="relative flex h-9 w-9 items-center justify-center transition-transform duration-300 sm:h-11 sm:w-11"
      :class="{ 'scale-110': rank.current, 'opacity-50 grayscale': rank.locked }"
    >
      <img :src="badgeSrc" :alt="rank.label" class="h-full w-full object-contain drop-shadow" />
      <span
        v-if="rank.current"
        class="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-emerald-400 ring-2"
        :style="{ '--tw-ring-color': 'var(--bg-surface)' }"
      />
    </div>

    <RewardsIcon v-if="rank.locked" name="lock" :size="12" class="text-app-secondary" />
    <span v-else class="h-3" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import RewardsIcon from './RewardsIcon.vue'
import badgeLocked from '@/assets/casino/rewards/badge-locked.svg'
import badgeBronze from '@/assets/casino/rewards/badge-bronze.svg'
import badgeSilver from '@/assets/casino/rewards/badge-silver.svg'

const props = defineProps({
  rank: { type: Object, required: true }
})

const badges = {
  locked: badgeLocked,
  bronze: badgeBronze,
  silver: badgeSilver
}

const badgeSrc = computed(() => badges[props.rank.tier] || badgeLocked)
const labelColor = computed(() => {
  if (props.rank.locked) return 'var(--text-secondary)'
  if (props.rank.tier === 'silver') return 'var(--text-secondary)'
  return '#e04f16'
})
</script>
