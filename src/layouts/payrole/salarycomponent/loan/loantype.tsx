import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import axios from "axios";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import Editloan from "./editloantype";
import Addloan from "./addloantype";
import Dialog from "@mui/material/Dialog";
import Cookies from "js-cookie";

import { message } from "antd";
const token = Cookies.get("token");

const Manageloan = ({ setOpendialog }: any) => {
  const [errorMessage, setErrorMessage] = useState("");
  const handleClosedialog = () => {
    setOpendialog(false);
  };
  const handleDeleteData = async (loan_name: any) => {
    console.log(loan_name, "Deleted Data");

    await axios
      .delete("http://10.0.20.133:8000/manage_loan/", {
        data: { loan_name: loan_name },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          window.location.reload();
          message.success("Deleted Successfully");
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data?.detail || "error occured");
        console.error("Error deleting task:", error);
      });
  };
  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/manage_loan", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const [data, setData] = useState([]);
  const dataTableData = {
    columns: [
      { Header: "LOAN NAME", accessor: "loan_name" },
      { Header: "PREQUISITE RATE", accessor: "pre_rate" },
      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      loan_name: <MDTypography variant="p">{row.loan_name}</MDTypography>,
      pre_rate: <MDTypography variant="p">{row.perquisite_rate} </MDTypography>,

      action: (
        <MDTypography variant="p">
          <IconButton
            onClick={() => {
              handleOpenupdate(index);
              console.log(index, "update index");
            }}
          >
            <CreateRoundedIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteData(row.loan_name)}>
            <DeleteIcon />
          </IconButton>
        </MDTypography>
      ),
    })),
  };
  //Start
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //End
  //Update Dialog Box Start
  const [editData, setEditData] = useState(null);
  const [openupdate, setOpenupdate] = useState(false);

  const handleOpenupdate = (index: number) => {
    setOpenupdate(true);
    const main_data = data[index];
    console.log(main_data, "edit data");

    setOpenupdate(true);
    setEditData(main_data);
  };

  const handleCloseupdate = () => {
    setOpenupdate(false);
  }; //End
  return (
    <MDBox p={4}>
      <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }} py={2}>
        <MDTypography variant="h3" fontWeight="medium">
          Manage Loan
        </MDTypography>
      </Grid>
      {errorMessage && (
        <MDTypography color="error" variant="body2">
          {errorMessage}
        </MDTypography>
      )}
      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        <MDButton variant="outlined" color="info" onClick={handleClickOpen}>
          + Create New Loan Type
        </MDButton>
        <MDButton
          color="primary"
          variant="outlined"
          onClick={() => {
            handleClosedialog();
          }}
        >
          &#60;- Back
        </MDButton>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <Addloan setOpen={setOpen} />
      </Dialog>
      <Dialog open={openupdate} onClose={handleCloseupdate}>
        <Editloan setOpenupdate={setOpenupdate} editData={editData} />
      </Dialog>
      <DataTable table={dataTableData} />
    </MDBox>
  );
};

export default Manageloan;
