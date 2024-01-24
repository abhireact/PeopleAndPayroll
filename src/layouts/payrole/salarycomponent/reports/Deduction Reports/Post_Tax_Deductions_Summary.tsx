import React from "react";
import { Card } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

const rcoloum = [
  {
    deduction_name: "L  ara",
    deduction_type: "co founder",
    employees_contribution: 9347,
  },
  {
    deduction_name: "leoo",
    deduction_type: "founder",
    employees_contribution: 9347,
  },
  {
    deduction_name: "jkdbg",
    deduction_type: "leader",
    employees_contribution: 35763,
  },
  {
    deduction_name: "jkhbf",
    deduction_type: "z,dfh",
    employees_contribution: 358653,
  },
];

const dataTableData = {
  columns: [
    { Header: "EMPLOYEE ID", accessor: "employee_id" },
    { Header: "EMPLOYEE NAME", accessor: "employee_name" },
    { Header: "EMPLOYEE'S CONTRIBUTION", accessor: "employees_contribution" },
  ],
  rows: rcoloum.map((data) => ({
    employee_id: data.deduction_name,
    employee_name: data.deduction_type,
    employees_contribution: data.employees_contribution,
  })),
};

const DeductionSummary = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "80%", margin: "auto", mt: "4%" }}>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            Mindcom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            Post-Tax Deductions Summary
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

export default DeductionSummary;
