<template>
  <div class="grid grid-cols-3 gap-2.5">
    <button
      v-for="action in actions"
      :key="action.id"
      type="button"
      class="flex flex-col items-center gap-1.5 rounded-xl border themed-surface py-3 text-app-primary shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      :style="{ borderColor: 'var(--border-color)' }"
    >
      <span class="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue-50 text-brand-blue-700 dark:bg-white/10 dark:text-brand-gold-400">
        <AppIcon :name="action.icon" :size="18" />
      </span>
      <span class="text-[11px] font-semibold sm:text-xs">{{ action.label }}</span>
    </button>
  </div>
</template>

<script setup>
import AppIcon from '../common/AppIcon.vue'

defineProps({
  actions: { type: Array, required: true }
})
</script>
