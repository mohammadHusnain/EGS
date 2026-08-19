<template>
  <nav class="scrollbar-none flex items-center gap-2 overflow-x-auto px-4 py-3 sm:justify-center sm:px-0">
    <button
      v-for="item in items"
      :key="item.id"
      type="button"
      class="flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition sm:text-sm"
      :class="active === item.id
        ? 'bg-brand-gold-500 text-brand-blue-950 shadow'
        : 'themed-surface text-app-secondary border hover:text-app-primary'"
      :style="active !== item.id ? { borderColor: 'var(--border-color)' } : {}"
      @click="$emit('update:active', item.id)"
    >
      <AppIcon :name="item.icon" :size="15" />
      {{ item.label }}
    </button>
  </nav>
</template>

<script setup>
import AppIcon from '../common/AppIcon.vue'

defineProps({
  items: { type: Array, required: true },
  active: { type: String, default: '' }
})
defineEmits(['update:active'])
</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar { display: none; }
</style>
