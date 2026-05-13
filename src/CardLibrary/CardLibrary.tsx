import { Box, Button, FormControl, MenuItem, Select } from "@mui/material";

interface Props {
  savedCards: Array<{ id: string; label: string }>;
  currentId: string | null;
  onSave: () => void;
  onNew: () => void;
  onLoad: (id: string) => void;
  onDelete: () => void;
}

export default function CardLibrary({
  savedCards,
  currentId,
  onSave,
  onNew,
  onLoad,
  onDelete,
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 2,
        py: 1,
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "grey.50",
        flexShrink: 0,
        flexWrap: "wrap",
      }}
    >
      <FormControl size="small" sx={{ flex: 1, minWidth: 150 }}>
        <Select
          value={currentId ?? ""}
          displayEmpty
          onChange={(e) => {
            if (e.target.value) onLoad(e.target.value as string);
          }}
        >
          <MenuItem value="" disabled>
            — New card —
          </MenuItem>
          {savedCards.map((entry) => (
            <MenuItem key={entry.id} value={entry.id}>
              {entry.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        size="small"
        variant="contained"
        disableElevation
        onClick={onSave}
      >
        {currentId ? "Overwrite" : "Save"}
      </Button>
      <Button size="small" variant="outlined" onClick={onNew}>
        New
      </Button>
      {currentId && (
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={onDelete}
        >
          Delete
        </Button>
      )}
    </Box>
  );
}
