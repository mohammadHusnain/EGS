<template>
  <div class="grid grid-cols-3 gap-2.5 sm:gap-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
    <GameCard v-for="game in games" :key="game.id" :game="game" @play="$emit('play', $event)" />
  </div>
</template>

<script setup>
import GameCard from './GameCard.vue'

defineProps({
  games: { type: Array, required: true }
})
defineEmits(['play'])
</script>
