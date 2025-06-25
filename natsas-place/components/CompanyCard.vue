<template>
  <div
    class="bg-white p-5 rounded-xl border border-gray-200 hover:border-[#3C50E0] hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col"
    @click="$emit('click')"
  >
    <div class="flex items-start space-x-4">
      <div class="flex-shrink-0">
        <img
          :src="
            company.photo ||
            `https://placehold.co/600x400/3C50E0/FFFFFF?text=${encodeURIComponent(
              company.companyName.substring(0, 2).toUpperCase()
            )}`
          "
          :alt="company.companyName"
          class="w-20 h-20 rounded-xl object-cover shadow-sm"
        />
      </div>
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-semibold text-gray-800 line-clamp-1">
            {{ company.companyName }}
          </h3>
          <div
            class="bg-blue-50 text-[#3C50E0] text-xs font-bold py-1 px-2 rounded-full"
          >
            {{ company.sector.name }}
          </div>
        </div>

        <div class="mt-3 flex items-center">
          <div
            class="flex items-center text-sm bg-gray-50 rounded-lg py-1 px-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-600 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span class="font-medium text-gray-700"
              >{{ company.startWorkTime }} - {{ company.endWorkTime }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <div
      class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between"
    >
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-red-500 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span class="text-sm font-medium text-gray-700">
          {{ company.occurrences.length }}
          <span class="text-gray-500">{{
            company.occurrences.length === 1 ? "Reclamação" : "Reclamações"
          }}</span>
        </span>
      </div>

      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-[#3C50E0]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  company: any;
}>();
</script>
