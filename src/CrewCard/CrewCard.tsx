import type { CrewCardData } from '../types'
import './CrewCard.css'
import CardLayout from '../SharedComponents/CardLayout'
import CrewCardFront from './Front/CrewCardFront'
import CrewCardBack from './Back/CrewCardBack'
import CrewCardForm from './Form/CrewCardForm'

interface Props {
  card: CrewCardData
  onChange: (card: CrewCardData) => void
}

export default function CrewCard({ card, onChange }: Props) {
  return (
    <CardLayout
      form={<CrewCardForm card={card} onChange={onChange} />}
      preview={
        <div className="cards-container">
          <CrewCardFront card={card} />
          <CrewCardBack card={card} />
        </div>
      }
    />
  )
}
