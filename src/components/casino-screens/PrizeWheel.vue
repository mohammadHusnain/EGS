<template>
  <div class="relative flex select-none flex-col items-center">
    <!-- Pointer -->
    <div class="relative z-20 -mb-2 h-0 w-0 border-x-[9px] border-t-[14px] border-x-transparent drop-shadow" :style="{ borderTopColor: 'var(--accent-gold)' }" />

    <div class="relative" :style="{ width: sizePx, height: sizePx }">
      <!-- Outer glow ring -->
      <div
        class="absolute inset-0 rounded-full opacity-70 blur-md"
        :style="{ background: 'conic-gradient(from 0deg, rgba(255,209,77,.55), rgba(36,91,234,.4), rgba(255,209,77,.55))' }"
      />

      <!-- Spinning wheel -->
      <div
        ref="wheelEl"
        class="absolute inset-[6px] rounded-full border-4 shadow-2xl transition-transform"
        :class="spinning ? 'duration-[3200ms] ease-[cubic-bezier(0.12,0.7,0.15,1)]' : 'wheel-idle-spin'"
        :style="{
          borderColor: 'var(--accent-gold)',
          background: wheelGradient,
          transform: spinning ? `rotate(${targetRotation}deg)` : undefined
        }"
      >
        <div
          v-for="(seg, i) in segments"
          :key="i"
          class="absolute inset-0"
          :style="{ transform: `rotate(${i * segAngle}deg)` }"
        >
          <span
            class="absolute left-1/2 top-[14px] -translate-x-1/2 text-[10px] font-extrabold tracking-tight sm:top-[18px] sm:text-xs"
            :style="{ color: seg.text || '#0a1a4d', textShadow: '0 1px 2px rgba(0,0,0,0.25)', transform: `rotate(${-i * segAngle}deg)` }"
          >
            {{ seg.label }}
          </span>
        </div>
      </div>

      <!-- Center hub -->
      <div
        class="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 shadow-lg sm:h-16 sm:w-16"
        :style="{ borderColor: 'var(--accent-gold)', backgroundColor: 'var(--bg-surface)' }"
      >
        <GameShowsIcon name="mic" :size="22" class="text-brand-gold-500" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import GameShowsIcon from './GameShowsIcon.vue'

const props = defineProps({
  segments: { type: Array, required: true },
  spinning: { type: Boolean, default: false },
  targetRotation: { type: Number, default: 0 },
  size: { type: Number, default: 280 }
})

const wheelEl = ref(null)
const sizePx = computed(() => `${props.size}px`)
const segAngle = computed(() => 360 / props.segments.length)

const wheelGradient = computed(() => {
  const n = props.segments.length
  const step = 360 / n
  const stops = props.segments
    .map((seg, i) => `${seg.color} ${(i * step).toFixed(2)}deg ${((i + 1) * step).toFixed(2)}deg`)
    .join(', ')
  return `conic-gradient(from ${-step / 2}deg, ${stops})`
})

</script>

<style scoped>
.wheel-idle-spin {
  animation: idle-spin 50s linear infinite;
}

@keyframes idle-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
