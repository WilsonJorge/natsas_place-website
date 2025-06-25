<template>
  <section id="news-page" class="py-12">
    <div class="flex items-center mb-8">
      <div class="w-0.5 h-6 bg-gray-400 mr-3"></div>
      <h2 class="text-base font-medium text-gray-600 uppercase tracking-wide">
        Destaques
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div
        v-for="(highlight, index) in highlights"
        :key="index"
        class="group cursor-pointer"
        @click="$emit('news-click', highlight.id)"
      >
        <div class="overflow-hidden rounded-lg mb-4">
          <img
            :src="highlight.image"
            :alt="`Imagem da notícia: ${highlight.title}`"
            class="w-full h-48 object-cover transition-all duration-300 group-hover:scale-102"
          />
        </div>
        <div class="flex gap-3 mb-2">
          <span class="text-xs text-gray-500">{{ highlight.date }}</span>
          <span class="text-xs text-blue-500">{{
            getType(highlight.type)
          }}</span>
        </div>
        <h4
          class="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors"
        >
          {{ highlight.title }}
        </h4>
        <p class="text-sm text-gray-500 mt-2 line-clamp-2">
          {{ highlight.excerpt }}
        </p>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="highlights.length === 0" class="py-10 text-center text-gray-500">
      Não há notícias em destaque no momento.
    </div>

    <!-- Simplified Pagination -->
    <div v-if="totalPages > 1" class="flex justify-center mt-12">
      <div class="flex items-center gap-2">
        <button
          @click="$emit('page-change', Math.max(1, currentPage - 1))"
          class="px-3 py-2 text-gray-600 hover:text-blue-600 disabled:opacity-50"
          :disabled="currentPage === 1"
          aria-label="Página anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <div class="text-sm font-medium text-gray-700">
          <span>{{ currentPage }}</span>
          <span class="mx-2 text-gray-400">/</span>
          <span>{{ totalPages }}</span>
        </div>

        <button
          @click="$emit('page-change', Math.min(totalPages, currentPage + 1))"
          class="px-3 py-2 text-gray-600 hover:text-blue-600 disabled:opacity-50"
          :disabled="currentPage === totalPages"
          aria-label="Próxima página"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { getType } from "@/utils";

defineProps({
  highlights: {
    type: Array as PropType<any[]>,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

defineEmits(["news-click", "page-change"]);
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.group-hover\:scale-102:hover {
  transform: scale(1.02);
}
</style>
