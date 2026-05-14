import { Box, IconButton, MenuItem, Select, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Trigger, Suit } from "../../types";
import {
  GiRamProfile,
  GiFeatheredWing,
  GiOpenBook,
  GiDualityMask,
  GiFloatingCrystal,
} from "react-icons/gi";

export const SUITS: Suit[] = ["🐏", "🦅", "📖", "🎭", "💎"];

const SUIT_ICONS: Record<Suit, React.ReactElement> = {
  "🐏": <GiRamProfile />,
  "🦅": <GiFeatheredWing />,
  "📖": <GiOpenBook />,
  "🎭": <GiDualityMask />,
  "💎": <GiFloatingCrystal />,
};

export function TriggerEntry({
  trigger,
  onChange,
  onRemove,
}: {
  trigger: Trigger;
  onChange: (patch: Partial<Trigger>) => void;
  onRemove?: () => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 1.5,
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        mb: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Select
          size="small"
          value={trigger.suit}
          onChange={(e) => onChange({ suit: e.target.value as Suit })}
          sx={{ minWidth: 70 }}
        >
          {SUITS.map((s) => (
            <MenuItem key={s} value={s}>
              {SUIT_ICONS[s]}
            </MenuItem>
          ))}
        </Select>
        <TextField
          size="small"
          fullWidth
          placeholder="Trigger name"
          value={trigger.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />
        {onRemove && (
          <IconButton size="small" onClick={onRemove} color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
      <TextField
        size="small"
        fullWidth
        placeholder="Requirement (italic, optional)"
        value={trigger.requirement}
        onChange={(e) => onChange({ requirement: e.target.value })}
      />
      <TextField
        size="small"
        fullWidth
        multiline
        rows={2}
        placeholder="Effect"
        value={trigger.effect}
        onChange={(e) => onChange({ effect: e.target.value })}
      />
    </Box>
  );
}
