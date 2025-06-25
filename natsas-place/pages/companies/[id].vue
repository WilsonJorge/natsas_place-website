<template>
  <div class="bg-white">
    <div v-if="loading" class="container mx-auto w-full py-12">
      <Skeleton />
    </div>
    <div v-else>
      <div v-if="companyData" class="container mx-auto w-full">
        <CompanyInfo v-bind="companyData" />
        <CompanyNavigation @onChange="onChange" />

        <div class="mt-4 pb-12">
          <CompanyAbout v-show="currentTabs === 0" v-bind="companyData" />
          <CompanyComplains
            v-show="currentTabs === 1"
            :companyId="id"
            @onChange="onChange"
          />
          <CompanyRatings v-show="currentTabs === 2" :companyId="id" />
          <CompanyRequests v-show="currentTabs === 3" :companyId="id" />
        </div>
      </div>
      <div v-else class="flex flex-col items-center justify-center h-[80vh]">
        <div
          class="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md max-w-md mx-auto"
        >
          <NuxtImg
            src="/empty.svg"
            alt="Ocorrência não encontrada"
            class="w-60 mb-4"
          />
          <h2 class="text-xl font-bold text-gray-800 mb-2">
            Empresa não encontrada
          </h2>
          <p class="text-gray-600 mb-6 text-center">
            Não foi possível carregar os dados da empresa. Verifique se o ID
            está correto ou tente novamente mais tarde.
          </p>
          <div class="flex gap-3">
            <a-button @click="$router.back()" class="flex items-center">
              <template #icon
                ><Icon name="material-symbols:arrow-back"
              /></template>
              Voltar
            </a-button>
            <a-button
              type="primary"
              @click="handleCompanyData"
              class="bg-primary flex items-center"
            >
              <template #icon
                ><Icon name="material-symbols:refresh"
              /></template>
              Tentar novamente
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1280px;
}
</style>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import CompanyInfo from "@/components/company/CompanyInfo.vue";
import CompanyNavigation from "@/components/company/CompanyNavigation.vue";
import CompanyComplains from "@/components/company/CompanyComplains.vue";
import CompanyAbout from "@/components/company/CompanyAbout.vue";
import CompanyRatings from "@/components/company/CompanyRatings.vue";
import CompanyRequests from "@/components/company/CompanyRequests.vue";
import { message } from "ant-design-vue";
import Skeleton from "@/components/company/skeleton.vue";

const router = useRoute();
const id = computed(() => router.params.id as string);

const { api } = useApiRequests();

const companyData = ref(null as any);
const currentTabs = ref(0);
const loading = ref(true);

const handleCompanyData = async () => {
  loading.value = true;
  try {
    const { data } = await api.get(`/companies/${id.value}`);
    companyData.value = data;
    message.success("Dados da empresa carregados com sucesso");
  } catch (error: any) {
    message.error("Não foi possível carregar os dados da empresa");
    console.error("Erro ao carregar dados da empresa:", error);
  } finally {
    loading.value = false;
  }
};

const onChange = (index: number) => {
  currentTabs.value = index;
};

watch(currentTabs, (newValue) => {
  localStorage.setItem("companyTab", newValue.toString());
});

onMounted(() => {
  watch(
    () => companyData.value,
    (newValue) => {
      if (newValue) {
        document.title = `${newValue.companyName} - Portal de Feedback`;
      }
    }
  );

  handleCompanyData();
  currentTabs.value = parseInt(localStorage.getItem("companyTab") || "0");
});
</script>
