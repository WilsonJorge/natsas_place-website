<template>
  <div>
    <HeroSection />
    <TheHero />
  </div>
</template>

<style scoped>
.container {
  max-width: 1280px;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "#app";
import TheFooter from "@/components/layout/TheFooter.vue";
// import HeroSection from "@/components/home/HeroSection.vue";

// Section Components
import HeroSection from "@/components/about/HeroSection.vue";
import TheHero from "@/components/about/TheHero.vue";
import MissionSection from "@/components/about/MissionSection.vue";
import TeamSection from "@/components/about/TeamSection.vue";

// State and Variables
const router = useRouter();
const searchTerm = ref("");
const isSearching = ref(false);
const currentImageIndex = ref(0);

const images = ["worker-protesting-working-rights.jpg"];
</script>
