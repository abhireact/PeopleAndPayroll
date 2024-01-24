import { useState, useEffect } from "react";
// import { Grid, Card,  Autocomplete } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import Switch from "@mui/material/Switch";
import EarningForm from "layouts/payrole/salarycomponent/earning/earningform";
import StepLabel from "@mui/material/StepLabel";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import FormField from "layouts/applications/wizard/components/FormField";
import Checkbox from "@mui/material/Checkbox";
import MDBadge from "components/MDBadge";
import { useFormik } from "formik";
import Icon from "@mui/material/Icon";
import EditEarning from "layouts/payrole/salarycomponent/earning/editearning";
import {
  TextField,
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Card,
  Grid,
  Dialog,
  Link,
  //   Checkbox,
  Divider,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
const token = Cookies.get("token");
function Templates() {
  const [allTemplates, setAllTemplates] = useState(["template1", "template2"]);
  const [editdata, setEditdata] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://10.0.20.133:8000/mg_earning_type/by_name?organization_name=Mindcom&location_name=Banglore",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data, "all earning data");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = (data: any) => {
    setEditdata(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSwitchChange = async (event: any, data: any) => {
    const isChecked = event.target.checked; // Get the new state of the switch
    data.mark_as_active = isChecked;
    try {
      const response = await axios.put(
        `http://10.0.20.133:8000/mg_earning_type/?earning_type_name=${data.earning_type_name}&location_name=${data.location_name}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Update Successfully");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }

    //
  };
  const handleDelete = async (data: any) => {
    try {
      const response = await axios.delete(
        `http://10.0.20.133:8000/mg_earning_type/?earning_type_name=${data.earning_type_name}&location_name=${data.location_name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Delete Successfully");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }

    //
  };

  const dataTableData = {
    columns: [
      { Header: "NAME", accessor: "name" },
      { Header: "ACTION", accessor: "action" },
    ],
    rows: allTemplates.map((data, index) => ({
      name: data,
      action: (
        <Grid container spacing={1}>
          <Grid item>
            <Link href="/editsalarytemplate" variant="body2">
              <Icon fontSize="small" onClick={() => handleClickOpen(data)}>
                edit
              </Icon>
            </Link>
          </Grid>
          <Grid item>
            <Icon fontSize="small" onClick={() => handleDelete(data)}>
              delete
            </Icon>
          </Grid>
        </Grid>
      ),
    })),
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <EditEarning data={editdata} />
      </Dialog>
      <Card sx={{ width: "95%", margin: "auto", mt: "2%" }}>
        <Grid container spacing={3} p={2}>
          <Grid item xs={12} sm={8}>
            <MDTypography variant="h5">Salary Templates</MDTypography>
          </Grid>
          <Grid item xs={12} sm={4} display="flex" justifyContent="flex-end">
            <Link href="/createsalarytemplate" variant="body2">
              <MDButton variant="gradient" color="info" type="submit">
                {"+Create New Template"}
              </MDButton>
            </Link>
          </Grid>
        </Grid>
        <DataTable
          table={dataTableData}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
        />
      </Card>
    </DashboardLayout>
  );
}

export default Templates;
