<script setup>
// PixelHub homepage: the whole landing page composed from section components.
// The default Vue welcome page (HelloWorld / TheWelcome) is no longer used here,
// but the original files are kept untouched in src/components/.
import HeroSection from './components/pixelhub/HeroSection.vue'
import TrendingGames from './components/pixelhub/TrendingGames.vue'
import MostPlayed from './components/pixelhub/MostPlayed.vue'
import GameCatalog from './components/pixelhub/GameCatalog.vue'
import TopCategories from './components/pixelhub/TopCategories.vue'
import AboutSection from './components/pixelhub/AboutSection.vue'
import SiteFooter from './components/pixelhub/SiteFooter.vue'
</script>

<template>
  <HeroSection />
  <TrendingGames />
  <MostPlayed />
  <GameCatalog />
  <TopCategories />
  <AboutSection />
  <SiteFooter />
</template>
