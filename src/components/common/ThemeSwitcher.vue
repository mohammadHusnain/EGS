<template>
  <button
    type="button"
    class="flex h-9 w-9 items-center justify-center rounded-full text-app-primary transition hover:bg-black/10 dark:hover:bg-white/15"
    :aria-label="theme.mode === 'light' ? 'Switch to dark theme' : 'Switch to light theme'"
    @click="theme.toggle()"
  >
    <AppIcon :name="theme.mode === 'light' ? 'moon' : 'sun'" :size="17" />
  </button>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
import { useThemeStore } from '@/store/theme'

const theme = useThemeStore()
</script>
