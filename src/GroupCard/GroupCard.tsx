import { Fragment } from "react";
import type {
  CardGroupData,
  SavedCardEntry,
  SavedCrewCardEntry,
  SavedUpgradeCardEntry,
} from "../types";
import CardLayout from "../SharedComponents/CardLayout";
import GroupCardForm from "./Form/GroupCardForm";
import StatCardFront from "../StatCard/Front/StatCardFront";
import StatCardBack from "../StatCard/Back/StatCardBack";
import CrewCardFront from "../CrewCard/Front/CrewCardFront";
import CrewCardBack from "../CrewCard/Back/CrewCardBack";
import UpgradeCardFront from "../UpgradeCard/UpgradeCardFront";

interface Props {
  group: CardGroupData;
  onChange: (group: CardGroupData) => void;
  statCards: SavedCardEntry[];
  crewCards: SavedCrewCardEntry[];
  upgradeCards: SavedUpgradeCardEntry[];
}

export default function GroupCard({
  group,
  onChange,
  statCards,
  crewCards,
  upgradeCards,
}: Props) {
  const crewEntry = crewCards.find((e) => e.id === group.crewCardId);
  const statEntries = group.statCardIds
    .map((id) => statCards.find((e) => e.id === id))
    .filter((e): e is SavedCardEntry => !!e);
  const upgradeEntries = group.upgradeCardIds
    .map((id) => upgradeCards.find((e) => e.id === id))
    .filter((e): e is SavedUpgradeCardEntry => !!e);

  return (
    <CardLayout
      form={
        <GroupCardForm
          group={group}
          onChange={onChange}
          statCards={statCards}
          crewCards={crewCards}
          upgradeCards={upgradeCards}
        />
      }
      preview={
        <div className="cards-container">
          {crewEntry && (
            <Fragment key={crewEntry.id}>
              <CrewCardFront card={crewEntry.card} />
              <CrewCardBack card={crewEntry.card} />
            </Fragment>
          )}
          {statEntries.map((e) => (
            <Fragment key={e.id}>
              <StatCardFront card={e.card} />
              <StatCardBack card={e.card} />
            </Fragment>
          ))}
          {upgradeEntries.map((e) => (
            <UpgradeCardFront key={e.id} card={e.card} />
          ))}
        </div>
      }
    />
  );
}
