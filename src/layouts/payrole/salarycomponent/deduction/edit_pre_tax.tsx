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

function EditPreTax(props: any) {
  const [calculationtype, setCalculationType] = useState("Flat Amount");
  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const old_payslip_name = props.data.pre_name_slip;
  const deduction_with_props = props.data.deduction_with.split("-");
  const initialValues = {
    pre_name_slip: props.data.pre_name_slip,
    deduction_with: {
      name: deduction_with_props[0],
      group: deduction_with_props[1],
    },
    employee_contribution_ctc: props.data.employee_contribution_ctc,
    calculate_prorata_basis: props.data.calculate_prorata_basis,
    mark_as_active: props.data.mark_as_active,
    location_name: "Banglore",
    organization_name: "Mindcom",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        console.log(values);
        try {
          const formvalue = {
            ...values,
            deduction_with: values.deduction_with.group + "-" + values.deduction_with.name,
          };
          console.log("aaaaaaaaaaaaaaaaaaaaaaa");
          const response = await axios.put(
            `http://10.0.20.133:8000/mg_pre_tax_deduction/?pre_name_slip=${old_payslip_name}`,
            formvalue,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvX2lkIjoxLCJlbWFpbCI6Im1pbmRjb21AZ21haWwuY29tIiwiZXhwIjoxNjk5OTU3OTE4fQ.ppAOzkRbIhv5oIT6GnDX-Wz6THg_Z6FqUEzp1MR26LE`,
              },
            }
          );
          if (response.status === 200) {
            console.log("Update Successfully");
          }
        } catch (error) {
          console.error("Error saving data:", error);
        }
      },
    });
  const options = [
    {
      name: "Life Insurance Premiums",
      group: "80C",
    },
    {
      name: "Public Provident Fund",
      group: "80C",
    },
    {
      name: "Employ Provident Fund",
      group: "80C",
    },
    {
      name: "Equity Linked Saving Schema",
      group: "80C",
    },
    {
      name: "Unit Linked Investment Plan",
      group: "80C",
    },
    {
      name: "Fixed Deposits",
      group: "80C",
    },
    {
      name: "Home Loan Principal Payment",
      group: "80C",
    },
    {
      name: "Sukanya samridhhi Yojana",
      group: "80C",
    },
    {
      name: "National Saving Certificate",
      group: "80C",
    },
    {
      name: "National Pension Scheme",
      group: "80C",
    },
    {
      name: "Senior Citizen Scheme",
      group: "80C",
    },
  ];

  const renderGroup = (option: any) => {
    return (
      <div>
        <h6>{option.group}</h6>
        {option.children}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card sx={{ width: "100%", margin: "auto", mt: "2%" }}>
        <MDBox p={3}>
          <Grid item xs={12} sm={9}>
            <MDTypography variant="h5">New Pre-Tax Deduction</MDTypography>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <FormField
                type="pre_name_slip"
                label="Name in Payslip*"
                name="pre_name_slip"
                value={values.pre_name_slip}
                placeholder="Enter Payslip Name"
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                onChange={(event, value) => {
                  handleChange({ target: { name: "deduction_with", value } });
                }}
                options={options}
                groupBy={(option) => option?.group}
                getOptionLabel={(option) => option?.name}
                renderGroup={renderGroup}
                renderInput={(params) => (
                  <MDInput
                    name="deduction_with"
                    onChange={handleChange}
                    value={values.deduction_with}
                    label="Select the deduction frequency*"
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
          </Grid>
        </MDBox>

        <Grid container xs={12} pt={2}>
          <Grid item xs={12} pl={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.employee_contribution_ctc}
                  onChange={handleChange}
                  name="employee_contribution_ctc"
                  value={true}
                />
              }
              label="Include employer's contribution in the CTC"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.calculate_prorata_basis}
                  onChange={handleChange}
                  name="calculate_prorata_basis"
                  value={true}
                />
              }
              label="Calculate on pro-rata basis"
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
          {values.deduction_with?.name == "National Pension Scheme" ? (
            <Grid item xs={12} sm={12} p={2}>
              <Card sx={{ width: "80%", margin: "auto", mt: "2%" }}>
                <Grid p={2}>
                  <MDTypography variant="h7">Tax deduction guidelines for NPS</MDTypography>
                  <Grid pl={4}>
                    <ul>
                      <li>
                        <MDTypography variant="button">
                          {
                            " Employee's contribution of up to ₹ 1.5 lakh are eligible for tax benefits under Section 80CCD(1)."
                          }
                        </MDTypography>
                      </li>
                      <li>
                        <MDTypography variant="button">
                          {
                            "Additional amount of ₹ 50,000 in Employee's contribution can be claimed under Section 80CCD (1b)."
                          }
                        </MDTypography>
                      </li>
                      <li>
                        <MDTypography variant="button">
                          {
                            "Employer contribution up to 10% of Basic Salary + Dearness Allowance is also eligible for deduction under Section 80CCD(2)."
                          }
                        </MDTypography>
                      </li>
                    </ul>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={3} p={3} display="flex" justifyContent="flex-end">
          <MDButton variant="gradient" color="info" type="submit">
            {"Savssssse"}
          </MDButton>
        </Grid>
      </Card>
    </form>
  );
}

export default EditPreTax;
