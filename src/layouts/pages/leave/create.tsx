import { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form } from "formik";
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
import { Autocomplete } from "@mui/material";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
// import { I18nextProvider, useTranslation } from "react-i18next";
// import createTrans from "./createtransschool";

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
// import CreateSchool from "./createschool";

import { useDispatch, useSelector } from "react-redux";
import CreateLeave from "./createLeave";
import CreateApplicableType from "./createApplicableType";
import RestrictionTable from "./restrictionTable";
import EntitlementTable from "./entitlementTable";
import CreateLeaveTable from "./createLeaveTable";
import LeaveGrant from "./leaveGrant";
import {
  updateSectionName,
  updateClassName,
  storeWorkLocationData,
  storeDepartmentData,
  storeDesignationData,
  storeEmployeeData,
  storeRoleseData,
} from "../../../Redux/action/dummyDataActions";
import CompensatoryrequestSchedular from "./compensatoryrequestSchedular";
import CalenderSetting from "./calenderSetting";
import WorkingDay from "./workingDay";
import PayPeriodSetting from "./payPeriodSetting";
import SelectDataFor from "./selectthings";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
// import WorkingdaysTable from "./exceptionalWorkingDayTable";
// import CustomFilterPanelContent from "./exceptionalWorkingDayTable";
import StyledEngineProvider from "@mui/styled-engine/StyledEngineProvider";
import MainCreateLeavePage from "./mainCreate";
import Cookies from "js-cookie";
import React from "react";
function CreateLeavePage() {
  const token = Cookies.get("token");
  const [Worklocation, setWorklocation] = React.useState({});
  const [department, setDepartment] = React.useState({});
  const [designation, setDesignation] = React.useState({});
  const [employee, setEmployee] = React.useState({});

  // const { t } = useTranslation();
  const dispatched = useDispatch();
  const [clickbtn, setClickbtn] = useState(false);
  const btnclick = { name: clickbtn };
  console.log(clickbtn, "btn");
  useEffect(() => {
    dispatched(updateClassName(btnclick));
    // console.log(dispatched, "dispatfrhjufwefhevhjwvfhj");
  }, [dispatched, btnclick]);

  // FECHING worklocation
  useEffect(() => {
    fetchWorkLocation(); // Fetch data from API on component mount
  }, []);

  const fetchWorkLocation = async () => {
    try {
      const response = await fetch("http://10.0.20.133:8000/worklocation", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const Worklocation = await response.json();

      setWorklocation(Worklocation);
      console.log(Worklocation, typeof Worklocation);
      //   decryptData(data[0].encrypted_data);
      //   console.log(data[0].encrypted_data, "ghihwefgkwefh");
    } catch (error) {
      console.log("Error fetching classdata:", error);
    }
  };
  React.useEffect(() => {
    dispatched(storeWorkLocationData(Worklocation));
  }, [dispatched, Worklocation]);
  // feching department
  useEffect(() => {
    fetchDepartment(); // Fetch data from API on component mount
  }, []);

  const fetchDepartment = async () => {
    try {
      const response = await fetch("http://10.0.20.133:8000/department", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const department = await response.json();
      console.log(department, typeof department);
      setDepartment(department);
    } catch (error) {
      console.log("Error fetching classdata:", error);
    }
  };
  React.useEffect(() => {
    dispatched(storeDepartmentData(department));
  }, [dispatched, department]);

  // feching Designation
  useEffect(() => {
    fetchDesignation(); // Fetch data from API on component mount
  }, []);

  const fetchDesignation = async () => {
    try {
      const response = await fetch("http://10.0.20.133:8000/designation ", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const designation = await response.json();
      console.log(designation, typeof designation);
      setDesignation(designation);
    } catch (error) {
      console.log("Error fetching classdata:", error);
    }
  };
  React.useEffect(() => {
    dispatched(storeDesignationData(designation));
  }, [dispatched, designation]);

  // feching employee
  useEffect(() => {
    fetchEmployee(); // Fetch data from API on component mount
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await fetch("http://10.0.20.133:8000/employee", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const employee = await response.json();
      console.log(employee, typeof employee);
      setEmployee(employee);
    } catch (error) {
      console.log("Error fetching classdata:", error);
    }
  };
  React.useEffect(() => {
    dispatched(storeEmployeeData(employee));
  }, [dispatched, employee]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "100%", margin: "auto", mt: "2%" }}>
        {/* <CreateLeave />
        <CreateLeaveTable /> */}
        <MainCreateLeavePage />
        {/* <CreateApplicableType />  */}
        {/* <RestrictionTable /> */}
        {/* <EntitlementTable />
   
        {/* <LeaveGrant /> */}
        {/* <CompensatoryrequestSchedular /> */}
        {/* <CalenderSetting /> */}
        {/* <WorkingDay /> */}

        {/* <PayPeriodSetting />  */}
        {/* <CustomFilterPanelContent /> */}

        {/* <MDButton onClick={() => setClickbtn(true)}>save all the data</MDButton> */}
      </Card>
    </DashboardLayout>
  );
}

export default CreateLeavePage;
