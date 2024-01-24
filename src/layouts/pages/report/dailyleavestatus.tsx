import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import IconButton from "@mui/material/IconButton";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import axios from "axios";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import Cookies from "js-cookie";

// Define the type for your data objects
type LeaveEntry = {
  leave_type: string;
  employee_name: string;
  employee_email: string;
  from_date: string;
  to_date: string;
  team_email: string;
  type: string;
  reason_for_leave: string;
  status: boolean;
  created_at: string;
};
interface YourDataInterface {
  employee_name: string;
  leave_type: string;
  reason_for_leave: string;
  from_date: string; // Adjust the type according to your needs
  to_date: string; // Adjust the type according to your needs
  employee_email: string;
}

// Define the props type for your component
type LeaveDataProps = {
  targetDate: string;
};
const Dailyleave = () => {
  const todayDate = new Date();
  const formattedDate = todayDate.toISOString().split("T")[0];
  const [date, setDate] = useState("2023-10-03"); //

  // Function to add one day
  const addOneDay = () => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    setDate(currentDate.toISOString().split("T")[0]);
  };

  // Function to subtract one day
  const subtractOneDay = () => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - 1);
    setDate(currentDate.toISOString().split("T")[0]);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container>
        <Grid sm={12} sx={{ justifyContent: "flex-center" }}>
          <MDTypography variant="h5">Daily Leave Status</MDTypography>
        </Grid>
        <Grid sm={12} sx={{ justifyContent: "flex-center" }}>
          <IconButton onClick={subtractOneDay}>
            <ArrowCircleLeftIcon />
          </IconButton>
          {date}
          <IconButton onClick={addOneDay}>
            <ArrowCircleRightIcon />
          </IconButton>
        </Grid>
      </Grid>

      <LeaveData targetDate={date} />
    </DashboardLayout>
  );
};

export default Dailyleave;
const LeaveData: React.FC<LeaveDataProps> = ({ targetDate }) => {
  // Initialize data as null to distinguish between loading and empty data
  const [data, setData] = useState(null);
  const token = Cookies.get("token");

  useEffect(() => {
    async function fetchLeaves() {
      try {
        const response = await axios.get(
          "http://10.0.20.133:8000/apply_leave/manager_leave_applications",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let filteredData: YourDataInterface[] = response.data.filter(
          (entry: { from_date: string; to_date: string }) => {
            return targetDate >= entry.from_date && targetDate <= entry.to_date;
          }
        );
        console.log(filteredData, "data");
        setData(filteredData);
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    }

    fetchLeaves();
  }, [targetDate]);

  return (
    <>
      {data === null ? (
        // Loading state
        <div>Loading...</div>
      ) : data.length === 0 ? (
        // Empty data state
        <div>No leave data available for the specified date.</div>
      ) : (
        // Data available, render the grid
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row", // Display cards in a row
            flexWrap: "wrap",
            flexGrow: 1,
            lineHeight: "10%",
          }}
        >
          {data.map(
            (
              entry: {
                employee_name: any;
                leave_type: any;
                reason_for_leave: any;
                employee_email: any;
              },
              index: React.Key
            ) => (
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 1,
                  m: 1,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  flex: "0 0 calc(33.33% - 16px)",
                  justifyItems: "center",
                  alignItems: "center",
                }}
                key={index}
              >
                <MDTypography variant="body1"> {entry.employee_name}</MDTypography>
                <MDTypography variant="body2">{entry.leave_type}</MDTypography>
                <MDTypography variant="body2">{entry.reason_for_leave}</MDTypography>
                <MDTypography variant="overline" color="info">
                  {entry.employee_email}
                </MDTypography>
              </Card>
            )
          )}
        </Grid>
      )}
    </>
  );
};
