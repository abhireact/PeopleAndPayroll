/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Delete } from "@mui/icons-material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import MDInput from "components/MDInput";
import { useFormik } from "formik";
import * as yup from "yup";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import axios from "axios";
import MDButton from "components/MDButton";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import Updatestatutory from "layouts/payrole/salarycomponent/updateprofessionaltax";
import MDTypography from "components/MDTypography";
import Stack from "@mui/material/Stack";
import DataTable from "examples/Tables/DataTable";

const Professionaltax = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskData, setEditTaskData] = useState(null);

  //for dialog box start
  const [openupdate, setOpenupdate] = useState(false);
  console.log(tasks, "tasking");

  const handleOpenupdate = (index: number) => {
    const main_data = tasks[index];
    setOpenupdate(true);
    setEditTaskData(main_data);
    console.log(main_data, "maindata");
  };
  console.log(editTaskData, "taskata");

  const handleCloseupdate = () => {
    setOpenupdate(false);
  };
  //end

  const fetchTasks = async () => {
    try {
      // const response = await axios.get("http://10.0.20.133:8001/worklocation", {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvX2lkIjoxLCJlbWFpbCI6IjIwMDNvbTE3MTFAZ21haWwuY29tIiwiZXhwIjoxNjk3Nzc2NTMwLCJhZG1pbiI6dHJ1ZX0.PWQQOV6bj7uCVyqjG7NjGrZ0CR6GVGUivWOjmy9vCSk`,
      //   },
      // });
      const pracdata = [{ location_name: "bangalore", state: "karnataka" }];
      setTasks(pracdata);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const [openpop, setOpenpop] = useState(false);
  const handleClosepop = () => {
    setOpenpop(false);
  };
  const handleOpenpop = () => {
    setOpenpop(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <MDTypography sx={{ fontSize: 20, fontWeight: "bold" }}>Professional Tax</MDTypography>
        <MDTypography sx={{ fontSize: 14 }}>
          This tax is levied on an employee's income by the State Government. Tax slabs differ in
          each state.
        </MDTypography>
      </MDBox>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row", // Display cards in a row
          flexWrap: "wrap",
          flexGrow: 1,
          lineHeight: "10%",
        }}
      >
        {tasks.map((task, index) => (
          <Card
            key={task}
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 0.5,
              m: 0.5,
              bgcolor: "background.paper",
              borderRadius: 2,
              flexBasis: "40%", // Display two cards in one row
            }}
          >
            <CardContent>
              <Grid container sx={{ marginBottom: -3 }}>
                <Grid sm={6}>
                  <MDTypography
                    sx={{
                      fontFamily: "Raleway",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {task.location_name}
                  </MDTypography>
                </Grid>
                <Grid sm={6}>
                  <MDButton
                    startIcon={<CreateRoundedIcon />}
                    onClick={() => handleOpenupdate(index)}
                    size="medium"
                  />

                  <MDButton startIcon={<Delete />} size="medium" />
                </Grid>
              </Grid>
            </CardContent>
            <CardContent sx={{ marginBottom: -1.4 }}>
              <Grid container>
                <Grid sm={6}>
                  <MDTypography sx={{ fontSize: 14 }} variant="span">
                    PT Number
                  </MDTypography>
                </Grid>
                <Grid sm={6}>
                  <MDTypography variant="span"></MDTypography>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent sx={{ marginBottom: -1.4 }}>
              <Grid container>
                <Grid sm={6}>
                  <MDTypography sx={{ fontSize: 14 }} variant="span">
                    State
                  </MDTypography>
                </Grid>
                <Grid sm={6}>
                  <MDTypography sx={{ fontSize: 14, fontWeight: "bold" }} ml={2} variant="span">
                    {task.state}
                  </MDTypography>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Grid container>
                <Grid sm={6}>
                  <MDTypography sx={{ fontSize: 14 }} variant="span">
                    Deduction Cycle
                  </MDTypography>
                </Grid>
                <Grid sm={6}>
                  <MDTypography sx={{ fontSize: 14, fontWeight: "bold" }} ml={2} variant="span">
                    {"Monthly"}
                  </MDTypography>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Grid container sx={{ marginTop: -1.5 }}>
                <Grid sm={6}>
                  <MDTypography sx={{ fontSize: 14 }} variant="span">
                    PT Slabs
                  </MDTypography>
                </Grid>
                <Grid sm={6}>
                  <MDButton
                    sx={{ marginTop: -2, marginLeft: -1 }}
                    color="info"
                    variant="text"
                    onClick={() => handleOpenpop()}
                  >
                    View Tax Slabs
                  </MDButton>
                </Grid>
              </Grid>
            </CardContent>

            <Dialog open={openpop} onClose={handleClosepop}>
              <MDBox p={4}>
                Tax slabs for {task.location_name}
                <DataTable
                  table={{
                    columns: [
                      {
                        Header: "MONTHLY GROSS SALARY (₹)",
                        accessor: "monthlysalary",
                        width: "50%",
                      },
                      { Header: "MONTHLY TAX AMOUNT (₹)", accessor: "monthlyamount", width: "50%" },
                    ],
                    rows: [
                      {
                        monthlysalary: "1 - 24999",

                        monthlyamount: "0",
                      },
                      {
                        monthlysalary: "25000 - 999999999",

                        monthlyamount: "200",
                      },
                    ],
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                />
              </MDBox>
            </Dialog>

            <Dialog open={openupdate} onClose={handleCloseupdate} fullScreen>
              <Updatestatutory
                openupdate={openupdate}
                setOpenupdate={setOpenupdate}
                task={editTaskData}
              />
            </Dialog>
          </Card>
        ))}
      </Grid>
    </DashboardLayout>
  );
};

export default Professionaltax;
