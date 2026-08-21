<template>
  <div class="flex items-center justify-center gap-6 border-b themed-surface py-3" :style="{ borderColor: 'var(--border-color)' }">
    <button
      type="button"
      class="text-sm font-semibold transition"
      :class="active === 'login' ? 'text-brand-blue-600 dark:text-brand-blue-300' : 'text-app-secondary hover:text-app-primary'"
      @click="$emit('update:active', 'login')"
    >
      Login
    </button>
    <span class="h-4 w-px bg-[var(--border-color)]" />
    <button
      type="button"
      class="text-sm font-semibold transition"
      :class="active === 'register' ? 'text-emerald-500 dark:text-emerald-400' : 'text-app-secondary hover:text-app-primary'"
      @click="$emit('update:active', 'register')"
    >
      Register
    </button>
  </div>
</template>

<script setup>
defineProps({
  active: { type: String, default: 'login' }
})
defineEmits(['update:active'])
</script>
