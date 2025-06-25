<template>
  <div
    class="relative bg-white px-8 py-2 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
  >
    <div
      class="absolute -top-2 -right-2 w-24 h-24 bg-blue-50 rounded-full opacity-50 blur-xl"
    ></div>

    <div class="space-y-4 relative z-10">
      <div class="flex items-center gap-4 mt-8">
        <div class="w-16 h-16 rounded-full overflow-hidden ring-4 ring-blue-50">
          <div v-if="avatar" class="w-full h-full">
            <img
              :src="avatar"
              :alt="author"
              class="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div
            v-else
            class="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium text-xl"
          >
            {{ getInitials(author) }}
          </div>
        </div>

        <div class="group">
          <p
            class="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300"
          >
            {{ author }}
          </p>
          <p class="text-sm text-gray-600">
            {{ company }}
          </p>
          <div class="flex gap-2 mt-1" v-if="socials">
            <a
              v-for="(url, platform) in socials"
              :key="platform"
              :href="url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-500 hover:text-blue-600 transition-colors duration-300"
            >
              <i :class="`fab fa-${platform}`"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="relative">
        <p class="text-lg text-gray-700 leading-relaxed mb-8 italic">
          "{{ text }}"
        </p>

        <div
          class="absolute -bottom-4 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
  author: string;
  company: string;
  avatar?: string;
  socials?: Record<string, string>;
}>();

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
</script>

<style scoped>
.testimonial-card {
  backdrop-filter: blur(8px);
}
</style>
