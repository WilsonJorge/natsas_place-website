### Step 3 Component: `AnonymousSubmission.vue` ```vue
<template>
  <div>
    <template v-if="user?.id">
      <a-form-item label="Submeter Anonimamente">
        <a-switch v-model:checked="formState.isAnonymous" />
      </a-form-item>

      <template v-if="formState.isAnonymous">
        <a-alert
          message="Submissão Anônima"
          description="Sua ocorrência será registrada anonimamente. Você receberá notificações e poderá acompanhar o status da ocorrência através da sua conta, mas a empresa não terá acesso aos seus dados pessoais."
          type="info"
          showIcon
          class="mt-10"
        />
      </template>
      <template v-else>
        <a-alert
          message="Dados do Usuário"
          description="Esta ocorrência será registrada com seus dados de usuário. A empresa terá acesso aos seus dados pessoais como nome, email e endereço (caso fornecidos)."
          type="info"
          showIcon
          class="mt-10"
        />
      </template>
    </template>

    <template v-else>
      <a-alert
        message="Usuário não autenticado"
        description="Você não está logado. Sua ocorrência será registrada anonimamente e você precisará de uma senha para acompanhá-la posteriormente."
        type="warning"
        showIcon
        class="mb-6"
      />
      <a-form-item
        label="Senha"
        name="password"
        :rules="[
          {
            required: true,
            message: 'Por favor, insira uma senha',
          },
        ]"
      >
        <a-input-password
          v-model:value="formState.password"
          placeholder="Digite uma senha para ocorrência"
          class="md:max-w-xs"
        />
      </a-form-item>
      <a-alert
        message="Acompanhamento"
        description="Esta senha será necessária para acompanhar o status da sua ocorrência posteriormente"
        type="info"
        showIcon
        class="mt-10"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import { useUserStore } from "@/stores/userStore";
const { user } = useUserStore();

defineProps({
  formState: {
    type: Object,
    required: true,
  },
});
</script>
