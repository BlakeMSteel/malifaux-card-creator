import { getFaction } from '../factions'
import './CrewCardHeader.css'

interface Props {
  faction: string
  name: string
  master: string
}

export default function CrewCardHeader({ faction: factionName, name, master }: Props) {
  const faction = getFaction(factionName)
  return (
    <div className="cc-top">
      <div className="cc-faction-symbol" style={{ color: faction.color, borderColor: faction.color }}>
        {faction.letter}
      </div>
      <h1 className="cc-name" style={{ color: faction.color }}>{name || 'CREW NAME'}</h1>
      <p className="cc-master">{master}</p>
    </div>
  )
}
