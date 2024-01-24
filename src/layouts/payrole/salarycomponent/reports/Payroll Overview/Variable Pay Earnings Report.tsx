import { Card, Grid, Switch } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Divider from "@mui/material/Divider";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import axios from "axios";

function Variable_Pay_Earnings_report(): JSX.Element {
  // const [earnings, setEarnings] = useState([]);

  // const value = 978;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get("http://10.0.20.133:8001/mg_earning_type");
  //     if (response.status == 200) {
  //       setEarnings(response.data);
  //     }
  //   };
  //   fetchData();
  // }, []);
  // console.log(earnings[0]?.earning_name, "index 0 earning number");
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "80%", margin: "auto", mt: "4%" }}>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            MindCom
          </MDTypography>
          <MDTypography variant="h6" sx={{ textAlign: "center" }}>
            Variable Pay Earnings Report - Bonus
          </MDTypography>
          <MDTypography variant="h6" sx={{ textAlign: "center" }}>
            01/04/2023 to 31/03/2024
          </MDTypography>

          <Divider />
          <Grid container>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="h6">EMPLOYEE NAME</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="button">AMOUNT PAID(₹)</MDTypography>
            </Grid>
          </Grid>

          {/* <Grid container>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="button">{earnings[0]?.earning_name}</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="button">{value}</MDTypography>
            </Grid>
          </Grid> */}
          <Divider />
          <Grid container>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="button">statuto</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="button">₹0.00</MDTypography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="button">kumar</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="button">₹0.00</MDTypography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="button">kats </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="button">₹0.00</MDTypography>
            </Grid>
          </Grid>
          <Divider />

          <Grid container>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="button">leo</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="button">₹0.00</MDTypography>
            </Grid>
          </Grid>
          <Divider />

          <Grid container>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="h6">net pay</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="button">₹0.00</MDTypography>
            </Grid>
          </Grid>
          <Divider />
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}
export default Variable_Pay_Earnings_report;
