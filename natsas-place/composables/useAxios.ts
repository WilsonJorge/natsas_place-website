import axios, { type AxiosInstance } from "axios";
import { useUserStore } from "@/stores/userStore";

export function useAxios(): AxiosInstance {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://feedback.maebiz.co.mz/",
    // timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const userStore = useUserStore();

  // Interceptor para adicionar o token em todas as requisições
  api.interceptors.request.use(
    (config) => {
      const token = userStore?.user?.access_token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor para tratar erros de resposta
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const userStore = useUserStore();

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        userStore.logout();
      }

      return Promise.reject(error);
    }
  );

  return api;
}

// Funções auxiliares para requisições comuns
export const useApiRequests = () => {
  const api = useAxios();

  return {
    api,
  };
};
