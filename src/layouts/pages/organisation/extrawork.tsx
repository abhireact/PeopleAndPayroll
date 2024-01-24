import { useState, useEffect } from "react";

import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MDButton from "components/MDButton";

import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import MDTypography from "components/MDTypography";
import Cookies from "js-cookie";

const Extrawork = (props: any) => {
  //for dialog box
  const token = Cookies.get("token");

  console.log("token", token);

  const { openUpdate, setOpenupdate } = props;
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };
  const [locations, setLocations] = useState([]);
  const [places, setPlaces] = useState({
    location_name: "Rock abhi",
    add_line1: "67999",
    add_line2: "oioi",
    state: "Andra Pradesh",
    city: "rajpur",
    pincode: 270611,
  });
  // default value for autocomplete

  const fetchLocations = async () => {
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
      console.error("Error fetching tasks:", error);
    }
  };

  console.log(places, "place");

  useEffect(() => {
    fetchLocations();
  }, []);
  return (
    <MDBox ml={5} mt={5}>
      <Grid container spacing={2}>
        <Grid sm={12}>
          <Autocomplete
            options={locations}
            getOptionLabel={(place) => place.location_name}
            renderInput={(params) => <TextField {...params} />}
            value={places}
            onChange={(event, newplaces) => {
              setPlaces(newplaces);
              console.log(newplaces);
            }}
          />
        </Grid>

        <Grid sm={12}>
          <MDBox mt={5} mb={2} ml={2}>
            <Stack style={{ fontSize: "15px" }}>
              <MDTypography variant="h6">{places?.location_name}</MDTypography>
              <MDTypography variant="p">{places?.add_line1}</MDTypography>
              <MDTypography variant="p">{places?.add_line2}</MDTypography>
              <MDTypography variant="span">
                <MDTypography variant="span"> {places?.city}</MDTypography>
                <MDTypography variant="span"> {places?.state}</MDTypography>
                <MDTypography variant="span"> {places?.pincode}</MDTypography>
              </MDTypography>
            </Stack>
          </MDBox>
        </Grid>
        <Grid mt={3}>
          <MDButton
            color="info"
            variant="contained"
            type="submit"
            onClick={() => {
              handleCloseupdate();
            }}
          >
            Save
          </MDButton>
        </Grid>
        <Grid ml={2} mt={3}>
          <MDButton
            color="primary"
            variant="contained"
            onClick={() => {
              handleCloseupdate();
            }}
          >
            Cancel
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
};
export default Extrawork;
