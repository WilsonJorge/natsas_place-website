<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- Main Heading -->
    <div class="space-y-6">
      <h3 class="text-4xl font-bold leading-tight">
        <span class="text-primary">Transforme</span> o Feedback dos Seus Clientes em 
        <span class="text-primary">Oportunidades de Crescimento</span>
      </h3>
      <p class="text-xl text-gray-600 leading-relaxed">
        <span class="font-semibold">64,79% dos usuários afirmam</span> que o FeedbackMZ
        <span class="text-primary font-semibold">influencia muito nas decisões de compra</span>.
        Seja considerado para a decisão final do seu consumidor!
      </p>
    </div>

    <div class="space-y-4">
        <NuxtLink 
          to="/auth/register" 
          class="inline-block w-full md:w-auto bg-primary text-white px-8 py-3 rounded-md hover:bg-primary-dark transition-colors">
          Cadastre a sua Empresa!
        </NuxtLink>
        <p class="text-gray-600">
          Se já possui cadastro, basta
          <NuxtLink to="/auth/login" class="text-primary hover:underline">
            fazer login
          </NuxtLink>!
        </p>
      </div>

    <!-- Statistics Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
      <div v-for="stat in stats" :key="stat.label" 
           class="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <component :is="stat.icon" 
                  :class="[stat.color, 'w-8 h-8 mb-2']" />
        <div :class="[stat.color, 'text-2xl font-bold']">{{ stat.value }}</div>
        <div class="text-sm text-gray-600">{{ stat.label }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { Users, Building2, Star, TrendingUp } from 'lucide-vue-next';

const stats = [
  { 
    icon: Users, 
    value: '2M+', 
    label: 'Usuários Ativos',
    color: 'text-primary' 
  },
  { 
    icon: Building2, 
    value: '50K+', 
    label: 'Empresas Cadastradas',
    color: 'text-primary' 
  },
  { 
    icon: Star, 
    value: '4.8/5', 
    label: 'Avaliação Média',
    color: 'text-primary' 
  },
  { 
    icon: TrendingUp, 
    value: '95%', 
    label: 'Taxa de Resolução',
    color: 'text-primary' 
  }
];
</script>