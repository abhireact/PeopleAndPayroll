import React from "react";
import { Card } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

const dataTableData = {
  columns: [
    { Header: "EMPLOYEE", accessor: "employee" },
    { Header: "PREVIOUS CTC", accessor: "previous_ctc" },
    { Header: "REVISED CTC", accessor: "revised_ctc" },
    { Header: "DIFFERENCE", accessor: "differevce" },
    { Header: "EFFECTIVE FROM", accessor: "effective" },
    { Header: "PAYOUT MONTH", accessor: "payout_month" },
    { Header: "STATUS", accessor: "status" },
  ],
  rows: [
    {
      employee: "Nat Gair",
      previous_ctc: "Administrative Officer",
      revised_ctc: "euyrfb",
      differevce: "emefn v",
      effective: "good",
      payout_month: "12",
      status: "dhfvgb",
    },
    {
      employee: "Puleque",
      previous_ctc: "Technician",
      revised_ctc: "ejfbvh",
      differevce: "dejfbh df",
      effective: "good",
      payout_month: "14",
      status: "ofifgnb ii",
    },
    {
      employee: "Georgia Danbury",
      previous_ctc: "Puleque",
      revised_ctc: "rkubhvn g",
      differevce: "hdgbf v gv",
      effective: "good",
      payout_month: "6",
      status: ".f,khbn",
    },
    {
      employee: "Marleah Snipe",
      previous_ctc: "Account Representative II",
      revised_ctc: "kuvb hg",
      differevce: "hsdfv dj",
      effective: "good",
      payout_month: "9",
      status: "dffkvhjc",
    },
  ],
};
const Salary_Revision_Report = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "85%", margin: "auto", mt: "4%" }}>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            Mindcom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            Salary Revision Report
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

export default Salary_Revision_Report;
