import React from "react";
import { Card } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

const dataTableData = {
  columns: [
    { Header: "EMPLOYEE", accessor: "employee" },
    { Header: "DESIGNATION", accessor: "designation" },
    { Header: "DATE OF JOINING", accessor: "joining_date" },
    { Header: "LAST WORKING DATE", accessor: "last_working_date" },
    { Header: "SERVICE PERIOD", accessor: "service_period" },
    { Header: "REASON FOR EXIT", accessor: "reason_for_exit" },
    { Header: "FINAL SETTLEMENT DATE", accessor: "final_settlement_date" },
    { Header: "FINAL SETTLEMENT AMOUNT", accessor: "final_settlement_amount" },
  ],
  rows: [
    {
      employee: "Nat Gair",
      designation: "Administrative Officer",
      joining_date: "01/07/2022",
      last_working_date: "01/09/2023",
      service_period: "good",
      reason_for_exit: "gbhfsj",
      final_settlement_date: "24/4/2023",
      final_settlement_amount: 9876543,
    },
    {
      employee: "Puleque",
      designation: "Technician",
      joining_date: "01/06/2020",
      last_working_date: "01/07/2023",
      service_period: "good",
      reason_for_exit: "less money",
      final_settlement_date: "24/4/2023",
      final_settlement_amount: 8786543,
    },
    {
      employee: "Georgia Danbury",
      designation: "Puleque",
      joining_date: "21/09/2012",
      last_working_date: "01/09/2018",
      service_period: "good",
      reason_for_exit: "lkjhg",
      final_settlement_date: "24/4/2023",
      final_settlement_amount: 4567888,
    },
    {
      employee: "Marleah Snipe",
      designation: "Account Representative II",
      joining_date: "01/07/2017",
      last_working_date: "12/09/2022",
      service_period: "good",
      reason_for_exit: "poiuy",
      final_settlement_date: "24/4/2024",
      final_settlement_amount: 9876545,
    },
  ],
};
const Employees_Settlement = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "95%", margin: "auto", mt: "4%" }}>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            Mindcom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            Employees Full and Final Settlement
          </MDTypography>
          <MDTypography variant="body2" sx={{ textAlign: "center" }}>
            01/04/2023 to 31/03/2024
          </MDTypography>
        </MDBox>
        <DataTable table={dataTableData} />
      </Card>
    </DashboardLayout>
  );
};

export default Employees_Settlement;
