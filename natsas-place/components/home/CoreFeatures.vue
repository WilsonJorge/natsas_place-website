<template>
  <section id="features" class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center mb-12">
        <h2 class="text-3xl font-bold mb-3 text-gray-800">
          Recursos Principais
        </h2>
        <p class="text-lg text-gray-600">
          Ferramentas essenciais para gerenciar reclamações e melhorar a
          experiência do cliente.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <!-- Feature 1 -->
        <div
          class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
        >
          <div
            class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4"
          >
            <svg
              class="w-6 h-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2 text-gray-800">Registro Simples</h3>
          <p class="text-gray-600">
            Processo intuitivo para registrar e acompanhar reclamações em
            minutos.
          </p>
        </div>

        <!-- Feature 2 -->
        <div
          class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
        >
          <div
            class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4"
          >
            <svg
              class="w-6 h-6 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2 text-gray-800">Análise de Dados</h3>
          <p class="text-gray-600">
            Painéis analíticos para identificar padrões e melhorar seus
            serviços.
          </p>
        </div>

        <!-- Feature 3 -->
        <div
          class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
        >
          <div
            class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4"
          >
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2 text-gray-800">
            Comunicação Direta
          </h3>
          <p class="text-gray-600">
            Canal direto entre consumidores e empresas para resolução eficiente.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No additional script needed
</script>
