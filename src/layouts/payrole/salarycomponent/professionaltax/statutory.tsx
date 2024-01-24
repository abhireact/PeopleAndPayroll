/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import Dialog from "@mui/material/Dialog";

import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import axios from "axios";
import MDButton from "components/MDButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Updatestatutory from "./updatestatutory";
import MDTypography from "components/MDTypography";

import View from "./viewslab";
import Cookies from "js-cookie";
const token = Cookies.get("token");
const Professionaltax = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskData, setEditTaskData] = useState(null);
  const [taxstate, setTaxstate] = useState("");
  const handleState = (taxstate: React.SetStateAction<string>) => {
    setTaxstate(taxstate);
  };
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
  // Fetch tasks on component mount --start
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://10.0.20.133:8000/professional_tax", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(() => response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  //end

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
                    startIcon={<BorderColorIcon />}
                    onClick={() => handleOpenupdate(index)}
                    size="large"
                  />
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
                  <MDTypography sx={{ fontSize: 14 }} ml={2} variant="span">
                    {task.pt_number}
                  </MDTypography>
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
                    {task.deduction_cycle}
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
                    onClick={() => {
                      handleOpenpop();
                      handleState(task.state);
                    }}
                  >
                    View Tax Slabs
                  </MDButton>
                </Grid>
              </Grid>
            </CardContent>

            <Dialog open={openpop} onClose={handleClosepop}>
              <MDBox p={4}>
                <View stateToFind={taxstate} />
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
