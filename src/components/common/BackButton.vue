<template>
  <button
    type="button"
    class="mb-4 inline-flex items-center gap-1.5 rounded-lg border themed-surface px-3 py-1.5 text-xs font-semibold text-app-primary shadow-sm transition hover:-translate-x-0.5 hover:shadow sm:text-sm"
    :style="{ borderColor: 'var(--border-color)' }"
    @click="goBack"
  >
    <AppIcon name="chevronRight" :size="14" class="rotate-180" />
    {{ label }}
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  label: { type: String, default: 'Back to Dashboard' },
  to: { type: String, default: '/dashboard' }
})

const router = useRouter()

function goBack() {
  // Prefer real browser back when we actually navigated from within the app,
  // otherwise fall back to the given route (e.g. direct link/refresh).
  if (window.history.state && window.history.state.back) {
    router.back()
  } else {
    router.push(props.to)
  }
}
</script>
