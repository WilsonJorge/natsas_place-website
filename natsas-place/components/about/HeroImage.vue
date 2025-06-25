<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- Background Decoration -->
    <div class="absolute -z-10 w-[140%] h-[140%] bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-full -right-[20%] -top-[20%] opacity-20 animate-pulse" />
    
    <!-- Main Image Container -->
    <div :class="[
      'relative transition-all duration-1000 h-[400px] md:h-[500px] lg:h-[600px]',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    ]">
      <!-- Dashboard Preview -->
      <img
        src="/images/Laptop.png"
        alt="Dashboard FeedbackMZ"
        class="w-full h-full object-contain rounded-lg shadow-2xl"
      />
    </div>
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(3deg); }
  50% { transform: translateY(-10px) rotate(3deg); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0) rotate(-3deg); }
  50% { transform: translateY(-10px) rotate(-3deg); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 3s ease-in-out infinite;
  animation-delay: 1.5s;
}
</style>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { TrendingUp, Bell } from 'lucide-vue-next';

const isVisible = ref(false);

onMounted(() => {
  isVisible.value = true;
});
</script>