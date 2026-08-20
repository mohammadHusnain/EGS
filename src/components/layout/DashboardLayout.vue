<template>
  <div class="flex h-screen w-full overflow-hidden" style="background-color: var(--bg-app)">
    <DashboardSidebar
      class="hidden lg:flex"
      :collapsed="collapsed"
      @toggle="collapsed = !collapsed"
    />

    <!-- Mobile drawer -->
    <transition name="fade-slide">
      <div v-if="mobileOpen" class="fixed inset-0 z-50 lg:hidden">
        <div class="absolute inset-0 bg-black/50" @click="mobileOpen = false" />
        <DashboardSidebar class="relative z-10 flex" :collapsed="false" @toggle="mobileOpen = false" />
      </div>
    </transition>

    <div class="flex min-w-0 flex-1 flex-col">
      <header class="flex h-16 shrink-0 items-center justify-between border-b themed-surface px-4 shadow-sm sm:px-6" :style="{ borderColor: 'var(--border-color)' }">
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-lg text-app-primary hover:bg-black/5 lg:hidden"
            aria-label="Open sidebar"
            @click="mobileOpen = true"
          >
            <AppIcon name="menu" :size="20" />
          </button>
          <h1 class="text-base font-bold text-app-primary sm:text-lg">{{ title }}</h1>
        </div>
        <div class="flex items-center gap-3">
          <ThemeSwitcher />
          <div class="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue-600 text-sm font-bold text-white">
            A
          </div>
        </div>
      </header>

      <main ref="mainRef" class="min-w-0 flex-1 overflow-y-auto pb-20 lg:pb-0">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppIcon from '../common/AppIcon.vue'
import ThemeSwitcher from '../common/ThemeSwitcher.vue'
import DashboardSidebar from './DashboardSidebar.vue'
import { useLenis } from '@/composables/useLenis'

defineProps({
  title: { type: String, default: 'Dashboard' }
})

const collapsed = ref(false)
const mobileOpen = ref(false)
const mainRef = ref(null)

useLenis(mainRef)
</script>
