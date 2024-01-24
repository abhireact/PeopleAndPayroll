import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart, axisClasses } from "@mui/x-charts";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import { Link } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import StraightIcon from "@mui/icons-material/Straight";
import axios from "axios";
import Cookies from "js-cookie";

const chartSetting = {
  yAxis: [
    {
      label: "Work Location (leaves.)",
    },
  ],
  width: 1100,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-5px, 0)",
    },
  },
};
const dataset = [
  {
    bengaluru: 59,
    newdelhi: 57,
    mumbai: 86,
    lucknow: 21,
    month: "Jan",
  },
  {
    bengaluru: 50,
    newdelhi: 52,
    mumbai: 78,
    lucknow: 28,
    month: "Feb",
  },
  {
    bengaluru: 47,
    newdelhi: 53,
    mumbai: 106,
    lucknow: 41,
    month: "Mar",
  },
  {
    bengaluru: 54,
    newdelhi: 56,
    mumbai: 92,
    lucknow: 73,
    month: "Apr",
  },
  {
    bengaluru: 57,
    newdelhi: 69,
    mumbai: 92,
    lucknow: 99,
    month: "May",
  },
  {
    bengaluru: 60,
    newdelhi: 63,
    mumbai: 103,
    lucknow: 144,
    month: "June",
  },
  {
    bengaluru: 59,
    newdelhi: 60,
    mumbai: 105,
    lucknow: 119,
    month: "July",
  },
  {
    bengaluru: 65,
    newdelhi: 60,
    mumbai: 106,
    lucknow: 49,
    month: "Aug",
  },
  {
    bengaluru: 51,
    newdelhi: 51,
    mumbai: 95,
    lucknow: 131,
    month: "Sept",
  },
  {
    bengaluru: 60,
    newdelhi: 65,
    mumbai: 97,
    lucknow: 55,
    month: "Oct",
  },
  {
    bengaluru: 67,
    newdelhi: 64,
    mumbai: 76,
    lucknow: 48,
    month: "Nov",
  },
  {
    bengaluru: 61,
    newdelhi: 70,
    mumbai: 103,
    lucknow: 25,
    month: "Dec",
  },
];

const valueFormatter = (value: number) => `${value}leaves`;
export default function LeaveDashboard() {
  const options = [
    { label: "Diversity", value: "diversity" },
    { label: "Distribution", value: "distribution" },
    { label: "Dashboard", value: "dashboard" },
  ];
  const [selectedOption, setSelectedOption] = useState("dashboard");
  const [designationData, setDesignationData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  const [attendancedata, setAttendancedata] = useState([]);
  const token = Cookies.get("token");
  // get designationdata
  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/apply_leave/report/designation", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDesignationData(response.data);
        // setTasks(response.data); //updating dialog box
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // get departmentdata
  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/apply_leave/report/department", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDepartmentData(response.data);
        // setTasks(response.data); //updating dialog box
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // get locationtdata
  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/employee/location", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLocationData(response.data);
        // setTasks(response.data); //updating dialog box
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // get genderdata
  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/apply_leave/report/gender", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setGenderData(response.data);
        // setTasks(response.data); //updating dialog box
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // get agedata
  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/apply_leave/report/age", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAgeData(response.data);
        // setTasks(response.data); //updating dialog box
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //get  attendancedata;
  useEffect(() => {
    axios
      .get(" http://10.0.20.133:8000/attendance/dailystatus", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAttendancedata(response?.data);
        // setTasks(response.data); //updating dialog box
        console.log(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Grid p={3} container>
          <Grid>
            <MDTypography variant="h4">Leave Report Dashboard</MDTypography>{" "}
          </Grid>
          <Grid sm={3}>
            {/* {" "}
            <Autocomplete
              sx={{ width: "70%" }}
              options={options}
              getOptionLabel={(option) => option.label}
              value={options.find((option) => option.value === selectedOption) || null}
              onChange={(event, newValue) => {
                setSelectedOption(newValue?.value || "department");
              }}
              renderInput={(params) => <TextField {...params} label="Select Option" />}
            /> */}
          </Grid>
        </Grid>
        {/* <MDTypography>{selectedOption}</MDTypography> */}
        <Divider />

        <Grid container spacing={2} p={2}>
          {/* <Grid item sm={4}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid sm={12} textAlign={"center"} pb={1}>
                {" "}
                <MDTypography>Headcount & growth rate</MDTypography>
              </Grid>
              <Grid container spacing={2}>
                {" "}
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography> </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">Month (Oct) </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">YOY </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                {" "}
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">2022 </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography>18 | 0.00%</MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography>18 | 5.88% </MDTypography>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                {" "}
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">2023 </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography>23 | 4.55% </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography> </MDTypography>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
          <Grid item sm={4}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid sm={12} textAlign={"center"} pb={1}>
                {" "}
                <MDTypography>Employee addition & growth rate</MDTypography>
              </Grid>
              <Grid container spacing={2}>
                {" "}
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography> </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">Month (Oct) </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">YOY </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                {" "}
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">2022 </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography>18 | 0.00% </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography>18 | 5.88% </MDTypography>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                {" "}
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">2023 </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography>23 | 4.55% </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography> </MDTypography>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
          <Grid item sm={4}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid sm={12} textAlign={"center"} pb={1}>
                {" "}
                <MDTypography>Employee attrition & growth rate</MDTypography>
              </Grid>
              <Grid container spacing={2}>
                {" "}
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography> </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">Month (Oct) </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">YOY </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                {" "}
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">2022 </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography>18 | 0.00% </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography>18 | 5.88% </MDTypography>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                {" "}
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">2023 </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography>23 | 4.55% </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography> </MDTypography>
                </Grid>
              </Grid>
            </MDBox>
          </Grid> */}
          <Grid item sm={12}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid container spacing={3} p={2}>
                <Grid item sm={8}>
                  {" "}
                  <MDTypography>Employee Leave trend </MDTypography>
                </Grid>
                <Grid item sm={4}>
                  {" "}
                  <MDTypography
                    component={Link}
                    to="/pages/reports/leavetrend"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Detailed Report{" "}
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid sm={12} textAlign={"center"} p={1}>
                {" "}
                <BarChart
                  dataset={dataset}
                  xAxis={[{ scaleType: "band", dataKey: "month" }]}
                  series={[
                    { dataKey: "bengaluru", label: "Bengaluru", valueFormatter },
                    { dataKey: "newdelhi", label: "New Delhi", valueFormatter },
                    { dataKey: "mumbai", label: "Mumbai", valueFormatter },
                    { dataKey: "lucknow", label: "Lucknow", valueFormatter },
                  ]}
                  {...chartSetting}
                />
              </Grid>
            </MDBox>
          </Grid>
          {/* <Grid item sm={6}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid container spacing={3} p={2}>
                <Grid item sm={8} pb={1}>
                  {" "}
                  <MDTypography>Employee attrition trend </MDTypography>
                </Grid>
                <Grid item sm={4} pb={1}>
                  {" "}
                  <MDTypography
                    component={Link}
                    to="/page/template1/create"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Detailed Report{" "}
                  </MDTypography>
                </Grid>
              </Grid>

              <Grid sm={12} textAlign={"center"} pb={1}>
                {" "}
                <BarChart
                  dataset={dataset}
                  xAxis={[{ scaleType: "band", dataKey: "month" }]}
                  series={[
                    { dataKey: "bengaluru", label: "Bengaluru", valueFormatter },
                    { dataKey: "newdelhi", label: "New Delhi", valueFormatter },
                    { dataKey: "mumbai", label: "Mumbai", valueFormatter },
                    { dataKey: "lucknow", label: "Lucknow", valueFormatter },
                  ]}
                  {...chartSetting}
                />
              </Grid>
            </MDBox>
          </Grid> */}
          <Grid item sm={6}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid container spacing={3} p={2}>
                <Grid item sm={8} pb={1}>
                  {" "}
                  <MDTypography>Designations</MDTypography>
                </Grid>
                <Grid item sm={4} pb={1}>
                  {" "}
                  <MDTypography
                    component={Link}
                    to="/pages/leavereport/leavedistribution"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Detailed Report{" "}
                  </MDTypography>
                </Grid>
              </Grid>

              <Grid sm={12} textAlign={"center"} pb={1}>
                {" "}
                <PieChart
                  series={[
                    {
                      data: designationData,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: { innerRadius: 30, additionalRadius: -30 },
                    },
                  ]}
                  height={200}
                />
              </Grid>
            </MDBox>
          </Grid>
          <Grid item sm={6}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid container spacing={3} p={2}>
                <Grid item sm={8} pb={1}>
                  {" "}
                  <MDTypography>Departments</MDTypography>
                </Grid>
                <Grid item sm={4} pb={1}>
                  {" "}
                  <MDTypography
                    component={Link}
                    to="/pages/leavereport/leavedistribution"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Detailed Report{" "}
                  </MDTypography>
                </Grid>
              </Grid>

              <Grid sm={12} textAlign={"center"} pb={1}>
                {" "}
                <PieChart
                  series={[
                    {
                      data: departmentData,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: { innerRadius: 30, additionalRadius: -30 },
                    },
                  ]}
                  height={200}
                />
              </Grid>
            </MDBox>
          </Grid>

          <Grid item sm={6}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid container spacing={3} p={2}>
                <Grid item sm={8} pb={1}>
                  {" "}
                  <MDTypography>Gender</MDTypography>
                </Grid>
                <Grid item sm={4} pb={1}>
                  {" "}
                  <MDTypography
                    component={Link}
                    to="/pages/leavereport/leavediversity"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Detailed Report{" "}
                  </MDTypography>
                </Grid>
              </Grid>

              <Grid sm={12} textAlign={"center"} pb={1}>
                {" "}
                <PieChart
                  series={[
                    {
                      data: genderData,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: { innerRadius: 30, additionalRadius: -30 },
                    },
                  ]}
                  height={200}
                />
              </Grid>
            </MDBox>
          </Grid>
          <Grid item sm={6}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid container spacing={3} p={2}>
                <Grid item sm={8} pb={1}>
                  {" "}
                  <MDTypography>Age.</MDTypography>
                </Grid>
                <Grid item sm={4} pb={1}>
                  {" "}
                  <MDTypography
                    component={Link}
                    to="/pages/leavereport/leavediversity"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Detailed Report{" "}
                  </MDTypography>
                </Grid>
              </Grid>

              <Grid sm={12} textAlign={"center"} pb={1}>
                {" "}
                <PieChart
                  // colors={["red", "blue", "green"]}
                  series={[
                    {
                      data: ageData,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: { innerRadius: 30, additionalRadius: -30 },
                    },
                  ]}
                  // width={550}
                  height={200}
                />
              </Grid>
            </MDBox>
          </Grid>
          <Grid item sm={6}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid container spacing={3} p={2}>
                <Grid item sm={8} pb={1}>
                  {" "}
                  <MDTypography>Attendance</MDTypography>
                </Grid>
                <Grid item sm={4} pb={1}>
                  {" "}
                  <MDTypography
                    component={Link}
                    to="/pages/leavereport/detailedattendance"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Detailed Report{" "}
                  </MDTypography>
                </Grid>
              </Grid>

              <Grid sm={12} textAlign={"center"} pb={1}>
                {" "}
                <PieChart
                  series={[
                    {
                      data: attendancedata,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: { innerRadius: 30, additionalRadius: -30 },
                    },
                  ]}
                  height={200}
                />
              </Grid>
            </MDBox>
          </Grid>
          <Grid item sm={6}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid item sm={12}>
                {" "}
                <MDTypography>Other Reports</MDTypography>
              </Grid>
              <Grid item sm={12}>
                {" "}
                <MDTypography
                  component={Link}
                  to="/pages/leavereport/dailyleavestatus"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Daily leave status{" "}
                </MDTypography>
              </Grid>
              <Grid item sm={12}>
                {" "}
                <MDTypography
                  component={Link}
                  to="/pages/leavereport/resourceavailbility"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Resource availability{" "}
                </MDTypography>
              </Grid>
              <Grid item sm={12}>
                {" "}
                <MDTypography
                  component={Link}
                  to="/pages/leavereport/leavebalance"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Employee leave balance{" "}
                </MDTypography>
              </Grid>
              <Grid item sm={12}>
                {" "}
                <MDTypography
                  component={Link}
                  to="/pages/leavereport/leavebookedandbalance"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Leave booked and balance
                </MDTypography>
              </Grid>
              <Grid item sm={12}>
                {" "}
                <MDTypography
                  component={Link}
                  to="/pages/leavereport/leavetypewisesummary"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Leave TypeWise summery
                </MDTypography>
              </Grid>
              <Grid item sm={12}>
                {" "}
                <MDTypography
                  component={Link}
                  to="/pages/leavereport/employeeattandancestatus"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Attandance status{" "}
                </MDTypography>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </Card>
    </DashboardLayout>
  );
}
