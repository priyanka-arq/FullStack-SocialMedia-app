import "./Loading.css";
import { CircularProgress } from "@material-ui/core";
import Stack from "@mui/material/Stack";

export const CircularColor = () => {
  return (
    <Stack
      sx={{ color: "grey.500" }}
      spacing={2}
      direction="row"
      className="loadingIcons"
    >
      <CircularProgress color="secondary" />
      <CircularProgress color="success" />
      <CircularProgress color="inherit" />
    </Stack>
  );
};
