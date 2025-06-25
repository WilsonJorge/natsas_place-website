<template>
  <section class="relative overflow-hidden bg-black text-white">
    <div
      v-for="(image, index) in images"
      :key="index"
      class="absolute inset-0 transition-opacity duration-1000"
      :class="{
        'opacity-30': index === currentImageIndex,
        'opacity-0': index !== currentImageIndex,
      }"
      :style="{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }"
    ></div>

    <div class="container mx-auto px-4 relative h-[70vh] 2xl:h-auto">
      <div class="max-w-2xl mx-auto text-center py-12 2xl:py-32">
        <h1
          class="text-4xl md:text-5xl font-bold mb-8 leading-tight tracking-tight"
        >
          Sua Opinião Faz a Diferença
        </h1>
        <p class="text-lg md:text-xl mb-12 text-blue-100/90 leading-relaxed">
          Um espaço onde sua voz é valorizada e suas experiências ajudam a
          construir um relacionamento melhor entre empresas e clientes.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
button {
  transition: background 0.2s;
}

.transition-opacity {
  transition: opacity 1s ease-in-out;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import TheHeader from "@/components/layout/TheHeader.vue";

const images = ["/hero.jpg"];

const currentImageIndex = ref(0);
const isModalOpen = ref(false);
let intervalId;

// Função para alternar imagens
const rotateBackground = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
};

// Configurar e limpar o intervalo
onMounted(() => {
  intervalId = setInterval(rotateBackground, 20000); // 20 segundos para uma transição mais suave
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>
