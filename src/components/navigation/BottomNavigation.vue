<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t themed-surface pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_14px_rgba(10,26,77,0.12)] lg:hidden"
    :style="{ borderColor: 'var(--border-color)' }"
  >
    <button
      v-for="item in items"
      :key="item.id"
      type="button"
      class="relative flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition"
      :class="active === item.id ? 'text-brand-gold-500' : 'text-app-secondary'"
      @click="handleClick(item)"
    >
      <span
        v-if="item.emphasized"
        class="absolute -top-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold-500 text-brand-blue-950 shadow-lg ring-4"
        :style="{ '--tw-ring-color': 'var(--bg-surface)' }"
      >
        <AppIcon :name="item.icon" :size="18" />
      </span>
      <AppIcon v-else :name="item.icon" :size="18" />
      <span :class="item.emphasized ? 'mt-4' : ''">{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import AppIcon from '../common/AppIcon.vue'

const props = defineProps({
  items: { type: Array, required: true },
  active: { type: String, default: '' }
})
const emit = defineEmits(['update:active'])
const router = useRouter()

function handleClick(item) {
  emit('update:active', item.id)
  if (item.route) router.push(item.route)
}
</script>
