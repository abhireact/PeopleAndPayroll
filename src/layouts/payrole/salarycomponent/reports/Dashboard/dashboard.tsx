import { Card, Divider, Grid } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import ErrorIcon from "@mui/icons-material/Error";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import PlaceIcon from "@mui/icons-material/Place";
import PercentIcon from "@mui/icons-material/Percent";
import Footer from "examples/Footer";

const Salary_Withhold_Report = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9}>
            <MDTypography variant="h5" p={3}>
              Process Pay Run for April 2023 DRAFT
            </MDTypography>
            <Card sx={{ width: "100%", mt: "3" }}>
              <MDBox p={3}>
                <Grid container>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="caption">EMPLOYEES NET PAY</MDTypography>
                    <MDTypography variant="body2">₹82,47,128.00</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="caption">PAYMENT DATE</MDTypography>
                    <MDTypography variant="body2">28/04/2023</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="caption">NO. OF EMPLOYEES</MDTypography>
                    <MDTypography variant="body2">4</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3} sx={{ textAlign: "right" }}>
                    <MDButton
                      variant="contained"
                      color="info"
                      type="submit"
                      sx={{ textAlign: "end" }}
                    >
                      View Details
                    </MDButton>
                  </Grid>
                  <br />
                  <br />
                  <Grid container>
                    <Grid item xs={12} sm={0.5}>
                      <ErrorIcon />
                    </Grid>
                    <Grid item xs={12} sm={11.5} sx={{ textAlign: "start" }}>
                      <MDTypography variant="body2">
                        This payment is overdue by 168 day(s).
                      </MDTypography>
                    </Grid>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>

            <Grid container>
              <Grid item xs={12} sm={6}>
                <MDTypography variant="h5" p={3}>
                  Payroll Cost Summary Summary
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ textAlign: "right" }}>
                <MDTypography variant="h5" p={3}>
                  Employee Summary
                </MDTypography>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={8}>
                <Card sx={{ width: "100%", mt: "3" }}>
                  <MDBox p={3}>
                    <Grid container>
                      <Grid item xs={12} sm={4}>
                        <EnergySavingsLeafIcon fontSize="medium" />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <PlaceIcon fontSize="medium" />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <PercentIcon fontSize="medium" />
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sm={4}>
                        <MDTypography variant="caption">EPF - </MDTypography>
                        <br />
                        <MDTypography variant="caption">View Details</MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <MDTypography variant="caption">ESI - View Details</MDTypography>
                        <MDTypography variant="body2">28/04/2023</MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <MDTypography variant="caption">TDS DEDUCTION - View Details</MDTypography>
                        <MDTypography variant="body2">4</MDTypography>
                      </Grid>
                    </Grid>
                  </MDBox>
                </Card>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Card sx={{ width: "100%", mt: "3" }}>
                  <MDBox p={3}>
                    <MDTypography variant="button">ACTIVE EMPLOYEES</MDTypography>
                    <br />
                    <MDTypography variant="button">4</MDTypography>
                    <br />
                    <MDTypography variant="caption"> View Employees</MDTypography>
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Card sx={{ width: "100%", height: "100%", mt: "3" }}>
              <MDBox p={3}>
                <MDTypography variant="h5">To Do Tasks</MDTypography>
                <Divider />
                <MDTypography variant="caption"> View Employees</MDTypography>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </DashboardLayout>
  );
};

export default Salary_Withhold_Report;
