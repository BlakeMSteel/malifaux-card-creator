export type Station = 'Master' | 'Henchman' | 'Minion' | 'Peon' | ''
export type ActionType = 'Attack' | 'Tactical'
export type Suit = '🐏' | '🪶' | '📖' | '🎭' | '💎'
export type RstValue = 'Df' | 'Wp' | 'Sp' | 'Sz' | 'X' | '*' | '-'
export type BaseSize = '30mm' | '40mm' | '50mm'

export interface Ability {
  id: string
  name: string
  text: string
}

export interface Trigger {
  id: string
  suit: Suit
  name: string
  requirement: string
  effect: string
}

export interface Action {
  id: string
  type: ActionType
  signature: boolean
  name: string
  rg: string
  skl: string
  rst: RstValue
  tn: string
  dmg: string
  requirement: string
  effect: string
  triggers: Trigger[]
}

export interface CardData {
  name: string
  cost: string
  df: string
  wp: string
  sp: string
  sz: string
  station: Station
  stationCount: string
  isTotem: boolean
  characteristics: string[]
  keyword: string
  abilities: Ability[]
  health: number
  masterLeftText: string
  masterRightText: string
  imageUrl: string
  faction: string
  actions: Action[]
  baseSize: BaseSize
}
