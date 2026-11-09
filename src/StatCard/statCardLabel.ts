import type { CardData } from "../types";

export function statCardLabel(card: CardData): string {
  const name = card.name || "Untitled";
  return card.title ? `${name}, ${card.title}` : name;
}
