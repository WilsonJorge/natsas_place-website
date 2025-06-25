<template>
  <section id="news" class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-light text-center mb-12">Últimas Notícias</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="news in latestNews"
          :key="news.id"
          class="group border border-gray-100 hover:border-gray-200 transition-all duration-300"
        >
          <div class="aspect-video overflow-hidden">
            <img
              :src="news.imageUrl"
              :alt="news.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div class="p-6 space-y-4">
            <span class="text-sm text-gray-400">{{ daysjs(news.createdAt).format("DD/MM/YYYY") }}</span>

            <h3 class="text-lg font-normal">{{ news.title }}</h3>

            <p class="text-sm text-gray-600 line-clamp-2">{{ news.description }}</p>

            <a
              href="#"
              class="inline-block text-sm text-gray-800 hover:text-gray-600 transition-colors"
            >
              Ler mais →
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useApiRequests } from "@/composables/useAxios";
import { message } from "ant-design-vue";
import  daysjs from "dayjs";

const latestNews = ref([]);

const { api } = useApiRequests();

const handleGetNews = async () => {
  try {
    const { data } = await api.get("/news");

    latestNews.value = data.data;
  } catch (error) {
    message.error("Erro ao buscar notícias");
    console.error(error);
  }
};

onMounted(() => {
  handleGetNews();
});
</script>
