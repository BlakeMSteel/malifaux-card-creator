import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import type { Action, ActionType, Trigger, RstValue } from "../../types";
import { TriggerEntry } from "./TriggerEntry";

export const RST_VALUES: RstValue[] = ["Df", "Wp", "Sp", "Sz", "X", "*", "-"];

export function ActionEntry({
  action,
  onChange,
  onRemove,
}: {
  action: Action;
  onChange: (patch: Partial<Action>) => void;
  onRemove: () => void;
}) {
  const addTrigger = () => {
    const t: Trigger = {
      id: crypto.randomUUID(),
      suit: "🐏",
      name: "",
      requirement: "",
      effect: "",
    };
    onChange({ triggers: [...action.triggers, t] });
  };
  const updateTrigger = (id: string, patch: Partial<Trigger>) =>
    onChange({
      triggers: action.triggers.map((t) =>
        t.id === id ? { ...t, ...patch } : t,
      ),
    });
  const removeTrigger = (id: string) =>
    onChange({ triggers: action.triggers.filter((t) => t.id !== id) });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        p: 1.5,
        border: 1,
        borderColor: "grey.400",
        borderRadius: 1,
        mb: 1.5,
        bgcolor: "grey.50",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={action.signature}
              onChange={(e) => onChange({ signature: e.target.checked })}
            />
          }
          label={<Typography variant="body2">⚡</Typography>}
          sx={{ mr: 0 }}
        />
        <FormControl size="small" sx={{ minWidth: 110, flex: 1 }}>
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            value={action.type}
            onChange={(e) => onChange({ type: e.target.value as ActionType })}
          >
            <MenuItem value="Attack">Attack</MenuItem>
            <MenuItem value="Tactical">Tactical</MenuItem>
          </Select>
        </FormControl>
        <IconButton size="small" onClick={onRemove} color="error">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      <TextField
        size="small"
        fullWidth
        label="Name"
        value={action.name}
        onChange={(e) => onChange({ name: e.target.value })}
      />

      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        sx={{ flexWrap: "wrap", rowGap: 1.5 }}
      >
        <TextField
          size="small"
          label="Rg"
          value={action.rg}
          onChange={(e) => onChange({ rg: e.target.value })}
          sx={{ width: 64 }}
        />
        <TextField
          size="small"
          label="Skl"
          value={action.skl}
          onChange={(e) => onChange({ skl: e.target.value })}
          sx={{ width: 64 }}
        />
        <FormControl size="small" sx={{ minWidth: 72 }}>
          <InputLabel>Rst</InputLabel>
          <Select
            label="Rst"
            value={action.rst}
            onChange={(e) => onChange({ rst: e.target.value as RstValue })}
          >
            {RST_VALUES.map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          size="small"
          label="TN"
          value={action.tn}
          onChange={(e) => onChange({ tn: e.target.value })}
          sx={{ width: 64 }}
        />
        <TextField
          size="small"
          label="Dmg"
          value={action.dmg}
          onChange={(e) => onChange({ dmg: e.target.value })}
          sx={{ width: 64 }}
        />
      </Stack>

      <TextField
        size="small"
        fullWidth
        label="Requirement"
        placeholder="Italic text (optional)"
        value={action.requirement}
        onChange={(e) => onChange({ requirement: e.target.value })}
      />
      <TextField
        size="small"
        fullWidth
        multiline
        rows={2}
        label="Effect"
        placeholder="Effect text"
        value={action.effect}
        onChange={(e) => onChange({ effect: e.target.value })}
      />

      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mb: 0.5, display: "block" }}
        >
          Triggers
        </Typography>
        {action.triggers.map((t) => (
          <TriggerEntry
            key={t.id}
            trigger={t}
            onChange={(patch) => updateTrigger(t.id, patch)}
            onRemove={() => removeTrigger(t.id)}
          />
        ))}
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addTrigger}
        >
          Trigger
        </Button>
      </Box>
    </Box>
  );
}
