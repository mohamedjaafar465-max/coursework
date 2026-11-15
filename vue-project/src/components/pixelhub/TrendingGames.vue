<script setup>
// "Trending Games" section: 4 featured cards with real covers + sample prices
import { trendingGames } from '../../data/games.js'
import GameCard from './GameCard.vue'
</script>

<template>
  <section id="trending" class="section">
    <div class="container">
      <!-- Section heading: small red label left, title below, coral button right -->
      <div class="d-flex justify-content-between align-items-end mb-5">
        <div>
          <p class="section-label mb-1">Trending</p>
          <h2 class="section-title fw-bolder mb-0">Trending Games</h2>
        </div>
        <a href="#shop" class="btn btn-coral px-4 rounded-pill fw-semibold">VIEW ALL</a>
      </div>

      <!-- 4 cards -->
      <div class="row g-4 row-cols-1 row-cols-sm-2 row-cols-lg-4">
        <div v-for="game in trendingGames" :key="game.id" class="col">
          <GameCard :game="game" variant="feature" />
        </div>
      </div>
    </div>
  </section>
</template>
