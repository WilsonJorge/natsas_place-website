<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section - Updated design -->
    <div class="py-8 bg-white border-b">
      <div class="container mx-auto px-6">
        <div class="flex items-center gap-4 mb-6">
          <div class="h-12 w-1 bg-blue-600 rounded-full"></div>
          <h1 class="text-3xl font-bold text-gray-900">
            {{ occurrenceId ? "Atualizar Ocorrência" : "Nova Ocorrência" }}
          </h1>
        </div>
        <p class="text-gray-600 text-lg pl-16">
          {{
            occurrenceId
              ? "Atualize os detalhes da ocorrência existente"
              : "Registre uma nova ocorrência no sistema"
          }}
        </p>
      </div>
    </div>

    <div class="container mx-auto px-6 py-8">
      <div class="bg-white rounded-xl border p-8">
        <!-- Add Steps Component -->
        <a-steps :current="currentStep" :items="items" class="mb-8" />

        <a-form
          ref="formRef"
          :model="formState"
          layout="vertical"
          class="bg-white border-0 p-0"
        >
          <CompanySelection
            v-if="currentStep === 0"
            v-model:model-value="formState.company"
          />

          <OccurrenceDetails v-if="currentStep === 1" :form-state="formState" />

          <AnonymousSubmission
            v-if="currentStep === 2"
            :form-state="formState"
          />

          <Attachments v-if="currentStep === 3" :form-state="formState" />
        </a-form>

        <div class="flex justify-end gap-4 mt-8 pt-6 border-t">
          <a-button
            v-if="currentStep > 0"
            @click="prevStep"
            class="flex items-center"
          >
            <LeftOutlined />
            <span>Anterior</span>
          </a-button>
          <a-button
            v-if="currentStep < items.length - 1"
            type="primary"
            @click="nextStep"
            class="flex items-center bg-blue-600 hover:!bg-blue-700"
          >
            <span> Próximo </span>
            <RightOutlined />
          </a-button>
          <a-button
            v-if="currentStep === items.length - 1"
            type="primary"
            @click="onFinish"
            class="bg-blue-600 hover:!bg-blue-700"
          >
            {{ occurrenceId ? "Atualizar" : "Criar" }} Ocorrência
            <template #icon><CheckOutlined /></template>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, h } from "vue";
import { message } from "ant-design-vue";
import {
  LeftOutlined,
  RightOutlined,
  CheckOutlined,
  ShopOutlined,
  FormOutlined,
  UserOutlined,
  PaperClipOutlined,
} from "@ant-design/icons-vue";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import CompanySelection from "./partials/CompanySelection.vue";
import OccurrenceDetails from "./partials/OccurrenceDetails.vue";
import AnonymousSubmission from "./partials/AnonymousSubmission.vue";
import Attachments from "./partials/Attachments.vue";

defineProps({
  occurrenceId: {
    type: String,
    default: "",
  },
});

const router = useRouter();
const { api } = useApiRequests();
const { user } = useUserStore();

const currentStep = ref(0);
const formRef = ref();
const items = ref([
  {
    title: "Empresa",
    icon: h(ShopOutlined),
    status: "process",
  },
  {
    title: "Informações",
    icon: h(FormOutlined),
    status: "wait",
  },
  {
    title: "Vínculos",
    icon: h(UserOutlined),
    status: "wait",
  },
  {
    title: "Anexos",
    icon: h(PaperClipOutlined),
    status: "wait",
  },
]);

const formState = ref({} as any);

const nextStep = async () => {
  if (currentStep.value <= items.value.length - 1) {
    if (currentStep.value === 0 && !formState.value.company) {
      message.error("Empresa é obrigatório, para continuar");
      return;
    }
    await formRef.value.validate();
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value >= 0) {
    currentStep.value--;
  }
};

const onFinish = async () => {
  try {
    await formRef.value.validate();
    message.loading("Criando ocorrência...", 0);

    let address = null;

    if (formState.value.location) {
      address = {
        districtId: formState.value.district,
        street: formState.value.street,
        country: formState.value.country,
      };
    }

    const attachments =
      // @ts-ignore
      formState.value.fileList?.map((file: any) => ({
        path: file.response?.url,
        filename: file.name,
      })) || [];

    const newOccurrence = {
      title: formState.value.title,
      date: formState.value.date,
      content: formState.value.content,
      type: formState.value.type,
      isAnonymous: formState.value.isAnonymous,
      files: attachments,
      address,
      companyId: formState.value.company,
      userId: user?.id || null,
      password: formState.value.password || null,
    };

    const response = await api.post("/occurrences/register", newOccurrence);
    message.success("Ocorrência criada com sucesso!");
    router.push(`/occurrence/${response.data.id}`);
  } catch (error) {
    console.log(error);
    message.error("Erro ao criar ocorrência");
  } finally {
    message.destroy();
  }
};

watch(currentStep, (newValue) => {
  items.value = items.value.map((item, index) => ({
    ...item,
    status:
      index === newValue ? "process" : index < newValue ? "finish" : "wait",
  }));
});
</script>
