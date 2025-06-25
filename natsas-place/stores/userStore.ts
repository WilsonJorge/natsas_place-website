import { defineStore } from "pinia";

interface UserState {
  user: any;
}

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    user: null,
  }),
  actions: {
    setUser(userData: Partial<UserState>) {
      this.user = {
        ...this.user,
        ...userData,
      };
    },
    logout() {
      this.user = null;
    },
  },
  persist: true,
});
