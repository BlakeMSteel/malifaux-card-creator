import { useState, useEffect } from 'react'
import type { CardData, SavedCardEntry, CrewCardData, SavedCrewCardEntry } from './types'
import StatCard from './StatCard/StatCard'
import CrewCard from './CrewCard/CrewCard'
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

const defaultCrewCard: CrewCardData = {
  name: '',
  master: '',
  keyword: '',
  faction: '',
  imageUrl: '',
  abilityGroups: [],
  actionGroups: [],
}

const SAVES_KEY = 'malifaux-saved-cards'
const LEGACY_KEY = 'malifaux-card'
const CREW_SAVES_KEY = 'malifaux-saved-crew-cards'

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

function loadSavedCrewCards(): SavedCrewCardEntry[] {
  try {
    const existing = localStorage.getItem(CREW_SAVES_KEY)
    if (existing) return JSON.parse(existing)
  } catch {}
  return []
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'stat' | 'crew'>('stat')

  // Stat card state
  const [savedCards, setSavedCards] = useState<SavedCardEntry[]>(loadSavedCards)
  const [currentId, setCurrentId] = useState<string | null>(null)
  const [card, setCard] = useState<CardData>(defaultCard)

  // Crew card state
  const [savedCrewCards, setSavedCrewCards] = useState<SavedCrewCardEntry[]>(loadSavedCrewCards)
  const [currentCrewId, setCurrentCrewId] = useState<string | null>(null)
  const [crewCard, setCrewCard] = useState<CrewCardData>(defaultCrewCard)

  useEffect(() => {
    localStorage.setItem(SAVES_KEY, JSON.stringify(savedCards))
  }, [savedCards])

  useEffect(() => {
    localStorage.setItem(CREW_SAVES_KEY, JSON.stringify(savedCrewCards))
  }, [savedCrewCards])

  // Stat card handlers
  const handleSave = () => {
    if (currentId) {
      setSavedCards(prev => prev.map(e => e.id === currentId ? { ...e, label: card.name, card } : e))
    } else {
      const entry: SavedCardEntry = { id: crypto.randomUUID(), label: card.name, card }
      setSavedCards(prev => [...prev, entry])
      setCurrentId(entry.id)
    }
  }

  const handleNew = () => { setCard(defaultCard); setCurrentId(null) }

  const handleLoad = (id: string) => {
    const entry = savedCards.find(e => e.id === id)
    if (entry) { setCard(entry.card); setCurrentId(id) }
  }

  const handleDelete = () => {
    if (!currentId) return
    setSavedCards(prev => prev.filter(e => e.id !== currentId))
    handleNew()
  }

  // Crew card handlers
  const handleCrewSave = () => {
    const label = crewCard.name || 'Untitled'
    if (currentCrewId) {
      setSavedCrewCards(prev => prev.map(e => e.id === currentCrewId ? { ...e, label, card: crewCard } : e))
    } else {
      const entry: SavedCrewCardEntry = { id: crypto.randomUUID(), label, card: crewCard }
      setSavedCrewCards(prev => [...prev, entry])
      setCurrentCrewId(entry.id)
    }
  }

  const handleCrewNew = () => { setCrewCard(defaultCrewCard); setCurrentCrewId(null) }

  const handleCrewLoad = (id: string) => {
    const entry = savedCrewCards.find(e => e.id === id)
    if (entry) { setCrewCard(entry.card); setCurrentCrewId(id) }
  }

  const handleCrewDelete = () => {
    if (!currentCrewId) return
    setSavedCrewCards(prev => prev.filter(e => e.id !== currentCrewId))
    handleCrewNew()
  }

  return (
    <div className="app-root">
      <div className="tabs">
        <button className={`tab${activeTab === 'stat' ? ' active' : ''}`} onClick={() => setActiveTab('stat')}>Stat Card</button>
        <button className={`tab${activeTab === 'crew' ? ' active' : ''}`} onClick={() => setActiveTab('crew')}>Crew Card</button>
      </div>
      {activeTab === 'stat' && (
        <>
          <CardLibrary savedCards={savedCards} currentId={currentId} onSave={handleSave} onNew={handleNew} onLoad={handleLoad} onDelete={handleDelete} />
          <StatCard card={card} onChange={setCard} />
        </>
      )}
      {activeTab === 'crew' && (
        <>
          <CardLibrary savedCards={savedCrewCards} currentId={currentCrewId} onSave={handleCrewSave} onNew={handleCrewNew} onLoad={handleCrewLoad} onDelete={handleCrewDelete} />
          <CrewCard card={crewCard} onChange={setCrewCard} />
        </>
      )}
    </div>
  )
}
