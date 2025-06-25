<template>
  <div class="flex items-center gap-2">
    <img
      v-if="userStore.user?.avatar"
      :src="userStore.user.avatar"
      class="w-14 h-14 rounded-full"
      alt="Avatar"
    />
    <div v-else class="flex items-center gap-2">
      <span
        class="w-8 h-8 rounded-full bg-blue-600 flex items-center uppercase justify-center text-white"
      >
        {{
          userStore.user?.username?.[0] || userStore.user?.profile?.name?.[0]
        }}
      </span>
      <div class="flex text-black flex-col items-start">
        <span>{{
          userStore.user?.username || userStore.user?.profile?.name
        }}</span>
        <span class="text-xs text-gray-400">
          {{ userStore.user?.profile?.email || "Sem email" }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const userStore = useUserStore();

defineProps({
  background: {
    type: String,
    required: true,
  },
});
</script>
