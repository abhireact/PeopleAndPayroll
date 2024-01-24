// import { Box, Card, Grid } from "@mui/material";
// import MDTypography from "components/MDTypography";
// import React from "react";

// const LeaveGrant = () => {
//   return (
//     <Box>
//       <MDTypography variant="body2">Leave grant restrictions </MDTypography>
//       <Card>
//         <Grid>
//           <MDTypography variant="body2">Minimum limit for requests </MDTypography>
//         </Grid>
//         <Grid></Grid>
//       </Card>
//     </Box>
//   );
// };

// export default LeaveGrant;

import * as React from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Theme } from "@mui/material/styles";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import { useFormik } from "formik";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import { leaveSchema } from "./schema";
import Cookies from "js-cookie";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MDButton from "components/MDButton";
import axios from "axios";
import { storeLeaveGrantData, storeRestrictionData } from "Redux/action/dummyDataActions";
import { useDispatch } from "react-redux";
const initialValues = {
  min_limit_for_request: "",
  max_limit_for_request: "",
  max_no_of_request_allowed: "",
  min_between_two_request: "",
  upload_supporting_documents: "",
  allow_request_for_past_dates: "",
  pastDate: "",
  pastday_value: "",
  futureDate: "",
  futureday_value: "",
  maximum_number_of_specific_period_input: "",
  allow_request_for_future_dates: [] as string[],
};
const selectData = {
  maximum_number_of_specific_period_input: ["Month", "Year"],
};
export default function LeaveGrant() {
  const [leavegrantData, setLeavegrantData] = React.useState({});
  const { values, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: leaveSchema,
    enableReinitialize: true,
    onSubmit: (values: any, action: { resetForm: () => void }) => {
      console.log(values.gender, values.martial_status, "rtretrtrfr");
      console.log(" ~ file: Registration.jsx ~ line 11 ~ Registration ~ values", values);
      action.resetForm();
    },
  });
  const dispatched = useDispatch();
  const token = Cookies.get("token");
  const [isPastChecked, setIsPastChecked] = React.useState(false);
  const [isFutureChecked, setIsFutureChecked] = React.useState(false);
  console.log("myname", token);
  const [checked, setChecked] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const [checked4, setChecked4] = React.useState(false);
  const [checked5, setChecked5] = React.useState(false);
  React.useEffect(() => {
    dispatched(storeLeaveGrantData(leavegrantData));
  }, [dispatched, leavegrantData]);
  const containerRef = React.useRef(null);

  const handleChange1 = () => {
    setChecked((prev) => !prev);
  };
  const handleChange2 = () => {
    setChecked2((prev) => !prev);
  };
  const handleChange3 = () => {
    setChecked3((prev) => !prev);
  };

  const handleChange4 = () => {
    setChecked4((prev) => !prev);
  };
  const handleChange5 = () => {
    setChecked5((prev) => !prev);
  };
  const handleFormSubmit = async () => {
    event.preventDefault();

    try {
      const formValues = {
        ...values,
        allow_request_for_past_dates: values.pastDate + " " + values.pastday_value + " " + "days",
        allow_request_for_future_dates:
          values.futureDate + " " + values.futureday_value + " " + "days",
        max_no_of_request_allowed:
          values.max_no_of_request_allowed + " " + values.maximum_number_of_specific_period_input,
      };
      console.log(formValues, "formdata");
      setLeavegrantData(formValues);
      const response = await axios.post("http://10.0.20.133:8001/mg_leave_grant", formValues, {
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
      <Box
        sx={{
          padding: 2,

          overflow: "hidden",
        }}
        ref={containerRef}
      >
        <Box>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange1} />}
            label="Minimum limit for requests"
          />
          <Slide
            direction="left"
            in={checked}
            container={containerRef.current}
            mountOnEnter
            unmountOnExit
          >
            <Grid container p={3} display={"flex"} xs={12} sm={12}>
              <Grid sm={4}>
                <MDTypography variant="body2">Minimum </MDTypography>
              </Grid>
              <Grid sm={4}>
                <MDInput
                  name="min_limit_for_request"
                  value={values.min_limit_for_request}
                  onChange={handleChange}
                  sx={{ width: "40%" }}
                />
              </Grid>
              <Grid sm={4}>
                <MDTypography variant="body2">day(s)</MDTypography>
              </Grid>
            </Grid>
          </Slide>
          <FormControlLabel
            control={<Switch checked={checked2} onChange={handleChange2} />}
            label="Maximum limit for requests "
          />
          <Slide
            direction="left"
            in={checked2}
            container={containerRef.current}
            mountOnEnter
            unmountOnExit
          >
            <Grid container p={3} display={"flex"} xs={12} sm={12}>
              <Grid sm={4}>
                <MDTypography variant="body2">Maximum </MDTypography>
              </Grid>
              <Grid sm={4}>
                <MDInput
                  name="max_limit_for_request"
                  value={values.max_limit_for_request}
                  onChange={handleChange}
                  sx={{ width: "40%" }}
                />
              </Grid>
              <Grid sm={4}>
                <MDTypography variant="body2">day(s)</MDTypography>
              </Grid>
            </Grid>
          </Slide>
          <FormControlLabel
            control={<Switch checked={checked3} onChange={handleChange3} />}
            label="Maximum number of requests allowed within the specified period"
          />
          <Slide
            direction="left"
            in={checked3}
            container={containerRef.current}
            mountOnEnter
            unmountOnExit
          >
            <Grid container p={3} display={"flex"} xs={12} sm={12}>
              <Grid sm={4}>
                <MDInput
                  name="max_no_of_request_allowed"
                  value={values.max_no_of_request_allowed}
                  onChange={handleChange}
                  sx={{ width: "40%" }}
                />
              </Grid>
              <Grid sm={4}>
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
          </Slide>
          <FormControlLabel
            control={<Switch checked={checked4} onChange={handleChange4} />}
            label="Minimum interval between two requests"
          />
          <Slide
            direction="left"
            in={checked4}
            container={containerRef.current}
            mountOnEnter
            unmountOnExit
          >
            <Grid container p={3} display={"flex"} xs={12} sm={12}>
              <Grid sm={4}>
                <MDTypography variant="body2">Minimum </MDTypography>
              </Grid>
              <Grid sm={4}>
                <MDInput
                  name="min_between_two_request"
                  value={values.min_between_two_request}
                  onChange={handleChange}
                  sx={{ width: "40%" }}
                />
              </Grid>
              <Grid sm={4}>
                <MDTypography variant="body2">day(s)</MDTypography>
              </Grid>
            </Grid>
          </Slide>
          <FormControlLabel
            control={<Switch checked={checked5} onChange={handleChange5} />}
            label=" Upload supporting documents if the request exceeds the specified period
          "
          />
          <Slide
            direction="left"
            in={checked5}
            container={containerRef.current}
            mountOnEnter
            unmountOnExit
          >
            <Grid container p={3} display={"flex"} xs={12} sm={12}>
              <Grid sm={4}>
                <MDInput
                  name="upload_supporting_documents"
                  value={values.upload_supporting_documents}
                  onChange={handleChange}
                  sx={{ width: "40%" }}
                />
              </Grid>
              <Grid sm={4}>
                <MDTypography variant="body2">day(s)</MDTypography>
              </Grid>
            </Grid>
          </Slide>
        </Box>
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
              <Grid item xs={12} sm={12} display={"flex"} mt={-2.5}>
                <Grid sm={2}>
                  <Checkbox
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
                    sx={{ width: "90%" }}
                  />{" "}
                </Grid>
                <Grid sm={3}>
                  <MDTypography variant="body2">days</MDTypography>{" "}
                </Grid>
              </Grid>
            )}
            <Grid container spacing={3} pl={2} pt={1}>
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
                      sx={{ width: "90%" }}
                    />{" "}
                  </Grid>
                  <Grid sm={3}>
                    <MDTypography variant="body2">days</MDTypography>{" "}
                  </Grid>
                </Grid>
              </>
            )}
          </FormControl>
        </Grid>
      </Box>
      <MDButton variant="gradient" color="info" type="submit" onClick={handleFormSubmit}>
        Save
      </MDButton>
    </form>
  );
}
