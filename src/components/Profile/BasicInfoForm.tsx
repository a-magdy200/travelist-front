import {Grid, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import {CheckOutlined} from "@ant-design/icons";
import {Formik, FormikErrors, FormikValues} from "formik";
import {getValidationErrorsAsJsonFromArray} from "../../config/helpers/functions";
import useAuth from "../../hooks/useAuth";
import {userValidationSchema} from "../../config/validations/userValidationSchema";

const BasicInfoForm = () => {
  const {user, updateUser} = useAuth();
  return (
    <Formik
      isInitialValid={false}
      initialValues={user}
      validationSchema={userValidationSchema}
      onSubmit={async (values, {setSubmitting, setErrors}) => {
        try {
          await updateUser(values);
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
            <Grid item xs={8}>
              <TextField
                fullWidth={true}
                error={!!(errors.name && touched.name)}
                helperText={errors.name}
                id="hotel-name"
                label="Name"
                variant="outlined"
                type={"text"}
                name={"name"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth={true}
                error={!!(errors.address && touched.address)}
                helperText={errors.address}
                id="hotel-address"
                label="Address"
                variant="outlined"
                type={"text"}
                name={"address"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
              />
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
export default BasicInfoForm;
