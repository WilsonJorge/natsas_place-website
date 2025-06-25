<template>
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 -z-10">
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-70"
      />
      <div
        class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
      />
    </div>

    <div class="px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <!-- Column 1: Verification -->
        <div class="relative z-10">
          <HeroContent />
        </div>

        <!-- Column 2: Warning -->
        <div relative z-10 lg:ml-8>
          <HeroImage />
        </div>
      </div>

      <!-- Testimonials Carousel -->
      <div class="mt-12">
        <h3 class="text-2xl font-semibold mb-6 text-center">
          O que nossos clientes dizem
        </h3>
        <TestimonialsCarousel />
      </div>

      <!-- Partner Carousel -->
      <div class="mt-12">
        <PartnersSection />
      </div>

      <!-- <div class="mt-12">
        <FaqSection />
      </div> -->
    </div>
    <FeatureGrid />
  </section>
</template>

<script setup lang="ts">
import HeroContent from "@/components/about/HeroContent.vue";
import HeroImage from "@/components/about/HeroImage.vue";
import FeatureGrid from "@/components/about/FeatureGrid.vue";
import TestimonialsCarousel from "@/components/about/TestimonialsCarousel.vue";
import PartnersSection from "@/components/about/PartnersSection.vue";
import FaqSection from "@/components/about/FaqSection.vue";
</script>
