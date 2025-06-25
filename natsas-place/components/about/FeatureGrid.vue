<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- Título centralizado -->
    <div class="text-center mb-8">
      <!-- <h2 class="text-3xl font-bold text-gray-900">O que Nos Destingue</h2> -->
      <h3 class="text-4xl font-bold leading-tight">
        <span class="text-blue-600">O que Nos Destingue ?</span>
      </h3>
      <p class="text-xl text-black-600 mt-4">
        Descubra os recursos que tornam nossa plataforma única e inovadora.
      </p>
    </div>

    <!-- Grid de Features -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div
        v-for="feature in features"
        :key="feature.title"
        class="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center border-b-4 border-blue-500 hover:border-green-500"
      >
        <div class="flex justify-center mb-4">
          <component
            :is="feature.icon"
            class="h-12 w-12 text-blue-600 transition-colors duration-300 group-hover:text-green-600"
          />
        </div>
        <h3
          class="text-xl font-semibold mb-2 text-gray-800 hover:text-blue-600 transition-colors duration-300"
        >
          {{ feature.title }}
        </h3>
        <p class="text-gray-600 group-hover:text-gray-700">
          {{ feature.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid > div {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
  cursor: pointer;
}

.grid > div:hover {
  background: rgba(255, 255, 255, 1);
}
</style>

<script setup lang="ts">
import { MessageSquare, Clock, Shield, Users } from "lucide-vue-next";

const features = [
  {
    icon: MessageSquare,
    title: "Envio Fácil",
    description: "Processo simples e intuitivo para envio de reclamações ",
  },
  {
    icon: Clock,
    title: "Resposta Rápida",
    description: "Garantia de resposta em até 24 horas",
  },
  {
    icon: Shield,
    title: "Seguro & Privado",
    description:
      "Seus dados estão protegidos com segurança de nível empresarial",
  },
  {
    icon: Users,
    title: "Equipe Especializada",
    description: "Equipe de suporte dedicada para lidar com suas preocupações",
  },
];
</script>
