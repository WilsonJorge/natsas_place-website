<template>
  <section class="py-16 bg-white text-gray-800">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Pronto para resolver reclamações e melhorar sua reputação?
        </h2>
        <p class="text-xl text-gray-600 mb-8">
          Junte-se a mais de 750 empresas que já transformam feedback negativo
          em crescimento.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <!-- Plano Básico -->
          <div class="bg-gray-100 rounded-lg p-6 text-left">
            <h3 class="text-xl font-bold mb-1">Básico</h3>
            <div class="text-3xl font-bold">
              199 MT<span class="text-sm font-normal text-gray-500">/mês</span>
            </div>
            <p class="text-gray-600 text-sm mb-4">Para pequenas empresas</p>
            <ul class="space-y-2 mb-6 text-sm">
              <li>✓ 20 reclamações/mês</li>
              <li>✓ Relatórios básicos</li>
              <li>✓ 1 usuário</li>
            </ul>
            <button
              class="w-full py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-all"
            >
              Começar
            </button>
          </div>

          <!-- Plano Pro -->
          <div
            class="bg-blue-600 rounded-lg p-6 text-left text-white transform scale-105 shadow-lg"
          >
            <h3 class="text-xl font-bold mb-1">Profissional</h3>
            <div class="text-3xl font-bold">
              499 MT<span class="text-sm font-normal text-blue-100">/mês</span>
            </div>
            <p class="text-blue-100 text-sm mb-4">Mais popular</p>
            <ul class="space-y-2 mb-6 text-sm">
              <li>✓ Reclamações ilimitadas</li>
              <li>✓ Relatórios avançados</li>
              <li>✓ 5 usuários</li>
            </ul>
            <button
              class="w-full py-2 bg-white text-blue-600 rounded font-medium hover:bg-blue-50 transition-all"
            >
              Escolher
            </button>
          </div>

          <!-- Plano Enterprise -->
          <div class="bg-gray-100 rounded-lg p-6 text-left">
            <h3 class="text-xl font-bold mb-1">Empresarial</h3>
            <div class="text-3xl font-bold">
              999 MT<span class="text-sm font-normal text-gray-500">/mês</span>
            </div>
            <p class="text-gray-600 text-sm mb-4">Para grandes empresas</p>
            <ul class="space-y-2 mb-6 text-sm">
              <li>✓ Reclamações ilimitadas</li>
              <li>✓ Análises personalizadas</li>
              <li>✓ Usuários ilimitados</li>
            </ul>
            <button
              class="w-full py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-all"
            >
              Contatar
            </button>
          </div>
        </div>

        <div class="max-w-2xl mx-auto">
          <p class="text-sm text-gray-600 mb-4">
            "A plataforma FeedbackMZ transformou nossa abordagem às reclamações.
            Nossa satisfação do cliente aumentou 35% em apenas 3 meses."
          </p>
          <div class="flex items-center justify-center">
            <div
              class="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3"
            >
              <img
                src="https://randomuser.me/api/portraits/women/28.jpg"
                alt="Ana Machava"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="text-left">
              <h4 class="font-bold">Ana Machava</h4>
              <p class="text-sm text-gray-600">Diretora, TechSolutions MZ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No additional script needed
</script>
