import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { IResponseInterface } from "../../config/interfaces/IResponse.interface";
import { ICompanyInterface } from "../../config/interfaces/ICompany.interface";
import api from "../../config/api";
import Loader from "../../components/Loader";

const EditCompany = () => {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const getMyProfile = async () => {
    try {
      const response: IResponseInterface<ICompanyInterface> =
        await api<ICompanyInterface>({
          url: `/api/companies/profile`,
        })

      if (response.success) {
        if (response.data) {
          setDescription(response.data.description)
        }
      }
    } catch (error: any) {
      console.log(error)
    }
  }
  useEffect(() => {
    getMyProfile().then(() => {
      setIsLoading(false);
    })
  }, [])
  async function sendData(e: any) {
    e.preventDefault();
      try {
        setIsLoading(true);
        const response: IResponseInterface<any> = await api<any>({
          method: "PUT",
          body:{ description },
          url: '/api/companies/'
        });
        setIsLoading(false);
        console.log(response);
      } catch (error) {
        console.log(error);
    }
  }

  if (isLoading) {
    return <Loader/>
  }
  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div className="left">
        <form onSubmit={sendData}>
          <h2>Edit Details</h2>
          <Box mb={2}>
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              size="small"
              multiline
              fullWidth
              maxRows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Box>
          <Button variant="contained" type="submit">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditCompany;
