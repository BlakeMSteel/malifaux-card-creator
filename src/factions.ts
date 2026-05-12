export interface Faction {
  name: string;
  letter: string;
  color: string;
}

export const FACTIONS: Faction[] = [
  { name: "Arcanists", letter: "A", color: "#1a4f8c" },
  { name: "Bayou", letter: "B", color: "#5c3317" },
  { name: "Explorers", letter: "E", color: "#0d5e5e" },
  { name: "Guild", letter: "G", color: "#8b1515" },
  { name: "Neverborn", letter: "N", color: "#5c1a8b" },
  { name: "Outcasts", letter: "O", color: "#a57f1c" },
  { name: "Resurrectionist", letter: "R", color: "#1a6b1a" },
  { name: "Ten Thunders", letter: "T", color: "#c96925" },
];

export const NO_FACTION: Faction = { name: "", letter: "", color: "#3a3a3a" };

export function getFaction(name: string): Faction {
  return FACTIONS.find((f) => f.name === name) ?? NO_FACTION;
}
