import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";
import {
  Autocomplete,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import row from "antd/es/row";
import MultipleSelectChip from "./chipSelect";
import FormField from "layouts/applications/wizard/components/FormField";
import CreateApplicableType from "./createApplicableType";
import MDButton from "components/MDButton";
import { useFormik } from "formik";
import { leaveSchema } from "./schema";
import RestrictionTable from "layouts/pages/leave/restrictionTable";
import EntitlementTable from "layouts/pages/leave/entitlementTable";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSectionName,
  updateClassName,
  updateAcademicName,
} from "../../../Redux/action/dummyDataActions";
import MDBox from "components/MDBox";
import { useState } from "react";
import { message } from "antd";

const initialValues = {
  leave_type_name: "",
  leave_type_code: "",
  leave_type: "",
  description: "",
  prorate_accural: {},
  deductible_Holidays: "",
  efective_after_input: "",
  efective_after_select: "",
  efective_after_from: "",
  accural_select1: "",
  accural_select2: "",
  accural_select3: "",
  accural_select4: "",
  accural_input: "",
  reset_select1: "",
  reset_select2: "",
  reset_select3: "",
  reset_select4: "",
  reset_select5: "",
  reset_select6: "",
  reset_input1: "",
  reset_input2: "",
  reset_input3: "",
  reset_input4: "",
  opening_balance: "",
  maximum_balance: "",
};
const selectData = {
  gender: ["Male", "Female"],

  skills: ["react", "vue", "angular", "svelte", "javascript"],
  effectiveAter: ["Days", "Month", "Year"],
  month: ["Jan", "Feb", "Mar"],
  date: ["1st", "2nd", "3rd"],
  type_accural: ["Yearly", "Monthly", "Weekly"],
  accural_in: ["Current Accural ", "Next Accural"],
  resetCarryForward: ["Carry Forward", "Carry Forward with Expiry", "Carry Forward with OverLimit"],
  unit: ["Unit", "Percentage"],
  effectiveFrom: ["Date of Confirmation", "Date of Joining"],
  ProrateAccrual: ["Start of Policy", "Start and End of Policy", "Do not protrate"],
  DeductibleHolidays: ["All Holiday", "Holiday on workdays"],
};
function TabPanel(props: { [x: string]: any; children: any; value: any; index: any }) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: "common.white",
  bgcolor: green[500],
  "&:hover": {
    bgcolor: green[600],
  },
};

function MainCreateLeavePage() {
  const token = Cookies.get("token");
  const dispatched = useDispatch();
  const [clickbtn, setClickbtn] = React.useState(false);

  const checkMainbtnClick = useSelector((state: any) => state.className);
  console.log("checkMainbtnClick", checkMainbtnClick);
  const tableBtnClick = checkMainbtnClick?.name;
  React.useEffect(() => {
    dispatched(updateAcademicName(tableBtnClick));
    // console.log(dispatched, "dispatfrhjufwefhevhjwvfhj");
  }, [dispatched, tableBtnClick]);
  const handleSubmitForm = async (formValues: { entitlements: any }) => {
    // Implement your form submission logic here.
    // You can make the API request here or perform any other actions.
    try {
      // Your API call or other logic here...
      const response = await axios.post(
        "http://10.0.20.133:web/mg_entitlement",
        formValues.entitlements,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log("Created SchoolPage Successfully");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: leaveSchema,
    enableReinitialize: true,
    onSubmit: (values: any, action: { resetForm: () => void }) => {
      console.log(" ~ file: Registration.jsx ~ line 11 ~ Registration ~ values", values);
      action.resetForm();
    },
  });
  const [isChecked, setIsChecked] = React.useState(false);
  const [isPastChecked, setIsPastChecked] = React.useState(false);
  const [isFutureChecked, setIsFutureChecked] = React.useState(false);

  const [selectedOption, setSelectedOption] = React.useState("allow");
  const [isCheckedReset, setIsCheckedReset] = React.useState(false);
  const [additionalFields, setAdditionalFields] = React.useState([0]); // Initialize with one set of fields
  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [unit, setUnit] = useState("");
  const [balancebasedOn, setBalancebasedOn] = useState("");

  console.log("myname", token);
  const leavebalance_redux = { name: balancebasedOn };
  // const [editvalue, setEditvalue] = useState(null);
  // const [editDatap, setEditDatap] = useState(editData ? editData.editData : null);
  // const [showDatap, setShowDatap] = useState(showData ? editData.showData : null);
  // console.log(editvalue);

  React.useEffect(() => {
    dispatched(updateSectionName(leavebalance_redux));
    // console.log(dispatched, "dispatfrhjufwefhevhjwvfhj");
  }, [dispatched, leavebalance_redux]);
  //   const checkMainbtnClick = useSelector((state: any) => state.className);
  //   console.log("checkMainbtnClick", checkMainbtnClick);

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
        entitlement: entitlementData.entitlements,
        leave_grant: leaveGrantData,
        applicable: applicableData.applicable,
        restriction: restrictionData.restriction,
      };

      console.log(formValues, "formdata");
      //   console.log(values, "formdata");
      const response = await axios.post("http://10.0.20.133:8000/mg_leave_type", formValues, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      if (response.status === 200) {
        console.log("Valueset Create Leaved Successfully");
        message.success("created Leave successFully");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  // Step 2: Function to add more fields
  const addMoreFields = () => {
    setAdditionalFields([...additionalFields, additionalFields.length]);
  };
  const handleChanged = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: React.SetStateAction<number>) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  const entitlementData = useSelector((state: any) => state.entitlementName);
  console.log("entitlementDghhhhhhhhhdfgdftxdgfdghfhgata", entitlementData);
  const restrictionData = useSelector((state: any) => state.restrictionData);
  console.log("restrictionDghhhhhhhhhdfgdftxdgfdghfhgata", restrictionData);
  const applicableData = useSelector((state: any) => state.applicableData);
  console.log("applicableDataghhhhhhhhhdfgdftxdgfdghfhgata", applicableData);
  const leaveGrantData = useSelector((state: any) => state.leavegrantData);
  console.log("leaveGrantDataghhhhhhhhhdfgdftxdgfdghfhgata", leaveGrantData);
  console.log({ entitlementData, restrictionData, applicableData, leaveGrantData }, "main data");

  return (
    <Card>
      <MDBox p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9}>
            <MDTypography variant="h5">{"Create Leave Type"}</MDTypography>
          </Grid>
          <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
            <MDButton variant="gradient" color="info" type="submit" onClick={handleFormSubmit}>
              {"Save All"}
            </MDButton>
          </Grid>
          <Grid item xs={12} sm={3}>
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
              <Grid>
                {" "}
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.leave_type_name}
                </MDTypography>
              </Grid>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={3}>
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
              <Grid>
                {" "}
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.leave_type_code}
                </MDTypography>
              </Grid>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={3}>
            {/* <InputLabel htmlFor="leave_type">Type</InputLabel> */}

            <Autocomplete
              // multiple
              onChange={(event, value) => {
                handleChange({
                  target: { name: "leave_type", value },
                });
              }}
              // value={department}
              // onChange={handleMainFieldChange}
              options={["Paid", "Unpaid", "Onduty", "Restricted Holiday"]}
              renderInput={(params) => (
                <FormField
                  label={"Type"}
                  InputLabelProps={{ shrink: true }}
                  name="leave_type"
                  onChange={handleChange}
                  value={values.leave_type}
                  {...params}
                  variant="standard"
                />
              )}
            />
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
          <Grid item xs={12} sm={2.5}>
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
          <Grid item xs={12} sm={2.5}>
            <MDTypography component="label" variant="button" fontWeight="regular" color="text">
              Start Date
            </MDTypography>
            <MDInput
              type="date"
              // format="dd/mm/yyyy"
              // defaultValue="12/02.5/2.502.52"
              variant="standard"
              sx={{ width: "100%" }}
              value={date}
              onChange={(e: any) => setDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2.5}>
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
          <Grid item xs={12} sm={4.5}>
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
              rows={3}
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

      <Box
        sx={{
          bgcolor: "background.paper",
          // width: 500,
          position: "relative",
          minHeight: 200,
        }}
      >
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChanged}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab label="Entitlement" {...a11yProps(0)} />
            <Tab label=" Applicable" {...a11yProps(1)} />
            <Tab label=" Restrictions" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <EntitlementTable />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <CreateApplicableType />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <RestrictionTable clickbtn={clickbtn} />
            {/* <EntitlementTable /> */}
          </TabPanel>
        </SwipeableViews>
      </Box>
      {/* <MDButton onClick={handleFormSubmit}>save all the data</MDButton> */}
    </Card>
  );
}

export default MainCreateLeavePage;
