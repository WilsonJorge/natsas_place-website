<template>
  <div class="flex items-center gap-3">
    <template v-if="userStore.user">
      <div class="relative">
        <!-- User Menu Button -->
        <button
          @click="$emit('toggle-menu')"
          class="flex items-center gap-2 text-gray-700 hover:bg-gray-100 rounded-full px-3 py-2 transition-all duration-300 ease-in-out border border-transparent hover:border-gray-200 hover:shadow-sm"
        >
          <UserAvatar />
        </button>

        <!-- Dropdown Menu -->
        <div
          v-if="isMenuOpen"
          class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 transform origin-top-right transition-all duration-200"
        >
          <div class="px-4 py-3 border-b border-gray-100">
            <p class="text-sm font-medium text-gray-900">
              {{ userStore.user?.name || "Usuário" }}
            </p>
            <p class="text-xs text-gray-500 truncate">
              {{ userStore.user?.email || "" }}
            </p>
          </div>

          <NuxtLink
            to="/profile"
            class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Meu Perfil
          </NuxtLink>

          <button
            @click="$emit('logout')"
            class="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-500 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sair
          </button>
        </div>
      </div>
    </template>

    <template v-else>
      <AuthButtons @close="$emit('close')" class="hidden md:flex" />
    </template>
  </div>
</template>

<script setup>
import AuthButtons from "./AuthButtons.vue";
import UserAvatar from "./UserAvatar.vue";

const userStore = useUserStore();

defineProps({
  isMenuOpen: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["toggle-menu", "logout", "close"]);
</script>

<style scoped>
.absolute {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
