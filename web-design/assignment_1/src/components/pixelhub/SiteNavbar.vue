<script setup>
// Navbar shown inside the blue hero. Uses Bootstrap's collapse for mobile.
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark py-4">
    <div class="container">
      <!-- Logo + brand name -->
      <a class="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4" href="#">
        <span class="brand-badge"><i class="bi bi-controller"></i></span>
        PIXEL<span class="text-coral">HUB</span>
      </a>

      <!-- Collapse button (mobile) -->
      <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNav"
        aria-controls="mainNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Nav links + sign in button -->
      <div class="collapse navbar-collapse justify-content-end" id="mainNav">
        <ul class="navbar-nav align-items-lg-center gap-lg-4">
          <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="#shop">Our Shop</a></li>
          <li class="nav-item"><a class="nav-link" href="#trending">Product Details</a></li>
          <li class="nav-item"><a class="nav-link" href="#contact">Contact Us</a></li>
          <li class="nav-item ms-lg-2 mt-2 mt-lg-0">
            <a href="#" class="btn btn-coral px-4 rounded-pill fw-semibold">SIGN IN</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
