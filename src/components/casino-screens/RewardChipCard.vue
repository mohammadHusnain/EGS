<template>
  <div
    class="reward-card group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    :style="{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-app)' }"
  >
    <!-- Header -->
    <div class="flex w-full items-center justify-between gap-2">
      <p class="text-xs font-semibold text-app-primary sm:text-sm">{{ reward.title }}</p>
      <span
        class="rounded-full px-2 py-0.5 text-[10px] font-medium"
        :class="reward.claimable ? 'bg-emerald-500/15 text-emerald-500' : 'text-app-secondary'"
        :style="!reward.claimable ? { backgroundColor: 'var(--bg-surface)' } : null"
      >
        {{ reward.status }}
      </span>
    </div>

    <!-- Chip token -->
    <div class="relative flex h-16 w-16 items-center justify-center sm:h-[72px] sm:w-[72px]">
      <div
        class="chip-ring absolute inset-0 rounded-full"
        :style="{ background: reward.ringGradient }"
      />
      <div
        class="absolute inset-[5px] rounded-full border-2 border-dashed opacity-60"
        :style="{ borderColor: reward.borderColor }"
      />
      <div
        class="relative flex h-[74%] w-[74%] items-center justify-center rounded-full shadow-inner"
        :style="{ backgroundColor: reward.coreColor }"
      >
        <span class="text-lg font-bold text-white sm:text-xl">{{ reward.value }}</span>
      </div>

      <!-- countdown / claimable badge -->
      <span
        v-if="reward.badge"
        class="absolute -right-1 -top-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold shadow-sm"
        :class="reward.claimable ? 'bg-brand-gold-500 text-brand-blue-950' : 'bg-black/60 text-white'"
      >
        {{ reward.badge }}
      </span>
    </div>

    <!-- Claim button -->
    <button
      type="button"
      class="w-full rounded-full py-1.5 text-xs font-semibold transition-all duration-200"
      :class="[
        reward.claimable
          ? 'claim-pulse bg-brand-gold-500 text-brand-blue-950 hover:bg-brand-gold-400'
          : 'cursor-not-allowed opacity-60'
      ]"
      :style="!reward.claimable ? { backgroundColor: 'var(--bg-surface)', color: 'var(--text-secondary)' } : null"
      :disabled="!reward.claimable"
      @click="$emit('claim', reward)"
    >
      {{ reward.claimable ? 'Claim' : reward.subtitle }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  reward: { type: Object, required: true }
})
defineEmits(['claim'])
</script>

<style scoped>
.chip-ring {
  animation: chip-spin 14s linear infinite;
}

@keyframes chip-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.claim-pulse {
  animation: claim-pulse 2.2s ease-in-out infinite;
}

@keyframes claim-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.45);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(255, 193, 7, 0);
  }
}

.reward-card:hover .chip-ring {
  animation-duration: 4s;
}
</style>
