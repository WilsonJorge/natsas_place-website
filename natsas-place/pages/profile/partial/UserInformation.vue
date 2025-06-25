<template>
  <div class="space-y-8">
    <div class="bg-white rounded-xl border p-8">
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div class="relative">
          <a-avatar
            :src="user?.profile?.photo"
            :size="96"
            class="border-4 !rounded-xl border-gray-50"
          >
            {{ user.username?.substring(0, 2) }}
          </a-avatar>
          <a-button
            type="primary"
            class="absolute bottom-1 right-1 flex justify-center items-center"
            size="small"
          >
            <template #icon><EditFilled /></template>
          </a-button>
        </div>

        <div class="flex-1">
          <h3 class="text-2xl font-bold text-gray-900">
            @{{ user?.username || user?.profile?.name }}
          </h3>
          <p class="text-gray-500">
            {{ user?.profile?.email || "Sem email" }}
          </p>
          <p class="text-gray-500">
            {{ user?.profile?.phone || "Sem telefone" }}
          </p>
        </div>
      </div>
    </div>

    <!-- Add Tab Container -->
    <div class="bg-white rounded-xl border p-8">
      <a-tabs v-model:activeKey="activeTab">
        <!-- Personal Information Tab -->
        <a-tab-pane key="personal" tab="Personal Information">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-900">
              Informações pessoais
            </h2>
            <a-button
              type="primary"
              @click="
                () => {
                  isEditingPersonal
                    ? updatePersonalInformation()
                    : (isEditingPersonal = true);
                }
              "
            >
              {{ isEditingPersonal ? "Salvar" : "Editar" }}
            </a-button>
          </div>

          <a-form :model="userData" layout="vertical">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-3">
              <a-form-item label="Nome completo">
                <a-input
                  v-model:value="userData.name"
                  :disabled="!isEditingPersonal"
                  :placeholder="userData.name || 'Nome completo'"
                />
              </a-form-item>

              <a-form-item label="Email">
                <a-input
                  v-model:value="userData.email"
                  :disabled="!isEditingPersonal"
                  :placeholder="userData.email || 'Email'"
                />
              </a-form-item>
              <a-form-item label="Telefone">
                <a-input
                  v-model:value="userData.phone"
                  :disabled="!isEditingPersonal"
                  :placeholder="userData.phone || 'Telefone'"
                />
              </a-form-item>
            </div>
          </a-form>
        </a-tab-pane>

        <!-- Address Tab -->
        <a-tab-pane key="address" tab="Endereço">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-900">Endereço</h2>
            <a-button
              type="primary"
              @click="
                () => {
                  isEditingAddress
                    ? updateAddressInformation()
                    : (isEditingAddress = true);
                }
              "
            >
              {{ isEditingAddress ? "Salvar" : "Editar" }}
            </a-button>
          </div>

          <a-form :model="userData" layout="vertical">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-3">
              <a-form-item label="Província">
                <a-select
                  v-model:value="userData.province"
                  :disabled="!isEditingAddress"
                  :options="provinceOptions"
                  :placeholder="userData.province || 'Província'"
                />
              </a-form-item>
              <a-form-item label="Distrito">
                <a-select
                  v-model:value="userData.district"
                  :disabled="!isEditingAddress"
                  :options="districtOptions"
                  :placeholder="userData.district || 'Distrito'"
                />
              </a-form-item>
              <a-form-item label="Endereço">
                <a-input
                  v-model:value="userData.street"
                  :disabled="!isEditingAddress"
                  :placeholder="userData.street || 'Endereço'"
                />
              </a-form-item>
            </div>
          </a-form>
        </a-tab-pane>

        <!-- Security Tab -->
        <a-tab-pane key="security" tab="Security">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-900">Security</h2>
            <a-button
              type="primary"
              @click="
                () => {
                  isEditingSecurity
                    ? updateSecurityInformation()
                    : (isEditingSecurity = true);
                }
              "
            >
              {{ isEditingSecurity ? "Salvar" : "Editar" }}
            </a-button>
          </div>

          <a-form :model="securityData" layout="vertical">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-3">
              <a-form-item label="Palavra-passe atual">
                <a-input-password
                  v-model:value="securityData.currentPassword"
                  :disabled="!isEditingSecurity"
                  placeholder="Palavra-passe atual"
                />
              </a-form-item>
              <div class="md:col-span-2 h-4" />
              <!-- Espaçador -->
              <a-form-item label="Nova palavra-passe">
                <a-input-password
                  v-model:value="securityData.newPassword"
                  :disabled="!isEditingSecurity"
                  placeholder="Nova palavra-passe"
                />
              </a-form-item>
              <a-form-item label="Confirmar nova palavra-passe">
                <a-input-password
                  v-model:value="securityData.confirmPassword"
                  :disabled="!isEditingSecurity"
                  placeholder="Confirmar nova palavra-passe"
                />
              </a-form-item>
            </div>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApiRequests } from "@/composables/useAxios";
import { useUserStore } from "@/stores/userStore";

const props = defineProps<{
  user: any;
}>();

const { user } = props;
const { setUser } = useUserStore();
const { api } = useApiRequests();

const isEditingPersonal = ref(false);
const isEditingAddress = ref(false);
const isEditingSecurity = ref(false);
const activeTab = ref("personal");
const isSubmitting = ref(false);

const userData = ref({
  name: user?.profile?.name || "",
  avatar: user?.profile?.photo || "",
  email: user?.profile?.email || "",
  phone: user?.profile?.phone || "",
  province: user?.address?.provinceId || "",
  district: user?.address?.districtId || "",
  street: user?.address?.street || "",
});

const securityData = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const provinceOptions = ref([]);
const districtOptions = ref([]);

const fetchProvinces = async () => {
  try {
    const provinces = await api.get("/provinces");
    provinceOptions.value = provinces.data.map((province: any) => ({
      label: province.name,
      value: province.id,
    }));
  } catch (error) {
    console.error(error);
  }
};

const fetchDistricts = async () => {
  try {
    const districts = await api.get(
      `/provinces/${userData.value.province}/districts`
    );
    districtOptions.value = districts.data.map((district: any) => ({
      label: district.name,
      value: district.id,
    }));
  } catch (error) {
    console.error(error);
  }
};

const updatePersonalInformation = async () => {
  isSubmitting.value = true;
  try {
    const { data } = await api.put(`/users/${user.id}`, {
      name: userData.value.name,
      email: userData.value.email,
      phone: userData.value.phone,
    });

    userData.value = {} as any;
    message.success("Informações pessoais atualizadas com sucesso");
    isEditingPersonal.value = false;
    setUser(data as any);
    window.location.reload();
  } catch (error) {
    message.error("Erro ao atualizar informações pessoais");
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
};

const updateAddressInformation = async () => {
  isSubmitting.value = true;
  try {
    const { data } = await api.put(`/users/${user.id}`, {
      district: userData.value.district,
      street: userData.value.street,
    });
    userData.value = {} as any;
    message.success("Endereço atualizado com sucesso");
    isEditingAddress.value = false;
    setUser(data as any);
    window.location.reload();
  } catch (error) {
    message.error("Erro ao atualizar informações de endereço");
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
};

const updateSecurityInformation = async () => {
  isSubmitting.value = true;
  try {
    await api.put(`/users/${user.id}`, {
      currentPassword: securityData.value.currentPassword,
      newPassword: securityData.value.newPassword,
    });
    message.success("Palavra-passe atualizada com sucesso");
    securityData.value = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    isEditingSecurity.value = false;
    window.location.reload();
  } catch (error) {
    message.error("Erro ao atualizar informações de segurança");
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
};

const updatePassword = async () => {
  if (securityData.value.newPassword !== securityData.value.confirmPassword) {
    message.error("As palavras-passe não correspondem");
    return;
  }

  try {
    await api.post(`/users/${user.id}`, {
      currentPassword: securityData.value.currentPassword,
      newPassword: securityData.value.newPassword,
    });

    message.success("Palavra-passe atualizada com sucesso");
    isEditingSecurity.value = false;
    securityData.value = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    window.location.reload();
  } catch (error) {
    message.error("Erro ao atualizar palavra-passe");
    console.error(error);
  }
};

watch(isEditingSecurity, (newValue, oldValue) => {
  if (
    oldValue === true &&
    newValue === false &&
    securityData.value.currentPassword
  ) {
    updatePassword();
  }
});

watch(
  () => userData.value.province,
  () => {
    fetchDistricts();
  }
);

onMounted(() => {
  fetchProvinces();
});
</script>
