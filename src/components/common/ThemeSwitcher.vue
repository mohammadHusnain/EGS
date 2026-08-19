<template>
  <button
    type="button"
    class="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
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
