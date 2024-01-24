import { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import StepLabel from "@mui/material/StepLabel";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import FormField from "layouts/applications/wizard/components/FormField";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
// import "./weekday.css";
// import Datedes from "./date";
import dayjs from "dayjs";

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
import axios from "axios";
import Cookies from "js-cookie";
import * as yup from "yup";
import validationSchema from "./org_tax_schema";

const token = Cookies.get("token");

let initialValues = {
  pan_name: "",
  tan_name: "",
  tds_orao_code: "",
  tax_payment_frequency: "",
  deductor_name: "",
  deductor_type: "",
  deductor_father_name: "",
  deductor_designation: "",
};

function Taxes() {
  const [savedata, setSaveData] = useState("create");
  const [pannumber, setPannumber] = useState("");
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://10.0.20.133:8000/mg_taxes", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log(response.data);
          initialValues = response.data[0];
          setSaveData("edit");
          setPannumber(response.data[0].pan_name);
          setEmployee(response.data[0].deductor_name);
        }
      } catch (error) {
        // console.error(error);
        console.log("Data not found");
      }
    };
    fetchData();
    const fetchEmp = async () => {
      await axios
        .get("http://10.0.20.133:8000/employee", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data, "data");
          const data = response.data;
          let namesArray: string[] = [];
          data.forEach((emp: any) => {
            let fullName = "";

            if (emp.first_name) {
              fullName += emp.first_name;
            }

            if (emp.last_name) {
              fullName += " " + emp.last_name;
            }

            namesArray.push(fullName.trim());
          });
          setEmployees(namesArray);

          if (response.status === 404) {
            console.error("No Data Available");
          }
        });
    };
    fetchEmp();
  }, []);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        if (savedata === "create") {
          handleFormSubmit();
        } else {
          handleFormEditSubmit();
        }
      },
    });
  //   console.log(values, calculationtype, date, endDate);
  const handleFormSubmit = async () => {
    console.log({ ...values }, "submit values");
    try {
      let sendData = values;

      const response = await axios.post("http://10.0.20.133:8000/mg_taxes", sendData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("Employee Created Successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleFormEditSubmit = async () => {
    try {
      let sendData = values;

      const response = await axios.put(
        `http://10.0.20.133:8000/mg_taxes/?pan_name=${pannumber}`,
        sendData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Employee Edit Successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card sx={{ width: "80%", margin: "auto", mt: "2%" }}>
          <MDBox px={3} pt={3}>
            <Grid item xs={12} sm={9} mb={2}>
              <MDTypography variant="h5">Organisation Tax Details</MDTypography>
            </Grid>
            <Grid container spacing={2} p={1}>
              <Grid item xs={12} sm={6}>
                <FormField
                  type="payslipname"
                  label="PAN*"
                  name="pan_name"
                  value={values.pan_name}
                  placeholder="Enter PAN Number"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.pan_name && Boolean(errors.pan_name)}
                  helperText={touched.pan_name && errors.pan_name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  type="payslipname"
                  label="TAN"
                  name="tan_name"
                  value={values.tan_name}
                  placeholder="Enter TAN Number"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.tan_name && Boolean(errors.tan_name)}
                  helperText={touched.tan_name && errors.tan_name}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} p={1}>
              <Grid item xs={12} sm={6}>
                <FormField
                  type="payslipname"
                  label="TDS circle / AO code "
                  name="tds_orao_code"
                  value={values.tds_orao_code}
                  placeholder="Enter TDS circle / AO code"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.tds_orao_code && Boolean(errors.tds_orao_code)}
                  helperText={touched.tds_orao_code && errors.tds_orao_code}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  type="payslipname"
                  label="Tax Payment Frequency"
                  name="tax_payment_frequency"
                  value={values.tax_payment_frequency}
                  placeholder="Enter TAN Tax Payment Frequency"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.tax_payment_frequency && Boolean(errors.tax_payment_frequency)}
                  helperText={touched.tax_payment_frequency && errors.tax_payment_frequency}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} p={1}>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h6" color="text">
                  Tax Deductor Details
                </MDTypography>
                {/* <br /> */}

                <RadioGroup
                  row
                  value={values.deductor_type || "Employee"}
                  name="deductor_type"
                  onChange={handleChange}
                >
                  <FormControlLabel
                    control={<></>}
                    label={
                      <MDTypography variant="button" color="text" sx={{ fontWeight: "bold" }} p={2}>
                        Deductor&apos;s Type*
                      </MDTypography>
                    }
                  />
                  <FormControlLabel
                    value="Employee"
                    control={<Radio />}
                    label={<MDTypography variant="button">Employee</MDTypography>}
                  />
                  <FormControlLabel
                    value="Non-Employee"
                    control={<Radio />}
                    label={<MDTypography variant="button">Non-Employee</MDTypography>}
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <Grid container spacing={3} p={1}>
              <Grid item xs={12} sm={6}>
                {values.deductor_type === "Employee" ? (
                  <Autocomplete
                    onChange={(event, value) => {
                      handleChange({ target: { name: "deductor_name", value } });
                    }}
                    options={employees}
                    defaultValue={employee}
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="deductor_name
                      "
                        onChange={handleChange}
                        value={values.deductor_name}
                        label="Deductor's Name
                      "
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                ) : (
                  <FormField
                    type="text"
                    label="Deductor's Name"
                    name="deductor_name"
                    value={values.deductor_name}
                    placeholder="Enter Deductor's Name"
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.deductor_name && Boolean(errors.deductor_name)}
                    helperText={touched.deductor_name && errors.deductor_name}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  type="text"
                  label="Deductor's Father's Name"
                  name="deductor_father_name"
                  value={values.deductor_father_name}
                  placeholder="Enter Deductor's Father's Name"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.deductor_father_name && Boolean(errors.deductor_father_name)}
                  helperText={touched.deductor_father_name && errors.deductor_father_name}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} p={1}>
              {values.deductor_type == "Non-Employee" ? (
                <Grid item xs={12} sm={6}>
                  <FormField
                    type="text"
                    label="Deductor's Designation"
                    name="deductor_designation"
                    value={values.deductor_designation}
                    placeholder="Enter Deductor's Designation"
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.deductor_designation && Boolean(errors.deductor_designation)}
                    helperText={touched.deductor_designation && errors.deductor_designation}
                  />
                </Grid>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={3} p={3} display="flex" justifyContent="flex-end">
              <MDButton variant="gradient" color="info" type="submit">
                {"Save"}
              </MDButton>
            </Grid>
          </MDBox>
        </Card>
      </form>
    </DashboardLayout>
  );
}

export default Taxes;
