<template>
  <div class="items-center space-x-3">
    <NuxtLink
      v-for="item in menuItems"
      :key="item.path"
      :to="item.path"
      active-class="bg-primary/10 text-primary font-medium rounded-full px-4 py-2"
      class="text-gray-700 text-sm flex items-center gap-2 hover:bg-gray-100 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
    >
      <component
        :is="item.icon"
        class="w-5 h-5 transition-transform group-hover:rotate-12"
      />
      <span>{{ item.label }}</span>
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  menuItems: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.router-link-active {
  position: relative;
}

.router-link-active::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 25%;
  width: 50%;
  height: 2px;
  background-color: currentColor;
  transform: scaleX(1);
  transition: transform 0.3s ease;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
