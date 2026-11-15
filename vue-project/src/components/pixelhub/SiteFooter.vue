<script setup>
// Dark blue footer with contact info and social links
const socials = [
  { name: 'Facebook', icon: 'bi-facebook' },
  { name: 'Twitter / X', icon: 'bi-twitter-x' },
  { name: 'Instagram', icon: 'bi-instagram' },
  { name: 'YouTube', icon: 'bi-youtube' },
  { name: 'Discord', icon: 'bi-discord' },
]

const quickLinks = [
  { label: 'Home', href: '#' },
  { label: 'Our Shop', href: '#shop' },
  { label: 'Product Details', href: '#trending' },
  { label: 'Contact Us', href: '#contact' },
]

const supportLinks = [
  { label: 'Help Center', href: '#' },
  { label: 'FAQ', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
]
</script>

<template>
  <footer id="contact" class="footer pt-5">
    <div class="container">
      <div class="row g-4 pb-4">
        <!-- Brand + blurb + socials -->
        <div class="col-lg-4">
          <a class="d-inline-flex align-items-center gap-2 fw-bold fs-4 text-white mb-3" href="#">
            <span class="brand-badge"><i class="bi bi-controller"></i></span>
            PIXEL<span class="text-coral">HUB</span>
          </a>
          <p class="footer-text">
            A game store with 18 hand-picked titles across every genre. All
            buttons are decorative — no cart, payment or login is implemented.
          </p>
          <div class="d-flex gap-2 mt-3">
            <a
              v-for="social in socials"
              :key="social.name"
              href="#"
              class="social-link"
              :aria-label="social.name"
            >
              <i class="bi" :class="social.icon"></i>
            </a>
          </div>
        </div>

        <!-- Quick links -->
        <div class="col-6 col-lg-2">
          <h6 class="footer-heading fw-bold text-uppercase mb-3">Links</h6>
          <ul class="list-unstyled footer-text mb-0">
            <li v-for="link in quickLinks" :key="link.label" class="mb-2">
              <a :href="link.href" class="footer-link">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <!-- Support links -->
        <div class="col-6 col-lg-2">
          <h6 class="footer-heading fw-bold text-uppercase mb-3">Support</h6>
          <ul class="list-unstyled footer-text mb-0">
            <li v-for="link in supportLinks" :key="link.label" class="mb-2">
              <a :href="link.href" class="footer-link">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <!-- Contact info -->
        <div class="col-lg-4">
          <h6 class="footer-heading fw-bold text-uppercase mb-3">Contact Info</h6>
          <ul class="list-unstyled footer-text mb-0">
            <li class="mb-2"><i class="bi bi-geo-alt me-2 text-coral"></i> 123 Game Avenue, Pixel City</li>
            <li class="mb-2"><i class="bi bi-telephone me-2 text-coral"></i> +00 (0) 123 456 789</li>
            <li class="mb-2"><i class="bi bi-envelope me-2 text-coral"></i> hello@pixelhub.example</li>
            <li class="mb-2"><i class="bi bi-clock me-2 text-coral"></i> Mon – Fri: 9:00 – 18:00</li>
          </ul>
        </div>
      </div>

      <!-- Copyright bar -->
      <div class="footer-bottom text-center py-3">
        <p class="footer-text mb-0">© 2026 PixelHub. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
