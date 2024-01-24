import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import React, { useState } from "react";
// import value from "../valueset/value";
import Cookies from "js-cookie";
import { leaveSchema } from "./schema";
import { useFormik } from "formik";
import { TreeSelect } from "antd";
import MDButton from "components/MDButton";
import axios from "axios";
const initialValues = {
  date: "",
  applicable: [] as string[],
  name: "",
  description: "",
};
const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: "All Location",
    value: "All_location",
    key: "All_location",
    children: [
      {
        title: "Mumbai",
        value: "location-0",
        key: "location-0",
      },
      {
        title: "Delhi",
        value: "location-1",
        key: "location-1",
      },
      // {
      //   title: "Director",
      //   value: "Roles-2",
      //   key: "Roles-2",
      // },
      // {
      //   title: "Admin",
      //   value: "Roles-3",
      //   key: "Roles-0=3",
      // },
      // {
      //   title: "Manager",
      //   value: "Roles-4",
      //   key: "Roles-4",
      // },
    ],
  },
  {
    title: "AllShift",
    value: "All_shift",
    key: "All_shift",
    children: [
      {
        title: "10am -6pm",
        value: "shift-0",
        key: "shift-0",
      },
      {
        title: "9pm-5am",
        value: "shift-1",
        key: "shift-1",
      },
    ],
  },
  // {
  //   title: "All Designations",
  //   value: "All_Designations",
  //   key: "All_Designations",
  //   children: [
  //     {
  //       title: "Designations1",
  //       value: "Designations-0",
  //       key: "Designations-0",
  //     },
  //     {
  //       title: "Designations2",
  //       value: "Designations-1",
  //       key: "Designations-1",
  //     },
  //     {
  //       title: "Designations3",
  //       value: "Designations-2",
  //       key: "Designations-2",
  //     },
  //   ],
  // },
  // {
  //   title: "All Locations",
  //   value: "All_Locations",
  //   key: "All_Locations",
  //   children: [
  //     {
  //       title: "Locations1",
  //       value: "Locations-0",
  //       key: "Locations-0",
  //     },
  //     {
  //       title: "Locations2",
  //       value: "Locations-1",
  //       key: "Locations-1",
  //     },
  //     {
  //       title: "Locations3",
  //       value: "Locations-2",
  //       key: "Locations-2",
  //     },
  //   ],
  // },
  // {
  //   title: "All Groups",
  //   value: "All_Groups",
  //   key: "All_Groups",
  //   children: [
  //     {
  //       title: "Groups1",
  //       value: "Groups-0",
  //       key: "Groups-0",
  //     },
  //     {
  //       title: "Groups2",
  //       value: "Groups-1",
  //       key: "Groups-1",
  //     },
  //     {
  //       title: "Groups3",
  //       value: "Groups-2",
  //       key: "Groups-2",
  //     },
  //   ],
  // },
  // {
  //   title: "All Users",
  //   value: "All_Users",
  //   key: "All_Users",
  //   children: [
  //     {
  //       title: "Users1",
  //       value: "Users-0",
  //       key: "Users-0",
  //     },
  //     {
  //       title: "Users2",
  //       value: "Users-1",
  //       key: "Users-1",
  //     },
  //     {
  //       title: "Users3",
  //       value: "Users-2",
  //       key: "Users-2",
  //     },
  //   ],
  // },
];
const WorkingDay = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: leaveSchema,
    enableReinitialize: true,
    onSubmit: (values: any, action: { resetForm: () => void }) => {
      console.log(" ~ file: Registration.jsx ~ line 11 ~ Registration ~ values", values);
      action.resetForm();
    },
  });
  const token = Cookies.get("token");

  console.log("token", token);
  const [value, setValue] = useState(["All_location"]);
  console.log(value, "value");

  const onChange = (newValue: string[]) => {
    console.log("onChange ", value);
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
  const handleFormSubmit = async () => {
    event.preventDefault();

    try {
      const formValues = {
        ...values,
        applicable_for: value,
      };
      ("");
      console.log(formValues, "formdata");
      const response = await axios.post("http://10.0.20.133:8001/exceptionalworkday", formValues, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      if (response.status === 200) {
        console.log("Created SchoolPage Successfully");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  return (
    <form>
      <MDBox p={5}>
        <Grid container spacing={3}>
          <Grid sm={2.5}>
            <MDTypography variant="h6" fontWeight={700}>
              Name
            </MDTypography>
          </Grid>
          <Grid sm={3.5}>
            <MDInput
              type="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              sx={{ width: "70%" }}
            />
          </Grid>
          <Grid sm={2.5}>
            <MDTypography variant="h6" fontWeight={700}>
              Date
            </MDTypography>
          </Grid>
          <Grid sm={3.5}>
            <MDInput
              type="date"
              name="date"
              value={values.date}
              onChange={handleChange}
              sx={{ width: "70%" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} pt={5}>
          <Grid sm={2.5}>
            <MDTypography variant="h6" fontWeight={700}>
              Applicable For
            </MDTypography>
          </Grid>
          <Grid sm={3.5}>
            {/* <MDInput /> */}
            <TreeSelect {...tProps} />
          </Grid>
          <Grid sm={2.5}>
            <MDTypography variant="h6" fontWeight={700}>
              Description
            </MDTypography>
          </Grid>
          <Grid sm={3.5}>
            <MDInput
              multiline
              rows={3}
              name="description"
              value={values.description}
              onChange={handleChange}
              sx={{ width: "70%" }}
            />
          </Grid>
        </Grid>
        <MDButton type="submit" onClick={handleFormSubmit}>
          Submit
        </MDButton>
      </MDBox>
    </form>
  );
};

export default WorkingDay;
