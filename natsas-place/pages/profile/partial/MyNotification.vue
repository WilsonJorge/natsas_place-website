<template>
  <div class="max-w-7xl mx-auto py-5 bg-white rounded-lg border">
    <a-list
      :data-source="notifications"
      :loading="loading"
      item-layout="horizontal"
    >
      <template #header>
        <div class="flex justify-between items-center px-6">
          <h2 class="text-xl font-semibold">Minhas Notificações</h2>
          <a-button
            type="link"
            @click="markAllAsRead"
            v-if="hasUnreadNotifications"
          >
            Marcar todas como lidas
          </a-button>
        </div>
      </template>

      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta
            :class="[
              'transition-colors p-5',
              !item.isRead &&
                'bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-lg',
            ]"
            @click="handleNotificationClick(item)"
          >
            <template #avatar>
              <a-badge :dot="!item.isRead">
                <a-avatar>
                  <template #icon><BellOutlined /></template>
                </a-avatar>
              </a-badge>
            </template>
            <template #title>
              <div class="flex items-center gap-2">
                {{ item.title }}
                <span
                  v-if="isNew(item.createdAt) && !item.isRead"
                  class="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full"
                >
                  Novo
                </span>
              </div>
            </template>
            <template #description>
              <div class="flex flex-col gap-1">
                <p>{{ item.content }}</p>
                <span class="text-xs text-gray-500">
                  {{ formatDate(item.createdAt) }}
                </span>
              </div>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>

      <template #empty>
        <a-empty description="Nenhuma notificação encontrada" />
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { BellOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

// Dados mockados para exemplo
const notifications = ref([
  {
    id: "1",
    title: "Bem-vindo ao sistema",
    content: "Obrigado por se cadastrar em nossa plataforma!",
    redirect: "/dashboard",
    from: "Sistema",
    isRead: false,
    createdAt: new Date("2024-12-24T10:00:00"),
  },
  {
    id: "2",
    title: "Nova mensagem recebida",
    content: "Você recebeu uma nova mensagem do administrador",
    redirect: "/messages",
    from: "Admin",
    isRead: false,
    createdAt: new Date("2024-03-19T15:30:00"),
  },
]);

const loading = ref(false);

const hasUnreadNotifications = computed(() => {
  return notifications.value.some((notif) => !notif.isRead);
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const handleNotificationClick = async (notification) => {
  if (!notification.isRead) {
    // Aqui você implementaria a chamada à API para marcar como lida
    notification.isRead = true;
  }

  if (notification.redirect) {
    // Implementar navegação
    console.log("Navegando para:", notification.redirect);
  }
};

const markAllAsRead = async () => {
  try {
    loading.value = true;
    // Aqui você implementaria a chamada à API para marcar todas como lidas
    notifications.value = notifications.value.map((notif) => ({
      ...notif,
      isRead: true,
    }));
    message.success("Todas as notificações foram marcadas como lidas");
  } catch (error) {
    message.error("Erro ao marcar notificações como lidas");
  } finally {
    loading.value = false;
  }
};

const isNew = (date) => {
  const now = new Date();
  const notificationDate = new Date(date);
  const diffInHours = (now - notificationDate) / (1000 * 60 * 60);
  return diffInHours < 24;
};
</script>
