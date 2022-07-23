import {Grid, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import {CheckOutlined} from "@ant-design/icons";
import {Formik, FormikErrors, FormikValues} from "formik";
import {getValidationErrorsAsJsonFromArray} from "../../config/helpers/functions";
import {ILoginFormProps} from "../../config/interfaces/props/ILoginFormProps";
import {loginValidationSchema} from "../../config/validations/loginValidationSchema";

const LoginForm = ({onSubmit}: ILoginFormProps) => {
  return (
    <Formik
      isInitialValid={false}
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={loginValidationSchema}
      onSubmit={async (values, {setSubmitting, setErrors}) => {
        try {
          await onSubmit(values);
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box p={2}>
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
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box p={2}>
              <TextField
                fullWidth={true}
                error={!!(errors.password && touched.password)}
                helperText={errors.password}
                id="password"
                label="Password"
                variant="outlined"
                type={"password"}
                name={"password"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <LoadingButton
                  type="submit"
                  disabled={!isValid}
                  loading={isSubmitting}
                  variant={"contained"}>
                  Login
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
export default LoginForm;
