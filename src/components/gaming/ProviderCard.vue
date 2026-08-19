<template>
  <button
    type="button"
    class="group relative flex h-44 w-full items-center overflow-hidden rounded-2xl border text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-xl sm:h-52"
    :style="{ borderColor: 'var(--border-color)' }"
    @click="$emit('play', provider)"
  >
    <div class="absolute inset-0 bg-gradient-to-br" :class="provider.gradient" />
    <img
      v-if="provider.image"
      :src="provider.image"
      :alt="provider.title"
      loading="lazy"
      decoding="async"
      class="relative z-10 ml-auto h-full transition-transform duration-300 group-hover:scale-105"
      :class="provider.fit === 'contain' ? 'object-contain py-3 pr-3' : 'w-full object-cover'"
    />
    <div class="absolute inset-y-0 left-0 z-10 flex w-1/2 flex-col justify-center p-4 sm:p-6">
      <p class="text-[11px] font-bold uppercase tracking-widest text-white/75">{{ provider.name }}</p>
      <p class="mt-1 text-2xl font-black text-white drop-shadow sm:text-3xl">{{ provider.title }}</p>
      <span
        v-if="provider.badge"
        class="mt-2 inline-block w-fit rounded-md bg-emerald-500 px-1.5 py-0.5 text-[10px] font-bold text-white"
      >{{ provider.badge }}</span>
    </div>
  </button>
</template>

<script setup>
defineProps({
  provider: { type: Object, required: true }
})
defineEmits(['play'])
</script>
