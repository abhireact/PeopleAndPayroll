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
    pan: "ks274fsfj1",
    taxable_amount: 2090,
    tax_on_income: 45788,
    surcharge_amount: 4389,
    cass_amount: 4347,
    total_tds_amount: 543245,
  },
  {
    employee_id: 21040006291272,
    employee_name: "kshf",
    pan: "ks274fsfj1",
    taxable_amount: 2340,
    tax_on_income: 35875,
    surcharge_amount: 43289,
    cass_amount: 543247,
    total_tds_amount: 5432145,
  },
  {
    employee_id: 21040006291273,
    employee_name: "wkhn",
    pan: "ks274fsfj1",
    taxable_amount: 3420,
    tax_on_income: 357875,
    surcharge_amount: 54323389,
    cass_amount: 54447,
    total_tds_amount: 544345,
  },
  {
    employee_id: 21040006291274,
    employee_name: "sfhb",
    pan: "ks274fsfj1",
    taxable_amount: 5420,
    tax_on_income: 538753,
    surcharge_amount: 55489,
    cass_amount: 5447,
    total_tds_amount: 54445,
  },
];

const dataTableData = {
  columns: [
    { Header: "EMPLOYEE ID", accessor: "employee_id" },
    { Header: "EMPLOYEE NAME ", accessor: "employee_name" },
    { Header: "PAN", accessor: "pan" },
    { Header: "TAXABLE AMOUNT", accessor: "taxable_amount" },
    { Header: "TAX ON INCOME", accessor: "tax_on_income" },
    { Header: "SURCHARGE AMOUNT ", accessor: "surcharge_amount" },
    { Header: "CESS AMOUNT", accessor: "cass_amount" },
    { Header: "TOTAL TDS AMOUNT", accessor: "total_tds_amount" },
  ],
  rows: rcoloum.map((data) => ({
    employee_id: data.employee_id,
    employee_name: data.employee_name,
    pan: data.pan,
    taxable_amount: data.taxable_amount,
    tax_on_income: data.tax_on_income,
    surcharge_amount: data.surcharge_amount,
    cass_amount: data.cass_amount,
    total_tds_amount: data.total_tds_amount,
  })),
};

const Tax_Deduction_Summary = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "100%", margin: "auto", mt: "4%" }}>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            Mindcom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            Tax Deduction Summary
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

export default Tax_Deduction_Summary;
