import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Addemployee from "./addemployee";
import Updatesalary from "./updatesalary";

const updateemployee = () => {
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Addemployee />
        <Updatesalary />
      </DashboardLayout>
    </>
  );
};

export default updateemployee;
// import React from "react";

// import { organisationSchema } from "./schema";
// import axios from "axios";

// import Autocomplete from "@mui/material/Autocomplete";

// import Cookies from "js-cookie";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import MDBox from "components/MDBox";
// import FormField from "layouts/applications/wizard/components/FormField";
// import Checkbox from "@mui/material/Checkbox";
// import { useFormik } from "formik";
// import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";
// import DataTable from "examples/Tables/DataTable";
// import EditIcon from "@mui/icons-material/Edit";
// import Switch from "@mui/material/Switch";

// import {
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   InputAdornment,
//   Radio,
//   RadioGroup,
//   TextField,
// } from "@mui/material";
// import MDInput from "components/MDInput";
// import { useDispatch, useSelector } from "react-redux";
// import { storeEmployeeData, storeRoleseData } from "Redux/action/dummyDataActions";
// import { Input, message } from "antd";
// import { useNavigate } from "react-router-dom";
// const token = Cookies.get("token");
// interface Values {
//   annual_ctc: number;
//   percentofctc: number;
// }
// const location_name: any[] = [];
// const EmployeeUpdation = () => {
//   const dispatched = useDispatch();
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const [employee, setEmployee] = React.useState({});
//   const [roles, setRoles] = React.useState([]);
//   const [selectedlocation, setSelectedlocation] = React.useState({});
//   const WorkLocation = useSelector((state: any) => state.workLocationData);
//   console.log("WorkLocation", WorkLocation);
//   console.log("state", state);
//   const location_name = [];
//   const [selectedOptions, setSelectedOptions] = useState([]); // State to store selected options
//   const [selecteddeduction, setSelectedDeduction] = useState([]);
//   type AllEarningsType = {
//     earning_types: Array<{
//       // Properties of each item in the earning_types array
//       earning_type_name: string;
//       calculation_type: string;
//       // Add other properties as needed
//     }>;
//     pre_tax_deductions: Array<{
//       deduction_with: string;
//       pre_name_slip: string;
//       employee_contribution_ctc: boolean;
//       calculate_prorata_basis: boolean;
//       mark_as_active: boolean;
//       location_name: string;
//     }>;
//     epf_data: Array<{
//       epf_number: string;
//       epf_deduction_cycle: string;
//       employee_contribution_rate: string;
//       employer_contribution_rate: string;
//       employer_contribution_ctc: [];
//       contribution_at_employee_level: string;
//       configuration_lop_applied: [];
//       abry_eligibility: string;
//     }>;
//   };
//   const [basic, setBasic] = useState(0);
//   const [allEarnings, setAllEarnings] = useState<AllEarningsType>({
//     earning_types: [],
//     pre_tax_deductions: [],
//     epf_data: [],
//   });
//   const initialValues = {
//     department: state?.department || "",
//     annual_ctc: 12000,
//     template_name: "A+",
//     percentofctc: 50,
//     percentofbasic: 50,
//     monthlybasicsalary: 0,
//     convinienceallownce: 0,
//     designation: state?.designation || "",
//     email: state?.email || "",
//     first_name: state?.first_name || "",
//     last_name: state?.last_name || "",
//     nick_name: state?.nick_name || "",
//     location: state?.location || "",
//     role: state?.role || "",
//     manager: state?.manager || "",
//     gender: state?.gender || "",
//     employee_type: state?.employee_type || "",
//     source_of_hire: state?.source_of_hire || "",
//     joining_date: state?.joining_date || "",
//     dob: state?.dob || "",
//     about_me: state?.about_me || "",
//     Expertise: state?.Expertise || "",
//     uan: state?.uan || "",
//     pan: state?.department || "",
//     aadhaar: state?.pan || "",
//     ph_num: state?.department || "",
//     person_ph_num: state?.department || "",
//     personalemail_id: state?.department || "",
//     seating_location: state?.department || "",
//     Tags: state?.department || "",
//     presentaddress: state?.department || "",
//     permanentaddress: state?.department || "",
//     company_name: state?.department || "",
//     job_title: state?.department || "",
//     from_date: state?.department || "",
//     to_date: state?.department || "",
//     job_description: state?.department || "",
//     institute_name: state?.department || "",
//     degree: state?.department || "",
//     specialization: state?.department || "",
//     date_of_completion: state?.department || "",
//     name: state?.department || "",
//     relationship: state?.department || "",
//     ddob: state?.department || "",
//     education_details: [] as object[],
//     dependent_details: [] as object[],
//     marital_status: "",
//     work_experience: [] as object[],

//     template_description: "",

//     employers_contribution: "",
//     pre_tax_name: allEarnings?.pre_tax_deductions?.map((item) => ({
//       pre_tax_id: item.pre_name_slip,
//       calculation_type: "Flat Amount",
//       monthly_amount: "",
//       enter_amount_or_percent: 0,
//     })),
//     earnings_type_name:
//       allEarnings?.earning_types?.map((item: any) => ({
//         earnings_id: item.earning_type_name,
//         calculation_type: item.calculation_type,
//         monthly_amount: "",
//         enter_amount_or_percent: item.enter_amount_or_percent,
//       })) || [],
//     epf: [
//       {
//         epf_id: "",
//         calculation_type: "",
//         monthly_amount: "",
//       },
//     ],
//   };
//   if (WorkLocation && WorkLocation.length > 0) {
//     const uniqueLocationNames = new Set();

//     for (let i = 0; i < WorkLocation.length; i++) {
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

//   if (Department && Department.length > 0) {
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

//   if (Designation && Designation.length > 0) {
//     const uniqueDesignationNames = new Set();

//     for (let i = 0; i < Designation.length; i++) {
//       const DesignationName = Designation[i]["des_name"];
//       uniqueDesignationNames.add(DesignationName);
//     }

//     // Convert the Set to an array if needed
//     des_name.push(...uniqueDesignationNames);
//   }

//   console.log(des_name, "DesignationName");
//   // rolesstoration
//   const role_display_name = [];

//   if (roles && roles.length > 0) {
//     const uniquerolesNames = new Set();

//     for (let i = 0; i < roles.length; i++) {
//       const rolesName = roles[i]["role_display_name"];
//       console.log(rolesName, "rolesName");

//       uniquerolesNames.add(rolesName);
//     }

//     // Convert the Set to an array if needed
//     role_display_name.push(...uniquerolesNames);
//   }

//   console.log(role_display_name, "role_display_name");

//   const EmployeeData = useSelector((state: any) => state.employeeData);
//   console.log("EmployeeDatagggggggg", EmployeeData);
//   const emoployee_name = [];
//   // const manager_name = [];
//   const employees = [];
//   if (EmployeeData && EmployeeData.length > 0) {
//     const uniqueEmployeeDataNames = new Set();

//     for (let i = 0; i < EmployeeData.length; i++) {
//       const { first_name, last_name } = EmployeeData[i];
//       // const employeeObject = { first_name, last_name, full_name: `${first_name} ${last_name}` };
//       // manager_name.push(employeeObject);
//       const fullName = last_name ? `${first_name} ${last_name}` : first_name;
//       employees.push({ label: fullName, value: { first_name, last_name } });
//       uniqueEmployeeDataNames.add(fullName);
//     }

//     // Convert the Set to an array if needed
//     emoployee_name.push(...uniqueEmployeeDataNames);
//   }
//   console.log(emoployee_name, "EmployeeDataName");
//   // manager_name.push(emoployee_name?.full_name);
//   // console.log(manager_name, "manager_name");
//   // Fetch Roles

//   const fetchRoles = async (location_name: undefined) => {
//     try {
//       const response = await axios.post(
//         "http://10.0.20.133:8000/mg_roles/get_roles_by_location ",
//         { location_name }, // Send the location as part of the request body
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log(response, "response");

//       const roles = await response.data;
//       console.log(roles, typeof roles);
//       setRoles(roles);
//     } catch (error) {
//       console.log("Error fetching classdata:", error);
//     }
//   };
//   React.useEffect(() => {
//     dispatched(storeRoleseData(roles));
//   }, [dispatched, roles]);
//   const epf = allEarnings.epf_data.length > 0 ? allEarnings.epf_data[0] : null;

//   const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
//     initialValues,
//     validationSchema: organisationSchema,
//     enableReinitialize: true,
//     onSubmit: (values: any, action: { resetForm: () => void }) => {
//       console.log(" ~ file: Registration.jsx ~ line 11 ~ Registration ~ values", values);
//       action.resetForm();
//     },
//   });

//   const handleFormSubmit = async () => {
//     try {
//       console.log(values, "formdata");

//       const response = await axios.put("http://10.0.20.133:8000/employee", values, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log(response);

//       if (response.status === 200) {
//         console.log(" Updated Employee Successfully");
//         message.success(" Updated Employee Successfully");
//         // setIsSubmit(true);
//         navigate("/pages/employee/showemployee");
//         // setDataSubmitted(true);
//         // console.log(dataSubmitted, isSubmit, "hj wdjkdx");
//       }
//     } catch (error) {
//       console.error("Error saving data:", error);
//     }
//   };
//   // feching employee
//   useEffect(() => {
//     fetchEmployee(); // Fetch data from API on component mount
//   }, []);

//   const fetchEmployee = async () => {
//     try {
//       const response = await fetch("http://10.0.20.133:8000/employee", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const employee = await response.json();
//       console.log(employee, typeof employee);
//       setEmployee(employee);
//     } catch (error) {
//       console.log("Error fetching classdata:", error);
//     }
//   };
//   React.useEffect(() => {
//     dispatched(storeEmployeeData(employee));
//   }, [dispatched, employee]);

//   // calculating basicctcmothly%
//   const ctcbasic =
//     values.annual_ctc && values.percentofctc
//       ? ((values.percentofctc / 100) * values.annual_ctc) / 12
//       : 0;
//   // calculating housingrentmothly%
//   const housingrent = values.percentofbasic ? (values.percentofbasic / 100) * ctcbasic : 0;

//   const fixedallownce =
//     values.annual_ctc / 12 - (ctcbasic + housingrent + values.convinienceallownce);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://10.0.20.133:8000/employee_salary_details/combined_data",
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         if (response.status === 200) {
//           // console.log(response.data, "all earning data");
//           setAllEarnings(response.data);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, []);
//   const dataTableData = {
//     columns: [
//       { Header: "SALARY COMPONENTS", accessor: "salary_component", width: "25%" },
//       { Header: "CALCULATION TYPE", accessor: "calculation_type", width: "25%" },
//       { Header: "MONTHLY AMOUNT", accessor: "monthly_amount", width: "25%" },
//       { Header: "ANNUAL AMOUNT", accessor: "annual_amount", width: "25%" },
//     ],
//     rows: [
//       {
//         salary_component: (
//           <MDTypography variant="h6" color="text">
//             EARNINGS
//           </MDTypography>
//         ),
//       },
//       ...values.earnings_type_name.map((earnings: any, index: any) => {
//         return {
//           salary_component: earnings.earnings_id,
//           calculation_type: (
//             <Input
//               addonAfter={earnings.calculation_type}
//               type="number"
//               name={`earnings_type_name[${index}].enter_amount_or_percent`}
//               value={values.earnings_type_name[index]?.enter_amount_or_percent}
//               onChange={handleChange}
//               style={{ width: 150 }}
//             />
//           ),
//           monthly_amount:
//             earnings.calculation_type === "% of CTC"
//               ? parseFloat(
//                   ((values.annual_ctc / 100) * (earnings.enter_amount_or_percent / 12)).toFixed(2)
//                 )
//               : earnings.calculation_type === "Flat Amount"
//               ? parseFloat((earnings.enter_amount_or_percent / 12).toFixed(2))
//               : earnings.calculation_type === "% of Basic"
//               ? parseFloat(((basic / 100) * (earnings.enter_amount_or_percent / 12)).toFixed(2))
//               : null,
//           annual_amount:
//             earnings.calculation_type === "% of CTC"
//               ? parseFloat(
//                   ((values.annual_ctc / 100) * (earnings.enter_amount_or_percent / 12)).toFixed(2)
//                 ) * 12
//               : earnings.calculation_type === "Flat Amount"
//               ? parseFloat((earnings.enter_amount_or_percent / 12).toFixed(2)) * 12
//               : earnings.calculation_type === "% of Basic"
//               ? parseFloat(((basic / 100) * (earnings.enter_amount_or_percent / 12)).toFixed(2)) *
//                 12
//               : null,
//         };
//       }),
//       {
//         salary_component: (
//           <MDTypography variant="h6" color="text">
//             DEDUCTIONS
//           </MDTypography>
//         ),
//       },
//       ...values.pre_tax_name.map((deduction: any, index: any) => {
//         return {
//           salary_component: deduction.pre_tax_id,
//           calculation_type: (
//             <Input
//               addonAfter={deduction.calculation_type}
//               type="number"
//               name={`pre_tax_name[${index}].enter_amount_or_percent`}
//               value={values.pre_tax_name[index]?.enter_amount_or_percent}
//               onChange={handleChange}
//               style={{ width: 200 }}
//             />
//           ),
//           monthly_amount:
//             deduction.calculation_type === "% of CTC"
//               ? parseFloat(
//                   ((values.annual_ctc / 100) * (deduction.enter_amount_or_percent / 12)).toFixed(2)
//                 )
//               : deduction.calculation_type === "Flat Amount"
//               ? parseFloat((deduction.enter_amount_or_percent / 12).toFixed(2))
//               : deduction.calculation_type === "% of Basic"
//               ? parseFloat(((basic / 100) * (deduction.enter_amount_or_percent / 12)).toFixed(2))
//               : null,
//           annual_amount:
//             deduction.calculation_type === "% of CTC"
//               ? parseFloat(
//                   (
//                     (values.annual_ctc / 100) *
//                     (deduction.enter_amount_or_percent / 12) *
//                     12
//                   ).toFixed(2)
//                 ) * 12
//               : deduction.calculation_type === "Flat Amount"
//               ? parseFloat(((deduction.enter_amount_or_percent / 12) * 12).toFixed(2)) * 12
//               : deduction.calculation_type === "% of Basic"
//               ? parseFloat(
//                   ((basic / 100) * (deduction.enter_amount_or_percent / 12) * 12).toFixed(2)
//                 )
//               : null,
//         };
//       }),

//       {
//         salary_component:
//           epf && epf.employer_contribution_ctc && epf.employer_contribution_ctc.length !== 0
//             ? "EPF - Employer Contribution"
//             : null,
//         calculation_type: epf ? epf.employer_contribution_rate : null,
//         monthly_amount: "",
//       },
//     ],
//   };

//   useEffect(() => {
//     values.earnings_type_name.map((earnings: any, index: any) => ({
//       ...earnings,
//       monthly_amount:
//         earnings.calculation_type === "% of CTC"
//           ? (parseFloat(
//               ((values.annual_ctc / 100) * (earnings.enter_amount_or_percent / 12)).toFixed(2)
//             ),
//             setBasic(
//               parseFloat(((values.annual_ctc / 100) * earnings.enter_amount_or_percent).toFixed(2))
//             ))
//           : null,
//     }));
//   }, [values.annual_ctc]);

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Card>
//         <form onSubmit={handleSubmit}>
//           <MDBox p={2}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={9}>
//                 <MDTypography variant="h5">{"Update Employee Details"}</MDTypography>
//               </Grid>
//               <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
//                 <MDButton variant="gradient" color="info" type="submit" onClick={handleFormSubmit}>
//                   {"Save"}
//                 </MDButton>
//               </Grid>
//             </Grid>
//           </MDBox>
//           <MDBox p={3}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={9}>
//                 <MDTypography variant="h6">{"Basic Details"}</MDTypography>
//               </Grid>
//               <Grid item xs={12} sm={4} mt={-3}>
//                 <FormField
//                   type="name"
//                   label="First name"
//                   name="first_name"
//                   required
//                   value={values.first_name}
//                   placeholder="Enter Your First name"
//                   variant="standard"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={errors.first_name && touched.first_name}
//                   success={values.first_name.length && !errors.first_name}
//                 />
//                 {errors.first_name && touched.first_name ? (
//                   // <p className="form-error">{errors.name}</p>
//                   <MDTypography variant="caption" fontWeight="regular" color="error">
//                     {errors.first_name}
//                   </MDTypography>
//                 ) : null}
//               </Grid>
//               <Grid item xs={12} sm={4} mt={-3}>
//                 <FormField
//                   type="name"
//                   label="Last Name"
//                   name="last_name"
//                   required
//                   value={values.last_name}
//                   placeholder="Enter Your Last Name"
//                   variant="standard"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={errors.last_name && touched.last_name}
//                   success={values.last_name.length && !errors.last_name}
//                 />
//                 {errors.last_name && touched.last_name ? (
//                   // <p className="form-error">{errors.name}</p>
//                   <MDTypography variant="caption" fontWeight="regular" color="error">
//                     {errors.last_name}
//                   </MDTypography>
//                 ) : null}
//               </Grid>
//               <Grid item xs={12} sm={4} mt={-3}>
//                 <FormField
//                   type="name"
//                   label="Email"
//                   name="email"
//                   required
//                   value={values.email}
//                   placeholder="Enter Your  Email "
//                   variant="standard"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={errors.email && touched.email}
//                   success={values.email.length && !errors.email}
//                 />
//                 {errors.email && touched.email ? (
//                   // <p className="form-error">{errors.name}</p>
//                   <MDTypography variant="caption" fontWeight="regular" color="error">
//                     {errors.email}
//                   </MDTypography>
//                 ) : null}
//               </Grid>
//               <Grid item xs={12} sm={9}>
//                 <MDTypography variant="h6">{"Work Information"}</MDTypography>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Autocomplete
//                   sx={{ width: "70%" }}
//                   defaultValue={state?.department}
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
//               <Grid item xs={12} sm={4}>
//                 <Autocomplete
//                   sx={{ width: "70%" }}
//                   // multiple
//                   defaultValue={state?.designation}
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
//               <Grid item xs={12} sm={4}>
//                 <Autocomplete
//                   sx={{ width: "70%" }}
//                   defaultValue={state?.location}
//                   onChange={(event: any, value: any) => {
//                     handleChange({ target: { name: "location", value } });
//                     // Call fetchRoles function with the selected location value
//                     fetchRoles(value);
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
//               <Grid item xs={12} sm={4}>
//                 <Autocomplete
//                   sx={{ width: "70%" }}
//                   // multiple
//                   defaultValue={state?.role}
//                   onChange={(event: any, value: any) => {
//                     handleChange({ target: { name: "role", value } });
//                   }}
//                   // value={department}
//                   // onChange={handleMainFieldChange}
//                   options={role_display_name}
//                   renderInput={(params: any) => (
//                     <FormField
//                       label={"Role"}
//                       required
//                       InputLabelProps={{ shrink: true }}
//                       name="role"
//                       placeholder="Enter Your role"
//                       onChange={handleChange}
//                       value={values.role}
//                       {...params}
//                       onBlur={handleBlur}
//                       error={errors.role && touched.role}
//                       success={!errors.role}
//                       variant="standard"
//                     />
//                   )}
//                 />
//                 {errors.role && touched.role ? (
//                   // <p className="form-error">{errors.name}</p>
//                   <MDTypography variant="caption" fontWeight="regular" color="error">
//                     {errors.role}
//                   </MDTypography>
//                 ) : null}
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Autocomplete
//                   sx={{ width: "70%" }}
//                   // multiple
//                   defaultValue={state?.employee_type}
//                   onChange={(event: any, value: any) => {
//                     handleChange({ target: { name: "employee_type", value } });
//                   }}
//                   // value={department}
//                   // onChange={handleMainFieldChange}
//                   options={["Permanent", "Temporary"]}
//                   renderInput={(params: any) => (
//                     <FormField
//                       required
//                       label={"Employee Type"}
//                       InputLabelProps={{ shrink: true }}
//                       name="employee_type"
//                       placeholder="Enter Your employee_type"
//                       onChange={handleChange}
//                       value={values.employee_type}
//                       {...params}
//                       onBlur={handleBlur}
//                       error={errors.employee_type && touched.employee_type}
//                       success={!errors.employee_type}
//                       variant="standard"
//                     />
//                   )}
//                 />
//                 {errors.employee_type && touched.employee_type ? (
//                   // <p className="form-error">{errors.name}</p>
//                   <MDTypography variant="caption" fontWeight="regular" color="error">
//                     {errors.employee_type}
//                   </MDTypography>
//                 ) : null}
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Autocomplete
//                   sx={{ width: "70%" }}
//                   // multiple
//                   defaultValue={state?.source_of_hire}
//                   onChange={(event: any, value: any) => {
//                     handleChange({ target: { name: "source_of_hire", value } });
//                   }}
//                   // value={department}
//                   // onChange={handleMainFieldChange}
//                   options={["Direct", "Referral", "Web"]}
//                   renderInput={(params: any) => (
//                     <FormField
//                       label={"Source Of Hire"}
//                       InputLabelProps={{ shrink: true }}
//                       name="source_of_hire"
//                       placeholder="Enter Your source_of_hire"
//                       onChange={handleChange}
//                       value={values.source_of_hire}
//                       {...params}
//                       onBlur={handleBlur}
//                       error={errors.source_of_hire && touched.source_of_hire}
//                       success={!errors.source_of_hire}
//                       variant="standard"
//                     />
//                   )}
//                 />
//                 {errors.source_of_hire && touched.source_of_hire ? (
//                   // <p className="form-error">{errors.name}</p>
//                   <MDTypography variant="caption" fontWeight="regular" color="error">
//                     {errors.source_of_hire}
//                   </MDTypography>
//                 ) : null}
//               </Grid>

//               <Grid item xs={12} sm={4}>
//                 <FormField
//                   type="date"
//                   InputLabelProps={{ shrink: true }}
//                   label="Joining Date"
//                   name="joining_date"
//                   required
//                   value={values.joining_date}
//                   placeholder="Enter Your Joining Date"
//                   variant="standard"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={errors.joining_date && touched.joining_date}
//                   success={values.joining_date.length && !errors.joining_date}
//                 />
//                 {errors.joining_date && touched.joining_date ? (
//                   // <p className="form-error">{errors.name}</p>
//                   <MDTypography variant="caption" fontWeight="regular" color="error">
//                     {errors.joining_date}
//                   </MDTypography>
//                 ) : null}
//               </Grid>
//               <Grid item xs={12} sm={9}>
//                 <MDTypography variant="h6">{"Hierarchy Information"}</MDTypography>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Autocomplete
//                   sx={{ width: "70%" }}
//                   options={employees}
//                   defaultValue={state?.manager}
//                   getOptionLabel={(option) => option.label} // Display employee's full name in the options
//                   onChange={(event, value) => {
//                     if (value) {
//                       const managerObject = value.value; // Extract manager's name in object format
//                       handleChange({ target: { name: "manager", value: managerObject } });
//                     } else {
//                       handleChange({ target: { name: "manager", value: null } });
//                     }
//                   }}
//                   renderInput={(params) => (
//                     <FormField
//                       required
//                       label={"Manager"}
//                       InputLabelProps={{ shrink: true }}
//                       name="manager"
//                       placeholder="Enter Your manager"
//                       onChange={handleChange}
//                       value={values.manager}
//                       {...params}
//                       onBlur={handleBlur}
//                       error={errors.manager && touched.manager}
//                       success={!errors.manager}
//                       variant="standard"
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={9}>
//                 <MDTypography variant="h6">{"Personal Details"}</MDTypography>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <FormField
//                   type="date"
//                   InputLabelProps={{ shrink: true }}
//                   label="Date of Birth"
//                   name="dob"
//                   required
//                   value={values.dob}
//                   placeholder="Enter Your Date of Birth"
//                   variant="standard"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={errors.dob && touched.dob}
//                   success={values.dob.length && !errors.dob}
//                 />
//                 {errors.dob && touched.dob ? (
//                   // <p className="form-error">{errors.name}</p>
//                   <MDTypography variant="caption" fontWeight="regular" color="error">
//                     {errors.dob}
//                   </MDTypography>
//                 ) : null}
//               </Grid>
//               <Grid item xs={9} sm={4}>
//                 <Autocomplete
//                   sx={{ width: "70%" }}
//                   // multiple
//                   defaultValue={state?.gender}
//                   onChange={(event: any, value: any) => {
//                     handleChange({ target: { name: "gender", value } });
//                   }}
//                   // value={department}
//                   // onChange={handleMainFieldChange}
//                   options={["female", "male"]}
//                   renderInput={(params: any) => (
//                     <FormField
//                       label={"Gender"}
//                       InputLabelProps={{ shrink: true }}
//                       name="gender"
//                       placeholder="Enter Your gender"
//                       onChange={handleChange}
//                       value={values.gender}
//                       {...params}
//                       onBlur={handleBlur}
//                       error={errors.gender && touched.gender}
//                       success={!errors.gender}
//                       variant="standard"
//                     />
//                   )}
//                 />
//                 {errors.gender && touched.gender ? (
//                   // <p className="form-error">{errors.name}</p>
//                   <MDTypography variant="caption" fontWeight="regular" color="error">
//                     {errors.gender}
//                   </MDTypography>
//                 ) : null}
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <FormField
//                   type="name"
//                   label="About Me "
//                   name="about_me"
//                   value={values.about_me}
//                   placeholder="Enter Your About Me"
//                   variant="standard"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={errors.about_me && touched.about_me}
//                   success={values.about_me.length && !errors.about_me}
//                 />
//                 {errors.about_me && touched.about_me ? (
//                   // <p className="form-error">{errors.name}</p>
//                   <MDTypography variant="caption" fontWeight="regular" color="error">
//                     {errors.about_me}
//                   </MDTypography>
//                 ) : null}
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <FormField
//                   type="name"
//                   label="Expertise"
//                   name="Expertise"
//                   value={values.Expertise}
//                   placeholder="Enter Your Expertise"
//                   variant="standard"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={errors.Expertise && touched.Expertise}
//                   success={values.Expertise.length && !errors.Expertise}
//                 />
//                 {errors.Expertise && touched.Expertise ? (
//                   // <p className="form-error">{errors.name}</p>
//                   <MDTypography variant="caption" fontWeight="regular" color="error">
//                     {errors.Expertise}
//                   </MDTypography>
//                 ) : null}
//               </Grid>
//             </Grid>
//           </MDBox>
//           <MDBox p={3}>
//             <MDTypography variant="h5">{"Update Salary  Details"}</MDTypography>
//             <Grid
//               container
//               spacing={3}
//               // p={2}
//               display="flex"
//               justifyContent="center"
//               alignItems="center"
//             >
//               <Grid item xs={12} sm={4}>
//                 <MDTypography variant="button" color="text" fontWeight="bold">
//                   Annual CTC *
//                 </MDTypography>
//                 <FormField
//                   type="number"
//                   label="Enter Amount"
//                   name="annual_ctc"
//                   value={values.annual_ctc}
//                   variant="outlined"
//                   onChange={handleChange}
//                 />
//               </Grid>
//             </Grid>

//             <DataTable
//               table={dataTableData}
//               isSorted={false}
//               entriesPerPage={false}
//               showTotalEntries={false}
//             />
//           </MDBox>
//         </form>
//       </Card>
//     </DashboardLayout>
//   );
// };

// export default EmployeeUpdation;
