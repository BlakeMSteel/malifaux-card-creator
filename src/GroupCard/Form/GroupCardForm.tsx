import { useState } from "react";
import type {
  CardGroupData,
  SavedCardEntry,
  SavedCrewCardEntry,
  SavedUpgradeCardEntry,
} from "../../types";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

interface Props {
  group: CardGroupData;
  onChange: (group: CardGroupData) => void;
  statCards: SavedCardEntry[];
  crewCards: SavedCrewCardEntry[];
  upgradeCards: SavedUpgradeCardEntry[];
  onExport: () => void;
  onImport: () => void;
  onExportPdf: () => void;
  pdfExporting: boolean;
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

function AddCardList({
  label,
  available,
  selectedIds,
  onAdd,
  onRemove,
}: {
  label: string;
  available: Array<{ id: string; label: string }>;
  selectedIds: string[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const [pending, setPending] = useState("");
  const addable = available.filter((e) => !selectedIds.includes(e.id));

  return (
    <Stack spacing={1}>
      <List dense disablePadding>
        {selectedIds.map((id) => {
          const entry = available.find((e) => e.id === id);
          return (
            <ListItem
              key={id}
              disableGutters
              secondaryAction={
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onRemove(id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              }
            >
              <ListItemText primary={entry?.label ?? "(missing card)"} />
            </ListItem>
          );
        })}
      </List>
      <Stack direction="row" spacing={1}>
        <FormControl
          size="small"
          sx={{ flex: 1 }}
          disabled={addable.length === 0}
        >
          <InputLabel>{label}</InputLabel>
          <Select
            label={label}
            value={pending}
            onChange={(e) => setPending(e.target.value)}
          >
            {addable.map((e) => (
              <MenuItem key={e.id} value={e.id}>
                {e.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddIcon />}
          disabled={!pending}
          onClick={() => {
            onAdd(pending);
            setPending("");
          }}
        >
          Add
        </Button>
      </Stack>
    </Stack>
  );
}

export default function GroupCardForm({
  group,
  onChange,
  statCards,
  crewCards,
  upgradeCards,
  onExport,
  onImport,
  onExportPdf,
  pdfExporting,
}: Props) {
  const update = (patch: Partial<CardGroupData>) =>
    onChange({ ...group, ...patch });

  return (
    <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ p: 2 }}>
      <Stack direction="row" spacing={1} sx={{ mb: 2.5, flexWrap: "wrap" }}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<ContentPasteIcon />}
          onClick={onImport}
        >
          Import
        </Button>
        <Button
          size="small"
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={onExport}
        >
          Export
        </Button>
        <Button
          size="small"
          variant="outlined"
          startIcon={<PictureAsPdfIcon />}
          onClick={onExportPdf}
          disabled={pdfExporting}
        >
          {pdfExporting ? "Generating…" : "Export PDF"}
        </Button>
      </Stack>

      <Section title="Group Info">
        <TextField
          size="small"
          fullWidth
          label="Name"
          placeholder="Group Name"
          value={group.name}
          onChange={(e) => update({ name: e.target.value })}
        />
      </Section>

      <Section title="Crew Card">
        <FormControl size="small" fullWidth>
          <InputLabel>Crew</InputLabel>
          <Select
            label="Crew"
            value={group.crewCardId ?? ""}
            onChange={(e) =>
              update({ crewCardId: (e.target.value as string) || null })
            }
          >
            <MenuItem value="">(none)</MenuItem>
            {crewCards.map((e) => (
              <MenuItem key={e.id} value={e.id}>
                {e.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Section>

      <Section title="Model Cards">
        <AddCardList
          label="Add model"
          available={statCards}
          selectedIds={group.statCardIds}
          onAdd={(id) => update({ statCardIds: [...group.statCardIds, id] })}
          onRemove={(id) =>
            update({
              statCardIds: group.statCardIds.filter((x) => x !== id),
            })
          }
        />
      </Section>

      <Section title="Upgrade Cards">
        <AddCardList
          label="Add upgrade"
          available={upgradeCards}
          selectedIds={group.upgradeCardIds}
          onAdd={(id) =>
            update({ upgradeCardIds: [...group.upgradeCardIds, id] })
          }
          onRemove={(id) =>
            update({
              upgradeCardIds: group.upgradeCardIds.filter((x) => x !== id),
            })
          }
        />
      </Section>
    </Box>
  );
}
