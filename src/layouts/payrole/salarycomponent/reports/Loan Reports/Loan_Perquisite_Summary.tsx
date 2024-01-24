import React from "react";
import { Card } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

const rcoloum = [
  {
    employee_id: 21040006291271,
    employee_name: "olki",
    loan_number: 4831,
    loan_name: "officeloan",
    loan_amount: 345788,
    prequisite_amount: 498389,
  },
  {
    employee_id: 21040006291272,
    employee_name: "kshf",
    loan_number: 9867,
    loan_name: "officeloan",
    loan_amount: 358750,
    prequisite_amount: 943289,
  },
  {
    employee_id: 21040006291273,
    employee_name: "wkhn",
    loan_number: 4573,
    loan_name: "officeloan",
    loan_amount: 357875,
    prequisite_amount: 54323389,
  },
  {
    employee_id: 21040006291274,
    employee_name: "sfhb",
    loan_number: 1023,
    loan_name: "officeloan",
    loan_amount: 538753,
    prequisite_amount: 955489,
  },
];

const dataTableData = {
  columns: [
    { Header: "EMPLOYEE ID", accessor: "employee_id" },
    { Header: "EMPLOYEE NAME ", accessor: "employee_name" },
    { Header: "LOAN NUMBER", accessor: "loan_number" },
    { Header: "LOAN NAME", accessor: "loan_name" },
    { Header: "LOAN AMOUNT", accessor: "loan_amount" },
    { Header: "PERQUISITE AMOUNT ", accessor: "prequisite_amount" },
  ],
  rows: rcoloum.map((data) => ({
    employee_id: data.employee_id,
    employee_name: data.employee_name,
    loan_number: data.loan_number,
    loan_name: data.loan_name,
    loan_amount: data.loan_amount,
    prequisite_amount: data.prequisite_amount,
  })),
};

const Tax_Deduction_Summary = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "100%", margin: "auto", mt: "4%" }}>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            MindCom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            Loan Perquisite Summary
          </MDTypography>
          <MDTypography variant="body2" sx={{ textAlign: "center" }}>
            Fiscal Year : 2023 - 24
          </MDTypography>
        </MDBox>
        <DataTable table={dataTableData} />
      </Card>
    </DashboardLayout>
  );
};

export default Tax_Deduction_Summary;
