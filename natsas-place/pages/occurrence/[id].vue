<template>
  <div class="min-h-screen bg-gray-50 pb-10">
    <!-- Password Modal -->
    <a-modal
      v-model:open="showPasswordModal"
      title="Acesso Restrito"
      :footer="null"
      @cancel="handleModalCancel"
      class="modern-modal"
    >
      <div class="space-y-4">
        <p class="text-gray-600">
          Para acessar esta ocorrência, por favor insira a senha de acesso.
        </p>
        <a-form-item>
          <a-input-password
            v-model:value="accessPassword"
            placeholder="Digite a senha de acesso"
            @keyup.enter="handlePasswordSubmit"
            class="rounded-lg"
          />
        </a-form-item>
        <div class="flex justify-end gap-2">
          <a-button @click="handleModalCancel" class="rounded-lg"
            >Cancelar</a-button
          >
          <a-button
            type="primary"
            :loading="passwordLoading"
            @click="handlePasswordSubmit"
            class="bg-primary hover:opacity-90 transition-all rounded-lg"
          >
            Acessar
          </a-button>
        </div>
      </div>
    </a-modal>

    <a-modal
      :open="showRatingModal"
      title="Avalie a resolução da ocorrência"
      :footer="null"
      @cancel="showRatingModal = false"
      class="modern-modal"
    >
      <div class="space-y-6">
        <p class="text-gray-600">
          Por favor, avalie a resolução da sua ocorrência e deixe um comentário
          opcional.
        </p>
        <div class="flex flex-col items-center mb-4">
          <vue3starRatings v-model="ratingValue"></vue3starRatings>
          <span class="text-sm text-gray-500">{{
            getRatingLabel(ratingValue)
          }}</span>
        </div>
        <a-textarea
          v-model:value="ratingComment"
          placeholder="Deixe um comentário sobre a resolução (opcional)"
          :rows="4"
          class="rounded-lg"
        />
        <div class="flex justify-end gap-2 mt-4">
          <a-button @click="showRatingModal = false" class="rounded-lg"
            >Cancelar</a-button
          >
          <a-button
            type="primary"
            :loading="ratingLoading"
            @click="submitRating"
            class="bg-primary hover:opacity-90 transition-all rounded-lg"
          >
            Enviar Avaliação
          </a-button>
        </div>
      </div>
    </a-modal>

    <!-- Status Modal -->
    <a-modal
      v-model:open="showStatusModal"
      title="Alterar Status da Ocorrência"
      :footer="null"
      @cancel="showStatusModal = false"
      class="modern-modal"
    >
      <div class="space-y-6">
        <p class="text-gray-600">
          Selecione um novo status para esta ocorrência:
        </p>
        <div class="grid grid-cols-1 gap-3">
          <a-button
            v-for="status in availableStatuses"
            :key="status.value"
            :type="selectedStatus === status.value ? 'primary' : 'default'"
            class="flex items-center justify-between p-4 h-auto hover:shadow-md transition-all rounded-lg"
            :class="
              selectedStatus === status.value
                ? 'bg-primary hover:!bg-primary/90'
                : ''
            "
            @click="selectedStatus = status.value"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-3 h-3 rounded-full"
                :style="`background-color: ${status.color}`"
              ></div>
              <span>{{ status.label }}</span>
            </div>
            <CheckOutlined v-if="selectedStatus === status.value" />
          </a-button>
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <a-button @click="showStatusModal = false" class="rounded-lg"
            >Cancelar</a-button
          >
          <a-button
            type="primary"
            :loading="statusUpdateLoading"
            @click="updateStatus"
            class="bg-primary hover:opacity-90 transition-all rounded-lg"
          >
            Atualizar Status
          </a-button>
        </div>
      </div>
    </a-modal>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <!-- Back Button -->
      <div class="mb-6">
        <a-button
          class="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors border-none !px-4 hover:bg-gray-100 rounded-full shadow-sm"
          @click="$router.back()"
        >
          <template #icon><ArrowLeftOutlined /></template>
          Voltar para Ocorrências
        </a-button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="p-8">
          <a-skeleton-input size="large" class="!w-1/3 mb-4" />
          <div class="flex items-center gap-4 mb-6">
            <a-skeleton-input size="small" class="!w-24" />
            <a-skeleton-input size="small" class="!w-24" />
          </div>
          <a-skeleton :paragraph="{ rows: 6 }" />
        </div>
      </div>

      <!-- Error State -->
      <div
        v-if="!occurrence && !loading && !showPasswordModal"
        class="bg-white rounded-xl p-8 shadow-lg text-center"
      >
        <div class="flex flex-col items-center justify-center py-10">
          <img
            src="/empty.svg"
            alt="Ocorrência não encontrada"
            class="w-64 mb-6 opacity-80"
          />
          <h2 class="text-2xl font-semibold mb-3 text-gray-800">{{ error }}</h2>
          <p class="text-gray-600 mb-5 max-w-md mx-auto">
            Não foi possível carregar os detalhes desta ocorrência.
          </p>
          <a-button
            type="primary"
            @click="$router.push('/occurrences')"
            class="bg-primary hover:opacity-90 transition-all rounded-full px-8 py-2 h-auto text-base"
          >
            Voltar para Ocorrências
          </a-button>
        </div>
      </div>

      <!-- Occurrence Details -->
      <template v-if="occurrence && !loading">
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <!-- Header -->
          <div class="p-8 border-b border-gray-100">
            <div class="flex flex-wrap justify-between items-center gap-4 mb-4">
              <!-- Title -->
              <div class="flex items-center">
                <div class="w-1.5 h-16 bg-primary rounded-full mr-4"></div>
                <Title
                  :level="2"
                  class="!mb-0 !text-2xl font-bold text-gray-800"
                >
                  {{ occurrence.title }}
                </Title>
              </div>

              <!-- Status and Reference -->
              <div class="flex flex-wrap gap-3 items-center">
                <span
                  class="text-gray-500 bg-gray-50 px-4 py-2 rounded-full text-sm font-medium flex items-center"
                >
                  <FileTextOutlined class="mr-2" />
                  {{ occurrence.reference }}
                </span>

                <!-- Status Badge -->

                <Tag
                  :color="getStatusColor(occurrence.status)"
                  class="!px-4 !py-2 !rounded-full !text-sm !font-medium !border-none cursor-pointer hover:opacity-90 transition-all shadow-sm"
                >
                  <div class="flex items-center gap-2">
                    {{ getOccurrenceStatus(occurrence.status) }}
                  </div>
                </Tag>

                <button
                  v-if="isOccurrenceCreator || isPasswordValid"
                  class="animate-slide-in gap-2 text-gray-500 bg-green-50 px-4 py-2 rounded-full text-sm font-medium flex items-center"
                  @click="openStatusModal"
                >
                  <EditOutlined />
                  Alterar Status
                </button>
              </div>
            </div>

            <!-- Metadata -->
            <div
              class="flex flex-wrap items-center text-gray-500 text-sm gap-4"
            >
              <span class="flex items-center">
                <CalendarOutlined class="mr-1.5" />
                {{ new Date(occurrence.createdAt).toLocaleDateString("pt-BR") }}
              </span>
              <span
                v-if="occurrence.user?.profile?.name"
                class="flex items-center"
              >
                <UserOutlined class="mr-1.5" />
                {{ occurrence.user?.profile?.name }}
              </span>
            </div>
          </div>

          <div class="px-8 py-6">
            <h3
              class="font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100 flex items-center"
            >
              <FileTextOutlined class="mr-2 text-primary" />
              Descrição
            </h3>
            <div
              class="whitespace-pre-line content prose max-w-none text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-xl shadow-sm"
            >
              <div v-html="occurrence.content"></div>
            </div>
          </div>

          <div
            v-if="comments.length"
            class="px-8 py-6 border-t border-gray-100"
          >
            <h3
              class="font-semibold text-gray-700 mb-6 pb-2 border-b border-gray-100 flex items-center"
            >
              <CommentOutlined class="mr-2 text-primary" />
              Respostas
            </h3>
            <div class="space-y-6">
              <div
                v-for="comment in comments"
                :key="comment.id"
                class="animate-fade-in-up bg-white rounded-xl shadow-sm overflow-hidden border"
                :class="{
                  'border-red-200': comment.isCompany,
                  'border-blue-200': !comment.isCompany,
                }"
              >
                <div
                  class="px-6 py-4 flex justify-between items-center border-b"
                  :class="{
                    'bg-red-50 border-red-100': comment.isCompany,
                    'bg-blue-50 border-blue-100': !comment.isCompany,
                  }"
                >
                  <div class="flex items-center gap-3">
                    <Tag
                      :color="comment.isCompany ? 'red' : 'blue'"
                      class="!rounded-full !px-4 !py-1 !border-none shadow-sm"
                    >
                      {{ comment.isCompany ? "Empresa" : "Usuário" }}
                    </Tag>
                    <span class="text-gray-500 text-sm">
                      {{ new Date(comment.createdAt).toLocaleString("pt-BR") }}
                    </span>
                  </div>

                  <div
                    class="flex items-center gap-2"
                    v-if="isOccurrenceCreator || isPasswordValid"
                  >
                    <a-button
                      v-if="editingCommentId !== comment.id"
                      type="link"
                      size="small"
                      :disabled="!showResponseEditor"
                      @click="handleEditComment(comment)"
                      class="flex items-center hover:text-blue-500"
                    >
                      <template #icon><EditOutlined /></template>
                      Editar
                    </a-button>
                    <Popconfirm
                      title="Tem certeza que deseja excluir este comentário?"
                      @confirm="handleDeleteComment(comment.id)"
                      okText="Sim"
                      :okButtonProps="{
                        loading: commentDeleteLoading,
                        type: 'primary',
                        color: 'blue',
                        class:
                          'px-5 text-white py-1 rounded-full bg-red-500 hover:!bg-red-500/80',
                      }"
                      cancelText="Não"
                      :disabled="!showResponseEditor"
                    >
                      <a-button
                        :disabled="!showResponseEditor"
                        type="link"
                        size="small"
                        danger
                        class="flex items-center hover:text-red-500"
                      >
                        <template #icon><DeleteOutlined /></template>
                        Excluir
                      </a-button>
                    </Popconfirm>
                  </div>
                </div>

                <div
                  class="p-6 content whitespace-pre-line"
                  v-html="comment.content"
                ></div>
              </div>
            </div>
          </div>

          <!-- Response Section -->
          <div
            v-if="isOccurrenceCreator || isPasswordValid"
            class="px-8 py-6 border-t border-gray-100"
          >
            <h3
              class="font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100 flex items-center"
            >
              <SendOutlined class="mr-2 text-primary" />
              Resposta
            </h3>
            <template v-if="showResponseEditor">
              <client-only>
                <div class="bg-gray-50 p-6 rounded-xl shadow-sm">
                  <QuillEditor
                    v-model:content="responseContent"
                    contentType="html"
                    theme="snow"
                    :key="editingCommentId"
                    toolbar="essential"
                    placeholder="Digite sua resposta aqui..."
                    class="bg-white rounded-lg shadow-sm"
                  />
                  <div class="flex justify-between mt-6">
                    <a-checkbox
                      v-model:checked="isPrivateResponse"
                      class="text-gray-700"
                    >
                      Resposta Privada
                    </a-checkbox>
                    <div class="flex gap-3">
                      <a-button
                        v-if="editingCommentId"
                        @click="
                          () => {
                            editingCommentId = '';
                            responseContent = '';
                            isPrivateResponse = false;
                          }
                        "
                        class="border border-gray-200 rounded-full"
                      >
                        Cancelar
                      </a-button>
                      <a-button
                        type="primary"
                        :loading="submitLoading"
                        @click="handleSubmitResponse"
                        class="bg-primary hover:!bg-primary/90 rounded-full"
                      >
                        {{ editingCommentId ? "Atualizar" : "Enviar" }} Resposta
                      </a-button>
                    </div>
                  </div>
                </div>
              </client-only>
            </template>
            <template v-else>
              <div
                class="flex flex-col items-center justify-center py-10 text-gray-500 italic bg-gray-50 rounded-xl shadow-sm"
              >
                <CheckCircleFilled class="text-3xl text-green-500 mb-4" />
                <p class="max-w-md text-center">
                  Esta ocorrência não requer resposta ou já foi finalizada.
                </p>
              </div>
            </template>
          </div>
        </div>
      </template>

      <!-- Password Access Button -->
      <div
        v-if="
          occurrence?.password &&
          !loading &&
          !isPasswordValid &&
          !isOccurrenceCreator
        "
        class="mt-6 flex justify-center"
      >
        <a-button
          type="primary"
          @click="showPasswordModal = true"
          class="bg-primary hover:opacity-90 transition-all rounded-full px-6 py-1 h-auto flex items-center gap-2"
        >
          <LockOutlined />
          Solicitar Acesso Completo
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useApiRequests } from "@/composables/useAxios";
import { message, Popconfirm } from "ant-design-vue";
import { Tag, Typography } from "ant-design-vue";
import vue3starRatings from "vue3-star-ratings";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  LockOutlined,
  FileTextOutlined,
  CalendarOutlined,
  UserOutlined,
  SendOutlined,
  CommentOutlined,
  CheckCircleFilled,
  DownOutlined,
  CheckOutlined,
} from "@ant-design/icons-vue";
import { useUserStore } from "@/stores/userStore";
import { getOccurrenceStatus, getStatusColor } from "@/utils";

const route = useRoute();
const router = useRouter();
const { api } = useApiRequests();
const { user } = useUserStore();
const { Title } = Typography;

const occurrence = ref<any>(null);
const loading = ref(true);
const error = ref("");
const responseContent = ref("");
const comments = ref([] as any);
const submitLoading = ref(false);
const editingCommentId = ref("");
const commentDeleteLoading = ref(false);
const showPasswordModal = ref(false);
const accessPassword = ref("");
const passwordLoading = ref(false);
const isPasswordValid = ref(false);
const isPrivateResponse = ref(false);

const showRatingModal = ref(false);
const ratingValue = ref(5);
const ratingComment = ref("");
const ratingLoading = ref(false);

const showStatusModal = ref(false);
const selectedStatus = ref("");
const statusUpdateLoading = ref(false);
const availableStatuses = ref([
  { value: "SOLVED", label: "Resolvido", color: "#52c41a" },
  { value: "CANCELED", label: "Cancelado", color: "#ff4d4f" },
  { value: "NOT_SOLVED", label: "Não resolvido", color: "#faad14" },
]);

const handleGetOccurrence = async () => {
  loading.value = true;
  error.value = "";

  try {
    const response = await api.get(`/occurrences/${route.params.id}`);
    occurrence.value = response.data;
  } catch (error: any) {
    console.log(error);
    message.error(
      error?.response?.data?.message || "Erro ao buscar detalhes da ocorrência"
    );
  } finally {
    loading.value = false;
  }
};

const handleStatusChange = async (newStatus: string) => {
  try {
    await api.patch(`/occurrences/${route.params.id}/status/${newStatus}`);
    occurrence.value.status = newStatus;
    message.success("Status atualizado com sucesso");
  } catch (error) {
    message.error("Erro ao atualizar o status");
  }
};

const showResponseEditor = computed(() => {
  return occurrence.value.status !== "SOLVED";
});

const fetchComments = async () => {
  try {
    const response = await api.get(`/comments/occurrence/${route.params.id}`);
    comments.value = response.data;
  } catch (error) {
    message.error("Erro ao carregar comentários");
  }
};

const handleSubmitResponse = async () => {
  if (!responseContent.value.trim()) {
    message.warning("Por favor, insira uma resposta");
    return;
  }

  if (editingCommentId.value) {
    await handleEditCommentSubmit();
    return;
  }

  submitLoading.value = true;
  try {
    await api.post(`/comments`, {
      content: responseContent.value,
      userId: user?.id || null,
      isUser: true,
      isCompany: false,
      isPrivate: isPrivateResponse.value,
      occurrenceId: route.params.id,
    });

    message.success("Resposta enviada com sucesso");
    responseContent.value = "";
    editingCommentId.value = "";
    isPrivateResponse.value = false;

    await fetchComments();
  } catch (error) {
    message.error("Erro ao enviar resposta");
  } finally {
    submitLoading.value = false;
  }
};

const handleEditComment = (comment: any) => {
  editingCommentId.value = comment.id;
  responseContent.value = comment.content;
  isPrivateResponse.value = comment.isPrivate;
};

const handleDeleteComment = async (commentId: number) => {
  commentDeleteLoading.value = true;
  try {
    await api.delete(`/comments/${commentId}`);
    message.success("Comentário excluído com sucesso");
    await fetchComments();
  } catch (error) {
    message.error("Erro ao excluir comentário");
  } finally {
    commentDeleteLoading.value = false;
  }
};

const handleEditCommentSubmit = async () => {
  // @ts-ignore
  if (!responseContent.value.replace(/<[^>]*>?/g, "").trim().length > 0) {
    message.warning("O comentário não pode estar vazio");
    return;
  }

  submitLoading.value = true;

  try {
    await api.put(`/comments/${editingCommentId.value}`, {
      content: responseContent.value,
      isPrivate: isPrivateResponse.value,
    });
    message.success("Comentário atualizado com sucesso");
    editingCommentId.value = "";
    responseContent.value = "";
    isPrivateResponse.value = false;
    await fetchComments();
  } catch (error) {
    message.error("Erro ao atualizar comentário");
  } finally {
    submitLoading.value = false;
  }
};

const isOccurrenceCreator = computed(() => {
  return occurrence.value?.userId === user?.id;
});

const handlePasswordSubmit = async () => {
  if (!accessPassword.value) {
    message.error("Por favor, insira a senha");
    return;
  }

  passwordLoading.value = true;

  try {
    await api.post(`/occurrences/verify-password`, {
      password: accessPassword.value,
      id: route.params.id,
    });

    isPasswordValid.value = true;
    showPasswordModal.value = false;
    await handleGetOccurrence();
  } catch (error: any) {
    message.error(error?.response?.data?.message || "Senha inválida");
  } finally {
    passwordLoading.value = false;
    accessPassword.value = "";
  }
};

const handleModalCancel = () => {
  showPasswordModal.value = false;
  accessPassword.value = "";
  if (!occurrence.value) {
    router.back();
  }
};

// Helper function to get rating label
const getRatingLabel = (rating: number) => {
  if (rating <= 1) return "Insatisfeito";
  if (rating <= 2) return "Pouco satisfeito";
  if (rating <= 3) return "Neutro";
  if (rating <= 4) return "Satisfeito";
  return "Muito satisfeito";
};

const openStatusModal = () => {
  selectedStatus.value = occurrence.value.status;
  showStatusModal.value = true;
};

const updateStatus = async () => {
  if (
    !selectedStatus.value ||
    selectedStatus.value === occurrence.value.status
  ) {
    showStatusModal.value = false;
    return;
  }

  statusUpdateLoading.value = true;

  try {
    await handleStatusChange(selectedStatus.value);
    showStatusModal.value = false;

    // If changing to solved, open rating modal
    if (
      selectedStatus.value === "SOLVED" ||
      selectedStatus.value === "NOT_SOLVED"
    ) {
      showRatingModal.value = true;
    }
  } catch (error) {
    console.error(error);
  } finally {
    statusUpdateLoading.value = false;
  }
};

const submitRating = async () => {
  if (ratingValue.value < 1) {
    message.warning("Por favor, selecione pelo menos 1 estrela");
    return;
  }

  ratingLoading.value = true;

  try {
    // Submit the rating
    await api.post(`/ratings`, {
      rating: ratingValue.value,
      comment: ratingComment.value,
      companyId: occurrence.value.companyId,
    });

    showRatingModal.value = false;

    // Refresh occurrence data
    await handleGetOccurrence();
  } catch (error) {
    message.error("Erro ao enviar avaliação");
  } finally {
    ratingLoading.value = false;
  }
};

onMounted(() => {
  handleGetOccurrence();
  fetchComments();
});
</script>

<style scoped>
/* Modern Design Styles */
:deep(.ql-container) {
  min-height: 150px;
  border-bottom-left-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
  background: #ffffff;
}

:deep(.ql-toolbar) {
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
  border-color: #f0f0f0;
}

/* Enhanced content styling */
.content {
  color: #374151;
  line-height: 1.7;
}

/* Modern modals */
.modern-modal :deep(.ant-modal-content) {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}

.modern-modal :deep(.ant-modal-header) {
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  padding: 16px 24px;
}

.modern-modal :deep(.ant-modal-body) {
  padding: 24px;
}

/* Container styling */
.container {
  max-width: 1200px;
}

/* Card hover effects */
.bg-white {
  transition: all 0.3s ease;
}

/* Button styling */
:deep(.ant-btn) {
  font-weight: 500;
  height: auto;
  padding-top: 6px;
  padding-bottom: 6px;
  transition: all 0.2s ease;
}

:deep(.ant-btn-primary) {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.4s ease-out;
}

.animate-slide-in {
  animation: slideIn 0.2s ease-out;
}

/* Background gradient for page */
.min-h-screen {
  background: linear-gradient(to bottom, #f9fafb, #f3f4f6);
}
</style>
