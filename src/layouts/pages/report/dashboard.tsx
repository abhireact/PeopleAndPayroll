import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart, ResponsiveChartContainer, axisClasses } from "@mui/x-charts";
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
      label: "Employee addition  (no.)",
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-5px, 0)",
    },
  },
};
const dataset = [
  { month: "Jan", Bengluru: 0, Dholakpur: 0, Lucknow: 0, Mumbai: 0 },
  { month: "Feb", Bengluru: 0, Dholakpur: 0, Lucknow: 0, Mumbai: 0 },
  { month: "Mar", Bengluru: 0, Dholakpur: 0, Lucknow: 0, Mumbai: 0 },
  { month: "Apr", Bengluru: 0, Dholakpur: 0, Lucknow: 0, Mumbai: 0 },
  { month: "May", Bengluru: 0, Dholakpur: 0, Lucknow: 0, Mumbai: 0 },
  { month: "Jun", Bengluru: 0, Dholakpur: 0, Lucknow: 0, Mumbai: 0 },
  { month: "Jul", Bengluru: 0, Dholakpur: 0, Lucknow: 0, Mumbai: 0 },
  { month: "Aug", Bengluru: 0, Dholakpur: 1, Lucknow: 0, Mumbai: 0 },
  { month: "Sep", Bengluru: 0, Dholakpur: 2, Lucknow: 0, Mumbai: 0 },
  { month: "Oct", Bengluru: 0, Dholakpur: 0, Lucknow: 0, Mumbai: 0 },
  { month: "Nov", Bengluru: 0, Dholakpur: 0, Lucknow: 0, Mumbai: 0 },
  { month: "Dec", Bengluru: 0, Dholakpur: 0, Lucknow: 0, Mumbai: 0 },
];

const valueFormatter = (value: number) => `${value}`;
export default function EmployeeDashboard() {
  const token = Cookies.get("token");
  const options = [
    { label: "Diversity", value: "diversity" },
    { label: "Distribution", value: "distribution" },
    { label: "Dashboard", value: "dashboard" },
  ];
  const [selectedOption, setSelectedOption] = useState("dashboard");
  const [employeAddition, setEmployeAddition] = useState();
  const [designationData, setDesignationData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  //

  // get employe addition
  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/employee/new_joining      ", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEmployeAddition(response.data);
        // setTasks(response.data); //updating dialog box
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const series = Object.keys(employeAddition ? employeAddition[0] : dataset[0])
    .map((key) => {
      if (key === "month") {
        return null; // Skip 'month' key
      }

      return {
        dataKey: key,
        label: key,
        valueFormatter, // Assuming valueFormatter is defined somewhere in your code
      };
    })
    .filter((item) => item !== null);

  // get designationdata
  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/employee/designation", {
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
      .get("http://10.0.20.133:8000/employee/department", {
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
      .get("http://10.0.20.133:8000/employee/report/gender", {
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
      .get("http://10.0.20.133:8000/employee/report/age", {
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
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Grid p={3} container>
          <Grid>
            <MDTypography variant="h4">Employee Report Dashboard</MDTypography>{" "}
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
          <Grid item sm={4}>
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
          </Grid>
          <Grid item sm={6}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid container spacing={3} p={2}>
                <Grid item sm={8}>
                  {" "}
                  <MDTypography>Employee addition trend </MDTypography>
                </Grid>
                <Grid item sm={4}>
                  {" "}
                  <MDTypography
                    component={Link}
                    to="/pages/reports/employeeadditionreports"
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
                  dataset={employeAddition ? employeAddition : dataset}
                  xAxis={[{ scaleType: "band", dataKey: "month" }]}
                  series={series}
                  margin={{
                    left: 80,
                    right: 80,
                    top: 110,
                    bottom: 80,
                  }}
                  {...chartSetting}
                />
              </Grid>
            </MDBox>
          </Grid>
          <Grid item sm={6}>
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
                  dataset={employeAddition ? employeAddition : dataset}
                  xAxis={[{ scaleType: "band", dataKey: "month" }]}
                  series={series}
                  margin={{
                    left: 80,
                    right: 80,
                    top: 110,
                    bottom: 80,
                  }}
                  {...chartSetting}
                />
              </Grid>
            </MDBox>
          </Grid>
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
                    to="/pages/reports/distributionreport"
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
                    to="/pages/reports/distributionreport"
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
                  <MDTypography>Work Location</MDTypography>
                </Grid>
                <Grid item sm={4} pb={1}>
                  {" "}
                  <MDTypography
                    component={Link}
                    to="/pages/reports/distributionreport"
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
                      data: locationData,
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
                    to="/pages/reports/genderdiversity"
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
                  <MDTypography>Age.</MDTypography>
                </Grid>
                <Grid item sm={4} pb={1}>
                  {" "}
                  <MDTypography
                    component={Link}
                    to="/pages/reports/genderdiversity"
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
                  // colors={["blue", "red", "green"]}
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
          {/* <Grid item sm={6}>
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
                    to="/pages/reports/distributionreport"
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
                      data: [
                        { id: 1, value: 5, label: "Finance" },
                        { id: 4, value: 23, label: "IT" },
                        { id: 2, value: 3, label: "Management" },
                        { id: 3, value: 8, label: "Marketing" },
                      ],
                    },
                  ]}
                  width={550}
                  height={200}
                />
              </Grid>
            </MDBox>
          </Grid> */}
        </Grid>
      </Card>
    </DashboardLayout>
  );
}

// import * as React from "react";
// import { BarChart } from "@mui/x-charts/BarChart";
// import { PieChart, axisClasses } from "@mui/x-charts";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import Card from "@mui/material/Card";
// import Grid from "@mui/material/Grid";
// import MDTypography from "components/MDTypography";
// import Divider from "@mui/material/Divider";
// import MDBox from "components/MDBox";
// import { Link } from "react-router-dom";
// import Autocomplete from "@mui/material/Autocomplete";
// import { useState } from "react";
// import TextField from "@mui/material/TextField";
// import DiversityReport from "./diversity";
// import DistributionReport from "./distributionreport";
// const chartSetting = {
//   yAxis: [
//     {
//       label: "Employee addition  (no.)",
//     },
//   ],
//   width: 500,
//   height: 300,
//   sx: {
//     [`.${axisClasses.left} .${axisClasses.label}`]: {
//       transform: "translate(-5px, 0)",
//     },
//   },
// };
// const dataset = [
//   {
//     bengaluru: 5,
//     newdelhi: 7,
//     mumbai: 6,
//     lucknow: 2,
//     month: "Jan",
//   },
//   {
//     bengaluru: 5,
//     newdelhi: 2,
//     mumbai: 7,
//     lucknow: 2,
//     month: "Feb",
//   },
//   {
//     bengaluru: 4,
//     newdelhi: 3,
//     mumbai: 16,
//     lucknow: 4,
//     month: "Mar",
//   },
//   {
//     bengaluru: 5,
//     newdelhi: 6,
//     mumbai: 9,
//     lucknow: 7,
//     month: "Apr",
//   },
//   {
//     bengaluru: 5,
//     newdelhi: 9,
//     mumbai: 9,
//     lucknow: 9,
//     month: "May",
//   },
//   {
//     bengaluru: 6,
//     newdelhi: 3,
//     mumbai: 13,
//     lucknow: 14,
//     month: "June",
//   },
//   {
//     bengaluru: 5,
//     newdelhi: 0,
//     mumbai: 15,
//     lucknow: 19,
//     month: "July",
//   },
//   {
//     bengaluru: 6,
//     newdelhi: 0,
//     mumbai: 16,
//     lucknow: 4,
//     month: "Aug",
//   },
//   {
//     bengaluru: 5,
//     newdelhi: 1,
//     mumbai: 9,
//     lucknow: 11,
//     month: "Sept",
//   },
//   {
//     bengaluru: 6,
//     newdelhi: 5,
//     mumbai: 9,
//     lucknow: 5,
//     month: "Oct",
//   },
//   {
//     bengaluru: 6,
//     newdelhi: 4,
//     mumbai: 7,
//     lucknow: 4,
//     month: "Nov",
//   },
//   {
//     bengaluru: 6,
//     newdelhi: 0,
//     mumbai: 13,
//     lucknow: 2,
//     month: "Dec",
//   },
// ];

// const valueFormatter = (value: number) => `${value}`;
// export default function EmployeeDashboard() {
//   const options = [
//     { label: "Diversity", value: "diversity" },
//     { label: "Distribution", value: "distribution" },
//     { label: "Dashboard", value: "dashboard" },
//   ];
//   const [selectedOption, setSelectedOption] = useState("dashboard");

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Card>
//         <Grid p={3} container>
//           <Grid sm={1.8}>
//             <MDTypography variant="h4">Employee Report </MDTypography>{" "}
//           </Grid>
//           <Grid sm={3}>
//             {" "}
//             <Autocomplete
//               sx={{ width: "70%" }}
//               options={options}
//               getOptionLabel={(option) => option.label}
//               value={options.find((option) => option.value === selectedOption) || null}
//               onChange={(event, newValue) => {
//                 setSelectedOption(newValue?.value || "dashboard");
//               }}
//               renderInput={(params) => <TextField {...params} label="Select Option" />}
//             />
//           </Grid>
//         </Grid>
//         {/* <MDTypography>{selectedOption}</MDTypography> */}
//         <Divider />
// {(() => {
//   switch (selectedOption) {
//     case "dashboard":
//       return (
//         <Grid container spacing={2} p={2}>
//           <Grid item sm={4}>
//             <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
//               <Grid sm={12} textAlign={"center"} pb={1}>
//                 {" "}
//                 <MDTypography>Headcount & growth rate</MDTypography>
//               </Grid>
//               <Grid container spacing={2}>
//                 {" "}
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography> </MDTypography>
//                 </Grid>
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography variant="h6">Month (Oct) </MDTypography>
//                 </Grid>
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography variant="h6">YOY </MDTypography>
//                 </Grid>
//               </Grid>
//               <Grid container spacing={2}>
//                 {" "}
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography variant="h6">2022 </MDTypography>
//                 </Grid>
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography>18 | 0.00% </MDTypography>
//                 </Grid>
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography>18 | 5.88% </MDTypography>
//                 </Grid>
//               </Grid>

//               <Grid container spacing={2}>
//                 {" "}
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography variant="h6">2023 </MDTypography>
//                 </Grid>
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography>23 | 4.55% </MDTypography>
//                 </Grid>
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography> </MDTypography>
//                 </Grid>
//               </Grid>
//             </MDBox>
//           </Grid>
//           <Grid item sm={4}>
//             <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
//               <Grid sm={12} textAlign={"center"} pb={1}>
//                 {" "}
//                 <MDTypography>Employee addition & growth rate</MDTypography>
//               </Grid>
//               <Grid container spacing={2}>
//                 {" "}
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography> </MDTypography>
//                 </Grid>
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography variant="h6">Month (Oct) </MDTypography>
//                 </Grid>
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography variant="h6">YOY </MDTypography>
//                 </Grid>
//               </Grid>
//               <Grid container spacing={2}>
//                 {" "}
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography variant="h6">2022 </MDTypography>
//                 </Grid>
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography>18 | 0.00% </MDTypography>
//                 </Grid>
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography>18 | 5.88% </MDTypography>
//                 </Grid>
//               </Grid>

//               <Grid container spacing={2}>
//                 {" "}
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography variant="h6">2023 </MDTypography>
//                 </Grid>
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography>23 | 4.55% </MDTypography>
//                 </Grid>
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography> </MDTypography>
//                 </Grid>
//               </Grid>
//             </MDBox>
//           </Grid>
//           <Grid item sm={4}>
//             <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
//               <Grid sm={12} textAlign={"center"} pb={1}>
//                 {" "}
//                 <MDTypography>Employee attrition & growth rate</MDTypography>
//               </Grid>
//               <Grid container spacing={2}>
//                 {" "}
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography> </MDTypography>
//                 </Grid>
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography variant="h6">Month (Oct) </MDTypography>
//                 </Grid>
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography variant="h6">YOY </MDTypography>
//                 </Grid>
//               </Grid>
//               <Grid container spacing={2}>
//                 {" "}
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography variant="h6">2022 </MDTypography>
//                 </Grid>
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography>18 | 0.00% </MDTypography>
//                 </Grid>
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography>18 | 5.88% </MDTypography>
//                 </Grid>
//               </Grid>

//               <Grid container spacing={2}>
//                 {" "}
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography variant="h6">2023 </MDTypography>
//                 </Grid>
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography>23 | 4.55% </MDTypography>
//                 </Grid>
//                 <Grid item sm={4} textAlign={"center"}>
//                   {" "}
//                   <MDTypography> </MDTypography>
//                 </Grid>
//               </Grid>
//             </MDBox>
//           </Grid>
//           <Grid item sm={6}>
//             <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
//               <Grid container spacing={3} p={2}>
//                 <Grid item sm={8}>
//                   {" "}
//                   <MDTypography>Employee addition trend </MDTypography>
//                 </Grid>
//                 <Grid item sm={4}>
//                   {" "}
//                   <MDTypography
//                     component={Link}
//                     to="/pages/reports/employeeadditionreports"
//                     variant="button"
//                     color="info"
//                     fontWeight="medium"
//                     textGradient
//                   >
//                     Detailed Report{" "}
//                   </MDTypography>
//                 </Grid>
//               </Grid>
//               <Grid sm={12} textAlign={"center"} p={1}>
//                 {" "}
//                 <BarChart
//                   dataset={dataset}
//                   xAxis={[{ scaleType: "band", dataKey: "month" }]}
//                   series={[
//                     { dataKey: "bengaluru", label: "Bengaluru", valueFormatter },
//                     { dataKey: "newdelhi", label: "New Delhi", valueFormatter },
//                     { dataKey: "mumbai", label: "Mumbai", valueFormatter },
//                     { dataKey: "lucknow", label: "Lucknow", valueFormatter },
//                   ]}
//                   {...chartSetting}
//                 />
//               </Grid>
//             </MDBox>
//           </Grid>
//           <Grid item sm={6}>
//             <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
//               <Grid container spacing={3} p={2}>
//                 <Grid item sm={8} pb={1}>
//                   {" "}
//                   <MDTypography>Employee attrition trend </MDTypography>
//                 </Grid>
//                 <Grid item sm={4} pb={1}>
//                   {" "}
//                   <MDTypography
//                     component={Link}
//                     to="/page/template1/create"
//                     variant="button"
//                     color="info"
//                     fontWeight="medium"
//                     textGradient
//                   >
//                     Detailed Report{" "}
//                   </MDTypography>
//                 </Grid>
//               </Grid>

//               <Grid sm={12} textAlign={"center"} pb={1}>
//                 {" "}
//                 <BarChart
//                   dataset={dataset}
//                   xAxis={[{ scaleType: "band", dataKey: "month" }]}
//                   series={[
//                     { dataKey: "bengaluru", label: "Bengaluru", valueFormatter },
//                     { dataKey: "newdelhi", label: "New Delhi", valueFormatter },
//                     { dataKey: "mumbai", label: "Mumbai", valueFormatter },
//                     { dataKey: "lucknow", label: "Lucknow", valueFormatter },
//                   ]}
//                   {...chartSetting}
//                 />
//               </Grid>
//             </MDBox>
//           </Grid>
//           <Grid item sm={6}>
//             <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
//               <Grid container spacing={3} p={2}>
//                 <Grid item sm={8} pb={1}>
//                   {" "}
//                   <MDTypography>Designations</MDTypography>
//                 </Grid>
//                 <Grid item sm={4} pb={1}>
//                   {" "}
//                   <MDTypography
//                     component={Link}
//                     to="/pages/reports/distributionreport"
//                     variant="button"
//                     color="info"
//                     fontWeight="medium"
//                     textGradient
//                   >
//                     Detailed Report{" "}
//                   </MDTypography>
//                 </Grid>
//               </Grid>

//               <Grid sm={12} textAlign={"center"} pb={1}>
//                 {" "}
//                 <PieChart
//                   series={[
//                     {
//                       data: [
//                         { id: 0, value: 1, label: "CEO" },
//                         { id: 1, value: 5, label: "Assistant Manager" },
//                         { id: 2, value: 3, label: "Manager" },
//                         { id: 3, value: 8, label: "Administration" },
//                         { id: 4, value: 23, label: "Team Member" },
//                       ],
//                     },
//                   ]}
//                   width={550}
//                   height={200}
//                 />
//               </Grid>
//             </MDBox>
//           </Grid>
//           <Grid item sm={6}>
//             <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
//               <Grid container spacing={3} p={2}>
//                 <Grid item sm={8} pb={1}>
//                   {" "}
//                   <MDTypography>Departments</MDTypography>
//                 </Grid>
//                 <Grid item sm={4} pb={1}>
//                   {" "}
//                   <MDTypography
//                     component={Link}
//                     to="/pages/reports/distributionreport"
//                     variant="button"
//                     color="info"
//                     fontWeight="medium"
//                     textGradient
//                   >
//                     Detailed Report{" "}
//                   </MDTypography>
//                 </Grid>
//               </Grid>

//               <Grid sm={12} textAlign={"center"} pb={1}>
//                 {" "}
//                 <PieChart
//                   series={[
//                     {
//                       data: [
//                         { id: 1, value: 5, label: "Finance" },
//                         { id: 4, value: 23, label: "IT" },
//                         { id: 2, value: 3, label: "Management" },
//                         { id: 3, value: 8, label: "Marketing" },
//                       ],
//                     },
//                   ]}
//                   width={550}
//                   height={200}
//                 />
//               </Grid>
//             </MDBox>
//           </Grid>
//           <Grid item sm={6}>
//             <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
//               <Grid container spacing={3} p={2}>
//                 <Grid item sm={8} pb={1}>
//                   {" "}
//                   <MDTypography>Work Location</MDTypography>
//                 </Grid>
//                 <Grid item sm={4} pb={1}>
//                   {" "}
//                   <MDTypography
//                     component={Link}
//                     to="/pages/reports/distributionreport"
//                     variant="button"
//                     color="info"
//                     fontWeight="medium"
//                     textGradient
//                   >
//                     Detailed Report{" "}
//                   </MDTypography>
//                 </Grid>
//               </Grid>

//               <Grid sm={12} textAlign={"center"} pb={1}>
//                 {" "}
//                 <PieChart
//                   series={[
//                     {
//                       data: [
//                         { id: 1, value: 500, label: "Bengaluru" },
//                         { id: 4, value: 230, label: "New Delhi" },
//                         { id: 2, value: 312, label: "Mumbai" },
//                         { id: 3, value: 484, label: "Lucknow" },
//                       ],
//                     },
//                   ]}
//                   width={550}
//                   height={200}
//                 />
//               </Grid>
//             </MDBox>
//           </Grid>
//           <Grid item sm={6}>
//             <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
//               <Grid container spacing={3} p={2}>
//                 <Grid item sm={8} pb={1}>
//                   {" "}
//                   <MDTypography>Age</MDTypography>
//                 </Grid>
//                 <Grid item sm={4} pb={1}>
//                   {" "}
//                   <MDTypography
//                     component={Link}
//                     to="/pages/reports/genderdiversity"
//                     variant="button"
//                     color="info"
//                     fontWeight="medium"
//                     textGradient
//                   >
//                     Detailed Report{" "}
//                   </MDTypography>
//                 </Grid>
//               </Grid>

//               <Grid sm={12} textAlign={"center"} pb={1}>
//                 {" "}
//                 <PieChart
//                   series={[
//                     {
//                       data: [
//                         { id: 0, value: 15, label: "Female" },
//                         { id: 1, value: 20, label: "Male" },
//                         { id: 2, value: 2, label: "others" },
//                       ],
//                     },
//                   ]}
//                   width={550}
//                   height={200}
//                 />
//               </Grid>
//             </MDBox>
//           </Grid>
//           <Grid item sm={6}>
//             <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
//               <Grid container spacing={3} p={2}>
//                 <Grid item sm={8} pb={1}>
//                   {" "}
//                   <MDTypography>Gender.</MDTypography>
//                 </Grid>
//                 <Grid item sm={4} pb={1}>
//                   {" "}
//                   <MDTypography
//                     component={Link}
//                     to="/pages/reports/genderdiversity"
//                     variant="button"
//                     color="info"
//                     fontWeight="medium"
//                     textGradient
//                   >
//                     Detailed Report{" "}
//                   </MDTypography>
//                 </Grid>
//               </Grid>

//               <Grid sm={12} textAlign={"center"} pb={1}>
//                 {" "}
//                 <PieChart
//                   colors={["red", "blue", "green"]}
//                   series={[
//                     {
//                       data: [
//                         { id: 0, value: 23, color: "orange", label: "Age(18-25)," },
//                         { id: 1, value: 14, color: "blue", label: "Age(25-35)" },
//                         { id: 2, value: 5, color: "green", label: "Age(35 above)" },
//                       ],
//                     },
//                   ]}
//                   width={550}
//                   height={200}
//                 />
//               </Grid>
//             </MDBox>
//           </Grid>
//           <Grid item sm={6}>
//             <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
//               <Grid container spacing={3} p={2}>
//                 <Grid item sm={8} pb={1}>
//                   {" "}
//                   <MDTypography>Departments</MDTypography>
//                 </Grid>
//                 <Grid item sm={4} pb={1}>
//                   {" "}
//                   <MDTypography
//                     component={Link}
//                     to="/pages/reports/distributionreport"
//                     variant="button"
//                     color="info"
//                     fontWeight="medium"
//                     textGradient
//                   >
//                     Detailed Report{" "}
//                   </MDTypography>
//                 </Grid>
//               </Grid>

//               <Grid sm={12} textAlign={"center"} pb={1}>
//                 {" "}
//                 <PieChart
//                   series={[
//                     {
//                       data: [
//                         { id: 1, value: 5, label: "Finance" },
//                         { id: 4, value: 23, label: "IT" },
//                         { id: 2, value: 3, label: "Management" },
//                         { id: 3, value: 8, label: "Marketing" },
//                       ],
//                     },
//                   ]}
//                   width={550}
//                   height={200}
//                 />
//               </Grid>
//             </MDBox>
//           </Grid>
//         </Grid>
//       );
//     case "distribution":
//       return <DistributionReport />;
//     case "diversity":
//       return <DiversityReport />;
//     default:
//       return null; // Handle default case if necessary
//   }
// })()}
//       </Card>
//     </DashboardLayout>
//   );
// }
