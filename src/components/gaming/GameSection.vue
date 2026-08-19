<template>
  <section class="mb-7">
    <SectionHeading :title="title" :icon="icon" />
    <GameGrid :games="games" @play="$emit('play', $event)" />
  </section>
</template>

<script setup>
import SectionHeading from '../common/SectionHeading.vue'
import GameGrid from './GameGrid.vue'

defineProps({
  title: { type: String, required: true },
  icon: { type: String, default: 'fire' },
  games: { type: Array, required: true }
})
defineEmits(['play'])
</script>
