<template>
  <section class="bg-gray-50 py-24">
    <div class="container mx-auto px-4">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Planos de Assinatura para Empresas
        </h2>
        <p class="text-lg text-gray-600">
          Escolha o plano ideal para a sua empresa e comece a gerenciar sua
          reputação online de forma eficiente.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <!-- Basic Plan -->
        <div
          class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300"
        >
          <div class="p-8">
            <h3 class="text-xl font-bold mb-4">Plano Básico</h3>
            <div class="text-4xl font-bold mb-1">
              199 MT<span class="text-lg text-gray-500 font-normal">/mês</span>
            </div>
            <p class="text-gray-500 mb-6">Para pequenas empresas</p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center">
                <CheckIcon class="h-5 w-5 text-green-500 mr-2" />
                <span>Até 20 reclamações por mês</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="h-5 w-5 text-green-500 mr-2" />
                <span>Relatórios básicos</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="h-5 w-5 text-green-500 mr-2" />
                <span>1 usuário</span>
              </li>
            </ul>
            <button
              class="w-full py-3 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition duration-300"
            >
              Começar Grátis
            </button>
          </div>
        </div>

        <!-- Pro Plan -->
        <div
          class="bg-white rounded-xl shadow-xl overflow-hidden relative border-2 border-blue-500 transform scale-105 z-10"
        >
          <div
            class="absolute top-0 w-full bg-blue-500 text-white text-center py-1 text-sm font-medium"
          >
            MAIS POPULAR
          </div>
          <div class="p-8 pt-12">
            <h3 class="text-xl font-bold mb-4">Plano Profissional</h3>
            <div class="text-4xl font-bold mb-1">
              499 MT<span class="text-lg text-gray-500 font-normal">/mês</span>
            </div>
            <p class="text-gray-500 mb-6">Para empresas em crescimento</p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center">
                <CheckIcon class="h-5 w-5 text-green-500 mr-2" />
                <span>Reclamações ilimitadas</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="h-5 w-5 text-green-500 mr-2" />
                <span>Relatórios avançados</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="h-5 w-5 text-green-500 mr-2" />
                <span>Até 5 usuários</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="h-5 w-5 text-green-500 mr-2" />
                <span>Prioridade no suporte</span>
              </li>
            </ul>
            <button
              class="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition duration-300"
            >
              Escolher Plano
            </button>
          </div>
        </div>

        <!-- Enterprise Plan -->
        <div
          class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300"
        >
          <div class="p-8">
            <h3 class="text-xl font-bold mb-4">Plano Empresarial</h3>
            <div class="text-4xl font-bold mb-1">
              999 MT<span class="text-lg text-gray-500 font-normal">/mês</span>
            </div>
            <p class="text-gray-500 mb-6">Para grandes empresas</p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center">
                <CheckIcon class="h-5 w-5 text-green-500 mr-2" />
                <span>Reclamações ilimitadas</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="h-5 w-5 text-green-500 mr-2" />
                <span>Análises personalizadas</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="h-5 w-5 text-green-500 mr-2" />
                <span>Usuários ilimitados</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="h-5 w-5 text-green-500 mr-2" />
                <span>API dedicada</span>
              </li>
            </ul>
            <button
              class="w-full py-3 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition duration-300"
            >
              Contatar Vendas
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/24/outline";
</script>
