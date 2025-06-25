<template>
  <div class="w-full">
    <div
      class="relative bg-gradient-to-tr from-blue-600 via-blue-700 to-indigo-800 py-16 sm:py-20 px-4 sm:px-8 text-center text-white rounded-b-lg overflow-hidden"
    >
      <div class="absolute inset-0 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
          <defs>
            <pattern
              id="pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 20 L40 20 M20 0 L20 40"
                stroke="currentColor"
                stroke-width="1"
                fill="none"
              />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <div class="relative z-10">
        <span
          class="text-blue-200 uppercase tracking-wider text-sm font-medium mb-1 inline-block"
        >
          {{ sector?.name || "Empresa" }}
        </span>
        <h1
          class="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3"
        >
          {{ companyName }}
        </h1>

        <div class="flex flex-wrap justify-center gap-3 mt-6 max-w-xl mx-auto">
          <div
            class="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-full px-4 py-2 text-sm flex items-center"
          >
            <Icon name="material-symbols:location-on" class="mr-2" />
            <span>{{
              address?.district?.province?.name || "Localização não disponível"
            }}</span>
          </div>

          <div
            class="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-full px-4 py-2 text-sm flex items-center"
          >
            <Icon name="material-symbols:work-outline" class="mr-2" />
            <span>{{
              activityType?.description || "Atividade não disponível"
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col md:flex-row gap-4 sm:gap-6 p-4 sm:p-6 bg-white -mt-8 rounded-lg border shadow-md mx-2 sm:mx-4"
    >
      <div
        class="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg transform -translate-y-6 border-4 border-white"
      >
        <div v-if="!photo">
          <h2 class="text-2xl sm:text-3xl font-bold">
            {{ companyName?.substring(0, 2).toUpperCase() }}
          </h2>
        </div>
        <img
          v-else
          :src="photo"
          :alt="companyName"
          class="w-full h-full object-cover rounded-xl"
        />
      </div>

      <div class="flex-grow py-10">
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div class="flex items-center gap-2">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800">
              Sobre a empresa
            </h2>
            <a-badge color="blue" v-if="isVerified" text="Verificada" />
          </div>
          <div class="flex flex-wrap gap-2">
            <a-button class="flex items-center" type="default">
              <template #icon
                ><Icon name="material-symbols:share-outline"
              /></template>
              <span>Compartilhar</span>
            </a-button>
            <NuxtLink
              to="/occurrence/create"
              class="flex items-center justify-center bg-blue-700 text-white rounded-md px-4 text-sm hover:bg-blue-800 transition-colors"
            >
              <Icon name="material-symbols:add-circle-outline" class="mr-2" />
              Registrar Ocorrência
            </NuxtLink>
          </div>
        </div>

        <p class="text-gray-600 my-3 max-w-[46rem] text-sm sm:text-base">
          {{ description || "Nenhuma descrição disponível" }}
        </p>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4"
        >
          <div
            class="flex items-center text-sm bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Icon
              name="material-symbols:location-on"
              class="text-blue-600 mr-2 shrink-0"
            />
            <div>
              <span class="font-medium text-gray-700 mr-1 block text-xs"
                >Endereço:</span
              >
              <span class="text-gray-800 text-xs">
                {{ address?.street || "N/A" }},
                {{ address?.district?.name || "N/A" }},
                {{ address?.district?.province?.name || "N/A" }}
              </span>
            </div>
          </div>
          <div
            class="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Icon
              name="material-symbols:business-center"
              class="text-blue-600 mr-2 shrink-0"
            />
            <div>
              <span class="font-medium text-gray-700 mr-1 block text-xs"
                >Sector:</span
              >
              <span class="text-gray-800 text-xs">{{
                sector?.name || "N/A"
              }}</span>
            </div>
          </div>
          <div
            class="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Icon
              name="material-symbols:category"
              class="text-blue-600 mr-2 shrink-0"
            />
            <div>
              <span class="font-medium text-gray-700 mr-1 block text-xs"
                >Atividade:</span
              >
              <span class="text-gray-800 text-xs">{{
                activityType?.description || "N/A"
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Address {
  street: string;
  district: {
    name: string;
    province: {
      name: string;
    };
  };
}

const props = defineProps({
  description: String,
  address: Object as PropType<Address>,
  sector: Object as PropType<any>,
  activityType: Object as PropType<any>,
  employees: String,
  photo: String,
  companyName: String,
  startWorkTime: String,
  endWorkTime: String,
});

// Propriedade para simular verificação (posteriormente pode ser um prop real)
const isVerified = computed(() => true);
</script>

<style scoped>
.backdrop-filter {
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}
</style>
