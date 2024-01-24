import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";

import Dialog from "@mui/material/Dialog";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import axios from "axios";
import Addholiday from "./addholiday";
import Updateholiday from "./updateholiday";
import { message } from "antd";
import Cookies from "js-cookie";
function transformString(inputString: string): string {
  // Split the input string into an array of substrings
  const substrings = inputString.split("-");

  // Reverse the array of substrings
  const reversedArray = substrings.reverse();

  // Join the reversed array into a string using '-' as the separator
  const resultString = reversedArray.join("/");

  return resultString;
}

const ShowHoliday = () => {
  const [data, setData] = useState([]);
  const token = Cookies.get("token");
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
    console.log(main_data, "maindata");

    setOpenupdate(true);
    setEditData(main_data);
  };

  const handleCloseupdate = () => {
    setOpenupdate(false);
  }; //End

  const handleDeleteData = async (row: any) => {
    console.log(row, "Delete Data");
    try {
      const deletedata = await axios.delete("http://10.0.20.133:8000/holiday", {
        data: {
          ...row,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (deletedata.status == 200) {
        message.success("Holiday Deleted successFully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/holiday", {
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
  const dataTableData = {
    columns: [
      { Header: "Name", accessor: "name" },
      { Header: "Date", accessor: "date" },
      // { Header: "Location", accessor: "location" },

      // { Header: "Shift(s)", accessor: "shift" },
      { Header: "description ", accessor: "description" },

      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      name: <MDTypography variant="p">{row.name}</MDTypography>,
      action: (
        <MDTypography variant="p">
          <IconButton
            onClick={() => {
              handleOpenupdate(index);
              console.log(index);
            }}
          >
            <CreateRoundedIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteData(row)}>
            <DeleteIcon />
          </IconButton>
        </MDTypography>
      ),
      date: (
        <MDTypography variant="p">
          {transformString(row.from_date)} to {transformString(row.to_date)}
        </MDTypography>
      ),

      description: <MDTypography variant="p">{row.description}</MDTypography>,
    })),
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDTypography>Holiday</MDTypography>
      <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
        <MDButton variant="contained" color="info" onClick={handleClickOpen}>
          + Add
        </MDButton>
        <Dialog open={open} onClose={handleClose}>
          <Addholiday setOpen={setOpen} />
        </Dialog>
        <Dialog open={openupdate} onClose={handleCloseupdate}>
          <Updateholiday setOpenupdate={setOpenupdate} editData={editData} />
        </Dialog>
      </Grid>
      <DataTable table={dataTableData} />
    </DashboardLayout>
  );
};

export default ShowHoliday;
