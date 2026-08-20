<template>
  <div class="w-full overflow-x-auto">
    <div class="inline-flex min-w-full gap-1 rounded-xl border p-2 sm:p-3" :style="{ borderColor: 'var(--border-color)', background: 'rgba(10,20,50,0.55)' }">
      <!-- 0 / 00 column -->
      <div class="flex flex-col gap-1">
        <button
          v-for="zero in ['0', '00']"
          :key="zero"
          type="button"
          class="grid h-full w-9 place-items-center rounded-md bg-emerald-600 text-[11px] font-bold text-white transition hover:brightness-110 active:scale-95 sm:w-10 sm:text-xs"
          :class="{ 'ring-2 ring-brand-gold-400': selected === zero }"
          @click="select(zero)"
        >
          {{ zero }}
        </button>
      </div>

      <!-- Main 3x12 number grid -->
      <div class="grid grid-flow-col grid-rows-3 gap-1">
        <button
          v-for="n in numbers"
          :key="n.value"
          type="button"
          class="relative grid h-7 w-7 place-items-center rounded-md text-[10px] font-bold text-white transition hover:-translate-y-0.5 hover:brightness-110 active:scale-95 sm:h-8 sm:w-8 sm:text-xs"
          :class="[n.color === 'red' ? 'bg-rose-600' : 'bg-neutral-800', { 'ring-2 ring-brand-gold-400': selected === String(n.value) }]"
          @click="select(String(n.value))"
        >
          {{ n.value }}
          <span
            v-if="chipOn === String(n.value)"
            class="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full border border-white/70 bg-brand-gold-400 shadow chip-pop"
          />
        </button>
      </div>

      <!-- Outside bets -->
      <div class="flex flex-col gap-1">
        <button
          v-for="o in outside"
          :key="o.label"
          type="button"
          class="grid h-full min-w-[3.25rem] place-items-center rounded-md bg-brand-blue-800/80 px-2 text-[9px] font-semibold uppercase tracking-wide text-white transition hover:brightness-110 active:scale-95 sm:text-[10px]"
          @click="select(o.label)"
        >
          {{ o.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  chipOn: { type: String, default: '' }
})

const emit = defineEmits(['place'])

const redNumbers = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36])
const numbers = Array.from({ length: 36 }, (_, i) => {
  const value = i + 1
  return { value, color: redNumbers.has(value) ? 'red' : 'black' }
})

const outside = [
  { label: '1-18' },
  { label: 'Even' },
  { label: 'Odd' },
  { label: '19-36' }
]

const selected = ref('')
function select(key) {
  selected.value = key
  emit('place', key)
}
</script>

<style scoped>
.chip-pop {
  animation: chip-pop 0.22s ease-out;
}
@keyframes chip-pop {
  from {
    transform: scale(0.4);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
