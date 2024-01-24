import React from "react";
import { Card } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

const rcoloum = [
  {
    employee_id: 2104000629127011,
    employee_name: "Lara Puleque",
    days: 47,
    amount: 984792.0,
  },
  {
    employee_id: 2104000629127012,
    employee_name: "Puleque",
    days: 93,
    amount: 9487450.0,
  },
  {
    employee_id: 2104000629127014,
    employee_name: " Puleque",
    days: 33,
    amount: 3487450.0,
  },
  {
    employee_id: 2104000629127016,
    employee_name: "leoo",
    days: 53,
    amount: 1487450.0,
  },
];

const dataTableData = {
  columns: [
    { Header: "EMPLOYEE ID", accessor: "employee_id" },
    { Header: "EMPLOYEE NAME", accessor: "employee_name" },
    { Header: "DAYS", accessor: "days" },
    { Header: "AMOUNT", accessor: "amount" },
  ],
  rows: rcoloum.map((data) => ({
    employee_id: data.employee_id,
    employee_name: data.employee_name,
    days: data.days,
    amount: data.amount,
  })),
};

const Leave_Encashment_Summary = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "100%", margin: "auto", mt: "4%" }}>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            Mindcom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            Leave Encashment Summary
          </MDTypography>
          <MDTypography variant="body2" sx={{ textAlign: "center" }}>
            01/09/2023 to 30/09/2023
          </MDTypography>
        </MDBox>
        <DataTable table={dataTableData} />
      </Card>
    </DashboardLayout>
  );
};

export default Leave_Encashment_Summary;
