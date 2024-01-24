import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { Delete } from "@mui/icons-material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import MDInput from "components/MDInput";
import { useFormik } from "formik";
import * as yup from "yup";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import axios from "axios";
import MDButton from "components/MDButton";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import Updatework from "./updatework";
import MDTypography from "components/MDTypography";
import Autocomplete from "@mui/material/Autocomplete";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import Cookies from "js-cookie";
import { message } from "antd";
import { useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";
interface MyError {
  response?: {
    data?: {
      detail?: string;
    };
  };
}

const validationSchema = yup.object({
  name: yup.string().required("Please enter your work location"),

  address_line1: yup.string().required("Password is required"),
  address_line2: yup.string(),

  state: yup.string(),
  city: yup.string().required("Please enter your city"),
});
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

  "Delhi (National Capital Territory of Delhi)",
  "Puducherry",
  "Ladakh",
  "Lakshadweep",
];

const Worklocations = () => {
  //   const { t } = useTranslation("translation");
  const [open, setOpen] = useState(false); //for dialog box start
  const token = Cookies.get("token");

  console.log("token", token);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; //end

  const [tasks, setTasks] = useState([]);
  const [editTaskData, setEditTaskData] = useState(null);

  //for dialog box start
  const [openupdate, setOpenupdate] = useState(false);
  console.log(tasks, "tasking");

  const handleOpenupdate = (index: number) => {
    const main_data = tasks[index];
    setOpenupdate(true);
    setEditTaskData(main_data);
    console.log(main_data, "maindata");
  };
  console.log(editTaskData, "taskasgrafgfgfsfsdfsdsfta");

  const handleCloseupdate = () => {
    setOpenupdate(false);
  };
  //end

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://10.0.20.133:8000/worklocation", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDeleteTask = async (name: any) => {
    try {
      const response = await axios.delete("http://10.0.20.133:8000/worklocation/", {
        data: { location_name: name },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      {
        response.status == 200
          ? message.success("Work Location Deleted Successfully")
          : message.error("Something went wrong");
      }
      fetchTasks(); // Fetch tasks again to get the updated list
    } catch (error: unknown) {
      console.error("Error deleting task:", error);
      const myError = error as MyError;
      message.error(myError?.response?.data?.detail || "An unexpected error occurred");
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      address_line1: "",
      address_line2: "",
      state: "",
      pincode: 0,
      city: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post(
          "http://10.0.20.133:8000/worklocation          ",
          {
            location_name: values.name,

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
          console.log(response);
          // navigate("/pages/organisations/new-organisation");
          message.success("Work Location Created Successfully");
          action.resetForm();
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(values);
    },
  });
  //sx={{ display: "flex", justifyContent: "flex-end" }}
  const userprofileData = useSelector((state: any) => state.userprofileData);
  console.log("userProfileDatin show empa", userprofileData);
  const rbacData = useSelector((state: any) => state?.rbacData);
  console.log("rbac data", rbacData);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <MDTypography variant="h3">{"Work"}</MDTypography> */}
      <MDBox>
        <Grid container spacing={3} pb={2}>
          <Grid item xs={12} sm={9}>
            <MDTypography variant="h5">{"Work Locations"}</MDTypography>
          </Grid>
          {rbacData ? (
            rbacData?.find((element: string) => element === "worklocationcreate") ? (
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDButton variant="gradient" color="info" type="submit" onClick={handleClickOpen}>
                  Add Work Location
                </MDButton>
              </Grid>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </Grid>
        <Card>
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <form onSubmit={formik.handleSubmit}>
                <MDBox p={4}>
                  <Grid container spacing={2}>
                    <Grid sm={12} mb={2}>
                      <MDInput
                        sx={{ width: "80%" }}
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

                    <Grid mt={3}>
                      <MDButton
                        color="info"
                        variant="contained"
                        type="submit"
                        onClick={handleClose}
                      >
                        Save
                      </MDButton>
                    </Grid>
                    <Grid ml={2} mt={3}>
                      <MDButton color="primary" variant="contained" onClick={handleClose}>
                        Cancel
                      </MDButton>
                    </Grid>
                  </Grid>
                </MDBox>
              </form>
            </DialogContent>
          </Dialog>
        </Card>
      </MDBox>
      {rbacData ? (
        rbacData?.find((element: string) => element === "worklocationread") ? (
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row", // Display cards in a row
              flexWrap: "wrap",
              flexGrow: 1,
              lineHeight: "10%",
            }}
          >
            {tasks.map((task, index) => (
              <Card
                key={task}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 1,
                  m: 1,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  flexBasis: "40%", // Display two cards in one row
                }}
              >
                <CardContent sx={{ ml: "40%" }}>
                  {rbacData ? (
                    rbacData?.find((element: string) => element === "worklocationupdate") ? (
                      <MDButton
                        startIcon={<CreateRoundedIcon />}
                        onClick={() => handleOpenupdate(index)}
                        size="large"
                      ></MDButton>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  {rbacData ? (
                    rbacData?.find((element: string) => element === "worklocationdelete") ? (
                      <MDButton
                        startIcon={<Delete />}
                        onClick={() => handleDeleteTask(task.location_name)}
                        size="large"
                      ></MDButton>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </CardContent>
                <CardContent
                  sx={{
                    fontFamily: "Raleway",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {task.location_name}
                </CardContent>
                <CardContent
                  sx={{
                    fontFamily: "Raleway",
                    fontSize: 16,
                  }}
                >
                  {task.add_line1}
                </CardContent>
                <CardContent
                  sx={{
                    fontFamily: "Raleway",
                    fontSize: 16,
                  }}
                >
                  {task.add_line2}
                </CardContent>
                <CardContent
                  sx={{
                    fontFamily: "Raleway",
                    fontSize: 16,
                  }}
                >
                  {task.city},{task.state},{task.pincode}
                </CardContent>
                <Dialog open={openupdate} onClose={handleCloseupdate}>
                  <Updatework
                    openupdate={openupdate}
                    setOpenupdate={setOpenupdate}
                    task={editTaskData}
                  />
                </Dialog>
              </Card>
            ))}
          </Grid>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </DashboardLayout>
  );
};

export default Worklocations;
