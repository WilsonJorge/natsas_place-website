<template>
  <div class="bg-white rounded-lg overflow-hidden shadow-md">
    <img
      :src="image"
      :alt="name"
      class="w-full h-64 object-cover"
    />
    <div class="p-6">
      <h3 class="text-xl font-semibold mb-2">{{ name }}</h3>
      <p class="text-gray-600 mb-2">{{ role }}</p>
      <p class="text-gray-500">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  role: string
  description: string
  image: string
}>()</script>