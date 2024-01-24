import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import axios from "axios";
import { useState, useEffect } from "react";

import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDAvatar from "components/MDAvatar";
import Cookies from "js-cookie";

const MYProfile = () => {
  const token = Cookies.get("token");
  const [data, setData] = useState([]);
  const fetchTasks = async () => {
    try {
      const response = await axios
        .get("http://10.0.20.133:8000/users/me_data", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data);

          console.log(response.data);
        });
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
      <Grid container>
        <Grid item container sm={12} marginBottom={2}>
          <Grid item sm={1}>
            <MDAvatar size="lg" bgColor="dark" />
          </Grid>

          <Grid item sm={6}>
            <Grid item sm={5}>
              <MDTypography variant="subtitle1">{data[0]?.username}</MDTypography>
            </Grid>
            <Grid item sm={5}>
              <MDTypography variant="subtitle2">{data[0]?.email}</MDTypography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={5}>
          <MDTypography variant="body2">Name</MDTypography>
        </Grid>
        <Grid item sm={5}>
          <MDTypography variant="body2">Email</MDTypography>
        </Grid>
        <Grid item sm={5}>
          <MDTypography variant="h5" fontWeight="regular" marginBottom={0.5}>
            {data[0]?.username}
          </MDTypography>
        </Grid>
        <Grid item sm={5}>
          <MDTypography variant="h5" fontWeight="regular" marginBottom={0.5}>
            {data[0]?.email}
          </MDTypography>
        </Grid>
        <Grid item sm={5}>
          <MDTypography variant="body2">Gender</MDTypography>
        </Grid>
        <Grid item sm={5}>
          <MDTypography variant="body2">Location</MDTypography>
        </Grid>
        <Grid item sm={5}>
          <MDTypography variant="h5" fontWeight="regular" marginBottom={0.5}>
            {data[0]?.gender}
          </MDTypography>
        </Grid>
        <Grid item sm={5}>
          <MDTypography variant="h5" fontWeight="regular" marginBottom={0.5}>
            {data[0]?.location}
          </MDTypography>
        </Grid>
        <Grid item sm={5}>
          <MDTypography variant="body2">Designation</MDTypography>
        </Grid>
        <Grid item sm={5}>
          <MDTypography variant="body2">Department</MDTypography>
        </Grid>
        <Grid item sm={5}>
          <MDTypography variant="h5" fontWeight="regular" marginBottom={0.5}>
            {data[0]?.designation}
          </MDTypography>
        </Grid>
        <Grid item sm={5}>
          <MDTypography variant="h5" fontWeight="regular" marginBottom={0.5}>
            {data[0]?.department}
          </MDTypography>
        </Grid>
        <Grid item sm={5}>
          <MDTypography variant="body2">Role</MDTypography>
        </Grid>
        <Grid item sm={5}>
          <MDTypography variant="body2">Date Of Birth</MDTypography>
        </Grid>
        <Grid item sm={5}>
          <MDTypography variant="h5" fontWeight="regular" marginBottom={0.5}>
            {data[0]?.role}
          </MDTypography>
        </Grid>
        <Grid item sm={5}>
          <MDTypography variant="h5" fontWeight="regular" marginBottom={0.5}>
            {data[0]?.dob}
          </MDTypography>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default MYProfile;
