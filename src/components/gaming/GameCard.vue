<template>
  <button
    type="button"
    class="group relative flex flex-col overflow-hidden rounded-2xl border themed-surface text-left shadow-[var(--card-shadow)] transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-brand-gold-500"
    :style="{ borderColor: 'var(--border-color)' }"
    @click="$emit('play', game)"
  >
    <div class="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br" :class="game.gradient">
      <img
        v-if="game.image"
        :src="game.image"
        :alt="game.title"
        loading="lazy"
        decoding="async"
        class="absolute inset-0 h-full w-full transition-transform duration-300 group-hover:scale-105"
        :class="game.fit === 'contain' ? 'object-contain p-1.5' : 'object-cover'"
      />
      <span
        v-if="game.badge"
        class="absolute left-1.5 top-1.5 z-10 rounded-md bg-brand-gold-500 px-1.5 py-0.5 text-[10px] font-bold text-brand-blue-950 shadow"
      >
        {{ game.badge }}
      </span>
      <div v-if="showTitle" class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 pb-1.5 pt-4">
        <p class="truncate text-xs font-bold text-white drop-shadow sm:text-sm">{{ game.title }}</p>
      </div>
      <span class="absolute bottom-1.5 right-1.5 rounded-full bg-white/90 p-1.5 opacity-0 shadow transition-opacity duration-200 group-hover:opacity-100">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a1a4d" stroke-width="2.5"><path d="M8 5v14l11-7z" /></svg>
      </span>
    </div>
  </button>
</template>

<script setup>
defineProps({
  game: { type: Object, required: true },
  showTitle: { type: Boolean, default: true }
})
defineEmits(['play'])
</script>
