import { useState, useEffect } from "react";
import { Grid, Card, Dialog, Link } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import Switch from "@mui/material/Switch";
import Icon from "@mui/material/Icon";
import EditPreTax from "layouts/payrole/salarycomponent/deduction/edit_pre_tax";
import EditPostTax from "layouts/payrole/salarycomponent/deduction/edit_post_tax";
import Cookies from "js-cookie";
const token = Cookies.get("token");
function Deducton() {
  const [preTax, setPreTax] = useState([]);
  const [postTax, setPostTax] = useState([]);
  const [editdata, setEditdata] = useState({});
  const [deductiontype, setDeductionType] = useState("");
  const handleSwitchChange = async (event: any, data: any, dtype: string) => {
    const isChecked = event.target.checked; // Get the new state of the switch
    data.mark_as_active = isChecked;
    if (dtype === "pretax") {
      try {
        const response = await axios.put(
          `http://10.0.20.133:8000/mg_pre_tax_deduction/?pre_name_slip=${data.pre_name_slip}`,
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
    } else if (dtype === "posttax") {
      try {
        const response = await axios.put(
          `http://10.0.20.133:8000/mg_post_tax_deduction/?name_in_payslip=${data.name_in_payslip}`,
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
    } else {
      ("select deduction type");
    }

    //
  };
  const handleDelete = async (data: any, dtype: string) => {
    if (dtype === "posttax") {
      try {
        const response = await axios.delete(
          `http://10.0.20.133:8000/mg_post_tax_deduction/?name_in_payslip=${data.name_in_payslip}`,
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
    } else if (dtype === "pretax") {
      try {
        const response = await axios.delete(
          `http://10.0.20.133:8000/mg_pre_tax_deduction/?deduction_with=${data.deduction_with}`,
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
    } else {
      console.log("pass deduction type");
    }
  };
  useEffect(() => {
    const preTaxFetchData = async () => {
      try {
        const response = await axios.get(
          "http://10.0.20.133:8000/mg_pre_tax_deduction/by_name?organization_name=Mindcom&location_name=Banglore",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data, "all earning data");
          setPreTax(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const postTaxFetchData = async () => {
      try {
        const response = await axios.get(
          "http://10.0.20.133:8000/mg_post_tax_deduction/by_name?organization_name=Mindcom&location_name=Banglore",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data, "all post data");
          setPostTax(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    postTaxFetchData();
    preTaxFetchData();
  }, []);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (data: any, dtype: string) => {
    setEditdata(data);
    setDeductionType(dtype);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pretaxDataTableData = {
    columns: [
      { Header: "NAME", accessor: "name" },
      { Header: "DEDUCTION TYPE", accessor: "deduction_type" },
      { Header: "DEDUCTION FREQUENCY", accessor: "deduction_frequency" },
      { Header: "STATUS", accessor: "status" },
      { Header: "ACTION", accessor: "action" },
    ],
    rows: preTax.map((data, index) => ({
      name: data.pre_name_slip,
      deduction_type: data.deduction_with,
      deduction_frequency: "Recurring",
      status: (
        <Switch
          defaultChecked={data.mark_as_active}
          color="warning"
          onChange={(event) => handleSwitchChange(event, data, "pretax")}
        />
      ),
      action: (
        <Grid container spacing={1}>
          <Grid item>
            <Icon fontSize="small" onClick={() => handleClickOpen(data, "pretax")}>
              edit
            </Icon>
          </Grid>
          <Grid item>
            <Icon fontSize="small" onClick={() => handleDelete(data, "pretax")}>
              delete
            </Icon>
          </Grid>
        </Grid>
      ),
    })),
  };
  const postDataTableData = {
    columns: [
      { Header: "NAME", accessor: "name" },
      { Header: "DEDUCTION TYPE", accessor: "deduction_type" },
      { Header: "DEDUCTION FREQUENCY", accessor: "deduction_frequency" },
      { Header: "STATUS", accessor: "status" },
      { Header: "ACTION", accessor: "action" },
    ],
    rows: postTax.map((data, index) => ({
      name: data.name_in_payslip,
      deduction_type: " 	Other Deductions",
      deduction_frequency: data.recurring_deduction == true ? "Recurring" : "One Time",
      status: (
        <Switch
          defaultChecked={data.mark_as_active}
          color="warning"
          onChange={(event) => handleSwitchChange(event, data, "posttax")}
        />
      ),
      action: (
        <Grid container spacing={1}>
          <Grid item>
            <Icon fontSize="small" onClick={() => handleClickOpen(data, "posttax")}>
              edit
            </Icon>
          </Grid>
          <Grid item>
            <Icon fontSize="small" onClick={() => handleDelete(data, "posttax")}>
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
      <Dialog open={open} onClose={handleClose}>
        {deductiontype === "posttax" ? (
          <EditPostTax data={editdata} />
        ) : deductiontype === "pretax" ? (
          <EditPreTax data={editdata} />
        ) : (
          "no data to show"
        )}
      </Dialog>
      <Grid>
        <Card sx={{ width: "90%", margin: "auto", mt: "2%" }}>
          <Grid container spacing={3} p={2}>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="h5">Pre-Tax Deductions</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} display="flex" justifyContent="flex-end">
              <Link
                href="/payrole/salarycomponent/deduction/create_pre_tax_deduction"
                variant="body2"
              >
                <MDButton variant="gradient" color="info" type="submit">
                  {"+Add Pre-Tax Deduction"}
                </MDButton>
              </Link>
            </Grid>
          </Grid>
          <DataTable
            table={pretaxDataTableData}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
          />
        </Card>
      </Grid>
      <Grid>
        <Card sx={{ width: "90%", margin: "auto", mt: "2%" }}>
          <Grid container spacing={3} p={2}>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="h5">Post-Tax Deductions</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} display="flex" justifyContent="flex-end">
              <Link
                href="/payrole/salarycomponent/deduction/create_post_tax_deduction"
                variant="body2"
              >
                <MDButton variant="gradient" color="info" type="submit">
                  {"+Add Post-Tax Deduction"}
                </MDButton>
              </Link>
            </Grid>
          </Grid>
          <DataTable
            table={postDataTableData}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
          />
        </Card>
      </Grid>
    </DashboardLayout>
  );
}

export default Deducton;
