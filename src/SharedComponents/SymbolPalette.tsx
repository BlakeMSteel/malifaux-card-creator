import { Box, IconButton, Tooltip } from "@mui/material";
import { ALL_SYMBOLS } from "../symbols";
import { insertAtCursor } from "./insertAtCursor";

export default function SymbolPalette() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 0.5,
        px: 2,
        py: 1,
        bgcolor: "grey.50",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      {ALL_SYMBOLS.map((sym) => (
        <Tooltip key={sym.token} title={sym.token} disableInteractive>
          <IconButton
            size="small"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => insertAtCursor(sym.token)}
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              bgcolor: "background.paper",
            }}
          >
            {sym.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
}
