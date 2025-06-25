<template>
  <div class="py-5 bg-white rounded-lg border">
    <a-page-header title="Minhas Ocorrências" class="mb-6" />

    <!-- Filtros -->
    <a-row :gutter="16" class="mb-4 px-6">
      <a-col :span="8">
        <a-select
          @change="
            ($event) => {
              filter.type = $event;
            }
          "
          style="width: 100%"
          placeholder="Todos os tipos"
        >
          <a-select-option value="">Todos os tipos</a-select-option>
          <a-select-option value="COMPLAINT">Reclamações</a-select-option>
          <a-select-option value="REQUEST">Solicitações</a-select-option>
          <a-select-option value="DENUNCIATION">Denúncias</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="8">
        <a-select
          @change="
            ($event) => {
              filter.status = $event;
            }
          "
          style="width: 100%"
          placeholder="Todos os status"
        >
          <a-select-option value="">Todos os status</a-select-option>
          <a-select-option value="OPEN">Aberto</a-select-option>
          <a-select-option value="IN_PROGRESS">Em Andamento</a-select-option>
          <a-select-option value="ANSWERED">Respondido</a-select-option>
          <a-select-option value="NOT_SOLVED">Não Resolvido</a-select-option>
        </a-select>
      </a-col>
    </a-row>

    <!-- Lista de Ocorrências -->
    <a-list
      :data-source="occurrences"
      :loading="loading"
      :pagination="{
        ...pagination,
        onChange: handlePageChange,
      }"
    >
      <template #renderItem="{ item: occurrence }">
        <a-list-item>
          <occurrence-card
            :occurrence="occurrence"
            @view-details="handleViewDetails"
          />
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import OccurrenceCard from "@/components/OccurrenceCard.vue";
import { useApiRequests } from "@/composables/useAxios";
import { useUserStore } from "@/stores/userStore";
import { message } from "ant-design-vue";

const { api } = useApiRequests();
const { user } = useUserStore();

const occurrences = ref([]);
const pagination = ref({
  total: 0,
  current: 1,
  pageSize: 3,
});
const filter = ref({
  type: "",
  status: "",
  page: 1,
  limit: 3,
});
const loading = ref(false);

async function fetchOccurrences() {
  loading.value = true;
  try {
    const { data } = await api.get("/occurrences", {
      params: {
        type: filter.value.type,
        status: filter.value.status,
        page: filter.value.page,
        limit: filter.value.limit,
        userId: user.id,
      },
    });
    occurrences.value = data.data;
    pagination.value = {
      total: data.meta.totalItems,
      current: data.meta.page,
      pageSize: data.meta.limit,
    };
  } catch (error) {
    message.error(
      "Erro ao carregar ocorrências: " + error.response.data.message
    );
  } finally {
    loading.value = false;
  }
}

function handleViewDetails(occurrence) {
  // Implementar navegação para a página de detalhes
  console.log("Ver detalhes da ocorrência:", occurrence);
}

function handlePageChange(page) {
  filter.value.page = page;
  fetchOccurrences();
}

watch([() => filter.value.type, () => filter.value.status], () => {
  filter.value.page = 1;
  fetchOccurrences();
});

onMounted(() => {
  fetchOccurrences();
});
</script>
