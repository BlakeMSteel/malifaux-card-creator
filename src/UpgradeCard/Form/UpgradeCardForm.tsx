import type {
  UpgradeCardData,
  Ability,
  Trigger,
  Action,
  ActionType,
  TriggerActionType,
} from "../../types";
import { FACTIONS } from "../../factions";
import {
  AbilityEntry,
  ActionEntry,
  TriggerEntry,
} from "../../SharedComponents/FormComponents";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const TRIGGER_ACTION_TYPES: { value: TriggerActionType; label: string }[] = [
  { value: "attack", label: "all its attack actions" },
  { value: "all", label: "all actions" },
  { value: "🔫", label: "its 🔫 actions" },
  { value: "✨", label: "its ✨ actions" },
  { value: "🗡️", label: "its 🗡️ actions" },
];

interface Props {
  card: UpgradeCardData;
  onChange: (card: UpgradeCardData) => void;
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

export default function UpgradeCardForm({ card, onChange }: Props) {
  const update = (patch: Partial<UpgradeCardData>) =>
    onChange({ ...card, ...patch });

  // — Ability helpers —
  const addAbility = () => {
    const a: Ability = {
      id: crypto.randomUUID(),
      defensiveSymbol: "",
      name: "",
      requirement: "",
      text: "",
    };
    update({ abilities: [...card.abilities, a] });
  };
  const updateAbility = (id: string, patch: Partial<Ability>) =>
    update({
      abilities: card.abilities.map((a) =>
        a.id === id ? { ...a, ...patch } : a,
      ),
    });
  const removeAbility = (id: string) =>
    update({ abilities: card.abilities.filter((a) => a.id !== id) });

  // — Trigger helpers —
  const addTrigger = () => {
    const t: Trigger = {
      id: crypto.randomUUID(),
      suit: "🐏",
      name: "",
      requirement: "",
      effect: "",
    };
    update({ triggers: [...card.triggers, t] });
  };
  const updateTrigger = (id: string, patch: Partial<Trigger>) =>
    update({
      triggers: card.triggers.map((t) =>
        t.id === id ? { ...t, ...patch } : t,
      ),
    });
  const removeTrigger = (id: string) =>
    update({ triggers: card.triggers.filter((t) => t.id !== id) });

  // — Action helpers —
  const addAction = (type: ActionType) => {
    const a: Action = {
      id: crypto.randomUUID(),
      type,
      signature: false,
      name: "",
      rg: "-",
      skl: "",
      rst: "Df",
      tn: "-",
      dmg: "-",
      requirement: "",
      effect: "",
      triggers: [],
    };
    update({ actions: [...card.actions, a] });
  };
  const updateAction = (id: string, patch: Partial<Action>) =>
    update({
      actions: card.actions.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    });
  const removeAction = (id: string) =>
    update({ actions: card.actions.filter((a) => a.id !== id) });

  // — Limitation helpers —
  const isPlentiful = card.limitation.startsWith("Plentiful");
  const plentifulN = card.limitation.match(/\d+/)?.[0] ?? "2";

  return (
    <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ p: 2 }}>
      <Section title="Basic Info">
        <Stack spacing={1.5}>
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
            label="Type"
            placeholder="M"
            value={card.upgradeType}
            onChange={(e) => update({ upgradeType: e.target.value })}
            sx={{ width: 80 }}
          />
          <TextField
            size="small"
            fullWidth
            label="Name"
            placeholder="Upgrade Name"
            value={card.name}
            onChange={(e) => update({ name: e.target.value })}
          />
        </Stack>
      </Section>

      <Section title="Upgrade Effect">
        <TextField
          size="small"
          fullWidth
          multiline
          rows={3}
          placeholder="Optional free text shown before granted abilities/triggers/actions"
          value={card.upgradeEffect}
          onChange={(e) => update({ upgradeEffect: e.target.value })}
        />
      </Section>

      <Section title="Granted Abilities">
        {card.abilities.map((ab, i) => (
          <AbilityEntry
            key={ab.id}
            ability={ab}
            index={i}
            onChange={(patch) => updateAbility(ab.id, patch)}
            onRemove={() => removeAbility(ab.id)}
          />
        ))}
        <Button size="small" variant="outlined" onClick={addAbility}>
          + Add Ability
        </Button>
      </Section>

      <Section title="Granted Triggers">
        <Stack spacing={1.5}>
          <FormControl size="small" fullWidth>
            <InputLabel>Action type</InputLabel>
            <Select
              label="Action type"
              value={card.triggerActionType}
              onChange={(e) =>
                update({
                  triggerActionType: e.target.value as TriggerActionType,
                })
              }
            >
              {TRIGGER_ACTION_TYPES.map((o) => (
                <MenuItem key={o.value} value={o.value}>
                  {o.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={card.triggerPrintedOnStatCard}
                onChange={(e) =>
                  update({ triggerPrintedOnStatCard: e.target.checked })
                }
              />
            }
            label="Printed on their stat card"
          />
          <Box>
            {card.triggers.map((t) => (
              <TriggerEntry
                key={t.id}
                trigger={t}
                onChange={(patch) => updateTrigger(t.id, patch)}
                onRemove={() => removeTrigger(t.id)}
              />
            ))}
            <Button size="small" variant="outlined" onClick={addTrigger}>
              + Add Trigger
            </Button>
          </Box>
        </Stack>
      </Section>

      <Section title="Granted Actions">
        {card.actions.map((action) => (
          <ActionEntry
            key={action.id}
            action={action}
            onChange={(patch) => updateAction(action.id, patch)}
            onRemove={() => removeAction(action.id)}
          />
        ))}
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => addAction("Attack")}
          >
            + Attack Action
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => addAction("Tactical")}
          >
            + Tactical Action
          </Button>
        </Stack>
      </Section>

      <Section title="Limitations">
        <Stack spacing={1.5}>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Type</InputLabel>
            <Select
              label="Type"
              value={isPlentiful ? "plentiful" : "unique"}
              onChange={(e) =>
                update({
                  limitation:
                    e.target.value === "plentiful"
                      ? `Plentiful (${plentifulN})`
                      : "-",
                })
              }
            >
              <MenuItem value="unique">Unique (-)</MenuItem>
              <MenuItem value="plentiful">Plentiful</MenuItem>
            </Select>
          </FormControl>
          {isPlentiful && (
            <TextField
              size="small"
              label="Count"
              type="number"
              slotProps={{ htmlInput: { min: 1 } }}
              value={plentifulN}
              onChange={(e) =>
                update({ limitation: `Plentiful (${e.target.value})` })
              }
              sx={{ width: 100 }}
            />
          )}
        </Stack>
      </Section>
    </Box>
  );
}
