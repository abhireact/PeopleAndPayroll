import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import { useEffect, useRef, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Cookies from "js-cookie";
import { Bar } from "react-chartjs-2";

const chartSetting = {
  yAxis: [
    {
      label: "Employee Addition (no)",
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
  {
    bengaluru: 5,
    newdelhi: 7,
    mumbai: 6,
    lucknow: 2,
    month: "Jan",
  },
  {
    bengaluru: 5,
    newdelhi: 2,
    mumbai: 7,
    lucknow: 2,
    month: "Feb",
  },
  {
    bengaluru: 4,
    newdelhi: 3,
    mumbai: 16,
    lucknow: 4,
    month: "Mar",
  },
  {
    bengaluru: 5,
    newdelhi: 6,
    mumbai: 9,
    lucknow: 7,
    month: "Apr",
  },
  {
    bengaluru: 5,
    newdelhi: 9,
    mumbai: 9,
    lucknow: 9,
    month: "May",
  },
  {
    bengaluru: 6,
    newdelhi: 3,
    mumbai: 13,
    lucknow: 14,
    month: "June",
  },
  {
    bengaluru: 5,
    newdelhi: 0,
    mumbai: 15,
    lucknow: 19,
    month: "July",
  },
  {
    bengaluru: 6,
    newdelhi: 0,
    mumbai: 16,
    lucknow: 4,
    month: "Aug",
  },
  {
    bengaluru: 5,
    newdelhi: 1,
    mumbai: 9,
    lucknow: 11,
    month: "Sept",
  },
  {
    bengaluru: 6,
    newdelhi: 5,
    mumbai: 9,
    lucknow: 5,
    month: "Oct",
  },
  {
    bengaluru: 6,
    newdelhi: 4,
    mumbai: 7,
    lucknow: 4,
    month: "Nov",
  },
  {
    bengaluru: 6,
    newdelhi: 0,
    mumbai: 13,
    lucknow: 2,
    month: "Dec",
  },
];
const valueFormatter = (value: number) => `${value} Leaves`;

export default function EmployeeAdditionreport() {
  const chartRef = useRef(null);
  const token = Cookies.get("token");
  const [selectedLocation, setSelectedLocation] = useState("Mumbai"); // Default location
  const [employeAddition, setEmployeAddition] = useState(null); // Initial state set to null
  const [clickedSliceData, setClickedSliceData] = useState(null);

  const [isSliceClicked, setIsSliceClicked] = useState(false);
  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/employee/new_joining", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEmployeAddition(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token]); // Include token as a dependency for the useEffect

  const filteredData = employeAddition
    ? employeAddition.map((data: { [x: string]: any; month: any }) => ({
        month: data.month,
        leaves: (data as any)[selectedLocation] || 0, // Default to 0 if the selected location data is undefined
      }))
    : [];

  console.log(filteredData, "filterdata");
  console.log(isSliceClicked, clickedSliceData, "cvfbhubvfrhbh");

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Grid p={3} container>
          <Grid sm={12}>
            <MDTypography variant="h5">Employee Addition Report</MDTypography>
          </Grid>
          <Grid mt={3} sm={3}>
            <Autocomplete
              options={["Banglore", "Mumbai", "Kolkata"] || null}
              value={selectedLocation}
              onChange={(event, newValue) => {
                setSelectedLocation(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Select Work Location" />}
            />
          </Grid>
        </Grid>
        {employeAddition ? (
          // <BarChart
          //   dataset={filteredData.length > 0 ? filteredData : dataset}
          //   xAxis={[{ scaleType: "band", dataKey: "month" }]}
          //   series={[{ dataKey: "leaves", label: selectedLocation, valueFormatter }]}
          //   {...chartSetting}
          //   onClick={(event: any, data: any) => {
          //     // Additional action when a bar is clicked
          //     console.log("Bar Clicked! Data:", data);

          //     // Perform your custom action here
          //     // ...

          //     // Update states
          //     setClickedSliceData(filteredData);
          //     setIsSliceClicked(true);
          //   }}
          //   width={900}
          //   height={450}
          //   // onClick={(event: any, data: any) => console.log("Bar Clicked! Data:", dataset)}
          // />
          <BarChart
            dataset={filteredData.length > 0 ? filteredData : dataset}
            xAxis={[{ scaleType: "band", dataKey: "month" }]}
            series={[{ dataKey: "leaves", label: selectedLocation, valueFormatter }]}
            {...chartSetting}
            // onClick={(event: any, data: any) => {
            //   // Additional action when a bar is clicked
            //   console.log("Bar Clicked! Data:", data);

            //   // Extract the necessary data for the tooltip from the clicked bar's data
            //   const tooltipData = {
            //     month: data.month,
            //     leaves: data.leaves,
            //     // Add more properties as needed
            //   };

            //   // Show the tooltip data (or perform your custom action) here
            //   console.log("Tooltip Data:", tooltipData);

            //   // Update states if needed
            //   setClickedSliceData(tooltipData);
            //   setIsSliceClicked(true);
            // }}
            width={900}
            height={450}
          />
        ) : (
          "Loading"
        )}
      </Card>
    </DashboardLayout>
  );
}
