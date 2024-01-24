import MDInput from "components/MDInput";
import { useFormik } from "formik";
import * as yup from "yup";
import MDButton from "components/MDButton";
import axios from "axios";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DataTable from "examples/Tables/DataTable";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import MDTypography from "components/MDTypography";
import Avatar from "@mui/material/Avatar";
import image1 from "./images/man.png";
import image2 from "./images/woman.png";
import { message } from "antd";
import zIndex from "@mui/material/styles/zIndex";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface MyError {
  response?: {
    data?: {
      detail?: string;
    };
  };
}
const ShowEmployee = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const rbacData = useSelector((state: any) => state?.rbacData);
  console.log("rbac data", rbacData);

  // const userprofileData = useSelector((state: any) => state.userprofileData);
  // console.log("userProfileDatin show empa", userprofileData);
  const handleDelete = async (first_name: any, last_name: any, email: any) => {
    try {
      const response = await axios.delete("http://10.0.20.133:8000/employee/", {
        data: {
          first_name: first_name,
          last_name: last_name,
          email: email,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status == 200) {
        message.success("Deleted succefully ");
        window.location.reload();
      } else if (response.status == 400) {
        message.error(response?.data?.detail);
      }
    } catch (error: unknown) {
      console.error("Error deleting task:", error);
      const myError = error as MyError;
      message.error(myError?.response?.data?.detail || "An unexpected error occurred");
    }
  };
  const handleUpdate = async (data: any) => {
    // component = { Link };
    // to = "/pages/reports/genderdiversity";
    console.log(data, "data for updata");
    navigate("/pages/employee/updateemployee", { state: data });
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/employee", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        // setTasks(response.data); //updating dialog box
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // const createacess = Cookies.get("createaccess");
  // const createacessdata = JSON.parse(createacess);

  // const getreadaccess = Cookies?.get("readaccess");

  // // Parse the string back into an array using JSON.parse
  // const readaccessdata = JSON?.parse(getreadaccess);
  // console.log(readaccessdata, "read acess data ");
  // const getupdateaccess = Cookies?.get("updateaccess");

  // // Parse the string back into an array using JSON.parse
  // const updateaccessdata = JSON?.parse(getupdateaccess);
  // console.log(updateaccessdata, "update acess data ");
  // const getdeleteaccess = Cookies?.get("deleteaccess");

  // // Parse the string back into an array using JSON.parse
  // const deleteaccessdata = JSON?.parse(getdeleteaccess);
  // console.log(deleteaccessdata, "delete acess data ");
  // const isShowEmployeePresent = arrayFromCookie.find(
  //   (element: string) => element === "showemployee"
  // );
  // {
  //   isShowEmployeePresent ? isShowEmployeePresent : "cdsacgsdahhjhjsdhjdhj";
  // }
  // console.log("Is 'showemployee' present:", isShowEmployeePresent);
  // console.log(arrayFromCookie, "acess data ");
  const dataTableData = {
    columns: [
      { Header: "EMPLOYEE NAME", accessor: "emp_name" },
      { Header: "EMAIL ADDRESS", accessor: "email_id" },
      { Header: "ROLE", accessor: "role" },
      { Header: "DESIGNATION", accessor: "designation" },
      { Header: "DEPARTMENT", accessor: "department" },
      { Header: "LOCATION", accessor: "location" },
      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      emp_name: (
        <>
          {row.gender === "female" ? <Avatar src={"woman.png"} /> : <Avatar src={"man.png"} />}
          <MDTypography variant="p">
            {row.first_name} {row.last_name}
          </MDTypography>
        </>
      ),
      email_id: <MDTypography variant="p">{row.email}</MDTypography>,
      role: <MDTypography variant="p">{row.role}</MDTypography>,
      designation: <MDTypography variant="p">{row.designation}</MDTypography>,
      department: <MDTypography variant="p">{row.department}</MDTypography>,
      location: <MDTypography variant="p">{row.location}</MDTypography>,

      action: (
        <MDTypography variant="p">
          {rbacData ? (
            rbacData?.find((element: string) => element === "showemployeeupdate") ? (
              <IconButton onClick={() => handleUpdate(row)}>
                <CreateRoundedIcon />
              </IconButton>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {rbacData ? (
            rbacData?.find((element: string) => element === "showemployeedelete") ? (
              <IconButton onClick={() => handleDelete(row.first_name, row.last_name, row.email)}>
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

  // arrayFromCookie.find("create");

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Grid container spacing={3} pb={2}>
        <Grid item xs={12} sm={9}>
          <MDTypography variant="h5">{"Employee"}</MDTypography>
        </Grid>
        <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
          {rbacData ? (
            rbacData?.find((element: string) => element === "showemployeecreate") ? (
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDButton
                  variant="gradient"
                  color="info"
                  type="submit"
                  // onClick={() => navigate("/pages/employee/newemployee")}
                  onClick={() => navigate("/pages/employee/createnewemployee")}
                >
                  + New Employee
                </MDButton>
              </Grid>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </Grid>
      </Grid>
      {rbacData ? (
        rbacData?.find((element: string) => element === "showemployeeread") ? (
          <DataTable table={dataTableData} />
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </DashboardLayout>
  );
};

export default ShowEmployee;
