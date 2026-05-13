import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Ability } from "../../types";

export function AbilityEntry({
  ability,
  index,
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
        gap: 1,
        p: 1.5,
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        mb: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ flexShrink: 0 }}
        >
          {index + 1}.
        </Typography>
        <TextField
          size="small"
          fullWidth
          placeholder="Name"
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
            <MenuItem value="🛡️">🛡️</MenuItem>
            <MenuItem value="🔮">🔮</MenuItem>
            <MenuItem value="🪬">🪬</MenuItem>
          </Select>
        )}
      </Box>
      <TextField
        size="small"
        fullWidth
        placeholder="Requirement, e.g. Once per activation. (optional)"
        value={ability.requirement}
        onChange={(e) => onChange({ requirement: e.target.value })}
      />
      <TextField
        size="small"
        fullWidth
        multiline
        rows={2}
        placeholder="Ability text"
        value={ability.text}
        onChange={(e) => onChange({ text: e.target.value })}
      />
    </Box>
  );
}
