import React from "react";
import { Card } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

const dataTableData = {
  columns: [
    { Header: "EMPLOYEE ID", accessor: "employee_id" },
    { Header: "EMPLOYEE NAME", accessor: "employee_name" },
    { Header: "EMPLOYEES' CONTRIBUTION", accessor: "employees_contribution" },
    { Header: "EMPLOYER'S CONTRIBUTION", accessor: "employers_contribution" },
    { Header: "TOTAL CONTRIBUTION", accessor: "total_contribution" },
  ],
  rows: [
    {
      employee_id: "co founder",
      employee_name: "Lara Puleque",
      employees_contribution: 9846,
      employers_contribution: 8776,
      total_contribution: 878666,
    },
    {
      employee_id: "founder",
      employee_name: "Puleque",
      employees_contribution: 9876,
      employers_contribution: 98722,
      total_contribution: 871673,
    },
    {
      employee_id: "leader",
      employee_name: "leque",
      employees_contribution: 38933,
      employers_contribution: 987232,
      total_contribution: 871617,
    },
    {
      employee_id: "designer",
      employee_name: "leoo",
      employees_contribution: 8373,
      employers_contribution: 7232,
      total_contribution: 91617,
    },
  ],
};
const LWF_Summary = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "80%", margin: "auto", mt: "4%" }}>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            Mindcom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            Labour Welfare Fund Summary
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

export default LWF_Summary;
