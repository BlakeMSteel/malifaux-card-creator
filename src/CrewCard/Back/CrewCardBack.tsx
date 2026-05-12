import type { CrewCardData, Marker, Token } from "../../types";
import { getFaction } from "../../factions";
import CrewCardHeader from "../CrewCardHeader";
import "../CrewCard.css";
import "./CrewCardBack.css";

function buildMarkerDescriptor(marker: Marker): string {
  const parts: string[] = [];
  if (marker.size !== "30mm") parts.push(marker.size);
  marker.terrainFeatures.forEach((tf) => {
    if (tf.feature) parts.push(tf.feature);
  });
  return parts.join(", ");
}

function MarkerRow({ marker }: { marker: Marker }) {
  const descriptor = buildMarkerDescriptor(marker);
  return (
    <p className="cc-ref-entry">
      <strong>{marker.name}:</strong>{" "}
      {descriptor && (
        <>
          {descriptor}
          {marker.effect ? ". " : "."}
        </>
      )}
      {marker.effect}
    </p>
  );
}

function TokenRow({ token }: { token: Token }) {
  return (
    <p className="cc-ref-entry">
      <strong>{token.name}:</strong> {token.effect}
    </p>
  );
}

function RefSection({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="cc-ref-section">
      <p className="cc-ref-heading" style={{ color }}>
        {title}
      </p>
      <hr className="cc-ref-heading-underline" style={{ borderColor: color }} />
      {children}
    </div>
  );
}

export default function CrewCardBack({ card }: { card: CrewCardData }) {
  const faction = getFaction(card.faction);
  const hasMarkers = card.markers.length > 0;
  const hasTokens = card.tokens.length > 0;

  return (
    <div className="crew-card">
      <CrewCardHeader
        faction={card.faction}
        name={card.name}
        master={card.master}
      />
      <div className="cc-back-body">
        {hasMarkers && (
          <RefSection title="Markers" color={faction.color}>
            {card.markers.map((m: Marker) => (
              <MarkerRow key={m.id} marker={m} />
            ))}
          </RefSection>
        )}
        {hasTokens && (
          <RefSection title="Tokens" color={faction.color}>
            {card.tokens.map((t: Token) => (
              <TokenRow key={t.id} token={t} />
            ))}
          </RefSection>
        )}
      </div>
      <div className="cc-footer">Reference</div>
    </div>
  );
}
