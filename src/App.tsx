import { useState, useEffect } from 'react'
import type { CardData, SavedCardEntry } from './types'
import StatCard from './StatCard/StatCard'
import CardLibrary from './CardLibrary/CardLibrary'
import './App.css'

export const defaultCard: CardData = {
  name: 'ABOMINATION',
  cost: '4',
  df: '5',
  wp: '4',
  sp: '6',
  sz: '1',
  station: 'Minion',
  stationCount: '4',
  isTotem: false,
  characteristics: ['Construct', 'Undead'],
  keyword: 'Amalgam',
  abilities: [
    { id: '1', name: 'Resilient', text: 'Attacks targeting this model reduce raises they receive by 1 (to a minimum of 0).' },
    { id: '2', name: 'Ruthless', text: 'This model ignores the abilities of other models.' },
    { id: '3', name: 'Unmade', text: 'When this model ends its activation, enemy models within 3" with an Injured token are dealt 1 damage.' },
  ],
  health: 5,
  masterLeftText: '',
  masterRightText: '',
  imageUrl: '',
  faction: 'Outcasts',
  actions: [],
  baseSize: '30mm',
}

const SAVES_KEY = 'malifaux-saved-cards'
const LEGACY_KEY = 'malifaux-card'

function loadSavedCards(): SavedCardEntry[] {
  try {
    const legacy = localStorage.getItem(LEGACY_KEY)
    const existing = localStorage.getItem(SAVES_KEY)
    if (legacy && !existing) {
      const card = { ...defaultCard, ...JSON.parse(legacy) }
      const entry: SavedCardEntry = { id: crypto.randomUUID(), label: card.name || 'Imported', card }
      localStorage.removeItem(LEGACY_KEY)
      return [entry]
    }
    if (existing) return JSON.parse(existing)
  } catch {}
  return []
}

export default function App() {
  const [savedCards, setSavedCards] = useState<SavedCardEntry[]>(loadSavedCards)
  const [currentId, setCurrentId] = useState<string | null>(null)
  const [card, setCard] = useState<CardData>(defaultCard)

  useEffect(() => {
    localStorage.setItem(SAVES_KEY, JSON.stringify(savedCards))
  }, [savedCards])

  const handleSave = () => {
    if (currentId) {
      setSavedCards(prev => prev.map(e => e.id === currentId ? { ...e, label: card.name, card } : e))
    } else {
      const entry: SavedCardEntry = { id: crypto.randomUUID(), label: card.name, card }
      setSavedCards(prev => [...prev, entry])
      setCurrentId(entry.id)
    }
  }

  const handleNew = () => {
    setCard(defaultCard)
    setCurrentId(null)
  }

  const handleLoad = (id: string) => {
    const entry = savedCards.find(e => e.id === id)
    if (entry) {
      setCard(entry.card)
      setCurrentId(id)
    }
  }

  const handleDelete = () => {
    if (!currentId) return
    setSavedCards(prev => prev.filter(e => e.id !== currentId))
    handleNew()
  }

  return (
    <div className="app-root">
      <CardLibrary
        savedCards={savedCards}
        currentId={currentId}
        onSave={handleSave}
        onNew={handleNew}
        onLoad={handleLoad}
        onDelete={handleDelete}
      />
      <StatCard card={card} onChange={setCard} />
    </div>
  )
}
