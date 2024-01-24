import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import DataTable from "examples/Tables/DataTable";

import { useEffect, useState } from "react";

import axios from "axios";
import { Card, Divider, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";

function payrollLiabilitySummary(): JSX.Element {
  const [earnings, setEarnings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://10.0.20.133:8001/mg_earning_type");
      setEarnings(response.data);
    };
    fetchData();
  }, []);
  // const rowesofdata =[];

  const dataTableData = {
    columns: [
      { Header: "Earning Type", accessor: "earning_type_name" },
      { Header: "Earning Name", accessor: "earning_name" },
      { Header: "Display Name", accessor: "display_name" },
      { Header: "Calculation Type", accessor: "calculation_type" },
      { Header: "Amount/Percent", accessor: "enter_amount_or_percent" },
      { Header: "salary_directives", accessor: "salary_directives" },
      { Header: "Status", accessor: "status" },
    ],
    rows: earnings.map((data, index) => ({
      earning_type_name: data.earning_type_name,
      earning_name: data.earning_name,
      display_name: data.display_name,
      calculation_type: data.calculation_type,
      enter_amount_or_percent: data.enter_amount_or_percent,
      salary_directives: 10000,
      status: data.mark_as_active,
    })),
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "85%", margin: "auto", mt: "3%" }}>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            MindCom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            payroll Liability Summary
          </MDTypography>
          <MDTypography variant="body2" sx={{ textAlign: "center" }}>
            01/09/2023 to 30/09/2023
          </MDTypography>
          <DataTable table={dataTableData} />
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}
export default payrollLiabilitySummary;
