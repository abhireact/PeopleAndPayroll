import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";

const Addrole = (props: any) => {
  // autcomplete location  start
  const [locations, setLocations] = useState([]);
  const token = Cookies.get("token");

  const [location, setLocation] = useState({
    add_line1: "",
    add_line2: "",
    city: "",
    location_name: "",
    pincode: 0,
    state: "",
  });
  useEffect(() => {
    const Fetchlocations = async () => {
      try {
        const response = await axios.get("http://10.0.20.133:8000/worklocation", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setLocations(response.data);
      } catch (error) {
        console.error("error fetching tasks:", error);
      }
    };
    Fetchlocations();
  }, []);
  const { setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };
  //end

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      role_name: "",
      role_short_code: "",
      role_access: "",
      status: "",
      description: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      const sendData = {
        role_display_name: values.role_name,
        role_short_code: values.role_short_code,
        seeded: values.role_access,
        status: values.status,
        description: values.description,
        location_name: location.location_name,
      };
      axios
        .post("http://10.0.20.133:8000/mg_roles/main_admin", sendData, {
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
            <MDTypography mb={2} variant="body2">
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
          <Grid item sm={5}>
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
                        checked={values.status === "active"}
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
                        checked={values.status === "inactive"}
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

                //
                // console.log(newobject1.location_name, "location name ");
                console.log(newobject, "new object1");
              }}
            />
          </Grid>

          <Grid container sm={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Grid mt={4}>
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
            <Grid ml={2} mt={4}>
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
      </MDBox>
    </form>
  );
};

export default Addrole;
