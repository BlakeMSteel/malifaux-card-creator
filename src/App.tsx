import { useState, useEffect } from 'react'
import type { CardData } from './types'
import CardForm from './CardForm'
import CardPreview from './CardPreview'
import CardBack from './CardBack'
import './App.css'

const defaultCard: CardData = {
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

const STORAGE_KEY = 'malifaux-card'

function loadCard(): CardData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return { ...defaultCard, ...JSON.parse(saved) }
  } catch {}
  return defaultCard
}

export default function App() {
  const [card, setCard] = useState<CardData>(loadCard)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(card))
  }, [card])

  return (
    <div className="app">
      <div className="form-panel">
        <CardForm card={card} onChange={setCard} />
      </div>
      <div className="preview-panel">
        <div className="cards-container">
          <CardPreview card={card} />
          <CardBack card={card} />
        </div>
      </div>
    </div>
  )
}
