<template>
  <header class="themed-header sticky top-0 z-20 rounded-xl shadow-md">
    <div class="flex items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
      <!-- Left slot -->
      <div class="flex min-w-[84px] items-center gap-2">
        <button
          v-if="variant === 'b'"
          type="button"
          class="rounded-lg bg-brand-gold-500 px-3.5 py-1.5 text-xs font-bold text-brand-blue-950 shadow transition hover:bg-brand-gold-400 sm:px-5 sm:py-2 sm:text-sm"
        >
          Register
        </button>
      </div>

      <!-- Logo -->
      <Logo class="mx-auto lg:mx-0" />

      <!-- Right slot -->
      <div class="flex min-w-[84px] items-center justify-end gap-2">
        <template v-if="variant === 'a'">
          <button class="hidden rounded-lg border border-white/30 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10 sm:block sm:px-4 sm:py-2 sm:text-sm">
            Login
          </button>
          <button class="rounded-lg bg-brand-gold-500 px-3.5 py-1.5 text-xs font-bold text-brand-blue-950 shadow transition hover:bg-brand-gold-400 sm:px-4 sm:py-2 sm:text-sm">
            Register
          </button>
        </template>
        <template v-else>
          <button class="rounded-lg bg-white px-3.5 py-1.5 text-xs font-bold text-brand-blue-800 shadow transition hover:bg-white/90 sm:px-5 sm:py-2 sm:text-sm">
            Login
          </button>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import Logo from '../common/Logo.vue'

defineProps({
  variant: { type: String, default: 'a' } // 'a' | 'b'
})
</script>
