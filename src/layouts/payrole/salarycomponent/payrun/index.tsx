import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import FormField from "layouts/applications/wizard/components/FormField";
import Checkbox from "@mui/material/Checkbox";
// import "./weekday.css";
import { FormControlLabel, Card, Grid, Dialog, IconButton, Link } from "@mui/material";
import Icon from "@mui/material/Icon";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import Divider from "@mui/material/Divider";
// import CancelIcon from '@mui/icons-material/Cancel';
import MDAlertCloseIcon from "components/MDAlert/MDAlertCloseIcon";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import Cookies from "js-cookie";
const initialValues = {
  esi_number: "",
  deduction_cycle: "",
  employees_contribution: "",
  employers_contribution: "",
  include_employers_contribution_in_the_ctc: true,
};
const token = Cookies.get("token");
interface PayrunData {
  month: string; // Replace 'string' with the actual type of 'month'
  status: string; // Replace 'string' with the actual type of 'status'
  net_pay: number;
  no_of_emp: number; // Replace 'string' with the actual type of 'net_pay'
  date: string;
  emp_salary: [];
}
function Payrun() {
  const [openPopup, setOpenPopup] = useState(false);
  const [allData, setAllData] = useState<PayrunData | null>(null);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: (values, action) => {
        console.log("values", values);
        action.resetForm();
      },
    });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://10.0.20.133:8000/employee_salarydetails/generatepayreport/draft",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data, "all data");
          setAllData(response.data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  //
  //   const handleOpenPopup = () => setOpenPopup(true);
  const dataTableData = {
    columns: [
      { Header: "EMPLOYEE NAME", accessor: "e_name" },
      { Header: "PAID DAYS", accessor: "paid_days" },
      { Header: "NET PAY", accessor: "net_pay" },
      { Header: "PAYSLIP", accessor: "payslip" },
      { Header: "TDS SHEET", accessor: "tds_sheet" },
      { Header: "PAYMENT MODE", accessor: "payment_mood" },
      { Header: "PAYMENT STATUS", accessor: "payment_status" },
      { Header: "ACTION", accessor: "action" },
    ],

    rows: [
      {
        e_name: "Prabhakar",
        paid_days: "24",
        net_pay: "	₹50,000.00",
        payslip: <MDButton onClick={() => setOpenPopup(true)}>View</MDButton>,
        tds_sheet: "View",
        payment_mood: "Manual Bank Transfer",
        payment_status: "Paid on 02/06/2023",
        action: <EditIcon />,
      },
    ],
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Dialog open={openPopup}>
        <Card sx={{ width: "100%", margin: "auto", mt: "2%" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={9}>
              <MDTypography variant="h6" pl={2}>
                PAYSLIP
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
              {/* <MDButton onClick={() => setOpenPopup(false)}>
                <Icon fontSize="medium" color="inherit">
                  cancel
                </Icon>
              </MDButton> */}
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setOpenPopup(false)}
              >
                <Icon fontSize="small">close</Icon>
              </IconButton>
            </Grid>
          </Grid>
          <MDBox>
            <Grid container spacing={1} p={2}>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="h6">Prabhakar</MDTypography>
              </Grid>
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDTypography variant="button">Net Pay</MDTypography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="body2">Emp. ID: 80deb</MDTypography>
              </Grid>
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDTypography variant="h6">₹41,667.00</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h6" color="success" bgcolor="success">
                  Paid on 02/06/2023 through Check
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="body2">Payable Days</MDTypography>
              </Grid>
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDTypography variant="body2">24</MDTypography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="button" color="success">
                  (+) EARNINGS
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDTypography variant="button">AMOUNT </MDTypography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="button">Basic</MDTypography>
              </Grid>
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDTypography variant="button">₹20,834.00</MDTypography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="button">House Rent Allowance</MDTypography>
              </Grid>
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDTypography variant="button">₹10,417.00</MDTypography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="button">Fixed Allowance</MDTypography>
              </Grid>
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDTypography variant="button">₹10,416.00</MDTypography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="button" color="warning">
                  (-) DEDUCTIONS
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDTypography variant="button">AMOUNT</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="button">TAXES</MDTypography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="button">Income Tax</MDTypography>
              </Grid>
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDTypography variant="button">₹0.00</MDTypography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="subtitle2">NET PAY</MDTypography>
              </Grid>
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDTypography variant="subtitle2">₹41,667.00</MDTypography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MDButton color="info" onClick={() => setOpenPopup(true)}>
                  Download Payslip
                </MDButton>
              </Grid>
              <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
                <MDButton color="secondary" variant="outlined" onClick={() => setOpenPopup(false)}>
                  Send Payslip
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Dialog>
      <form onSubmit={handleSubmit}>
        <Card sx={{ width: "80%", margin: "auto", mt: "2%" }}>
          <MDBox p={3}>
            <Grid container spacing={3} px={2}>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h5" fontWeight="bold">
                  Process Pay Run for {allData?.month}
                  <span
                    style={{
                      color: "white",
                      border: "1px solid",
                      padding: "2px 4px",
                      fontSize: "1.0em",
                      cursor: "pointer",
                      borderRadius: "4px",
                      backgroundColor: "#ff8f00",
                    }}
                  >
                    {allData?.status}
                  </span>
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <MDTypography variant="button" color="text" fontWeight="bold">
                  EMPLOYEES&apos; NET PAY
                </MDTypography>
                <br />
                <MDTypography variant="h6">{allData?.net_pay}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <MDTypography variant="button" fontWeight="bold" color="text">
                  PAYMENT DATE
                </MDTypography>
                <br />
                <MDTypography variant="h6">{allData?.date}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <MDTypography variant="button" fontWeight="bold" color="text">
                  NO. OF EMPLOYEES
                </MDTypography>
                <br />
                <MDTypography variant="h6">{allData?.no_of_emp}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <Link
                  href={`/payrole/payrun/record?data=${encodeURIComponent(
                    JSON.stringify(allData)
                  )}`}
                  variant="body2"
                >
                  <MDButton color="info">View Details & pay</MDButton>
                </Link>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </form>
    </DashboardLayout>
  );
}

export default Payrun;
