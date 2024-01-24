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
    gross_paay: 9347,
    staturious: 7232,
    deductions: 4351617,
    taxes: 98754,
    reimbursement: 4323,
    net_pay: 487457,
  },
  {
    employee_id: "founder",
    employee_name: "Puleque",
    gross_paay: 9347,
    staturious: 7232,
    deductions: 4351617,
    taxes: 98754,
    reimbursement: 4323,
    net_pay: 487457,
  },
  {
    employee_id: "leader",
    employee_name: "leque",
    gross_paay: 35763,
    staturious: 7232,
    deductions: 4351617,
    taxes: 98754,
    reimbursement: 4323,
    net_pay: 487457,
  },
  {
    employee_id: "designer",
    employee_name: "leoo",
    gross_paay: 358653,
    staturious: 7232,
    deductions: 4351617,
    taxes: 98754,
    reimbursement: 4323,
    net_pay: 487457,
  },
];

const dataTableData = {
  columns: [
    { Header: "EMPLOYEE ID", accessor: "employee_id" },
    { Header: "EMPLOYEE NAME", accessor: "employee_name" },
    { Header: "GROSS PAY", accessor: "gross_paay" },
    { Header: "STATUTORIES", accessor: "staturious" },
    { Header: "DEDUCTIONS", accessor: "deductions" },
    { Header: "TAXES", accessor: "taxes" },
    { Header: "REIMBURSEMENTS", accessor: "reimbursement" },
    { Header: "NET PAY", accessor: "net_pay" },
  ],
  rows: rcoloum.map((data) => ({
    employee_id: data.employee_id,
    employee_name: data.employee_name,
    gross_paay: data.gross_paay,
    staturious: data.staturious,
    deductions: data.deductions,
    taxes: data.taxes,
    reimbursement: data.reimbursement,
    net_pay: data.net_pay,
  })),
};

const Employees_Pay_Summary = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "100%", margin: "auto", mt: "4%" }}>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            Mindcom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            Employees Pay Summary
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

export default Employees_Pay_Summary;
