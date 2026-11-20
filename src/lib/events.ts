// Pequeno barramento de eventos para que o carrossel aplique filtros na grade de projetos.
export const FILTER_EVENT = "portfolio:filter";

export function requestProjectFilter(filter: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(FILTER_EVENT, { detail: filter }));
}
