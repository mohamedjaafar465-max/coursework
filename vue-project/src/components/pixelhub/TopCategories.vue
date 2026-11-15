<script setup>
// "Top Categories" section: 5 cards with a blue header + a representative
// game cover below. Clicking a card filters the shop to that category.
import { topCategories, activeCategory } from '../../data/games.js'

function pickCategory(name) {
  activeCategory.value = name
  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="categories" class="section">
    <div class="container">
      <!-- Centered heading -->
      <div class="text-center mb-5">
        <p class="section-label mb-1">Top Games</p>
        <h2 class="section-title fw-bolder mb-0">Top Categories</h2>
      </div>

      <!-- 5 category cards -->
      <div class="row g-4 row-cols-2 row-cols-md-3 row-cols-lg-5 justify-content-center">
        <div v-for="cat in topCategories" :key="cat.id" class="col">
          <button type="button" class="category-card category-card--link w-100 h-100 p-0 border-0" @click="pickCategory(cat.name)">
            <div class="category-head">{{ cat.name }}</div>
            <div class="category-image-box">
              <img :src="cat.game.cover" :alt="`${cat.game.title} — ${cat.name} category`" loading="lazy" />
            </div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
