import React from "react";
import { Card } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

const rcoloum = [
  {
    deduction_name: "co founder",
    deduction_type: "Lara Puleque",
    employeers_contribution: 9347,
    employers_contribution: 98754,
    total_contribution: 487457,
  },
  {
    deduction_name: "founder",
    deduction_type: "Puleque",
    employeers_contribution: 9347,
    employers_contribution: 98722,
    total_contribution: 3487167,
  },
  {
    deduction_name: "leader",
    deduction_type: "leque",
    employeers_contribution: 35763,
    employers_contribution: 987232,
    total_contribution: 3871617,
  },
  {
    deduction_name: "designer",
    deduction_type: "leoo",
    employeers_contribution: 358653,
    employers_contribution: 7232,
    total_contribution: 4351617,
  },
];

const dataTableData = {
  columns: [
    { Header: "DEDUCTION NAME", accessor: "deduction_name" },
    { Header: "DEDUCTION TYPE", accessor: "deduction_type" },
    { Header: "EMPLOYEES' CONTRIBUTION", accessor: "employeers_contribution" },
    { Header: "EMPLOYER'S CONTRIBUTION", accessor: "employers_contribution" },
    { Header: "TOTAL CONTRIBUTION", accessor: "total_contribution" },
  ],
  rows: rcoloum.map((data) => ({
    deduction_name: data.deduction_name,
    deduction_type: data.deduction_type,
    employeers_contribution: data.employeers_contribution,
    employers_contribution: data.employers_contribution,
    total_contribution: data.total_contribution,
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
            Deductions Summary
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
