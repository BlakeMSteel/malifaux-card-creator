import type { CrewCardData } from '../types'
import CrewCardFront from './Front/CrewCardFront'
import CrewCardBack from './Back/CrewCardBack'
import CrewCardForm from './Form/CrewCardForm'

interface Props {
  card: CrewCardData
  onChange: (card: CrewCardData) => void
}

export default function CrewCard({ card, onChange }: Props) {
  return (
    <div className="app">
      <div className="form-panel">
        <CrewCardForm card={card} onChange={onChange} />
      </div>
      <div className="preview-panel">
        <div className="cards-container">
          <CrewCardFront card={card} />
          <CrewCardBack card={card} />
        </div>
      </div>
    </div>
  )
}
