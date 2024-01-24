import { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import axios from "axios";
import { FormControlLabel, Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import Basic from "layouts/authentication/sign-in/basic";
import Cookies from "js-cookie";

const token = Cookies.get("token");
function SalaryStructure() {
  const [pagestatus, setPageStatus] = useState("create");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://10.0.20.133:8000/mg_payschedule/by_name?organization_name=Mindcom&location_name=  `",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data, "all earning data");
          // setEarnings(response.data);
          setPageStatus("edit");
        }
      } catch (error) {
        // console.error(error);
        console.log("location not found");
      }
    };
    fetchData();
  });
  const dataTableData = {
    columns: [
      { Header: "NAME", accessor: "name", width: "70%" },
      { Header: "EARNING TYPE", accessor: "earning_amount", width: "30%" },
    ],
    rows: [
      {
        name: "Basic",
        earning_amount: 25000,
      },
      {
        name: "Basic",
        earning_amount: 25000,
      },
    ],
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "80%", margin: "auto", mt: "2%" }}>
        <MDBox p={3}>Monthly CTC: ₹50,000.00</MDBox>
      </Card>
      <Card sx={{ width: "80%", margin: "auto", mt: "2%" }}>
        <MDBox p={3}>
          <MDTypography variant="h5">Earning</MDTypography>
          <DataTable
            table={dataTableData}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            // noEndBorder={true}
          />
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default SalaryStructure;
