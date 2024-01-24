import MDInput from "components/MDInput";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "components/MDButton";
import axios from "axios";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { message } from "antd";

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

const validationSchema = yup.object({
  name: yup.string().required("Please enter your work location"),

  address_line1: yup.string().required("Password is required"),
  address_line2: yup.string(),
  pincode: yup
    .number()
    .typeError("That doesn't look like a pincode ")
    .positive("can't start with a minus")
    .integer("can't include a decimal point")
    .min(6)
    .required("Please enter pincode "),
  state: yup.string(),
  city: yup.string().required("Please enter your city"),
});

const Updatework = (props: any) => {
  const { openUpdate, setOpenupdate, task } = props;

  console.log(task, "task");
  const token = Cookies.get("token");

  console.log("token", token);

  const handleCloseupdate = () => {
    setOpenupdate(false);
  };

  const formik = useFormik({
    initialValues: {
      name: task.location_name,
      address_line1: task.add_line1,
      address_line2: task.add_line2,
      state: task.state,
      pincode: task.pincode,
      city: task.city,
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      //   console.log(values, "values");

      axios
        .put(
          "http://10.0.20.133:8000/worklocation",
          {
            old_location_name: task.location_name,
            new_location_name: values.name,

            add_line1: values.address_line1,
            add_line2: values.address_line2,
            pincode: values.pincode,
            state: values.state,
            city: values.city,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("it is working ", response);
          // {
          //   response.status == 200
          //     ? window.location.reload()
          //       ? message.success("Work Location Deleted Successfully")
          //       : ""
          //     : message.error("Something went wrong");
          // }
          if (response.status == 200) {
            // window.location.reload();
            message.success("Work Location Updated Successfully");
            window.location.reload();
          } else {
            message.error("Something went wrong");
          }
          // window.location.reload();
        })

        .catch((error) => {
          console.log("error is occurred", error);
          message.error("Something went wrong");
        });
      console.log(values);

      action.resetForm();
    },
  });

  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <MDBox p={4}>
          <Grid container spacing={2}>
            <Grid sm={12} mb={2}>
              <MDInput
                sx={{ width: "80%" }}
                // id="email"
                variant="standard"
                name="name"
                label="Work Location"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                mb={10}
                mt={10}
              />
            </Grid>

            <Grid sm={12} mb={2}>
              <MDInput
                sx={{ width: "80%" }}
                variant="standard"
                name="address_line1"
                label="Address Line 1"
                value={formik.values.address_line1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address_line1 && Boolean(formik.errors.address_line1)}
                helperText={formik.touched.address_line1 && formik.errors.address_line1}
                mb={10}
              />
            </Grid>
            <Grid sm={12} mb={2}>
              <MDInput
                sx={{ width: "80%" }}
                variant="standard"
                name="address_line2"
                label="Address Line 2"
                value={formik.values.address_line2}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address_line2 && Boolean(formik.errors.address_line2)}
                helperText={formik.touched.address_line2 && formik.errors.address_line2}
                mb={10}
              />
            </Grid>
            <Grid sm={4}>
              <Autocomplete
                sx={{ width: "80%" }}
                onChange={(event, value) => {
                  formik.handleChange({
                    target: { name: "state", value },
                  });
                }}
                options={states}
                renderInput={(params) => (
                  <FormField
                    label="States"
                    InputLabelProps={{ shrink: true }}
                    name="state"
                    onChange={formik.handleChange}
                    value={formik.values.state}
                    {...params}
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid sm={4} mb={2}>
              <MDInput
                sx={{ width: "80%" }}
                autoComplete="off"
                variant="standard"
                name="pincode"
                label="Pincode"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                helperText={formik.touched.pincode && formik.errors.pincode}
              />
            </Grid>
            <Grid sm={4} mb={2}>
              <MDInput
                sx={{ width: "80%" }}
                autoComplete="off"
                variant="standard"
                name="city"
                label="City"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>

            <Grid>
              <Button
                variant="contained"
                color="info"
                type="submit"
                onClick={() => {
                  handleCloseupdate();
                }}
              >
                Save
              </Button>
            </Grid>
            <Grid ml={2}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  handleCloseupdate();
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </MDBox>
      </form>
    </Card>
  );
};

export default Updatework;
