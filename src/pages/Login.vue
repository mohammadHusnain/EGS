<template>
  <div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-blue-900 via-brand-blue-800 to-brand-blue-950 px-4">
    <div class="w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl dark:bg-brand-blue-900">
      <div class="mb-6 flex flex-col items-center gap-2">
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow">
          <img :src="egsLogo" alt="EGS logo" class="h-8 w-8 object-contain" />
        </div>
        <p class="text-lg font-extrabold tracking-wide text-brand-blue-900 dark:text-white">EGS</p>
        <p class="text-xs text-app-secondary">Sign in to access your dashboard</p>
      </div>

      <form class="space-y-3" @submit.prevent="handleLogin">
        <input
          type="text"
          placeholder="Username"
          class="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
          value="demo"
        />
        <input
          type="password"
          placeholder="Password"
          class="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
          value="demo123"
        />
        <button
          type="submit"
          class="w-full rounded-lg bg-brand-gold-500 py-2.5 text-sm font-bold text-brand-blue-950 shadow transition hover:bg-brand-gold-400"
        >
          Login
        </button>
      </form>
      <p class="mt-4 text-center text-[11px] text-app-secondary">Demo build — any credentials will sign you in.</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import egsLogo from '@/assets/brand/egs-logo.png'
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()
const router = useRouter()

function handleLogin() {
  auth.login()
  router.push({ name: 'Dashboard' })
}
</script>
