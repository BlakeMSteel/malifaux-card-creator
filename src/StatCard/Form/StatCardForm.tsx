import { useState } from "react";
import type {
  CardData,
  Station,
  Ability,
  Action,
  ActionType,
  BaseSize,
} from "../../types";
import { FACTIONS } from "../../factions";
import {
  AbilityEntry,
  ActionEntry,
} from "../../SharedComponents/FormComponents";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const PRESET_CHARACTERISTICS = ["Living", "Construct", "Beast", "Undead"];
const STATIONS: { value: Station; label: string }[] = [
  { value: "Master", label: "Master" },
  { value: "Henchman", label: "Henchman" },
  { value: "Minion", label: "Minion" },
  { value: "Peon", label: "Peon" },
  { value: "", label: "(none)" },
];

interface Props {
  card: CardData;
  onChange: (card: CardData) => void;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ mb: 2.5, pb: 2, borderBottom: 1, borderColor: "divider" }}>
      <Typography
        variant="overline"
        sx={{
          display: "block",
          fontWeight: 600,
          mb: 1.5,
          color: "text.secondary",
          lineHeight: 1.5,
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}

export default function StatCardForm({ card, onChange }: Props) {
  const [customCharInput, setCustomCharInput] = useState("");
  const update = (patch: Partial<CardData>) => onChange({ ...card, ...patch });

  const togglePreset = (char: string) => {
    const next = card.characteristics.includes(char)
      ? card.characteristics.filter((c) => c !== char)
      : [...card.characteristics, char];
    update({ characteristics: next });
  };

  const addCustomChar = () => {
    const val = customCharInput.trim();
    if (val && !card.characteristics.includes(val)) {
      update({ characteristics: [...card.characteristics, val] });
    }
    setCustomCharInput("");
  };

  const addAbility = () => {
    const ability: Ability = {
      id: crypto.randomUUID(),
      defensiveSymbol: "",
      name: "",
      requirement: "",
      text: "",
    };
    update({ abilities: [...card.abilities, ability] });
  };

  const updateAbility = (id: string, patch: Partial<Ability>) =>
    update({
      abilities: card.abilities.map((a) =>
        a.id === id ? { ...a, ...patch } : a,
      ),
    });

  const customChars = card.characteristics.filter(
    (c) => !PRESET_CHARACTERISTICS.includes(c),
  );
  const showCount = card.station === "Minion" || card.station === "Peon";

  const addAction = (type: ActionType) => {
    const action: Action = {
      id: crypto.randomUUID(),
      type,
      signature: false,
      name: "",
      rg: "-",
      skl: "-",
      rst: type === "Attack" ? "Df" : "-",
      tn: "-",
      dmg: "-",
      requirement: "",
      effect: "",
      triggers: [],
    };
    update({ actions: [...card.actions, action] });
  };

  const updateAction = (id: string, patch: Partial<Action>) =>
    update({
      actions: card.actions.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    });

  return (
    <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ p: 2 }}>
      <Section title="Basic Info">
        <Stack spacing={1.5}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>Faction</InputLabel>
              <Select
                label="Faction"
                value={card.faction}
                onChange={(e) => update({ faction: e.target.value })}
              >
                <MenuItem value="">(none)</MenuItem>
                {FACTIONS.map((f) => (
                  <MenuItem key={f.name} value={f.name}>
                    {f.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              size="small"
              label="Cost"
              placeholder='# or "-"'
              value={card.cost}
              onChange={(e) => update({ cost: e.target.value })}
              sx={{ width: 80 }}
            />
          </Box>
          <TextField
            size="small"
            fullWidth
            label="Name"
            placeholder="Rusty Alyce"
            value={card.name}
            onChange={(e) => update({ name: e.target.value })}
          />
          <TextField
            size="small"
            fullWidth
            label="Title"
            placeholder="Trigger Happy"
            value={card.title}
            onChange={(e) => update({ title: e.target.value })}
          />
        </Stack>
      </Section>

      <Section title="Image">
        <TextField
          size="small"
          fullWidth
          label="URL"
          placeholder="https://..."
          value={card.imageUrl}
          onChange={(e) => update({ imageUrl: e.target.value })}
        />
      </Section>

      <Section title="Stats">
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ flexWrap: "wrap", rowGap: 1.5 }}
        >
          {(["df", "wp", "sp", "sz", "stn", "health"] as const).map((stat) => (
            <TextField
              key={stat}
              size="small"
              label={stat.toUpperCase()}
              type="number"
              slotProps={{ htmlInput: { min: 0 } }}
              value={card[stat]}
              onChange={(e) => update({ [stat]: e.target.value })}
              sx={{ width: 90 }}
            />
          ))}
        </Stack>
      </Section>

      <Section title="Station & Characteristics">
        <Stack spacing={1.5}>
          <FormControl size="small" fullWidth>
            <InputLabel>Station</InputLabel>
            <Select
              label="Station"
              value={card.station}
              onChange={(e) => update({ station: e.target.value as Station })}
            >
              {STATIONS.map((s) => (
                <MenuItem key={s.value} value={s.value}>
                  {s.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {showCount && (
            <TextField
              size="small"
              label="Count"
              type="number"
              slotProps={{ htmlInput: { min: 1, max: 9 } }}
              value={card.stationCount}
              onChange={(e) => update({ stationCount: e.target.value })}
              sx={{ width: 100 }}
            />
          )}

          {card.station !== "Master" && (
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={card.isTotem}
                  onChange={(e) => update({ isTotem: e.target.checked })}
                />
              }
              label="Totem"
            />
          )}

          <Box>
            <Typography variant="caption" color="text.secondary">
              Other Characteristics
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", mt: 0.5 }}>
              {PRESET_CHARACTERISTICS.map((c) => (
                <FormControlLabel
                  key={c}
                  control={
                    <Checkbox
                      size="small"
                      checked={card.characteristics.includes(c)}
                      onChange={() => togglePreset(c)}
                    />
                  }
                  label={<Typography variant="body2">{c}</Typography>}
                />
              ))}
            </Box>
            {customChars.length > 0 && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1 }}>
                {customChars.map((c) => (
                  <Chip
                    key={c}
                    label={c}
                    size="small"
                    onDelete={() =>
                      update({
                        characteristics: card.characteristics.filter(
                          (x) => x !== c,
                        ),
                      })
                    }
                  />
                ))}
              </Box>
            )}
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                size="small"
                value={customCharInput}
                onChange={(e) => setCustomCharInput(e.target.value)}
                placeholder="Custom characteristic"
                onKeyDown={(e) => e.key === "Enter" && addCustomChar()}
                sx={{ flex: 1 }}
              />
              <Button size="small" variant="outlined" onClick={addCustomChar}>
                Add
              </Button>
            </Box>
          </Box>

          <TextField
            size="small"
            fullWidth
            label="Keyword"
            placeholder="Amalgam"
            value={card.keyword}
            onChange={(e) => update({ keyword: e.target.value })}
          />
        </Stack>
      </Section>

      <Section title="Abilities">
        {card.abilities.map((ab, i) => (
          <AbilityEntry
            key={ab.id}
            ability={ab}
            index={i}
            onChange={(patch) => updateAbility(ab.id, patch)}
            onRemove={() =>
              update({
                abilities: card.abilities.filter((a) => a.id !== ab.id),
              })
            }
          />
        ))}
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addAbility}
        >
          Add Ability
        </Button>
      </Section>

      {card.station === "Master" && (
        <Section title="Master Info">
          <Stack spacing={1.5}>
            <TextField
              size="small"
              fullWidth
              label="Left text"
              value={card.masterLeftText}
              onChange={(e) => update({ masterLeftText: e.target.value })}
            />
            <TextField
              size="small"
              fullWidth
              label="Right text"
              value={card.masterRightText}
              onChange={(e) => update({ masterRightText: e.target.value })}
            />
          </Stack>
        </Section>
      )}

      <Section title="Actions">
        {card.actions.map((action) => (
          <ActionEntry
            key={action.id}
            action={action}
            onChange={(patch) => updateAction(action.id, patch)}
            onRemove={() =>
              update({
                actions: card.actions.filter((a) => a.id !== action.id),
              })
            }
          />
        ))}
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => addAction("Attack")}
          >
            Attack Action
          </Button>
          <Button
            size="small"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => addAction("Tactical")}
          >
            Tactical Action
          </Button>
        </Stack>
      </Section>

      <Section title="Base Size">
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Size</InputLabel>
          <Select
            label="Size"
            value={card.baseSize}
            onChange={(e) => update({ baseSize: e.target.value as BaseSize })}
          >
            <MenuItem value="30mm">30mm</MenuItem>
            <MenuItem value="40mm">40mm</MenuItem>
            <MenuItem value="50mm">50mm</MenuItem>
          </Select>
        </FormControl>
      </Section>
    </Box>
  );
}
