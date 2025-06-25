### Step 1 Component: `CompanySelection.vue` ```vue
<template>
  <div class="space-y-6">
    <a-input-search
      v-model:value="searchTerm"
      placeholder="Pesquisar empresa..."
      class="max-w-xs"
      :loading="loadingCompanies"
    />
    <div v-for="(companies, sector) in filteredCompanies" :key="sector">
      <a-divider orientation="left">
        {{ sector }}
        <a-tag>{{ companies.length }}</a-tag>
      </a-divider>
      <div class="grid grid-cols-3 gap-5 w-full">
        <CompanyCard
          v-for="company in companies"
          :key="company.id"
          :company="company"
          @click="selectCompany(company)"
          class="transition-all duration-300 hover:shadow-md"
          :class="{
            'border-2 !border-blue-600': selectedCompany?.id === company.id,
          }"
        />
      </div>
    </div>
    <div v-if="loadingCompanies" class="col-span-full text-center py-8">
      <a-spin />
      <div class="mt-2 text-gray-500">Carregando empresas...</div>
    </div>
    <div
      v-if="Object.keys(filteredCompanies).length === 0 && !loadingCompanies"
      class="col-span-full text-center py-8"
    >
      <a-empty description="Nenhuma empresa encontrada" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useCompanySearch } from "@/composables/useCompanySearch";
import CompanyCard from "@/components/CompanyCard.vue";

const emit = defineEmits(["update:modelValue"]);

const { companies, searchTerm, loadingCompanies, fetchCompanies } =
  useCompanySearch();

const selectedSector = ref(null);
const selectedCompany = ref<any>(null);

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

const selectCompany = (company: any) => {
  selectedCompany.value = company;
  emit("update:modelValue", company.id);
};

onMounted(() => {
  fetchCompanies();
});
</script>
