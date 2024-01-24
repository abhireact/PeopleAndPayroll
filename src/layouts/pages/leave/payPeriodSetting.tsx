import { Autocomplete, Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import React, { useEffect, useState } from "react";
import { leaveSchema } from "./schema";
import { useFormik } from "formik";
import FormField from "layouts/applications/wizard/components/FormField";
import MDButton from "components/MDButton";
import axios from "axios";
import Cookies from "js-cookie";
const initialValues = {
  duraction_allowed: [] as string[],
  location_name: "",
  pay_cycle: "",
  start_date: "",
  end_date: "",
  pay_process_date: "",
  pay_report_date: "",
  lock: "",
  process_encash: "",
  pay_name: "",
  organisation_name: "",
};
const selectData = {
  gender: ["Male", "Female"],

  balance_to_be_displayed: [
    "Current Date",
    "Accural period leave",
    "Start Date of Leave Request",
    "Year end estimatted balance ",
  ],
  date: ["1st", "2nd", "3rd"],
  payCycle: ["Monthly", "Weekly", "BiWeekly", "HalfMonthly"],
};
const PayPeriodSetting = () => {
  const [locationdata, SetLocationdata] = useState([]);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: leaveSchema,
    enableReinitialize: true,
    onSubmit: (values: any, action: { resetForm: () => void }) => {
      console.log(" ~ file: Registration.jsx ~ line 11 ~ Registration ~ values", values);
      action.resetForm();
    },
  });
  const token = Cookies.get("token");

  console.log("token", token);
  useEffect(() => {
    fetchLocation(); // Fetch data from API on component mount
  }, []);

  const fetchLocation = async () => {
    try {
      const response = await fetch("http://10.0.20.133:8001/worklocation", {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });

      const locationdataa = await response.json();
      console.log(locationdataa.location_name, "ldata");
      SetLocationdata(locationdataa);
      console.log(locationdata, typeof locationdata);
      //   decryptData(data[0].encrypted_data);
      //   console.log(data[0].encrypted_data, "ghihwefgkwefh");
    } catch (error) {
      console.log("Error fetching locationdata:", error);
    }
  };
  const handleFormSubmit = async () => {
    event.preventDefault();

    try {
      const formValues = {
        ...values,
      };
      ("");
      console.log(formValues, "formdata");
      const response = await axios.post("http://10.0.20.133:8001/payperiod", formValues, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      if (response.status === 200) {
        console.log("Created SchoolPage Successfully");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <>
        <MDBox p={5}>
          <Grid container spacing={3}>
            <Grid sm={2.5}>
              <MDTypography variant="h6" fontWeight={700}>
                Pay period name
              </MDTypography>
            </Grid>
            <Grid sm={3.5}>
              <MDInput
                name="pay_name"
                value={values.pay_name}
                // disabled={values.weekend_between_leave_period[0] == "C" ? false : true}
                // type="number"
                onChange={handleChange}
                sx={{ width: "70%" }}
              />
            </Grid>
            <Grid sm={2.5}>
              <MDTypography variant="h6" fontWeight={700}>
                Pay period cycle
              </MDTypography>
            </Grid>
            <Grid sm={3.5}>
              <Autocomplete
                sx={{ width: "70%" }}
                // multiple
                onChange={(event: any, value: any) => {
                  handleChange({ target: { name: "pay_cycle", value } });
                }}
                // value={department}
                // onChange={handleMainFieldChange}
                options={selectData.date}
                renderInput={(params) => (
                  <FormField
                    label={""}
                    InputLabelProps={{ shrink: true }}
                    name="pay_cycle"
                    onChange={handleChange}
                    value={values.pay_cycle}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} pt={5}>
            <Grid sm={2.5}>
              <MDTypography variant="h6" fontWeight={700}>
                Start Day
              </MDTypography>
            </Grid>
            <Grid sm={3.5}>
              <Autocomplete
                // multiple
                sx={{ width: "70%" }}
                onChange={(event: any, value: any) => {
                  handleChange({ target: { name: "start_date", value } });
                }}
                // value={department}
                // onChange={handleMainFieldChange}
                options={selectData.date}
                renderInput={(params) => (
                  <FormField
                    label={""}
                    InputLabelProps={{ shrink: true }}
                    name="start_date"
                    onChange={handleChange}
                    value={values.start_date}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid sm={2.5}>
              <MDTypography variant="h6">End Day</MDTypography>
            </Grid>
            <Grid sm={3.5}>
              <Autocomplete
                // multiple
                sx={{ width: "70%" }}
                onChange={(event: any, value: any) => {
                  handleChange({ target: { name: "end_date", value } });
                }}
                // value={department}
                // onChange={handleMainFieldChange}
                options={selectData.date}
                renderInput={(params) => (
                  <FormField
                    label={""}
                    InputLabelProps={{ shrink: true }}
                    name="end_date"
                    onChange={handleChange}
                    value={values.end_date}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} pt={5}>
            <Grid sm={2.5}>
              <MDTypography variant="h6" fontWeight={700}>
                Payroll processing day
              </MDTypography>
            </Grid>
            <Grid sm={3.5}>
              <Autocomplete
                // multiple
                sx={{ width: "70%" }}
                onChange={(event: any, value: any) => {
                  handleChange({ target: { name: "pay_process_date", value } });
                }}
                // value={department}
                // onChange={handleMainFieldChange}
                options={selectData.date}
                renderInput={(params) => (
                  <FormField
                    label={""}
                    InputLabelProps={{ shrink: true }}
                    name="pay_process_date"
                    onChange={handleChange}
                    value={values.pay_process_date}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid sm={2.5}>
              <MDTypography variant="h6" fontWeight={700}>
                Payroll report generation day
              </MDTypography>
            </Grid>
            <Grid sm={3.5}>
              <Autocomplete
                // multiple
                sx={{ width: "70%" }}
                onChange={(event: any, value: any) => {
                  handleChange({ target: { name: "pay_report_date", value } });
                }}
                // value={department}
                // onChange={handleMainFieldChange}
                options={selectData.date}
                renderInput={(params) => (
                  <FormField
                    label={""}
                    InputLabelProps={{ shrink: true }}
                    name="pay_report_date"
                    onChange={handleChange}
                    value={values.pay_report_date}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} pt={5}>
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="top"
                control={
                  <Checkbox
                    checked={values.process_encash.includes("Process leave encashment")}
                    onChange={handleChange}
                    name="process_encash"
                    value="Process leave encashment"
                  />
                }
                label={<MDTypography variant="h6"> Process leave encashment</MDTypography>}
                labelPlacement="end"
              />
              <FormControlLabel
                value="start"
                control={
                  <Checkbox
                    checked={values.lock.includes(
                      "Lock (Any modification(s) to Attendance, Leave and Timesheet entries for the period mentioned above, will be locked after the processing day)"
                    )}
                    onChange={handleChange}
                    name="lock"
                    value="Lock (Any modification(s) to Attendance, Leave and Timesheet entries for the period mentioned above, will be locked after the processing day)"
                  />
                }
                label={
                  <MDTypography variant="h6">
                    {" "}
                    Lock (Any modification(s) to Attendance, Leave and Timesheet entries for the
                    period mentioned above, will be locked after the processing day)
                  </MDTypography>
                }
                labelPlacement="end"
              />
            </FormGroup>
          </Grid>
          <Grid container spacing={3} pt={5}>
            <Grid sm={2.5}>
              <MDTypography variant="h6" fontWeight={700}>
                Applicable location
              </MDTypography>
            </Grid>
            <Grid sm={3.5}>
              <Autocomplete
                // multiple
                onChange={(event: any, value: any) => {
                  handleChange({ target: { name: "location_name", value } });
                }}
                // value={department}
                // onChange={handleMainFieldChange}
                options={locationdata}
                renderInput={(params) => (
                  <FormField
                    label={""}
                    InputLabelProps={{ shrink: true }}
                    name="location_name"
                    onChange={handleChange}
                    value={values.location_name}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDButton type="submit" onClick={handleFormSubmit}>
          Submit
        </MDButton>
      </>
    </form>
  );
};

export default PayPeriodSetting;
