<template>
  <div
    class="fixed inset-x-0 top-[4.5rem] z-40 transform transition-all duration-300 ease-in-out"
  >
    <div
      class="bg-white border border-gray-200 rounded-b-xl shadow-lg max-h-[calc(100vh-5rem)] overflow-y-auto"
    >
      <div class="container mx-auto px-4 py-3">
        <ul class="space-y-1">
          <li v-for="item in menuItems" :key="item.path">
            <NuxtLink
              :to="item.path"
              class="flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 group"
              @click="$emit('close')"
            >
              <component
                :is="item.icon"
                class="w-5 h-5 mr-3 text-gray-500 group-hover:text-primary transition-colors duration-200"
              />
              <span class="font-medium">{{ item.label }}</span>
            </NuxtLink>
          </li>
        </ul>

        <div class="mt-6 border-t border-gray-100 pt-4 pb-2">
          <p class="text-xs text-gray-500 mb-3 px-4">Área do usuário</p>
          <div class="flex flex-col gap-2 px-2">
            <NuxtLink
              to="/auth/login"
              class="flex items-center text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg px-4 py-3 transition-all duration-200"
              @click="$emit('close')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span class="font-medium">Fazer login</span>
            </NuxtLink>
            <NuxtLink
              to="/auth/register"
              class="flex items-center text-white bg-primary hover:bg-primary-dark rounded-lg px-4 py-3 transition-all duration-200"
              @click="$emit('close')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              <span class="font-medium">Cadastrar</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  menuItems: {
    type: Array,
    required: true,
  },
});

defineEmits(["close"]);
</script>

<style scoped>
.fixed {
  animation: slideDown 0.3s ease-out forwards;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
