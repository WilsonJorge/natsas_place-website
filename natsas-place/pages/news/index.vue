<template>
  <div class="news-page bg-white min-h-screen">
    <!-- Loading States -->
    <div v-if="isLoading" class="py-16">
      <div class="container mx-auto px-4">
        <!-- Skeleton loading -->
        <div class="animate-pulse mb-12">
          <div class="h-[300px] bg-gray-100 rounded-lg mb-4"></div>
          <div class="h-6 bg-gray-100 rounded w-1/3 mb-2"></div>
          <div class="h-4 bg-gray-100 rounded w-1/2"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="i in 4" :key="i" class="animate-pulse">
            <div class="h-[180px] bg-gray-100 rounded-lg mb-3"></div>
            <div class="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-gray-100 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>

    <ErrorState
      v-else-if="error"
      :error="error"
      @retry="fetchNews"
      class="py-20"
    />

    <div v-else>
      <!-- Hero Section -->
      <section class="py-10 bg-gray-50 border-b border-gray-100">
        <div class="container mx-auto px-4">
          <h1 class="text-2xl text-gray-800 font-medium mb-6">
            Notícias e Comunicações
          </h1>

          <!-- Search and filter bar -->
          <div class="flex flex-col md:flex-row gap-4 mb-2">
            <div class="relative flex-grow">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Pesquisar notícias..."
                class="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-800 focus:outline-none focus:border-gray-400"
                @input="currentPage = 1"
              />
              <button class="absolute right-3 top-2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>

            <div class="flex gap-2">
              <select
                v-model="selectedCategory"
                class="bg-white px-4 py-2 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:border-gray-400"
                @change="currentPage = 1"
              >
                <option value="">Todas as categorias</option>
                <option value="NATIONAL">Nacional</option>
                <option value="INTERNATIONAL">Internacional</option>
                <option value="COMMUNICATION">Comunicações</option>
              </select>

              <select
                v-model="sortOption"
                class="bg-white px-4 py-2 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:border-gray-400"
              >
                <option value="newest">Mais recentes</option>
                <option value="oldest">Mais antigas</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured News Carousel -->
      <div v-if="slides.length > 0" class="pt-6 pb-10">
        <div class="container mx-auto px-4">
          <a-carousel autoplay class="rounded-lg overflow-hidden">
            <div
              v-for="(slide, index) in slides"
              :key="index"
              class="relative h-[350px]"
            >
              <img
                :src="(slide as any).image || '/images/news-placeholder.jpg'"
                :alt="(slide as any).title"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 flex items-end p-6"
                style="
                  background: linear-gradient(
                    to top,
                    rgba(0, 0, 0, 0.7) 0%,
                    rgba(0, 0, 0, 0) 100%
                  );
                "
              >
                <div>
                  <h3 class="text-white text-xl font-medium mb-2">
                    {{ (slide as any).title }}
                  </h3>
                  <p class="text-white/80 text-sm line-clamp-2">
                    {{ (slide as any).description }}
                  </p>
                </div>
              </div>
            </div>
          </a-carousel>
        </div>
      </div>

      <main class="container mx-auto px-4">
        <!-- No results message -->
        <div v-if="filteredHighlights.length === 0" class="py-16 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 mx-auto text-gray-300 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14h.01M19 21a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
          <h3 class="text-lg font-medium text-gray-700 mb-1">
            Nenhuma notícia encontrada
          </h3>
          <p class="text-gray-500 mb-4">
            Tente modificar seus filtros ou pesquisa
          </p>
          <button
            @click="resetFilters"
            class="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Limpar filtros
          </button>
        </div>

        <!-- News Highlights Section -->
        <NewsHighlights
          v-else
          :highlights="paginatedHighlights"
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-change="currentPage = $event"
          @news-click="goToDetails"
        />

        <!-- Communications Section (conditional) -->
        <CommunicationsSection
          v-if="!selectedCategory || selectedCategory === 'COMMUNICATION'"
          :communications="peopleInFocus"
          @news-click="goToDetails"
        />

        <!-- International Section (conditional) -->
        <InternationalSection
          v-if="!selectedCategory || selectedCategory === 'INTERNATIONAL'"
          :news="internationalNews"
          @news-click="goToDetails"
        />
      </main>

      <!-- Back to top button -->
      <button
        v-show="showBackToTop"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        aria-label="Voltar ao topo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useApiRequests } from "@/composables/useAxios";
import NewsHighlights from "@/components/news/NewsHighlights.vue";
import CommunicationsSection from "@/components/news/CommunicationsSection.vue";
import InternationalSection from "@/components/news/InternationalSection.vue";
import ErrorState from "@/components/news/ErrorState.vue";

import { LoadingOutlined } from "@ant-design/icons-vue";
import { h } from "vue";

const router = useRouter();
const { api } = useApiRequests();

// State
const isLoading = ref(true);
const error = ref("");
const news = ref([]);
const slides = ref([]);
const highlights = ref([]);
const currentPage = ref(1);
const itemsPerPage = 8; // Increased from 4
const searchQuery = ref("");
const selectedCategory = ref("");
const sortOption = ref("newest");
const showBackToTop = ref(false);

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "50px",
  },
  spin: true,
});

// Navigation
const goToDetails = (id: string) => {
  router.push(`/news/${id}`);
};

// Data fetching
const fetchNews = async () => {
  try {
    isLoading.value = true;
    error.value = "";
    const { data } = await api.get("/news");

    if (data?.data) {
      news.value = data.data;

      slides.value = data.data
        .filter((item: any) => item.status === "PUBLISHED")
        .slice(0, 5)
        .map((item: any) => ({
          id: item.id,
          image: item.imageUrl,
          title: item.title,
          description: item.description,
        }));

      highlights.value = data.data
        .filter((item: any) => item.status === "PUBLISHED")
        .map((item: any) => ({
          id: item.id,
          title: item.title,
          excerpt: item.description,
          image: item.imageUrl,
          date: new Date(item.createdAt).toLocaleDateString("pt-BR"),
          type: item.type,
          category: item.category,
        }));
    }
  } catch (err) {
    error.value = "Erro ao carregar as notícias. Tente novamente mais tarde.";
    console.error("Erro:", err);
  } finally {
    isLoading.value = false;
  }
};

// Filtered and sorted highlights
const filteredHighlights = computed(() => {
  let result = [...highlights.value];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (item: any) =>
        item.title.toLowerCase().includes(query) ||
        item.excerpt.toLowerCase().includes(query)
    );
  }

  // Apply category filter
  if (selectedCategory.value) {
    result = result.filter((item: any) => {
      if (selectedCategory.value === "COMMUNICATION") {
        return item.type === "COMMUNICATION";
      }
      return item.category === selectedCategory.value;
    });
  }

  // Apply sorting
  result.sort((a: any, b: any) => {
    const dateA = new Date(a.date.split("/").reverse().join("-"));
    const dateB = new Date(b.date.split("/").reverse().join("-"));

    return sortOption.value === "newest"
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
  });

  return result;
});

// Paginated results
const paginatedHighlights = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredHighlights.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredHighlights.value.length / itemsPerPage)
);

// People in focus section
const peopleInFocus = computed(() => {
  return news.value
    .filter(
      (item: any) =>
        item.type === "COMMUNICATION" && item.status === "PUBLISHED"
    )
    .slice(0, 3)
    .map((item: any) => ({
      id: item.id,
      name: item.title,
      description: item.description,
      image: item.imageUrl,
      date: new Date(item.createdAt).toLocaleDateString("pt-BR"),
    }));
});

// International news section
const internationalNews = computed(() => {
  return news.value
    .filter(
      (item: any) =>
        item.category === "INTERNATIONAL" && item.status === "PUBLISHED"
    )
    .map((item: any) => ({
      id: item.id,
      name: item.title,
      description: item.description,
      image: item.imageUrl,
      date: new Date(item.createdAt).toLocaleDateString("pt-BR"),
    }));
});

// Reset filters
const resetFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  sortOption.value = "newest";
  currentPage.value = 1;
};

// Back to top functionality
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const checkScroll = () => {
  showBackToTop.value = window.scrollY > 500;
};

// Reset pagination when filters change
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1;
});

onMounted(() => {
  fetchNews();
  window.addEventListener("scroll", checkScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll);
});
</script>

<style scoped>
.news-page {
  min-height: 100vh;
}

/* Fade transition for content */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
