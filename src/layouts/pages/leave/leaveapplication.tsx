import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import axios from "axios";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";
import { useFormik } from "formik";
import * as yup from "yup";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import Dialog from "@mui/material/Dialog";
// import UpdateApplyleave from "./updateapplyleave";
// import Viewleave from "./viewleave";
import React from "react";
import UpdateApplyleave from "./updateapplyleave";
import Viewleave from "./viewLeaves";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { C } from "@fullcalendar/core/internal-common";
function getDaysDifference(startDateStr: string, endDateStr: string): number | string {
  // Parse the date strings into Date objects
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  // Check if the date strings are valid
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return "Invalid date format";
  }

  // Calculate the time difference in milliseconds
  const timeDifference = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to days
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  return Math.ceil(daysDifference + 1);
}

const LeaveApplication = () => {
  const token = Cookies.get("token");

  const UserRole = Cookies.get("UserRole");
  console.log("token", token);
  console.log("UserRole", UserRole);
  const [data, setData] = useState([]);

  const [openupdate, setOpenupdate] = useState(false); //for dialog box start
  const [editData, setEditData] = useState(null);

  const handleOpenupdate = (index: number) => {
    const main_data = data[index];
    console.log(main_data, "maindata");

    setOpenupdate(true);
    setEditData(main_data);
  };
  console.log(editData, "Data that needs to be edited");

  const handleCloseupdate = () => {
    setOpenupdate(false);
  }; //end

  const [openview, setOpenview] = useState(false); //for dialog box start
  const [Viewdata, setviewData] = useState(null);

  const handleOpenview = (index: number) => {
    const main_data = data[index];
    console.log(main_data, "maindata");

    setOpenview(true);
    setviewData(main_data);
  };
  console.log(editData, "Data that needs to be edited");

  const handleCloseview = () => {
    setOpenview(false);
  }; //end

  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/apply_leave/manager_leave_applications", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);

        console.log(response.data, "data");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const dataTableData = {
    columns: [
      { Header: "Employee", accessor: "employee_name" },
      { Header: "Leave Type", accessor: "leave_type" },
      { Header: "Type", accessor: "type" },

      {
        Header: "Leave   Period",
        accessor: "leave_period",
      },
      { Header: "Days Taken", accessor: "leave_days" },
      { Header: "Data of Request", accessor: "created_at" },
      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      employee_name: <MDTypography variant="p">{row.employee_name}</MDTypography>,
      leave_type: <MDTypography variant="p">{row.leave_type}</MDTypography>,
      type: <MDTypography variant="p">{row.type}</MDTypography>,
      created_at: <MDTypography variant="p">{row.created_at}</MDTypography>,
      leave_period: (
        <MDTypography variant="p">
          {row.from_date} to {row.to_date}
        </MDTypography>
      ),
      leave_days: (
        <MDTypography variant="p">{getDaysDifference(row.from_date, row.to_date)}</MDTypography>
      ),
      to_date: <MDTypography variant="p">{row.to_date}</MDTypography>,
      action:
        UserRole === "Admin" ? ( // Conditionally render actions based on user role
          <MDTypography variant="p">
            <IconButton
              onClick={() => {
                handleOpenview(index);
                console.log(index);
              }}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                handleOpenupdate(index);
                console.log(index);
              }}
            >
              <CreateRoundedIcon />
            </IconButton>
          </MDTypography>
        ) : (
          ""
        ), // Replace "handleAction" with the function you want to call for each row action.
    })),
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Dialog open={openupdate} onClose={handleCloseupdate}>
          <UpdateApplyleave openupdate={openupdate} setOpenupdate={setOpenupdate} data={editData} />
        </Dialog>
        <Dialog open={openview} onClose={handleCloseview}>
          <Viewleave openview={openview} setOpenview={setOpenview} data={Viewdata} />
        </Dialog>
        <Grid container spacing={3} p={2}>
          <Grid item xs={12} sm={9}>
            <MDTypography variant="h5">{"Leave Application"}</MDTypography>
          </Grid>
        </Grid>
        <DataTable table={dataTableData} />
      </Card>
    </DashboardLayout>
  );
};

export default LeaveApplication;
