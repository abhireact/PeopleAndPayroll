import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useFormik } from "formik";
import FormField from "layouts/applications/wizard/components/FormField";
import React, { useState } from "react";
import { leaveSchema } from "./schema";
import MDButton from "components/MDButton";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { storeRestrictionData } from "Redux/action/dummyDataActions";
const initialValues = {
  weekend_between_leave_period: [] as string[],
  weekend_between_leave_period_day: "",
  holidays_between_leave_period_day: "",
  holidays_between_leave_period: [] as string[],
  applying_leaves_excel_balance: [] as string[],
  applying_leaves_excel_balance_allow_value: [] as string[],
  duration_allowed: [] as string[],
  allow_users_to_view: "",
  // allow_request_for: "",
  balance_to_be_displayed: "",
  restrictions_for_leave1: "",
  restrictions_for_leave2: "",
  restrictions_for_leave3: "",
  restrictions_for_leave4: "",
  restrictions_for_leave5: "",
  pastDate: "",
  pastday_value: "",
  futureDate: "",
  futureday_value: "",
  futureDate2: "",
  futureday_value2: "",
  restrictions_for_leave_input1: 0,
  restrictions_for_leave_input2: 0,
  restrictions_for_leave_input3: "",
  restrictions_for_leave_input4: "",
  restrictions_for_leave_input5: "",
  leave_applied_only_on: [] as string[],
  leave_cannot_taken_with: [] as string[],
  maximum_number_of_specific_period: [] as string[],
  maximum_number_of_specific_period_input: "",
};
const selectData = {
  gender: ["Male", "Female"],

  leaveName: ["Casual Leave", "Earned Leave", "Leave without pay", "Casual Leave", "Sick Leave"],
  leaveappliedon: ["Date of Joining", "Date of Exit", "Date of Birth", "Date of Joining"],
  effectiveAter: ["Days", "Month", "Year"],
  effectiveFrom: ["Date of Confirmation", "Date of Joining"],
  allow_users_to_view: ["Leave Taken Alone", "Simple Leave Summary", "Complete Leave Summary"],
  balance_to_be_displayed: [
    "Current Date",
    "Accural period leave",
    "Start Date of Leave Request",
    "Year end estimatted balance ",
  ],
  maximum_number_of_specific_period_input: [
    "Month",
    "Year",
    "Week",
    "Accural Period",
    "Job Tenure",
  ],
};
const RestrictionTable = (props: any) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: leaveSchema,
    enableReinitialize: true,
    onSubmit: (values: any, action: { resetForm: () => void }) => {
      console.log(values.gender, values.martial_status, "rtretrtrfr");
      console.log(" ~ file: Registration.jsx ~ line 11 ~ Registration ~ values", values);
      action.resetForm();
    },
  });
  const token = Cookies.get("token");
  const dispatched = useDispatch();

  console.log("myname", token);
  const [restrictionData, setRestrictionData] = useState({});
  const checkMainbtnClick = useSelector((state: any) => state.academicName);
  console.log("checkMainbtnClick", checkMainbtnClick);

  const [isPastChecked, setIsPastChecked] = React.useState(false);
  const [isFutureChecked, setIsFutureChecked] = React.useState(false);

  const [selectedOption, setSelectedOption] = React.useState("allow");
  React.useEffect(() => {
    dispatched(storeRestrictionData(restrictionData));
    // console.log(dispatched, "dispatfrhjufwefhevhjwvfhj");
  }, [dispatched, restrictionData]);
  const handleFormSubmit = async () => {
    event.preventDefault();

    try {
      console.log(typeof values.weekend_between_leave_period, "ganduuuuu");

      const formValues = {
        ...values,
        allow_request_for_past_days: values.pastDate + values.pastday_value + "days",
        allow_request_for_future_days: [
          values.futureDate + values.futureday_value + "days",
          values.futureDate2 + values.futureday_value2 + "days in advance",
        ],

        weekend_between_leave_period:
          values.weekend_between_leave_period[0] != "D"
            ? values.weekend_between_leave_period + values.weekend_between_leave_period_day + "days"
            : values.weekend_between_leave_period,

        holidays_between_leave_period:
          values.holidays_between_leave_period[0] != "D"
            ? values.holidays_between_leave_period +
              values.holidays_between_leave_period_day +
              "days"
            : values.holidays_between_leave_period,

        applying_leaves_excel_balance:
          values.applying_leaves_excel_balance[0] === "A"
            ? values.applying_leaves_excel_balance.concat(
                values.applying_leaves_excel_balance_allow_value
              )
            : values.applying_leaves_excel_balance,

        minimum_leave_availed_per_application: values.restrictions_for_leave_input1,

        maximum_leave_availed_per_application: values.restrictions_for_leave_input2,

        maximim_number_consecutive_leave_allowed:
          values.restrictions_for_leave3 + values.restrictions_for_leave_input3,

        minimum_gap_between_two_apps:
          values.restrictions_for_leave4 + values.restrictions_for_leave_input4,
        enable_file_upload_option:
          values.restrictions_for_leave5 + values.restrictions_for_leave_input5,
        maximum_number_of_specific_period:
          values.maximum_number_of_specific_period + values.maximum_number_of_specific_period_input,
      };
      ("");
      console.log(formValues, "formdata");
      const x = { restriction: formValues };
      console.log(x, "value of restriction");
      setRestrictionData(x);
      const response = await axios.post("http://web:8000/mg_restrictions", formValues, {
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
  if (checkMainbtnClick?.name == true) {
    handleFormSubmit();
  }
  console.log(props, "props");

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

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} p={5} xs={12}>
        <Grid sm={10.5} p={1}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              <MDTypography variant="h6"> Weekends Between Leave Period :</MDTypography>
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              // defaultValue="female"
              // row
              name="radio-buttons-group"
            >
              <FormControlLabel
                //   value="female"
                control={
                  <Radio
                    checked={values.weekend_between_leave_period.includes(
                      "Count as leave: Count after"
                    )}
                    onChange={handleChange}
                    name="weekend_between_leave_period"
                    value="Count as leave: Count after"
                  />
                }
                label={
                  <>
                    <Grid container spacing={1} p={1} xs={12} sm={12}>
                      <Grid sm={7}>
                        <MDTypography variant="body2">Count as leave: Count after</MDTypography>
                      </Grid>
                      <Grid sm={3}>
                        {" "}
                        {/* {values.weekend_between_leave_period?} */}
                        <MDInput
                          type="number"
                          min="10"
                          max="100"
                          // size="small"
                          name="weekend_between_leave_period_day"
                          value={values.weekend_between_leave_period_day}
                          disabled={values.weekend_between_leave_period[0] == "C" ? false : true}
                          // type="number"
                          onChange={handleChange}
                          sx={{ width: "70%" }}
                        />
                      </Grid>
                      <Grid sm={2}>
                        {" "}
                        <MDTypography variant="body2">days</MDTypography>
                      </Grid>
                    </Grid>
                  </>
                }
              />
              <FormControlLabel
                // value="male"
                control={
                  <Radio
                    checked={values.weekend_between_leave_period.includes("Donot count as leave")}
                    onChange={handleChange}
                    name="weekend_between_leave_period"
                    value="Donot count as leave"
                  />
                }
                label={<MDTypography variant="body2"> Do not count as leave</MDTypography>}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid sm={10.5} p={1}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              <MDTypography variant="h6"> Holidays Between Leave Period :</MDTypography>
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Count as leave: Count after" // Set default selected option here
              // row
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="Count as leave: Count after"
                control={
                  <Radio
                    // defaultChecked (This line is not needed anymore)
                    checked={values.holidays_between_leave_period.includes(
                      "Count as leave: Count after"
                    )}
                    onChange={handleChange}
                    name="holidays_between_leave_period"
                    value="Count as leave: Count after"
                  />
                }
                label={
                  <>
                    <Grid container spacing={1} p={1} xs={12} sm={12}>
                      <Grid sm={7}>
                        <MDTypography variant="body2">Count as leave: Count after</MDTypography>
                      </Grid>
                      <Grid sm={3}>
                        <MDInput
                          type="number"
                          min="1"
                          max="100"
                          name="holidays_between_leave_period_day"
                          value={values.holidays_between_leave_period_day}
                          disabled={values.holidays_between_leave_period[0] == "C" ? false : true}
                          // type="number"
                          onChange={handleChange}
                          sx={{ width: "70%" }}
                        />
                      </Grid>
                      <Grid sm={2}>
                        <MDTypography variant="body2">days</MDTypography>
                      </Grid>
                    </Grid>
                  </>
                }
              />
              <FormControlLabel
                value="Donot count as leave"
                control={
                  <Radio
                    checked={values.holidays_between_leave_period.includes("Donot count as leave")}
                    onChange={handleChange}
                    name="holidays_between_leave_period"
                    value="Donot count as leave"
                  />
                }
                label={<MDTypography variant="body2"> Donot count as leave</MDTypography>}
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid sm={10.5} p={1}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              <MDTypography variant="h6">
                {" "}
                While Applying Leave, Exceed Leave Balance :
              </MDTypography>
            </FormLabel>
            <Grid>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                // defaultValue="female"
                row
                name="radio-buttons-group"
                // value={selectedOption} // Step 2: Use state variable as the value
                // onChange={(e) => setSelectedOption(e.target.value)} // Update the selected option
              >
                <FormControlLabel
                  // value="Allow"
                  control={
                    <Radio
                      checked={values.applying_leaves_excel_balance.includes("Allow")}
                      onChange={handleChange}
                      name="applying_leaves_excel_balance"
                      value="Allow"
                    />
                  }
                  label={<MDTypography variant="body2">Allow</MDTypography>}
                />
                <FormControlLabel
                  // value="Donot Allow"
                  // sx={{ marginLeft: "76" }}
                  control={
                    <Radio
                      sx={{ marginLeft: "50px" }}
                      checked={values.applying_leaves_excel_balance.includes("Dont_allow")}
                      onChange={handleChange}
                      name="applying_leaves_excel_balance"
                      value="Dont_allow"
                    />
                  }
                  label={<MDTypography variant="body2">Do not Allow</MDTypography>}
                />
              </RadioGroup>
            </Grid>
            {values.applying_leaves_excel_balance.length == 5 && (
              // The content to show when "Allow" is clicked
              <Grid ml={5}>
                {" "}
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  row
                >
                  <FormControlLabel
                    value="allow"
                    control={
                      <Radio
                        checked={values.applying_leaves_excel_balance_allow_value.includes(
                          "Without_limit"
                        )}
                        onChange={handleChange}
                        name="applying_leaves_excel_balance_allow_value"
                        value="Without_limit"
                      />
                    }
                    label={<MDTypography variant="body2"> Without limit</MDTypography>}
                  />
                  <FormControlLabel
                    value="allow"
                    control={
                      <Radio
                        checked={values.applying_leaves_excel_balance_allow_value.includes(
                          "Withoutlimit_and_mark_as_LOP"
                        )}
                        onChange={handleChange}
                        name="applying_leaves_excel_balance_allow_value"
                        value="Withoutlimit_and_mark_as_LOP"
                      />
                    }
                    label={
                      <MDTypography variant="body2"> Without limit and mark as LOP</MDTypography>
                    }
                  />
                  <FormControlLabel
                    value="allow"
                    control={
                      <Radio
                        checked={values.applying_leaves_excel_balance_allow_value.includes(
                          "Until_year_endlimit"
                        )}
                        onChange={handleChange}
                        name="applying_leaves_excel_balance_allow_value"
                        value="Until_year_endlimit"
                      />
                    }
                    label={<MDTypography variant="body2"> Until year end limit</MDTypography>}
                  />
                </RadioGroup>
              </Grid>
            )}
          </FormControl>
        </Grid>
        <Grid sm={10.5} p={1}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              <MDTypography variant="h6"> Duration(s) Allowed :</MDTypography>
            </FormLabel>
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="top"
                control={
                  <Checkbox
                    checked={values.duration_allowed.includes("Full Day")}
                    onChange={handleChange}
                    name="duration_allowed"
                    value="Full Day"
                  />
                }
                label={<MDTypography variant="body2"> Full Day</MDTypography>}
                labelPlacement="end"
              />
              <FormControlLabel
                value="start"
                control={
                  <Checkbox
                    checked={values.duration_allowed.includes("Half Day")}
                    onChange={handleChange}
                    name="duration_allowed"
                    value="Half Day"
                  />
                }
                label={<MDTypography variant="body2"> Half Day</MDTypography>}
                labelPlacement="end"
              />
              <FormControlLabel
                value="bottom"
                control={
                  <Checkbox
                    checked={values.duration_allowed.includes("Quatarly")}
                    onChange={handleChange}
                    name="duration_allowed"
                    value="Quatarly"
                  />
                }
                label={<MDTypography variant="body2"> Quatarly</MDTypography>}
                labelPlacement="end"
              />
              <FormControlLabel
                value="end"
                control={
                  <Checkbox
                    checked={values.duration_allowed.includes("Hourly")}
                    onChange={handleChange}
                    name="duration_allowed"
                    value="Hourly"
                  />
                }
                label={<MDTypography variant="body2"> Hourly</MDTypography>}
                labelPlacement="end"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid xs={12} sm={12} container p={1}>
          {/* <FormControl> */}
          <Grid sm={12}>
            <FormLabel id="demo-radio-buttons-group-label">
              <MDTypography variant="h6">Report Configuration:</MDTypography>
            </FormLabel>
          </Grid>

          <Grid container p={1} sm={12}>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="body2">Allow users to view</MDTypography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Autocomplete
                // multiple
                onChange={(event, value) => {
                  handleChange({ target: { name: "allow_users_to_view", value } });
                }}
                // value={department}
                // onChange={handleMainFieldChange}
                options={selectData.allow_users_to_view}
                renderInput={(params) => (
                  <FormField
                    label={""}
                    InputLabelProps={{ shrink: true }}
                    name="allow_users_to_view"
                    onChange={handleChange}
                    value={values.allow_users_to_view}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container p={1} sm={12}>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="body2">Balance to be displayed</MDTypography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Autocomplete
                // multiple
                onChange={(event, value) => {
                  handleChange({ target: { name: "balance_to_be_displayed", value } });
                }}
                // value={department}
                // onChange={handleMainFieldChange}
                options={selectData.balance_to_be_displayed}
                renderInput={(params) => (
                  <FormField
                    label={""}
                    InputLabelProps={{ shrink: true }}
                    name="balance_to_be_displayed"
                    onChange={handleChange}
                    value={values.balance_to_be_displayed}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
          </Grid>
          {/* </FormControl> */}
        </Grid>
        <Grid sm={10.5} p={1}>
          <FormControl>
            <Grid sm={12}>
              <FormLabel id="demo-radio-buttons-group-label">
                <MDTypography variant="h6">Allow Requests For :</MDTypography>
              </FormLabel>
            </Grid>
            <Grid container spacing={3} p={2}>
              <FormControlLabel
                label={<MDTypography variant="body2"> Past Date</MDTypography>}
                control={
                  <Checkbox
                    checked={isPastChecked}
                    onChange={() => setIsPastChecked(!isPastChecked)}
                    defaultChecked
                  />
                }
              />
            </Grid>
            {isPastChecked && (
              <Grid item xs={12} sm={12} display={"flex"}>
                <Grid sm={2}>
                  <Checkbox
                    // checked={isFutureChecked}
                    // onChange={() => setIsFutureChecked(!isFutureChecked)}
                    // defaultChecked
                    checked={values.pastDate.includes("Past")}
                    onChange={handleChange}
                    name="pastDate"
                    value={"Past"}
                  />
                </Grid>
                <Grid sm={3}>
                  <MDTypography variant="body2">Past</MDTypography>{" "}
                </Grid>
                <Grid sm={3}>
                  <MDInput
                    type="number"
                    min="10"
                    max="100"
                    name="pastday_value"
                    value={values.pastday_value}
                    disabled={values.pastDate == "Past" ? false : true}
                    // type="number"
                    onChange={handleChange}
                    sx={{ width: "70%" }}
                  />{" "}
                </Grid>
                <Grid sm={3}>
                  <MDTypography variant="body2">days</MDTypography>{" "}
                </Grid>
              </Grid>
            )}
            <Grid container spacing={3} p={2}>
              <FormControlLabel
                label={<MDTypography variant="body2"> Future Date</MDTypography>}
                control={
                  <Checkbox
                    checked={isFutureChecked}
                    onChange={() => setIsFutureChecked(!isFutureChecked)}
                    defaultChecked
                  />
                }
              />
            </Grid>
            {isFutureChecked && (
              <>
                <Grid item xs={12} sm={12} display={"flex"}>
                  <Grid sm={2}>
                    <Checkbox
                      checked={values.futureDate.includes("Next")}
                      onChange={handleChange}
                      name="futureDate"
                      value={"Next"}
                    />
                  </Grid>
                  <Grid sm={3}>
                    <MDTypography variant="body2">Next</MDTypography>{" "}
                  </Grid>
                  <Grid sm={3}>
                    <MDInput
                      type="number"
                      min="1"
                      max="100"
                      name="futureday_value"
                      value={values.futureday_value}
                      disabled={values.futureDate == "Next" ? false : true}
                      // type="number"
                      onChange={handleChange}
                      sx={{ width: "70%" }}
                    />{" "}
                  </Grid>
                  <Grid sm={3}>
                    <MDTypography variant="body2">days</MDTypography>{" "}
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} pt={1} display={"flex"}>
                  <Grid sm={2}>
                    <Checkbox
                      checked={values.futureDate2.includes("To be Applied")}
                      onChange={handleChange}
                      name="futureDate2"
                      value={"To be Applied"}
                    />
                  </Grid>
                  <Grid sm={3}>
                    <MDTypography variant="body2">To be applied</MDTypography>{" "}
                  </Grid>
                  <Grid sm={3}>
                    <MDInput
                      type="number"
                      min="1"
                      max="100"
                      name="futureday_value2"
                      value={values.futureday_value2}
                      disabled={values.futureDate2 == "To be Applied" ? false : true}
                      // type="number"
                      onChange={handleChange}
                      sx={{ width: "70%" }}
                    />{" "}
                  </Grid>
                  <Grid sm={4}>
                    <MDTypography variant="body2">days in advance</MDTypography>{" "}
                  </Grid>
                </Grid>
              </>
            )}
          </FormControl>
        </Grid>
        <Grid sm={12}>
          {" "}
          <Grid item xs={12} sm={12} p={1} display={"flex"}>
            <Grid sm={2}>
              <Checkbox
                checked={values.restrictions_for_leave1.includes(
                  "Minimum leave that can be availed per application"
                )}
                onChange={handleChange}
                name="restrictions_for_leave1"
                value="Minimum leave that can be availed per application"
              />
            </Grid>
            <Grid sm={7}>
              <MDTypography variant="body2">
                Minimum leave that can be availed per application{" "}
              </MDTypography>{" "}
            </Grid>
            <Grid sm={3}>
              <MDInput
                type="number"
                min="1"
                max="100"
                name="restrictions_for_leave_input1"
                value={values.restrictions_for_leave_input1}
                disabled={
                  values.restrictions_for_leave1 ==
                  "Minimum leave that can be availed per application"
                    ? false
                    : true
                }
                // type="number"
                onChange={handleChange}
                sx={{ width: "35%" }}
              />{" "}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} p={1} display={"flex"}>
            <Grid sm={2}>
              <Checkbox
                checked={values.restrictions_for_leave2.includes(
                  "Maximum leave that can be availed per application"
                )}
                onChange={handleChange}
                name="restrictions_for_leave2"
                value="Maximum leave that can be availed per application"
              />
            </Grid>
            <Grid sm={7}>
              <MDTypography variant="body2">
                Maximum leave that can be availed per application
              </MDTypography>{" "}
            </Grid>
            <Grid sm={3}>
              <MDInput
                type="number"
                min="1"
                max="100"
                name="restrictions_for_leave_input2"
                value={values.restrictions_for_leave_input2}
                disabled={
                  values.restrictions_for_leave2 ==
                  "Maximum leave that can be availed per application"
                    ? false
                    : true
                }
                // type="number"
                onChange={handleChange}
                sx={{ width: "35%" }}
              />{" "}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} p={1} display={"flex"}>
            <Grid sm={2}>
              <Checkbox
                checked={values.restrictions_for_leave3.includes(
                  "Maximum number of consecutive days of Leave allowed"
                )}
                onChange={handleChange}
                name="restrictions_for_leave3"
                value="Maximum number of consecutive days of Leave allowed"
              />
            </Grid>
            <Grid sm={7}>
              <MDTypography variant="body2">
                Maximum number of consecutive days of Leave allowed
              </MDTypography>{" "}
            </Grid>
            <Grid sm={3}>
              <MDInput
                type="number"
                min="1"
                max="100"
                name="restrictions_for_leave_input3"
                value={values.restrictions_for_leave_input3}
                disabled={
                  values.restrictions_for_leave3 ==
                  "Maximum number of consecutive days of Leave allowed"
                    ? false
                    : true
                }
                // type="number"
                onChange={handleChange}
                sx={{ width: "35%" }}
              />{" "}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} p={1} display={"flex"}>
            <Grid sm={2}>
              <Checkbox
                checked={values.restrictions_for_leave4.includes(
                  "Minimum gap (in days) between two applications"
                )}
                onChange={handleChange}
                name="restrictions_for_leave4"
                value="Minimum gap (in days) between two applications"
              />
            </Grid>
            <Grid sm={7}>
              <MDTypography variant="body2">
                Minimum gap (in days) between two applications
              </MDTypography>{" "}
            </Grid>
            <Grid sm={3}>
              <MDInput
                type="number"
                min="1"
                max="100"
                name="restrictions_for_leave_input4"
                value={values.restrictions_for_leave_input4}
                disabled={
                  values.restrictions_for_leave4 == "Minimum gap (in days) between two applications"
                    ? false
                    : true
                }
                // type="number"
                onChange={handleChange}
                sx={{ width: "35%" }}
              />{" "}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} p={1} display={"flex"}>
            <Grid sm={2}>
              <Checkbox
                checked={values.restrictions_for_leave5.includes(
                  "Enable file upload option if the applied leave period exceeds"
                )}
                onChange={handleChange}
                name="restrictions_for_leave5"
                value="Enable file upload option if the applied leave period exceeds"
              />
            </Grid>
            <Grid sm={7}>
              <MDTypography variant="body2">
                Enable file upload option if the applied leave period exceeds days
              </MDTypography>{" "}
            </Grid>
            <Grid sm={3}>
              <MDInput
                type="number"
                min="1"
                max="100"
                name="restrictions_for_leave_input5"
                value={values.restrictions_for_leave_input5}
                disabled={
                  values.restrictions_for_leave5 ==
                  "Enable file upload option if the applied leave period exceeds"
                    ? false
                    : true
                }
                // type="number"
                onChange={handleChange}
                sx={{ width: "35%" }}
              />{" "}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} p={1} display={"flex"}>
            <Grid sm={7}>
              <MDTypography variant="body2">
                Maximum number of applications allowed within the specified period
              </MDTypography>{" "}
            </Grid>
            <Grid sm={3}>
              <MDInput
                type="number"
                min="1"
                max="100"
                name="maximum_number_of_specific_period"
                value={values.maximum_number_of_specific_period}
                // type="number"
                onChange={handleChange}
                sx={{ width: "60%" }}
              />{" "}
            </Grid>
            <Grid sm={6}>
              <Autocomplete
                // multiple
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "maximum_number_of_specific_period_input", value },
                  });
                }}
                // value={department}
                // onChange={handleMainFieldChange}
                options={selectData.maximum_number_of_specific_period_input}
                renderInput={(params) => (
                  <FormField
                    label={""}
                    InputLabelProps={{ shrink: true }}
                    name="maximum_number_of_specific_period_input"
                    onChange={handleChange}
                    value={values.maximum_number_of_specific_period_input}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} p={1} display={"flex"}>
            <Grid sm={7}>
              <MDTypography variant="body2">
                Enable file upload option if the applied leave period exceeds days
              </MDTypography>{" "}
            </Grid>

            <Grid sm={5}>
              <Autocomplete
                multiple
                onChange={(event, value) => {
                  handleChange({ target: { name: "leave_applied_only_on", value } });
                }}
                // value={department}
                // onChange={handleMainFieldChange}
                options={selectData.leaveappliedon}
                renderInput={(params) => (
                  <FormField
                    label={""}
                    InputLabelProps={{ shrink: true }}
                    name="leave_applied_only_on"
                    onChange={handleChange}
                    value={values.leave_applied_only_on}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} p={1} display={"flex"}>
            <Grid sm={7}>
              <MDTypography variant="body2">This leave cannot be taken together with</MDTypography>{" "}
            </Grid>

            <Grid sm={5}>
              {/* <MultipleSelectChip /> */}

              <Autocomplete
                multiple
                onChange={(event, value) => {
                  handleChange({ target: { name: "leave_cannot_taken_with", value } });
                }}
                options={leavetype_name}
                renderInput={(params) => (
                  <FormField
                    label={""}
                    InputLabelProps={{ shrink: true }}
                    name="leave_cannot_taken_with"
                    onChange={handleChange}
                    value={values.leave_cannot_taken_with}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <MDButton variant="gradient" color="info" type="submit" onClick={handleFormSubmit}>
        Saved
      </MDButton>
    </form>
  );
};

export default RestrictionTable;
