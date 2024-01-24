import { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, useFormik } from "formik";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import FormField from "../account/components/FormField";
import createLeaveTable from "./createLeaveTable";
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
// import { I18nextProvider, useTranslation } from "react-i18next";

// For time and date
import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
// import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
// import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { MobileDatePicker } from "@mui/x-date-pickers";
import { leaveSchema } from "./schema";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import CreateLeaveTable from "./createLeaveTable";
import RestrictionTable from "./restrictionTable";
import EntitlementTable from "./entitlementTable";

const initialValues = {
  leave_type_name: "",
  leave_type_code: "",
  leave_type: "",
  description: "",
};
import { updateSectionName } from "../../../Redux/action/dummyDataActions";
import { message } from "antd";
function CreateLeave() {
  //   const { edittValues, setEditwValues } = useState(null);
  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [unit, setUnit] = useState("");
  const [balancebasedOn, setBalancebasedOn] = useState("");
  const dispatched = useDispatch();
  const token = Cookies.get("token");
  console.log("myname", token);
  const leavebalance_redux = { name: balancebasedOn };
  // const [editvalue, setEditvalue] = useState(null);
  // const [editDatap, setEditDatap] = useState(editData ? editData.editData : null);
  // const [showDatap, setShowDatap] = useState(showData ? editData.showData : null);
  // console.log(editvalue);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: leaveSchema,
    enableReinitialize: true,
    onSubmit: (values: any, action: { resetForm: () => void }) => {
      console.log(" ~ file: Registration.jsx ~ line 11 ~ Registration ~ values", values);
      action.resetForm();
    },
  });
  useEffect(() => {
    dispatched(updateSectionName(leavebalance_redux));
    // console.log(dispatched, "dispatfrhjufwefhevhjwvfhj");
  }, [dispatched, leavebalance_redux]);
  const checkMainbtnClick = useSelector((state: any) => state.className);
  console.log("checkMainbtnClick", checkMainbtnClick);

  const handleFormSubmit = async () => {
    try {
      console.log(balancebasedOn, "balance basedd on ");
      // const myElement = <EntitlementTable balanceOn={balancebasedOn} />;
      const formValues = {
        ...values,

        start_date: date,
        end_date: endDate,
        leave_type: leaveType,
        balance_based_on: balancebasedOn,
        unit: unit,
      };

      console.log(formValues, "formdata");
      console.log(values, "formdata");
      const response = await axios.post("http://10.0.20.133:8000/mg_leave_type", formValues, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      if (response.status === 200) {
        // navigate("/pages/auth/otp");
        message.success("Leave Type Created successfully");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  if (checkMainbtnClick?.name == true) {
    handleFormSubmit();
  }
  return (
    // <DashboardLayout>
    //   <DashboardNavbar />
    //   <Card sx={{ width: "80%", margin: "auto", mt: "2%" }}>
    <form onSubmit={handleSubmit}>
      <MDBox p={3}>
        <Grid container>
          <Grid item xs={12} sm={9}>
            <MDTypography variant="h5">{"create Leave Type"}</MDTypography>
          </Grid>
          <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end"></Grid>
          <Grid item xs={12} sm={4}>
            {/* <FormField type="text" label={"Leave name *"} defaultValue="" /> */}
            <MDInput
              required
              type="name"
              label="Leave Name "
              name="leave_type_name"
              value={values.leave_type_name}
              // disabled={editData.showData ? true : false}
              placeholder="Enter Your Leave name "
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.leave_type_name && touched.leave_type_name}
              success={values.leave_type_name.length && !errors.leave_type_name}
            />
            {errors.leave_type_name && touched.leave_type_name ? (
              // <p className="form-error">{errors.name}</p>
              <MDTypography variant="caption" fontWeight="regular" color="error">
                {errors.leave_type_name}
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* <MDInput type="text" label={"Leave code *"} defaultValue="" /> */}
            <MDInput
              type="name"
              required
              label="Leave Code "
              name="leave_type_code"
              value={values.leave_type_code}
              // disabled={editData.showData ? true : false}
              placeholder="Enter Your Leave Code "
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.leave_type_code && touched.leave_type_code}
              success={values.leave_type_code.length && !errors.leave_type_code}
            />
            {errors.leave_type_code && touched.leave_type_code ? (
              // <p classleave_type_code="form-error">{errors.leave_type_code}</p>
              <MDTypography variant="caption" fontWeight="regular" color="error">
                {errors.leave_type_code}
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={4}>
            <InputLabel htmlFor="leave_type">Type</InputLabel>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <Select
                id="leave_type"
                required
                name="leave_type"
                labelId="demo-simple-select-standard-label"
                label="leave_type"
                value={leaveType} // Set the selected value of message type
                onChange={(e) => setLeaveType(e.target.value)} // Update the selected message type
              >
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="unPaid">UnPaid</MenuItem>
                <MenuItem value="onDuty">On Duty</MenuItem>
                <MenuItem value="restrictedHoliday">Restricted Holiday</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                {" "}
                <MDTypography variant="body2"> Unit* </MDTypography>{" "}
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={unit} // Set the selected value of message type
                onChange={(e) => setUnit(e.target.value)} // Update the selected message type
              >
                <FormControlLabel
                  value="days"
                  control={<Radio />}
                  label={<MDTypography variant="body2">Days</MDTypography>}
                />
                <FormControlLabel
                  value="hours"
                  control={<Radio />}
                  label={<MDTypography variant="body2">Hours</MDTypography>}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                <MDTypography variant="body2"> Balance based on* </MDTypography>
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={balancebasedOn} // Set the selected value of message type
                onChange={(e) => setBalancebasedOn(e.target.value)} // Update the selected message type
              >
                <FormControlLabel
                  value="Fixed entitlement"
                  control={<Radio />}
                  label={<MDTypography variant="body2">Fixed entitlement </MDTypography>}
                />
                <FormControlLabel
                  value="Leave grant"
                  control={<Radio />}
                  label={<MDTypography variant="body2">Leave grant</MDTypography>}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <MDTypography component="label" variant="button" fontWeight="regular" color="text">
              Start Date
            </MDTypography>
            <MDInput
              type="date"
              // format="dd/mm/yyyy"
              // defaultValue="12/03/3032"
              variant="standard"
              sx={{ width: "100%" }}
              value={date}
              onChange={(e: any) => setDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <MDTypography component="label" variant="button" fontWeight="regular" color="text">
              End Date
            </MDTypography>
            <MDInput
              type="date"
              // format="dd/mm/yyyy"
              // defaultValue="12/03/3032"
              variant="standard"
              sx={{ width: "100%" }}
              value={endDate}
              onChange={(e: any) => setEndDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block"> */}
            <MDTypography component="label" variant="button" fontWeight="regular" color="text">
              Description
            </MDTypography>

            <MDInput
              type="name"
              // label="Leave Name "
              name="description"
              label={"typehere"}
              multiline
              rows={6}
              sx={{ width: "100%" }}
              // value={greetingMessage}
              // onChange={(e: any) => setGreetingMessage(e.target.value)}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.description && touched.description}
              success={values.description.length && !errors.description}
            />
            {errors.description && touched.description ? (
              // <p className="form-error">{errors.name}</p>
              <MDTypography variant="caption" fontWeight="regular" color="error">
                {errors.description}
              </MDTypography>
            ) : null}
          </Grid>
        </Grid>
      </MDBox>

      {/* <RestrictionTable /> */}
      {/* <CreateLeaveTable /> */}
    </form>
    //   </Card>
    // </DashboardLayout>
  );
}

export default CreateLeave;
