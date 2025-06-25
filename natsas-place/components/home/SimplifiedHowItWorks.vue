<template>
  <section id="how-it-works" class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center mb-10">
        <h2 class="text-3xl font-bold mb-3 text-gray-800">Como Funciona</h2>
        <p class="text-lg text-gray-600">
          Processo simples de 3 passos para resolver reclamações
        </p>
      </div>

      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Step 1 -->
          <div class="bg-blue-50 rounded-lg p-6 relative">
            <div
              class="absolute -top-4 -left-4 w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center font-bold shadow-md"
            >
              1
            </div>
            <h3 class="text-xl font-bold mb-3 mt-2 text-gray-800">Registre</h3>
            <p class="text-gray-600">
              Preencha o formulário de reclamação com detalhes necessários.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="bg-indigo-50 rounded-lg p-6 relative">
            <div
              class="absolute -top-4 -left-4 w-10 h-10 bg-indigo-500 rounded-full text-white flex items-center justify-center font-bold shadow-md"
            >
              2
            </div>
            <h3 class="text-xl font-bold mb-3 mt-2 text-gray-800">
              Notificação
            </h3>
            <p class="text-gray-600">
              A empresa recebe notificação e analisa seu caso imediatamente.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="bg-green-50 rounded-lg p-6 relative">
            <div
              class="absolute -top-4 -left-4 w-10 h-10 bg-green-500 rounded-full text-white flex items-center justify-center font-bold shadow-md"
            >
              3
            </div>
            <h3 class="text-xl font-bold mb-3 mt-2 text-gray-800">Resolução</h3>
            <p class="text-gray-600">
              Acompanhe a resposta e resolução do seu problema em tempo real.
            </p>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 text-center">
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="text-3xl font-bold text-blue-600">5k+</div>
            <div class="text-sm text-gray-600">Reclamações Resolvidas</div>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="text-3xl font-bold text-blue-600">750+</div>
            <div class="text-sm text-gray-600">Empresas</div>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="text-3xl font-bold text-blue-600">85%</div>
            <div class="text-sm text-gray-600">Taxa de Resolução</div>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="text-3xl font-bold text-blue-600">12k+</div>
            <div class="text-sm text-gray-600">Usuários</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No additional script needed
</script>
