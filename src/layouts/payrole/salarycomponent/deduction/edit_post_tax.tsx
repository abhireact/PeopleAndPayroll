import { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import StepLabel from "@mui/material/StepLabel";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import FormField from "layouts/applications/wizard/components/FormField";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import {
  TextField,
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Card,
  Grid,
  //   Checkbox,
  Divider,
} from "@mui/material";
import { Field, useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import React from "react";
import Cookies from "js-cookie";
const token = Cookies.get("token");
function CreatePage(props: any) {
  const initialValues = props.data;
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      try {
        const response = await axios.put(
          `http://10.0.20.133:8000/mg_post_tax_deduction/?name_in_payslip=${props.data.name_in_payslip}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log("Updated post-tax Successfully");
          action.resetForm();
        }
      } catch (error) {
        console.error("Error saving data:", error);
      }
    },
  });
  const handleFormSubmit = async () => {
    console.log(values, "submit values");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card sx={{ width: "100%", margin: "auto", mt: "2%" }}>
        <MDBox p={3}>
          <Grid item xs={12} sm={9} mb={2}>
            <MDTypography variant="h5">New Post-Tax Deduction</MDTypography>
          </Grid>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12} sm={12}>
              <FormField
                label="Name in Payslip*"
                name="name_in_payslip"
                value={values.name_in_payslip}
                placeholder="Enter Payslip Name"
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </MDBox>

        <Grid item xs={12}>
          <Grid item xs={12} pl={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.one_time_deduction}
                  onChange={handleChange}
                  name="one_time_deduction"
                  value={true}
                />
              }
              label="One-time deduction"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={values.recurring_deduction}
                  onChange={handleChange}
                  name="recurring_deduction"
                  value={true}
                />
              }
              label="Recurring deduction for subsequent Payrolls"
            />
          </Grid>
          <Grid item xs={12} sm={6} pl={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.mark_as_active}
                  onChange={handleChange}
                  name="mark_as_active"
                  value={true}
                />
              }
              label="Mark this as Active"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3} p={3} display="flex" justifyContent="flex-end">
          <MDButton variant="gradient" color="info" type="submit" onClick={handleFormSubmit}>
            {"Save"}
          </MDButton>
        </Grid>
      </Card>
    </form>
  );
}

export default CreatePage;
