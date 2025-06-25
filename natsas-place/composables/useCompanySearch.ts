import { ref, computed } from "vue";
import { useDebounceFn } from "@vueuse/core";

export function useCompanySearch() {
  const companies = ref<Company[]>([]);
  const searchTerm = ref("");
  const loadingCompanies = ref(false);
  const { api } = useApiRequests();

  const companiesByCategory = (companies: any[]) => {
    return companies.reduce((acc: Record<string, any[]>, company: any) => {
      const sectorName = company.sector.name;
      if (!acc[sectorName]) {
        acc[sectorName] = [];
      }
      acc[sectorName].push(company);
      return acc;
    }, {});
  };

  const fetchCompanies = async (params?: any) => {
    loadingCompanies.value = true;
    try {
      const { data } = await api.get("/companies", {
        params: {
          limit: 10000,
          page: 1,
          status: "ACTIVE",
          ...params,
        },
      });
      companies.value = companiesByCategory(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      loadingCompanies.value = false;
    }
  };

  const debouncedSearch = useDebounceFn(fetchCompanies, 300);

  return {
    companies,
    searchTerm,
    loadingCompanies,
    fetchCompanies,
    debouncedSearch,
  };
}
