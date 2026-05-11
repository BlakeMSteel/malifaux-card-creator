import type { Ability } from '../../types'
import './AbilityRow.css'

export function AbilityRow({ ability }: { ability: Ability }) {
  return (
    <p className="ability-row">
      <strong>{ability.name}:</strong>{ability.requirement && <em> {ability.requirement}</em>} {ability.text}
    </p>
  )
}
