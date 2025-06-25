<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <!-- Gradient & Vector Section -->
    <div class="hidden md:flex md:w-1/2 relative overflow-hidden">
      <!-- Strong gradient background -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-purple-600 via-primary to-blue-500"
      ></div>
      <!-- Vector Shapes with stronger colors -->
      <div class="absolute inset-0 w-full h-full">
        <div
          class="absolute top-[10%] left-[20%] w-32 h-32 rounded-full bg-yellow-400/80 backdrop-blur-md animate-pulse"
        ></div>
        <div
          class="absolute top-[20%] right-[15%] w-40 h-40 rounded-full bg-pink-500/70 backdrop-blur-md"
        ></div>
        <div
          class="absolute bottom-[30%] left-[15%] w-48 h-48 rounded-full bg-blue-600/70 backdrop-blur-md"
        ></div>
        <div
          class="absolute top-[50%] right-[25%] w-28 h-28 rounded-full bg-green-500/80 backdrop-blur-md animate-pulse"
        ></div>
        <div
          class="absolute bottom-[15%] right-[20%] w-44 h-44 rounded-full bg-orange-500/70 backdrop-blur-md"
        ></div>
        <!-- Additional geometric shapes -->
        <div
          class="absolute top-[40%] left-[30%] w-36 h-36 rotate-45 bg-teal-500/60 backdrop-blur-md"
        ></div>
        <div
          class="absolute bottom-[40%] right-[10%] w-24 h-24 rounded-lg bg-indigo-600/60 backdrop-blur-md rotate-12"
        ></div>
      </div>
      <div
        class="absolute bottom-8 left-8 right-8 p-6 bg-white/15 backdrop-blur-xl rounded-xl border border-white/30"
      >
        <h2 class="text-2xl font-bold text-white mb-2">
          Plataforma de Feedback
        </h2>
        <p class="text-white/90">
          Conecte-se para gerenciar e visualizar feedbacks do seu sistema.
        </p>
      </div>
    </div>

    <!-- Form Section -->
    <div
      class="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white"
    >
      <div class="w-full max-w-md">
        <!-- Logo -->
        <div class="mb-10 flex justify-center md:justify-start">
          <AppLogo class="h-12" />
        </div>

        <!-- Welcome Text -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            Bem-vindo de volta
          </h1>
          <p class="text-gray-500">Entre com suas credenciais para continuar</p>
        </div>

        <!-- Login Form -->
        <a-form
          layout="vertical"
          @submit.prevent="handleLogin"
          class="space-y-6"
        >
          <a-form-item>
            <a-input
              v-model:value="form.search"
              placeholder="Nome de usuário ou e-mail"
              size="large"
              class="rounded-lg h-12"
            >
              <template #prefix>
                <user-outlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input-password
              v-model:value="form.password"
              placeholder="Senha"
              size="large"
              class="rounded-lg h-12"
            >
              <template #prefix>
                <lock-outlined />
              </template>
            </a-input-password>
          </a-form-item>

          <div class="flex justify-between items-center">
            <a-checkbox>
              <span class="text-gray-600">Lembrar-me</span>
            </a-checkbox>
            <a
              href="#"
              class="text-primary text-sm font-medium hover:underline"
            >
              Esqueceu a senha?
            </a>
          </div>

          <a-button
            type="primary"
            html-type="submit"
            :block="true"
            :loading="loading"
            size="large"
            class="!bg-primary h-12 rounded-lg font-medium"
          >
            {{ loading ? "Entrando..." : "Entrar" }}
          </a-button>

          <!-- Registration Link -->
          <div class="text-center pt-4">
            <p class="text-gray-600">
              Não tem uma conta?
              <NuxtLink
                to="/auth/register"
                class="text-primary font-medium hover:underline ml-1"
              >
                Criar conta
              </NuxtLink>
            </p>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from "vue";
import { useUserStore } from "@/stores/userStore";
import { message } from "ant-design-vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import AppLogo from "~/components/layout/AppLogo.vue";

definePageMeta({
  layout: "blank",
});

const { api } = useApiRequests();
const userStore = useUserStore();
const router = useRouter();

const loading = ref(false);

const form = ref({
  password: "",
  search: "",
});

const handleLogin = async () => {
  if (!form.value.search || !form.value.password) {
    message.warning("Por favor, preencha todos os campos");
    return;
  }

  loading.value = true;
  try {
    const { data } = await api.post("/auth/login", {
      search: form.value.search,
      password: form.value.password,
    });
    userStore.setUser(data);
    message.success("Login realizado com sucesso");
    router.push("/");
  } catch (error) {
    message.error("Usuário ou senha inválidos");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
:deep(.ant-input-affix-wrapper) {
  border-radius: 0.5rem;
}

:deep(.ant-input-affix-wrapper:focus),
:deep(.ant-input-affix-wrapper-focused) {
  box-shadow: 0 0 0 2px rgba(var(--primary-rgb), 0.2);
  border-color: rgba(var(--primary-rgb), 0.8);
}

:deep(.ant-btn-primary) {
  background-color: rgba(var(--primary-rgb), 1);
  border-color: rgba(var(--primary-rgb), 1);
  transition: all 0.3s ease;
}

:deep(.ant-btn-primary:hover) {
  background-color: rgba(var(--primary-rgb), 0.9);
  border-color: rgba(var(--primary-rgb), 0.9);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.2);
}

:deep(.ant-input-prefix) {
  margin-right: 8px;
  display: flex;
  align-items: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  padding-right: 12px;
}
</style>
