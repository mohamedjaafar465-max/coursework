<script setup>
// Blue hero block with rounded bottom corners: navbar + headline + search + image.
// The search bar drives the full catalogue below (shared state in games.js).
import { searchTerm } from '../../data/games.js'
import { heroImage } from '../../data/games.js'
import SiteNavbar from './SiteNavbar.vue'

/** Scroll to the shop and apply the typed term as a filter. */
function submitSearch() {
  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <header class="hero">
    <SiteNavbar />

    <div class="container pb-5">
      <div class="row align-items-center g-5 pb-4">
        <!-- Left: text + search bar -->
        <div class="col-lg-7 text-white">
          <p class="welcome-line mb-3">Welcome to PixelHub</p>
          <h1 class="hero-title fw-bolder mb-4">
            PIXELHUB OPEN WORLD MULTIPLAYER PRO GAMES
          </h1>
          <p class="hero-text mb-5">
            Shop the best games, discover new adventures and join a community of
            millions of players. Your next favourite game is only one click away.
          </p>

          <!-- Pill-shaped search bar with attached coral button -->
          <form class="search-bar d-flex align-items-center p-2 ps-4" @submit.prevent="submitSearch">
            <input
              v-model="searchTerm"
              type="text"
              class="search-input flex-grow-1"
              placeholder="Search games, e.g. Elden Ring"
              aria-label="Search games"
            />
            <button type="submit" class="btn btn-coral rounded-pill px-4 fw-semibold">SEARCH NOW</button>
          </form>
        </div>

        <!-- Right: large rounded hero photo -->
        <div class="col-lg-5">
          <div class="hero-image hero-image--photo ratio ratio-4x3">
            <img :src="heroImage" alt="Gaming setup with controllers" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
