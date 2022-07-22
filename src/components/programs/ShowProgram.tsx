import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Loader from "../Loader";
import { IProgramShowProps } from "../../config/interfaces/IProgramShowProps.interface";
import ProgramDataComponent from "./ProgramData";
import Box from "@mui/material/Box";

const ShowProgramComponent = ({ program }: IProgramShowProps) => {
  return (
    <div>
      {program ? (
        <div>
          <Box mb={2} display={"flex"} alignItems={"center"}>
            <Link to={`/program/list`}>
              <Button className="createButton" variant="contained">
                Back
              </Button>
            </Link>
            <Box ml={2}>
              <Link to={`/cycle/create/${program.id}`}>
                <Button className="createButton" variant="contained">
                  Create Cycle
                </Button>
              </Link>
            </Box>
          </Box>

          <ProgramDataComponent program={program} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default ShowProgramComponent;
