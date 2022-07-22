import {
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Select,
  TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import {CheckOutlined} from "@ant-design/icons";
import {Formik, FormikErrors, FormikValues} from "formik";
import {getValidationErrorsAsJsonFromArray} from "../../config/helpers/functions";
import {registerValidationSchema} from "../../config/validations/registerValidationSchema";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import {VisibilityOffOutlined, VisibilityOutlined} from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import {IRegisterFormProps, RegisterCredentials} from "../../config/interfaces/props/IRegisterFormProps";

const RegisterForm = ({onSubmit}: IRegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Formik
      isInitialValid={false}
      initialValues={{
        name: '',
        email: '',
        password: '',
        type: 'traveler'
      }}
      validationSchema={registerValidationSchema}
      onSubmit={async (values, {setSubmitting, setErrors}) => {
        try {
          await onSubmit(values as RegisterCredentials);
        } catch (e: any) {
          const errors: FormikErrors<FormikValues>[] = getValidationErrorsAsJsonFromArray(e?.response?.data?.errors || []);
          // @ts-ignore
          setErrors(errors);
        }
        setSubmitting(false);
      }}
    >
      {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
        }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent={"center"}>
            <Grid item xs={12}>
              <TextField
                fullWidth={true}
                error={!!(errors.name && touched.name)}
                helperText={errors.name}
                id="name"
                label="Name"
                variant="outlined"
                type={"text"}
                name={"name"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth={true}
                error={!!(errors.email && touched.email)}
                helperText={errors.email}
                id="email"
                label="Email"
                variant="outlined"
                type={"email"}
                name={"email"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </Grid>
            <Grid item xs={12}>

              <FormControl
                fullWidth={true}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? 'text' : 'password'}
                  fullWidth={true}
                  error={!!(errors.password && touched.password)}
                  id="password"
                  label="Password"
                  name={"password"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(prev => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText
                  variant={"outlined"}
                  error={!!(errors.password && touched.password)}
                  >
                  {errors.password}
                </FormHelperText>

              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="user-type-label">Type</InputLabel>
                <Select
                  labelId="user-type-label"
                  id="user-type"
                  name={"type"}
                  value={values.type}
                  label="Type"
                  onChange={handleChange}
                >
                  <MenuItem value={"traveler"}>Traveler</MenuItem>
                  <MenuItem value={"company"}>Company</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <LoadingButton
                  type="submit"
                  disabled={!isValid}
                  loading={isSubmitting}
                  variant={"contained"}>
                  Register
                  <CheckOutlined/>
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  )
}
export default RegisterForm;
