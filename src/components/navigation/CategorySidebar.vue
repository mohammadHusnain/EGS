<template>
  <nav class="flex w-[68px] shrink-0 flex-col items-center gap-1 border-r py-2 sm:w-20" :style="{ borderColor: 'var(--border-color)' }">
    <button
      v-for="item in items"
      :key="item.id"
      type="button"
      class="flex w-full flex-col items-center gap-1 rounded-xl px-1 py-2.5 text-[10px] font-semibold transition"
      :class="active === item.id ? 'bg-brand-gold-500 text-brand-blue-950' : 'text-app-secondary hover:bg-[var(--bg-app)] hover:text-app-primary'"
      @click="$emit('update:active', item.id)"
    >
      <AppIcon :name="item.icon" :size="19" />
      <span class="truncate leading-tight">{{ item.label }}</span>
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
