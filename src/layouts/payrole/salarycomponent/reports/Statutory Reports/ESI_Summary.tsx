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
    { Header: "ESI NUMBER", accessor: "esi_number" },
    { Header: "EMPLOYEES' CONTRIBUTION", accessor: "employees_contribution" },
    {
      Header: "EMPLOYER'S CONTRIBUTION",
      accessor: "employers_contribution",
    },
    { Header: "TOTAL CONTRIBUTION", accessor: "total_contribution" },
  ],
  rows: [
    {
      employee_id: "lkjk",
      employee_name: "Lara Puleque",
      esi_number: 9867,
      employees_contribution: 8776,
      employers_contribution: 9869,
      total_contribution: "87687",
    },
    {
      employee_id: "nbmn",
      employee_name: "Puleque",
      esi_number: 8760,
      employees_contribution: 98722,
      employers_contribution: 7657,
      total_contribution: 987789,
    },
    {
      employee_id: "8668",
      employee_name: "leque",
      esi_number: 9876,
      employees_contribution: 987232,
      employers_contribution: 546,
      total_contribution: 76575,
    },
    {
      employee_id: "5676",
      employee_name: "leoo",
      esi_number: 9756,
      employees_contribution: 7232,
      employers_contribution: 7890,
      total_contribution: 97890,
    },
  ],
};
const ESIC_Summary = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "80%", margin: "auto", mt: "4%" }}>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            Mindcom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            ESI Summary
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            Contribution period from 01/09/2023 to 30/09/2023
          </MDTypography>
        </MDBox>
        <DataTable table={dataTableData} />
      </Card>
    </DashboardLayout>
  );
};

export default ESIC_Summary;
