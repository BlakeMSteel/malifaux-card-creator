export type Station = "Master" | "Henchman" | "Minion" | "Peon" | "";
export type ActionType = "Attack" | "Tactical";
export type Suit = "🐏" | "🦅" | "📖" | "🎭" | "💎";
export type RstValue = "Df" | "Wp" | "Sp" | "Sz" | "X" | "*" | "-";
export type BaseSize = "30mm" | "40mm" | "50mm";

export interface Ability {
  id: string;
  defensiveSymbol: string;
  name: string;
  requirement: string;
  text: string;
}

export interface Trigger {
  id: string;
  suit: Suit;
  name: string;
  requirement: string;
  effect: string;
}

export interface Action {
  id: string;
  type: ActionType;
  signature: boolean;
  name: string;
  rg: string;
  skl: string;
  rst: RstValue;
  tn: string;
  dmg: string;
  requirement: string;
  effect: string;
  triggers: Trigger[];
}

export interface AbilityGroup {
  id: string;
  uniqueOnly: boolean;
  excludePeon: boolean;
  excludeSummonToken: boolean;
  abilities: Ability[];
}

export interface ActionGroup {
  id: string;
  uniqueOnly: boolean;
  excludePeon: boolean;
  excludeSummonToken: boolean;
  actions: Action[];
}

export type TriggerActionType = "🔫" | "✨" | "🗡️" | "attack" | "all";

export interface TriggerGroup {
  id: string;
  uniqueOnly: boolean;
  excludePeon: boolean;
  excludeSummonToken: boolean;
  actionType: TriggerActionType;
  printedOnStatCard: boolean;
  trigger: Trigger;
}

export interface TerrainFeature {
  id: string;
  feature: string;
}

export interface Marker {
  id: string;
  name: string;
  size: "30mm" | "40mm" | "50mm";
  terrainFeatures: TerrainFeature[];
  effect: string;
}

export interface Token {
  id: string;
  name: string;
  effect: string;
}

export interface CrewCardData {
  name: string;
  master: string;
  keyword: string;
  faction: string;
  imageUrl: string;
  crewAbility: string;
  abilityGroups: AbilityGroup[];
  triggerGroups: TriggerGroup[];
  actionGroups: ActionGroup[];
  markers: Marker[];
  tokens: Token[];
}

export interface SavedCrewCardEntry {
  id: string;
  label: string;
  card: CrewCardData;
}

export interface UpgradeCardData {
  faction: string;
  upgradeType: string;
  name: string;
  upgradeEffect: string;
  abilities: Ability[];
  triggerActionType: TriggerActionType;
  triggerPrintedOnStatCard: boolean;
  triggers: Trigger[];
  actions: Action[];
  limitation: string;
}

export interface SavedUpgradeCardEntry {
  id: string;
  label: string;
  card: UpgradeCardData;
}

export interface SavedCardEntry {
  id: string;
  label: string;
  card: CardData;
}

export interface CardData {
  name: string;
  title: string;
  cost: string;
  df: string;
  wp: string;
  sp: string;
  sz: string;
  stn: string;
  station: Station;
  stationCount: string;
  isTotem: boolean;
  characteristics: string[];
  keyword: string;
  abilities: Ability[];
  health: number;
  masterLeftText: string;
  masterRightText: string;
  imageUrl: string;
  faction: string;
  actions: Action[];
  baseSize: BaseSize;
}
