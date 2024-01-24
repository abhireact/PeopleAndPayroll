import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Card from "@mui/material/Card";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import { Grid, Menu, MenuItem, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";
import { message } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// import initialValues from "../users/new-user/schemas/initialValues";
import { blue } from "@mui/material/colors";
import MDButton from "components/MDButton";
import FormField from "../account/components/FormField";
import FilterListIcon from "@mui/icons-material/FilterList";
import DataTable from "examples/Tables/DataTable";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import DownloadIcon from "@mui/icons-material/Download";
import * as XLSX from "xlsx";
const initialValues = {
  department: [] as string[],

  designation: [] as string[],

  location: [] as string[],

  gender: [] as string[],

  // marital_status: [] as string[],
};
export default function DistributionReport() {
  const [selectedOption, setSelectedOption] = useState("designation");
  const [filterOption, setFilterOption] = useState(false);
  const [designationData, setDesignationData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [clickedSliceData, setClickedSliceData] = useState(null);

  const [isSliceClicked, setIsSliceClicked] = useState(false);
  const [tabledata, setTabledata] = useState([]);
  // const designationData = [
  //   { id: 0, value: 1, label: "CEO" },
  //   { id: 1, value: 5, label: "Assistant Manager" },
  //   { id: 2, value: 3, label: "Manager" },
  //   { id: 3, value: 8, label: "Administration" },
  //   { id: 4, value: 23, label: "Team Member" },
  // ];

  // const departmentData = [
  //   { id: 1, value: 5, label: "Finance" },
  //   { id: 4, value: 23, label: "IT" },
  //   { id: 2, value: 3, label: "Management" },
  //   { id: 3, value: 8, label: "Marketing" },
  // ];
  // const locationData = [
  //   { id: 1, value: 500, label: "Bengaluru" },
  //   { id: 4, value: 230, label: "New Delhi" },
  //   { id: 2, value: 312, label: "Mumbai" },
  //   { id: 3, value: 484, label: "Lucknow" },
  // ];
  const options = [
    { label: "Designation", value: "designation" },
    { label: "Department", value: "department" },
    { label: "Location", value: "location" },
  ];
  // get designationdata
  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/employee/designation", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDesignationData(response.data);
        // setTasks(response.data); //updating dialog box
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // get departmentdata
  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/employee/department", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDepartmentData(response.data);
        // setTasks(response.data); //updating dialog box
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // get locationtdata
  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/employee/location", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLocationData(response.data);
        // setTasks(response.data); //updating dialog box
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const totalDepartmentValue = departmentData?.reduce((total, item) => total + +item.value, 0);

  const totalDesignationValue = designationData?.reduce((total, item) => total + +item.value, 0);
  const totalLocationValue = locationData?.reduce((total, item) => total + +item.value, 0);
  const designationPercentageData = designationData?.map((item) => ({
    id: item.id,
    // value: (item.value / totalDesignationValue) * 100, // Keep value as number
    value: parseFloat((item.value / totalDesignationValue).toFixed(4)) * 100, // Convert to number

    label: item.label,
  }));
  const departmentPercentageData = departmentData?.map((item) => ({
    id: item.id,
    // value: item.value, // Keep value as number
    value: parseFloat((item.value / totalDepartmentValue).toFixed(4)) * 100, // Convert to number

    label: item.label,
  }));

  console.log(departmentPercentageData, totalDepartmentValue, "departmentpercentagedata");
  const locationPercentageData = locationData?.map((item) => ({
    id: item.id,
    // value: (item.value / totalLocationValue) * 100, // Keep value as number
    value: parseFloat((item.value / totalLocationValue).toFixed(4)) * 100, // Convert to number

    label: item.label,
  }));

  // ?formik
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    // validationSchema: organisationSchema,
    enableReinitialize: true,
    onSubmit: (values: any, action: { resetForm: () => void }) => {
      console.log(" ~ file: Registration.jsx ~ line 11 ~ Registration ~ values", values);
      action.resetForm();
    },
  });
  const token = Cookies.get("token");

  // const handleFormSubmit = async () => {
  //   try {
  //     console.log(values, "formdata");
  //     setFilterOption(false);
  //     let response;
  //     {
  //       selectedOption === "department"
  //         ? (response = await axios.post(
  //             "http://10.0.20.133:8000/employee/report/filter/department",
  //             values,
  //             {
  //               headers: {
  //                 "Content-Type": "application/json",
  //                 Authorization: `Bearer ${token}`,
  //               },
  //             }
  //           ))
  //         : (response = await axios.post("http://122.166.211.176:8000/employee/gender", values, {
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }));
  //     }

  //     console.log(response);

  //     if (response.status === 200) {
  //       console.log(" Created Employee Successfully");
  //       message.success(" Created Employee Successfully");
  //       // setIsSubmit(true);
  //       // navigate("/pages/employee/employee-invitation");
  //       // setDataSubmitted(true);
  //       // console.log(dataSubmitted, isSubmit, "hj wdjkdx");
  //     }
  //   } catch (error) {
  //     console.error("Error saving data:", error);
  //   }
  // };
  const handleFormSubmit = async () => {
    try {
      console.log(values, "formdata");
      setFilterOption(false);
      let response;

      if (selectedOption === "department") {
        response = await axios.post(
          "http://10.0.20.133:8000/employee/report/filter/department",
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);

        if (response.status === 200) {
          console.log("Created Employee Successfully");
          setDepartmentData(response.data);
          // setDesignationData(response.data);
          // setLocationData(response.data);
          message.success("Created Employee Successfully");
        }
      } else if (selectedOption === "designation") {
        response = await axios.post(
          "http://10.0.20.133:8000/employee/report/filter/designation",
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);

        if (response.status === 200) {
          console.log("Created Employee Successfully");
          // setDepartmentData(response.data);
          setDesignationData(response.data);
          // setLocationData(response.data);
          message.success("Created Employee Successfully");
        }
      } else if (selectedOption === "location") {
        response = await axios.post(
          "http://10.0.20.133:8000/employee/report/filter/location",
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);

        if (response.status === 200) {
          console.log("Created Employee Successfully");
          // setDepartmentData(response.data);
          // setDesignationData(response.data);
          setLocationData(response.data);
          message.success("Created Employee Successfully");
        }
      }

      // console.log(response);

      // if (response.status === 200) {
      //   console.log("Created Employee Successfully");
      //   setDepartmentData(response.data);
      //   setDesignationData(response.data);
      //   setLocationData(response.data);
      //   message.success("Created Employee Successfully");
      // }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // dep des location data
  const WorkLocation = useSelector((state: any) => state.workLocationData);
  console.log("WorkLocation", WorkLocation);

  const location_name = [];

  if (WorkLocation && WorkLocation.length > 0) {
    const uniqueLocationNames = new Set();

    for (let i = 0; i < WorkLocation.length; i++) {
      const locationName = WorkLocation[i]["location_name"];
      uniqueLocationNames.add(locationName);
    }

    // Convert the Set to an array if needed
    location_name.push(...uniqueLocationNames);
  }

  console.log(location_name, "location");

  const Department = useSelector((state: any) => state.departmentData);
  console.log("Department", Department);
  const dept_name = [];

  if (Department && Department.length > 0) {
    const uniqueDepartmentNames = new Set();

    for (let i = 0; i < Department.length; i++) {
      const departmentName = Department[i]["dept_name"];
      uniqueDepartmentNames.add(departmentName);
    }

    // Convert the Set to an array if needed
    dept_name.push(...uniqueDepartmentNames);
  }

  console.log(dept_name, "departmentName");
  const Designation = useSelector((state: any) => state.designationData);
  console.log("Designation", Designation);
  const des_name = [];

  if (Designation && Designation.length > 0) {
    const uniqueDesignationNames = new Set();

    for (let i = 0; i < Designation.length; i++) {
      const DesignationName = Designation[i]["des_name"];
      uniqueDesignationNames.add(DesignationName);
    }

    // Convert the Set to an array if needed
    des_name.push(...uniqueDesignationNames);
  }

  console.log(des_name, "DesignationName");

  // post the data of selected part of pi and get data for that table
  useEffect(() => {
    if (isSliceClicked && clickedSliceData) {
      const fetchData = async () => {
        try {
          let responsetabledata;
          if (selectedOption === "department" && departmentData[clickedSliceData.dataIndex]) {
            const formValues = {
              ...values,
              label: departmentData[clickedSliceData.dataIndex].label,
              value: departmentData[clickedSliceData.dataIndex].value,
            };
            responsetabledata = await axios.post(
              "http://10.0.20.133:8000/employee/report/filter/department",
              formValues,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } else if (
            selectedOption === "designation" &&
            designationData[clickedSliceData.dataIndex]
          ) {
            const formValues = {
              ...values,
              label: designationData[clickedSliceData.dataIndex].label,
              value: designationData[clickedSliceData.dataIndex].value,
            };
            responsetabledata = await axios.post(
              "http://10.0.20.133:8000/employee/report/filter/designation",
              formValues,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } else if (selectedOption === "location" && locationData[clickedSliceData.dataIndex]) {
            const formValues = {
              ...values,
              label: locationData[clickedSliceData.dataIndex].label,
              value: locationData[clickedSliceData.dataIndex].value,
            };
            responsetabledata = await axios.post(
              "http://10.0.20.133:8000/employee/report/filter/location",
              formValues,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          }
          console.log(responsetabledata.data, "hyuwdidjjjjjjjjjjjjjjw");
          setTabledata(responsetabledata.data[0].data);

          // Handle response data as needed
        } catch (error) {
          console.error("Error saving data:", error);
        }
      };

      fetchData();
      setIsSliceClicked(false); // Reset the slice clicked state after making the API request
    }
  }, [
    isSliceClicked,
    clickedSliceData,
    selectedOption,
    departmentData,
    designationData,
    locationData,
    values,
    token,
  ]);
  console.log(tabledata, "table data ");
  // datatable
  const dataTableData = {
    columns: [
      { Header: `${"Employee Name"}`, accessor: "name" },
      { Header: `${"Department "}`, accessor: "department" },
      { Header: `${"Designation "}`, accessor: "designation" },
      { Header: `${"Gender "}`, accessor: "gender" },
    ],
    rows: Array.isArray(tabledata)
      ? tabledata.map(
          (
            row: {
              name: any;
              designation: any;
              department: any;
              gender: any;
            },
            index: any
          ) => ({
            name: row.name,
            designation: row.designation,
            department: row.department,
            gender: row.gender,
          })
        )
      : [],
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Grid p={3} container>
          <Grid sm={2}>
            {" "}
            <MDTypography variant="h5">Diversity Report</MDTypography>
          </Grid>

          <Grid sm={2}>
            {" "}
            <Autocomplete
              options={options}
              getOptionLabel={(option) => option.label}
              value={options.find((option) => option.value === selectedOption) || null}
              onChange={(event, newValue) => {
                setSelectedOption(newValue?.value || "designation");
              }}
              renderInput={(params) => <TextField {...params} label="Select Option" />}
            />
          </Grid>
          <Grid item xs={12} sm={8} display="flex" justifyContent="flex-end">
            <MDTypography
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
              onClick={() => setFilterOption(true)}
            >
              <FilterListIcon fontSize="large" />
            </MDTypography>
          </Grid>
          {filterOption === true ? (
            <>
              {" "}
              {(() => {
                switch (selectedOption) {
                  case "department":
                    return (
                      <>
                        <Grid item xs={12} sm={3}>
                          <Autocomplete
                            // sx={{ width: "70%" }}
                            filterSelectedOptions={true}
                            autoHighlight={true}
                            limitTags={2}
                            selectOnFocus={true}
                            includeInputInList={true}
                            sx={{ color: blue }}
                            getLimitTagsText={(more) => {
                              return `+${more} more`;
                            }}
                            multiple
                            onChange={(event: any, value: any) => {
                              handleChange({ target: { name: "gender", value } });
                            }}
                            // value={gender}
                            // onChange={handleMainFieldChange}
                            options={["Male", "Female", "Others"]}
                            renderInput={(params: any) => (
                              <FormField
                                label={"gender"}
                                // InputLabelProps={{ shrink: true }}
                                required
                                name="gender"
                                placeholder="Enter Your gender"
                                onChange={handleChange}
                                value={values.gender}
                                {...params}
                                onBlur={handleBlur}
                                error={errors.gender && touched.gender}
                                success={!errors.gender}
                                variant="standard"
                              />
                            )}
                          />
                          {errors.gender && touched.gender ? (
                            // <p className="form-error">{errors.name}</p>
                            <MDTypography variant="caption" fontWeight="regular" color="error">
                              {errors.gender}
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={3.2}>
                          <Autocomplete
                            // sx={{ width: "70%" }}
                            filterSelectedOptions={true}
                            multiple
                            autoHighlight={true}
                            limitTags={2}
                            selectOnFocus={true}
                            includeInputInList={true}
                            sx={{ color: blue }}
                            getLimitTagsText={(more) => {
                              return `+${more} more`;
                            }}
                            onChange={(event: any, value: any) => {
                              handleChange({ target: { name: "designation", value } });
                            }}
                            // value={department}
                            // onChange={handleMainFieldChange}
                            options={des_name}
                            renderInput={(params: any) => (
                              <FormField
                                required
                                label={"Designation"}
                                InputLabelProps={{ shrink: true }}
                                name="designation"
                                placeholder="Enter Your designation"
                                onChange={handleChange}
                                value={values.designation}
                                {...params}
                                onBlur={handleBlur}
                                error={errors.designation && touched.designation}
                                success={!errors.designation}
                                variant="standard"
                              />
                            )}
                          />
                          {errors.designation && touched.designation ? (
                            // <p className="form-error">{errors.name}</p>
                            <MDTypography variant="caption" fontWeight="regular" color="error">
                              {errors.designation}
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={3.8}>
                          {/* <Autocomplete
      sx={{ width: "70%" }}
      // multiple
      onChange={(event: any, value: any) => {
        handleChange({ target: { name: "location", value } });
      }}
      // value={department}
      // onChange={handleMainFieldChange}
      options={location_name}
      //   options={["v", "gfr"]}
      renderInput={(params: any) => (
        <FormField
          label={"Location"}
          InputLabelProps={{ shrink: true }}
          name="location"
          placeholder="Enter Your location"
          onChange={handleChange}
          value={values.location}
          {...params}
          onBlur={handleBlur}
          error={errors.location && touched.location}
          success={!errors.location}
          variant="standard"
        />
      )}
    /> */}
                          <Autocomplete
                            // sx={{ width: "70%" }}
                            multiple
                            filterSelectedOptions={true}
                            autoHighlight={true}
                            limitTags={2}
                            selectOnFocus={true}
                            includeInputInList={true}
                            sx={{ color: blue }}
                            getLimitTagsText={(more) => {
                              return `+${more} more`;
                            }}
                            onChange={(event: any, value: any) => {
                              handleChange({ target: { name: "location", value } });
                              // Call fetchRoles function with the selected location value
                              // fetchRoles(value);
                            }}
                            options={location_name}
                            renderInput={(params: any) => (
                              <FormField
                                required
                                label={"Location"}
                                InputLabelProps={{ shrink: true }}
                                name="location"
                                placeholder="Enter Your location"
                                onChange={handleChange}
                                value={values.location}
                                {...params}
                                onBlur={handleBlur}
                                error={errors.location && touched.location}
                                success={!errors.location}
                                variant="standard"
                              />
                            )}
                          />

                          {errors.location && touched.location ? (
                            // <p className="form-error">{errors.name}</p>
                            <MDTypography variant="caption" fontWeight="regular" color="error">
                              {errors.location}
                            </MDTypography>
                          ) : null}
                        </Grid>
                      </>
                    );
                  case "designation":
                    return (
                      <>
                        <Grid item xs={12} sm={3}>
                          <Autocomplete
                            // sx={{ width: "70%" }}
                            filterSelectedOptions={true}
                            autoHighlight={true}
                            limitTags={2}
                            selectOnFocus={true}
                            includeInputInList={true}
                            sx={{ color: blue }}
                            getLimitTagsText={(more) => {
                              return `+${more} more`;
                            }}
                            multiple
                            onChange={(event: any, value: any) => {
                              handleChange({ target: { name: "gender", value } });
                            }}
                            // value={gender}
                            // onChange={handleMainFieldChange}
                            options={["Male", "Female", "Others"]}
                            renderInput={(params: any) => (
                              <FormField
                                label={"gender"}
                                // InputLabelProps={{ shrink: true }}
                                required
                                name="gender"
                                placeholder="Enter Your gender"
                                onChange={handleChange}
                                value={values.gender}
                                {...params}
                                onBlur={handleBlur}
                                error={errors.gender && touched.gender}
                                success={!errors.gender}
                                variant="standard"
                              />
                            )}
                          />
                          {errors.gender && touched.gender ? (
                            // <p className="form-error">{errors.name}</p>
                            <MDTypography variant="caption" fontWeight="regular" color="error">
                              {errors.gender}
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={3.2}>
                          <Autocomplete
                            // sx={{ width: "70%" }}
                            filterSelectedOptions={true}
                            multiple
                            autoHighlight={true}
                            limitTags={2}
                            selectOnFocus={true}
                            includeInputInList={true}
                            sx={{ color: blue }}
                            getLimitTagsText={(more) => {
                              return `+${more} more`;
                            }}
                            onChange={(event: any, value: any) => {
                              handleChange({ target: { name: "department", value } });
                            }}
                            // value={department}
                            // onChange={handleMainFieldChange}
                            options={dept_name}
                            renderInput={(params: any) => (
                              <FormField
                                required
                                label={"department"}
                                InputLabelProps={{ shrink: true }}
                                name="department"
                                placeholder="Enter Your department"
                                onChange={handleChange}
                                value={values.department}
                                {...params}
                                onBlur={handleBlur}
                                error={errors.department && touched.department}
                                success={!errors.department}
                                variant="standard"
                              />
                            )}
                          />
                          {errors.department && touched.department ? (
                            // <p className="form-error">{errors.name}</p>
                            <MDTypography variant="caption" fontWeight="regular" color="error">
                              {errors.department}
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={3.8}>
                          {/* <Autocomplete
      sx={{ width: "70%" }}
      // multiple
      onChange={(event: any, value: any) => {
        handleChange({ target: { name: "location", value } });
      }}
      // value={department}
      // onChange={handleMainFieldChange}
      options={location_name}
      //   options={["v", "gfr"]}
      renderInput={(params: any) => (
        <FormField
          label={"Location"}
          InputLabelProps={{ shrink: true }}
          name="location"
          placeholder="Enter Your location"
          onChange={handleChange}
          value={values.location}
          {...params}
          onBlur={handleBlur}
          error={errors.location && touched.location}
          success={!errors.location}
          variant="standard"
        />
      )}
    /> */}
                          <Autocomplete
                            // sx={{ width: "70%" }}
                            multiple
                            filterSelectedOptions={true}
                            autoHighlight={true}
                            limitTags={2}
                            selectOnFocus={true}
                            includeInputInList={true}
                            sx={{ color: blue }}
                            getLimitTagsText={(more) => {
                              return `+${more} more`;
                            }}
                            onChange={(event: any, value: any) => {
                              handleChange({ target: { name: "location", value } });
                              // Call fetchRoles function with the selected location value
                              // fetchRoles(value);
                            }}
                            options={location_name}
                            renderInput={(params: any) => (
                              <FormField
                                required
                                label={"Location"}
                                InputLabelProps={{ shrink: true }}
                                name="location"
                                placeholder="Enter Your location"
                                onChange={handleChange}
                                value={values.location}
                                {...params}
                                onBlur={handleBlur}
                                error={errors.location && touched.location}
                                success={!errors.location}
                                variant="standard"
                              />
                            )}
                          />

                          {errors.location && touched.location ? (
                            // <p className="form-error">{errors.name}</p>
                            <MDTypography variant="caption" fontWeight="regular" color="error">
                              {errors.location}
                            </MDTypography>
                          ) : null}
                        </Grid>
                      </>
                    );
                  case "location":
                    return (
                      <>
                        <Grid item xs={12} sm={3}>
                          <Autocomplete
                            // sx={{ width: "70%" }}
                            filterSelectedOptions={true}
                            autoHighlight={true}
                            limitTags={2}
                            selectOnFocus={true}
                            includeInputInList={true}
                            sx={{ color: blue }}
                            getLimitTagsText={(more) => {
                              return `+${more} more`;
                            }}
                            multiple
                            onChange={(event: any, value: any) => {
                              handleChange({ target: { name: "gender", value } });
                            }}
                            // value={gender}
                            // onChange={handleMainFieldChange}
                            options={["Male", "Female", "Others"]}
                            renderInput={(params: any) => (
                              <FormField
                                label={"gender"}
                                // InputLabelProps={{ shrink: true }}
                                required
                                name="gender"
                                placeholder="Enter Your gender"
                                onChange={handleChange}
                                value={values.gender}
                                {...params}
                                onBlur={handleBlur}
                                error={errors.gender && touched.gender}
                                success={!errors.gender}
                                variant="standard"
                              />
                            )}
                          />
                          {errors.gender && touched.gender ? (
                            // <p className="form-error">{errors.name}</p>
                            <MDTypography variant="caption" fontWeight="regular" color="error">
                              {errors.gender}
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={3.2}>
                          <Autocomplete
                            // sx={{ width: "70%" }}
                            filterSelectedOptions={true}
                            multiple
                            autoHighlight={true}
                            limitTags={2}
                            selectOnFocus={true}
                            includeInputInList={true}
                            sx={{ color: blue }}
                            getLimitTagsText={(more) => {
                              return `+${more} more`;
                            }}
                            onChange={(event: any, value: any) => {
                              handleChange({ target: { name: "department", value } });
                            }}
                            // value={department}
                            // onChange={handleMainFieldChange}
                            options={dept_name}
                            renderInput={(params: any) => (
                              <FormField
                                required
                                label={"department"}
                                InputLabelProps={{ shrink: true }}
                                name="department"
                                placeholder="Enter Your department"
                                onChange={handleChange}
                                value={values.department}
                                {...params}
                                onBlur={handleBlur}
                                error={errors.department && touched.department}
                                success={!errors.department}
                                variant="standard"
                              />
                            )}
                          />
                          {errors.department && touched.department ? (
                            // <p className="form-error">{errors.name}</p>
                            <MDTypography variant="caption" fontWeight="regular" color="error">
                              {errors.department}
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={3.8}>
                          {/* <Autocomplete
      sx={{ width: "70%" }}
      // multiple
      onChange={(event: any, value: any) => {
        handleChange({ target: { name: "location", value } });
      }}
      // value={department}
      // onChange={handleMainFieldChange}
      options={location_name}
      //   options={["v", "gfr"]}
      renderInput={(params: any) => (
        <FormField
          label={"Location"}
          InputLabelProps={{ shrink: true }}
          name="location"
          placeholder="Enter Your location"
          onChange={handleChange}
          value={values.location}
          {...params}
          onBlur={handleBlur}
          error={errors.location && touched.location}
          success={!errors.location}
          variant="standard"
        />
      )}
    /> */}
                          <Autocomplete
                            // sx={{ width: "70%" }}
                            multiple
                            filterSelectedOptions={true}
                            autoHighlight={true}
                            limitTags={2}
                            selectOnFocus={true}
                            includeInputInList={true}
                            sx={{ color: blue }}
                            getLimitTagsText={(more) => {
                              return `+${more} more`;
                            }}
                            onChange={(event: any, value: any) => {
                              handleChange({ target: { name: "designation", value } });
                              // Call fetchRoles function with the selected location value
                              // fetchRoles(value);
                            }}
                            options={des_name}
                            renderInput={(params: any) => (
                              <FormField
                                required
                                label={"Designation"}
                                InputLabelProps={{ shrink: true }}
                                name="designation"
                                placeholder="Enter Your designation"
                                onChange={handleChange}
                                value={values.designation}
                                {...params}
                                onBlur={handleBlur}
                                error={errors.designation && touched.designation}
                                success={!errors.designation}
                                variant="standard"
                              />
                            )}
                          />

                          {errors.designation && touched.designation ? (
                            // <p className="form-error">{errors.name}</p>
                            <MDTypography variant="caption" fontWeight="regular" color="error">
                              {errors.designation}
                            </MDTypography>
                          ) : null}
                        </Grid>
                      </>
                    );
                  default:
                    return null; // Handle default case if necessary
                }
              })()}
              <Grid item xs={12} sm={2} display="flex" justifyContent="flex-end">
                <MDButton variant="gradient" color="info" type="submit" onClick={handleFormSubmit}>
                  {"Save"}
                </MDButton>
              </Grid>
            </>
          ) : (
            ""
          )}
        </Grid>
        <Grid container>
          <div style={{ display: selectedOption === "designation" ? "block" : "none" }}>
            {designationData ? (
              <PieChart
                series={[
                  {
                    data: designationPercentageData,
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: { innerRadius: 30, additionalRadius: -30 },
                  },
                ]}
                width={700}
                height={300}
                onClick={(event, data) => {
                  setClickedSliceData(data);
                  setIsSliceClicked(true);
                }}
              />
            ) : (
              ""
            )}
          </div>
          <div style={{ display: selectedOption === "department" ? "block" : "none" }}>
            {departmentData ? (
              <PieChart
                series={[
                  {
                    data: departmentPercentageData,
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: { innerRadius: 30, additionalRadius: -30 },
                  },
                ]}
                width={700}
                height={300}
                onClick={(event, data) => {
                  setClickedSliceData(data);
                  setIsSliceClicked(true);
                }}
              />
            ) : (
              ""
            )}
          </div>
          <div style={{ display: selectedOption === "location" ? "block" : "none" }}>
            {locationData ? (
              <PieChart
                series={[
                  {
                    data: locationPercentageData,
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: { innerRadius: 30, additionalRadius: -30 },
                  },
                ]}
                width={700}
                height={300}
                onClick={(event, data) => {
                  setClickedSliceData(data);
                  setIsSliceClicked(true);
                }}
              />
            ) : (
              ""
            )}
          </div>
        </Grid>
        {tabledata?.length > 0 ? (
          <>
            <DataTable table={dataTableData} importbtn />
          </>
        ) : (
          ""
        )}
      </Card>
    </DashboardLayout>
  );
}
