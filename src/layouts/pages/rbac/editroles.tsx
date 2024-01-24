// import FormControl from "@mui/material/FormControl";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Radio from "@mui/material/Radio";

import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";

import axios from "axios";
import Cookies from "js-cookie";
// import { useEffect, useState } from "react";
// import Autocomplete from "@mui/material/Autocomplete";

const Editrole = (props: any) => {
  const { setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };
  const { setOpenupdate, editData } = props;
  const token = Cookies.get("token");
  console.log(editData, "edit date ");

  // // autcomplete location  start
  // const [locations, setLocations] = useState([]);

  // const [location, setLocation] = useState({
  //   location_name: editData.location_name,
  // });
  // useEffect(() => {
  //   const Fetchlocations = async () => {
  //     try {
  //       const response = await axios.get("http://10.0.20.133:8000/worklocation", {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvX2lkIjoxLCJlbWFpbCI6IjIwMDNvbTE3MTFAZ21haWwuY29tIiwiZXhwIjoxNzAxODUyNzAxfQ.DV4RbO4sbm3XQ8loXJX7LLUUUxBLOWxS4J1mIaZBsPs`,
  //         },
  //       });
  //       console.log(response.data);
  //       setLocations(response.data);
  //     } catch (error) {
  //       console.error("error fetching tasks:", error);
  //     }
  //   };
  //   Fetchlocations();
  // }, []);
  // //end
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };
  // editData to give intial values
  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      role_name: editData.role_display_name,
      // role_short_code: editData.role_short_code,
      // role_access: editData.seeded,
      // status: editData.status,
      // description: editData.description,
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      const sendData = {
        old_role_display_name: editData.role_display_name,
        role_display_name: values.role_name,
        location_name: editData.location_name,
      };
      const a = {
        location_name: "string",
        old_location_name: "string",
        old_role_display_name: "string",
        role_display_name: "string",
        role_short_code: "string",
        description: "string",
        status: "string",
        seeded: "string",
      };
      axios
        .put("http://10.0.20.133:8000/mg_roles", sendData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success("Role created successfully!");
        })
        .catch(() => {
          message.error("Error on creating role !");
        });

      action.resetForm();
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <MDBox p={4}>
        <Grid container>
          <Grid item sm={5}>
            <MDTypography mb={2} variant="body1">
              Role Display Name
            </MDTypography>
          </Grid>
          <Grid item sm={7}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="role_name"
              value={values.role_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          {/* <Grid item sm={5}>
            <MDTypography mb={2} variant="body2">
              Role Short Code
            </MDTypography>
          </Grid>
          <Grid item sm={7}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="role_short_code"
              value={values.role_short_code}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid container>
            <Grid sm={5}>
              <MDTypography mb={2} variant="body2">
                Role Access
              </MDTypography>
            </Grid>
            <Grid sm={4}>
              <FormControl>
                <RadioGroup>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={values.role_access.includes("Y")}
                        onChange={handleChange}
                        name="role_access"
                        value="Y"
                      />
                    }
                    label={<MDTypography variant="body2">Yes</MDTypography>}
                  />

                  <FormControlLabel
                    control={
                      <Radio
                        checked={values.role_access.includes("N")}
                        onChange={handleChange}
                        name="role_access"
                        value="N"
                      />
                    }
                    label={<MDTypography variant="body2">No</MDTypography>}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container>
            <Grid sm={5}>
              <MDTypography mb={2} variant="body2">
                Status
              </MDTypography>
            </Grid>
            <Grid sm={4}>
              <FormControl>
                <RadioGroup>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={values.status.includes("active")}
                        onChange={handleChange}
                        name="status"
                        value="active"
                      />
                    }
                    label={<MDTypography variant="body2">Active </MDTypography>}
                  />

                  <FormControlLabel
                    control={
                      <Radio
                        checked={values.status.includes("inactive")}
                        onChange={handleChange}
                        name="status"
                        value="inactive"
                      />
                    }
                    label={<MDTypography variant="body2">Inactive </MDTypography>}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          <Grid sm={5}>
            <MDTypography mb={2} variant="body2">
              Description
            </MDTypography>
          </Grid>

          <Grid sm={7} mb={2}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item sm={5}>
            <MDTypography variant="body2">Location (optional)</MDTypography>
          </Grid>
          <Grid item sm={7} mb={2}>
            <Autocomplete
              sx={{ width: "65%" }}
              options={locations}
              getOptionLabel={(object) => object.location_name}
              renderInput={(params) => <MDInput {...params} label="choose location" />}
              value={location}
              onChange={(_event, newobject) => {
                setLocation(newobject);

                console.log(newobject, "new object1");
              }}
            />
          </Grid> */}

          <Grid container sm={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Grid mt={4}>
              <MDButton
                color="info"
                variant="contained"
                type="submit"
                onClick={() => {
                  handleCloseupdate();
                }}
              >
                Update
              </MDButton>
            </Grid>
            <Grid ml={2} mt={4}>
              <MDButton
                color="primary"
                variant="outlined"
                onClick={() => {
                  handleCloseupdate();
                }}
              >
                Cancel
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </form>
  );
};

export default Editrole;
