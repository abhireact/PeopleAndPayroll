import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import Autocomplete from "@mui/material/Autocomplete";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { TreeSelect, message } from "antd";

import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import { useState, useEffect } from "react";

import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function transformString(inputString: string): string {
  // Split the input string into an array of substrings
  const substrings = inputString.split("/");

  // Reverse the array of substrings
  const reversedArray = substrings.reverse();

  // Join the reversed array into a string using '-' as the separator
  const resultString = reversedArray.join("-");

  return resultString;
}

const Addholiday = (props: any) => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };
  /// applicabe_for code
  const { SHOW_PARENT } = TreeSelect;

  const [value, setValue] = useState([""]);
  const [treeData, setTreeData] = useState([]);

  const onChange = (newValue: string[]) => {
    setValue(newValue);
  };
  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
  };
  ////

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      description: "",
      start_date: "",
      end_date: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values, action) => {
      const sendData = {
        name: values.name,
        from_date: transformString(values.start_date),
        to_date: transformString(values.end_date),
        description: values.description,
      };
      const response = await axios.post("http://10.0.20.133:8000/holiday", sendData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        message.success("Created Leave Succesfully");
        window.location.reload();
      }
      action.resetForm();
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <MDBox p={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MDInput
              variant="standard"
              name="name"
              label="Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              mb={10}
              mt={10}
            />
          </Grid>
          <Grid item xs={3}>
            <MDTypography variant="body2">From Date:</MDTypography>
          </Grid>
          <Grid item xs={6}>
            <MDInput
              type="date"
              variant="standard"
              name="start_date"
              value={values.start_date}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.start_date && Boolean(errors.start_date)}
              helperText={touched.start_date && errors.start_date}
              mb={10}
            />
          </Grid>
          <Grid item xs={3.01}>
            <MDTypography variant="body2">To Date: </MDTypography>
          </Grid>
          <Grid item xs={6}>
            <MDInput
              type="date"
              variant="standard"
              name="end_date"
              value={values.end_date}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.end_date && Boolean(errors.end_date)}
              helperText={touched.end_date && errors.end_date}
              mb={10}
            />
          </Grid>
          {/* <Grid item xs={6}>
              <MDTypography variant="body1">Applicable For</MDTypography>
            </Grid>
            <Grid item xs={6}>
              <TreeSelect {...tProps} />
            </Grid> */}
          <Grid item xs={12}>
            <MDInput
              variant="standard"
              name="description"
              label="Description..."
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
              mb={10}
              mt={10}
              multiline
              rows={5}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <MDButton
                  color="info"
                  variant="contained"
                  type="submit"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Save
                </MDButton>
              </Grid>
              <Grid item ml={2}>
                <MDButton
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancel
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </form>
  );
};

export default Addholiday;
