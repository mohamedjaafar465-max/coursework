<script setup>
// "Most Played" section inside the soft grey rounded panel: 6 featured cards
import { mostPlayedGames } from '../../data/games.js'
import GameCard from './GameCard.vue'
</script>

<template>
  <section id="most-played" class="section">
    <div class="container">
      <div class="grey-panel">
        <!-- Section heading -->
        <div class="d-flex justify-content-between align-items-end mb-5">
          <div>
            <p class="section-label mb-1">Top Games</p>
            <h2 class="section-title fw-bolder mb-0">Most Played</h2>
          </div>
          <a href="#shop" class="btn btn-coral px-4 rounded-pill fw-semibold">VIEW ALL</a>
        </div>

        <!-- 6 cards: 6 columns desktop -> 3 -> 2 -> 1 -->
        <div class="row g-4 text-center row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6">
          <div v-for="game in mostPlayedGames" :key="game.id" class="col">
            <GameCard :game="game" variant="compact" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
