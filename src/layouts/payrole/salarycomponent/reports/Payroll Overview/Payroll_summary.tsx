import { Card, Grid } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Divider from "@mui/material/Divider";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import axios from "axios";

function Payroll_summary(): JSX.Element {
  const [earnings, setEarnings] = useState([]);

  const value = 90;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://10.0.20.133:8001/mg_earning_type");
      if (response.status == 200) {
        setEarnings(response.data);
      }
    };
    fetchData();
  }, []);
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
            Payroll Summary
          </MDTypography>
          <MDTypography variant="h6" sx={{ textAlign: "center" }}>
            01/04/2023 to 31/03/2024
          </MDTypography>

          <Divider />
          <Grid container>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="h6">PAY COMPONENTS</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="button">AMOUNT(₹)</MDTypography>
            </Grid>
          </Grid>
          <Divider />

          <Grid container>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h6">Earnings</MDTypography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="button">{earnings[0]?.earning_name}</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="button">{value}</MDTypography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h6">Statutories</MDTypography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="button">
                No statutories were included during this period
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="button">₹0.00</MDTypography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h6">Deductions</MDTypography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="button">
                No deductions were applied in this period
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="button">₹0.00</MDTypography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h6">Taxes</MDTypography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="button">No data to display </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="button">₹0.00</MDTypography>
            </Grid>
          </Grid>
          <Divider />

          <Grid container>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h6">Reimbursements</MDTypography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="button">No data to display</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="button">₹0.00</MDTypography>
            </Grid>
          </Grid>
          <Divider />

          <Grid container>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="h6">Net Pay</MDTypography>
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
export default Payroll_summary;
