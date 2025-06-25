<template>
  <header
    class="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50 transition-all duration-300"
  >
    <nav class="container mx-auto px-4 py-4 w-full">
      <div class="flex items-center justify-between">
        <AppLogo
          class="transform hover:scale-105 transition-transform duration-300"
        />

        <div class="flex items-center gap-4">
          <DesktopNavigation
            :menu-items="menuItems"
            class="hidden md:flex space-x-1"
          />

          <UserMenu
            :is-menu-open="isMenuOpen"
            @toggle-menu="isMenuOpen = !isMenuOpen"
            @logout="handleLogout"
            class="transition-all duration-300 hover:opacity-90"
          />

          <MobileMenuButton
            :is-open="isMobileMenuOpen"
            @toggle="handleOpenMenu"
            class="md:hidden text-gray-700 hover:text-primary transition-colors duration-300"
          />
        </div>
      </div>

      <MobileNavigation
        v-if="isMobileMenuOpen"
        :menu-items="menuItems"
        @close="isMobileMenuOpen = false"
        class="mt-3 rounded-lg shadow-lg overflow-hidden transition-all duration-300"
      />
    </nav>
  </header>
</template>

<script setup>
import {
  NewspaperIcon,
  BuildingOfficeIcon,
  InformationCircleIcon,
  HomeIcon,
} from "@heroicons/vue/24/outline";
import UserMenu from "./UserMenu.vue";
import DesktopNavigation from "./DesktopNavigation.vue";
import AppLogo from "./AppLogo.vue";
import MobileMenuButton from "./MobileMenuButton.vue";
import MobileNavigation from "./MobileNavigation.vue";

// Composables
const route = useRoute();
const userStore = useUserStore();

// Refs
const isMenuOpen = ref(false);
const isMobileMenuOpen = ref(false);

// Constants
const menuItems = [
  { label: "Home", path: "/", icon: HomeIcon },
  { label: "Empresas", path: "/companies", icon: BuildingOfficeIcon },
  { label: "Notícias", path: "/news", icon: NewspaperIcon },
];

// Methods
const handleLogout = async () => {
  await userStore.logout();
  isMenuOpen.value = false;
  navigateTo("/");
};

const handleOpenMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Lifecycle hooks
onMounted(() => {
  // Add shadow effect on scroll
  const handleScroll = () => {
    const header = document.querySelector("header");
    if (window.scrollY > 10) {
      header.classList.add("shadow-md");
      header.classList.remove("shadow-sm");
    } else {
      header.classList.remove("shadow-md");
      header.classList.add("shadow-sm");
    }
  };

  window.addEventListener("scroll", handleScroll);

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".relative")) {
      isMenuOpen.value = false;
    }
    if (!e.target.closest("nav")) {
      isMobileMenuOpen.value = false;
    }
  });

  // Clean up event listener
  onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
  });
});

// Watchers
watch(
  () => route.fullPath,
  () => {
    isMobileMenuOpen.value = false;
  }
);
</script>

<style scoped>
header {
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
  }
}
</style>
