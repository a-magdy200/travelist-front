import {FormControl, FormHelperText, Grid, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import {CheckOutlined} from "@ant-design/icons";
import {Formik, FormikErrors, FormikValues} from "formik";
import {getValidationErrorsAsJsonFromArray} from "../../config/helpers/functions";
import useAuth from "../../hooks/useAuth";
import IconButton from "@mui/material/IconButton";
import {VisibilityOffOutlined, VisibilityOutlined} from "@mui/icons-material";
import {useState} from "react";
import { passwordValidationSchema } from "../../config/validations/userValidationSchema";

const ChangePasswordForm = () => {
  const {changePassword} = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Formik
      isInitialValid={false}
      initialValues={{password: ''}}
      validationSchema={passwordValidationSchema}
      onSubmit={async (values, {setSubmitting, setErrors}) => {
        try {
          await changePassword(values.password);
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
            <Grid item xs={8}>
              <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <LoadingButton
                  type="submit"
                  disabled={!isValid}
                  loading={isSubmitting}
                  variant={"contained"}>
                  Submit
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
export default ChangePasswordForm;
