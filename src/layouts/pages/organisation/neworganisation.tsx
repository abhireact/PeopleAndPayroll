import MDInput from "components/MDInput";
import { useFormik } from "formik";
import * as yup from "yup";
import MDButton from "components/MDButton";
import MDDropzone from "components/MDDropzone";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { useState } from "react";
import validationSchema from "./schema";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MDDatePicker from "components/MDDatePicker";
import TextField from "@mui/material/TextField";
import ConstructionIcon from "@mui/icons-material/Construction";

import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import MDTypography from "components/MDTypography";
import Stack from "@mui/material/Stack";
// import { I18nextProvider, useTranslation } from "react-i18next";
import Extrawork from "./extrawork";
import Cookies from "js-cookie";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Delhi (National Capital Territory of Delhi)",
  "Puducherry",
  "Ladakh",
  "Lakshadweep",
];

const fieldselector = [",", "-", "/"];

const location = ["India", "USA"];
const industries = [
  "Web Development",
  "Web Designing",
  "Agriculture",
  "Writers",
  "Telecommunications",
  "Others",
];
const initialValues = {
  org_name: "",
  location: "",
  industry: "",
  add_line1: "",
  add_line2: "",
  pincode: "",
  state: "",
  city: "",
  fieldselector: "-",
};
const Orgprofile = () => {
  const navigate = useNavigate();
  // const { t } = useTranslation("translation");
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values: any, action: { resetForm: () => void }) => {
      console.log(" ~ file: Registration.jsx ~ line 11 ~ Registration ~ values", values);
      action.resetForm();
    },
  });
  const token = Cookies.get("token");
  console.log(token, "token");

  const handleFormSubmit = async () => {
    try {
      console.log(values, "formdata");

      const response = await axios.post("http://10.0.20.133:8000/organization", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      if (response.status === 200) {
        console.log(" Created Employee Successfully");
        message.success(" Created Organisation Successfully");
        // setIsSubmit(true);
        navigate("/dashboards");
        // setDataSubmitted(true);
        // console.log(dataSubmitted, isSubmit, "hj wdjkdx");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  const [openupdate, setOpenupdate] = useState(false);
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };
  const handleClickOpen = () => {
    setOpenupdate(true);
  };

  const [date, setDate] = useState("");

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <form onSubmit={handleSubmit}>
          <MDBox p={4}>
            <Grid container spacing={3} pb={5}>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="h5">{" Create Organisation"}</MDTypography>
              </Grid>
              {/* <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDButton variant="gradient" color="info" type="submit">
                  + New Designations
                </MDButton>
              </Grid> */}
            </Grid>
            <Grid container spacing={2}>
              <Grid sm={2}>
                <MDDropzone options={{ addRemoveLinks: true }} />
              </Grid>
              <Grid sm={8}>
                <Stack>
                  <MDTypography variant="p" className="dropone">
                    {/* {t"Org"} */}
                  </MDTypography>
                </Stack>
                <Stack mt={5} p={2}>
                  <MDTypography variant="body2" className="droptwo">
                    Preferred Image Size: 240 x 240 pixels @ 72 DPI, Maximum size of 1MB.{" "}
                  </MDTypography>
                </Stack>
              </Grid>

              <Grid sm={12} mb={2}>
                <MDInput
                  sx={{ width: 700 }}
                  autoComplete="off"
                  variant="standard"
                  name="org_name"
                  label="Organisation Name"
                  value={values.org_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.org_name && Boolean(errors.org_name)}
                  helperText={touched.org_name && errors.org_name}
                />
              </Grid>
              <Grid sm={6}>
                <MDInput
                  autoComplete="off"
                  variant="standard"
                  name="location"
                  label="Location Name"
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.location && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                />
              </Grid>
              <Grid sm={6}>
                <Autocomplete
                  sx={{ width: "60%" }}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "industry", value },
                    });
                  }}
                  options={industries}
                  renderInput={(params) => (
                    <FormField
                      label="Industry"
                      InputLabelProps={{ shrink: true }}
                      name="industry"
                      onChange={handleChange}
                      value={values.industry}
                      {...params}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>

              <Grid sm={12} mb={2}>
                <MDInput
                  sx={{ width: 700 }}
                  autoComplete="off"
                  variant="standard"
                  name="add_line1"
                  label="Address Line 1"
                  value={values.add_line1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.add_line1 && Boolean(errors.add_line1)}
                  helperText={touched.add_line1 && errors.add_line1}
                />
              </Grid>
              <Grid sm={12} mb={2}>
                <MDInput
                  sx={{ width: 700 }}
                  autoComplete="off"
                  variant="standard"
                  name="add_line2"
                  label="Address Line 2"
                  value={values.add_line2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.add_line2 && Boolean(errors.add_line2)}
                  helperText={touched.add_line2 && errors.add_line2}
                />
              </Grid>
              <Grid sm={4}>
                <Autocomplete
                  sx={{ width: "80%" }}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "state", value },
                    });
                  }}
                  options={states}
                  renderInput={(params) => (
                    <FormField
                      label="States"
                      InputLabelProps={{ shrink: true }}
                      name="state"
                      onChange={handleChange}
                      value={values.state}
                      {...params}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid sm={4} mb={2}>
                <MDInput
                  sx={{ width: 250 }}
                  autoComplete="off"
                  variant="standard"
                  name="pincode"
                  label="Pincode"
                  value={values.pincode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.pincode && Boolean(errors.pincode)}
                  helperText={touched.pincode && errors.pincode}
                />
              </Grid>
              <Grid sm={4} mb={2}>
                <MDInput
                  sx={{ width: 250 }}
                  autoComplete="off"
                  variant="standard"
                  name="city"
                  label="City"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.city && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                />
              </Grid>
              <Grid sm={12}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActions>
                    <MDButton
                      variant="text"
                      color="info"
                      onClick={handleClickOpen}
                      startIcon={<ConstructionIcon />}
                      size="large"
                    >
                      Change
                    </MDButton>
                  </CardActions>
                  <CardContent></CardContent>
                </Card>

                <Dialog open={openupdate} onClose={handleCloseupdate}>
                  <DialogTitle>Filing Address</DialogTitle>
                  <DialogContent>
                    <Extrawork openupdate={openupdate} setOpenupdate={setOpenupdate} />
                  </DialogContent>
                </Dialog>
              </Grid>

              <MDButton color="info" variant="contained" type="submit" onClick={handleFormSubmit}>
                Submit
              </MDButton>
            </Grid>
          </MDBox>
        </form>
      </Card>
    </DashboardLayout>
  );
};

export default Orgprofile;
