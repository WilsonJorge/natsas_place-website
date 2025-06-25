<script setup lang="ts">
const emit = defineEmits(["onChange"]);

// Initialize currentTab from localStorage or default to 0
const currentTab = ref(parseInt(localStorage.getItem("companyTab") || "0"));

// Watch for changes and update localStorage
watch(currentTab, (newValue) => {
  localStorage.setItem("companyTab", newValue.toString());
});

const navItems = [
  {
    label: "Sobre",
    icon: "material-symbols:info-outline",
    name: "companyAbout",
  },
  {
    label: "Reclamações",
    icon: "material-symbols:comment-outline",
    name: "companyComplains",
  },
  {
    label: "Avaliações",
    icon: "material-symbols:star-outline",
    name: "companyRatings",
  },
  {
    label: "Pedidos de informação",
    icon: "material-symbols:info-outline",
    name: "companyRequests",
  },
];
</script>
<template>
  <nav
    class="bg-white mt-4 rounded-lg border shadow-sm mx-2 sm:mx-5 overflow-hidden"
  >
    <div class="flex overflow-x-auto">
      <button
        v-for="(item, index) in navItems"
        :key="item.label"
        @click.prevent="
          () => {
            currentTab = index;
            emit('onChange', index);
          }
        "
        class="px-4 sm:px-6 py-4 flex items-center gap-2 hover:text-blue-600 border-b-2 border-transparent transition-colors whitespace-nowrap cursor-pointer text-gray-700"
        :class="{
          '!border-b-2 !border-blue-600 !text-blue-600 bg-blue-50':
            currentTab === index,
        }"
      >
        <Icon :name="item.icon" class="text-xl" />
        <span>{{ item.label }}</span>
      </button>
    </div>
  </nav>
</template>
