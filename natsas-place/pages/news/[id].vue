<template>
  <!-- Loading state -->
  <div
    v-if="isLoading"
    class="flex justify-center flex-col items-center py-32 h-screen"
  >
    <a-spin :indicator="indicator" />
    <p>Carregando notícias...</p>
  </div>

  <div v-else-if="error" class="container mx-auto px-4 pb-32">
    <div class="text-center text-gray-600">
      <p>{{ error }}</p>
      <button
        @click="fetchNewsDetail"
        class="mt-4 px-6 py-2 border border-gray-200 text-gray-600 rounded-full hover:bg-gray-50 transition-all"
      >
        Tentar novamente
      </button>
    </div>
  </div>

  <section v-else class="pb-20 bg-white">
    <div class="mx-auto px-4 max-w-4xl">
      <button
        @click="router.back()"
        class="group text-gray-500 hover:text-gray-700 transition-colors flex gap-2 items-center py-2 mb-5"
      >
        <svg
          class="w-4 h-4 transition-transform group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Voltar
      </button>
      <div class="space-y-6 mb-16">
        <h1 class="text-4xl md:text-5xl font-light text-gray-900 leading-tight">
          {{ newsDetail.title }}
        </h1>
        <div class="flex w-full items-center gap-4 text-sm text-gray-500">
          <span>{{ getType(newsDetail.type) }}</span>
          <span class="w-1 h-1 rounded-full bg-gray-300"></span>
          <span>{{ formatDate(newsDetail.createdAt) }}</span>
          <span class="w-1 h-1 rounded-full bg-gray-300"></span>
          <span>{{ readingTime }} min de leitura</span>
          <button
            @click="shareNews"
            class="ml-2 text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-2"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </button>
        </div>

        <div class="mb-16">
          <img
            :src="newsDetail.imageUrl"
            :alt="newsDetail.title"
            class="w-full aspect-[16/9] object-cover rounded-lg"
          />
        </div>

        <div class="prose prose-lg max-w-none">
          <div
            v-html="sanitizeHTML(newsDetail.content)"
            class="text-gray-700 content"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useApiRequests } from "@/composables/useAxios";
import TheHeader from "@/components/layout/TheHeader.vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
import { getType } from "@/utils";
const route = useRoute();
const router = useRouter();
const { api } = useApiRequests();

const newsDetail = ref({} as any);
const isLoading = ref(true);
const error = ref<string | null>(null);

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "50px",
  },
  spin: true,
});

const fetchNewsDetail = async () => {
  try {
    isLoading.value = true;
    const { data } = await api.get(`/news/${route.params.id}`);

    if (data) {
      newsDetail.value = data;
    } else {
      error.value = "Notícia não encontrada";
    }
  } catch (err) {
    error.value = "Erro ao carregar a notícia. Tente novamente mais tarde.";
    console.error("Erro:", err);
  } finally {
    isLoading.value = false;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const sanitizeHTML = (html: string) => {
  return html
    ?.replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
};

const shareNews = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: newsDetail.value.title,
        text: newsDetail.value.description,
        url: window.location.href,
      });
    } catch (err) {
      console.error("Erro ao compartilhar:", err);
    }
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copiado para a área de transferência!");
  }
};

const readingTime = computed(() => {
  if (!newsDetail.value) return 0;

  const content =
    newsDetail.value.content +
    newsDetail.value.description +
    newsDetail.value.title;

  const plainText = content.replace(/<[^>]*>/g, "").replace(/[^\w\s]/g, "");

  const words = plainText.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);

  return minutes;
});

onMounted(() => {
  fetchNewsDetail();
});
</script>

<style scoped>
.container {
  max-width: 1280px;
}

:deep(.prose) {
  max-width: none;
}

:deep(.prose p) {
  margin-bottom: 2rem;
  line-height: 1.8;
  font-weight: 300;
  color: #374151;
}

:deep(.prose h2) {
  font-size: 1.875rem;
  font-weight: 300;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  color: #111827;
}

:deep(.prose h3) {
  font-size: 1.5rem;
  font-weight: 300;
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  color: #1f2937;
}

:deep(.prose img) {
  border-radius: 0.5rem;
  margin: 2.5rem 0;
}

:deep(.prose a) {
  color: #111827;
  text-decoration: none;
  border-bottom: 1px solid #e5e7eb;
  transition: all 0.2s;
}

:deep(.prose a:hover) {
  border-color: #9ca3af;
}

:deep(.prose blockquote) {
  font-style: normal;
  color: #4b5563;
  border-left-color: #e5e7eb;
  font-weight: 300;
}

:deep(.prose ul),
:deep(.prose ol) {
  margin: 1.5rem 0;
  padding-left: 1.5rem;
}

:deep(.prose li) {
  margin: 0.5rem 0;
  color: #4b5563;
}
</style>
