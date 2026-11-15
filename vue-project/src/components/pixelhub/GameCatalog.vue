<script setup>
// Full shop grid: all 18 games with category filter pills + live search.
// Prices are sample data — a disclaimer is shown next to the heading.
import { computed } from 'vue'
import {
  games,
  categoryOptions,
  searchTerm,
  activeCategory,
} from '../../data/games.js'
import GameCard from './GameCard.vue'

const filteredGames = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()
  return games.filter((game) => {
    const matchesCategory = activeCategory.value === 'All' || game.genre === activeCategory.value
    const matchesTerm =
      !term ||
      game.title.toLowerCase().includes(term) ||
      game.genre.toLowerCase().includes(term)
    return matchesCategory && matchesTerm
  })
})

function setCategory(cat) {
  activeCategory.value = cat
}
</script>

<template>
  <section id="shop" class="section">
    <div class="container">
      <!-- Centered heading -->
      <div class="text-center mb-4">
        <p class="section-label mb-1">Our Shop</p>
        <h2 class="section-title fw-bolder mb-0">Browse All Games</h2>
      </div>

      <!-- Category filter pills -->
      <div class="filter-pills d-flex flex-wrap justify-content-center gap-2 mb-4">
        <button
          v-for="cat in categoryOptions"
          :key="cat"
          type="button"
          class="filter-pill"
          :class="{ 'filter-pill--active': activeCategory === cat }"
          @click="setCategory(cat)"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Grid of every game -->
      <div v-if="filteredGames.length" class="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4">
        <div v-for="game in filteredGames" :key="game.id" class="col">
          <GameCard :game="game" variant="catalog" show-description />
        </div>
      </div>

      <!-- Empty state -->
      <p v-else class="text-center text-secondary py-5">
        No games match your search — try a different title or category.
      </p>
    </div>
  </section>
</template>
