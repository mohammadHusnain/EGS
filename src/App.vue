<template>
  <RouterView v-slot="{ Component }">
    <transition name="fade-slide" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
</template>

<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from '@/store/theme'

const theme = useThemeStore()
onMounted(() => theme.apply())
</script>
