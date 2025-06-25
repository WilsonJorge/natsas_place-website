<template>
  <div class="text-center py-8 text-red-600 h-screen">
    <p>{{ error }}</p>
    <button
      @click="$emit('retry')"
      class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Tentar novamente
    </button>
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: String,
    required: true,
  },
});

defineEmits(["retry"]);
</script>
