<template>
  <div>
    <main>
      <SimplifiedHeroSection />
      <CoreFeatures />
      <SimplifiedHowItWorks />
      <CallToAction />
      <TheFooter />
    </main>
  </div>
</template>

<script setup>
import SimplifiedHeroSection from "@/components/home/HeroSection.vue";
import CoreFeatures from "@/components/home/CoreFeatures.vue";
import SimplifiedHowItWorks from "@/components/home/SimplifiedHowItWorks.vue";
import CallToAction from "@/components/home/CallToAction.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

body {
  font-family: "Inter", sans-serif;
}
</style>
