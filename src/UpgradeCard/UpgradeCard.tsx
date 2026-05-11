import type { UpgradeCardData } from '../types'
import CardLayout from '../SharedComponents/CardLayout'
import UpgradeCardFront from './UpgradeCardFront'
import UpgradeCardForm from './Form/UpgradeCardForm'

interface Props {
  card: UpgradeCardData
  onChange: (card: UpgradeCardData) => void
}

export default function UpgradeCard({ card, onChange }: Props) {
  return (
    <CardLayout
      form={<UpgradeCardForm card={card} onChange={onChange} />}
      preview={
        <div className="cards-container">
          <UpgradeCardFront card={card} />
        </div>
      }
    />
  )
}
