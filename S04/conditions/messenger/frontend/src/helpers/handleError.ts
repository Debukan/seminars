export function handleError(error: unknown): string {
  if (error instanceof SyntaxError) return "Сервер вернул пустой ответ или некорректный JSON.";
  if (error instanceof TypeError) return "Не удалось связаться с сервером. Проверьте подключение.";
  if (typeof error === "string") return error;
  if (!error) return "Unknown error";

  const anyError = error as any;
  if (anyError.response?.data?.message) {
    return anyError.response.data.message as string;
  }

  if (anyError.message) {
    return anyError.message as string;
  }

  return "Request failed";
}
