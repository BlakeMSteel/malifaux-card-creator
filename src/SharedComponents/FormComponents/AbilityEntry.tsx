import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Ability } from "../../types";
import { GoShieldLock, GoShieldX, GoShield } from "react-icons/go";

export function AbilityEntry({
  ability,
  onChange,
  onRemove,
}: {
  ability: Ability;
  index: number;
  onChange: (patch: Partial<Ability>) => void;
  onRemove: () => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        p: 1.5,
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        mb: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          label="Name"
          size="small"
          fullWidth
          placeholder="Armor"
          value={ability.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />
        <IconButton size="small" onClick={onRemove} color="error">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={ability.defensiveSymbol !== ""}
              onChange={(e) =>
                onChange({ defensiveSymbol: e.target.checked ? "🛡️" : "" })
              }
            />
          }
          label="Defensive?"
          sx={{ mr: 0 }}
        />
        {ability.defensiveSymbol !== "" && (
          <Select
            size="small"
            value={ability.defensiveSymbol}
            onChange={(e) => onChange({ defensiveSymbol: e.target.value })}
          >
            <MenuItem value="🛡️">
              <GoShieldLock />
            </MenuItem>
            <MenuItem value="🔮">
              <GoShieldX />
            </MenuItem>
            <MenuItem value="🪬">
              <GoShield />
            </MenuItem>
          </Select>
        )}
      </Box>
      <TextField
        label="Requirement"
        size="small"
        fullWidth
        placeholder="Once per activation."
        value={ability.requirement}
        onChange={(e) => onChange({ requirement: e.target.value })}
      />
      <TextField
        label="Ability Text"
        size="small"
        fullWidth
        multiline
        rows={3}
        placeholder="This model may reduce damage dealt to it by 1."
        value={ability.text}
        onChange={(e) => onChange({ text: e.target.value })}
      />
    </Box>
  );
}
