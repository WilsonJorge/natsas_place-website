<template>
  <section id="latestComplaints" class="py-20">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold mb-4">Últimas Denúncias</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Acompanhe em tempo real as últimas denúncias e seus status de
          resolução.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="complaint in latestComplaints"
          :key="complaint.id"
          class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
          <div class="p-6">
            <div class="flex items-start justify-between mb-6">
              <div class="flex items-start gap-4">
                <div
                  class="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100"
                >
                  <component
                    :is="getComplaintIcon(complaint.category)"
                    class="w-7 h-7 text-blue-600"
                  />
                </div>
                <div>
                  <span class="text-sm font-medium text-blue-600 mb-1 block">{{
                    complaint.company
                  }}</span>
                  <h3 class="text-xl font-bold text-gray-900">
                    {{ complaint.title }}
                  </h3>
                </div>
              </div>
              <span
                :class="getStatusClass(complaint.status)"
                class="px-4 py-1.5 rounded-full text-sm font-semibold inline-flex items-center gap-1.5"
              >
                <span
                  class="w-2 h-2 rounded-full"
                  :class="getStatusDotClass(complaint.status)"
                ></span>
                {{ complaint.status }}
              </span>
            </div>
            <p class="text-gray-600 mb-6 line-clamp-2">
              {{ complaint.description }}
            </p>
            <div
              class="flex items-center justify-between text-sm border-t border-gray-100 pt-4"
            >
              <div class="flex items-center gap-2 text-gray-600">
                <CalendarIcon class="w-4 h-4 text-gray-400" />
                {{ complaint.date }}
              </div>
              <div class="flex items-center gap-2 text-gray-600">
                <MapPinIcon class="w-4 h-4 text-gray-400" />
                {{ complaint.location }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  WifiIcon,
  TruckIcon,
  BanknotesIcon,
  ShoppingBagIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/vue/24/outline";

const getComplaintIcon = (category) => {
  const icons = {
    internet: WifiIcon,
    delivery: TruckIcon,
    banking: BanknotesIcon,
    retail: ShoppingBagIcon,
  };
  return icons[category];
};

const getStatusClass = (status) => {
  const classes = {
    Pendente: "bg-yellow-50 text-yellow-700",
    Resolvido: "bg-green-50 text-green-700",
    "Em Análise": "bg-blue-50 text-blue-700",
  };
  return classes[status];
};

const getStatusDotClass = (status) => {
  const classes = {
    Pendente: "bg-yellow-500",
    Resolvido: "bg-green-500",
    "Em Análise": "bg-blue-500",
  };
  return classes[status];
};

const latestComplaints = ref([
  {
    id: 1,
    title: "Instabilidade no Serviço de Internet",
    company: "Vodacom",
    category: "internet",
    status: "Pendente",
    description:
      "Interrupções frequentes no serviço de internet móvel na região central.",
    date: "03 Abril 2024",
    location: "Maputo",
  },
  {
    id: 2,
    title: "Atraso na Entrega de Produto",
    company: "Jumia",
    category: "delivery",
    status: "Resolvido",
    description: "Pedido não entregue no prazo prometido de 5 dias úteis.",
    date: "02 Abril 2024",
    location: "Beira",
  },
  {
    id: 3,
    title: "Cobrança Indevida de Taxa",
    company: "BCI",
    category: "banking",
    status: "Em Análise",
    description: "Cobrança de manutenção de conta não prevista no contrato.",
    date: "01 Abril 2024",
    location: "Nampula",
  },
  {
    id: 4,
    title: "Produto com Defeito",
    company: "Shoprite",
    category: "retail",
    status: "Resolvido",
    description: "Produto eletrônico apresentou defeito no primeiro uso.",
    date: "31 Março 2024",
    location: "Tete",
  },
]);
</script>
