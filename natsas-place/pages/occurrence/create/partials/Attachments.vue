<template>
  <a-upload
    :file-list="formState.fileList"
    @update:file-list="(val) => (formState.fileList = val)"
    :multiple="true"
    :custom-request="handleUpload"
    list-type="picture-card"
  >
    <div v-if="!uploading">
      <plus-outlined />
      <div class="ant-upload-text">Upload</div>
    </div>
    <template v-else>
      <loading-outlined />
      <div class="ant-upload-text">Uploading</div>
    </template>
  </a-upload>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps({
  formState: {
    type: Object,
    required: true,
  },
});

const { api } = useApiRequests();
const uploading = ref(false);

const handleUpload = async ({ file, onSuccess, onError }: any) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post("/attachments/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    onSuccess(response.data);
  } catch (error) {
    onError(error);
  }
};
</script>
