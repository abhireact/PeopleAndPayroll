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
import Link from "@mui/material/Link";
import Cookies from "js-cookie";
const token = Cookies.get("token");
import * as yup from "yup";

function CreatePage() {
  const [calculationType, setCalculation_type] = useState("Flat Amount");
  const validationSchema =
    calculationType === "Flat Amount"
      ? yup.object({
          earning_name: yup.string().required("Earning name should be provided"),
          display_name: yup.string().required("Display name should be provided"),
          enter_amount_or_percent: yup.number().required("Fix the format"),
        })
      : yup.object({
          earning_name: yup.string().required("Earning name should be provided"),
          display_name: yup.string().required("Display name should be provided"),
          enter_amount_or_percent: yup
            .number()
            .required("Percent should be provided")
            .min(0, "Value should be greater than or equal to 0")
            .max(100, "Value should be less than or equal to 100"),
        });

  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const initialValues = {
    earning_type_name: "",
    earning_name: "",
    display_name: "",
    calculation_type: "",
    enter_amount_or_percent: 0,
    mark_as_active: false,
    salary_directives: [] as string[],
    effictive_start_date: "",
    effictive_end_date: endDate,
    location_name: "Banglore",
    organization_name: "Mindcom",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        console.log("values", values);
        values.calculation_type =
          calculationType === "Flat Amount"
            ? "Flat Amount"
            : calculationType.replace("Percentage", "%");
        try {
          const response = await axios.post("http://10.0.20.133:8000/mg_earning_type", values, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            console.log("Created Earning Successfully");
            action.resetForm();
          }
        } catch (error) {
          console.error("Error saving data:", error);
        }
      },
    });
  useEffect(() => {
    if (values.earning_type_name === "Basic Salary") {
      const updatedsalary_directives = [
        "Show this component in payslip",
        "Consider for ESI Contribution",
        "Consider for EPF Contribution",
      ];
      // values.salary_directives.includes("Show this component in payslip");
      setFieldValue("salary_directives", updatedsalary_directives);
    } else {
      // Reset the salary_directives to an empty array if not Basic
      setFieldValue("salary_directives", []);
    }
  }, [values.earning_type_name]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card sx={{ width: "80%", margin: "auto", mt: "2%" }}>
          <MDBox p={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8}>
                <MDTypography variant="h5">Create Earning</MDTypography>
              </Grid>
              <Grid item xs={12} sm={4} display="flex" justifyContent="flex-end">
                <MDButton variant="gradient" color="info" type="submit">
                  {"Save"}
                </MDButton>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "earning_type_name", value } });
                  }}
                  options={[
                    "Basic Salary",
                    "House Rent Allowance",
                    "Dearness Allowance",
                    "Conveyance Allowance",
                    "Medical Allowance",
                    "Children Education Allowance",
                    "Leave Travel Allowance",
                  ]}
                  //   onChange={(e: any) => setearning_type_name(e.target.value)}
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="earning_type_name"
                      onChange={handleChange}
                      value={values.earning_type_name}
                      label="Earning Type "
                      {...params}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
        {values.earning_type_name != "" ? (
          <Card sx={{ width: "80%", margin: "auto", mt: "2%" }}>
            <MDBox p={3}>
              <Grid container spacing={3} pt={2}>
                <Grid item xs={12} sm={6}>
                  <FormField
                    label="Name "
                    name="earning_name"
                    value={values.earning_name}
                    placeholder="Enter Earning Name"
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.earning_name && Boolean(errors.earning_name)}
                    helperText={touched.earning_name && errors.earning_name}
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
                    onBlur={handleBlur}
                    error={touched.display_name && Boolean(errors.display_name)}
                    helperText={touched.display_name && errors.display_name}
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
                      value={values.enter_amount_or_percent}
                      name="enter_amount_or_percent"
                      onChange={handleChange}
                    />
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} pt={2}>
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
            <Grid container spacing={3} p={2}>
              <Grid item xs={12} sm={12} display="flex" justifyContent="flex-end">
                <Link href="/payrole/earning">
                  <MDButton variant="outlined" color="info">
                    {"Back to Earning"}
                  </MDButton>
                </Link>
                <MDButton variant="gradient" color="info" type="submit" pl={2}>
                  {"Save"}
                </MDButton>
              </Grid>
            </Grid>
          </Card>
        ) : null}
      </form>
    </>
  );
}

export default CreatePage;
