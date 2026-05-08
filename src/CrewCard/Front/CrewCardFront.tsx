import type { CrewCardData, AbilityGroup, ActionGroup, TriggerGroup, TriggerActionType } from '../../types'
import { getFaction } from '../../factions'
import CrewCardHeader from '../CrewCardHeader'
import { AbilityRow } from '../../SharedComponents/AbilityRow'
import { ActionSection } from '../../SharedComponents/ActionSection'
import { TriggerRow } from '../../SharedComponents/ActionBlock'
import '../CrewCard.css'
import './CrewCardFront.css'

function buildPreamble(keyword: string, uniqueOnly: boolean, excludePeon: boolean, excludeSummon: boolean, type: 'ability' | 'action', count: number): string {
  const unique = uniqueOnly ? 'unique ' : ''
  const peon = excludePeon ? 'non-Peon ' : ''
  const summon = excludeSummon ? ' without a Summon token' : ''
  const noun = type === 'ability'
    ? (count === 1 ? 'ability' : 'abilities')
    : (count === 1 ? 'action' : 'actions')
  return `Friendly ${unique}${peon}${keyword} models${summon} gain the following ${noun}:`
}

function buildTriggerPreamble(keyword: string, uniqueOnly: boolean, excludePeon: boolean, excludeSummon: boolean, actionType: TriggerActionType, printedOnStatCard: boolean): string {
  const unique = uniqueOnly ? 'unique ' : ''
  const peon = excludePeon ? 'non-Peon ' : ''
  const summon = excludeSummon ? ' without a Summon token' : ''
  const actionSpec = actionType === 'attack'
    ? 'all attack actions'
    : actionType === 'all'
      ? 'all actions'
      : `their ${actionType} actions`
  const statCard = printedOnStatCard ? ' printed on their stat card' : ''
  return `Friendly ${unique}${peon}${keyword} models${summon} gain the following trigger on ${actionSpec}${statCard}:`
}

function TriggerGroupBlock({ group, keyword }: { group: TriggerGroup; keyword: string }) {
  return (
    <div className="cc-feature-group">
      <p className="cc-preamble">{buildTriggerPreamble(keyword, group.uniqueOnly, group.excludePeon, group.excludeSummonToken, group.actionType, group.printedOnStatCard)}</p>
      <TriggerRow trigger={group.trigger} />
    </div>
  )
}

function AbilityGroupBlock({ group, keyword }: { group: AbilityGroup; keyword: string; color: string }) {
  if (group.abilities.length === 0) return null
  return (
    <div className="cc-feature-group">
      <p className="cc-preamble">{buildPreamble(keyword, group.uniqueOnly, group.excludePeon, group.excludeSummonToken, 'ability', group.abilities.length)}</p>
      {group.abilities.map(ab => <AbilityRow key={ab.id} ability={ab} />)}
    </div>
  )
}

function ActionGroupBlock({ group, keyword, color }: { group: ActionGroup; keyword: string; color: string }) {
  if (group.actions.length === 0) return null
  return (
    <div className="cc-feature-group">
      <p className="cc-preamble">{buildPreamble(keyword, group.uniqueOnly, group.excludePeon, group.excludeSummonToken, 'action', group.actions.length)}</p>
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
        {card.crewAbility && <p className="cc-crew-ability">{card.crewAbility}</p>}
        {card.abilityGroups.map(g => (
          <AbilityGroupBlock key={g.id} group={g} keyword={card.keyword} color={faction.color} />
        ))}
        {card.triggerGroups.map(g => (
          <TriggerGroupBlock key={g.id} group={g} keyword={card.keyword} />
        ))}
        {card.actionGroups.map(g => (
          <ActionGroupBlock key={g.id} group={g} keyword={card.keyword} color={faction.color} />
        ))}
      </div>

      <div className="cc-footer">Crew Card</div>
    </div>
  )
}
