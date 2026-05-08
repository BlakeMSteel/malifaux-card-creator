import type { CardData } from '../../types'
import { getFaction } from '../../factions'
import { ActionSection } from '../../SharedComponents/ActionSection'

export default function CardBack({ card }: { card: CardData }) {
  const faction = getFaction(card.faction)

  return (
    <div className="card card-back">
      <div className="cb-top">
        <strong>{card.name}</strong>
      </div>
      <div className="cb-body">
        <ActionSection actions={card.actions} color={faction.color} />
      </div>
      <div className="cb-bottom">{card.baseSize}</div>
    </div>
  )
}
