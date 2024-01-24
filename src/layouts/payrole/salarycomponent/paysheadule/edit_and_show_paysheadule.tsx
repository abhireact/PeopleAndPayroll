import React, { useState, useEffect } from "react";
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
  Dialog,
  IconButton,
} from "@mui/material";
import MDInput from "components/MDInput";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import { Field, useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
function EditAndShowPaysheadule() {
  const [openPopup, setOpenPopup] = useState(false);
  const dataTableData = {
    columns: [
      { Header: "Pay Period", accessor: "pay_period", width: "70%" },
      { Header: "Pay Date", accessor: "pay_date", width: "30%" },
    ],
    rows: [{ pay_period: "November-2023", pay_date: "24/11/2023" }],
  };
  return (
    <form>
      <Dialog open={openPopup}>
        <Card sx={{ width: "100%", margin: "auto", mt: "2%" }}>
          <Grid container spacing={3} pb={1} px={2}>
            <Grid item xs={12} sm={9}>
              <MDTypography variant="h5" pl={2}>
                Change Pay Day
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setOpenPopup(false)}
              >
                <Icon fontSize="small">close</Icon>
              </IconButton>
            </Grid>
          </Grid>
          <hr />
          <Grid container p={2}>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h6">Pay your employees on*</MDTypography>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="The last working day of every month"
                name="payemployeeon"
              >
                <FormControlLabel
                  value="The last working day of every month"
                  control={
                    <Radio
                      // checked={values.payemployeeon.includes("The last working day of every month")}
                      // onChange={handleChange}
                      name="payemployeeon"
                      value="The last working day of every month"
                    />
                  }
                  label={
                    <MDTypography variant="body2">The last working day of every month</MDTypography>
                  }
                />
                <FormControlLabel
                  //   value="female"
                  control={
                    <Radio
                      // checked={values.payemployeeon.includes("days")}
                      // onChange={handleChange}
                      name="payemployeeon"
                      value="days"
                    />
                  }
                  label={
                    <>
                      <Grid container spacing={2} p={2}>
                        <MDTypography variant="body2">day</MDTypography>
                        <MDInput
                          px={2}
                          // disabled
                          name="whichday"
                          type="number"
                          // value={values.whichday}
                          // onChange={handleChange}
                          size="small"
                          sx={{ width: "15%" }}
                        />
                        <MDTypography variant="body2">of every month</MDTypography>
                      </Grid>
                    </>
                  }
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h6">
                Salary for the month of November-2023 will be paid on*
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                // onChange={(_event, value) => {
                //   handleChange({ target: { name: "earning_type_name", value } });
                // }}
                options={["24/11/2023", "25/12/2023"]}
                //   onChange={(e: any) => setearning_type_name(e.target.value)}
                renderInput={(params) => (
                  <MDInput
                    name="earning_type_name"
                    // onChange={handleChange}
                    // value={values.earning_type_name}
                    // label="Earning Type "
                    {...params}
                    size="small"
                    // variant="standard"
                  />
                )}
              />
            </Grid>
          </Grid>

          <hr />
          <Grid container spacing={3} py={1}>
            <Grid item xs={12} sm={12} display="flex" justifyContent="flex-end">
              <Grid container spacing={3} display="flex" justifyContent="flex-end">
                <Grid item>
                  <MDButton variant="outlined" color="secondary">
                    {"cancel"}
                  </MDButton>
                </Grid>
                <Grid item px={2}>
                  <MDButton variant="gradient" color="info" type="submit">
                    {"  Save  "}
                  </MDButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Dialog>
      <Card sx={{ width: "80%", margin: "auto", mt: "2%" }}>
        <Grid container spacing={1} p={2}>
          <Grid item xs={12} sm={12}>
            <MDTypography variant="h3">Pay Schedule</MDTypography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={12} pb={2}>
            <MDTypography variant="h5">
              This Organisation&apos;s payroll runs on this schedule.
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDTypography variant="subtitle2">Pay Frequency</MDTypography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <MDTypography variant="inherit">Every month (Monthly)</MDTypography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDTypography variant="subtitle2">Working Days</MDTypography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <MDTypography variant="inherit">Mon, Tue, Wed, Thu, Fri</MDTypography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDTypography variant="subtitle2">Pay Day</MDTypography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <MDTypography variant="inherit">
              25th of every month{" "}
              <MDButton onClick={() => setOpenPopup(true)}>{"(Change)"}</MDButton>
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDTypography variant="subtitle2">First Pay Period</MDTypography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <MDTypography variant="inherit">August 2023</MDTypography>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ width: "80%", margin: "auto", mt: "2%" }}>
        <DataTable table={dataTableData} />
      </Card>
    </form>
  );
}

export default EditAndShowPaysheadule;
