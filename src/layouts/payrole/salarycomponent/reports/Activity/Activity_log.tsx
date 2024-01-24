import { Card, Grid } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";

const Activity_log = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    // Redirect to the desired route when the button is clicked
    navigate("/pages/profile/login");
  };

  const row = [
    {
      time: "09/10/2023 05:32 PM",
      activity_details: "office lone",
      description:
        "Loan 'office lone(LOAN-00002)' created for ;oleiarfj LWHKR C liufcbhjiube by jitendra bedanta",
    },
    {
      time: "09/10/2023 05:32 PM",
      activity_details: "",
      description: "Payroll tax preference has been updated by jitendra bedanta",
    },
    {
      time: "04/10/2023 11:42 AM",
      activity_details: "sagar kumar ratha",
      description: "Pre tax deduction details have been updated for sagar by jitendra bedanta",
    },
    {
      time: "04/10/2023 11:40 AM",
      activity_details: "Department",
      description:
        "The department named accounting has been successfully created by jitendra bedanta",
    },
    {
      time: "04/10/2023 11:40 AM",
      activity_details: "Department",
      description:
        "The department named accounting has been successfully created by jitendra bedanta",
    },
    {
      time: "04/10/2023 11:40 AM",
      activity_details: "Department",
      description:
        "The department named accounting has been successfully created by jitendra bedanta",
    },
  ];
  const dataTableData = {
    columns: [
      { Header: "TIME", accessor: "time" },
      { Header: "ACTIVITY DETAILS", accessor: "activity_details" },
      { Header: "DESCRIPTION", accessor: "description" },
      { Header: "DESCRIPTION", accessor: "show_version" },
    ],
    rows: row.map((data, index) => ({
      time: data.time,
      activity_details: data.activity_details,
      description: data.description,
      show_version: (
        <MDButton variant="text" color="info" type="submit" onClick={handleButtonClick}>
          SHOW
        </MDButton>
      ),
    })),
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "auto", margin: "auto", mt: "3%" }}>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            Mindcom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            Activity Logs
          </MDTypography>
          <MDTypography variant="subtitle2" sx={{ textAlign: "center" }}>
            01/10/2023 to 31/10/2023
          </MDTypography>
        </MDBox>
        <DataTable table={dataTableData} />
      </Card>
    </DashboardLayout>
  );
};

export default Activity_log;
