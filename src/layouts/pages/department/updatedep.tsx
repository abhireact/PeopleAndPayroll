import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React TS examples components

import Button from "components/MDButton";

import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";

import axios from "axios";

import MDInput from "components/MDInput";
import { useFormik } from "formik";
import * as yup from "yup";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Cookies from "js-cookie";
import { message } from "antd";

const validationSchema = yup.object({
  departmentname: yup.string().required("Please enter department name"),
  departmentcode: yup.string().required("Code is required"),

  description: yup.string().required("Password is required"),
});

const Updatedep = (props: any) => {
  const token = Cookies.get("token");

  console.log("token", token);

  const { openUpdate, setOpenupdate, task } = props;
  console.log(task, "task");
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };

  //department formik
  const formik = useFormik({
    initialValues: {
      departmentname: task.dept_name,
      departmentcode: task.dept_code,
      description: task.description,
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .put(
          "http://10.0.20.133:8000/department",
          {
            old_dept_name: task.dept_name,
            new_dept_name: formik.values.departmentname,
            old_dept_code: task.dept_code,
            dept_code: formik.values.departmentcode,
            // old_description: task.description,
            description: formik.values.description,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status == 200) {
            message.success("Department Created successfully");
            window.location.reload();
          }
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(values);
      action.resetForm();
      // window.location.reload();
    },
  });
  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <MDBox p={4}>
          <Grid container spacing={2}>
            <Grid sm={6}>
              <MDInput
                sx={{ width: "75%" }}
                // id="email"
                variant="standard"
                name="departmentname"
                label="Department Name"
                value={formik.values.departmentname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.departmentname && Boolean(formik.errors.departmentname)}
                helperText={formik.touched.departmentname && formik.errors.departmentname}
                mb={10}
                mt={10}
              />
            </Grid>
            <Grid sm={5}>
              <MDInput
                // id="email"
                sx={{ width: "75%" }}
                variant="standard"
                name="departmentcode"
                label="Department Code"
                value={formik.values.departmentcode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.departmentcode && Boolean(formik.errors.departmentcode)}
                helperText={formik.touched.departmentcode && formik.errors.departmentcode}
                mb={10}
                mt={10}
              />
            </Grid>

            <Grid sm={12}>
              <MDInput
                variant="standard"
                name="description"
                label="Description..."
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                mb={10}
                mt={10}
                sx={{ width: "80%" }}
                multiline
                rows={5}
              />
            </Grid>

            <Grid mt={3}>
              <Button
                color="info"
                variant="contained"
                type="submit"
                onClick={() => {
                  handleCloseupdate();
                }}
              >
                Save
              </Button>
            </Grid>
            <Grid ml={2} mt={3}>
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

export default Updatedep;
