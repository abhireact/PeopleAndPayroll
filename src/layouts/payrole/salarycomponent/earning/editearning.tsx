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
import MDAlert from "components/MDAlert";
import Cookies from "js-cookie";

const token = Cookies.get("token");
function EditPage(props: any) {
  const [calculationType, setCalculation_type] = useState("Flat Amount");
  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const initialValues = props.data;
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.put(
            `http://10.0.20.133:8000/mg_earning_type/?earning_type_name=${props.data.earning_type_name}&location_name=${props.data.location_name}`,
            values,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            console.log("Updated Successfully");
            history.go(0);
            action.resetForm();
          }
        } catch (error) {
          console.error("Error saving data:", error);
        }
      },
    });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} p={2}>
          <Grid item xs={12} sm={8}>
            <MDTypography variant="h5">Earning</MDTypography>
          </Grid>
          <Grid item xs={12} sm={4} display="flex" justifyContent="flex-end">
            <MDButton variant="gradient" color="info" type="submit">
              {"save"}
            </MDButton>
          </Grid>
        </Grid>
        {values.earning_type_name != "" ? (
          <Card sx={{ width: "100%", margin: "auto" }}>
            <MDBox px={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormField
                    label="Name "
                    name="earning_name"
                    value={values.earning_name}
                    placeholder="Enter Earning Name"
                    variant="standard"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormField
                    label="Display Name "
                    name="display_name"
                    value={values.display_name}
                    placeholder="Enter Earning Display Name"
                    variant="standard"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              {values.earning_type_name == "Basic Salary" && values.mark_as_active == false ? (
                <Grid container spacing={3} pt={3}>
                  <Grid item xs={12} sm={6}>
                    <MDTypography
                      component="label"
                      variant="button"
                      fontWeight="regular"
                      color="text"
                    >
                      Effective Start Date
                    </MDTypography>
                    <MDInput
                      type="date"
                      // format="dd/mm/yyyy"
                      // defaultValue="12/03/3032"
                      variant="standard"
                      sx={{ width: "100%" }}
                      value={values.effictive_start_date}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography
                      component="label"
                      variant="button"
                      fontWeight="regular"
                      color="text"
                    >
                      Effective End Date
                    </MDTypography>
                    <MDInput
                      type="date"
                      variant="standard"
                      sx={{ width: "100%" }}
                      value={endDate}
                      onChange={(e: any) => setEndDate(e.target.value)}
                    />
                  </Grid>
                </Grid>
              ) : null}
              <Grid container spacing={3} pt={3}>
                <Grid item xs={12} sm={6}>
                  <MDTypography variant="caption" fontWeight="regular" color="text">
                    Calculation Type*
                    <RadioGroup
                      row
                      defaultValue="Flat Amount"
                      name="radio-buttons-group"
                      onChange={(e) => setCalculation_type(e.target.value)}
                    >
                      <FormControlLabel
                        value="Flat Amount"
                        control={<Radio />}
                        label="Flat Amount"
                      />
                      <FormControlLabel
                        value={
                          values.earning_type_name === "Basic Salary"
                            ? "Percentage of CTC"
                            : "Percentage of Basic"
                        }
                        control={<Radio />}
                        label={
                          values.earning_type_name === "Basic Salary"
                            ? "Percentage of CTC"
                            : "Percentage of Basic"
                        }
                      />
                    </RadioGroup>
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDTypography variant="caption" fontWeight="regular" color="text">
                    {calculationType == "Flat Amount" ? "Enter Amount" : "Enter Percentage"}
                    <br />
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      type="number"
                      name="enter_amount_or_percent"
                      onChange={handleChange}
                    />
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} m={1}>
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
            </MDBox>
            <hr />
            <Grid item xs={12}>
              <MDTypography variant="h6" display="flex" justifyContent="center">
                Salary Directives
              </MDTypography>
              <Grid item xs={12} pl={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.salary_directives.includes("This is a taxable earning")}
                      onChange={handleChange}
                      name="salary_directives"
                      value="This is a taxable earning"
                    />
                  }
                  label="This is a taxable earning"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.salary_directives.includes("Attendance Dependant (LOP)")}
                      onChange={handleChange}
                      name="salary_directives"
                      value="Attendance Dependant (LOP)"
                    />
                  }
                  label="Attendance Dependant (LOP)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.salary_directives.includes("Part of CTC")}
                      onChange={handleChange}
                      name="salary_directives"
                      value="Part of CTC"
                    />
                  }
                  label="Part of CTC"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.salary_directives.includes(
                        "Make this earning a part of the employee’s salary structure"
                      )}
                      onChange={handleChange}
                      name="salary_directives"
                      value="Make this earning a part of the employee’s salary structure"
                    />
                  }
                  label="Make this earning a part of the employee’s salary structure"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.salary_directives.includes("Show this component in payslip")}
                      onChange={handleChange}
                      name="salary_directives"
                      value="Show this component in payslip"
                    />
                  }
                  disabled={values.earning_type_name == "Basic Salary"}
                  label="Show this component in payslip"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.salary_directives.includes("Consider for ESI Contribution")}
                      onChange={handleChange}
                      name="salary_directives"
                      value="Consider for ESI Contribution"
                    />
                  }
                  label="Consider for ESI Contribution"
                  disabled={values.earning_type_name == "Basic Salary"}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.salary_directives.includes("Consider for EPF Contribution")}
                      onChange={handleChange}
                      name="salary_directives"
                      value="Consider for EPF Contribution"
                    />
                  }
                  label="Consider for EPF Contribution"
                  disabled={values.earning_type_name == "Basic Salary"}
                />
              </Grid>
            </Grid>
          </Card>
        ) : null}
      </form>
    </>
  );
}

export default EditPage;
