import {
  Button,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Tooltip,
  Icon,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState, useEffect } from "react";
import react from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import TungstenOutlinedIcon from "@mui/icons-material/TungstenOutlined";
import { Autocomplete, Card, Checkbox, Divider, Grid } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import esi from "layouts/payrole/salarycomponent/esi/esi.jpg";
import axios from "axios";
import CreateEsi from "layouts/payrole/salarycomponent/esi/esi";
import Cookies from "js-cookie";
export const signUpSchema = yup.object({
  epf: yup.string().min(2).max(25).required("epf address is required."),
  Deduction_Cycle: yup.string().min(2).max(15).required("Monthly address is required."),
});

const initialValues = {
  epf: "",
  Deduction_Cycle: "Monthly",
  employee_contribution: "",
  Contribution: [] as string[],
  emplevel: [] as string[],
  pfWage: [] as string[],
  lossPay: [] as string[],
  abrySchema: [] as string[],
  wage: [] as string[],
  computed: [] as string[],
};
const token = Cookies.get("token");
const Esi = () => {
  interface EsiData {
    esi_number: string;
    esi_deduction_cycle: string;
    employees_contribution: string;
    employers_contribution: string;
    esi_contribution_ctc: boolean;
    organization_name: string;
    location_name: string;
  }
  const [getdata, setGetdata] = useState<EsiData>({
    esi_number: "",
    esi_deduction_cycle: "",
    employees_contribution: "",
    employers_contribution: "",
    esi_contribution_ctc: false,
    organization_name: "",
    location_name: "",
  });
  const [created, setCreated] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://10.0.20.133:8000/mg_esi", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log(response.data, "all earning data");
          setGetdata(response.data[0]);
          setCreated(true);
        }
      } catch (error) {
        // console.error(error);
        console.log("location not found");
      }
    };
    fetchData();
  }, []);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      console.log("🚀 ~ file: Employees_Provident_Fund.tsx:23 ~ values:", values);
      action.resetForm();
    },
  });
  const handleDelete = async (data: any) => {
    try {
      const response = await axios.delete(`http://10.0.20.133:8000/mg_esi/?esi_number=${data}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("Delete Successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const [editopen, setEditOpen] = useState(false);
  //   console.log(getdata[0]?.esi_deduction_cycle, "assssssss");
  return (
    <>
      {editopen ? (
        <CreateEsi data={getdata} />
      ) : (
        <DashboardLayout>
          <DashboardNavbar />
          {created ? (
            <Card sx={{ width: "80%", margin: "auto", mt: "2%" }}>
              <MDBox p={3}>
                <Grid container px={2}>
                  <Grid item xs={12} sm={12} display="flex">
                    <Grid>
                      <MDTypography variant="h5" fontWeight="bold" color="dark">
                        Employees&apos; State Insurance{" "}
                      </MDTypography>
                    </Grid>
                    <Grid px={1}>
                      <Tooltip title="Edit" placement="top">
                        <MDButton
                          variant="outlined"
                          color="secondary"
                          type="submit"
                          fontSize="small"
                          onClick={() => setEditOpen(true)}
                        >
                          <Icon>edit</Icon>
                        </MDButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  {/* <Grid item xs={12} sm={4} display="flex" justifyContent="flex-end"></Grid> */}
                </Grid>
                <Grid container px={2} pt={3}>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="button" color="text" fontWeight="bold">
                      ESI Number
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="button" fontWeight="medium">
                      {getdata?.esi_number}
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container px={2}>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="button" color="text" fontWeight="bold">
                      Deduction Cycle
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="button" fontWeight="medium">
                      {getdata.esi_deduction_cycle}
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container px={2}>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="button" color="text" fontWeight="bold">
                      Employees&apos; Contribution
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="button" fontWeight="medium">
                      {getdata?.employees_contribution}
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container px={2}>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="button" color="text" fontWeight="bold">
                      Employer&apos;s Contribution
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="button" fontWeight="medium">
                      {getdata?.employers_contribution}
                    </MDTypography>
                  </Grid>
                </Grid>
                {getdata.esi_contribution_ctc ? (
                  <Grid container px={2}>
                    <Grid item xs={12} sm={6}>
                      <MDTypography variant="button" color="text" fontWeight="bold">
                        Other Details
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MDTypography variant="button" fontWeight="medium">
                        Employer&apos;s contribution is included in the CTC.
                      </MDTypography>
                    </Grid>
                  </Grid>
                ) : null}

                <Grid xs={12} sm={12} px={2} pt={1} display="flex" justifyContent="flex-end">
                  <MDButton
                    variant="outlined"
                    color="error"
                    type="submit"
                    onClick={() => handleDelete(getdata.esi_number)}
                  >
                    <DeleteForeverIcon />
                    Disable ESI
                  </MDButton>
                </Grid>
              </MDBox>
            </Card>
          ) : (
            <Card sx={{ width: "90%", margin: "auto", mt: "2%" }}>
              <Grid container>
                <Grid item xs={12} sm={6} p={2}>
                  <MDBox
                    component="img"
                    src={esi}
                    alt="esi"
                    width={{ xs: "100%", xl: "100%" }}
                    opacity={0.9}
                    mb={3}
                  />
                </Grid>
                <Grid item xs={12} sm={6} p={3} display="flex" alignItems="center">
                  <Grid>
                    <MDTypography variant="h4" fontWeight="bold" m={"auto"}>
                      Are you registered for ESI?
                    </MDTypography>
                    <MDTypography variant="button" fontWeight="medium" color="text" m={"auto"}>
                      Organisations having 10 or more employees must register for Employee State
                      Insurance (ESI). This scheme provides cash allowances and medical benefits for
                      employees whose monthly salary is less than ₹21,000.
                    </MDTypography>
                    <Grid display="flex" justifyContent="flex-end">
                      <Link href="createesi" variant="body2">
                        <MDButton variant="gradient" color="info" type="submit">
                          {"Enable ESI"}
                        </MDButton>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          )}
        </DashboardLayout>
      )}
    </>
  );
};

export default Esi;
