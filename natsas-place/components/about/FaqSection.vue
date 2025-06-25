<template>
  <section class="py-16 bg-gray-50">
    <div class="max-w-4xl mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">Como funciona o FeedBack Mz</h2>
        <p class="text-gray-600">Encontre respostas para as perguntas mais frequentes sobre nossa plataforma</p>
      </div>

      <!-- Barra de pesquisa -->
      <div class="mb-8 relative">
        <div class="relative">
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Pesquisar perguntas frequentes..."
            class="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <Icon 
            name="ph:magnifying-glass"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size="20"
          />
        </div>
      </div>

      <!-- Categorias -->
      <div class="flex flex-wrap gap-2 mb-8">
        <button 
          v-for="category in categories" 
          :key="category"
          @click="selectedCategory = category"
          class="px-4 py-2 rounded-full text-sm transition-all"
          :class="selectedCategory === category 
            ? 'bg-primary text-white' 
            : 'bg-white text-gray-600 hover:bg-gray-100'"
        >
          {{ category }}
        </button>
      </div>

      <!-- FAQs filtrados -->
      <div class="space-y-4">
        <TransitionGroup name="fade">
          <FaqItem
            v-for="faq in filteredFaqs"
            :key="faq.id"
            :question="faq.question"
            :answer="faq.answer"
            @opened="handleFaqOpen(faq.id)"
          />
        </TransitionGroup>
      </div>

      <!-- Não encontrou o que procurava -->
      <div class="mt-12 text-center bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold mb-2">Não encontrou o que procurava?</h3>
        <p class="text-gray-600 mb-4">Entre em contato conosco que responderemos todas as suas dúvidas</p>
        <button 
          @click="openContactForm"
          class="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-all transform hover:scale-105"
        >
          Falar com Suporte
        </button>
      </div>
    </div>

    <!-- Modal de Contato -->
    <ContactModal 
      v-if="showContactModal"
      @close="showContactModal = false"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFaqData } from './useFaqData'
import FaqItem from './FaqItem.vue'

const { faqs } = useFaqData()
const searchQuery = ref('')
const selectedCategory = ref('Todos')
const showContactModal = ref(false)

const categories = computed(() => {
  const uniqueCategories = new Set(faqs.map(faq => faq.category))
  return ['Todos', ...uniqueCategories]
})

const filteredFaqs = computed(() => {
  let filtered = faqs

  // Filtrar por categoria
  if (selectedCategory.value !== 'Todos') {
    filtered = filtered.filter(faq => faq.category === selectedCategory.value)
  }

  // Filtrar por pesquisa
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(faq => 
      faq.question.toLowerCase().includes(query) || 
      faq.answer.toLowerCase().includes(query)
    )
  }

  return filtered
})

const handleFaqOpen = (faqId: number) => {
  // Você pode adicionar analytics aqui
  console.log(`FAQ ${faqId} foi aberto`)
}

const openContactForm = () => {
  showContactModal.value = true
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>