<script setup>
// Simple "About us" section in the same visual style, with a real photo
const aboutImage =
  'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=80'
</script>

<template>
  <section id="about" class="section">
    <div class="container">
      <div class="row align-items-center g-5">
        <!-- Left: photo -->
        <div class="col-lg-5">
          <div class="about-image-box ratio ratio-4x3">
            <img :src="aboutImage" alt="Retro arcade gaming" />
          </div>
        </div>

        <!-- Right: text -->
        <div class="col-lg-7">
          <p class="section-label mb-1">About Us</p>
          <h2 class="section-title fw-bolder mb-4">Your Gateway to Great Games</h2>
          <p class="text-secondary mb-3">
            PixelHub brings together a hand-picked
            catalogue of titles across every genre — from fast-paced action and
            deep RPGs to racing, sports and strategy.
          </p>
          <p class="text-secondary mb-4">
            Our mission is simple: help every player find their next favourite
            game quickly, safely and at a fair price.
          </p>
          <a href="#shop" class="btn btn-coral px-4 rounded-pill fw-semibold">LEARN MORE</a>
        </div>
      </div>
    </div>
  </section>
</template>
