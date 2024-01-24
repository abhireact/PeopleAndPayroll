import React from "react";
import { Card } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

const rcoloum = [
  {
    employee_name: "Lara Puleque",
    lop_days: 89,
    lop_reverse_days: 47,
    actual_lop_days: 45,
  },
  {
    employee_name: "Puleque",
    lop_days: 34,
    lop_reverse_days: 3,
    actual_lop_days: 22,
  },
  {
    employee_name: " Puleque",
    lop_days: 33,
    lop_reverse_days: 33,
    actual_lop_days: 0,
  },
  {
    employee_name: "leoo",
    lop_days: 24,
    lop_reverse_days: 4,
    actual_lop_days: 20,
  },
];

const dataTableData = {
  columns: [
    { Header: "EMPLOYEE NAME", accessor: "employee_name" },
    { Header: "LOP DAYS", accessor: "lop_days" },
    { Header: "LOP REVERSAL DAYS", accessor: "lop_reverse_days" },
    { Header: "ACTUAL LOP DAYS", accessor: "actual_lop_days" },
  ],
  rows: rcoloum.map((data) => ({
    employee_name: data.employee_name,
    lop_days: data.lop_days,
    lop_reverse_days: data.lop_reverse_days,
    actual_lop_days: data.actual_lop_days,
  })),
};

const LOP_Summary = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "100%", margin: "auto", mt: "4%" }}>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            Mindcom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            LOP Summary
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

export default LOP_Summary;
