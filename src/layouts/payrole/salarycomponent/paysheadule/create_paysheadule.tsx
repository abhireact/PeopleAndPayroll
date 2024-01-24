import { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import StepLabel from "@mui/material/StepLabel";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import FormField from "layouts/applications/wizard/components/FormField";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import "./weekday.css";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
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
  // Checkbox,
  Divider,
} from "@mui/material";
import { Field, useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import React from "react";
import radio from "assets/theme/components/form/radio";
import axios from "axios";
import Cookies from "js-cookie";
import * as yup from "yup";

const token = Cookies.get("token");
const getFridayDate = (date: any) => {
  const dayOfWeek = date.getDay();
  const fridayOffset = dayOfWeek === 0 ? 2 : dayOfWeek === 6 ? 1 : 0;
  const fridayDate = new Date(date);
  fridayDate.setDate(fridayDate.getDate() - fridayOffset);
  return fridayDate;
};

const initialValues = {
  select_work_week: [] as string[],
  calculate_salary_based_on: "",
  pay_your_employee_on: "",
  start_first_payroll: "",
  salary_month_willbe_paidon: "",
  organisationworkingday: 0,
  whichday: 0,
};
9;
const validationSchema = yup.object({
  organisationworkingday: yup.number().min(1).max(31).required(),

  whichday: yup.number().min(1).max(28).required(),
});
var currentDate = new Date();
var currentYear = currentDate.getFullYear();
var nextYear = currentYear + 1;
function formatDate(inputDate: any) {
  // Parse the input date string
  var dateObject = new Date(inputDate);

  // Extract day, month, and year
  var day = dateObject.getDate();
  var month = dateObject.getMonth() + 1; // Months are zero-based, so we add 1
  if (day < 20) {
    month += 1;
  }
  var year = dateObject.getFullYear();
  var month1 = dateObject.getMonth() + 1;
  var month2 = dateObject.getMonth() + 2;

  // Format the date as "DD-MM-YYYY"
  if (day < 20) {
    var formattedDate = [day + "-" + month + "-" + year];
  }
  if (day >= 20) {
    var formattedDate = [day + "-" + month1 + "-" + year, day + "-" + month2 + "-" + year];
  }

  return formattedDate;
}

function CreatePaysheadule() {
  const [monthwithyearname, setMonthWithYearName] = React.useState<string[]>([]);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        const valuesForSubmit = {
          select_work_week: values.select_work_week,
          calculate_salary_based_on:
            values.calculate_salary_based_on + values.organisationworkingday + "per month",
          pay_your_employee_on: values.pay_your_employee_on + values.whichday + "of every month",
          start_first_payroll: values.start_first_payroll,
          salary_month_willbe_paidon: values.salary_month_willbe_paidon,
        };
        try {
          const response = await axios.post(
            "http://10.0.20.133:8000/mg_payschedule",
            valuesForSubmit,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            console.log("Paysheadule Created Successfully");
          }
        } catch (error) {
          console.error(error);
        }
        action.resetForm();
      },
    });
  const monthes = [
    "April-" + currentYear,
    "May-" + currentYear,
    "June-" + currentYear,
    "July-" + currentYear,
    "August-" + currentYear,
    "September-" + currentYear,
    "October-" + currentYear,
    "November-" + currentYear,
    "December-" + currentYear,
    "January-" + nextYear,
    "February-" + nextYear,
    "March-" + nextYear,
  ];

  let salary_selected_month: any[] = [];
  if (values.start_first_payroll != "") {
    const inputDate = values.whichday + "-" + values.start_first_payroll;
    salary_selected_month = formatDate(inputDate);
  }
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (event: { target: { value: string | number | Date } }) => {
    setSelectedDate(new Date(event.target.value));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const nextMonth = (currentMonth % 12) + 1;
        const currentMonthName = currentDate.toLocaleString("default", { month: "long" });
        const currentYear = currentDate.getFullYear();

        const nextMonthName = new Date(currentDate.getFullYear(), nextMonth - 1, 1).toLocaleString(
          "default",
          { month: "long" }
        );
        const nextMonthYear = nextMonth === 1 ? currentYear + 1 : currentYear;
        setMonthWithYearName([
          currentMonthName + " " + currentYear,
          nextMonthName + " " + nextMonthYear,
        ]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const fridayDate = getFridayDate(selectedDate);

  return (
    // <DashboardLayout>
    // <DashboardNavbar />
    <form onSubmit={handleSubmit}>
      <Card sx={{ width: "80%", margin: "auto", mt: "2%" }}>
        <MDBox p={3}>
          <Grid item xs={12} sm={9} mb={2}>
            <MDTypography variant="h5">Pay Schedule</MDTypography>
          </Grid>
          <Grid container spacing={3} p={2}>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h6">Select your work week*</MDTypography>
              <MDTypography variant="caption">The days worked in a calendar week</MDTypography>
            </Grid>
            <Grid className="weekDays-selector" item xs={12} sm={12}>
              <input
                type="checkbox"
                id="weekday-mon"
                className="weekday"
                name="select_work_week"
                onChange={handleChange}
                checked={values.select_work_week.includes("mon")}
                value="mon"
              />
              <label htmlFor="weekday-mon">M</label>
              <input
                type="checkbox"
                id="weekday-tue"
                className="weekday"
                name="select_work_week"
                onChange={handleChange}
                checked={values.select_work_week.includes("tue")}
                value="tue"
              />
              <label htmlFor="weekday-tue">T</label>
              <input
                type="checkbox"
                id="weekday-wed"
                className="weekday"
                name="select_work_week"
                onChange={handleChange}
                checked={values.select_work_week.includes("wed")}
                value="wed"
              />
              <label htmlFor="weekday-wed">W</label>
              <input
                type="checkbox"
                id="weekday-thu"
                className="weekday"
                name="select_work_week"
                onChange={handleChange}
                checked={values.select_work_week.includes("thu")}
                value="thu"
              />
              <label htmlFor="weekday-thu">T</label>
              <input
                type="checkbox"
                id="weekday-fri"
                className="weekday"
                name="select_work_week"
                onChange={handleChange}
                checked={values.select_work_week.includes("fri")}
                value="fri"
              />
              <label htmlFor="weekday-fri">F</label>
              <input
                type="checkbox"
                id="weekday-sat"
                className="weekday"
                name="select_work_week"
                onChange={handleChange}
                checked={values.select_work_week.includes("sat")}
                value="sat"
              />
              <label htmlFor="weekday-sat">S</label>
              <input
                type="checkbox"
                id="weekday-sun"
                name="select_work_week"
                className="weekday"
                onChange={handleChange}
                checked={values.select_work_week.includes("sun")}
                value="sun"
              />
              <label htmlFor="weekday-sun">S</label>
            </Grid>
          </Grid>
          <Grid container spacing={1} p={2}>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h6">Calculate monthly salary based on*</MDTypography>
              <RadioGroup
                value={values.calculate_salary_based_on}
                name="calculate_salary_based_on"
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Actual days in a month"
                  control={<Radio />}
                  label={<MDTypography variant="button">Actual days in a month</MDTypography>}
                />
                <FormControlLabel
                  value="Organisation working days"
                  control={<Radio />}
                  label={
                    <MDTypography variant="button">
                      {" "}
                      <>
                        <Grid container spacing={2} p={2}>
                          <MDTypography variant="body2">Organisation working days</MDTypography>
                          <MDInput
                            name="organisationworkingday"
                            disabled={
                              values.calculate_salary_based_on === "Organisation working days"
                                ? false
                                : true
                            }
                            value={values.organisationworkingday}
                            type="number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.organisationworkingday &&
                              Boolean(errors.organisationworkingday)
                            }
                            sx={{ width: "15%" }}
                            size="small"
                          />
                          <MDTypography variant="body2"> per month</MDTypography>
                        </Grid>
                      </>
                    </MDTypography>
                  }
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h6">Pay your employees on*</MDTypography>
              <RadioGroup
                value={values.pay_your_employee_on}
                name="pay_your_employee_on"
                onChange={handleChange}
              >
                <FormControlLabel
                  value="The last working day of every month"
                  control={<Radio />}
                  label={
                    <MDTypography variant="button">
                      The last working day of every month
                    </MDTypography>
                  }
                />
                <FormControlLabel
                  value="days"
                  control={<Radio />}
                  label={
                    <MDTypography variant="button">
                      {" "}
                      <>
                        <Grid container spacing={2} p={2}>
                          <MDTypography variant="body2">day</MDTypography>
                          <MDInput
                            disabled={values.pay_your_employee_on === "days" ? false : true}
                            name="whichday"
                            value={values.whichday}
                            type="number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.whichday && Boolean(errors.whichday)}
                            sx={{ width: "15%" }}
                            size="small"
                          />

                          <MDTypography variant="body2">of every month</MDTypography>
                        </Grid>
                      </>
                    </MDTypography>
                  }
                />
              </RadioGroup>
            </Grid>
          </Grid>
          <Grid container spacing={3} px={2}>
            <Grid item xs={12} sm={6}>
              {values.pay_your_employee_on != "" ? (
                <Autocomplete
                  onChange={(event, value) => {
                    handleChange({ target: { name: "start_first_payroll", value } });
                  }}
                  options={monthes}
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="start_first_payroll"
                      onChange={handleChange}
                      value={values.start_first_payroll}
                      label="Start your first payroll from*"
                      {...params}
                      variant="standard"
                    />
                  )}
                />
              ) : null}
              <Grid pt={2}>
                {values.start_first_payroll != "" ? (
                  <Autocomplete
                    onChange={(event, value) => {
                      handleChange({ target: { name: "salary_month_willbe_paidon", value } });
                    }}
                    options={salary_selected_month}
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="salary_month_willbe_paidon"
                        onChange={handleChange}
                        value={values.salary_month_willbe_paidon}
                        label={
                          "Salary for the month of " +
                          values.start_first_payroll +
                          " will be paid on"
                        }
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                ) : null}
              </Grid>
            </Grid>
            {values.salary_month_willbe_paidon != "" ? (
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar defaultValue={dayjs(values.salary_month_willbe_paidon)} readOnly />
                </LocalizationProvider>
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
    // </DashboardLayout>
  );
}

export default CreatePaysheadule;
