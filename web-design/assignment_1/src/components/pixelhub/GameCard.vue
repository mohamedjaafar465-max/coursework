<script setup>
// Reusable product card used by Trending (feature), Most Played (compact) and
// the full catalogue (catalog). Shows the game cover (Steam CDN), genre, title,
// sample price in ¥ and optionally description + discount badge.
import { computed } from 'vue'
import { formatPrice, discountPercent, activeCategory } from '../../data/games.js'

const props = defineProps({
  game: { type: Object, required: true },
  /** 'feature' = trending row, 'compact' = most-played row, 'catalog' = shop grid */
  variant: { type: String, default: 'feature' },
  showDescription: { type: Boolean, default: false },
})

const discount = computed(() => discountPercent(props.game))
const hasDiscount = computed(() => props.game.originalPrice && discount.value > 0)

/** Clicking the genre badge filters the catalogue to that category. */
function pickGenre(event) {
  event.preventDefault()
  activeCategory.value = props.game.genre
  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <!-- Compact style (Most Played): centered, image + genre + title + price + EXPLORE.
       Flex column so the EXPLORE button always sits at the same bottom line. -->
  <article v-if="variant === 'compact'" class="game-card game-card--compact text-center h-100">
    <div class="game-card__media game-card__media--square">
      <img :src="game.cover" :alt="`${game.title} cover art`" loading="lazy" />
    </div>
    <p class="genre compact-genre mb-1">{{ game.genre }}</p>
    <h5 class="game-title compact-title fw-bold mb-2">{{ game.title }}</h5>
    <div class="price-row price-row--center compact-price mb-3">
      <span class="price-now">{{ formatPrice(game.price) }}</span>
      <span v-if="hasDiscount" class="price-old">{{ formatPrice(game.originalPrice) }}</span>
    </div>
    <a href="#shop" class="btn btn-coral compact-btn px-4 rounded-pill fw-semibold mt-auto">EXPLORE</a>
  </article>

  <!-- Feature style (Trending): image + genre/title + bag button + price -->
  <article v-else-if="variant === 'feature'" class="game-card game-card--feature h-100">
    <div class="game-card__media game-card__media--square">
      <img :src="game.cover" :alt="`${game.title} cover art`" loading="lazy" />
    </div>
    <div class="game-card__body">
      <div class="d-flex justify-content-between align-items-center pt-3 px-1">
        <div>
          <p class="genre mb-1">
            <a href="#shop" class="genre-link" @click="pickGenre">{{ game.genre }}</a>
          </p>
          <h5 class="game-title fw-bold mb-1">{{ game.title }}</h5>
          <div class="price-row">
            <span class="price-now">{{ formatPrice(game.price) }}</span>
            <span v-if="hasDiscount" class="price-old">{{ formatPrice(game.originalPrice) }}</span>
          </div>
        </div>
        <button class="bag-btn" aria-label="View product" title="View product">
          <i class="bi bi-bag"></i>
        </button>
      </div>
    </div>
  </article>

  <!-- Catalog style (Shop grid): richer card with description, badge, rating -->
  <article v-else class="game-card game-card--catalog h-100 d-flex flex-column">
    <div class="game-card__media game-card__media--portrait">
      <img :src="game.cover" :alt="`${game.title} cover art`" loading="lazy" />
      <span v-if="hasDiscount" class="discount-badge">-{{ discount }}%</span>
    </div>
    <div class="game-card__body d-flex flex-column flex-grow-1 p-3">
      <div class="d-flex justify-content-between align-items-start gap-2 mb-1">
        <div>
          <p class="genre mb-1">
            <a href="#shop" class="genre-link" @click="pickGenre">{{ game.genre }}</a>
          </p>
          <h5 class="game-title fw-bold mb-0">{{ game.title }}</h5>
        </div>
        <span class="rating-badge" :title="`Rating: ${game.rating}/5`">
          <i class="bi bi-star-fill"></i> {{ game.rating.toFixed(1) }}
        </span>
      </div>
      <p class="game-desc">{{ game.description }}</p>
      <div class="price-row price-row--flush mt-auto">
        <div>
          <span class="price-now">{{ formatPrice(game.price) }}</span>
          <span v-if="hasDiscount" class="price-old">{{ formatPrice(game.originalPrice) }}</span>
        </div>
        <a href="#" class="btn btn-coral btn-explore rounded-pill fw-semibold" @click.prevent>EXPLORE</a>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* Feature card: dark text, light card background */
.game-card--feature { background: var(--grey); }
</style>
