<template>
  <section id="internacional" class="py-12">
    <div class="flex items-center mb-8">
      <div class="w-0.5 h-6 bg-gray-400 mr-3"></div>
      <h2 class="text-base font-medium text-gray-600 uppercase tracking-wide">
        Internacional
      </h2>
    </div>

    <div v-if="news.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        v-for="item in news"
        :key="item.id"
        class="group cursor-pointer"
        @click="$emit('news-click', item.id)"
      >
        <div class="overflow-hidden rounded-lg mb-4">
          <img
            :src="item.image"
            :alt="`Imagem: ${item.name}`"
            class="w-full h-48 object-cover transition-all duration-300 group-hover:scale-102"
          />
        </div>
        <span class="text-xs text-gray-500 block mb-2">{{ item.date }}</span>
        <h4
          class="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors mb-2"
        >
          {{ item.name }}
        </h4>
        <p class="text-sm text-gray-500 line-clamp-2">
          {{ item.description }}
        </p>
      </div>
    </div>

    <div v-else class="py-10 text-center text-gray-500">
      Nenhuma notícia internacional disponível no momento.
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

defineProps({
  news: {
    type: Array as PropType<any[]>,
    required: true,
  },
});

defineEmits(["news-click"]);
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
