import { Card, Grid, Switch } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Divider from "@mui/material/Divider";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import axios from "axios";

function PT_Annual_Return_Statement(): JSX.Element {
  //   const [earnings, setEarnings] = useState([]);

  //   const value = 90;

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const response = await axios.get("http://10.0.20.133:8001/mg_earning_type");
  //       if (response.status == 200) {
  //         setEarnings(response.data);
  //       }
  //     };
  //     fetchData();
  //   }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "80%", margin: "auto", mt: "4%" }}>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            MindCom
          </MDTypography>
          <MDTypography variant="h6" sx={{ textAlign: "center" }}>
            PT Annual Return Statement
          </MDTypography>
          <Divider />
          <Grid container>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="h6">PERIOD</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "start" }}>
              <MDTypography variant="h6">NO. OF EMPLOYEES</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="h6">PT AMOUNT</MDTypography>
            </Grid>
          </Grid>
          <Divider />

          {/* <Grid container>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="button">{earnings[0]?.earning_name}</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="button">{value}</MDTypography>
            </Grid>
          </Grid>
          <Divider /> */}

          <Grid container>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="body2">01/07/2023 - 31/07/2023</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="body2">0</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="body2">₹0.00</MDTypography>
            </Grid>
          </Grid>
          <Divider />

          <Grid container>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="body2">01/08/2023 - 31/08/2023</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="body2">0</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="body2">₹0.00</MDTypography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="body2">01/09/2023 - 30/09/2023</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="body2">0</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="body2">₹0.00</MDTypography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="body2">01/10/2023 - 31/10/2023</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="body2">0</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="body2">₹0.00</MDTypography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="body2">01/11/2023 - 31/10/2023</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="body2">0</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="body2">₹0.00</MDTypography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="body2">01/12/2023 - 31/10/2023</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="body2">0</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="body2">₹0.00</MDTypography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="body2">01/01/2024 - 31/01/2024</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="body2">0</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="body2">₹0.00</MDTypography>
            </Grid>
          </Grid>
          <Divider />

          <Grid container>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="h6">Total Amount</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="h6">₹0.00</MDTypography>
            </Grid>
          </Grid>
          <Divider />
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}
export default PT_Annual_Return_Statement;
