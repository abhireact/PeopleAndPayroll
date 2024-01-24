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
    { Header: "UAN", accessor: "uan" },
    { Header: "MEMBER NAME", accessor: "member_name" },
    { Header: "GROSS WAGES", accessor: "gross_wages" },
    {
      Header: "EPF WAGES",
      accessor: "epf_wages",
    },
    { Header: "EPS WAGES", accessor: "eps_wages" },
    { Header: "EDLI WAGES", accessor: "epli_wages" },
    { Header: "EPF CONTRIBUTION REMITTED", accessor: "epf_contributuin" },
    { Header: "EPS CONTRIBUTION REMITTED", accessor: "eps_contribution" },
    { Header: "EPF AND EPS DIFF REMITTED", accessor: "epf_and_eps_diff" },
    { Header: "NCP DAYS", accessor: "ncp_days" },
    { Header: "REFUND OF ADVANCES", accessor: "refund_of_advances" },
  ],
  rows: [
    {
      employee_id: "lkjk",
      uan: "Lara Puleque",
      member_name: "wjhbdjdw",
      gross_wages: "wjbjbhd",
      epf_wages: "wdkjkbh",
      eps_wages: "wjbhn",
      epli_wages: "winwjdx",
      epf_contributuin: "wkjn",
      eps_contribution: "win",
      epf_and_eps_diff: "reonn",
      ncp_days: 20,
      refund_of_advances: "7890987",
    },
    {
      employee_id: "nbmn",
      uan: "Puleque",
      member_name: "wbdjdw",
      gross_wages: "wjbhd",
      epf_wages: "kjkbh",
      eps_wages: "wjhn",
      epli_wages: "wijdx",
      epf_contributuin: "kjn",
      eps_contribution: "wkin",
      epf_and_eps_diff: "reonkn",
      ncp_days: 209,
      refund_of_advances: "78909087",
    },
    {
      employee_id: "8668",
      uan: "leque",
      member_name: "bdjdw",
      gross_wages: "jbhd",
      epf_wages: "kjkbh",
      eps_wages: "jbhn",
      epli_wages: "inwjdx",
      epf_contributuin: "kjn",
      eps_contribution: "in",
      epf_and_eps_diff: "onn",
      ncp_days: 200,
      refund_of_advances: "78900987",
    },
  ],
};
const ESIC_Summary = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "100%", margin: "auto", mt: "4%" }}>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            Mindcom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            EPF-ECR Report for October, 2023
          </MDTypography>
        </MDBox>
        <DataTable table={dataTableData} />
      </Card>
    </DashboardLayout>
  );
};

export default ESIC_Summary;
