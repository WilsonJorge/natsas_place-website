<template>
  <div
    class="relative overflow-hidden"
    @mouseenter="pauseAutoRotate"
    @mouseleave="resumeAutoRotate"
  >
    <!-- Carousel Container -->
    <div class="relative">
      <div
        class="flex transition-transform duration-700 ease-in-out gap-6"
        :style="{ transform: `translateX(-${currentTranslate}%)` }"
      >
        <TestimonialCard
          v-for="testimonial in allTestimonials"
          :key="testimonial.uniqueId"
          v-bind="testimonial"
          class="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
        />
      </div>
    </div>

    <!-- Pagination Dots -->
    <div class="flex justify-center gap-2 mt-8">
      <div
        v-for="(_, index) in totalPages"
        :key="index"
        @click="goToPage(index)"
        :class="[
          'w-2 h-2 rounded-full cursor-pointer transition-all duration-300',
          currentPage === index ? 'bg-blue-600 w-4' : 'bg-gray-300',
        ]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import TestimonialCard from "./TestimonialCard.vue";

const testimonials = [
  {
    id: 1,
    text: "O FeedbackMZ transformou nossa relação com os clientes. A plataforma é intuitiva e os resultados são impressionantes.",
    author: "Maria Silva",
    company: "Tech Solutions",
  },
  {
    id: 2,
    text: "Aumentamos nossa satisfação do cliente em 45% após implementar o FeedbackMZ.",
    author: "João Santos",
    company: "Retail Pro",
  },
  {
    id: 3,
    text: "Excelente ferramenta para gestão de feedback. Nosso tempo de resposta diminuiu 60%.",
    author: "Ana Costa",
    company: "Service Plus",
  },
  {
    id: 4,
    text: "A melhor decisão que tomamos foi adotar o FeedbackMZ. O suporte é excepcional.",
    author: "Pedro Lima",
    company: "Digital Systems",
  },
  {
    id: 5,
    text: "Conseguimos identificar pontos de melhoria que não víamos antes. Fundamental para nosso crescimento.",
    author: "Carla Mendes",
    company: "Innovation Corp",
  },
  {
    id: 6,
    text: "A integração foi simples e o retorno foi imediato. Recomendo fortemente.",
    author: "Roberto Alves",
    company: "Smart Tech",
  },
  {
    id: 7,
    text: "Nossa equipe está mais eficiente graças ao FeedbackMZ. Ferramenta essencial!",
    author: "Lucia Santos",
    company: "Global Services",
  },
];

// Modificar a preparação dos testimonials
const allTestimonials = computed(() => {
  // Criar três conjuntos de testimonials para efeito infinito
  const triple = [...testimonials, ...testimonials, ...testimonials].map(
    (item, index) => ({
      ...item,
      uniqueId: `${item.id}-${index}`, // Adicionar ID único para key
    })
  );
  return triple;
});

const currentTranslate = computed(() => {
  const itemWidth = 100 / itemsPerPage;
  return currentPage.value * itemWidth;
});

const itemsPerPage = 3;
const currentPage = ref(0);
const autoRotateInterval = ref<number | null>(null);
const ROTATION_DELAY = 5000; // Aumentado para 7 segundos para uma transição mais lenta

const totalPages = computed(() =>
  Math.ceil(testimonials.length / itemsPerPage)
);

const goToPage = (page: number) => {
  currentPage.value = page;

  // Reset para o início quando chegar ao final do segundo conjunto
  if (currentPage.value >= testimonials.length) {
    setTimeout(() => {
      currentPage.value = 0;
    }, 5000); // Mesmo tempo que a duração da transição
  }
};

const startAutoRotate = () => {
  autoRotateInterval.value = setInterval(() => {
    currentPage.value = (currentPage.value + 1) % totalPages.value;
  }, ROTATION_DELAY);
};

const stopAutoRotate = () => {
  if (autoRotateInterval.value) {
    clearInterval(autoRotateInterval.value);
    autoRotateInterval.value = null;
  }
};

const pauseAutoRotate = () => {
  stopAutoRotate();
};

const resumeAutoRotate = () => {
  startAutoRotate();
};

onMounted(() => {
  startAutoRotate();
});

onUnmounted(() => {
  stopAutoRotate();
});
</script>

<style scoped>
/* Remover estilos anteriores de animação, usar apenas: */
.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 700ms;
}
</style>
