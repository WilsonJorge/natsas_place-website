<template>
  <div class="min-h-screen bg-gradient-to-br bg-white">
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Search and Filters Section -->
      <div class="bg-white/60 backdrop-blur-sm rounded-3xl 0 py-8 mb-12">
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-gray-800 mb-2">
            Encontre sua empresa ideal
          </h2>
          <p class="text-gray-600">Use os filtros para refinar sua busca</p>
        </div>

        <div class="flex flex-col lg:flex-row gap-6 max-w-4xl">
          <!-- Search Input -->

          <a-input
            v-model:value="searchTerm"
            placeholder="Digite o nome da empresa..."
            size="large"
            :loading="loadingCompanies"
            allow-clear
            @input="debouncedSearch"
          />

          <!-- Filters Row -->
          <div class="flex flex-col sm:flex-row gap-4 lg:w-auto">
            <!-- Sector Filter -->
            <div class="sm:w-64">
              <a-select
                v-model:value="selectedSector"
                placeholder="Selecionar setor"
                size="large"
                class="w-full"
                allow-clear
              >
                <template #suffixIcon>
                  <svg
                    class="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </template>
                <a-select-option value="">Todos os setores</a-select-option>
                <a-select-option
                  v-for="sector in sectors"
                  :key="sector"
                  :value="sector"
                >
                  {{ sector }}
                </a-select-option>
              </a-select>
            </div>

            <!-- Sort Options -->
            <div class="sm:w-56">
              <a-select v-model:value="sortBy" size="large" class="w-full">
                <template #suffixIcon>
                  <svg
                    class="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                    />
                  </svg>
                </template>
                <a-select-option value="rating"
                  >Melhor avaliação</a-select-option
                >
                <a-select-option value="name">Nome A-Z</a-select-option>
                <a-select-option value="recent">Mais recentes</a-select-option>
              </a-select>
            </div>

            <!-- Refresh Button -->
            <a-button
              type="primary"
              size="large"
              @click="fetchCompanies"
              :loading="loadingCompanies"
              class="flex items-center bg-gradient-to-r from-blue-600 to-blue-700 border-0 hover:from-blue-700 hover:to-blue-800 rounded-2xl px-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Atualizar
            </a-button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="loadingCompanies"
        class="flex flex-col items-center justify-center py-20"
      >
        <a-spin size="large" />
        <p class="mt-4 text-gray-500">Carregando empresas...</p>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="Object.keys(filteredCompanies).length === 0"
        class="text-center py-24"
      >
        <div
          class="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center"
        >
          <svg
            class="w-16 h-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 class="text-2xl font-semibold text-gray-900 mb-4">
          Nenhuma empresa encontrada
        </h3>
        <p class="text-gray-500 mb-8 max-w-md mx-auto">
          Não encontramos empresas que correspondam aos seus critérios de busca.
          Tente ajustar os filtros ou termo de busca.
        </p>
      </div>

      <!-- Companies Grid -->
      <div v-else class="space-y-12">
        <div
          v-for="(companies, sector) in sortedCompanies"
          :key="sector"
          class="group"
        >
          <!-- Sector Header -->
          <div class="flex items-center justify-between mb-8">
            <div class="flex items-center space-x-4">
              <div
                class="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"
              ></div>
              <h2 class="text-2xl font-bold text-gray-900">{{ sector }}</h2>
              <span
                class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-100"
              >
                {{ companies.length }}
                {{ companies.length === 1 ? "empresa" : "empresas" }}
              </span>
            </div>

            <a-button
              type="text"
              @click="expandSector(sector)"
              class="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl px-4 py-2 transition-all duration-200"
            >
              <span class="mr-2 font-medium">
                {{
                  expandedSectors.includes(sector)
                    ? "Mostrar menos"
                    : "Ver todas"
                }}
              </span>
              <svg
                class="w-5 h-5 transition-transform duration-300"
                :class="{ 'rotate-180': expandedSectors.includes(sector) }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a-button>
          </div>

          <!-- Companies Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(company, index) in expandedSectors.includes(sector)
                ? companies
                : companies.slice(0, visibleCount)"
              :key="company.id"
              class="opacity-0 animate-fade-in-up"
              :style="{
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'forwards',
              }"
            >
              <CompanyCard
                :company="company"
                @click="() => router.push(`/companies/${company.id}`)"
                class="h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group-hover:shadow-sm"
              />
            </div>
          </div>

          <!-- Show More Button -->
          <!-- <div
            v-if="
              !expandedSectors.includes(sector) &&
              companies.length > visibleCount
            "
            class="mt-8 text-center"
          >
            <a-button
              type="default"
              size="large"
              @click="expandSector(sector)"
              class="rounded-xl border-gray-200 hover:border-blue-300 hover:text-blue-600"
            >
              Ver mais {{ companies.length - visibleCount }} empresas
              <svg
                class="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a-button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import CompanyCard from "@/components/CompanyCard.vue";
//@ts-ignore
import { useCompanySearch } from "@/composables/useCompanySearch";

const router = useRouter();
const {
  companies,
  searchTerm,
  loadingCompanies,
  debouncedSearch,
  fetchCompanies,
} = useCompanySearch();

// State
const selectedSector = ref("");
const sortBy = ref("rating");
const visibleCount = ref(8);
const expandedSectors = ref<string[]>([]);

const sectors = computed(() => Object.keys(companies.value || {}));

const sortedCompanies = computed(() => {
  if (!companies.value) return {};

  const result = { ...filteredCompanies.value };

  // Apply sorting based on selected sort option
  Object.keys(result).forEach((sector) => {
    if (sortBy.value === "name") {
      result[sector] = [...result[sector]].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (sortBy.value === "rating") {
      result[sector] = [...result[sector]].sort((a, b) => b.rating - a.rating);
    } else if (sortBy.value === "recent") {
      result[sector] = [...result[sector]].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    }
  });

  return result;
});

const filteredCompanies = computed(() => {
  if (!companies.value) {
    return {};
  }

  const allCompanies = companies.value;
  if (!selectedSector.value) return allCompanies;

  return {
    [selectedSector.value]: allCompanies[selectedSector.value],
  };
});

const getTotalCompanies = computed(() => {
  if (!companies.value) return 0;
  return Object.values(companies.value).reduce(
    (acc: number, sectorCompanies: any) =>
      acc + (Array.isArray(sectorCompanies) ? sectorCompanies.length : 0),
    0
  );
});

const getBestRatedCompany = computed(() => {
  if (!companies.value) return "N/A";
  let bestRating = 0;
  let bestCompany = "N/A";

  Object.values(companies.value).forEach((sectorCompanies: unknown) => {
    if (Array.isArray(sectorCompanies)) {
      sectorCompanies.forEach((company: any) => {
        if (company.rating > bestRating) {
          bestRating = company.rating;
          bestCompany = company.name;
        }
      });
    }
  });

  return bestCompany;
});

function expandSector(sector: string): void {
  if (expandedSectors.value.includes(sector)) {
    expandedSectors.value = expandedSectors.value.filter((s) => s !== sector);
  } else {
    expandedSectors.value.push(sector);
  }
}

function clearFilters(): void {
  searchTerm.value = "";
  selectedSector.value = "";
  fetchCompanies();
}

watch(
  () => searchTerm.value,
  () => {
    debouncedSearch({
      search: searchTerm.value,
    });
  }
);

watch(
  () => sortBy.value,
  () => {
    // Force a re-render when sorting changes
  }
);

onMounted(() => {
  fetchCompanies();
});
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
