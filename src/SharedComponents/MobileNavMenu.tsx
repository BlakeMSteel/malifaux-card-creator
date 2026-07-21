import { useState } from "react";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface Props<T extends string> {
  tabs: { value: T; label: string }[];
  activeTab: T;
  onSelect: (value: T) => void;
}

// Keeps its own open/closed state local so opening the menu doesn't force a
// re-render of whichever heavy card form/preview tree is currently active.
export default function MobileNavMenu<T extends string>({
  tabs,
  activeTab,
  onSelect,
}: Props<T>) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <Typography
        variant="button"
        sx={{
          display: { xs: "block", sm: "none" },
          color: "primary.main",
          lineHeight: 1,
        }}
      >
        {tabs.find((t) => t.value === activeTab)?.label}
      </Typography>
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        aria-label="Open navigation menu"
        color="primary"
        sx={{
          display: { xs: "inline-flex", sm: "none" },
          ml: "auto",
          mr: 1,
        }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        variant="menu"
        disableScrollLock
        transitionDuration={{ enter: 0, exit: 0 }}
      >
        {tabs.map((t) => (
          <MenuItem
            key={t.value}
            selected={t.value === activeTab}
            onClick={() => {
              onSelect(t.value);
              setAnchorEl(null);
            }}
            sx={{
              color: t.value === activeTab ? "primary.main" : "text.secondary",
            }}
          >
            {t.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
