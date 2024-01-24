import React from "react";
import { Card } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

const rcoloum = [
  {
    employee_id: "co founder",
    employee_name: "Lara Puleque",
    employees_contribution: 9347,
    employers_contribution: 98754,
    total_contribution: 487457,
  },
  {
    employee_id: "founder",
    employee_name: "Puleque",
    employees_contribution: 9347,
    employers_contribution: 98722,
    total_contribution: 3487167,
  },
  {
    employee_id: "leader",
    employee_name: "leque",
    employees_contribution: 35763,
    employers_contribution: 987232,
    total_contribution: 3871617,
  },
  {
    employee_id: "designer",
    employee_name: "leoo",
    employees_contribution: 358653,
    employers_contribution: 7232,
    total_contribution: 4351617,
  },
];

const dataTableData = {
  columns: [
    { Header: "EMPLOYEE ID", accessor: "employee_id" },
    { Header: "EMPLOYEE NAME", accessor: "employee_name" },
    { Header: "EMPLOYEE'S CONTRIBUTION", accessor: "employees_contribution" },
    { Header: "EMPLOYER'S CONTRIBUTION", accessor: "employers_contribution" },
    { Header: "TOTAL CONTRIBUTION", accessor: "total_contribution" },
  ],
  rows: rcoloum.map((data) => ({
    employee_id: data.employee_id,
    employee_name: data.employee_name,
    employees_contribution: data.employees_contribution,
    employers_contribution: data.employers_contribution,
    total_contribution: data.total_contribution,
  })),
};

const Pre_Tax_Deductions_Summary = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "80%", margin: "auto", mt: "4%" }}>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            Mindcom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            Pre-Tax Deductions Summary
          </MDTypography>
          <MDTypography variant="body2" sx={{ textAlign: "center" }}>
            Deduction period from 01/04/2023 to 31/03/2024
          </MDTypography>
        </MDBox>
        <DataTable table={dataTableData} />
      </Card>
    </DashboardLayout>
  );
};

export default Pre_Tax_Deductions_Summary;
