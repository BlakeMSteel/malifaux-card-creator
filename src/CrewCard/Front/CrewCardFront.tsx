import type { CrewCardData, AbilityGroup, ActionGroup } from '../../types'
import { getFaction } from '../../factions'
import CrewCardHeader from '../CrewCardHeader'
import { AbilityRow } from '../../SharedComponents/AbilityRow'
import { ActionSection } from '../../SharedComponents/ActionSection'
import './CrewCardFront.css'

function buildPreamble(keyword: string, uniqueOnly: boolean, excludeSummon: boolean, type: 'ability' | 'action', count: number): string {
  const unique = uniqueOnly ? 'unique ' : ''
  const summon = excludeSummon ? ' without a Summon token' : ''
  const noun = type === 'ability'
    ? (count === 1 ? 'ability' : 'abilities')
    : (count === 1 ? 'action' : 'actions')
  return `Friendly ${unique}${keyword} models${summon} gain the following ${noun}:`
}

function AbilityGroupBlock({ group, keyword }: { group: AbilityGroup; keyword: string; color: string }) {
  if (group.abilities.length === 0) return null
  return (
    <div className="cc-feature-group">
      <p className="cc-preamble">{buildPreamble(keyword, group.uniqueOnly, group.excludeSummonToken, 'ability', group.abilities.length)}</p>
      {group.abilities.map(ab => <AbilityRow key={ab.id} ability={ab} />)}
    </div>
  )
}

function ActionGroupBlock({ group, keyword, color }: { group: ActionGroup; keyword: string; color: string }) {
  if (group.actions.length === 0) return null
  return (
    <div className="cc-feature-group">
      <p className="cc-preamble">{buildPreamble(keyword, group.uniqueOnly, group.excludeSummonToken, 'action', group.actions.length)}</p>
      <ActionSection actions={group.actions} color={color} />
    </div>
  )
}

export default function CrewCardFront({ card }: { card: CrewCardData }) {
  const faction = getFaction(card.faction)

  return (
    <div className="crew-card">
      <CrewCardHeader faction={card.faction} name={card.name} master={card.master} />

      <div className="cc-image-area">
        {card.imageUrl && <img src={card.imageUrl} alt="master image" className="cc-image" />}
      </div>

      <div className="cc-features">
        {card.abilityGroups.map(g => (
          <AbilityGroupBlock key={g.id} group={g} keyword={card.keyword} color={faction.color} />
        ))}
        {card.actionGroups.map(g => (
          <ActionGroupBlock key={g.id} group={g} keyword={card.keyword} color={faction.color} />
        ))}
      </div>

      <div className="cc-footer">Crew Card</div>
    </div>
  )
}
