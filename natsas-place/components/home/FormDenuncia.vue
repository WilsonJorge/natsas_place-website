<template>
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6 relative">
        <!-- Botão para fechar o modal -->
        <button
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          @click="closeModal"
        >
          ✕
        </button>
  
        <!-- Barra de Progresso -->
        <div class="flex flex-col items-center mb-6">
          <div class="flex items-center space-x-4">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="flex items-center space-x-2"
            >
              <div
                :class="[ 
                  'w-8 h-8 flex items-center justify-center rounded-full font-bold',
                  currentStep === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600',
                ]"
              >
                {{ index + 1 }}
              </div>
              <div v-if="index < steps.length - 1" class="w-6 border-t border-gray-300"></div>
            </div>
          </div>
          <!-- Texto abaixo da barra de progresso -->
          <h4 class="text-gray-700 text-lg font-semibold mt-4">
            Informações da Denúncia
          </h4>
        </div>
  
        <!-- Título Dinâmico -->
        <h2 class="text-xl font-bold text-gray-900 mb-4 text-center">
          {{ getStepTitle }}
        </h2>
  
        <!-- Conteúdo do Formulário -->
        <form @submit.prevent="submitForm">
          <!-- Etapa 1 -->
          <div v-if="currentStep === 1" class="space-y-6">
            <!-- Título -->
            <div>
              <label for="titulo" class="form-label">Título da Denúncia</label>
              <input
                id="titulo"
                v-model="form.titulo"
                type="text"
                required
                class="form-input"
              />
            </div>
  
            <!-- Data -->
            <div>
              <label for="data" class="form-label">Data do Ocorrido</label>
              <input
                id="data"
                v-model="form.data"
                type="date"
                required
                class="form-input"
              />
            </div>
  
            <!-- Nível -->
            <div>
              <label for="nivel" class="form-label">Nível de Urgência</label>
              <select
                id="nivel"
                v-model="form.nivel"
                required
                class="form-input"
              >
                <option value="baixo">Baixo</option>
                <option value="medio">Médio</option>
                <option value="alto">Alto</option>
                <option value="critico">Crítico</option>
              </select>
            </div>
  
            <!-- Conteúdo -->
            <div>
              <label for="conteudo" class="form-label">Descrição Detalhada</label>
              <textarea
                id="conteudo"
                v-model="form.conteudo"
                rows="4"
                required
                class="form-input"
              ></textarea>
            </div>
          </div>
  
          <!-- Etapa 2 -->
          <div v-if="currentStep === 2" class="space-y-6">
            <!-- Anônima -->
            <div class="flex items-center">
              <input
                id="anonima"
                v-model="form.anonima"
                type="checkbox"
                class="h-4 w-4 text-blue-600 rounded"
              />
              <label for="anonima" class="ml-2 text-sm text-gray-700">
                Fazer denúncia anônima
              </label>
            </div>
  
            <!-- Informações de Contato (visível apenas se não for anônima) -->
            <div v-if="!form.anonima" class="space-y-6">
              <div>
                <label for="nome" class="form-label">Nome Completo</label>
                <input
                  id="nome"
                  v-model="form.nome"
                  type="text"
                  class="form-input"
                />
              </div>
  
              <div>
                <label for="tipoContato" class="form-label">Tipo de Contacto</label>
                <select
                  id="tipoContato"
                  v-model="form.tipoContato"
                  class="form-input"
                >
                  <option value="email">E-mail</option>
                  <option value="telefone">Telefone</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>
  
              <div>
                <label for="contato" class="form-label">Contato</label>
                <input
                  id="contato"
                  v-model="form.contato"
                  type="text"
                  class="form-input"
                />
              </div>
            </div>
          </div>
  
          <!-- Etapa 3 -->
          <div v-if="currentStep === 3">
            <div>
              <label for="anexos" class="form-label">Anexos</label>
              <input
                id="anexos"
                type="file"
                multiple
                @change="handleFileUpload"
                class="form-input"
              />
            </div>
          </div>
  
          <!-- Botões -->
          <div class="flex justify-between mt-6">
            <button
              type="button"
              v-if="currentStep > 1"
              @click="prevStep"
              class="btn-secondary"
            >
              Voltar
            </button>
            <button
              type="button"
              v-if="currentStep < steps.length"
              @click="nextStep"
              class="btn-primary"
            >
              Próximo
            </button>
            <button
              type="submit"
              v-if="currentStep === steps.length"
              class="btn-primary"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  
  // Etapas do formulário
  const steps = ["Informações", "Contacto", "Anexos"];
  const currentStep = ref(1);
  const isModalOpen = ref(true); // Modal visível por padrão
  
  // Dados do formulário
  const form = ref({
    titulo: "",
    data: "",
    nivel: "baixo",
    conteudo: "",
    anonima: false,
    nome: "",
    tipoContato: "email",
    contato: "",
    anexos: [],
  });
  
  // Métodos
  const nextStep = () => {
    if (currentStep.value < steps.length) currentStep.value++;
  };
  
  const prevStep = () => {
    if (currentStep.value > 1) currentStep.value--;
  };
  
  const getStepTitle = computed(() => {
    return steps[currentStep.value - 1];
  });
  
  const handleFileUpload = (event) => {
    form.value.anexos = Array.from(event.target.files);
  };
  
  const submitForm = () => {
    console.log("Formulário enviado:", form.value);
    alert("Denúncia enviada com sucesso!");
  };
  
  // Função para fechar o modal
  const closeModal = () => {
    isModalOpen.value = false; // Fecha o modal
  };
  </script>
  
  <style scoped>
  /* Estilos */
  .form-label {
    color: #000; /* Preto */
    font-weight: 600; /* Um pouco mais forte para destaque */
    margin-bottom: 0.5rem;
    display: block; /* Garante alinhamento correto */
  }
  
  .form-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    outline: none;
    color: #000;
  }
  
  .form-input:focus {
    border-color: #3b82f6;
  }
  
  .btn-primary {
    background-color: #3b82f6;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
  }
  
  .btn-secondary {
    background-color: #f3f4f6;
    color: #374151;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
  }

  </style>
  