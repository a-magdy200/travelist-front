import Box from "@mui/material/Box";
import DisplaySingleError from "./DisplaySingleError";

const DisplayErrorsList = ({errors}: {errors: string[]}) => {
  return <Box p={1}>
    {errors.map((error, index) => <DisplaySingleError key={index} error={error} />)}
  </Box>
}
export default DisplayErrorsList;
