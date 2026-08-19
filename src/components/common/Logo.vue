<template>
  <div class="flex items-center gap-2 select-none">
    <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow sm:h-9 sm:w-9">
      <img :src="egsLogo" alt="EGS logo" class="h-5 w-5 object-contain sm:h-6 sm:w-6" />
    </div>
    <div class="leading-none">
      <p class="text-sm font-extrabold tracking-wide text-white sm:text-base">EGS</p>
      <p class="-mt-0.5 text-[10px] font-semibold tracking-[0.2em] text-brand-gold-400 sm:text-xs">GAMING</p>
    </div>
  </div>
</template>

<script setup>
import egsLogo from '@/assets/brand/egs-logo.png'
</script>
