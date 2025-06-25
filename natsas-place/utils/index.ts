export const getType = (type: string) => {
  if (type === "NEWS") return "Notícia";
  if (type === "COMMUNICATION") return "Comunicado";
  if (type === "ANNOUNCEMENT") return "Aviso";
  return type;
};

export const getOccurrenceStatus = (status: string) => {
  const statuses = {
    OPEN: "Aberto",
    ANSWERED: "Respondido",
    IN_PROGRESS: "Em Progresso",
    SOLVED: "Resolvido",
  };
  return statuses[status as keyof typeof statuses] || status;
};

export const getOccurrenceLevel = (level: string) => {
  const levels = {
    LOW: "Baixo",
    MEDIUM: "Médio",
    HIGH: "Alto",
  };
  return levels[level as keyof typeof levels] || level;
};

export const getOccurrenceType = (type: string) => {
  const types = {
    COMPLAINT: "Reclamação",
    SUGGESTION: "Sugestão",
    DOUBT: "Dúvida",
    OTHER: "Outro",
  };
  return types[type as keyof typeof types] || type;
};

export const getStatusColor = (status: string) => {
  const colors = {
    OPEN: "blue",
    ANSWERED: "green",
    IN_PROGRESS: "purple",
  } as any;
  return colors[status] || "default";
};

export const getLevelColor = (level: string) => {
  const colors = {
    LOW: "green",
    MEDIUM: "orange",
    HIGH: "red",
  } as any;
  return colors[level] || "default";
};
