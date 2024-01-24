import { Card, Grid } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import BrowserUpdatedOutlinedIcon from "@mui/icons-material/BrowserUpdatedOutlined";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";

const Salary_Withhold_Report = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Card sx={{ width: "100%", mt: "3" }}>
              <MDBox p={3}>
                <Grid container>
                  <Grid item xs={12} sm={12}>
                    <MDAvatar
                      src="https://cdn0.iconfinder.com/data/icons/business-set-1-5/64/a-12-256.png"
                      alt="profile-image"
                      size="xxl"
                      shadow="sm"
                      style={{ display: "block", margin: "0 auto" }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <MDTypography variant="body1" sx={{ textAlign: "center" }}>
                      Jitendra
                    </MDTypography>
                    <Grid item xs={12} sm={12}>
                      <MDTypography variant="body2" sx={{ textAlign: "center" }}>
                        Manager
                      </MDTypography>
                    </Grid>
                  </Grid>
                </Grid>
                <br />

                <Grid container>
                  <Grid item xs={12} sm={2}>
                    <MailOutlineIcon />
                  </Grid>
                  <Grid item xs={12} sm={10} sx={{ textAlign: "start" }}>
                    <MDTypography variant="overline">jitendrabedanta42@mindc..</MDTypography>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} sm={2}>
                    <PermIdentityOutlinedIcon />
                  </Grid>
                  <Grid item xs={12} sm={10} sx={{ textAlign: "start" }}>
                    <MDTypography variant="overline">Male</MDTypography>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} sm={2}>
                    <DeviceHubIcon />
                  </Grid>
                  <Grid item xs={12} sm={10} sx={{ textAlign: "start" }}>
                    <MDTypography variant="overline">it</MDTypography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={2}>
                    <BrowserUpdatedOutlinedIcon />
                  </Grid>
                  <Grid item xs={12} sm={10} sx={{ textAlign: "start" }}>
                    <MDTypography variant="overline">DOJ-06/07/2022</MDTypography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={2}>
                    <PlaceOutlinedIcon />
                  </Grid>
                  <Grid item xs={12} sm={10} sx={{ textAlign: "start" }}>
                    <MDTypography variant="overline">Head Office</MDTypography>
                  </Grid>
                </Grid>
                <br />

                <Grid item xs={12} sm={12}>
                  <MDTypography variant="subtitle2">STATURIOUS DETAILS</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MDTypography variant="caption">PAN</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MDTypography variant="overline">ASDFG1234F</MDTypography>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Card sx={{ width: "100%", mt: "3" }}>
              <MDBox p={3}>
                <MDTypography variant="body1">Personal Information</MDTypography>
                <br />
                <Grid container>
                  <Grid item xs={12} sm={1}>
                    <EventNoteOutlinedIcon />
                  </Grid>
                  <Grid item xs={12} sm={3} sx={{ textAlign: "start" }}>
                    <MDTypography variant="subtitle2">Date of Birth</MDTypography>
                    <MDTypography variant="overline">01/04/2004</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <PhoneAndroidOutlinedIcon />
                  </Grid>
                  <Grid item xs={12} sm={3} sx={{ textAlign: "start" }}>
                    <MDTypography variant="subtitle2">Mobile Number</MDTypography>
                    <MDTypography variant="overline">7847916088</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <MailOutlinedIcon />
                  </Grid>
                  <Grid item xs={12} sm={3} sx={{ textAlign: "start" }}>
                    <MDTypography variant="subtitle2">Contact Mail</MDTypography>
                    <MDTypography variant="overline">jitendrabedanta@gmail.com</MDTypography>
                  </Grid>
                </Grid>
                <br />
                <Grid container>
                  <Grid item xs={12} sm={4} sx={{ textAlign: "start" }}>
                    <MDTypography variant="subtitle2">Father`s Name</MDTypography>
                    <MDTypography variant="overline">AnantaKishor</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3} sx={{ textAlign: "start" }}>
                    <MDTypography variant="subtitle2">Address</MDTypography>
                    <MDTypography variant="button">_</MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
            <br />

            <Card sx={{ width: "100%", mt: "3" }}>
              <MDBox p={3}>
                <MDTypography variant="body1">Payment Information</MDTypography>
                <br />
                <Grid container>
                  <Grid item xs={12} sm={1}>
                    <LocalAtmOutlinedIcon />
                  </Grid>
                  <Grid item xs={12} sm={3} sx={{ textAlign: "justify " }}>
                    <MDTypography variant="subtitle2">Payment</MDTypography>
                    <MDTypography variant="overline">Cheque</MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
              <br />
              <br />
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default Salary_Withhold_Report;
