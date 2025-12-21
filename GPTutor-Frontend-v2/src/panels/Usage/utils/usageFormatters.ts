/**
 * Получает имя модели без провайдера
 */
export const getModelName = (fullModelId: string): string => {
  const parts = fullModelId.split("/");
  return parts[parts.length - 1];
};

/**
 * Форматирует дату в русском формате
 */
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Форматирует стоимость в рублях
 */
export const formatCost = (cost: number): string => {
  return cost.toFixed(6) + " ₽";
};

/**
 * Форматирует количество токенов
 */
export const formatTokens = (tokens: number): string => {
  if (tokens >= 1000000) {
    return (tokens / 1000000).toFixed(1) + "M";
  }
  if (tokens >= 1000) {
    return (tokens / 1000).toFixed(1) + "K";
  }
  return tokens.toString();
};

/**
 * Возвращает дату начала недели (7 дней назад, 00:00:00)
 */
export const getDefaultStartDate = (): Date => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  date.setHours(0, 0, 0, 0);
  return date;
};

/**
 * Возвращает текущую дату (23:59:59)
 */
export const getDefaultEndDate = (): Date => {
  const date = new Date();
  date.setHours(23, 59, 59, 999);
  return date;
};

