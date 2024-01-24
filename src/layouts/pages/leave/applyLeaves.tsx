import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
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
import { TroubleshootSharp } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { Autocomplete } from "@mui/material";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
interface MyError {
  response?: {
    data?: {
      detail?: string;
    };
  };
}
const Applyleave = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const EmployeeData = useSelector((state: any) => state.employeeData);
  console.log("Employee", EmployeeData);
  const emoployee_name = [];

  if (EmployeeData && EmployeeData.length > 0) {
    const uniqueEmployeeDataNames = new Set();

    for (let i = 0; i < EmployeeData.length; i++) {
      const EmployeeDataName = EmployeeData[i]["email"];
      uniqueEmployeeDataNames.add(EmployeeDataName);
    }

    // Convert the Set to an array if needed
    emoployee_name.push(...uniqueEmployeeDataNames);
  }

  console.log(emoployee_name, "EmployeeDataName");
  const leavetype = useSelector((state: any) => state.leavetypeData);
  console.log("leavetype", leavetype);
  const leavetype_name = [];

  if (leavetype && leavetype.length > 0) {
    const uniqueleavetypeNames = new Set();

    for (let i = 0; i < leavetype.length; i++) {
      const leavetypeName = leavetype[i]["leave_type_name"];
      uniqueleavetypeNames.add(leavetypeName);
    }

    // Convert the Set to an array if needed
    leavetype_name.push(...uniqueleavetypeNames);
  }

  console.log(leavetype_name, "leavetypeName");
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      employee_name: "",
      leave_type: "",
      team_email: "",
      from_date: "",
      to_date: "",
      reason_for_leave: "",
      status: true,
    },

    onSubmit: (values, action) => {
      axios
        .post(
          "http://10.0.20.133:8000/apply_leave",
          {
            leave_type: values.leave_type,
            employee_email: values.employee_name,
            team_email: values.team_email,
            from_date: values.from_date,
            to_date: values.to_date,
            reason_for_leave: values.reason_for_leave,
            status: values.status,
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
          if (response.status === 200) {
            navigate("/pages/leave/list_view");
            message.success("Leave Applied successfully");
          }
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
          const myError = error as MyError;
          message.error(myError?.response?.data?.detail || "An unexpected error occurred");
        });
      console.log(values, "values");
      action.resetForm();
    },
  });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3} p={2}>
        <Grid item xs={12} sm={9}>
          <MDTypography variant="h5">{"Apply Leave "}</MDTypography>
        </Grid>
      </Grid>
      <Card>
        <form onSubmit={handleSubmit}>
          <MDBox py={4} pl={8}>
            <Grid container>
              <Grid sm={4} my={3}>
                <MDTypography>Employee ID</MDTypography>
              </Grid>
              <Grid sm={6} my={3}>
                {/* <MDInput
                  sx={{ width: "90%" }}
                  autoComplete="off"
                  variant="standard"
                  name="employee_name"
                  value={values.employee_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.employee_name && Boolean(errors.employee_name)}
                  helperText={touched.employee_name && errors.employee_name}
                /> */}
                <Autocomplete
                  // multiple
                  onChange={(event, value) => {
                    handleChange({ target: { name: "employee_name", value } });
                  }}
                  // value={department}
                  // onChange={handleMainFieldChange}
                  options={emoployee_name}
                  renderInput={(params) => (
                    <FormField
                      label={""}
                      InputLabelProps={{ shrink: true }}
                      name="employee_name"
                      onChange={handleChange}
                      value={values.employee_name}
                      {...params}
                      variant="standard"
                    />
                  )}
                />
              </Grid>

              <Grid sm={4} my={3}>
                <MDTypography>Leave Type</MDTypography>
              </Grid>
              <Grid sm={6} my={3}>
                <Autocomplete
                  // multiple
                  onChange={(event, value) => {
                    handleChange({ target: { name: "leave_type", value } });
                  }}
                  // value={department}
                  // onChange={handleMainFieldChange}
                  options={leavetype_name}
                  renderInput={(params) => (
                    <FormField
                      label={""}
                      InputLabelProps={{ shrink: true }}
                      name="leave_type"
                      onChange={handleChange}
                      value={values.leave_type}
                      {...params}
                      variant="standard"
                    />
                  )}
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
              <Grid sm={1} my={3}>
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

              <Grid container spacing={2} my={3}>
                <Grid ml={2}>
                  <MDButton variant="contained" color="info" type="submit">
                    Submit
                  </MDButton>
                </Grid>
                <Grid ml={2}>{/* <MDButton color="primary">Cancel</MDButton> */}</Grid>
              </Grid>
            </Grid>
          </MDBox>
        </form>
      </Card>
    </DashboardLayout>
  );
};

export default Applyleave;
