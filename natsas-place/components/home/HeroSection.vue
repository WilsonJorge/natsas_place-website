<template>
  <section
    class="relative overflow-hidden bg-white text-black min-h-screen space-y-10"
  >
    <!-- Particles background -->
    <div class="particles-container">
      <div class="particle" v-for="n in 20" :key="n"></div>
    </div>

    <!-- Main container -->
    <div class="container mx-auto px-4 relative">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left column: Text content -->
        <div class="space-y-8 animate-fade-in">
          <div class="space-y-4">
            <span
              class="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-medium text-sm"
            >
              Plataforma de Denúncias e Reclamações
            </span>
            <h1
              class="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 leading-tight animate-bounce-subtle"
            >
              Dê voz às reclamações e melhore a reputação da sua empresa
            </h1>
            <p class="text-xl text-gray-600 mt-6 max-w-2xl animate-slide-up">
              Transforme feedback negativo em oportunidades de crescimento.
              Conecte-se com seus clientes, resolva problemas e melhore sua
              reputação no mercado.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 animate-fade-in-delay">
            <button
              class="group px-6 py-3 bg-[#3C50E0] text-white rounded-lg font-medium hover:bg-[#2C40D0] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-200 text-sm"
              @click="$router.push('/auth/register')"
              x
            >
              <span>Registrar empresa</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
            <button
              class="px-6 py-3 bg-white text-gray-800 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm text-sm"
              @click="$router.push('/occurrence/create')"
            >
              <ExclamationTriangleIcon class="w-4 h-4 text-[#3C50E0]" />
              <span>Reportar ocorrência</span>
            </button>
            <!-- Novo botão condicional baseado no estado de autenticação -->
            <button
              v-if="!user"
              @click="showSearchModal = true"
              class="px-6 py-3 bg-amber-50 text-amber-800 rounded-lg font-medium border border-amber-200 hover:bg-amber-100 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm text-sm"
            >
              <EyeIcon class="w-4 h-4 text-amber-600" />
              <span>Pesquisar ocorrência</span>
            </button>
            <button
              v-else
              @click="navigateToMyOccurrences"
              class="px-6 py-3 bg-green-50 text-green-800 rounded-lg font-medium border border-green-200 hover:bg-green-100 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span>Minhas ocorrências</span>
            </button>
          </div>

          <div class="pt-8 border-t border-gray-100 animate-fade-in-delay-2">
            <p class="text-sm text-gray-500 mb-4">
              Empresas confiam em nós para gerenciar suas reclamações:
            </p>
            <div class="flex flex-wrap gap-6 items-center">
              <!-- Logos de empresas (placeholders) -->
              <div
                class="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <div
                  class="h-8 w-24 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500"
                >
                  Logo 1
                </div>
              </div>
              <div
                class="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <div
                  class="h-8 w-24 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500"
                >
                  Logo 2
                </div>
              </div>
              <div
                class="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <div
                  class="h-8 w-24 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500"
                >
                  Logo 3
                </div>
              </div>
              <div
                class="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <div
                  class="h-8 w-24 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500"
                >
                  Logo 4
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right column: Dashboard preview image -->
        <div
          class="relative animate-fade-in-delay hover:scale-105 transition-transform duration-500"
        >
          <div
            class="relative bg-white rounded-xl shadow-2xl shadow-blue-100 overflow-hidden border border-gray-100"
          >
            <div class="bg-blue-600 h-14 flex items-center px-6">
              <div class="flex space-x-2">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div class="text-white text-sm ml-4">
                Dashboard Empresarial - Gestão de Reclamações
              </div>
            </div>
            <div class="p-6">
              <div class="mb-6">
                <div class="h-8 bg-gray-100 rounded-md w-1/3 mb-2"></div>
                <div class="grid grid-cols-3 gap-4">
                  <div
                    class="h-24 bg-blue-50 rounded-lg border border-blue-100 p-4"
                  >
                    <div class="h-3 bg-blue-200 rounded w-1/2 mb-2"></div>
                    <div class="h-6 bg-blue-300 rounded w-1/3"></div>
                    <div class="h-3 bg-blue-200 rounded w-2/3 mt-2"></div>
                  </div>
                  <div
                    class="h-24 bg-green-50 rounded-lg border border-green-100 p-4"
                  >
                    <div class="h-3 bg-green-200 rounded w-1/2 mb-2"></div>
                    <div class="h-6 bg-green-300 rounded w-1/3"></div>
                    <div class="h-3 bg-green-200 rounded w-2/3 mt-2"></div>
                  </div>
                  <div
                    class="h-24 bg-amber-50 rounded-lg border border-amber-100 p-4"
                  >
                    <div class="h-3 bg-amber-200 rounded w-1/2 mb-2"></div>
                    <div class="h-6 bg-amber-300 rounded w-1/3"></div>
                    <div class="h-3 bg-amber-200 rounded w-2/3 mt-2"></div>
                  </div>
                </div>
              </div>
              <div>
                <div class="h-8 bg-gray-100 rounded-md w-1/4 mb-2"></div>
                <div class="space-y-3">
                  <div
                    class="h-12 bg-gray-50 rounded-md border border-gray-100 flex items-center px-4"
                  >
                    <div class="w-8 h-8 rounded-full bg-blue-100 mr-3"></div>
                    <div class="flex-1">
                      <div class="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                    <div class="h-6 w-16 bg-green-100 rounded-md"></div>
                  </div>
                  <div
                    class="h-12 bg-gray-50 rounded-md border border-gray-100 flex items-center px-4"
                  >
                    <div class="w-8 h-8 rounded-full bg-amber-100 mr-3"></div>
                    <div class="flex-1">
                      <div class="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div class="h-6 w-16 bg-amber-100 rounded-md"></div>
                  </div>
                  <div
                    class="h-12 bg-gray-50 rounded-md border border-gray-100 flex items-center px-4"
                  >
                    <div class="w-8 h-8 rounded-full bg-red-100 mr-3"></div>
                    <div class="flex-1">
                      <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div class="h-6 w-16 bg-red-100 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Decorative elements -->
          <div
            class="absolute -z-10 -top-6 -right-6 w-40 h-40 bg-yellow-200 rounded-full opacity-50 blur-2xl"
          ></div>
          <div
            class="absolute -z-10 -bottom-8 -left-8 w-60 h-60 bg-blue-200 rounded-full opacity-50 blur-3xl"
          ></div>
        </div>
      </div>
    </div>

    <!-- Features section -->
    <div class="pb-16">
      <div class="container mx-auto px-4">
        <div
          class="text-center max-w-3xl mx-auto mb-16 animate-fade-in-delay-2"
        >
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Por Que Escolher Nossa Plataforma?
          </h2>
          <p class="text-lg text-gray-600">
            Transforme as reclamações dos seus clientes em oportunidades de
            melhoria e fidelização.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <!-- Feature 1 -->
          <div
            class="text-center hover:-translate-y-2 transition-transform duration-300"
          >
            <div
              class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 hover:rotate-12 transition-transform duration-300"
            >
              <svg
                class="w-8 h-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">Proteja Sua Reputação</h3>
            <p class="text-gray-600">
              Responda rapidamente às reclamações antes que afetem negativamente
              sua marca no mercado.
            </p>
          </div>

          <!-- Feature 2 -->
          <div
            class="text-center hover:-translate-y-2 transition-transform duration-300 animate-delay-100"
          >
            <div
              class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 hover:rotate-12 transition-transform duration-300"
            >
              <svg
                class="w-8 h-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">Melhore a Satisfação</h3>
            <p class="text-gray-600">
              Resolva problemas eficientemente e transforme clientes
              insatisfeitos em defensores da sua marca.
            </p>
          </div>

          <!-- Feature 3 -->
          <div
            class="text-center hover:-translate-y-2 transition-transform duration-300 animate-delay-200"
          >
            <div
              class="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6 hover:rotate-12 transition-transform duration-300"
            >
              <svg
                class="w-8 h-8 text-amber-600"
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
            <h3 class="text-xl font-bold mb-3">Insights Valiosos</h3>
            <p class="text-gray-600">
              Obtenha análises detalhadas sobre as reclamações para identificar
              padrões e melhorar seus produtos e serviços.
            </p>
          </div>
        </div>
      </div>
    </div>

    <a-modal
      v-model:visible="showSearchModal"
      title="Consultar Ocorrência"
      @cancel="handleCancel"
      :footer="null"
    >
      <a-form :model="searchForm" @finish="handleSearch" layout="vertical">
        <a-form-item
          label="Referência da Ocorrência"
          name="reference"
          :rules="[
            { required: true, message: 'Por favor, insira a referência' },
          ]"
        >
          <a-input
            v-model:value="searchForm.reference"
            placeholder="Digite a referência"
          />
        </a-form-item>

        <a-form-item
          label="Senha"
          name="password"
          :rules="[{ required: true, message: 'Por favor, insira a senha' }]"
        >
          <a-input-password
            v-model:value="searchForm.password"
            placeholder="Digite a senha"
          />
        </a-form-item>

        <div class="flex justify-end gap-4">
          <a-button @click="handleCancel">Cancelar</a-button>
          <a-button type="primary" html-type="submit" :loading="loading">
            Consultar
          </a-button>
        </div>
      </a-form>
    </a-modal>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ExclamationTriangleIcon, EyeIcon } from "@heroicons/vue/24/outline";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import { useApiRequests } from "@/composables/useAxios";
const user = useUserStore().user;
const router = useRouter();
const { api } = useApiRequests();

const showSearchModal = ref(false);
const loading = ref(false);
const searchForm = ref({
  reference: "",
  password: "",
});

const handleCancel = () => {
  showSearchModal.value = false;
  searchForm.value = {
    reference: "",
    password: "",
  };
};

const navigateToMyOccurrences = () => {
  router.push("/profile");
};

const handleSearch = async (values: any) => {
  try {
    const { data } = await api.post("/occurrences/anonymous", values);
    router.push(`/occurrence/${data.id}`);
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 1s ease-out 0.3s backwards;
}

.animate-fade-in-delay-2 {
  animation: fadeIn 1s ease-out 0.6s backwards;
}

.animate-bounce-subtle {
  animation: bounceSlight 5s ease-in-out infinite;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out 0.2s backwards;
}

.animate-delay-100 {
  animation-delay: 0.1s;
}

.animate-delay-200 {
  animation-delay: 0.2s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceSlight {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.particles-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(60, 80, 224, 0.15);
  border-radius: 50%;
  animation: float 15s infinite linear;
}

.particle:nth-child(even) {
  width: 8px;
  height: 8px;
}

@keyframes float {
  0% {
    transform: translateY(100vh) translateX(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) translateX(100px);
    opacity: 0;
  }
}

/* Posições aleatórias predefinidas para as partículas */
.particle:nth-child(1) {
  left: 5%;
  animation-delay: -2s;
  animation-duration: 13s;
}
.particle:nth-child(2) {
  left: 15%;
  animation-delay: -5s;
  animation-duration: 18s;
}
.particle:nth-child(3) {
  left: 25%;
  animation-delay: -7s;
  animation-duration: 14s;
}
.particle:nth-child(4) {
  left: 35%;
  animation-delay: -1s;
  animation-duration: 16s;
}
.particle:nth-child(5) {
  left: 45%;
  animation-delay: -4s;
  animation-duration: 15s;
}
.particle:nth-child(6) {
  left: 55%;
  animation-delay: -8s;
  animation-duration: 17s;
}
.particle:nth-child(7) {
  left: 65%;
  animation-delay: -3s;
  animation-duration: 19s;
}
.particle:nth-child(8) {
  left: 75%;
  animation-delay: -6s;
  animation-duration: 12s;
}
.particle:nth-child(9) {
  left: 85%;
  animation-delay: -9s;
  animation-duration: 15s;
}
.particle:nth-child(10) {
  left: 95%;
  animation-delay: -2s;
  animation-duration: 14s;
}
.particle:nth-child(11) {
  left: 10%;
  animation-delay: -5s;
  animation-duration: 16s;
}
.particle:nth-child(12) {
  left: 20%;
  animation-delay: -7s;
  animation-duration: 18s;
}
.particle:nth-child(13) {
  left: 30%;
  animation-delay: -1s;
  animation-duration: 15s;
}
.particle:nth-child(14) {
  left: 40%;
  animation-delay: -4s;
  animation-duration: 17s;
}
.particle:nth-child(15) {
  left: 50%;
  animation-delay: -6s;
  animation-duration: 13s;
}
.particle:nth-child(16) {
  left: 60%;
  animation-delay: -8s;
  animation-duration: 16s;
}
.particle:nth-child(17) {
  left: 70%;
  animation-delay: -3s;
  animation-duration: 14s;
}
.particle:nth-child(18) {
  left: 80%;
  animation-delay: -5s;
  animation-duration: 18s;
}
.particle:nth-child(19) {
  left: 90%;
  animation-delay: -7s;
  animation-duration: 15s;
}
.particle:nth-child(20) {
  left: 100%;
  animation-delay: -2s;
  animation-duration: 17s;
}
</style>
