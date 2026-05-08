import type { UpgradeCardData } from '../types'
import '../CrewCard/CrewCard.css'
import UpgradeCardFront from './UpgradeCardFront'
import UpgradeCardForm from './Form/UpgradeCardForm'

interface Props {
  card: UpgradeCardData
  onChange: (card: UpgradeCardData) => void
}

export default function UpgradeCard({ card, onChange }: Props) {
  return (
    <div className="app">
      <div className="form-panel">
        <UpgradeCardForm card={card} onChange={onChange} />
      </div>
      <div className="preview-panel">
        <div className="cards-container">
          <UpgradeCardFront card={card} />
        </div>
      </div>
    </div>
  )
}
