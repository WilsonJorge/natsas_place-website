<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- Grid Container -->
      <div class="grid grid-cols-12 gap-8">
        <!-- Sidebar - Ajustado com melhor espaçamento e estilo -->
        <div class="col-span-12 md:col-span-3">
          <a-menu
            mode="inline"
            class="rounded-xl border"
            v-model:selectedKeys="activeTab"
          >
            <a-menu-item key="profile" class="font-medium">
              <span>Meu Perfil</span>
            </a-menu-item>
            <a-menu-item key="occurrences" class="font-medium">
              <span>Ocorrencias</span>
            </a-menu-item>
            <a-menu-item key="notifications" class="font-medium">
              <span>Notificações</span>
            </a-menu-item>
            <a-menu-item key="delete" danger class="font-medium">
              <span>Apagar Conta</span>
            </a-menu-item>
          </a-menu>
        </div>

        <div class="col-span-12 md:col-span-9">
          <UserInformation v-if="activeTab.includes('profile')" :user="user" />
          <MyComplains v-if="activeTab.includes('occurrences')" :user="user" />
          <MyNotification
            v-if="activeTab.includes('notifications')"
            :user="user"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import UserInformation from "./partial/UserInformation.vue";
import MyComplains from "./partial/MyComplains.vue";
import MyNotification from "./partial/MyNotification.vue";

const { user } = useUserStore();
const activeTab = ref(["profile"]);
</script>
