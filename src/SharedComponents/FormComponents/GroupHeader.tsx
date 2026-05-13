import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";

export function GroupHeader({
  index,
  uniqueOnly,
  excludePeon,
  excludeSummonToken,
  onChange,
  onRemove,
}: {
  index: number;
  uniqueOnly: boolean;
  excludePeon: boolean;
  excludeSummonToken: boolean;
  onChange: (
    patch: Partial<{
      uniqueOnly: boolean;
      excludePeon: boolean;
      excludeSummonToken: boolean;
    }>,
  ) => void;
  onRemove: () => void;
}) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 0.5,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Group {index + 1}
        </Typography>
        <Button size="small" color="error" onClick={onRemove}>
          Remove Group
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={uniqueOnly}
              onChange={(e) => onChange({ uniqueOnly: e.target.checked })}
            />
          }
          label={<Typography variant="body2">Unique models only</Typography>}
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={excludePeon}
              onChange={(e) => onChange({ excludePeon: e.target.checked })}
            />
          }
          label={<Typography variant="body2">Non-Peon only</Typography>}
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={excludeSummonToken}
              onChange={(e) =>
                onChange({ excludeSummonToken: e.target.checked })
              }
            />
          }
          label={<Typography variant="body2">Exclude Summon token</Typography>}
        />
      </Box>
    </>
  );
}
