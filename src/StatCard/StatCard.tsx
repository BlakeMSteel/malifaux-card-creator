import type { CardData } from '../types'
import './StatCard.css'
import StatCardForm from './Form/StatCardForm'
import StatCardFront from './Front/StatCardFront'
import StatCardBack from './Back/StatCardBack'

interface Props {
  card: CardData
  onChange: (card: CardData) => void
}

export default function StatCard({ card, onChange }: Props) {
  return (
    <div className="app">
      <div className="form-panel">
        <StatCardForm card={card} onChange={onChange} />
      </div>
      <div className="preview-panel">
        <div className="cards-container">
          <StatCardFront card={card} />
          <StatCardBack card={card} />
        </div>
      </div>
    </div>
  )
}
