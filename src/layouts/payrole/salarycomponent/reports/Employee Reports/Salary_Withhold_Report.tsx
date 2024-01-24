import React from "react";
import { Card, Grid } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDAvatar from "components/MDAvatar";

const dataTableData = {
  columns: [
    { Header: "EMPLOYEE_NAME", accessor: "employee_Name" },
    { Header: "DESIGNATION", accessor: "designation" },
    { Header: "EMPLOYEE STATUS", accessor: "employee_status" },
    { Header: "WITHHELD MONTH", accessor: "withheld_month" },
    { Header: "AMOUNT TO PAY", accessor: "amount_to_pay" },
    { Header: "WITHHELD REASON", accessor: "withheld_reason" },
    { Header: "RELEASE STATUS", accessor: "status" },
    { Header: "RELEASE MONTH", accessor: "release_month" },
  ],
  rows: [
    {
      employee_Name: "Nat Gair",
      designation: "Administrative Officer",
      employee_status: "euyrfb",
      withheld_month: "emefn v",
      amount_to_pay: "good",
      withheld_reason: "12",
      status: "dhfvgb",
      release_month: "dhfvgb",
    },
    {
      employee_Name: "Puleque",
      designation: "Technician",
      employee_status: "ejfbvh",
      withheld_month: "dejfbh df",
      amount_to_pay: "good",
      withheld_reason: "14",
      status: "ofifgnb ii",
      release_month: "dhfvgb",
    },
    {
      employee_Name: "Georgia Danbury",
      designation: "Puleque",
      employee_status: "rkubhvn g",
      withheld_month: "hdgbf v gv",
      amount_to_pay: "good",
      withheld_reason: "6",
      status: ".f,khbn",
      release_month: "dhfvgb",
    },
    {
      employee_Name: "Marleah Snipe",
      designation: "Account Representative II",
      employee_status: "kuvb hg",
      withheld_month: "hsdfv dj",
      amount_to_pay: "good",
      withheld_reason: "9",
      status: "dffkvhjc",
      release_month: "dhfvgb",
    },
  ],
};
const Salary_Withhold_Report = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "95%", margin: "auto", mt: "4%" }}>
        <MDBox p={2}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            Mindcom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            Salary Revision Report
          </MDTypography>
          <MDTypography variant="body2" sx={{ textAlign: "center" }}>
            01/04/2023 to 31/03/2024
          </MDTypography>

          <Card sx={{ width: "55%", margin: "auto", mt: "4%" }}>
            <MDBox p={1}>
              <Grid container>
                <Grid item xs={12} sm={2}>
                  <MDAvatar
                    src="https://s3-eu-west-1.amazonaws.com/nusdigital/image/images/179507/original/Your_Ideas.png"
                    alt="profile-image"
                    size="md"
                    shadow="sm"
                  />
                </Grid>

                <Grid item xs={12} sm={4} sx={{ textAlign: "start" }}>
                  <MDTypography variant="subtitle2">Salary Withheld Employees</MDTypography>
                  <MDTypography variant="button" color="text">
                    ₹ 93794376
                  </MDTypography>
                </Grid>

                <Grid item xs={12} sm={2} sx={{ textAlign: "right" }}>
                  <MDAvatar
                    src="https://th.bing.com/th/id/R.118bd7f04e1f28c9e393bb267b99c9ea?rik=T%2f2vwPOmRTRAZg&riu=http%3a%2f%2ffreevector.co%2fwp-content%2fuploads%2f2012%2f11%2f69581-two-dollar-bills.png&ehk=06u8J58FCcRcSEt%2fo9J5Loxr7cUFb0b8ZETt3TgUKBM%3d&risl=&pid=ImgRaw&r=0"
                    alt="profile-image"
                    size="md"
                    shadow="sm"
                  />
                </Grid>

                <Grid item xs={12} sm={4} sx={{ textAlign: "start" }}>
                  <MDTypography variant="subtitle2">Amount to settle</MDTypography>
                  <MDTypography variant="button" color="text">
                    ₹ 384768645.00
                  </MDTypography>
                </Grid>
              </Grid>
            </MDBox>
          </Card>

          <DataTable table={dataTableData} />
        </MDBox>
      </Card>
    </DashboardLayout>
  );
};

export default Salary_Withhold_Report;
