import type { CrewCardData } from '../types'
import CrewCardFront from './Front/CrewCardFront'
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
        <CrewCardFront card={card} />
      </div>
    </div>
  )
}
