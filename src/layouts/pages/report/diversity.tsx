// import React, { useEffect, useState } from "react";
// import { PieChart } from "@mui/x-charts/PieChart";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import Card from "@mui/material/Card";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import MDTypography from "components/MDTypography";
// import { Grid, TextField } from "@mui/material";
// import Autocomplete from "@mui/material/Autocomplete";
// import StraightIcon from "@mui/icons-material/Straight";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import { message } from "antd";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import FormField from "../account/components/FormField";
// import { useSelector } from "react-redux";
// import MDButton from "components/MDButton";
// import { blue } from "@mui/material/colors";
// import DataTable from "examples/Tables/DataTable";

// const initialValues = {
//   department: "",

//   designation: "",

//   location: "",

//   gender: "",

//   // marital_status: [] as string[],
// };
// export default function DiversityReport() {
//   const [selectedOption, setSelectedOption] = useState("gender");
//   const [filterOption, setFilterOption] = useState(false);
//   const [clickedSliceData, setClickedSliceData] = useState(null);

//   const [isSliceClicked, setIsSliceClicked] = useState(false);
//   const [tabledata, setTabledata] = useState([]);
//   const [genderData, setGenderData] = useState([]);
//   // const genderData = [
//   //   { id: 0, value: 15, label: "Female" },
//   //   { id: 1, value: 20, label: "Male" },
//   //   { id: 2, value: 2, label: "Others" },
//   // ];

//   const ageData = [
//     { id: 0, value: 23, color: "orange", label: "Age(18-25)", data: [{}] },
//     { id: 1, value: 14, color: "blue", label: "Age(25-35)" },
//     { id: 2, value: 5, color: "green", label: "Age(35 above)" },
//   ];

//   // ... rest of your code remains unchanged

//   // Calculate total values for each category
//   // const totalGenderValue = genderData?.reduce((total, item) => total + item.value, 0);
//   const totalAgeValue = ageData.reduce((total, item) => total + item.value, 0);

//   // Calculate percentage values for each category rounded to 2 decimal places
//   // const genderPercentageData = genderData?.map((item) => ({
//   //   id: item.id,
//   //   value: (item.value / totalGenderValue) * 100, // Keep value as number
//   //   label: item.label,
//   // }));
//   const agePercentageData = ageData.map((item) => ({
//     id: item.id,
//     value: parseFloat((item.value / totalAgeValue).toFixed(4)) * 100, // Convert to number
//     label: item.label,
//   }));

//   const options = [
//     { label: "Gender", value: "gender" },
//     { label: "Age", value: "age" },
//   ];

//   // formik
//   const navigate = useNavigate();
//   const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
//     initialValues,
//     // validationSchema: organisationSchema,
//     enableReinitialize: true,
//     onSubmit: (values: any, action: { resetForm: () => void }) => {
//       console.log(" ~ file: Registration.jsx ~ line 11 ~ Registration ~ values", values);
//       action.resetForm();
//     },
//   });
//   const token = Cookies.get("token");
//   console.log(values, "values");
//   // const handleFormSubmit = async () => {
//   //   try {
//   //     console.log(values, "formdata");
//   //     setFilterOption(false);
//   //     let response;
//   //     {
//   //       selectedOption === "age"
//   //         ? (response = await axios.post("http://122.166.211.176:8000/employee/age      ", values, {
//   //             headers: {
//   //               "Content-Type": "application/json",
//   //               Authorization: `Bearer ${token}`,
//   //             },
//   //           }))
//   //         : (response = await axios.post(
//   //             "http://122.166.211.176:8000/employee/gender     ",
//   //             values,
//   //             {
//   //               headers: {
//   //                 "Content-Type": "application/json",
//   //                 Authorization: `Bearer ${token}`,
//   //               },
//   //             }
//   //           ));
//   //     }

//   //     console.log(response);

//   //     if (response.status === 200) {
//   //       console.log(" Created Employee Successfully");
//   //       message.success(" Created Employee Successfully");
//   //       // setIsSubmit(true);
//   //       // navigate("/pages/employee/employee-invitation");
//   //       // setDataSubmitted(true);
//   //       // console.log(dataSubmitted, isSubmit, "hj wdjkdx");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error saving data:", error);
//   //   }
//   // };

//   // dep des location data
//   const WorkLocation = useSelector((state: any) => state.workLocationData);
//   console.log("WorkLocation", WorkLocation);

//   const location_name = [];

//   if (WorkLocation && WorkLocation?.length > 0) {
//     const uniqueLocationNames = new Set();

//     for (let i = 0; i < WorkLocation?.length; i++) {
//       const locationName = WorkLocation[i]["location_name"];
//       uniqueLocationNames.add(locationName);
//     }

//     // Convert the Set to an array if needed
//     location_name.push(...uniqueLocationNames);
//   }

//   console.log(location_name, "location");

//   const Department = useSelector((state: any) => state.departmentData);
//   console.log("Department", Department);
//   const dept_name = [];

//   if (Department && Department?.length > 0) {
//     const uniqueDepartmentNames = new Set();

//     for (let i = 0; i < Department.length; i++) {
//       const departmentName = Department[i]["dept_name"];
//       uniqueDepartmentNames.add(departmentName);
//     }

//     // Convert the Set to an array if needed
//     dept_name.push(...uniqueDepartmentNames);
//   }

//   console.log(dept_name, "departmentName");
//   const Designation = useSelector((state: any) => state.designationData);
//   console.log("Designation", Designation);
//   const des_name = [];

//   if (Designation && Designation?.length > 0) {
//     const uniqueDesignationNames = new Set();

//     for (let i = 0; i < Designation?.length; i++) {
//       const DesignationName = Designation[i]["des_name"];
//       uniqueDesignationNames.add(DesignationName);
//     }

//     // Convert the Set to an array if needed
//     des_name.push(...uniqueDesignationNames);
//   }

//   console.log(des_name, "DesignationName");
//   console.log(clickedSliceData, "clickedSliceData");
//   // post the data of selected part of pi and get data for that table
//   useEffect(() => {
//     if (isSliceClicked && clickedSliceData) {
//       const fetchData = async () => {
//         try {
//           let responsetabledata;
//           if (selectedOption === "age" && ageData[clickedSliceData.dataIndex]) {
//             const formValues = {
//               ...values,
//               label: ageData[clickedSliceData.dataIndex].label,
//               value: ageData[clickedSliceData.dataIndex].value,
//             };
//             responsetabledata = await axios.post(
//               "http://122.166.211.176:8000/employee/age",
//               formValues,
//               {
//                 headers: {
//                   "Content-Type": "application/json",
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             );
//           } else if (selectedOption === "gender" && genderData[clickedSliceData.dataIndex]) {
//             const formValues = {
//               ...values,
//               label: genderData[clickedSliceData.dataIndex].label,
//               value: genderData[clickedSliceData.dataIndex].value,
//             };
//             responsetabledata = await axios.post(
//               "http://122.166.211.176:8000/employee/gender",
//               formValues,
//               {
//                 headers: {
//                   "Content-Type": "application/json",
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             );
//           }

//           console.log(responsetabledata);
//           setTabledata(responsetabledata.data);

//           // Handle response data as needed
//         } catch (error) {
//           console.error("Error saving data:", error);
//         }
//       };

//       fetchData();
//       setIsSliceClicked(false); // Reset the slice clicked state after making the API request
//     }
//   }, [isSliceClicked, clickedSliceData, selectedOption, ageData, genderData, values, token]);

//   // datatable
//   const dataTableData = {
//     columns: [
//       { Header: `${"Employee Name"}`, accessor: "employee_name" },
//       { Header: `${"Department "}`, accessor: "department" },
//       { Header: `${"Designation "}`, accessor: "designation" },
//       { Header: `${"Gender "}`, accessor: "gender" },

//       // { Header: `${"action"}`, accessor: "action" },
//     ],

//     rows: Array.isArray(tabledata)
//       ? tabledata.map(
//           (
//             row: {
//               employee_name: any;
//               designation: any;
//               department: any;
//               gender: any;
//               //   email_id: any;
//             },
//             index: any
//           ) => ({
//             employee_name: <p>{row.employee_name}</p>,
//             designation: <p>{row.designation}</p>,
//             department: <p>{row.department}</p>,
//             gender: <p>{row.gender}</p>,
//           })
//         )
//       : [],
//   };

//   // get genderdata
//   useEffect(() => {
//     axios
//       .get("http://10.0.20.133:8000/employee/report/gender", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setGenderData(response.data);
//         // setTasks(response.data); //updating dialog box
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   // Filter the data
//   // Filter the data
//   useEffect(() => {
//     // Filter gender data based on selected values from Autocomplete components
//     const filteredGenderData = genderData?.map((genderItem) => {
//       const filteredData = genderItem?.data?.filter(
//         (item: { department: string; designation: string; location: string }) => {
//           const departmentMatch = !values.department || item.department === values.department;
//           const designationMatch = !values.designation || item.designation === values.designation;
//           const locationMatch = !values.location || item.location === values.location;
//           return departmentMatch && designationMatch && locationMatch;
//         }
//       );

//       return {
//         ...genderItem,
//         data: filteredData,
//         value: filteredData.length, // Update the 'value' property with the filtered data length
//       };
//     });

//     // Update the filtered gender data in the state
//     setGenderData(filteredGenderData);
//   }, [values?.department, values?.designation, values?.location]);

//   // Calculate total values for each category
//   const totalGenderValue = genderData?.reduce((total, item) => total + item.value, 0);

//   // Calculate percentage values for each category rounded to 2 decimal places
//   const genderPercentageData = genderData?.map((item) => ({
//     id: item.id,
//     value: (item.value / totalGenderValue) * 100, // Keep value as number
//     label: item.label,
//   }));

//   // setGenderData(filteredData);
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Card>
//         <Grid p={3} container>
//           <Grid sm={2}>
//             {" "}
//             <MDTypography variant="h5">Diversity Report</MDTypography>
//           </Grid>

//           <Grid sm={2}>
//             {" "}
//             <Autocomplete
//               options={options}
//               getOptionLabel={(option) => option.label}
//               value={options.find((option) => option.value === selectedOption) || null}
//               onChange={(event, newValue) => {
//                 setSelectedOption(newValue?.value || "gender");
//               }}
//               renderInput={(params) => <TextField {...params} label="Based On" />}
//             />
//           </Grid>

//           <Grid item xs={12} sm={8} display="flex" justifyContent="flex-end">
//             <MDTypography
//               variant="button"
//               color="info"
//               fontWeight="medium"
//               textGradient
//               onClick={() => setFilterOption(true)}
//             >
//               <FilterListIcon fontSize="large" />
//             </MDTypography>
//           </Grid>
//           {filterOption === true ? (
//             <>
//               {" "}
//               <Grid item xs={12} sm={3}>
//                 <Autocomplete
//                   // sx={{ width: "70%" }}
//                   filterSelectedOptions={true}
//                   autoHighlight={true}
//                   limitTags={2}
//                   selectOnFocus={true}
//                   includeInputInList={true}
//                   sx={{ color: blue }}
//                   getLimitTagsText={(more) => {
//                     return `+${more} more`;
//                   }}
//                   // multiple
//                   onChange={(event: any, value: any) => {
//                     handleChange({ target: { name: "department", value } });
//                   }}
//                   // value={department}
//                   // onChange={handleMainFieldChange}
//                   options={dept_name}
//                   renderInput={(params: any) => (
//                     <FormField
//                       label={"Department"}
//                       // InputLabelProps={{ shrink: true }}
//                       required
//                       name="department"
//                       placeholder="Enter Your department"
//                       onChange={handleChange}
//                       value={values.department}
//                       {...params}
//                       onBlur={handleBlur}
//                       error={errors.department && touched.department}
//                       success={!errors.department}
//                       variant="standard"
//                     />
//                   )}
//                 />
//                 {errors.department && touched.department ? (
//                   // <p className="form-error">{errors.name}</p>
//                   <MDTypography variant="caption" fontWeight="regular" color="error">
//                     {errors.department}
//                   </MDTypography>
//                 ) : null}
//               </Grid>
//               <Grid item xs={12} sm={3.2}>
//                 <Autocomplete
//                   // sx={{ width: "70%" }}
//                   filterSelectedOptions={true}
//                   multiple
//                   autoHighlight={true}
//                   limitTags={2}
//                   selectOnFocus={true}
//                   includeInputInList={true}
//                   sx={{ color: blue }}
//                   getLimitTagsText={(more) => {
//                     return `+${more} more`;
//                   }}
//                   onChange={(event: any, value: any) => {
//                     handleChange({ target: { name: "designation", value } });
//                   }}
//                   // value={department}
//                   // onChange={handleMainFieldChange}
//                   options={des_name}
//                   renderInput={(params: any) => (
//                     <FormField
//                       required
//                       label={"Designation"}
//                       InputLabelProps={{ shrink: true }}
//                       name="designation"
//                       placeholder="Enter Your designation"
//                       onChange={handleChange}
//                       value={values.designation}
//                       {...params}
//                       onBlur={handleBlur}
//                       error={errors.designation && touched.designation}
//                       success={!errors.designation}
//                       variant="standard"
//                     />
//                   )}
//                 />
//                 {errors.designation && touched.designation ? (
//                   // <p className="form-error">{errors.name}</p>
//                   <MDTypography variant="caption" fontWeight="regular" color="error">
//                     {errors.designation}
//                   </MDTypography>
//                 ) : null}
//               </Grid>
//               <Grid item xs={12} sm={3.8}>
//                 {/* <Autocomplete
//                   sx={{ width: "70%" }}
//                   // multiple
//                   onChange={(event: any, value: any) => {
//                     handleChange({ target: { name: "location", value } });
//                   }}
//                   // value={department}
//                   // onChange={handleMainFieldChange}
//                   options={location_name}
//                   //   options={["v", "gfr"]}
//                   renderInput={(params: any) => (
//                     <FormField
//                       label={"Location"}
//                       InputLabelProps={{ shrink: true }}
//                       name="location"
//                       placeholder="Enter Your location"
//                       onChange={handleChange}
//                       value={values.location}
//                       {...params}
//                       onBlur={handleBlur}
//                       error={errors.location && touched.location}
//                       success={!errors.location}
//                       variant="standard"
//                     />
//                   )}
//                 /> */}
//                 <Autocomplete
//                   // sx={{ width: "70%" }}
//                   multiple
//                   filterSelectedOptions={true}
//                   autoHighlight={true}
//                   limitTags={2}
//                   selectOnFocus={true}
//                   includeInputInList={true}
//                   sx={{ color: blue }}
//                   getLimitTagsText={(more) => {
//                     return `+${more} more`;
//                   }}
//                   onChange={(event: any, value: any) => {
//                     handleChange({ target: { name: "location", value } });
//                     // Call fetchRoles function with the selected location value
//                     // fetchRoles(value);
//                   }}
//                   options={location_name}
//                   renderInput={(params: any) => (
//                     <FormField
//                       required
//                       label={"Location"}
//                       InputLabelProps={{ shrink: true }}
//                       name="location"
//                       placeholder="Enter Your location"
//                       onChange={handleChange}
//                       value={values.location}
//                       {...params}
//                       onBlur={handleBlur}
//                       error={errors.location && touched.location}
//                       success={!errors.location}
//                       variant="standard"
//                     />
//                   )}
//                 />

//                 {errors.location && touched.location ? (
//                   // <p className="form-error">{errors.name}</p>
//                   <MDTypography variant="caption" fontWeight="regular" color="error">
//                     {errors.location}
//                   </MDTypography>
//                 ) : null}
//               </Grid>
//               <Grid item xs={12} sm={2} display="flex" justifyContent="flex-end">
//                 <MDButton variant="gradient" color="info" type="submit">
//                   {"Save"}
//                 </MDButton>
//               </Grid>
//             </>
//           ) : (
//             ""
//           )}
//         </Grid>

//         <Grid container>
//           {/* <div style={{ display: selectedOption === "gender" ? "block" : "none" }}>
//             <PieChart series={[{ data: genderPercentageData }]} width={700} height={300} />
//           </div>
//           <div style={{ display: selectedOption === "age" ? "block" : "none" }}>
//             <PieChart series={[{ data: agePercentageData }]} width={700} height={300} />
//           </div> */}
//           <div style={{ display: selectedOption === "gender" ? "block" : "none" }}>
//             <PieChart
//               series={[{ data: genderPercentageData }]}
//               width={700}
//               height={300}
//               onClick={(event, data) => {
//                 setClickedSliceData(data);
//                 setIsSliceClicked(true);
//               }}
//             />
//           </div>

//           <div style={{ display: selectedOption === "age" ? "block" : "none" }}>
//             <PieChart
//               series={[{ data: agePercentageData }]}
//               width={700}
//               height={300}
//               onClick={(event, data) => {
//                 setClickedSliceData(data);
//                 setIsSliceClicked(true);
//               }}
//             />
//           </div>
//         </Grid>
//         {tabledata?.length > 0 ? <DataTable table={dataTableData} /> : ""}
//       </Card>
//     </DashboardLayout>
//   );
// }

import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Card from "@mui/material/Card";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import { Grid, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import StraightIcon from "@mui/icons-material/Straight";
import FilterListIcon from "@mui/icons-material/FilterList";
import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import FormField from "../account/components/FormField";
import { useSelector } from "react-redux";
import MDButton from "components/MDButton";
import { blue } from "@mui/material/colors";
import DataTable from "examples/Tables/DataTable";

import autoTable from "jspdf-autotable";
import { jsPDF } from "jspdf";
const initialValues = {
  department: [] as string[],

  designation: [] as string[],

  location: [] as string[],

  gender: "",

  // marital_status: [] as string[],
};
export default function DiversityReport() {
  const [selectedOption, setSelectedOption] = useState("gender");
  const [filterOption, setFilterOption] = useState(false);
  const [clickedSliceData, setClickedSliceData] = useState(null);

  const [isSliceClicked, setIsSliceClicked] = useState(false);
  const [tabledata, setTabledata] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  // const genderData = [
  //   { id: 0, value: 15, label: "Female" },
  //   { id: 1, value: 20, label: "Male" },
  //   { id: 2, value: 2, label: "Others" },
  // ];

  // const ageData = [
  //   { id: 0, value: 23, color: "orange", label: "Age(18-25)", data: [{}] },
  //   { id: 1, value: 14, color: "blue", label: "Age(25-35)" },
  //   { id: 2, value: 5, color: "green", label: "Age(35 above)" },
  // ];

  // ... rest of your code remains unchanged

  // Calculate total values for each category
  const totalGenderValue = genderData?.reduce((total, item) => total + item.value, 0);
  const totalAgeValue = ageData.reduce((total, item) => total + item.value, 0);

  // Calculate percentage values for each category rounded to 2 decimal places
  const genderPercentageData = genderData?.map((item) => ({
    id: item.id,

    value: item.value,
    // value: parseFloat((item.value / totalGenderValue).toFixed(4)) * 100, // Convert to number
    label: item.label,
  }));
  // const genderPercentageData2 = {
  //   id: genderPercentageData.id,
  //   // value: (item.value / totalGenderValue) * 100, // Keep value as number
  //   value: genderPercentageData.value, // Convert to number
  //   label: genderPercentageData.label,
  // };

  console.log(genderPercentageData, totalGenderValue, "hdecoioeio");

  const agePercentageData = ageData.map((item) => ({
    id: item.id,
    value: parseFloat((item.value / totalAgeValue).toFixed(4)) * 100, // Convert to number

    label: item.label,
  }));

  const options = [
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
  ];

  // formik
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
  console.log(values, "values");
  const handleFormSubmit = async () => {
    try {
      console.log(values, "formdata");
      setFilterOption(false);
      let response;
      {
        selectedOption === "department"
          ? (response = await axios.post(
              "http://10.0.20.133:8000/apply_leave/report/department",
              values,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            ))
          : (response = await axios.post(
              "http://10.0.20.133:8000/employee/report/filter/gender ",
              values,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            ));
      }

      console.log(response);

      if (response.status === 200) {
        console.log(" Created Employee Successfully");
        setGenderData(response.data);
        setAgeData(response.data);
        message.success(" Created Employee Successfully");

        // setIsSubmit(true);
        // navigate("/pages/employee/employee-invitation");
        // setDataSubmitted(true);
        // console.log(dataSubmitted, isSubmit, "hj wdjkdx");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // dep des location data
  const WorkLocation = useSelector((state: any) => state.workLocationData);
  console.log("WorkLocation", WorkLocation);

  const location_name = [];

  if (WorkLocation && WorkLocation?.length > 0) {
    const uniqueLocationNames = new Set();

    for (let i = 0; i < WorkLocation?.length; i++) {
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

  if (Department && Department?.length > 0) {
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

  if (Designation && Designation?.length > 0) {
    const uniqueDesignationNames = new Set();

    for (let i = 0; i < Designation?.length; i++) {
      const DesignationName = Designation[i]["des_name"];
      uniqueDesignationNames.add(DesignationName);
    }

    // Convert the Set to an array if needed
    des_name.push(...uniqueDesignationNames);
  }

  console.log(des_name, "DesignationName");
  console.log(clickedSliceData, "clickedSliceData");
  // post the data of selected part of pi and get data for that table
  useEffect(() => {
    if (isSliceClicked && clickedSliceData) {
      const fetchData = async () => {
        try {
          let responsetabledata;
          if (selectedOption === "age" && ageData[clickedSliceData.dataIndex]) {
            const formValues = {
              ...values,
              label: ageData[clickedSliceData.dataIndex].label,
              value: ageData[clickedSliceData.dataIndex].value,
            };
            responsetabledata = await axios.post(
              "http://10.0.20.133:8000/employee/report/filter/age",
              formValues,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } else if (selectedOption === "gender" && genderData[clickedSliceData.dataIndex]) {
            const formValues = {
              ...values,
              label: genderData[clickedSliceData.dataIndex].label,
              value: genderData[clickedSliceData.dataIndex].value,
            };
            responsetabledata = await axios.post(
              "http://10.0.20.133:8000/employee/report/filter/gender",
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
  }, [isSliceClicked, clickedSliceData, selectedOption, ageData, genderData, values, token]);

  // pdf print

  // datatable
  const dataTableData = {
    columns: [
      { Header: `${"Employee Name"}`, accessor: "name" },
      { Header: `${"Department "}`, accessor: "department" },
      { Header: `${"Designation "}`, accessor: "designation" },
      { Header: `${"Gender "}`, accessor: "gender" },

      // { Header: `${"action"}`, accessor: "action" },
    ],

    rows: Array.isArray(tabledata)
      ? tabledata.map(
          (
            row: {
              name: any;
              designation: any;
              department: any;
              gender: any;
              //   email_id: any;
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

  // get genderdata
  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/employee/report/gender", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setGenderData(response.data);
        // setTasks(response.data); //updating dialog box
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // get agedata
  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/employee/report/age", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAgeData(response.data);
        // setTasks(response.data); //updating dialog box
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // Filter the data

  // setGenderData(filteredData);
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
                setSelectedOption(newValue?.value || "gender");
              }}
              renderInput={(params) => <TextField {...params} label="Based On" />}
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
                    handleChange({ target: { name: "department", value } });
                  }}
                  // value={department}
                  // onChange={handleMainFieldChange}
                  options={dept_name}
                  renderInput={(params: any) => (
                    <FormField
                      label={"Department"}
                      // InputLabelProps={{ shrink: true }}
                      required
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
          {/* <div style={{ display: selectedOption === "gender" ? "block" : "none" }}>
            <PieChart series={[{ data: genderPercentageData }]} width={700} height={300} />
          </div>
          <div style={{ display: selectedOption === "age" ? "block" : "none" }}>
            <PieChart series={[{ data: agePercentageData }]} width={700} height={300} />
          </div> */}
          <div style={{ display: selectedOption === "gender" ? "block" : "none" }}>
            {genderData ? (
              <PieChart
                series={[
                  {
                    data: genderPercentageData,
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
              <MDTypography>Data not Found</MDTypography>
            )}
          </div>

          <div style={{ display: selectedOption === "age" ? "block" : "none" }}>
            <PieChart
              series={[
                {
                  data: agePercentageData,
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
