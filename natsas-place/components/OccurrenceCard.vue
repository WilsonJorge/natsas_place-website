<template>
  <a-card
    class="occurrence-card"
    :bordered="false"
    :data-type="occurrence.type"
  >
    <template #title>
      <div class="card-header">
        <div class="title-wrapper">
          <component
            :is="getTypeIcon(occurrence.type)"
            class="type-icon"
            :class="getTypeIconColor(occurrence.type)"
          />
          <span class="card-title">{{ occurrence.title }}</span>
          <a-tag :color="getTypeColor(occurrence.type)" class="type-tag">
            {{ getTypeLabel(occurrence.type) }}
          </a-tag>
        </div>
        <div class="tags-wrapper">
          <a-tag :color="getStatusColor(occurrence.status)" class="status-tag">
            {{ getStatusLabel(occurrence.status) }}
          </a-tag>
          <a-tag :color="getLevelColor(occurrence.level)" class="level-tag">
            {{ getLevelLabel(occurrence.level) }}
          </a-tag>
        </div>
      </div>
    </template>

    <a-typography-paragraph
      v-html="occurrence.content.substring(0, 300) + '...'"
      :ellipsis="{ rows: 3, expandable: true, symbol: 'mais' }"
      class="card-content"
    />

    <a-divider class="card-divider" />

    <div class="card-footer">
      <div class="card-info">
        <a-typography-text class="reference">
          <number-outlined /> Ref: {{ occurrence.reference }}
        </a-typography-text>
        <a-typography-text class="date">
          <calendar-outlined /> {{ formatDate(occurrence.date) }}
        </a-typography-text>
      </div>

      <a-button
        type="primary"
        @click="handleViewDetails"
        class="details-button"
      >
        Ver detalhes
        <right-outlined />
      </a-button>
    </div>
  </a-card>
</template>

<script>
import {
  CalendarOutlined,
  UserOutlined,
  NumberOutlined,
  RightOutlined,
  MessageOutlined,
  AlertOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons-vue";

export default {
  name: "OccurrenceCard",

  components: {
    CalendarOutlined,
    UserOutlined,
    NumberOutlined,
    RightOutlined,
    MessageOutlined,
    AlertOutlined,
    QuestionCircleOutlined,
  },

  props: {
    occurrence: {
      type: Object,
      required: true,
      validator: (obj) => {
        return [
          "title",
          "date",
          "content",
          "reference",
          "type",
          "level",
          "status",
          "isAnonymous",
        ].every((prop) => prop in obj);
      },
    },
  },

  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },

    getTypeIcon(type) {
      const icons = {
        COMPLAINT: MessageOutlined,
        DENUNCIATION: AlertOutlined,
        REQUEST: QuestionCircleOutlined,
      };
      return icons[type] || QuestionCircleOutlined;
    },
    getTypeColor(type) {
      const colors = {
        COMPLAINT: "success",
        DENUNCIATION: "error",
        REQUEST: "processing",
      };
      return colors[type] || "default";
    },
    getTypeLabel(type) {
      const labels = {
        COMPLAINT: "Reclamação",
        DENUNCIATION: "Denúncia",
        REQUEST: "Solicitação",
      };
      return labels[type] || "Desconhecido";
    },

    getStatusColor(status) {
      const colors = {
        OPEN: "success",
        IN_PROGRESS: "processing",
        ANSWERED: "warning",
        CLOSED: "default",
        NOT_SOLVED: "error",
      };
      return colors[status] || "default";
    },

    getStatusLabel(status) {
      const labels = {
        OPEN: "Aberto",
        IN_PROGRESS: "Em Andamento",
        ANSWERED: "Respondido",
        NOT_SOLVED: "Não Resolvido",
      };
      return labels[status] || "Desconhecido";
    },

    getLevelColor(level) {
      const colors = {
        LOW: "success",
        MEDIUM: "processing",
        HIGH: "error",
      };
      return colors[level] || "default";
    },

    getLevelLabel(level) {
      const labels = {
        LOW: "Baixa",
        MEDIUM: "Média",
        HIGH: "Alta",
      };
      return labels[level] || "Desconhecido";
    },

    handleViewDetails() {
      this.$router.push(`/occurrence/${this.occurrence.id}`);
    },

    getTypeIconColor(type) {
      const colors = {
        COMPLAINT: "text-green-500",
        DENUNCIATION: "text-red-500",
        REQUEST: "text-blue-500",
      };
      return colors[type] || "";
    },
  },
};
</script>

<style scoped>
.occurrence-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  margin-bottom: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.title-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.card-title {
  font-weight: 600;
  font-size: 16px;
  color: #333;
}

.type-icon {
  font-size: 18px;
}

.type-tag,
.status-tag,
.level-tag {
  border-radius: 4px;
  font-size: 12px;
  padding: 0 8px;
  font-weight: 500;
}

.tags-wrapper {
  display: flex;
  gap: 8px;
}

.card-content {
  margin: 16px 0;
  color: #555;
  line-height: 1.6;
}

.card-divider {
  margin: 12px 0;
  opacity: 0.6;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.card-info {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.reference,
.date {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  font-size: 13px;
}

.details-button {
  font-size: 14px;
  height: 32px;
  border-radius: 4px;
}

@media (max-width: 600px) {
  .card-header,
  .card-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .tags-wrapper {
    margin-top: 8px;
  }

  .details-button {
    align-self: flex-end;
    margin-top: 8px;
  }
}
</style>
