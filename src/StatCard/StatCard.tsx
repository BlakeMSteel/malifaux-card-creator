import type { CardData } from '../types'
import './StatCard.css'
import CardForm from './Form/CardForm'
import CardPreview from './Front/CardPreview'
import CardBack from './Back/CardBack'

interface Props {
  card: CardData
  onChange: (card: CardData) => void
}

export default function StatCard({ card, onChange }: Props) {
  return (
    <div className="app">
      <div className="form-panel">
        <CardForm card={card} onChange={onChange} />
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
