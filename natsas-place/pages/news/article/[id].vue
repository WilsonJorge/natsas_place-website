<template>
  <div>
    <TheHeader background="black" />

    <!-- Loading state -->
    <div v-if="isLoading">
      <div class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-8 text-red-600">
      <p>{{ error }}</p>
      <button 
        @click="fetchArticle" 
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Tentar novamente
      </button>
    </div>

    <!-- Article Content -->
    <div v-else class="container mx-auto px-4 py-8">
      <!-- Article Header -->
      <div class="max-w-4xl mx-auto mb-8">
        <img 
          :src="article.image" 
          :alt="article.title"
          class="w-full h-[400px] object-cover rounded-lg shadow-lg mb-6"
        />
        <div class="flex items-center gap-4 mb-4">
          <span class="text-sm text-gray-500">{{ article.date }}</span>
          <span class="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
            {{ article.readTime }}
          </span>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ article.title }}</h1>
        <div class="flex items-center gap-4">
          <img 
            :src="article.author.avatar" 
            :alt="article.author.name"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p class="font-semibold text-gray-900">{{ article.author.name }}</p>
            <p class="text-sm text-gray-500">{{ article.author.role }}</p>
          </div>
        </div>
      </div>

      <!-- Article Body -->
      <div class="max-w-3xl mx-auto prose prose-lg">
        <div v-html="article.content"></div>
      </div>

      <!-- Share Buttons -->
      <div class="max-w-3xl mx-auto mt-8 flex justify-center gap-4">
        <button 
          v-for="social in socialShare" 
          :key="social.name"
          @click="shareArticle(social.type)"
          class="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
          :class="social.class"
        >
          <i :class="social.icon"></i>
          {{ social.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useApiRequests } from '@/composables/useAxios';

const route = useRoute();
const { api } = useApiRequests();
const isLoading = ref(true);
const error = ref(null);
const article = ref({});

const socialShare = [
  {
    name: 'Compartilhar no Twitter',
    type: 'twitter',
    icon: 'fab fa-twitter',
    class: 'bg-blue-400 text-white hover:bg-blue-500'
  },
  {
    name: 'Compartilhar no Facebook',
    type: 'facebook',
    icon: 'fab fa-facebook',
    class: 'bg-blue-600 text-white hover:bg-blue-700'
  },
  {
    name: 'Compartilhar no LinkedIn',
    type: 'linkedin',
    icon: 'fab fa-linkedin',
    class: 'bg-blue-700 text-white hover:bg-blue-800'
  }
];

const fetchArticle = async () => {
  try {
    isLoading.value = true;
    // Simulando uma chamada à API com dados fixos
    const mockData = {
      id: route.params.id,
      title: 'Como a Inteligência Artificial está Transformando o Mundo',
      createdAt: '2024-03-20',
      readTime: '5 min de leitura',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      author: 'Maria Silva',
      role: 'Especialista em Tecnologia',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      content: `
        <h2>O Impacto da IA no Nosso Cotidiano</h2>
        <p>A Inteligência Artificial está revolucionando a forma como vivemos e trabalhamos. 
        Desde assistentes virtuais até carros autônomos, a IA está presente em praticamente todos os aspectos de nossas vidas.</p>

        <h2>Principais Aplicações</h2>
        <p>Alguns dos campos mais promissores para a IA incluem:</p>
        <ul>
          <li>Medicina e diagnóstico</li>
          <li>Automação industrial</li>
          <li>Assistentes virtuais</li>
          <li>Análise de dados</li>
        </ul>

        <h2>O Futuro da IA</h2>
        <p>Especialistas preveem que nos próximos anos veremos avanços ainda mais significativos 
        no campo da Inteligência Artificial, com impactos profundos em todas as áreas da sociedade.</p>

        <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995" alt="IA Conceito" />
      `
    };

    // Simulando um delay de carregamento
    await new Promise(resolve => setTimeout(resolve, 1000));

    article.value = {
      ...mockData,
      date: new Date(mockData.createdAt).toLocaleDateString('pt-BR'),
      author: {
        name: mockData.author,
        role: mockData.role,
        avatar: mockData.authorAvatar
      }
    };
  } catch (err) {
    error.value = 'Erro ao carregar o artigo. Tente novamente mais tarde.';
    console.error('Erro:', err);
  } finally {
    isLoading.value = false;
  }
};

const shareArticle = (platform) => {
  const url = window.location.href;
  const text = article.value.title;

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  };

  window.open(shareUrls[platform], '_blank');
};

onMounted(() => {
  fetchArticle();
});
</script>

<style>
/* Adicione estes estilos se você estiver usando o Tailwind Typography */
.prose {
  max-width: 100%;
}

.prose img {
  border-radius: 0.5rem;
  margin: 2rem auto;
}

.prose h2 {
  color: #1a202c;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose p {
  margin-bottom: 1.5rem;
  line-height: 1.8;
}
</style>
