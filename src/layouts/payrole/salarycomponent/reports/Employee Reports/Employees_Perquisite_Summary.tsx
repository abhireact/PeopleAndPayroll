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
    { Header: "VALUE OF PERQUISITE AS PER RULES", accessor: "value_of_perquisite" },
    { Header: "AMOUNT RECOVERED FROM THE EMPLOYEE, IF ANY", accessor: "amount_recovered" },
    { Header: "AMOUNT OF PERQUISITE CHARGEABLE TO TAX", accessor: "amount_of_perquisite" },
  ],
  rows: [
    {
      employee_id: "co founder",
      employee_name: "Lara Puleque",
      value_of_perquisite: "perquisite",
      amount_recovered: 98754,
      amount_of_perquisite: 87457,
    },
    {
      employee_id: "founder",
      employee_name: "Puleque",
      value_of_perquisite: "perquisite",
      amount_recovered: 98722,
      amount_of_perquisite: 87167,
    },
    {
      employee_id: "leader",
      employee_name: "leque",
      value_of_perquisite: "requisite",
      amount_recovered: 987232,
      amount_of_perquisite: 871617,
    },
    {
      employee_id: "designer",
      employee_name: "leoo",
      value_of_perquisite: "isite",
      amount_recovered: 7232,
      amount_of_perquisite: 1617,
    },
  ],
};
const employee_prequisite = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "80%", margin: "auto", mt: "4%" }}>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            Mindcom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            Employees Perquisite Summary
          </MDTypography>
          <MDTypography variant="body2" sx={{ textAlign: "center" }}>
            As of October, 2023
          </MDTypography>
        </MDBox>
        <DataTable table={dataTableData} />
      </Card>
    </DashboardLayout>
  );
};

export default employee_prequisite;
