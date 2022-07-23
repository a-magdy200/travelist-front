import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField/TextField";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import api from "../../config/api";
import { ITravelerRegisterRequestBody } from "../../config/interfaces/ITravelerRegisterRequestBody";
import { UserType } from "../../config/types/user.type";
import { GenderType } from "../../config/types/gender.type";
import { IResponseInterface } from "../../config/interfaces/IResponse.interface";
import { IUserAuthenticationResponse } from "../../config/interfaces/IUserAuthenticationResponse.interface";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useAuth from "../../hooks/useAuth";
import { ICompanyRegisterRequestBody } from "../../config/interfaces/ICompanyRegisterRequestBody";
import CustomInputField from "../../components/Form/CustomInputField";
import { formatDate } from "../../config/helpers/formatDateFunction";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Grid";
import { ReactComponent as LoginImage } from "../../assets/images/login.svg";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import DisplayErrorsList from "../../components/DisplayErrors/DisplayErrorsList";

function Register() {
  const [name, set_name] = useState("");
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [confirm_password, set_confirm_password] = useState("");
  const [address, set_address] = useState("");
  const [type, set_type] = useState<UserType>("traveler");
  const [gender, set_gender] = useState<GenderType>("male");
  const [national_id, set_national_id] = useState("");
  const [is_guide, set_is_guide] = useState(false);
  const [date_of_birth, set_date_of_birth] = useState("");
  const [description, set_description] = useState("");
  const { makeAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  async function sendData(e: any) {
    e.preventDefault();
    setIsLoading(true);
    toast.info("Register....");
    setErrors([]);
    let checkSubmit = true;

    if (password !== confirm_password) {
      checkSubmit = false;
    }

    if (checkSubmit) {
      try {
        let response: IResponseInterface<IUserAuthenticationResponse>;
        if (type === "traveler") {
          const requestBody: ITravelerRegisterRequestBody = {
            name,
            email,
            password,
            address,
            type,
            national_id,
            date_of_birth,
            gender,
            is_guide: is_guide ? '1' : '0'
          };

          response = await api<IUserAuthenticationResponse>({
            url: "/auth/register",
            method: "POST",
            body: JSON.stringify(requestBody)
          });
        } else {
          const requestBody: ICompanyRegisterRequestBody = {
            name,
            email,
            password,
            address,
            type,
            description
          };

          response = await api<IUserAuthenticationResponse>({
            url: "/auth/register",
            method: "POST",
            body: JSON.stringify(requestBody)
          });
        }
        if (response.success) {
          if (response.data) {
            makeAuth(response.data);
          }
        }
        toast.success("Account Created.");

      } catch (error: any) {
        setErrors(error?.response?.data?.errors || []);
        toast.error("An error has occurred");
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 10000);
    }
    setIsLoading(false);

  }

  if (isLoading) {
    return <Loader/>
  }
  return (
    <Grid container spacing={2}>
      <Grid md={6} xs={12}>
        <Card variant={"outlined"}>
          <form onSubmit={sendData}>
            <CardContent>
              <h2>Register Now</h2>
              <DisplayErrorsList errors={errors} />
              <Box mb={2}>
                <CustomInputField
                  type={"text"}
                  label={"Username"}
                  value={name}
                  setValue={set_name}
                />
              </Box>

              <Box mb={2}>
                <CustomInputField
                  type={"email"}
                  label={"Email"}
                  value={email}
                  setValue={set_email}
                />
              </Box>

              <Box mb={2}>
                <CustomInputField
                  type={"password"}
                  label={"Password"}
                  value={password}
                  setValue={set_password}
                />
              </Box>

              <Box mb={2}>
                <CustomInputField
                  type={"password"}
                  label={"Confirm Password"}
                  value={confirm_password}
                  setValue={set_confirm_password}
                />
              </Box>
              <Box mb={2}>
                <CustomInputField
                  type={"text"}
                  label={"Address"}
                  value={address}
                  setValue={set_address}
                />
              </Box>
              <Box mb={2}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label type">
                    User Type
                  </FormLabel>
                  <RadioGroup
                    row
                    id="type"
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue="traveler"
                    onChange={(e) => {
                      set_type(e.target.value as UserType);
                    }}
                  >
                    <FormControlLabel
                      value="traveler"
                      control={<Radio />}
                      label="Traveler"
                    />
                    <FormControlLabel
                      value="company"
                      control={<Radio />}
                      label="Company"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              {type === "traveler" ? (
                <Box>
                  <Box mb={2}>
                    <CustomInputField
                      type={"text"}
                      label={"National Id"}
                      value={national_id}
                      setValue={set_national_id}
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label gender">
                        Gender
                      </FormLabel>
                      <RadioGroup
                        row
                        value={gender}
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={(e) => {
                          set_gender(e.target.value as GenderType);
                        }}
                      >
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  <Box mb={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="yyyy-MM-dd"
                        label="Date of Birth"
                        value={date_of_birth}
                        onChange={(newValue) => {
                          if (newValue) {
                            set_date_of_birth(formatDate(newValue));
                          }
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Box>
                  <Box mb={2}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Is Guide"
                      onChange={(e) => {
                        set_is_guide(!is_guide);
                      }}
                    />
                  </Box>
                </Box>
              ) : (
                <Box mb={2}>
                  <CustomInputField
                    type={"text"}
                    label={"Description"}
                    value={description}
                    setValue={set_description}
                  />
                </Box>
              )}
            </CardContent>

            <CardActions>
              <LoadingButton
                // disabled={isDisabled()}
                loading={isLoading}
                variant="contained"
                type="submit"
              >
                Register
              </LoadingButton>
            </CardActions>
          </form>
        </Card>
      </Grid>
      <Grid item md={6} xs={12}>
        <LoginImage width={"100%"} />
      </Grid>
    </Grid>
  );
}

export default Register;
