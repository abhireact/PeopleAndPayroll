import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import FormField from "layouts/applications/wizard/components/FormField";
import Checkbox from "@mui/material/Checkbox";
// import "./weekday.css";
import { useState, useEffect } from "react";
import { FormControlLabel, Card, Grid, Link } from "@mui/material";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Cookies from "js-cookie";
const token = Cookies.get("token");
function CreateEsi(props: any) {
  let initialValues = {
    esi_number: "",
    esi_deduction_cycle: "",
    employees_contribution: "",
    employers_contribution: "",
    esi_contribution_ctc: false,
  };
  const validationSchema = yup.object({
    esi_number: yup
      .string()
      .matches(/^\d{17}$/, "Please provide a valid 17-digit ESI number")
      .required("Please provide a valid ESI number"),
    esi_deduction_cycle: yup.string().required("Please provide ESI deduction cycle"),

    employees_contribution: yup
      .string()
      .required("Please provide the employee's contribution in percentage"),
    employers_contribution: yup
      .string()
      .required("Please provide the employer's contribution in percentage"),
  });
  if (props.data) {
    initialValues = props.data;
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        if (props.data) {
          try {
            const response = await axios.put(
              `http://10.0.20.133:8000/mg_esi/?esi_number=${props.data.esi_number}
            `,
              values,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.status === 200) {
              console.log("Update Successfully");
              action.resetForm();
              window.location.reload();
            }
          } catch (error) {
            console.error("Error saving data:", error);
          }
        } else {
          try {
            const response = await axios.post("http://10.0.20.133:8000/mg_esi", values, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            if (response.status === 200) {
              console.log("Create Successfully");
              action.resetForm();
              navigate("/payrole/salarycomponent/esi");
            }
          } catch (error) {
            console.error("Error saving data:", error);
          }
        }
      },
    });
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card sx={{ width: "80%", margin: "auto" }}>
          <MDBox p={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8}>
                <MDTypography variant="h5">Employees&apos; State Insurance</MDTypography>
              </Grid>
              <Grid item xs={12} sm={4} display="flex" justifyContent="flex-end">
                <Link href="esi" variant="body2">
                  <MDButton variant="gradient" color="info" type="submit">
                    {"save"}
                  </MDButton>
                </Link>
              </Grid>
            </Grid>
            <Grid container spacing={3} p={1}>
              <Grid item xs={12} sm={6}>
                <FormField
                  type="payslipname"
                  label="ESI Number*"
                  name="esi_number"
                  value={values.esi_number}
                  placeholder="Enter ESI Number"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.esi_number && Boolean(errors.esi_number)}
                  helperText={touched.esi_number && errors.esi_number}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  type="payslipname"
                  label="Deduction Cycle"
                  name="esi_deduction_cycle"
                  value={values.esi_deduction_cycle}
                  placeholder="Enter Deduction Cycle"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.esi_deduction_cycle && Boolean(errors.esi_deduction_cycle)}
                  helperText={touched.esi_deduction_cycle && errors.esi_deduction_cycle}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} p={1}>
              <Grid item xs={12} sm={6}>
                <FormField
                  type="payslipname"
                  label="Employee's Contribution % "
                  name="employees_contribution"
                  value={values.employees_contribution}
                  placeholder="Enter Employees' Contribution of gross pay in percent"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.employees_contribution && Boolean(errors.employees_contribution)}
                  helperText={touched.employees_contribution && errors.employees_contribution}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  type="payslipname"
                  label="Employer's Contribution % "
                  name="employers_contribution"
                  value={values.employers_contribution}
                  placeholder="Enter Employer's Contribution of gross pay in percent"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.employers_contribution && Boolean(errors.employers_contribution)}
                  helperText={touched.employers_contribution && errors.employers_contribution}
                />
              </Grid>
              <Grid item xs={12} sm={12} p={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.esi_contribution_ctc}
                      onChange={handleChange}
                      name="esi_contribution_ctc"
                      value={true}
                    />
                  }
                  label={
                    <MDTypography variant="body2">
                      Include employer&apos;s contribution in the CTC
                    </MDTypography>
                  }
                />
              </Grid>
            </Grid>
          </MDBox>

          <MDBox p={2} bgColor="#FFBF00" m={2}>
            <MDTypography variant="caption" color="black">
              Note: ESI deductions will be made only if the employee&apos;s monthly salary is less
              than or equal to ₹21,000. If the employee gets a salary revision which increases their
              monthly salary above ₹21,000, they would have to continue making ESI contributions
              till the end of the contribution period in which the salary was revised
              (April-September or October-March).
            </MDTypography>
          </MDBox>
        </Card>
      </form>
    </DashboardLayout>
  );
}

export default CreateEsi;
