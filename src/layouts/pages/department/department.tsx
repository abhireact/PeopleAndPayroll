import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React TS examples components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Button from "components/MDButton";

import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";

import axios from "axios";

import MDInput from "components/MDInput";
import { useFormik } from "formik";
import * as yup from "yup";

import Grid from "@mui/material/Grid";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import Updatedep from "./updatedep";
import Cookies from "js-cookie";
import MDButton from "components/MDButton";
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
//department validation
const validationSchema = yup.object({
  departmentname: yup.string().required("Please enter department name"),
  departmentcode: yup.string().required("Code is required"),

  description: yup.string().required("Password is required"),
});

function Department(): JSX.Element {
  const token = Cookies.get("token");

  console.log("token", token);
  const rbacData = useSelector((state: any) => state?.rbacData);
  console.log("rbac data", rbacData);
  //   const { t } = useTranslation("translation");
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false); //for dialog box start

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; //end
  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/department", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setTasks(response.data); //updating dialog box
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const dataTableData = {
    columns: [
      { Header: "DEPARTMENT NAME", accessor: "dept_name" },
      { Header: "DEPARTMENT CODE", accessor: "dept_code" },
      { Header: "DESCRIPTION", accessor: "description" },
      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      dept_name: row.dept_name,
      dept_code: row.dept_code,
      description: row.description,
      action: (
        <MDTypography variant="p">
          {rbacData ? (
            rbacData?.find((element: string) => element === "departmentupdate") ? (
              <IconButton
                onClick={() => {
                  handleOpenupdate(index);
                }}
              >
                <CreateRoundedIcon />
              </IconButton>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {rbacData ? (
            rbacData?.find((element: string) => element === "departmentdelete") ? (
              <IconButton onClick={() => handleDeleteTask(row.dept_name)}>
                <DeleteIcon />
              </IconButton>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </MDTypography>
      ),
    })),
  };
  // updating  dialog box
  const [tasks, setTasks] = useState([]);
  const [editTaskData, setEditTaskData] = useState(null);
  const [openupdate, setOpenupdate] = useState(false);
  const handleOpenupdate = (index: number) => {
    const main_data = tasks[index];
    console.log(main_data, "maindata");

    setOpenupdate(true);
    setEditTaskData(main_data);
  };
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };

  //Deleting part
  const handleDeleteTask = async (dept_name: any) => {
    console.log(dept_name, "function is working");
    try {
      const res = await axios.delete("http://10.0.20.133:8000/department/", {
        data: { dept_name: dept_name },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        message.success("Department Deleted successfully");
        window.location.reload();
      }
    } catch (error: unknown) {
      console.error("Error deleting task:", error);
      const myError = error as MyError;
      message.error(myError?.response?.data?.detail || "An unexpected error occurred");
    }
  };

  //department formik
  const formik = useFormik({
    initialValues: {
      departmentname: "",
      departmentcode: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post(
          "http://10.0.20.133:8000/department",
          {
            dept_name: values.departmentname,
            dept_code: values.departmentcode,
            description: values.description,
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
          if (response.status == 200) {
            message.success("Department Created successfully");
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(values);
      action.resetForm();
    },
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox mb={3}>
        <MDBox p={3}>
          {/* <MDTypography variant="h3" fontWeight="medium">
            {"Dep"}
          </MDTypography> */}
        </MDBox>

        <Grid container spacing={3} pb={2}>
          <Grid item xs={12} sm={9}>
            <MDTypography variant="h5">{"Departments"}</MDTypography>
          </Grid>
          {rbacData ? (
            rbacData?.find((element: string) => element === "departmentcreate") ? (
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDButton variant="gradient" color="info" type="submit" onClick={handleClickOpen}>
                  + New Department
                </MDButton>
              </Grid>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {/* <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
            <MDButton variant="gradient" color="info" type="submit" onClick={handleClickOpen}>
              + New Departments
            </MDButton>
          </Grid> */}
        </Grid>
        <Card>
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
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
                          error={
                            formik.touched.departmentname && Boolean(formik.errors.departmentname)
                          }
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
                          error={
                            formik.touched.departmentcode && Boolean(formik.errors.departmentcode)
                          }
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
                          onClick={handleClose}
                        >
                          Save
                        </Button>
                      </Grid>
                      <Grid ml={2} mt={3}>
                        <Button color="primary" variant="contained" onClick={handleClose}>
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </MDBox>
                </form>
              </Card>
            </DialogContent>
          </Dialog>

          <Dialog open={openupdate} onClose={handleCloseupdate}>
            <Updatedep openupdate={openupdate} setOpenupdate={setOpenupdate} task={editTaskData} />
          </Dialog>
          {rbacData ? (
            rbacData?.find((element: string) => element === "departmentread") ? (
              <DataTable table={dataTableData} importbtn />
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default Department;
