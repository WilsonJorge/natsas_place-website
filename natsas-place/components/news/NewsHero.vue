<template>
  <div class="carousel-container">
    <swiper
      :slides-per-view="1"
      :space-between="0"
      :pagination="{ clickable: true }"
      :navigation="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
      :loop="true"
      :effect="'fade'"
      :modules="[Autoplay, Pagination, Navigation, EffectFade]"
      class="mySwiper"
      aria-label="Carrossel de notícias em destaque"
    >
      <swiper-slide v-for="(item, index) in slides" :key="index">
        <div class="slide-content">
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full h-[70vh] object-cover"
          />
          <div
            class="absolute inset-0 flex flex-col justify-end bg-gradient-overlay"
          >
            <div class="container mx-auto px-4 pb-12">
              <h3 class="text-4xl font-bold text-white mb-4">
                {{ item.title }}
              </h3>
              <p class="text-xl text-gray-100 max-w-2xl">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

defineProps({
  slides: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.mySwiper {
  width: 100%;
  height: 80vh;
  position: relative;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.slide-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.slide-content img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bg-gradient-overlay {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.6) 30%,
    rgba(0, 0, 0, 0.2) 70%,
    rgba(0, 0, 0, 0) 100%
  );
}

/* Responsive styles */
@media (max-width: 1024px) {
  .mySwiper {
    height: 70vh;
  }

  .slide-content h3 {
    font-size: 2rem;
  }

  .slide-content p {
    font-size: 1.125rem;
  }
}

@media (max-width: 768px) {
  .mySwiper {
    height: 60vh;
  }

  .slide-content h3 {
    font-size: 1.75rem;
  }

  .slide-content p {
    font-size: 1rem;
  }
}

@media (max-width: 640px) {
  .mySwiper {
    height: 50vh;
  }

  .slide-content h3 {
    font-size: 1.5rem;
  }

  .slide-content p {
    font-size: 0.875rem;
  }
}

/* Swiper controls styling */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: white;
  background: rgba(0, 0, 0, 0.3);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: rgba(0, 0, 0, 0.5);
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 1.25rem;
}

:deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background: white;
  opacity: 0.5;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  width: 24px;
  border-radius: 5px;
}

/* Slide fade animation */
.swiper-slide-active {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.swiper-slide-inactive {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}
</style>
