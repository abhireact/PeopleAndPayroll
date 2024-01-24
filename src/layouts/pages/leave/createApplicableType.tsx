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
import { leaveSchema } from "./schema";
import { useFormik } from "formik";
import MDButton from "components/MDButton";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  storeApplicableData,
  storeRestrictionData,
  storeRoleseData,
} from "Redux/action/dummyDataActions";
// import selectData from "../account/settings/components/BasicInfo/data/selectData";
const initialValues = {
  gender: [] as string[],
  martial_status: [] as string[],
  department: [] as string[],
  designation: [] as string[],
  location: [] as string[],
  role: [] as string[],
  employee: false,
  prorate_accural: "ggf",
  source_of_hire: [] as string[],
  onboarding_status: [] as string[],
  employee_type: [] as string[],
  exception_department: [] as string[],
  exception_designation: [] as string[],
  exceptional_location: [] as string[],
  exception_role: [] as string[],
  // employee: [] as string[],
  exception_source_of_hire: [] as string[],
  exception_onboarding_status: [] as string[],
  exception_employee_type: [] as string[],
};
const selectData = {
  gender: ["male", "female"],

  skills: ["react", "vue", "angular", "svelte", "javascript"],
  departments: ["All Departments", "HR", "Product", "Sales", "Services", "IT", "Marketing"],
  designation: [
    "Head of Department",
    "Executive",
    "Associate",
    "Officer",
    "Public Relationionship Officer",
    "Developer",
  ],
  location: ["sacramento", "New York", "Bruges", "Mumbai", "Busan", "Banaswadi"],
  role: ["admin", "employee", "tl", "team incharge", "manager"],
  employee: ["All Employment"],
  source_of_hire: ["referral", "web", "advertisement", "direct", "newspaper"],
  onboarding_status: ["Triggered", "Not Triggered", "In Progress", "Completed"],
  employee_type: ["trainee", "temporary", "permanent", "on contact"],
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
const CreateApplicableType = () => {
  const WorkLocation = useSelector((state: any) => state.workLocationData);
  console.log("WorkLocation", WorkLocation);

  const location_name = [];

  if (WorkLocation && WorkLocation.length > 0) {
    const uniqueLocationNames = new Set();

    for (let i = 0; i < WorkLocation.length; i++) {
      const locationName = WorkLocation[i]["location_name"];
      uniqueLocationNames.add(locationName);
    }

    // Convert the Set to an array if needed
    location_name.push(...uniqueLocationNames);
  }

  console.log(location_name, "location");

  const Department = useSelector((state: any) => state.departmentData);
  console.log("Department", Department);
  const dept_name = [];

  if (Department && Department.length > 0) {
    const uniqueDepartmentNames = new Set();

    for (let i = 0; i < Department.length; i++) {
      const departmentName = Department[i]["dept_name"];
      uniqueDepartmentNames.add(departmentName);
    }

    // Convert the Set to an array if needed
    dept_name.push(...uniqueDepartmentNames);
  }

  console.log(dept_name, "departmentName");
  const Designation = useSelector((state: any) => state.designationData);
  console.log("Designation", Designation);
  const des_name = [];

  if (Designation && Designation.length > 0) {
    const uniqueDesignationNames = new Set();

    for (let i = 0; i < Designation.length; i++) {
      const DesignationName = Designation[i]["des_name"];
      uniqueDesignationNames.add(DesignationName);
    }

    // Convert the Set to an array if needed
    des_name.push(...uniqueDesignationNames);
  }

  console.log(des_name, "DesignationName");
  const EmployeeData = useSelector((state: any) => state.employeeData);
  console.log("Employee", EmployeeData);
  const emoployee_name = [];

  if (EmployeeData && EmployeeData.length > 0) {
    const uniqueEmployeeDataNames = new Set();

    for (let i = 0; i < EmployeeData.length; i++) {
      const EmployeeDataName = EmployeeData[i]["first_name"];
      uniqueEmployeeDataNames.add(EmployeeDataName);
    }

    // Convert the Set to an array if needed
    emoployee_name.push(...uniqueEmployeeDataNames);
  }

  console.log(emoployee_name, "EmployeeDataName");
  const [applicableData, setApplicableData] = React.useState({});
  const theme = useTheme();
  const dispatched = useDispatch();

  const [value, setValue] = React.useState(0);
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
  React.useEffect(() => {
    dispatched(storeApplicableData(applicableData));
    // console.log(dispatched, "dispatfrhjufwefhevhjwvfhj");
  }, [dispatched, applicableData]);
  console.log("myname", token);
  const checkMainbtnClick = useSelector((state: any) => state.academicName);
  console.log("checkMainbtnClick", checkMainbtnClick);
  //   const addMoreFields = () => {
  //     setAdditionalFields([...additionalFields, additionalFields.length]);
  //   };
  const [roles, setRoles] = React.useState([]);
  const [department, setMainFieldValue] = React.useState([]);
  const [exception_department, setExceptionFieldValue] = React.useState([]);
  const [designation, setDesignation] = React.useState([]);
  const [exception_designation, setExceptionDesignation] = React.useState([]);
  const [location, setLocation] = React.useState([]);
  const [exceptional_location, setExceptionLocation] = React.useState([]);
  const [role, setRole] = React.useState([]);
  const [exception_role, setExceptionRole] = React.useState([]);
  const [source_of_hire, setSourceofHire] = React.useState([]);
  const [exception_source_of_hire, setExceptionSourceofHire] = React.useState([]);
  const [employee_type, setEmployment] = React.useState([]);
  const [exception_employee_type, setExceptionEmployment] = React.useState([]);
  const [onboarding_status, setOnboardingStatus] = React.useState([]);
  const [exception_onboarding_status, setExceptionOnboardingStatus] = React.useState([]);

  const role_display_name = [];

  if (roles && roles?.length > 0) {
    const uniquerolesNames = new Set();

    for (let i = 0; i < roles?.length; i++) {
      const rolesName = roles[i]["role_display_name"];
      console.log(rolesName, "rolesName");

      uniquerolesNames.add(rolesName);
    }

    // Convert the Set to an array if needed
    role_display_name.push(...uniquerolesNames);
  }

  console.log(role_display_name, "role_display_name");
  const fetchRoles = async (location_name: undefined) => {
    try {
      const response = await axios.post(
        "http://10.0.20.133:8000/mg_roles/get_roles_by_location ",
        { location_name }, // Send the location as part of the request body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response, "response");

      const roles = await response.data;
      console.log(roles, typeof roles);
      setRoles(roles);
    } catch (error) {
      console.log("Error fetching classdata:", error);
    }
  };
  React.useEffect(() => {
    dispatched(storeRoleseData(roles));
  }, [dispatched, roles]);
  const handleMainFieldChange = (event: any, value: React.SetStateAction<any[]>) => {
    setMainFieldValue(value);
  };

  const handleExceptionFieldChange = (event: any, value: React.SetStateAction<any[]>) => {
    setExceptionFieldValue(value);
  };
  const handleLocationChange = (event: any, value: React.SetStateAction<any[]>) => {
    setLocation(value);
  };

  const handleExceptionLocationChange = (event: any, value: React.SetStateAction<any[]>) => {
    setExceptionLocation(value);
  };
  const handleRoleChange = (event: any, value: React.SetStateAction<any[]>) => {
    setRole(value);
  };

  const handleExceptionRoleChange = (event: any, value: React.SetStateAction<any[]>) => {
    setExceptionRole(value);
  };
  const handleSourceofHireChange = (event: any, value: React.SetStateAction<any[]>) => {
    setSourceofHire(value);
  };

  const handleExceptionSourceofHireChange = (event: any, value: React.SetStateAction<any[]>) => {
    setExceptionSourceofHire(value);
  };
  const handleEmploymentChange = (event: any, value: React.SetStateAction<any[]>) => {
    setEmployment(value);
  };

  const handleExceptionEmploymentChange = (event: any, value: React.SetStateAction<any[]>) => {
    setExceptionEmployment(value);
  };
  const handleOnboardingStatusChange = (event: any, value: React.SetStateAction<any[]>) => {
    setOnboardingStatus(value);
  };

  const handleExceptionOnboardingStatusChange = (
    event: any,
    value: React.SetStateAction<any[]>
  ) => {
    setExceptionOnboardingStatus(value);
  };
  const handleDesignationChange = (event: any, value: React.SetStateAction<any[]>) => {
    setDesignation(value);
  };

  const handleExceptionDesignationChange = (event: any, value: React.SetStateAction<any[]>) => {
    setExceptionDesignation(value);
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
  const handleFormSubmit = async () => {
    try {
      const formValues = {
        ...values,
        // department: department,
        // designation: designation,
        // location: location,
        // role: role,
        // employee: "",
        // source_of_hire: source_of_hire,
        // onboarding_status: onboarding_status,
        // employee_type: employee_type,
        // exception_department: exception_department,
        // exception_designation: exception_designation,
        // exceptional_location: exceptional_location,
        // exception_role: exception_role,

        // exception_source_of_hire: exception_source_of_hire,
        // exception_onboarding_status: exception_onboarding_status,
        // exception_employee_type: exception_employee_type,
      };
      ("");
      console.log(formValues, "formdata");
      const x = { applicable: formValues };
      console.log(x, "value of restriction");

      setApplicableData(x);
      const response = await axios.post("http://10.0.20.133:8001/mg_applicable", values, {
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
  if (checkMainbtnClick?.name === true) {
    handleFormSubmit();
  }
  return (
    <form onSubmit={handleSubmit}>
      {/* <Card> */}
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
            <Tab label="Applicable" {...a11yProps(0)} />
            <Tab label=" Exceptions" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row sx={{ marginTop: "50px" }}>
                <MDTypography variant="h6" sx={{ marginLeft: "20px" }}>
                  Gender:
                </MDTypography>
                <FormControlLabel
                  sx={{ marginLeft: "100px" }}
                  // value="top"
                  control={
                    <Checkbox
                      checked={values.gender.includes("male")}
                      onChange={handleChange}
                      name="gender"
                      value="male"
                    />
                  }
                  label={<MDTypography variant="body2"> Male</MDTypography>}
                  labelPlacement="end"
                />
                <FormControlLabel
                  // value="start"
                  control={
                    <Checkbox
                      checked={values.gender.includes("female")}
                      onChange={handleChange}
                      name="gender"
                      value="female"
                    />
                  }
                  label={<MDTypography variant="body2"> Female</MDTypography>}
                  labelPlacement="end"
                />
                <FormControlLabel
                  // value="bottom"
                  control={
                    <Checkbox
                      checked={values.gender.includes("Other")}
                      onChange={handleChange}
                      name="gender"
                      value="Other"
                    />
                  }
                  label={<MDTypography variant="body2"> Other</MDTypography>}
                  labelPlacement="end"
                />
              </FormGroup>
            </FormControl>
            <FormControl component="fieldset">
              {/* <FormMDTypography component="legend">Duration(s) Allowed :</FormMDTypography> */}
              <FormGroup aria-label="position" row sx={{ marginTop: "50px" }}>
                <MDTypography variant="h6" sx={{ marginLeft: "200px" }}>
                  Marital Status:
                </MDTypography>
                <FormControlLabel
                  sx={{ marginLeft: "100px" }}
                  value="top"
                  control={
                    <Checkbox
                      checked={values.martial_status.includes("Single")}
                      onChange={handleChange}
                      name="martial_status"
                      value="Single"
                    />
                  }
                  label={<MDTypography variant="body2"> Single</MDTypography>}
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="start"
                  control={
                    <Checkbox
                      checked={values.martial_status.includes("Married")}
                      onChange={handleChange}
                      name="martial_status"
                      value="Married"
                    />
                  }
                  label={<MDTypography variant="body2"> Married</MDTypography>}
                  labelPlacement="end"
                />
              </FormGroup>
            </FormControl>
            {!values.exception_department.length && (
              <Grid container xs={12} sm={12} p={2}>
                <Grid sm={5}>
                  {" "}
                  <MDTypography variant="h6">Department:</MDTypography>
                </Grid>
                <Grid sm={7}>
                  {" "}
                  {/* <Autocomplete
                      multiple
                      value={department}
                      onChange={handleMainFieldChange}
                      options={selectData.departments}
                      renderInput={(params) => (
                        <FormField label={""} {...params} InputLabelProps={{ shrink: true }} />
                      )}
                    /> */}
                  <Autocomplete
                    multiple
                    onChange={(event, value) => {
                      handleChange({ target: { name: "department", value } });
                    }}
                    // value={department}
                    // onChange={handleMainFieldChange}
                    options={dept_name}
                    renderInput={(params) => (
                      <FormField
                        label={""}
                        InputLabelProps={{ shrink: true }}
                        name="department"
                        onChange={handleChange}
                        value={values.department}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}
            {!values.exception_designation.length && (
              <Grid container xs={12} sm={12} p={2}>
                <Grid sm={5}>
                  {" "}
                  <MDTypography variant="h6">Designation:</MDTypography>
                </Grid>
                <Grid sm={7}>
                  {" "}
                  {/* <Autocomplete
                      multiple
                      value={designation}
                      onChange={handleDesignationChange}
                      options={selectData.designation}
                      renderInput={(params) => (
                        <FormField label={""} {...params} InputLabelProps={{ shrink: true }} />
                      )}
                    /> */}
                  <Autocomplete
                    multiple
                    onChange={(event, value) => {
                      handleChange({ target: { name: "designation", value } });
                    }}
                    // value={designation}
                    // onChange={handleMainFieldChange}
                    options={des_name}
                    renderInput={(params) => (
                      <FormField
                        label={""}
                        InputLabelProps={{ shrink: true }}
                        name="designation"
                        onChange={handleChange}
                        value={values.designation}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}
            {!values?.exceptional_location?.length && (
              <Grid container xs={12} sm={12} p={2}>
                <Grid sm={5}>
                  {" "}
                  <MDTypography variant="h6">Location</MDTypography>
                </Grid>
                <Grid sm={7}>
                  {" "}
                  {/* <Autocomplete
                      multiple
                      value={location}
                      onChange={handleLocationChange}
                      options={selectData.location}
                      renderInput={(params) => (
                        <FormField label={""} {...params} InputLabelProps={{ shrink: true }} />
                      )}
                    /> */}
                  {/* <Autocomplete
                    // multiple
                    onChange={(event, value) => {
                      handleChange({ target: { name: "location", value } });
                      // Call fetchRoles function with the selected location value
                      fetchRoles(value);
                    }}
                    // value={location}
                    // onChange={handleMainFieldChange}
                    options={location_name}
                    renderInput={(params) => (
                      <FormField
                        label={""}
                        InputLabelProps={{ shrink: true }}
                        name="location"
                        onChange={handleChange}
                        value={values.location}
                        {...params}
                        variant="standard"
                      />
                    )}
                  /> */}
                  <Autocomplete
                    multiple
                    // sx={{ width: "70%" }}
                    onChange={(event: any, value: any) => {
                      handleChange({ target: { name: "location", value } });
                      // Call fetchRoles function with the selected location value
                      // handleChange({ target: { name: "role", value: [] } });
                      fetchRoles(value);
                    }}
                    options={location_name}
                    renderInput={(params: any) => (
                      <FormField
                        // label={"Location"}
                        InputLabelProps={{ shrink: true }}
                        name="location"
                        // placeholder="Enter Your location"
                        onChange={handleChange}
                        value={values.location}
                        {...params}
                        onBlur={handleBlur}
                        error={errors.location && touched.location}
                        success={!errors.location}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}
            {!values?.exception_role?.length && (
              <Grid container xs={12} sm={12} p={2}>
                <Grid sm={5}>
                  {" "}
                  <MDTypography variant="h6">Role:</MDTypography>
                </Grid>
                <Grid sm={7}>
                  {" "}
                  {/* <Autocomplete
                      multiple
                      value={role}
                      onChange={handleRoleChange}
                      options={selectData.role}
                      renderInput={(params) => (
                        <FormField label={""} {...params} InputLabelProps={{ shrink: true }} />
                      )}
                    /> */}
                  {/* <Autocomplete
                    multiple
                    onChange={(event, value) => {
                      handleChange({ target: { name: "role", value } });
                    }}
                    // value={role}
                    // onChange={handleMainFieldChange}
                    options={selectData.role}
                    renderInput={(params) => (
                      <FormField
                        label={""}
                        InputLabelProps={{ shrink: true }}
                        name="role"
                        onChange={handleChange}
                        value={values.role}
                        {...params}
                        variant="standard"
                      />
                    )}
                  /> */}
                  <Autocomplete
                    // sx={{ width: "70%" }}
                    multiple
                    onChange={(event: any, value: any) => {
                      handleChange({ target: { name: "role", value } });
                    }}
                    // value={department}
                    // onChange={handleMainFieldChange}
                    options={["All Roles"]}
                    renderInput={(params: any) => (
                      <FormField
                        // label={"Role"}
                        InputLabelProps={{ shrink: true }}
                        name="role"
                        // placeholder="Enter Your role"
                        onChange={handleChange}
                        value={values.role}
                        {...params}
                        onBlur={handleBlur}
                        error={errors.role && touched.role}
                        success={!errors.role}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}
            {!values.exception_source_of_hire.length && (
              <Grid container xs={12} sm={12} p={2}>
                <Grid sm={5}>
                  {" "}
                  <MDTypography variant="h6">Source of Hire:</MDTypography>
                </Grid>
                <Grid sm={7}>
                  {" "}
                  {/* <Autocomplete
                      multiple
                      value={source_of_hire}
                      onChange={handleSourceofHireChange}
                      options={selectData.source_of_hire}
                      renderInput={(params) => (
                        <FormField label={""} {...params} InputLabelProps={{ shrink: true }} />
                      )}
                    /> */}
                  <Autocomplete
                    multiple
                    onChange={(event, value) => {
                      handleChange({ target: { name: "source_of_hire", value } });
                    }}
                    // value={source_of_hire}
                    // onChange={handleMainFieldChange}
                    options={selectData.source_of_hire}
                    renderInput={(params) => (
                      <FormField
                        label={""}
                        InputLabelProps={{ shrink: true }}
                        name="source_of_hire"
                        onChange={handleChange}
                        value={values.source_of_hire}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}
            {!values.exception_employee_type.length && (
              <Grid container xs={12} sm={12} p={2}>
                <Grid sm={5}>
                  {" "}
                  <MDTypography variant="h6">Employment Type :</MDTypography>
                </Grid>
                <Grid sm={7}>
                  {" "}
                  {/* <Autocomplete
                      multiple
                      value={employee_type}
                      onChange={handleEmploymentChange}
                      options={selectData.employee_type}
                      renderInput={(params) => (
                        <FormField label={""} {...params} InputLabelProps={{ shrink: true }} />
                      )}
                    /> */}
                  <Autocomplete
                    multiple
                    onChange={(event, value) => {
                      handleChange({ target: { name: "employee_type", value } });
                    }}
                    // value={employee_type}
                    // onChange={handleMainFieldChange}
                    options={selectData.employee_type}
                    renderInput={(params) => (
                      <FormField
                        label={""}
                        InputLabelProps={{ shrink: true }}
                        name="employee_type"
                        onChange={handleChange}
                        value={values.employee_type}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}
            {!values.exception_onboarding_status.length && (
              <Grid container xs={12} sm={12} p={2}>
                <Grid sm={5}>
                  {" "}
                  <MDTypography variant="h6">Onboarding Status :</MDTypography>
                </Grid>
                <Grid sm={7}>
                  {" "}
                  {/* <Autocomplete
                      multiple
                      value={onboarding_status}
                      onChange={handleOnboardingStatusChange}
                      options={selectData.onboarding_status}
                      renderInput={(params) => (
                        <FormField label={""} {...params} InputLabelProps={{ shrink: true }} />
                      )}
                    /> */}
                  <Autocomplete
                    multiple
                    onChange={(event, value) => {
                      handleChange({ target: { name: "onboarding_status", value } });
                    }}
                    // value={onboarding_status}
                    // onChange={handleMainFieldChange}
                    options={selectData.onboarding_status}
                    renderInput={(params) => (
                      <FormField
                        label={""}
                        InputLabelProps={{ shrink: true }}
                        name="onboarding_status"
                        onChange={handleChange}
                        value={values.onboarding_status}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {!values.department.length && (
              <Grid container xs={12} sm={12} p={2}>
                <Grid sm={5}>
                  {" "}
                  <MDTypography htmlFor="exceptionField" variant="h6">
                    Department :
                  </MDTypography>
                </Grid>
                <Grid sm={7}>
                  {" "}
                  {/* <Autocomplete
                      multiple
                      value={exception_department}
                      onChange={handleExceptionFieldChange}
                      options={selectData.departments}
                      renderInput={(params) => (
                        <FormField label={""} {...params} InputLabelProps={{ shrink: true }} />
                      )}
                    /> */}
                  <Autocomplete
                    multiple
                    onChange={(event, value) => {
                      handleChange({ target: { name: "exception_department", value } });
                    }}
                    // value={exception_department}
                    // onChange={handleMainFieldChange}
                    options={dept_name}
                    renderInput={(params) => (
                      <FormField
                        label={""}
                        InputLabelProps={{ shrink: true }}
                        name="exception_department"
                        onChange={handleChange}
                        value={values.exception_department}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}
            {!values.designation.length && (
              <Grid container xs={12} sm={12} p={2}>
                <Grid sm={5}>
                  {" "}
                  <MDTypography htmlFor="exceptionField" variant="h6">
                    Designation :
                  </MDTypography>
                </Grid>
                <Grid sm={7}>
                  {" "}
                  {/* <Autocomplete
                      multiple
                      value={exception_designation}
                      onChange={handleExceptionDesignationChange}
                      options={selectData.designation}
                      renderInput={(params) => (
                        <FormField label={""} {...params} InputLabelProps={{ shrink: true }} />
                      )}
                    /> */}
                  <Autocomplete
                    multiple
                    onChange={(event, value) => {
                      handleChange({ target: { name: "exception_designation", value } });
                    }}
                    // value={onboarding_status}
                    // onChange={handleMainFieldChange}
                    options={des_name}
                    renderInput={(params) => (
                      <FormField
                        label={""}
                        InputLabelProps={{ shrink: true }}
                        name="exception_designation"
                        onChange={handleChange}
                        value={values.exception_designation}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}
            {!values?.location?.length && (
              <Grid container xs={12} sm={12} p={2}>
                <Grid sm={5}>
                  {" "}
                  <MDTypography htmlFor="exceptionField" variant="h6">
                    Location:
                  </MDTypography>
                </Grid>
                <Grid sm={7}>
                  {" "}
                  {/* <Autocomplete
                      multiple
                      value={exceptional_location}
                      onChange={handleExceptionLocationChange}
                      options={selectData.location}
                      renderInput={(params) => (
                        <FormField label={""} {...params} InputLabelProps={{ shrink: true }} />
                      )}
                    /> */}
                  <Autocomplete
                    multiple
                    onChange={(event, value) => {
                      handleChange({ target: { name: "exceptional_location", value } });
                    }}
                    // value={exceptional_location}
                    // onChange={handleMainFieldChange}
                    options={location_name}
                    renderInput={(params) => (
                      <FormField
                        label={""}
                        InputLabelProps={{ shrink: true }}
                        name="exceptional_location"
                        onChange={handleChange}
                        value={values.exceptional_location}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}
            {!values.role.length && (
              <Grid container xs={12} sm={12} p={2}>
                <Grid sm={5}>
                  {" "}
                  <MDTypography htmlFor="exceptionField" variant="h6">
                    Role:
                  </MDTypography>
                </Grid>
                <Grid sm={7}>
                  {" "}
                  {/* <Autocomplete
                      multiple
                      value={exception_role}
                      onChange={handleExceptionRoleChange}
                      options={selectData.role}
                      renderInput={(params) => (
                        <FormField label={""} {...params} InputLabelProps={{ shrink: true }} />
                      )}
                    /> */}
                  <Autocomplete
                    multiple
                    onChange={(event, value) => {
                      handleChange({ target: { name: "exception_role", value } });
                    }}
                    // value={exception_role}
                    // onChange={handleMainFieldChange}
                    options={selectData.role}
                    renderInput={(params) => (
                      <FormField
                        label={""}
                        InputLabelProps={{ shrink: true }}
                        name="exception_role"
                        onChange={handleChange}
                        value={values.exception_role}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}
            {!values.source_of_hire.length && (
              <Grid container xs={12} sm={12} p={2}>
                <Grid sm={5}>
                  {" "}
                  <MDTypography htmlFor="exceptionField" variant="h6">
                    Source of Hire:
                  </MDTypography>
                </Grid>
                <Grid sm={7}>
                  {" "}
                  {/* <Autocomplete
                      multiple
                      value={exception_source_of_hire}
                      onChange={handleExceptionSourceofHireChange}
                      options={selectData.source_of_hire}
                      renderInput={(params) => (
                        <FormField label={""} {...params} InputLabelProps={{ shrink: true }} />
                      )}
                    /> */}
                  <Autocomplete
                    multiple
                    onChange={(event, value) => {
                      handleChange({ target: { name: "exception_source_of_hire", value } });
                    }}
                    // value={exception_source_of_hire}
                    // onChange={handleMainFieldChange}
                    options={selectData.source_of_hire}
                    renderInput={(params) => (
                      <FormField
                        label={""}
                        InputLabelProps={{ shrink: true }}
                        name="exception_source_of_hire"
                        onChange={handleChange}
                        value={values.exception_source_of_hire}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}
            {!values.employee_type.length && (
              <Grid container xs={12} sm={12} p={2}>
                <Grid sm={5}>
                  {" "}
                  <MDTypography htmlFor="exceptionField" variant="h6">
                    Employment Type:
                  </MDTypography>
                </Grid>
                <Grid sm={7}>
                  {" "}
                  {/* <Autocomplete
                      multiple
                      value={exception_employee_type}
                      onChange={handleExceptionEmploymentChange}
                      options={selectData.employee_type}
                      renderInput={(params) => (
                        <FormField label={""} {...params} InputLabelProps={{ shrink: true }} />
                      )}
                    /> */}
                  <Autocomplete
                    multiple
                    onChange={(event, value) => {
                      handleChange({ target: { name: "exception_employee_type", value } });
                    }}
                    // value={exception_employee_type}
                    // onChange={handleMainFieldChange}
                    options={selectData.employee_type}
                    renderInput={(params) => (
                      <FormField
                        label={""}
                        InputLabelProps={{ shrink: true }}
                        name="exception_employee_type"
                        onChange={handleChange}
                        value={values.exception_employee_type}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}
            {!values.onboarding_status.length && (
              <Grid container xs={12} sm={12} p={2}>
                <Grid sm={5}>
                  {" "}
                  <MDTypography htmlFor="exceptionField" variant="h6">
                    Onboarding Status :
                  </MDTypography>
                </Grid>
                <Grid sm={7}>
                  {" "}
                  {/* <Autocomplete
                      multiple
                      value={exception_onboarding_status}
                      onChange={handleExceptionOnboardingStatusChange}
                      options={selectData.onboarding_status}
                      renderInput={(params) => (
                        <FormField label={""} {...params} InputLabelProps={{ shrink: true }} />
                      )}
                    /> */}
                  <Autocomplete
                    multiple
                    onChange={(event, value) => {
                      handleChange({ target: { name: "exception_onboarding_status", value } });
                    }}
                    // value={onboarding_status}
                    // onChange={handleMainFieldChange}
                    options={selectData.onboarding_status}
                    renderInput={(params) => (
                      <FormField
                        label={""}
                        InputLabelProps={{ shrink: true }}
                        name="exception_onboarding_status"
                        onChange={handleChange}
                        value={values.exception_onboarding_status}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}
          </TabPanel>
        </SwipeableViews>
        <h6>OR</h6>
        <FormControlLabel
          value="top"
          control={
            <Checkbox
              checked={values.employee == true}
              onChange={handleChange}
              name="employee"
              value="true"
            />
          }
          label={<MDTypography variant="h6"> All Employee</MDTypography>}
          labelPlacement="end"
        />
      </Box>
      <MDButton variant="gradient" color="info" type="submit" onClick={handleFormSubmit}>
        Save
      </MDButton>
      {/* </Card> */}
    </form>
  );
};

export default CreateApplicableType;
