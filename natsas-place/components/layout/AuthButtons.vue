<template>
  <div class="flex items-center gap-2">
    <NuxtLink
      to="/auth/login"
      class="text-blue-500 hover:bg-blue-500/15 rounded-md px-3 py-2"
    >
      Login
    </NuxtLink>
    <NuxtLink
      to="/auth/register"
      class="bg-blue-500 text-white hover:bg-blue-600 rounded-md px-3 py-2"
    >
      Cadastrar
    </NuxtLink>
  </div>
</template>

<script setup>
defineEmits(["close"]);
</script>
