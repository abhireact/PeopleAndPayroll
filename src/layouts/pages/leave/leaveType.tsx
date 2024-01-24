// *******************************************************************///////////
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Autocomplete, Switch } from "@mui/material";
import FormField from "../account/components/FormField";
// Material Dashboard 2 PRO React TS examples components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import dataTableData from "layouts/applications/data-tables/data/dataTableData";
import { Dialog, Grid } from "@mui/material";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
// import CryptoJS from "crypto-js";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import CreatePage from "./create";

// import { I18nextProvider, useTranslation } from "react-i18next";
// import createTrans from "../template1/createtransschool";
// import Create from "./create";
// import CreateSchool from "./createschool";
// import CreateAcademic from "./createAcademic";
// import Create from "./create";
import { useDispatch, useSelector } from "react-redux";
// import Create from "../template1/create";
import Cookies from "js-cookie";
import { storeLeavetypeData } from "Redux/action/dummyDataActions";
// import CreateEmployeeDepartment from "./createEmployeedepartment";
// import CreateAcademicPage from "./CreateAcademicPage";

const LeaveType = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [editData, setEditData] = useState({});
  const [showData, setShowData] = useState({});
  const [editingIndex, setEditingIndex] = useState(-1);
  const [numRows, setNumRows] = useState(1);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [formData, setFormData] = useState([]);
  const [savedata, setSavedata] = useState(false);
  const [showacadmicdata, setShowacademicdata] = useState(false);
  // const { t } = useTranslation();
  const dispatched = useDispatch();
  const token = Cookies.get("token");
  console.log("token", token);
  console.log("myname", token);
  useEffect(() => {
    fetchAPI(); // Fetch data from API on component mount
  }, []);

  const fetchAPI = async () => {
    try {
      const response = await fetch("http://10.0.20.133:8000/mg_leave_type ", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setData(data);
      console.log(data, typeof data);
      //   decryptData(data[0].encrypted_data);
      //   console.log(data[0].encrypted_data, "ghihwefgkwefh");
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  React.useEffect(() => {
    dispatched(storeLeavetypeData(data));
  }, [dispatched, data]);
  const handleFormSubmit = async () => {
    try {
      // Make a POST request to save the data
      console.log(formData, "bhjdfjkvjk");
      const response = await fetch("http://10.0.20.133:8000/mg_value_set", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Handle the response or any necessary actions after successful save
      console.log(response); // Assuming the response contains the saved data

      if (response.status === 200) {
        console.log("Valueset Created Succesfully");
      }
      // Reset the form after successful save
      setFormData([]);
    } catch (error) {
      // Handle any errors that occurred during the save process
      console.error("Error saving data:", error);
    }
  };
  const handleDeleteRow = async (index: number) => {
    if (data.length === 1) {
      alert("Cannot delete the last row.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete the data?");

    if (confirmDelete) {
      try {
        const rowToDelete = data[index];
        const response = await fetch(`http://10.0.20.133:8001/mg_academic_year/${rowToDelete.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setData((prevData) => {
            const updatedData = [...prevData];
            updatedData.splice(index, 1);
            return updatedData.filter((row) => Object.keys(row).length > 0);
          });

          setOriginalData((prevData) => {
            const updatedData = [...prevData];
            updatedData.splice(index, 1);
            return updatedData.filter((row) => Object.keys(row).length > 0);
          });

          setEditData((prevData: any[]) => prevData.filter((_, i) => i !== index));
          setEditingIndex(-1);
          console.log("Row deleted successfully!");
        } else {
          console.log("Error deleting row!");
        }
      } catch (error) {
        console.log("Error deleting row:", error);
      }
    }
  };

  const handleEditRow = (index: number) => {
    const rowData = data[index];
    console.log(rowData, "rowData");
    setEditData(rowData); // Set the editData state with the row data to be edited
    setOpenPopup(true); // Open the edit popup
  };
  const handleShowRow = (index: number) => {
    const rowData = data[index];
    console.log(rowData, "rowData");
    setShowData(rowData); // Set the editData state with the row data to be edited
    setOpenPopup2(true); // Open the edit popup
  };
  const handleDataChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
    index: number
  ) => {
    const updatedRow = { ...data[index], [field]: event.target.value };
    const updatedData = [...data];
    updatedData[index] = updatedRow;
    setData(updatedData);
    setEditData(updatedData); // Update the editData state with the changed row data
  };
  const handlesavedata = () => {
    setSavedata(true); // Open the edit popup
    setOpenPopup(false);
  };
  //   handlecanceldata = () => {
  //     setOpenPopup2(false);
  //   };

  const dataTableData = {
    columns: [
      { Header: `${"Leave Name"}`, accessor: "leave_type_name" },
      { Header: `${"Leave Type "}`, accessor: "leave_type" },
      { Header: `${"Unit "}`, accessor: "unit" },

      // { Header: `${"action"}`, accessor: "action" },
    ],

    rows: Array.isArray(data)
      ? data.map(
          (
            row: {
              leave_type_name: any;
              leave_type: any;
              unit: any;
              //   email_id: any;
            },
            index: any
          ) => ({
            leave_type_name: (
              <p onChange={(e: any) => handleDataChange(e, "id", index)}>{row.leave_type_name}</p>
            ),
            leave_type: (
              <p onChange={(e: any) => handleDataChange(e, "leave_type", index)}>
                {row.leave_type}
              </p>
            ),
            unit: <p onChange={(e: any) => handleDataChange(e, "unit", index)}>{row.unit}</p>,
          })
        )
      : [],
  };

  console.log(dataTableData, "dataTableData");

  console.log(showData, "mmmmmmmmmmmmmbhjiwevfnjscbjkff");
  return (
    <>
      {showacadmicdata ? (
        " <Create />"
      ) : (
        <>
          <DashboardLayout>
            <DashboardNavbar />

            <MDBox pt={6} pb={3}>
              <Card>
                <MDBox p={3} lineHeight={1}>
                  <Grid container spacing={1} display="flex" justifyContent="flex-end">
                    <Grid item xs={12} sm={9}>
                      <MDTypography variant="h5" fontWeight="medium">
                        Show Leave Type
                      </MDTypography>
                    </Grid>

                    <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                      <Grid item xs={12} sm={0} display="flex" justifyContent="flex-end" mr={1}>
                        <Link to={"/pages/leave/newleavetype"}>
                          <MDButton
                            variant="gradient"
                            color="info"
                            // onClick={() => setShowacademicdata(true)}
                          >
                            +{"Create"}
                          </MDButton>
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </MDBox>
                <DataTable table={dataTableData} />
              </Card>
            </MDBox>
          </DashboardLayout>
        </>
      )}
    </>
  );
};

export default LeaveType;
