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

const initialValues = {
  leave_type_name: "",
  leave_type_code: "",
  leave_type: "",
  description: "",
  // prorate_Accrual: "",
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

function CreateLeaveTable() {
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

  return (
    <Card>
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
            {/* Restrictions */}
            {/* <MDTypography variant="h5">Weekends Between Leave Period :</MDTypography>
             */}
            <RestrictionTable clickbtn={clickbtn} />
            {/* <EntitlementTable /> */}
          </TabPanel>
        </SwipeableViews>
      </Box>
      <MDButton onClick={() => setClickbtn(true)}>save all the data</MDButton>
    </Card>
  );
}

export default CreateLeaveTable;
