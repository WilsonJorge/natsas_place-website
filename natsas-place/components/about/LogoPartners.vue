<template>
  <div class="relative overflow-hidden py-8">
    <!-- Container com máscara para limitar a área visível -->
    <div class="max-w-7xl mx-auto relative">
      <!-- Gradientes de fade nas laterais -->
      <div class="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div class="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-10"></div>

      <!-- First row of logos -->
      <div class="flex animate-scroll group">
        <div class="flex space-x-16">
          <div v-for="logo in [...firstRowLogos, ...firstRowLogos]" :key="logo.id" 
               class="flex-none transform transition-all duration-300 hover:scale-105">
            <div class="relative bg-white/50 backdrop-blur-sm p-6 rounded-2xl 
                        hover:bg-white/80 transition-all duration-300
                        flex items-center justify-center w-[200px] h-28
                        hover:shadow-xl">
              <img 
                :src="logo.url" 
                :alt="logo.name"
                class="h-16 w-auto object-contain transition-all duration-300"
              />
              <div class="absolute inset-0 bg-primary/5 opacity-0 hover:opacity-100 
                          rounded-2xl transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Second row of logos -->
      <div class="flex mt-8 animate-scroll-reverse group">
        <div class="flex space-x-16">
          <div v-for="logo in [...secondRowLogos, ...secondRowLogos]" :key="logo.id" 
               class="flex-none transform transition-all duration-300 hover:scale-105">
            <div class="relative bg-white/50 backdrop-blur-sm p-6 rounded-2xl 
                        hover:bg-white/80 transition-all duration-300
                        flex items-center justify-center w-[200px] h-28
                        hover:shadow-xl">
              <img 
                :src="logo.url" 
                :alt="logo.name"
                class="h-16 w-auto object-contain transition-all duration-300"
              />
              <div class="absolute inset-0 bg-primary/5 opacity-0 hover:opacity-100 
                          rounded-2xl transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { partnersData } from './partnersData'

const { firstRowLogos, secondRowLogos } = partnersData
</script>

<style scoped>
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes scroll-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

.animate-scroll {
  animation: scroll 30s linear infinite;
}

.animate-scroll-reverse {
  animation: scroll-reverse 30s linear infinite;
}

.group:hover .animate-scroll,
.group:hover .animate-scroll-reverse {
  animation-play-state: paused;
}

/* Efeito de brilho suave */
@keyframes shine {
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
}

.hover\:shadow-xl:hover {
  position: relative;
  overflow: hidden;
}

.hover\:shadow-xl:hover::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: shine 2s infinite;
}
</style>