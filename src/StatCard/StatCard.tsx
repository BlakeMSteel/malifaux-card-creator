import type { CardData } from "../types";
import CardLayout from "../SharedComponents/CardLayout";
import StatCardForm from "./Form/StatCardForm";
import StatCardFront from "./Front/StatCardFront";
import StatCardBack from "./Back/StatCardBack";

interface Props {
  card: CardData;
  onChange: (card: CardData) => void;
}

export default function StatCard({ card, onChange }: Props) {
  return (
    <CardLayout
      form={<StatCardForm card={card} onChange={onChange} />}
      preview={
        <div className="cards-container">
          <StatCardFront card={card} />
          <StatCardBack card={card} />
        </div>
      }
    />
  );
}
