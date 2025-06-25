<template>
  <div class="p-6 bg-gray-50">
    <div
      class="bg-white rounded-xl shadow-sm p-8 mb-8 transition-all hover:shadow-md"
    >
      <h2 class="text-xl font-medium text-gray-700 mb-6">
        Resumo de Pedidos de Informação
      </h2>
      <a-row :gutter="24">
        <a-col :span="8">
          <div class="stat-card">
            <div class="stat-icon bg-blue-50">
              <svg
                class="w-6 h-6 text-blue-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stastic.total }}</div>
              <div class="stat-label">Pedidos de Informação</div>
            </div>
          </div>
        </a-col>

        <a-col :span="8">
          <div class="stat-card">
            <div class="stat-icon bg-green-50">
              <svg
                class="w-6 h-6 text-green-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stastic.answered }}</div>
              <div class="stat-label">Respondidos</div>
            </div>
          </div>
        </a-col>

        <a-col :span="8">
          <div class="stat-card">
            <div class="stat-icon bg-amber-50">
              <svg
                class="w-6 h-6 text-amber-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
            <div class="stat-info">
              <div class="stat-value">
                {{ stastic.open }}
              </div>
              <div class="stat-label">Pendentes</div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>

    <!-- Filtros com design moderno -->
    <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div class="flex items-center">
        <h3 class="text-gray-700 font-medium mr-6">Filtrar por:</h3>
        <a-select
          @change="
            ($event) => {
              filter.status = String($event || '');
            }
          "
          class="w-64"
          placeholder="Status"
          bordered
          :options="[
            { value: '', label: 'Todos os status' },
            { value: 'OPEN', label: 'Aberto' },
            { value: 'IN_PROGRESS', label: 'Em Andamento' },
            { value: 'ANSWERED', label: 'Respondido' },
            { value: 'NOT_SOLVED', label: 'Não Resolvido' },
          ]"
        />
      </div>
    </div>

    <!-- Loading state com design elegante -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <a-spin :indicator="spinnerIndicator" />
    </div>

    <!-- Lista de Pedidos de Informação com design moderno -->
    <div v-else>
      <transition-group
        name="fade-list"
        tag="div"
        v-if="occurrences.length > 0"
        class="space-y-4"
      >
        <div v-for="(occurrence, index) in occurrences" :key="index">
          <occurrence-card
            :occurrence="occurrence"
            class="transform transition-all duration-300 hover:shadow-md hover:-translate-y-1"
          />
        </div>
      </transition-group>

      <!-- Paginação com design moderno -->
      <div v-if="occurrences.length > 0" class="flex justify-center mt-8">
        <a-pagination
          v-model:current="pagination.current"
          :total="pagination.total"
          :pageSize="pagination.pageSize"
          @change="handlePageChange"
          show-less-items
        />
      </div>

      <!-- Estado vazio com design elegante -->
      <div
        v-else
        class="bg-white rounded-xl shadow-sm p-12 flex flex-col items-center justify-center gap-4"
      >
        <nuxt-img
          src="/empty.svg"
          alt="Não há pedidos de informação registrados no momento"
          width="180"
          height="180"
          class="opacity-80"
        />
        <p class="text-gray-500 text-lg font-light">
          Não há pedidos de informação registrados no momento
        </p>
        <a-button type="primary" class="mt-2" @click="fetchOccurrences"
          >Atualizar</a-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, h } from "vue";
import OccurrenceCard from "@/components/OccurrenceCard.vue";
import { useApiRequests } from "@/composables/useAxios";
import { message, Spin } from "ant-design-vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
import type { SelectValue } from "ant-design-vue/es/select";
const { api } = useApiRequests();

const props = defineProps({
  companyId: {
    type: String,
    required: true,
  },
});

const spinnerIndicator = h(LoadingOutlined, {
  style: {
    fontSize: "24px",
  },
  spin: true,
});

interface Occurrence {
  status: string;
  [key: string]: any;
}

const occurrences = ref<Occurrence[]>([]);
const stastic = ref({
  total: 0,
  answered: 0,
  open: 0,
});
const pagination = ref({
  total: 0,
  current: 1,
  pageSize: 3,
});
const filter = ref({
  status: "" as string,
  page: 1,
  limit: 10,
});
const loading = ref(false);

async function fetchOccurrences() {
  loading.value = true;
  try {
    const { data } = await api.get("/occurrences", {
      params: {
        type: "REQUEST",
        status: filter.value.status,
        page: filter.value.page,
        limit: filter.value.limit,
        companyId: props.companyId,
      },
    });

    const { data: stasticData } = await api.get("/occurrences", {
      params: {
        type: "REQUEST",
        page: 1,
        limit: 1000000000000,
        companyId: props.companyId,
      },
    });

    occurrences.value = data.data;
    stastic.value = {
      total: stasticData.meta.totalItems,
      answered: stasticData.data.filter(
        (occurrence: Occurrence) => occurrence.status === "ANSWERED"
      ).length,
      open: stasticData.data.filter(
        (occurrence: Occurrence) => occurrence.status === "OPEN"
      ).length,
    };
    pagination.value = {
      total: data.meta.totalItems,
      current: data.meta.page,
      pageSize: data.meta.limit,
    };
  } catch (error: any) {
    message.error(
      "Erro ao carregar pedidos de informação: " +
        error.response?.data?.message || "Erro desconhecido"
    );
  } finally {
    loading.value = false;
  }
}

function handlePageChange(page: any) {
  filter.value.page = page;
  fetchOccurrences();
}

watch([() => filter.value.status], () => {
  filter.value.page = 1;
  fetchOccurrences();
});

onMounted(() => {
  fetchOccurrences();
});
</script>

<style scoped>
.stat-card {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  background-color: #f9fafb;
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  margin-right: 1rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Animações para a lista */
.fade-list-enter-active,
.fade-list-leave-active {
  transition: all 0.3s ease;
}

.fade-list-enter-from,
.fade-list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
