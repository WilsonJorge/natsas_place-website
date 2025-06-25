<template>
  <div class="px-5 max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-10 pt-4">
      <h2 class="text-2xl font-medium text-gray-800">Avaliações de Clientes</h2>
      <a-button
        type="primary"
        @click="showRatingModal = true"
        class="bg-primary hover:bg-primary-dark border-0"
      >
        <template #icon><Icon name="material-symbols:star" /></template>
        Avaliar
      </a-button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="mb-12 md:pl-10 md:hidden">
        <div class="grid grid-cols-1 gap-8">
          <!-- Avaliação Média - Simplificada -->
          <div class="flex items-center">
            <div class="text-6xl font-light text-primary mr-6">
              {{ averageRating.toFixed(1) }}
            </div>
            <div>
              <div class="flex mb-1">
                <a-rate
                  :value="averageRating"
                  disabled
                  allow-half
                  character="★"
                  class="custom-rate-component"
                />
              </div>
              <div class="text-gray-500">{{ pagination.total }} avaliações</div>
            </div>
          </div>

          <!-- Distribuição de Avaliações - Simplificada -->
          <div>
            <div v-for="i in 5" :key="i" class="flex items-center mb-3">
              <div class="w-6 text-right mr-3 text-gray-600">{{ 6 - i }}</div>
              <div class="flex-grow">
                <div class="w-full bg-gray-100 rounded-full h-2">
                  <div
                    class="bg-primary h-2 rounded-full transition-all duration-500"
                    :style="{ width: `${calculatePercentage(6 - i)}%` }"
                  ></div>
                </div>
              </div>
              <div class="w-10 text-gray-500 ml-3 text-sm">
                {{ calculatePercentage(6 - i) }}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div v-if="loading" class="text-center py-8">
          <div class="grid grid-cols-1 gap-4">
            <a-card v-for="i in 3" :key="i" :bordered="true" class="mb-2">
              <div class="flex items-start">
                <a-skeleton-avatar :size="40" class="mr-3" active />
                <div class="flex-1">
                  <div
                    class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div class="w-1/3">
                      <a-skeleton
                        :paragraph="false"
                        :title="{ width: '100%' }"
                        active
                      />
                    </div>
                    <div class="flex items-center mt-1 sm:mt-0 w-1/3">
                      <a-skeleton
                        :paragraph="false"
                        :title="{ width: '100%' }"
                        active
                      />
                    </div>
                  </div>
                  <div class="mt-2">
                    <a-skeleton
                      :paragraph="{ rows: 1, width: '100%' }"
                      :title="false"
                      active
                    />
                  </div>
                </div>
              </div>
            </a-card>
          </div>
        </div>
        <div v-else-if="ratings.length === 0" class="text-center py-12">
          <NuxtImg
            src="/empty.svg"
            alt="Sem avaliações"
            class="w-40 mx-auto mb-6 opacity-70"
          />
          <p class="text-gray-500 mb-6">
            Ainda não há avaliações para esta empresa
          </p>
          <a-button
            type="primary"
            @click="showRatingModal = true"
            class="bg-primary border-0"
          >
            Seja o primeiro a avaliar
          </a-button>
        </div>
        <div v-else>
          <div
            v-for="(rating, index) in ratings"
            :key="rating.id"
            class="py-4 transition-all duration-300 rounded-lg hover:bg-gray-50 px-3 max-w-2xl mb-2 bg-gray-50"
            :class="{
              'border-b border-gray-100': index !== ratings.length - 1,
            }"
          >
            <div class="flex justify-between items-start mb-2">
              <div class="flex items-center">
                <div
                  class="w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center text-primary font-medium shadow-sm text-sm"
                >
                  {{
                    rating?.userName?.substring(0, 1).toUpperCase() ||
                    "Anonimo".substring(0, 2).toUpperCase()
                  }}
                </div>
                <div class="ml-2">
                  <h3 class="font-medium text-gray-800 text-base">
                    {{ rating?.userName || "Anonimo" }}
                  </h3>
                  <p class="text-gray-400 text-sm">
                    {{ formatDate(rating.createdAt) }}
                  </p>
                </div>
              </div>
              <a-rate
                :value="rating.rating"
                disabled
                character="★"
                class="custom-rate-component text-base"
                :style="{ fontSize: '18px' }"
              />
            </div>
            <p class="text-gray-600 pl-10 bg-blue-50/40 rounded-md p-1.5">
              {{ rating.comment }}
            </p>
          </div>
        </div>

        <div class="flex justify-center mt-8 pb-8" v-if="pagination.total > 1">
          <a-pagination
            v-model:current="currentPage"
            :total="pagination.total"
            :pageSize="pagination.pageSize"
            @change="changePage"
          />
        </div>
      </div>

      <div class="mb-12 md:pl-10 hidden md:block">
        <div class="grid grid-cols-1 gap-8">
          <!-- Avaliação Média - Simplificada -->
          <div class="flex items-center">
            <div class="text-6xl font-light text-primary mr-6">
              {{ averageRating.toFixed(1) }}
            </div>
            <div>
              <div class="flex mb-1">
                <a-rate
                  :value="averageRating"
                  disabled
                  allow-half
                  character="★"
                  class="custom-rate-component"
                />
              </div>
              <div class="text-gray-500">{{ pagination.total }} avaliações</div>
            </div>
          </div>

          <!-- Distribuição de Avaliações - Simplificada -->
          <div>
            <div v-for="i in 5" :key="i" class="flex items-center mb-3">
              <div class="w-6 text-right mr-3 text-gray-600">{{ 6 - i }}</div>
              <div class="flex-grow">
                <div class="w-full bg-gray-100 rounded-full h-2">
                  <div
                    class="bg-primary h-2 rounded-full transition-all duration-500"
                    :style="{ width: `${calculatePercentage(6 - i)}%` }"
                  ></div>
                </div>
              </div>
              <div class="w-10 text-gray-500 ml-3 text-sm">
                {{ calculatePercentage(6 - i) }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <a-modal
      v-model:visible="showRatingModal"
      title="Avaliar esta empresa"
      @ok="submitRating"
      :confirmLoading="submitLoading"
      class="rating-modal"
    >
      <div class="mb-6">
        <p class="mb-3 text-gray-700">Sua classificação</p>
        <!-- Opção 1: Use a-rate normalmente -->
        <a-rate
          v-model:value="newRating.rating"
          :tooltips="desc"
          character="★"
          class="custom-rate-component"
        />

        <span class="rate-text" v-if="newRating.rating">
          {{ desc[newRating.rating - 1] }}
        </span>
      </div>
      <div class="mb-6">
        <p class="mb-2 text-gray-700">Seu nome</p>
        <a-input
          v-model:value="newRating.userName"
          placeholder="Digite seu nome"
          class="py-1"
        />
      </div>
      <div>
        <p class="mb-2 text-gray-700">Seu comentário</p>
        <a-textarea
          v-model:value="newRating.comment"
          placeholder="Compartilhe sua experiência com esta empresa"
          :rows="4"
        />
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { message } from "ant-design-vue";

const props = defineProps({
  companyId: {
    type: String,
    required: true,
  },
});

const { api } = useApiRequests();
const { user } = useUserStore();

const ratings = ref<any[]>([]);
const loading = ref(true);
const currentPage = ref(1);
const showRatingModal = ref(false);
const submitLoading = ref(false);
const newRating = ref({
  rating: 0,
  userName: user?.username || user?.profile?.name || "",
  comment: "",
});
const allRatings = ref<any[]>([]);
const desc = ref<string[]>(["Péssimo", "Ruim", "Normal", "Bom", "Excelente"]);
const pagination = ref({
  current: 1,
  pageSize: 5,
  total: 0,
});

const averageRating = computed(() => {
  if (allRatings.value.length === 0) return 0;
  const sum = allRatings.value.reduce((acc, curr) => acc + curr.score, 0);
  return sum / allRatings.value.length;
});

const loadRatings = async () => {
  loading.value = true;
  try {
    const { data } = await api.get(`/ratings/company/${props.companyId}`, {
      params: {
        page: pagination.value.current || 1,
        limit: pagination.value.pageSize || 5,
      },
    });

    ratings.value = data.data.map((item: any) => {
      return {
        id: item.id,
        userName: item.username,
        rating: item.score,
        comment: item.comment,
        createdAt: item.createdAt,
      };
    });

    allRatings.value = data.allRatings;

    pagination.value = {
      total: data.meta.totalItems,
      pageSize: data.meta.limit,
      current: data.meta.page,
    };
  } catch (error) {
    console.log(error);
    message.error("Não foi possível carregar as avaliações");
  } finally {
    loading.value = false;
  }
};

const submitRating = async () => {
  if (newRating.value.rating === 0) {
    message.warning("Por favor, forneça uma classificação");
    return;
  }
  if (!newRating.value.userName) {
    message.warning("Por favor, digite seu nome");
    return;
  }

  submitLoading.value = true;
  try {
    await api.post(`/ratings`, {
      companyId: props.companyId,
      score: newRating.value.rating,
      comment: newRating.value.comment,
      username: newRating.value.userName,
      userId: user?.id,
    });

    message.success("Sua avaliação foi enviada com sucesso!");
    showRatingModal.value = false;

    // Adicionar a nova avaliação localmente e atualizar contadores
    const newRatingWithId = {
      id: Date.now(),
      ...newRating.value,
      createdAt: new Date(),
    };
    ratings.value.unshift(newRatingWithId);
    loadRatings();

    newRating.value = {
      rating: 0,
      userName: "",
      comment: "",
    };
  } catch (error) {
    message.error("Não foi possível enviar sua avaliação");
  } finally {
    submitLoading.value = false;
  }
};

const changePage = (page: number) => {
  pagination.value.current = page;
  loadRatings();
};

const calculatePercentage = (stars: number) => {
  if (pagination.value.total === 0) return 0;

  const starsCount = allRatings.value.filter(
    (rating) => rating.score === stars
  ).length;
  return Math.round((starsCount / allRatings.value.length) * 100);
};

const formatDate = (date: Date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

onMounted(() => {
  loadRatings();
});
</script>

<style scoped>
.rating-modal :deep(.ant-rate-star) {
  margin-right: 8px;
}

/* Ensure proper display of all Rate components */
:deep(.ant-rate) {
  display: flex;
  align-items: center;
  font-size: 20px;
}

.custom-rate-component {
  display: inline-flex !important;
  visibility: visible !important;
  color: #fadb14 !important;
}

.custom-rate-component :deep(.ant-rate-star) {
  visibility: visible !important;
  margin-right: 8px !important;
}

.rate-text {
  margin-left: 10px;
  font-size: 14px;
  color: #555;
}
</style>
