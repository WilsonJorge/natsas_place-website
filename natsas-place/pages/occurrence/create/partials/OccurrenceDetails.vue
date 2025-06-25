### Step 2 Component: `OccurrenceDetails.vue` ```vue
<template>
  <div>
    <a-form-item
      label="Título da Ocorrência"
      name="title"
      :rules="[{ required: true, message: 'Por favor, insira um título' }]"
    >
      <a-input v-model:value="formState.title" />
    </a-form-item>

    <div class="grid md:grid-cols-2 gap-4">
      <a-form-item
        label="Data da Ocorrência"
        name="date"
        :rules="[{ required: true, message: 'Por favor, selecione uma data' }]"
      >
        <a-date-picker
          v-model:value="formState.date"
          class="w-full"
          :disabled-date="
            (currentDate) => currentDate && currentDate > dayjs().endOf('day')
          "
        />
      </a-form-item>

      <a-form-item
        label="Categoria"
        name="type"
        :rules="[
          {
            required: true,
            message: 'Por favor, selecione uma categoria',
          },
        ]"
      >
        <a-select v-model:value="formState.type">
          <a-select-option value="COMPLAINT">Reclamação</a-select-option>
          <a-select-option value="DENUNCIATION">Denúncia</a-select-option>
          <a-select-option value="REQUEST">P. informação</a-select-option>
        </a-select>
      </a-form-item>
    </div>

    <a-form-item
      label="Descrição Detalhada"
      name="content"
      :rules="[
        {
          required: true,
          message: 'Por favor, forneça uma descrição',
        },
      ]"
    >
      <ClientOnly>
        <QuillEditor
          contentType="html"
          v-model:content="formState.content"
          theme="snow"
          toolbar="min"
          placeholder="Digite sua resposta aqui..."
        />
      </ClientOnly>
    </a-form-item>

    <a-divider>Dados da Localização</a-divider>
    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-item
          label="Província"
          name="province"
          :rules="[
            {
              required: true,
              message: 'Província é obrigatória',
            },
          ]"
        >
          <a-select
            v-model:value="formState.province"
            placeholder="Selecione uma província"
            show-search
            :options="provinces"
            @change="handleGetDistrict"
          >
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Distrito"
          name="district"
          :rules="[{ required: true, message: 'Distrito é obrigatório' }]"
        >
          <a-select
            v-model:value="formState.district"
            placeholder="Selecione um distrito"
            show-search
            :options="districts"
          >
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-item
          label="Rua/Avenida"
          name="street"
          :rules="[
            {
              required: true,
              message: 'Rua/Avenida é obrigatória',
            },
          ]"
        >
          <a-input v-model:value="formState.street" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="País" name="country">
          <a-input v-model:value="formState.country" :disabled="true" />
        </a-form-item>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import dayjs from "dayjs";

defineProps({
  formState: {
    type: Object,
    required: true,
  },
});

const { api } = useApiRequests();

const provinces = ref([]);
const districts = ref([]);

const handleGetProvince = async () => {
  try {
    const response = await api.get("/provinces");
    provinces.value = response.data.map((province: any) => ({
      label: province.name,
      value: province.id,
    }));
  } catch (error) {
    message.error("Erro ao buscar províncias");
  }
};

const handleGetDistrict = async (value: any) => {
  try {
    const response = await api.get(`/provinces/${value}/districts`);
    districts.value = response.data.map((district: any) => ({
      label: district.name,
      value: district.id,
    }));
    console.log(districts.value);
  } catch (error) {
    console.log(error);
    message.error("Erro ao buscar distritos");
  }
};

onMounted(() => {
  handleGetProvince();
});
</script>

<style scoped>
:deep(.ant-steps-item-title) {
  font-weight: 500;
}

:deep(.ql-container) {
  min-height: 200px;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

:deep(.ql-toolbar) {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

:deep(.ant-form-item) {
  margin-bottom: 1.5rem;
}

:deep(.ant-input),
:deep(.ant-select-selector),
:deep(.ant-picker) {
  border-radius: 0.5rem;
}
</style>
