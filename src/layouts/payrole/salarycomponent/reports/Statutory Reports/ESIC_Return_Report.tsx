import React from "react";
import { Card } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

const dataTableData = {
  columns: [
    { Header: "INSURANCE PERSON NUMBER", accessor: "insurance_number" },
    { Header: "INSURANCE PERSON NAME", accessor: "insurance_persons_name" },
    { Header: "PAID DAYS", accessor: "paid_days" },
    { Header: "TOTAL MONTHLY WAGES", accessor: "total_monthly_wages" },
    {
      Header: "REASON CODE FOR ZERO WORKINGS DAYS ",
      accessor: "reason_code_for_zero_working_days",
    },
    { Header: "LAST WORKING DAY", accessor: "last_working_days" },
  ],
  rows: [
    {
      insurance_number: "9867",
      insurance_persons_name: "Lara Puleque",
      paid_days: "components",
      total_monthly_wages: 8776,
      reason_code_for_zero_working_days: "fdcgjhg",
      last_working_days: "01/05/2023",
    },
    {
      insurance_number: "6794",
      insurance_persons_name: "Puleque",
      paid_days: "foods",
      total_monthly_wages: 98722,
      reason_code_for_zero_working_days: "sc dwx",
      last_working_days: "03/01/2022",
    },
    {
      insurance_number: "8668",
      insurance_persons_name: "leque",
      paid_days: "toys",
      total_monthly_wages: 987232,
      reason_code_for_zero_working_days: "jhgv",
      last_working_days: "02/09/2022",
    },
    {
      insurance_number: "5676",
      insurance_persons_name: "leoo",
      paid_days: "clothes",
      total_monthly_wages: 7232,
      reason_code_for_zero_working_days: "lkhn",
      last_working_days: "01/02/2023",
    },
  ],
};
const ESIC_Return_Report = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "80%", margin: "auto", mt: "4%" }}>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            Mindcom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            ESIC Return Report for October, 2023
          </MDTypography>
        </MDBox>
        <DataTable table={dataTableData} />
      </Card>
    </DashboardLayout>
  );
};

export default ESIC_Return_Report;
