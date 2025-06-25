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
          Crie sua conta para começar a utilizar nossa plataforma.
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
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Crie sua conta</h1>
          <p class="text-gray-500">Comece sua jornada conosco</p>
        </div>

        <div
          v-if="!selectedType"
          class="space-y-6 bg-white/80 p-8 rounded-xl shadow-sm border border-gray-100"
        >
          <p class="text-gray-600 font-medium">Escolha seu tipo de conta:</p>
          <button
            @click="selectedType = 'user'"
            class="w-full p-6 border rounded-xl hover:border-primary hover:bg-blue-50/50 transition-all duration-300 flex items-center gap-4 group"
          >
            <div
              class="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors"
            >
              <UserIcon class="w-6 h-6 text-primary" />
            </div>
            <div class="text-left">
              <div class="font-semibold text-lg">Usuário</div>
              <div class="text-sm text-gray-500">
                Para fazer denúncias e reclamações
              </div>
            </div>
          </button>

          <button
            @click="selectedType = 'company'"
            class="w-full p-6 border rounded-xl hover:border-primary hover:bg-blue-50/50 transition-all duration-300 flex items-center gap-4 group"
          >
            <div
              class="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors"
            >
              <BuildingOfficeIcon class="w-6 h-6 text-primary" />
            </div>
            <div class="text-left">
              <div class="font-semibold text-lg">Empresa</div>
              <div class="text-sm text-gray-500">
                Para gerenciar feedback dos clientes
              </div>
            </div>
          </button>

          <!-- Registration Link -->
          <div class="text-center pt-4">
            <p class="text-gray-600">
              Já tem uma conta?
              <NuxtLink
                to="/auth/login"
                class="text-primary font-medium hover:underline ml-1"
              >
                Entrar
              </NuxtLink>
            </p>
          </div>
        </div>

        <a-form
          v-if="selectedType"
          ref="formRef"
          :model="form"
          :rules="rules"
          @submit.prevent="handleSubmit"
          class="bg-white/80 p-8 rounded-xl shadow-sm border border-gray-100 space-y-6 relative"
          layout="vertical"
        >
          <button
            type="button"
            @click="selectedType = null"
            class="flex items-center text-gray-600 hover:text-primary transition-colors group"
          >
            <ArrowLeftIcon
              class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
            />
            Voltar
          </button>

          <div v-if="selectedType === 'company'" class="space-y-4">
            <a-form-item
              label="Nome da Empresa"
              name="companyName"
              :rules="[
                {
                  required: true,
                  message: 'Por favor insira o nome da empresa',
                },
              ]"
            >
              <a-input
                v-model:value="form.companyName"
                size="large"
                class="rounded-lg h-12"
              >
                <template #prefix>
                  <BuildingOfficeIcon class="w-5 h-5 text-gray-400" />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item
              label="NUIT"
              name="nuit"
              :rules="[
                { required: true, message: 'Por favor insira o NUIT' },
                {
                  pattern: /^[0-9]{9}$/,
                  message: 'NUIT deve conter 9 dígitos',
                },
              ]"
            >
              <a-input
                v-model:value="form.nuit"
                size="large"
                class="rounded-lg h-12"
              >
                <template #prefix>
                  <span class="flex items-center text-gray-400">#</span>
                </template>
              </a-input>
            </a-form-item>

            <a-form-item
              label="Setor de Atividade"
              name="sector"
              :rules="[
                { required: true, message: 'Por favor selecione um setor' },
              ]"
            >
              <a-select
                v-model:value="form.sector"
                size="large"
                class="rounded-lg h-12"
              >
                <a-select-option value="">Selecione um setor</a-select-option>
                <a-select-option value="Comércio">Comércio</a-select-option>
                <a-select-option value="Serviços">Serviços</a-select-option>
                <a-select-option value="Tecnologia">Tecnologia</a-select-option>
                <a-select-option value="Finanças">Finanças</a-select-option>
                <a-select-option value="Telecomunicações"
                  >Telecomunicações</a-select-option
                >
                <a-select-option value="Outro">Outro</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item
              label="Telefone Comercial"
              name="businessPhone"
              :rules="[
                { required: true, message: 'Por favor insira o telefone' },
                {
                  pattern: /^[0-9]{9}$/,
                  message: 'Telefone deve conter 9 dígitos',
                },
              ]"
            >
              <a-input
                v-model:value="form.businessPhone"
                size="large"
                class="rounded-lg h-12"
              >
                <template #prefix>
                  <span class="flex items-center text-gray-400">📞</span>
                </template>
              </a-input>
            </a-form-item>

            <a-form-item
              label="Email"
              name="email"
              :rules="[
                { required: true, message: 'Por favor insira o email' },
                { type: 'email', message: 'Por favor insira um email válido' },
              ]"
            >
              <a-input
                v-model:value="form.email"
                size="large"
                class="rounded-lg h-12"
              >
                <template #prefix>
                  <span class="flex items-center text-gray-400">✉️</span>
                </template>
              </a-input>
            </a-form-item>
          </div>

          <div v-if="selectedType === 'user'" class="space-y-4">
            <a-form-item
              label="Username"
              name="username"
              :rules="[
                { required: true, message: 'Por favor insira seu username' },
                { min: 3, message: 'Username deve ter no mínimo 3 caracteres' },
              ]"
            >
              <a-input
                v-model:value="form.username"
                size="large"
                class="rounded-lg h-12"
              >
                <template #prefix>
                  <UserIcon class="w-5 h-5 text-gray-400" />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item
              label="Senha"
              name="password"
              :rules="[
                { required: true, message: 'Por favor insira sua senha' },
                { min: 8, message: 'A senha deve ter no mínimo 8 caracteres' },
              ]"
            >
              <a-input-password
                v-model:value="form.password"
                size="large"
                class="rounded-lg h-12"
              >
                <template #prefix>
                  <span class="flex items-center text-gray-400">🔒</span>
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item
              label="Confirmar Senha"
              name="confirmPassword"
              :rules="[
                { required: true, message: 'Por favor confirme sua senha' },
              ]"
            >
              <a-input-password
                v-model:value="form.confirmPassword"
                size="large"
                class="rounded-lg h-12"
              >
                <template #prefix>
                  <span class="flex items-center text-gray-400">🔒</span>
                </template>
              </a-input-password>
            </a-form-item>
          </div>

          <div
            class="flex flex-col items-start gap-5"
            v-if="selectedType === 'user' || selectedType === 'company'"
          >
            <div class="flex items-center gap-2">
              <a-checkbox v-model:checked="form.acceptedTerms">
                <span class="text-sm text-gray-600">
                  Li e aceito os
                  <a href="/termos" class="text-primary hover:underline"
                    >Termos de Uso</a
                  >
                  e a
                  <a href="/privacidade" class="text-primary hover:underline"
                    >Política de Privacidade</a
                  >
                </span>
              </a-checkbox>
            </div>
            <a-button
              type="primary"
              html-type="submit"
              :loading="isLoading"
              :block="true"
              size="large"
              class="!bg-primary h-12 rounded-lg font-medium"
            >
              {{ isLoading ? "Processando..." : "Criar Conta" }}
            </a-button>

            <!-- Login Link -->
            <div class="text-center w-full pt-4">
              <p class="text-gray-600">
                Já tem uma conta?
                <NuxtLink
                  to="/auth/login"
                  class="text-primary font-medium hover:underline ml-1"
                >
                  Entrar
                </NuxtLink>
              </p>
            </div>
          </div>

          <div
            v-if="isLoading"
            class="absolute inset-0 bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-xl flex items-center justify-center"
          >
            <div class="flex flex-col text-xl items-center">
              <a-spin size="large" />
              <p class="text-gray-600">Aguarde enquanto criamos sua conta</p>
            </div>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  UserIcon,
  BuildingOfficeIcon,
  ArrowLeftIcon,
} from "@heroicons/vue/24/outline";
import {
  Form as AForm,
  Input as AInput,
  Select as ASelect,
  Spin,
  Checkbox,
  Button,
  message,
} from "ant-design-vue";
import { useDebounceFn } from "@vueuse/core";
import AppLogo from "~/components/layout/AppLogo.vue";

const AFormItem = AForm.Item;
const AInputPassword = AInput.Password;
const ASelectOption = ASelect.Option;

definePageMeta({
  layout: "blank",
});

const { api } = useApiRequests();
const router = useRouter();

const isLoading = ref(false);
const selectedType = ref<"user" | "company" | null>(null);
const form = ref({
  email: "",
  password: "",
  username: "",
  confirmPassword: "",
  companyName: "",
  nuit: "",
  sector: "",
  businessPhone: "",
  acceptedTerms: false,
});

const formRef = ref();

const rules = {
  username: [
    { required: true, message: "Por favor insira seu username" },
    { min: 3, message: "Username deve ter no mínimo 3 caracteres" },
    {
      async validator(rule: any, value: string) {
        if (!value) return;

        const debouncedUsername = useDebounceFn(async () => {
          const isAvailable = await verifyUsername(value);
          if (!isAvailable) {
            throw new Error("Username já existe");
          }
        }, 1000);
        debouncedUsername();
      },
    },
  ],
  password: [
    { required: true, message: "Por favor insira sua senha" },
    { min: 8, message: "A senha deve ter no mínimo 8 caracteres" },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      message: "A senha deve conter letras maiúsculas, minúsculas e números",
    },
  ],
  confirmPassword: [
    { required: true, message: "Por favor confirme sua senha" },
    {
      validator(rule: any, value: string) {
        if (value !== form.value.password) {
          throw new Error(
            "As senhas não correspondem. Por favor, tente novamente."
          );
        }
      },
    },
  ],
};

const handleSubmit = async () => {
  console.log("handleSubmitCreateUser");
  if (selectedType.value === "user") {
    await handleSubmitCreateUser();
  } else if (selectedType.value === "company") {
    await handleSubmitCreateCompany();
  }
};

const handleSubmitCreateUser = async () => {
  console.log("handleSubmitCreateUser");
  isLoading.value = true;
  try {
    await api.post("/users", {
      username: form.value.username,
      password: form.value.password,
    });

    message.success("Conta criada com sucesso");
    router.push("/auth/login");
  } catch (error) {
    message.error("Erro ao criar conta. Por favor, tente novamente.");
  } finally {
    isLoading.value = false;
  }
};

const handleSubmitCreateCompany = async () => {
  try {
    isLoading.value = true;
    await api.post("/companies", {
      companyName: form.value.companyName,
      nuit: form.value.nuit,
      sector: form.value.sector,
      phone: form.value.businessPhone,
      email: form.value.email,
    });
    message.success(
      "Empresa registada com sucesso. Por favor, verifique seu email para mais detalhes."
    );
    router.push("/");
  } catch (error) {
    message.error("Erro ao criar empresa. Por favor, tente novamente.");
  } finally {
    isLoading.value = false;
  }
};

const verifyUsername = async (username: string) => {
  console.log("Verifying username:", username);
  const { data } = await api.get(`users/verify-username/${username}`);

  return data.isAvailable;
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

:deep(.ant-select-selector) {
  height: 48px !important;
  padding-top: 8px !important;
  border-radius: 0.5rem !important;
}

:deep(.ant-select:not(.ant-select-disabled):hover .ant-select-selector) {
  border-color: rgba(var(--primary-rgb), 0.8);
}

:deep(.ant-select-focused:not(.ant-select-disabled) .ant-select-selector) {
  border-color: rgba(var(--primary-rgb), 0.8) !important;
  box-shadow: 0 0 0 2px rgba(var(--primary-rgb), 0.2) !important;
}
</style>
