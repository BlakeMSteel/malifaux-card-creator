import type { ReactElement, ReactNode } from "react";
import {
  GiRamProfile,
  GiFeatheredWing,
  GiOpenBook,
  GiDualityMask,
  GiFloatingCrystal,
  GiPistolGun,
  GiSparkles,
  GiClawSlashes,
  GiAura,
} from "react-icons/gi";
import { GoShieldLock, GoShieldX, GoShield } from "react-icons/go";
import { FaBoltLightning } from "react-icons/fa6";
import type { Suit, TriggerActionType, DefensiveSymbol } from "./types";

type IconTriggerActionType = Exclude<TriggerActionType, "attack" | "all">;
type IconDefensiveSymbol = Exclude<DefensiveSymbol, "">;

interface SymbolDef {
  aliases: string[];
  icon: ReactElement;
}

function def(name: string, aliases: string[], icon: ReactElement): SymbolDef {
  return { aliases: [name, ...aliases], icon };
}

export const SUIT_SYMBOLS: Record<Suit, SymbolDef> = {
  "[ram]": def("ram", [], <GiRamProfile />),
  "[crow]": def("crow", [], <GiFeatheredWing />),
  "[tome]": def("tome", ["book"], <GiOpenBook />),
  "[mask]": def("mask", [], <GiDualityMask />),
  "[stone]": def("stone", ["soulstone"], <GiFloatingCrystal />),
};

export const SUITS = Object.keys(SUIT_SYMBOLS) as Suit[];

export const ACTION_TYPE_SYMBOLS: Record<IconTriggerActionType, SymbolDef> = {
  "[missile]": def("missile", ["gun", "ranged"], <GiPistolGun />),
  "[magic]": def("magic", ["sparkle"], <GiSparkles />),
  "[melee]": def("melee", ["claw"], <GiClawSlashes />),
  "[pulse]": def("pulse", ["aura"], <GiAura />),
};

export const ACTION_TYPES = Object.keys(
  ACTION_TYPE_SYMBOLS,
) as IconTriggerActionType[];

export const DEFENSIVE_SYMBOLS: Record<IconDefensiveSymbol, SymbolDef> = {
  "[physical]": def("physical", ["phys", "armor"], <GoShieldLock />),
  "[magical]": def("magical", ["aegis"], <GoShieldX />),
  "[unusual]": def(
    "unusual",
    ["weird", "strange", "bang", "exclamation"],
    <GoShield />,
  ),
};

export const DEFENSIVE_TYPES = Object.keys(
  DEFENSIVE_SYMBOLS,
) as IconDefensiveSymbol[];

export const SIGNATURE_SYMBOL = def(
  "signature",
  ["lightning", "bolt", "sig"],
  <FaBoltLightning />,
);

const ALIAS_TO_ICON = new Map<string, ReactElement>();
for (const sym of [
  ...Object.values(SUIT_SYMBOLS),
  ...Object.values(ACTION_TYPE_SYMBOLS),
  ...Object.values(DEFENSIVE_SYMBOLS),
  SIGNATURE_SYMBOL,
]) {
  for (const alias of sym.aliases) {
    ALIAS_TO_ICON.set(alias.toLowerCase(), sym.icon);
  }
}

const TOKEN_PATTERN = /\[([a-zA-Z-]+)\]/g;

/** Renders inline `[token]` placeholders (e.g. "[ram]", "[signature]") found
 * in free text as their corresponding icon. Unrecognized brackets are left
 * as literal text. */
export function renderSymbols(text: string): ReactNode {
  if (!text || !text.includes("[")) return text;

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  TOKEN_PATTERN.lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = TOKEN_PATTERN.exec(text))) {
    const icon = ALIAS_TO_ICON.get(match[1].toLowerCase());
    if (!icon) continue;
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <span
        key={key++}
        style={{
          display: "inline-flex",
          verticalAlign: "middle",
          margin: "0 2px",
        }}
      >
        {icon}
      </span>,
    );
    lastIndex = TOKEN_PATTERN.lastIndex;
  }

  if (key === 0) return text;
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}
