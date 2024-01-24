import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";
import { leaveSchema } from "./schema";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";
const initialValues = {
  manager_reason: "",
};
const Viewleave = (props: any) => {
  const token = Cookies.get("token");
  const [openReson, SetOpenReason] = useState(false);
  console.log("token", token);
  const { values, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: leaveSchema,
    enableReinitialize: true,
    onSubmit: (values: any, action: { resetForm: () => void }) => {
      console.log(values.gender, values.martial_status, "rtretrtrfr");
      console.log(" ~ file: Registration.jsx ~ line 11 ~ Registration ~ values", values);
      action.resetForm();
    },
  });
  const { openView, setOpenview, data } = props;
  console.log(data, "data");

  // const userprofileData = useSelector((state: any) => state.userprofileData);
  // // console.log("userProfileData", userprofileData);

  const handleCloseview = () => {
    setOpenview(false);
  };
  const handleFormSubmit = async () => {
    event.preventDefault();

    try {
      const formValues = {
        ...values,
        ...data,
      };
      console.log(formValues, "formdata");

      const response = await axios.post("http://10.0.20.133:8000/apply_leave/manager", formValues, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      if (response.status === 200) {
        handleCloseview();
        console.log("Created SchoolPage Successfully");
        if (response.status === 200) {
          console.log("Valueset Create Leaved Successfully");
          message.success(" Leave cancelled successFully");
        }
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  return (
    <Card>
      <MDBox py={4} pl={8}>
        <Grid container spacing={3} pb={2}>
          <Grid item xs={12} sm={9}>
            <MDTypography variant="h5">{"Leave Application"}</MDTypography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid sm={5} my={2}>
            <MDTypography>Employee ID</MDTypography>
          </Grid>
          <Grid sm={6} my={2}>
            <MDInput value={data?.employee_email} variant="standard" />
          </Grid>

          <Grid sm={5} my={2}>
            <MDTypography>Leave Type</MDTypography>
          </Grid>
          <Grid sm={6} my={2}>
            <MDInput value={data?.leave_type} variant="standard" />
          </Grid>

          <Grid sm={3} my={2}>
            <MDTypography>Date</MDTypography>
          </Grid>
          <Grid sm={3} my={2}>
            <MDInput value={data?.from_date} variant="standard" />
          </Grid>
          <Grid sm={1} px={1} my={2}>
            to
          </Grid>
          <Grid sm={3} my={2}>
            <MDInput value={data?.to_date} variant="standard" />
          </Grid>

          <Grid sm={5} my={2}>
            <MDTypography>Team Email ID</MDTypography>
          </Grid>
          <Grid sm={6} my={2}>
            <MDInput value={data?.team_email} variant="standard" />
          </Grid>

          <Grid sm={5} my={2}>
            <MDTypography>Date of Request</MDTypography>
          </Grid>
          <Grid sm={6} my={2}>
            <MDInput value={data?.created_at} variant="standard" />
          </Grid>

          <Grid sm={5} my={2}>
            <MDTypography>Reason for Leave</MDTypography>
          </Grid>
          <Grid sm={6} my={2}>
            <MDInput value={data?.reason_for_leave} variant="standard" />
          </Grid>

          {openReson == true ? (
            <>
              <Grid sm={5} my={2}>
                <MDTypography>Reason for Cancel</MDTypography>
              </Grid>
              <Grid sm={6} my={2}>
                <MDInput
                  name="manager_reason"
                  value={values.manager_reason}
                  onChange={handleChange}
                  variant="standard"
                />
              </Grid>
            </>
          ) : (
            ""
          )}

          <Grid sm={4} my={2}>
            <MDButton
              color="primary"
              onClick={() => {
                handleCloseview();
              }}
            >
              Close
            </MDButton>
          </Grid>
          {openReson == false ? (
            <>
              <Grid sm={4} my={2}>
                <MDButton
                  color="primary"
                  onClick={() => {
                    SetOpenReason(true);
                  }}
                >
                  Cancel Leave
                </MDButton>
              </Grid>
            </>
          ) : (
            ""
          )}
          {openReson == true ? (
            <>
              <Grid sm={4} my={2}>
                <MDButton color="primary" type="submit" onClick={handleFormSubmit}>
                  Submit
                </MDButton>
              </Grid>
            </>
          ) : (
            ""
          )}

          {/* <MDButton
            color="primary"
            onClick={() => {
              handleCloseview();
            }}
          >
            Cancel
          </MDButton> */}
          {/* <MDButton
            color="primary"
            onClick={() => {
              handleCloseview();
            }}
          >
            CancelLeave
          </MDButton>
          <MDButton
            color="primary"
            onClick={() => {
              handleCloseview();
            }}
          >
            Submit
          </MDButton> */}
        </Grid>
      </MDBox>
    </Card>
  );
};
export default Viewleave;
