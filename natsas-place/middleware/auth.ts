import { useUserStore } from "@/stores/userStore";
import { defineNuxtRouteMiddleware, navigateTo } from "#app";

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path.includes("/auth/login") || to.path.includes("/auth/register")) {
    return;
  }

  const userStore = useUserStore();
  const { api } = useApiRequests();

  try {
    if (userStore.user?.access_token) {
      await api.get("/auth/me");
      return;
    }
    return navigateTo("/auth/login");
  } catch (error) {
    userStore.logout();
    return navigateTo("/auth/login");
  }
});
