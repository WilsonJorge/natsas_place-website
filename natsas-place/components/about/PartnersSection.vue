<template>
  <section class="py-16 bg-gradient-to-b from-white to-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4 text-gray-900">
          Empresas que Confiam em Nós
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Junte-se a milhares de empresas que já descobriram o poder do feedback positivo
          para transformar seus negócios
        </p>
      </div>

  
        <!-- Carousel Component -->
        <LogoCarousel />

      <!-- CTA Section -->
      <div class="mt-12 text-center">
        <NuxtLink 
          to="/auth/register"
          class="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-all transform hover:scale-105"
        >
          Seja Nosso Parceiro
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import LogoCarousel from './LogoPartners.vue'
</script>