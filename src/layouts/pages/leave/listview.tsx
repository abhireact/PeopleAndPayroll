import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";

import axios from "axios";
import Cookies from "js-cookie";
import CompensatoryrequestSchedular from "./compensatoryrequestSchedular";
import CalenderSetting from "./calenderSetting";

const ListView = () => {
  const token = Cookies.get("token");

  console.log("token", token);
  const [LeaveData, setleaveData] = useState([]);
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://10.0.20.133:8000/currentleave/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setleaveData(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3} pb={2}>
        <Grid item xs={12} sm={9}>
          <MDTypography variant="h5">{"Leave Balance"}</MDTypography>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
        }}
      >
        {LeaveData.map((data, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                py: 5,
                bgcolor: "background.paper",
                borderRadius: 5,
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <MDTypography variant="h6" fontWeight="bold">
                {data.leave_type}
              </MDTypography>
              <CardContent>
                <Avatar src={data?.leave_image} alt="image link" variant="square" />
              </CardContent>
              <MDTypography variant="body2" fontWeight="regular">
                {data.number_of_leaves ? `Available: ${data.number_of_leaves}` : "Available:"}
              </MDTypography>
              <MDTypography variant="body2" fontWeight="regular">
                {data.booked ? ` Booked: ${data.booked}` : "Booked:"}
              </MDTypography>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* <CompensatoryrequestSchedular /> */}
      {/* <CalenderSetting /> */}
    </DashboardLayout>
  );
};

export default ListView;
