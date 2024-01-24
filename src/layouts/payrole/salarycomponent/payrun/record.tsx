import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import FormField from "layouts/applications/wizard/components/FormField";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
// import "./weekday.css";
import {
  FormControlLabel,
  Card,
  Grid,
  Dialog,
  IconButton,
  Link,
  Autocomplete,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import Divider from "@mui/material/Divider";
// import CancelIcon from '@mui/icons-material/Cancel';
import MDAlertCloseIcon from "components/MDAlert/MDAlertCloseIcon";
import EditIcon from "@mui/icons-material/Edit";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import MDInput from "components/MDInput";
const token = Cookies.get("token");
const initialValues = {
  esi_number: "",
  deduction_cycle: "",
  employees_contribution: "",
  employers_contribution: "",
  include_employers_contribution_in_the_ctc: true,
  payment_method: "",
  paid_date: "",
};
interface PayrunData {
  month: string; // Replace 'string' with the actual type of 'month'
  status: string; // Replace 'string' with the actual type of 'status'
  net_pay: number;
  no_of_emp: number; // Replace 'string' with the actual type of 'net_pay'
  date: string;
  emp_salary: [];
}
interface PopupData {
  name?: string;
  net_pay?: number;
  status?: string;
  num_of_days?: number;
  earnings?: { earnings_name: any; monthly_amount: number }[];
  // Add other properties as needed
}
function Payrun() {
  const [openPopup, setOpenPopup] = useState(false);
  const [recordpaymentpopup, setRecordpaymentpopup] = useState(false);
  const [employeeSalary, SetEmployeeSalary] = useState([]);
  const [allData, SetAllData] = useState<PayrunData | null>(null);
  const [popupData, setPupupData] = useState<PopupData>({});
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: (values, action) => {
        console.log("values", values);
        action.resetForm();
      },
    });
  const location = useLocation();
  useEffect(() => {
    const searchData = new URLSearchParams(location.search).get("data");

    if (searchData) {
      try {
        const dataObject = JSON.parse(decodeURIComponent(searchData));
        SetAllData(dataObject);
        console.log(dataObject, "hhhhhhhhhhhhhhh");
        SetEmployeeSalary(dataObject?.emp_salary);
        console.log(dataObject);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://10.0.20.133:8000/mg_earning_type/by_name?organization_name=Mindcom&location_name=Banglore",
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       if (response.status === 200) {
  //         console.log(response.data, "all earning data");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  //   const handleOpenPopup = () => setOpenPopup(true);

  function payslippopup(indexno: number) {
    setOpenPopup(true);
    setPupupData(employeeSalary[indexno]);
  }
  async function editStatus(status: string) {
    const statusValues = {
      status: status,
      month: allData?.month,
      payment_mood: values.payment_method,
      payment_date: values.paid_date,
    };

    try {
      const response = await axios.post(
        "http://10.0.20.133:8000/salarydetails/generatepayreport/changestate",
        statusValues,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Created Employee Basic Successfully");
        handleClose();
        navigate(`/payrole/payrun`);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }

  const dataTableData = {
    columns: [
      { Header: "EMPLOYEE NAME", accessor: "e_name" },
      // { Header: "PAID DAYS", accessor: "paid_days" },
      { Header: "NET PAY", accessor: "net_pay" },
      { Header: "PAYSLIP", accessor: "payslip" },
      // { Header: "TDS SHEET", accessor: "tds_sheet" },
      { Header: "PAYMENT MODE", accessor: "payment_mood" },
      { Header: "PAYMENT STATUS", accessor: "payment_status" },
      // { Header: "ACTION", accessor: "action" },
    ],
    rows: employeeSalary?.map((data, index) => ({
      e_name: data.name,
      // paid_days: "24",
      net_pay: data.net_pay,
      payslip: <MDButton onClick={() => payslippopup(index)}>View</MDButton>,
      // tds_sheet: "View",
      payment_status: allData.status,
      // action: <EditIcon />,
    })),
  };
  const handleClose = () => {
    setRecordpaymentpopup(false);
  };
  const handleClickOpen = () => {
    setRecordpaymentpopup(true);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Dialog open={recordpaymentpopup} onClose={handleClose}>
        <Card sx={{ width: "100%", margin: "auto", mt: "2%" }}>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={12} p={2}>
              <Autocomplete
                onChange={(_event, value) => {
                  handleChange({ target: { name: "payment_method", value } });
                }}
                options={["Check", "Bank Transfer", "Inhand"]}
                // onChange={(e: any) => setearning_type_name(e.target.value)}
                renderInput={(params) => (
                  <MDInput
                    required
                    name="earning_type_name"
                    onChange={handleChange}
                    value={values.payment_method}
                    label="Earning Type "
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormField
                label="Paid Date"
                name="paid_date"
                value={values.paid_date}
                placeholder="Enter Earning Display Name"
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} display="flex" justifyContent="flex-end">
              <MDButton
                color="info"
                onClick={() => editStatus(allData?.status === "READY" ? "PAID" : null)}
                // onClick={handleClickOpen}
              >
                {allData?.status === "READY" ? "RECORD" : null}
              </MDButton>
            </Grid>
          </Grid>
        </Card>
      </Dialog>
      <Dialog open={openPopup}>
        <Card sx={{ width: "100%", margin: "auto", mt: "2%" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={9}>
              <MDTypography variant="h6" pl={2}>
                PAYSLIP
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
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
                <MDTypography variant="h6">{popupData?.name}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDTypography variant="button">Net Pay</MDTypography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="body2">Emp. ID: 80deb</MDTypography>
              </Grid>
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDTypography variant="h6">{popupData?.net_pay}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h6" color="success" bgcolor="success">
                  {popupData?.status}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="body2">Payable Days</MDTypography>
              </Grid>
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDTypography variant="body2">{popupData.num_of_days}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="button" fontWeight="bold" color="success">
                  EARNINGS
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDTypography variant="button" fontWeight="bold">
                  AMOUNT{" "}
                </MDTypography>
              </Grid>
              {/* employeeSalary?.map((data, index) => ({
      e_name: data.name,
      // paid_days: "24",
      net_pay: data.net_pay,
      payslip: <MDButton onClick={() => payslippopup(index)}>View</MDButton>,
      tds_sheet: "View",
      payment_status: allData.status,
      action: <EditIcon />,
    })), */}
              {popupData.earnings?.map((earningData: any, index: number) => (
                <React.Fragment key={index}>
                  <Grid item xs={12} sm={9}>
                    <MDTypography variant="button">{earningData.earnings_name}</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                    <MDTypography variant="button">{earningData.monthly_amount}</MDTypography>
                  </Grid>
                </React.Fragment>
              ))}
              <Grid item xs={12} sm={9}>
                <MDTypography variant="button" color="warning" fontWeight="bold">
                  DEDUCTIONS
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDTypography variant="button" fontWeight="bold">
                  AMOUNT
                </MDTypography>
              </Grid>
              {popupData.earnings?.map((earningData: any, index: number) => (
                <React.Fragment key={index}>
                  <Grid item xs={12} sm={9}>
                    <MDTypography variant="button">{earningData.earnings_name}</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                    <MDTypography variant="button">{earningData.monthly_amount}</MDTypography>
                  </Grid>
                </React.Fragment>
              ))}
              {/* <Grid item xs={12} sm={12}>
                <MDTypography variant="button">TAXES</MDTypography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="button">Income Tax</MDTypography>
              </Grid>
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDTypography variant="button">₹0.00</MDTypography>
              </Grid> */}
              <Grid item xs={12} sm={9}>
                <MDTypography variant="subtitle2" fontWeight="bold">
                  NET PAY
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDTypography variant="subtitle2" fontWeight="bold">
                  ₹41,667.00
                </MDTypography>
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
        <Card sx={{ width: "100%", margin: "auto", mt: "2%" }}>
          <MDBox p={3}>
            <Grid container>
              <Grid item xs={12} sm={8}>
                <MDTypography variant="h4">Process Pay Run for {allData?.month}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={4} display="flex" justifyContent="flex-end">
                <MDButton
                  color="info"
                  // onClick={() => editStatus(allData?.status === "READY" ? "PAID" : "PAID")}
                  onClick={handleClickOpen}
                >
                  {allData?.status === "READY" ? "RECORD" : null}
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox px={3}>
            {/* <Grid container spacing={3} p={2}>
              <Grid item xs={12} sm={5}>
                <Card>
                  <MDBox p={3}>
                    <MDTypography variant="h5" mb={1}>
                      Period: October 2023 | 31 Base Days
                    </MDTypography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={5}>
                        <MDTypography variant="h6">₹2,21,061.00</MDTypography>
                        <MDTypography variant="button">Payroll Cost</MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <MDTypography variant="h6">₹2,21,061.00</MDTypography>
                        <MDTypography variant="button">Payroll Cost</MDTypography>
                      </Grid>
                    </Grid>
                  </MDBox>
                </Card>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Card>
                  <MDBox p={3}>
                    <MDTypography variant="h6">Pay Day</MDTypography>
                    <MDTypography variant="h4">30</MDTypography>
                    <MDTypography variant="button">Oct, 2023</MDTypography>
                  </MDBox>
                </Card>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Card>
                  <MDBox p={3}>
                    <MDTypography variant="h6">Taxes & Deductions</MDTypography>
                    <Grid container>
                      <Grid item xs={12} sm={6}>
                        <MDTypography variant="button">Taxes</MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MDTypography variant="h6">₹2,21,061.00</MDTypography>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <MDTypography variant="button">Pre-Tax Deductions</MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MDTypography variant="h6">0</MDTypography>
                      </Grid>
                    </Grid>
                  </MDBox>
                </Card>
              </Grid>
            </Grid> */}
            <DataTable
              table={dataTableData}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
            />
          </MDBox>
        </Card>
      </form>
    </DashboardLayout>
  );
}

export default Payrun;
