import axios from "axios";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import Cookies from "js-cookie";

const UpdateApplyleave = (props: any) => {
  const token = Cookies.get("token");

  console.log("token", token);
  const { openUpdate, setOpenupdate, data } = props;
  console.log(data, "data");

  const handleCloseupdate = () => {
    setOpenupdate(false);
  };
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      employee_name: data?.employee_name,
      employee_email: data?.employee_email,
      leave_type: data?.leave_type,
      team_email: data?.team_email,
      from_date: data?.from_date,
      to_date: data?.to_date,
      reason_for_leave: data?.reason_for_leave,
      manager_reason: data.manager_reason,
      created_at: data?.created_at,
      status: true,
    },
    onSubmit: (values, action) => {
      axios
        .put(
          "http://10.0.20.133:8000/apply_leave",
          {
            ...values,
            old_from_date: data?.from_date,
            old_to_date: data?.to_date,
            old_email: data?.employee_email,
            old_status: true,
            old_team_email: data?.team_email,
            old_reason_leave: data?.reason_for_leave,
            old_leave_type: data?.leave_type,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(values, "values");
      action.resetForm();
    },
  });
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <MDBox py={4} pl={8}>
          <Grid container>
            <Grid sm={4} my={3}>
              <MDTypography>Employee ID</MDTypography>
            </Grid>
            <Grid sm={6} my={3}>
              <MDInput
                sx={{ width: "90%" }}
                autoComplete="off"
                variant="standard"
                name="employee_name"
                value={values.employee_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.employee_name && Boolean(errors.employee_name)}
                helperText={touched.employee_name && errors.employee_name}
              />
            </Grid>

            <Grid sm={4} my={3}>
              <MDTypography>Leave Type</MDTypography>
            </Grid>
            <Grid sm={6} my={3}>
              <MDInput
                sx={{ width: "90%" }}
                autoComplete="off"
                variant="standard"
                name="leave_type"
                value={values.leave_type}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.leave_type && Boolean(errors.leave_type)}
                helperText={touched.leave_type && errors.leave_type}
              />
            </Grid>

            <Grid sm={3} my={3}>
              <MDTypography>Date</MDTypography>
            </Grid>
            <Grid sm={3} my={3}>
              <MDInput
                type="date"
                name="from_date"
                variant="standard"
                value={values.from_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.from_date && Boolean(errors.from_date)}
                helperText={touched.from_date && errors.from_date}
              />
            </Grid>
            <Grid sm={1} my={3} px={1}>
              to
            </Grid>
            <Grid sm={3} my={3}>
              <MDInput
                type="date"
                name="to_date"
                variant="standard"
                value={values.to_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.to_date && Boolean(errors.to_date)}
                helperText={touched.to_date && errors.to_date}
              />
            </Grid>

            <Grid sm={4} my={3}>
              <MDTypography>Team Email ID</MDTypography>
            </Grid>
            <Grid sm={6} my={3}>
              <MDInput
                sx={{ width: "90%" }}
                autoComplete="off"
                variant="standard"
                name="team_email"
                value={values.team_email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.team_email && Boolean(errors.team_email)}
                helperText={touched.team_email && errors.team_email}
              />
            </Grid>
            <Grid sm={4} my={3}>
              <MDTypography>Reason for Leave</MDTypography>
            </Grid>
            <Grid sm={6} my={3}>
              <MDInput
                multiline
                rows={3}
                sx={{ width: "90%" }}
                autoComplete="off"
                variant="outlined"
                name="reason_for_leave"
                value={values.reason_for_leave}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.reason_for_leave && Boolean(errors.reason_for_leave)}
                helperText={touched.reason_for_leave && errors.reason_for_leave}
              />
            </Grid>
            <Grid sm={5} my={2}>
              <MDTypography>Reason for Edit</MDTypography>
            </Grid>
            <Grid sm={6} my={2}>
              <MDInput
                name="manager_reason"
                value={values.manager_reason}
                onChange={handleChange}
                variant="standard"
              />
            </Grid>
            <Grid container spacing={2} my={3}>
              <Grid ml={2}>
                <MDButton
                  variant="contained"
                  color="info"
                  type="submit"
                  onClick={() => {
                    handleCloseupdate();
                  }}
                >
                  Submit
                </MDButton>
              </Grid>
              <Grid ml={2}>
                <MDButton
                  color="primary"
                  onClick={() => {
                    handleCloseupdate();
                  }}
                >
                  Cancel
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
      </form>
    </Card>
  );
};

export default UpdateApplyleave;
