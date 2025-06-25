<template>
  <div>
    <TheHeader />
    <div>
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import TheHeader from "@/components/layout/TheHeader.vue";
</script>
