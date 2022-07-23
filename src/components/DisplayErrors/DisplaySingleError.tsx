import Box from "@mui/material/Box";
import { Alert } from "@mui/material";

const DisplaySingleError = ({error}: {error: string}) => {
  return <Box p={1}>
    <Alert severity="error">{error}</Alert>
  </Box>
}
export default DisplaySingleError;
