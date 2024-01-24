// import * as React from "react";
// import PropTypes from "prop-types";
// import SwipeableViews from "react-swipeable-views";
// import { useTheme } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Zoom from "@mui/material/Zoom";
// import Fab from "@mui/material/Fab";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import UpIcon from "@mui/icons-material/KeyboardArrowUp";
// import { green } from "@mui/material/colors";
// import Box from "@mui/material/Box";
// import {
//   Autocomplete,
//   Card,
//   Checkbox,
//   FormControl,
//   FormControlLabel,
//   FormGroup,
//   FormLabel,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Radio,
//   RadioGroup,
//   Select,
// } from "@mui/material";
// import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
// import row from "antd/es/row";
// import MultipleSelectChip from "./chipSelect";
// import FormField from "layouts/applications/wizard/components/FormField";
// import CreateApplicableType from "./createApplicableType";
// import MDButton from "components/MDButton";
// import { useFormik } from "formik";
// import { leaveSchema } from "./schema";
// import axios from "axios";
// import Cookies from "js-cookie";
// const initialValues = {
//   leave_type_name: "",
//   leave_type_code: "",
//   leave_type: "",
//   description: "",
//   prorate_accural: "",
//   deduction_holidays: "",
//   efective_after_input: "",
//   efective_after_select: "",
//   efective_after_from: "",
//   accural_select1: "",
//   accural_select2: "",
//   accural_select3: "",
//   accural_select4: "",
//   accural_input: "",
//   reset_select1: "",
//   reset_select2: "",
//   reset_select3: "",
//   reset_select4: "",
//   reset_select5: "",
//   reset_select6: "",
//   reset_input1: "",
//   reset_input2: "",
//   reset_input3: "",
//   reset_input4: "",
//   opening_balance: "",
//   maximum_balance: "",
// };
// const selectData = {
//   gender: ["Male", "Female"],

//   skills: ["react", "vue", "angular", "svelte", "javascript"],
//   effectiveAter: ["Days", "Month", "Year"],
//   month: ["Jan", "Feb", "Mar"],
//   date: ["1st", "2nd", "3rd"],
//   type_accural: ["Yearly", "Monthly", "Weekly"],
//   accural_in: ["Current Accural ", "Next Accural"],
//   resetCarryForward: ["Carry Forward", "Carry Forward with Expiry", "Carry Forward with OverLimit"],
//   unit: ["Unit", "Percentage"],
//   effectiveFrom: ["Date of Confirmation", "Date of Joining"],
//   ProrateAccrual: ["Start of Policy", "Start and End of Policy", "Do not protrate"],
//   DeductibleHolidays: ["All Holiday", "Holiday on workdays"],
// };
// const EntitlementTable = () => {
// const [isChecked, setIsChecked] = React.useState(false);
// const [isPastChecked, setIsPastChecked] = React.useState(false);
// const [isFutureChecked, setIsFutureChecked] = React.useState(false);

// const [selectedOption, setSelectedOption] = React.useState("allow");
//   const [isCheckedReset, setIsCheckedReset] = React.useState(false);
//   const [additionalFields, setAdditionalFields] = React.useState([0]); // Initialize with one set of fields
//   const token = Cookies.get("token");

//   console.log("myname", token);
//   const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
//     initialValues,
//     validationSchema: leaveSchema,
//     enableReinitialize: true,
//     onSubmit: (values: any, action: { resetForm: () => void }) => {
//       console.log(" ~ file: Registration.jsx ~ line 11 ~ Registration ~ values", values);
//       action.resetForm();
//     },
//   });
//   const addMoreFields = () => {
//     setAdditionalFields([...additionalFields, additionalFields.length]);
//   };
//   const handleFormSubmit = async () => {
//     event.preventDefault();

//     try {
//       const formValues = {
//         ...values,
//         effictive_after:
//           values.efective_after_input + values.efective_after_select + values.efective_after_from,

//         accural:
//           values.accural_select1 +
//           values.accural_select2 +
//           values.accural_select3 +
//           values.accural_input +
//           values.accural_select4,

//         reset:
//           values.reset_select1 +
//           values.reset_select2 +
//           values.reset_select3 +
//           values.reset_input4 +
//           values.reset_input1 +
//           values.reset_select5 +
//           values.reset_input2 +
//           values.reset_input3 +
//           values.reset_select6 +
//           values.reset_input4,
//       };
//       ("");
//       console.log(formValues, "formdata");
//       const response = await axios.post("http://10.0.20.133:8001/mg_entitlement", [formValues], {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log(response);

//       if (response.status === 200) {
//         console.log("Created SchoolPage Successfully");
//       }
//     } catch (error) {
//       console.error("Error saving data:", error);
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       {" "}
//       {additionalFields.map((fieldIndex) => (
//         <div key={fieldIndex}>
//           <Grid container spacing={3} p={3}>
//             <Grid sm={1.5}>
//               <MDTypography variant="body2">Efective After</MDTypography>
//             </Grid>
//             <Grid xs={12} sm={5.5} container>
//               {/* <Grid xs={12} sm={4}></Grid>
//     <Grid xs={12} sm={6}></Grid> */}
//               <Grid xs={12} sm={5}>
//                 <MDInput
//                   type="number"
//                   min="10"
//                   max="100"
//                   name="efective_after_input"
//                   value={values.efective_after_input}
//                   // disabled={values.pastDate == "Past" ? false : true}
//                   // type="number"
//                   onChange={handleChange}
//                   sx={{ width: "40%" }}
//                 />
//               </Grid>
//               <Grid xs={12} sm={7}>
//                 <Autocomplete
//                   defaultValue="Year"
//                   // multiple

//                   onChange={(event, value) => {
//                     handleChange({ target: { name: "efective_after_select", value } });
//                   }}
//                   // value={department}
//                   // onChange={handleMainFieldChange}
//                   options={selectData.effectiveAter}
//                   renderInput={(params) => (
//                     <FormField
//                       label={""}
//                       InputLabelProps={{ shrink: true }}
//                       name="efective_after_select"
//                       onChange={handleChange}
//                       value={values.efective_after_select}
//                       {...params}
//                       variant="standard"
//                     />
//                   )}
//                 />
//               </Grid>
//             </Grid>
//             <Grid sm={4.5} container>
//               <Grid sm={4}>
//                 <MDTypography variant="body2" ml={5}>
//                   From
//                 </MDTypography>
//               </Grid>
//               <Grid sm={8}>
//                 <Autocomplete
//                   // multiple
//                   defaultValue="Date of Confirmation"
//                   onChange={(event, value) => {
//                     handleChange({ target: { name: "efective_after_from", value } });
//                   }}
//                   // value={department}
//                   // onChange={handleMainFieldChange}
//                   options={selectData.effectiveFrom}
//                   renderInput={(params) => (
//                     <FormField
//                       label={""}
//                       InputLabelProps={{ shrink: true }}
//                       name="efective_after_from"
//                       onChange={handleChange}
//                       value={values.efective_after_from}
//                       {...params}
//                       variant="standard"
//                     />
//                   )}
//                 />
//               </Grid>
//             </Grid>
//             <Grid>
//               <FormControlLabel
//                 label="Accrual"
//                 control={
//                   <Checkbox
//                     checked={isChecked}
//                     onChange={() => setIsChecked(!isChecked)}
//                     defaultChecked
//                   />
//                 }
//               />
//             </Grid>
//             {isChecked && (
//               <Grid item xs={12} container spacing={2} padding={3}>
//                 <Grid sm={2}>
//                   <Autocomplete
//                     defaultValue="Yearly"
//                     // multiple
//                     onChange={(event, value) => {
//                       handleChange({ target: { name: "accural_select1", value } });
//                     }}
//                     // value={department}
//                     // onChange={handleMainFieldChange}
//                     options={selectData.type_accural}
//                     renderInput={(params) => (
//                       <FormField
//                         label={""}
//                         InputLabelProps={{ shrink: true }}
//                         name="accural_select1"
//                         onChange={handleChange}
//                         value={values.accural_select1}
//                         {...params}
//                         variant="standard"
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid sm={0.8}>
//                   <MDTypography variant="body2" ml={4.5}>
//                     on
//                   </MDTypography>
//                 </Grid>
//                 <Grid sm={2}>
//                   <Autocomplete
//                     defaultValue="1st"
//                     // multiple
//                     onChange={(event, value) => {
//                       handleChange({ target: { name: "accural_select2", value } });
//                     }}
//                     // value={department}
//                     // onChange={handleMainFieldChange}
//                     options={selectData.date}
//                     renderInput={(params) => (
//                       <FormField
//                         label={""}
//                         InputLabelProps={{ shrink: true }}
//                         name="accural_select2"
//                         onChange={handleChange}
//                         value={values.accural_select2}
//                         {...params}
//                         variant="standard"
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid sm={2}>
//                   <Autocomplete
//                     defaultValue="Jan"
//                     // multiple
//                     onChange={(event, value) => {
//                       handleChange({ target: { name: "accural_select3", value } });
//                     }}
//                     // value={department}
//                     // onChange={handleMainFieldChange}
//                     options={selectData.month}
//                     renderInput={(params) => (
//                       <FormField
//                         label={""}
//                         InputLabelProps={{ shrink: true }}
//                         name="accural_select3"
//                         onChange={handleChange}
//                         value={values.accural_select3}
//                         {...params}
//                         variant="standard"
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid>
//                   <MDTypography ml={-2} mr={2} variant="body2">
//                     No. of Days
//                   </MDTypography>
//                 </Grid>
//                 <Grid sm={1.2}>
//                   <MDInput
//                     type="number"
//                     min="10"
//                     max="100"
//                     name="accural_input"
//                     value={values.accural_input}
//                     // disabled={values.pastDate == "Past" ? false : true}
//                     // type="number"
//                     onChange={handleChange}
//                     sx={{ width: "70%" }}
//                   />
//                 </Grid>
//                 <Grid sm={0.5}>
//                   <MDTypography variant="body2">in</MDTypography>
//                 </Grid>
//                 <Grid sm={2}>
//                   <Autocomplete
//                     defaultValue="Current Accural "
//                     // multiple
//                     onChange={(event, value) => {
//                       handleChange({ target: { name: "accural_select4", value } });
//                     }}
//                     // value={department}
//                     // onChange={handleMainFieldChange}
//                     options={selectData.accural_in}
//                     renderInput={(params) => (
//                       <FormField
//                         label={""}
//                         InputLabelProps={{ shrink: true }}
//                         name="accural_select4"
//                         onChange={handleChange}
//                         value={values.accural_select4}
//                         {...params}
//                         variant="standard"
//                       />
//                     )}
//                   />
//                 </Grid>
//               </Grid>
//             )}
//             <Grid>
//               <FormControlLabel
//                 label="Reset"
//                 control={
//                   <Checkbox
//                     checked={isCheckedReset}
//                     onChange={() => setIsCheckedReset(!isCheckedReset)}
//                     defaultChecked
//                   />
//                 }
//               />
//             </Grid>
//             {isCheckedReset && (
//               <Grid item xs={12} container spacing={2} padding={3}>
//                 <Grid mb={5} sm={3}>
//                   <Autocomplete
//                     defaultValue="Yearly"
//                     // multiple
//                     onChange={(event, value) => {
//                       handleChange({ target: { name: "reset_select1", value } });
//                     }}
//                     // value={department}
//                     // onChange={handleMainFieldChange}
//                     options={selectData.type_accural}
//                     renderInput={(params) => (
//                       <FormField
//                         label={""}
//                         InputLabelProps={{ shrink: true }}
//                         name="reset_select1"
//                         onChange={handleChange}
//                         value={values.reset_select1}
//                         {...params}
//                         variant="standard"
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid mb={5} sm={0.8}>
//                   <MDTypography variant="body2" ml={4.5}>
//                     on
//                   </MDTypography>
//                 </Grid>
//                 <Grid mb={5} sm={3}>
//                   <Autocomplete
//                     defaultValue="1st"
//                     // multiple
//                     onChange={(event, value) => {
//                       handleChange({ target: { name: "reset_select2", value } });
//                     }}
//                     // value={department}
//                     // onChange={handleMainFieldChange}
//                     options={selectData.date}
//                     renderInput={(params) => (
//                       <FormField
//                         label={""}
//                         InputLabelProps={{ shrink: true }}
//                         name="reset_select2"
//                         onChange={handleChange}
//                         value={values.reset_select2}
//                         {...params}
//                         variant="standard"
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid mb={5} sm={4.5} ml={1}>
//                   <Autocomplete
//                     defaultValue="Jan"
//                     // multiple
//                     onChange={(event, value) => {
//                       handleChange({ target: { name: "reset_select3", value } });
//                     }}
//                     // value={department}
//                     // onChange={handleMainFieldChange}
//                     options={selectData.month}
//                     renderInput={(params) => (
//                       <FormField
//                         label={""}
//                         InputLabelProps={{ shrink: true }}
//                         name="reset_select3"
//                         onChange={handleChange}
//                         value={values.reset_select3}
//                         {...params}
//                         variant="standard"
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid mb={5} sm={3}>
//                   <Autocomplete
//                     defaultValue="Carry Forward"
//                     // multiple
//                     onChange={(event, value) => {
//                       handleChange({ target: { name: "reset_select4", value } });
//                     }}
//                     // value={department}
//                     // onChange={handleMainFieldChange}
//                     options={selectData.resetCarryForward}
//                     renderInput={(params) => (
//                       <FormField
//                         label={""}
//                         InputLabelProps={{ shrink: true }}
//                         name="reset_select4"
//                         onChange={handleChange}
//                         value={values.reset_select4}
//                         {...params}
//                         variant="standard"
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid mb={5} sm={1.8} ml={3}>
//                   {/* <MDTypography ml={4.5}>on</MDTypography> */}
//                   <MDInput
//                     type="number"
//                     min="10"
//                     max="100"
//                     name="reset_input1"
//                     value={values.reset_input1}
//                     // disabled={values.pastDate == "Past" ? false : true}
//                     // type="number"
//                     onChange={handleChange}
//                     sx={{ width: "35%" }}
//                   />
//                 </Grid>
//                 <Grid mb={5} sm={3} ml={-10}>
//                   <Autocomplete
//                     defaultValue="Unit"
//                     // multiple
//                     onChange={(event, value) => {
//                       handleChange({ target: { name: "reset_select5", value } });
//                     }}
//                     // value={department}
//                     // onChange={handleMainFieldChange}
//                     options={selectData.unit}
//                     renderInput={(params) => (
//                       <FormField
//                         label={""}
//                         InputLabelProps={{ shrink: true }}
//                         name="reset_select5"
//                         onChange={handleChange}
//                         value={values.reset_select5}
//                         {...params}
//                         variant="standard"
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid mb={5} sm={2}>
//                   <MDTypography variant="body2" ml={2}>
//                     Max Limit
//                   </MDTypography>
//                 </Grid>
//                 <Grid mb={5} sm={1.8}>
//                   <MDInput
//                     type="number"
//                     min="10"
//                     max="100"
//                     name="reset_input2"
//                     value={values.reset_input2}
//                     // disabled={values.pastDate == "Past" ? false : true}
//                     // type="number"
//                     onChange={handleChange}
//                     sx={{ width: "35%" }}
//                   />
//                 </Grid>
//                 <Grid mb={5} sm={3}>
//                   <MDTypography variant="body2" ml={6.5}>
//                     Encashment
//                   </MDTypography>
//                 </Grid>
//                 <Grid mb={5} sm={1.8} ml={3}>
//                   {/* <MDTypography ml={4.5}>on</MDTypography> */}
//                   <MDInput
//                     type="number"
//                     min="10"
//                     max="100"
//                     name="reset_input3"
//                     value={values.reset_input3}
//                     // disabled={values.pastDate == "Past" ? false : true}
//                     // type="number"
//                     onChange={handleChange}
//                     sx={{ width: "35%" }}
//                   />
//                 </Grid>
//                 <Grid mb={5} sm={3} ml={-10}>
//                   <Autocomplete
//                     defaultValue="Unit"
//                     // multiple
//                     onChange={(event, value) => {
//                       handleChange({ target: { name: "reset_select6", value } });
//                     }}
//                     // value={department}
//                     // onChange={handleMainFieldChange}
//                     options={selectData.unit}
//                     renderInput={(params) => (
//                       <FormField
//                         label={""}
//                         InputLabelProps={{ shrink: true }}
//                         name="reset_select6"
//                         onChange={handleChange}
//                         value={values.reset_select6}
//                         {...params}
//                         variant="standard"
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid mb={5} sm={2} ml={2}>
//                   <MDTypography variant="body2">Max Limit</MDTypography>
//                 </Grid>
//                 <Grid mb={5} sm={1.8} ml={-2}>
//                   <MDInput
//                     type="number"
//                     min="10"
//                     max="100"
//                     name="reset_input4"
//                     value={values.reset_input4}
//                     // disabled={values.pastDate == "Past" ? false : true}
//                     // type="number"
//                     onChange={handleChange}
//                     sx={{ width: "35%" }}
//                   />
//                 </Grid>
//               </Grid>
//             )}
//             <Grid container spacing={3} p={5} mb={-2}>
//               <Grid sm={4}>
//                 <MDTypography variant="body2">Opening Balance</MDTypography>
//               </Grid>
//               <Grid sm={3}>
//                 <MDInput
//                   type="number"
//                   min="10"
//                   max="100"
//                   name="opening_balance"
//                   value={values.opening_balance}
//                   // disabled={values.pastDate == "Past" ? false : true}
//                   // type="number"
//                   onChange={handleChange}
//                   sx={{ width: "35%" }}
//                 />
//               </Grid>
//             </Grid>
//             <Grid container spacing={3} p={5} mb={-2}>
//               <Grid sm={4}>
//                 <MDTypography variant="body2">Maximum Balance</MDTypography>
//               </Grid>
//               <Grid sm={3}>
//                 <MDInput
//                   type="number"
//                   min="10"
//                   max="100"
//                   name="maximum_balance"
//                   value={values.maximum_balance}
//                   // disabled={values.pastDate == "Past" ? false : true}
//                   // type="number"
//                   onChange={handleChange}
//                   sx={{ width: "35%" }}
//                 />
//               </Grid>
//             </Grid>
//             <Grid container spacing={3} p={5} mb={-2}>
//               <Grid sm={4}>
//                 <MDTypography variant="body2">Prorate Accrual</MDTypography>
//               </Grid>
//               <Grid sm={3}>
//                 <Autocomplete
//                   defaultValue="Start of Policy"
//                   // multiple
//                   onChange={(event, value) => {
//                     handleChange({ target: { name: "prorate_accural", value } });
//                   }}
//                   // value={department}
//                   // onChange={handleMainFieldChange}
//                   options={selectData.ProrateAccrual}
//                   renderInput={(params) => (
//                     <FormField
//                       label={""}
//                       InputLabelProps={{ shrink: true }}
//                       name="prorate_accural"
//                       onChange={handleChange}
//                       value={values.prorate_accural}
//                       {...params}
//                       variant="standard"
//                     />
//                   )}
//                 />
//               </Grid>
//             </Grid>
//             <Grid container spacing={3} p={5} mb={-2}>
//               <Grid sm={4}>
//                 <MDTypography variant="body2">Deductible Holidays</MDTypography>
//               </Grid>
//               <Grid sm={3}>
//                 <Autocomplete
//                   defaultValue="All Holiday"
//                   // multiple
//                   onChange={(event, value) => {
//                     handleChange({ target: { name: "deduction_holidays", value } });
//                   }}
//                   // value={department}
//                   // onChange={handleMainFieldChange}
//                   options={selectData.DeductibleHolidays}
//                   renderInput={(params) => (
//                     <FormField
//                       label={""}
//                       InputLabelProps={{ shrink: true }}
//                       name="deduction_holidays"
//                       onChange={handleChange}
//                       value={values.deduction_holidays}
//                       {...params}
//                       variant="standard"
//                     />
//                   )}
//                 />
//               </Grid>
//             </Grid>
//           </Grid>
//         </div>
//       ))}
//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <MDButton
//           // variant="button"
//           color="info"
//           fontWeight="medium"
//           onClick={addMoreFields}
//           textGradient
//         >
//           Add New Policy
//         </MDButton>
//       </div>
//       <hr />
//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <MDButton
//           // variant="button"
//           type="submit"
//           color="info"
//           fontWeight="medium"
//           onClick={handleFormSubmit}
//           textGradient
//         >
//           Save
//         </MDButton>
//       </div>
//     </form>
//   );
// };

// export default EntitlementTable;

// ********************************main code ***********************************************

// import * as React from "react";
// import { useFormik } from "formik";
// import axios from "axios";
// import Cookies from "js-cookie";
// import {
//   Autocomplete,
//   Box,
//   Checkbox,
//   FormControlLabel,
//   Grid,
//   MenuItem,
//   Select,
//   TextField,
// } from "@mui/material";
// import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
// import FormField from "layouts/applications/wizard/components/FormField";
// import MDButton from "components/MDButton";

// const initialValues = {
//   entitlements: [
//     {
//       efective_after_input: "",
//       efective_after_select: "Year",
//       efective_after_from: "",
//       accrual: false,
//       accural_select1: "Yearly",
//       accural_select2: "1st",
//       accural_select3: "Jan",
//       accural_input: "",
//       accural_select4: "Current Accural",
//       reset: false,
//       reset_select1: "Yearly",
//       reset_select2: "1st",
//       reset_select3: "Jan",
//       reset_select4: "Carry Forward",
//       reset_input1: "",
//       reset_select5: "Unit",
//       reset_input2: "",
//       reset_input3: "",
//       reset_select6: "Unit",
//       reset_input4: "",
//       opening_balance: "",
//       maximum_balance: "",
//       prorate_accural: "Start of Policy",
//       deduction_holidays: "All Holiday",
//     },
//   ],
// };

// const selectData = {
//   gender: ["Male", "Female"],
//   skills: ["react", "vue", "angular", "svelte", "javascript"],
//   effectiveAter: ["Days", "Month", "Year"],
//   month: ["Jan", "Feb", "Mar"],
//   date: ["1st", "2nd", "3rd"],
//   type_accural: ["Yearly", "Monthly", "Weekly"],
//   accural_in: ["Current Accural", "Next Accural"],
//   resetCarryForward: ["Carry Forward", "Carry Forward with Expiry", "Carry Forward with OverLimit"],
//   unit: ["Unit", "Percentage"],
//   effectiveFrom: ["Date of Confirmation", "Date of Joining"],
//   ProrateAccrual: ["Start of Policy", "Start and End of Policy", "Do not prorate"],
//   DeductibleHolidays: ["All Holiday", "Holiday on workdays"],
// };

// const EntitlementTable = () => {
//   const [additionalFields, setAdditionalFields] = React.useState(1);
//   const [isChecked, setIsChecked] = React.useState(false);
//   const [isPastChecked, setIsPastChecked] = React.useState(false);
//   const [isFutureChecked, setIsFutureChecked] = React.useState(false);

//   const [selectedOption, setSelectedOption] = React.useState("allow");
//   const [isCheckedReset, setIsCheckedReset] = React.useState(false);

//   const token = Cookies.get("token");

//   const handleFormSubmit = async (formValues: any) => {
//     event.preventDefault();
//     try {
//       console.log(formValues, "formdata");
//       const response = await axios.post(
//         "http://10.0.20.133:8001/mg_entitlement",
//         formValues.entitlements,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log(response);

//       if (response.status === 200) {
//         console.log("Created SchoolPage Successfully");
//       }
//     } catch (error) {
//       console.error("Error saving data:", error);
//     }
//   };

//   const addNewPolicy = () => {
//     const newPolicy = {
//       efective_after_input: "",
//       efective_after_select: "",
//       efective_after_from: "",
//       accrual: false,
//       accural_select1: "",
//       accural_select2: "",
//       accural_select3: "",
//       accural_input: "",
//       accural_select4: " ",
//       reset: false,
//       reset_select1: "",
//       reset_select2: "",
//       reset_select3: "",
//       reset_select4: " ",
//       reset_input1: "",
//       reset_select5: "",
//       reset_input2: "",
//       reset_input3: "",
//       reset_select6: "",
//       reset_input4: "",
//       opening_balance: "",
//       maximum_balance: "",
//       prorate_accural: "",
//       deduction_holidays: "",
//     };

//     setValues((prevState) => ({
//       ...prevState,
//       entitlements: [...prevState.entitlements, newPolicy],
//     }));
//   };

//   const handleFieldChange = (fieldIndex: number, fieldName: string, value: string) => {
//     const updatedValues = values.entitlements.map((entitlement, index) =>
//       index === fieldIndex ? { ...entitlement, [fieldName]: value } : entitlement
//     );
//     setValues({ ...values, entitlements: updatedValues });
//   };

//   const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues } = useFormik({
//     initialValues,
//     onSubmit: handleFormSubmit,
//   });

//   return (
//     <form onSubmit={handleSubmit}>
//       {values.entitlements.map((entitlement, fieldIndex) => (
//         <div key={fieldIndex}>
//           <Grid container spacing={3} p={3}>
//             {/* ... other fields ... */}
//             <Grid sm={1.5}>
//               <MDTypography variant="body2">Efective After</MDTypography>
//             </Grid>
//             <Grid xs={12} sm={5.5} container>
//               <Grid xs={12} sm={5}>
//                 <MDInput
//                   type="number"
//                   min="10"
//                   max="100"
//                   name={`entitlements[${fieldIndex}].efective_after_input`}
//                   value={entitlement.efective_after_input}
//                   onChange={(event: { target: { value: string } }) =>
//                     handleFieldChange(fieldIndex, "efective_after_input", event.target.value)
//                   }
//                   sx={{ width: "40%" }}
//                 />
//               </Grid>
//               <Grid xs={12} sm={7}>
//                 <Autocomplete
//                   value={entitlement.efective_after_select}
//                   onChange={(_, value) =>
//                     handleFieldChange(fieldIndex, "efective_after_select", value)
//                   }
//                   options={selectData.effectiveAter}
//                   renderInput={(params) => (
//                     <FormField
//                       label={""}
//                       InputLabelProps={{ shrink: true }}
//                       name={`entitlements[${fieldIndex}].efective_after_select`}
//                       onChange={(event: { target: { value: string } }) =>
//                         handleFieldChange(fieldIndex, "efective_after_select", event.target.value)
//                       }
//                       value={entitlement.efective_after_select}
//                       {...params}
//                       variant="standard"
//                     />
//                   )}
//                 />
//               </Grid>
//             </Grid>
//             {/* ... other fields ... */}
//             <Grid sm={4.5} container>
//               <Grid sm={4}>
//                 <MDTypography variant="body2" ml={5}>
//                   From
//                 </MDTypography>
//               </Grid>
//               <Grid sm={8}>
//                 <Autocomplete
//                   // multiple
//                   value={entitlement.efective_after_from}
//                   onChange={(_, value) =>
//                     handleFieldChange(fieldIndex, "efective_after_from", value)
//                   }
//                   options={selectData.effectiveFrom}
//                   renderInput={(params) => (
//                     <FormField
//                       label={""}
//                       InputLabelProps={{ shrink: true }}
//                       name={`entitlements[${fieldIndex}].efective_after_from`}
//                       onChange={(event: { target: { value: string } }) =>
//                         handleFieldChange(fieldIndex, "efective_after_from", event.target.value)
//                       }
//                       value={entitlement.efective_after_from}
//                       {...params}
//                       variant="standard"
//                     />
//                   )}
//                 />
//               </Grid>
//             </Grid>
//             <Grid>
//               <FormControlLabel
//                 label="Accrual"
//                 control={
//                   <Checkbox
//                     checked={isChecked}
//                     onChange={() => setIsChecked(!isChecked)}
//                     defaultChecked
//                   />
//                 }
//               />
//             </Grid>
//             {isChecked && (
//               <Grid item xs={12} container spacing={2} padding={3}>
//                 <Grid sm={2}>
//                   <Autocomplete
//                     // multiple
//                     value={entitlement.accural_select1}
//                     onChange={(_, value) => handleFieldChange(fieldIndex, "accural_select1", value)}
//                     options={selectData.effectiveFrom}
//                     renderInput={(params) => (
//                       <FormField
//                         label={""}
//                         InputLabelProps={{ shrink: true }}
//                         name={`entitlements[${fieldIndex}].accural_select1`}
//                         onChange={(event: { target: { value: string } }) =>
//                           handleFieldChange(fieldIndex, "accural_select1", event.target.value)
//                         }
//                         value={entitlement.accural_select1}
//                         {...params}
//                         variant="standard"
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid sm={0.8}>
//                   <MDTypography variant="body2" ml={4.5}>
//                     on
//                   </MDTypography>
//                 </Grid>
//                 <Grid sm={2}>
//                   <Autocomplete
//                     // multiple
//                     value={entitlement.accural_select2}
//                     onChange={(_, value) => handleFieldChange(fieldIndex, "accural_select2", value)}
//                     options={selectData.date}
//                     renderInput={(params) => (
//                       <FormField
//                         label={""}
//                         InputLabelProps={{ shrink: true }}
//                         name={`entitlements[${fieldIndex}].accural_select2`}
//                         onChange={(event: { target: { value: string } }) =>
//                           handleFieldChange(fieldIndex, "accural_select2", event.target.value)
//                         }
//                         value={entitlement.accural_select2}
//                         {...params}
//                         variant="standard"
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid sm={2}>
//                   <Autocomplete
//                     // multiple
//                     value={entitlement.accural_select3}
//                     onChange={(_, value) => handleFieldChange(fieldIndex, "accural_select3", value)}
//                     options={selectData.month}
//                     renderInput={(params) => (
//                       <FormField
//                         label={""}
//                         InputLabelProps={{ shrink: true }}
//                         name={`entitlements[${fieldIndex}].accural_select3`}
//                         onChange={(event: { target: { value: string } }) =>
//                           handleFieldChange(fieldIndex, "accural_select3", event.target.value)
//                         }
//                         value={entitlement.accural_select3}
//                         {...params}
//                         variant="standard"
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid>
//                   <MDTypography ml={-2} mr={2} variant="body2">
//                     No. of Days
//                   </MDTypography>
//                 </Grid>
//                 <Grid sm={1.2}>
//                   <MDInput
//                     type="number"
//                     min="10"
//                     max="100"
//                     name={`entitlements[${fieldIndex}].accural_input`}
//                     value={entitlement.accural_input}
//                     onChange={(event: { target: { value: string } }) =>
//                       handleFieldChange(fieldIndex, "accural_input", event.target.value)
//                     }
//                     sx={{ width: "40%" }}
//                   />
//                 </Grid>
//                 <Grid sm={0.5}>
//                   <MDTypography variant="body2">in</MDTypography>
//                 </Grid>
//                 <Grid sm={2}>
//                   <Autocomplete
//                     // multiple
//                     value={entitlement.accural_select4}
//                     onChange={(_, value) => handleFieldChange(fieldIndex, "accural_select4", value)}
//                     options={selectData.accural_in}
//                     renderInput={(params) => (
//                       <FormField
//                         label={""}
//                         InputLabelProps={{ shrink: true }}
//                         name={`entitlements[${fieldIndex}].accural_select4`}
//                         onChange={(event: { target: { value: string } }) =>
//                           handleFieldChange(fieldIndex, "accural_select4", event.target.value)
//                         }
//                         value={entitlement.accural_select4}
//                         {...params}
//                         variant="standard"
//                       />
//                     )}
//                   />
//                 </Grid>
//               </Grid>
//             )}
//             <Grid>
//               <FormControlLabel
//                 label="Reset"
//                 control={
//                   <Checkbox
//                     checked={isCheckedReset}
//                     onChange={() => setIsCheckedReset(!isCheckedReset)}
//                     defaultChecked
//                   />
//                 }
//               />
//             </Grid>
//             {isCheckedReset && (
//               <Grid item xs={12} container spacing={2} padding={3}>
//                 <Grid mb={5} sm={3}>
//                   <Autocomplete
//                     // multiple
//                     value={entitlement.reset_select1}
//                     onChange={(_, value) => handleFieldChange(fieldIndex, "reset_select1", value)}
//                     options={selectData.type_accural}
//                     renderInput={(params) => (
//                       <FormField
//                         label={""}
//                         InputLabelProps={{ shrink: true }}
//                         name={`entitlements[${fieldIndex}].reset_select1`}
//                         onChange={(event: { target: { value: string } }) =>
//                           handleFieldChange(fieldIndex, "reset_select1", event.target.value)
//                         }
//                         value={entitlement.reset_select1}
//                         {...params}
//                         variant="standard"
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid mb={5} sm={0.8}>
//                   <MDTypography variant="body2" ml={4.5}>
//                     on
//                   </MDTypography>
//                 </Grid>
//                 <Grid mb={5} sm={3}>
//                   <Autocomplete
//                     // multiple
//                     value={entitlement.reset_select2}
//                     onChange={(_, value) => handleFieldChange(fieldIndex, "reset_select2", value)}
//                     options={selectData.date}
//                     renderInput={(params) => (
//                       <FormField
//                         label={""}
//                         InputLabelProps={{ shrink: true }}
//                         name={`entitlements[${fieldIndex}].reset_select2`}
//                         onChange={(event: { target: { value: string } }) =>
//                           handleFieldChange(fieldIndex, "reset_select2", event.target.value)
//                         }
//                         value={entitlement.reset_select2}
//                         {...params}
//                         variant="standard"
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid mb={5} sm={4.5} ml={1}>
//                   <Autocomplete
//                     // multiple
//                     value={entitlement.reset_select3}
//                     onChange={(_, value) => handleFieldChange(fieldIndex, "reset_select3", value)}
//                     options={selectData.month}
//                     renderInput={(params) => (
//                       <FormField
//                         label={""}
//                         InputLabelProps={{ shrink: true }}
//                         name={`entitlements[${fieldIndex}].reset_select3`}
//                         onChange={(event: { target: { value: string } }) =>
//                           handleFieldChange(fieldIndex, "reset_select3", event.target.value)
//                         }
//                         value={entitlement.reset_select3}
//                         {...params}
//                         variant="standard"
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid mb={5} sm={3}>
//                   {/* <Autocomplete
//                     defaultValue="Carry Forward"
//                     // multiple
//                     onChange={(event, value) => {
//                       handleChange({ target: { name: "reset_select4", value } });
//                     }}
//                     // value={department}
//                     // onChange={handleMainFieldChange}
//                     options={selectData.resetCarryForward}
//                     renderInput={(params) => (
//                       <FormField
//                         label={""}
//                         InputLabelProps={{ shrink: true }}
//                         name="reset_select4"
//                         onChange={handleChange}
//                         value={values.reset_select4}
//                         {...params}
//                         variant="standard"
//                       />
//                     )}
//                   /> */}
//                   <Autocomplete
//                     // multiple
//                     value={entitlement.reset_select4}
//                     onChange={(_, value) => handleFieldChange(fieldIndex, "reset_select4", value)}
//                     options={selectData.resetCarryForward}
//                     renderInput={(params) => (
//                       <FormField
//                         label={""}
//                         InputLabelProps={{ shrink: true }}
//                         name={`entitlements[${fieldIndex}].reset_select4`}
//                         onChange={(event: { target: { value: string } }) =>
//                           handleFieldChange(fieldIndex, "reset_select4", event.target.value)
//                         }
//                         value={entitlement.reset_select4}
//                         {...params}
//                         variant="standard"
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid mb={5} sm={1.8} ml={3}>
//                   {/* <MDTypography ml={4.5}>on</MDTypography> */}

//                   <MDInput
//                     type="number"
//                     min="10"
//                     max="100"
//                     name={`entitlements[${fieldIndex}].reset_input1`}
//                     value={entitlement.reset_input1}
//                     onChange={(event: { target: { value: string } }) =>
//                       handleFieldChange(fieldIndex, "reset_input1", event.target.value)
//                     }
//                     sx={{ width: "40%" }}
//                   />
//                 </Grid>
//                 <Grid mb={5} sm={3} ml={-10}>
//                   <Autocomplete
//                     // multiple
//                     value={entitlement.reset_select5}
//                     onChange={(_, value) => handleFieldChange(fieldIndex, "reset_select5", value)}
//                     options={selectData.unit}
//                     renderInput={(params) => (
//                       <FormField
//                         label={""}
//                         InputLabelProps={{ shrink: true }}
//                         name={`entitlements[${fieldIndex}].reset_select5`}
//                         onChange={(event: { target: { value: string } }) =>
//                           handleFieldChange(fieldIndex, "reset_select5", event.target.value)
//                         }
//                         value={entitlement.reset_select5}
//                         {...params}
//                         variant="standard"
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid mb={5} sm={2}>
//                   <MDTypography variant="body2" ml={2}>
//                     Max Limit
//                   </MDTypography>
//                 </Grid>
//                 <Grid mb={5} sm={1.8}>
//                   <MDInput
//                     type="number"
//                     min="10"
//                     max="100"
//                     name={`entitlements[${fieldIndex}].reset_input2`}
//                     value={entitlement.reset_input2}
//                     onChange={(event: { target: { value: string } }) =>
//                       handleFieldChange(fieldIndex, "reset_input2", event.target.value)
//                     }
//                     sx={{ width: "40%" }}
//                   />
//                 </Grid>
//                 <Grid mb={5} sm={3}>
//                   <MDTypography variant="body2" ml={6.5}>
//                     Encashment
//                   </MDTypography>
//                 </Grid>
//                 <Grid mb={5} sm={1.8} ml={3}>
//                   {/* <MDTypography ml={4.5}>on</MDTypography> */}

//                   <MDInput
//                     type="number"
//                     min="10"
//                     max="100"
//                     name={`entitlements[${fieldIndex}].reset_input3`}
//                     value={entitlement.reset_input3}
//                     onChange={(event: { target: { value: string } }) =>
//                       handleFieldChange(fieldIndex, "reset_input3", event.target.value)
//                     }
//                     sx={{ width: "40%" }}
//                   />
//                 </Grid>
//                 <Grid mb={5} sm={3} ml={-10}>
//                   <Autocomplete
//                     // multiple
//                     value={entitlement.reset_select6}
//                     onChange={(_, value) => handleFieldChange(fieldIndex, "reset_select6", value)}
//                     options={selectData.unit}
//                     renderInput={(params) => (
//                       <FormField
//                         label={""}
//                         InputLabelProps={{ shrink: true }}
//                         name={`entitlements[${fieldIndex}].reset_select6`}
//                         onChange={(event: { target: { value: string } }) =>
//                           handleFieldChange(fieldIndex, "reset_select6", event.target.value)
//                         }
//                         value={entitlement.reset_select6}
//                         {...params}
//                         variant="standard"
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid mb={5} sm={2} ml={2}>
//                   <MDTypography variant="body2">Max Limit</MDTypography>
//                 </Grid>
//                 <Grid mb={5} sm={1.8} ml={-2}>
//                   <MDInput
//                     type="number"
//                     min="10"
//                     max="100"
//                     name={`entitlements[${fieldIndex}].reset_input4`}
//                     value={entitlement.reset_input4}
//                     onChange={(event: { target: { value: string } }) =>
//                       handleFieldChange(fieldIndex, "reset_input4", event.target.value)
//                     }
//                     sx={{ width: "40%" }}
//                   />
//                 </Grid>
//               </Grid>
//             )}
//             <Grid container spacing={3} p={5} mb={-2}>
//               <Grid sm={4}>
//                 <MDTypography variant="body2">Opening Balance</MDTypography>
//               </Grid>
//               <Grid sm={3}>
//                 <MDInput
//                   type="number"
//                   min="10"
//                   max="100"
//                   name={`entitlements[${fieldIndex}].opening_balance`}
//                   value={entitlement.opening_balance}
//                   onChange={(event: { target: { value: string } }) =>
//                     handleFieldChange(fieldIndex, "opening_balance", event.target.value)
//                   }
//                   sx={{ width: "40%" }}
//                 />
//               </Grid>
//             </Grid>
//             <Grid container spacing={3} p={5} mb={-2}>
//               <Grid sm={4}>
//                 <MDTypography variant="body2">Maximum Balance</MDTypography>
//               </Grid>
//               <Grid sm={3}>
//                 <MDInput
//                   type="number"
//                   min="10"
//                   max="100"
//                   name={`entitlements[${fieldIndex}].maximum_balance`}
//                   value={entitlement.maximum_balance}
//                   onChange={(event: { target: { value: string } }) =>
//                     handleFieldChange(fieldIndex, "maximum_balance", event.target.value)
//                   }
//                   sx={{ width: "35%" }}
//                 />
//               </Grid>
//             </Grid>
//             <Grid container spacing={3} p={5} mb={-2}>
//               <Grid sm={4}>
//                 <MDTypography variant="body2">Prorate Accrual</MDTypography>
//               </Grid>
//               <Grid sm={3}>
//                 <Autocomplete
//                   // multiple
//                   value={entitlement.prorate_accural}
//                   onChange={(_, value) => handleFieldChange(fieldIndex, "prorate_accural", value)}
//                   options={selectData.ProrateAccrual}
//                   renderInput={(params) => (
//                     <FormField
//                       label={""}
//                       InputLabelProps={{ shrink: true }}
//                       name={`entitlements[${fieldIndex}].prorate_accural`}
//                       onChange={(event: { target: { value: string } }) =>
//                         handleFieldChange(fieldIndex, "prorate_accural", event.target.value)
//                       }
//                       value={entitlement.prorate_accural}
//                       {...params}
//                       variant="standard"
//                     />
//                   )}
//                 />
//               </Grid>
//             </Grid>
//             <Grid container spacing={3} p={5} mb={-2}>
//               <Grid sm={4}>
//                 <MDTypography variant="body2">Deductible Holidays</MDTypography>
//               </Grid>
//               <Grid sm={3}>
//                 <Autocomplete
//                   // multiple
//                   value={entitlement.deduction_holidays}
//                   onChange={(_, value) =>
//                     handleFieldChange(fieldIndex, "deduction_holidays", value)
//                   }
//                   options={selectData.DeductibleHolidays}
//                   renderInput={(params) => (
//                     <FormField
//                       label={""}
//                       InputLabelProps={{ shrink: true }}
//                       name={`entitlements[${fieldIndex}].deduction_holidays`}
//                       onChange={(event: { target: { value: string } }) =>
//                         handleFieldChange(fieldIndex, "deduction_holidays", event.target.value)
//                       }
//                       value={entitlement.deduction_holidays}
//                       {...params}
//                       variant="standard"
//                     />
//                   )}
//                 />
//               </Grid>
//             </Grid>
//           </Grid>
//         </div>
//       ))}
//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <MDButton color="info" fontWeight="medium" onClick={addNewPolicy} textGradient>
//           Add New Policy
//         </MDButton>
//       </div>
//       <hr />
//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <MDButton type="submit" color="info" fontWeight="medium" textGradient>
//           Save
//         </MDButton>
//       </div>
//     </form>
//   );
// };

// export default EntitlementTable;

//************************************************************** */
import * as React from "react";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  FormControlLabel,
  Grid,
  Link,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import FormField from "layouts/applications/wizard/components/FormField";
import MDButton from "components/MDButton";
import { useDispatch, useSelector } from "react-redux";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import LeaveGrant from "./leaveGrant";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { updateSectionName, storeEntitlementData } from "Redux/action/dummyDataActions";
const initialValues = {
  entitlements: [
    {
      efective_after_input: "",
      efective_after_select: "",
      efective_after_from: "",
      accrual: false,
      accural_select1: "",
      accural_select2: "",
      accural_select3: "",
      accural_input: "",
      accural_select4: " ",
      reset: "",
      reset_select1: "",
      reset_select2: "",
      reset_select3: "",
      reset_select4: " ",
      reset_input1: "",
      reset_select5: "",
      reset_input2: "",
      reset_input3: "",
      reset_select6: "",
      reset_input4: "",
      opening_balance: "",
      maximum_balance: "",
      prorate_accural: "",
      deduction_holidays: "",
    },
  ],
};

const selectData = {
  gender: ["Male", "Female"],
  skills: ["react", "vue", "angular", "svelte", "javascript"],
  effectiveAter: ["Days", "Month", "Year"],
  month: ["Jan", "Feb", "Mar"],
  date: ["1st", "2nd", "3rd"],
  type_accural: ["Yearly", "Monthly", "Weekly"],
  accural_in: ["Current Accural", "Next Accural"],
  resetCarryForward: ["Carry Forward", "Carry Forward with Expiry", "Carry Forward with OverLimit"],
  unit: ["Unit", "Percentage"],
  effectiveFrom: ["Date of Confirmation", "Date of Joining"],
  ProrateAccrual: ["Start of Policy", "Start and End of Policy", "Do not prorate"],
  DeductibleHolidays: ["All Holiday", "Holiday on workdays"],
};
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const EntitlementTable = (props: any) => {
  const [entitlementData, SetEntitlementData] = React.useState();
  const [additionalFields, setAdditionalFields] = React.useState(1);
  const [isChecked, setIsChecked] = React.useState(false);
  const [isPastChecked, setIsPastChecked] = React.useState(false);
  const [isFutureChecked, setIsFutureChecked] = React.useState(false);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("allow");
  const [isCheckedReset, setIsCheckedReset] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const dispatched = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
  React.useEffect(() => {
    dispatched(storeEntitlementData(entitlementData));
    // console.log(dispatched, "dispatfrhjufwefhevhjwvfhj");
  }, [dispatched, entitlementData]);

  const checkMainbtnClick = useSelector((state: any) => state.academicName);
  console.log("checkMainbtnClick", checkMainbtnClick);
  // const checkMainbtnClick = useSelector((state: any) => state.className);
  // console.log("checkMainbtnClick", checkMainbtnClick);
  const handleClose = () => {
    setOpen(false);
  };

  const token = Cookies.get("token");

  const handleFormSubmit = async (formValues: any) => {
    event.preventDefault();
    try {
      console.log(formValues, "formdata");
      SetEntitlementData(formValues);
      if (checkMainbtnClick.name == true) {
        const response = await axios.post(
          "http://10.0.20.133:web/mg_entitlement",
          formValues.entitlements,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);

        if (response.status === 200) {
          console.log("Created Entitleementpage Successfully");
        }
      }
      // const response = await axios.post(
      //   "http://10.0.20.133:8001/mg_entitlement",
      //   formValues.entitlements,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  // if (checkMainbtnClick.name == true) {
  //   // handleFormSubmit(formValues: any);
  // }
  const addNewPolicy = () => {
    const newPolicy = {
      efective_after_input: "",
      efective_after_select: "",
      efective_after_from: "",
      accrual: false,
      accural_select1: "",
      accural_select2: "",
      accural_select3: "",
      accural_input: "",
      accural_select4: " ",
      reset: "",
      reset_select1: "",
      reset_select2: "",
      reset_select3: "",
      reset_select4: " ",
      reset_input1: "",
      reset_select5: "",
      reset_input2: "",
      reset_input3: "",
      reset_select6: "",
      reset_input4: "",
      opening_balance: "",
      maximum_balance: "",
      prorate_accural: "",
      deduction_holidays: "",
    };

    setValues((prevState) => ({
      ...prevState,
      entitlements: [...prevState.entitlements, newPolicy],
    }));
  };
  const removeLastPolicy = () => {
    setValues((prevState) => ({
      ...prevState,
      entitlements: prevState.entitlements.slice(0, -1),
    }));
  };
  const handleFieldChange = (fieldIndex: number, fieldName: string, value: string) => {
    const updatedValues = values.entitlements.map((entitlement, index) =>
      index === fieldIndex ? { ...entitlement, [fieldName]: value } : entitlement
    );
    setValues({ ...values, entitlements: updatedValues });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
  });
  console.log(props, "props");
  const leaveBalanceBasedon = useSelector((state: any) => state.sectionName);
  console.log("leaveBalanceBasedon", leaveBalanceBasedon);

  const x = "abc";

  return (
    <form onSubmit={handleSubmit}>
      {values.entitlements.map((entitlement, fieldIndex) => (
        <div key={fieldIndex}>
          <Grid container spacing={3} p={3}>
            {/* ... other fields ... */}
            <Grid sm={1.5}>
              <MDTypography variant="body2">Effective After</MDTypography>
            </Grid>
            <Grid xs={12} sm={5.5} container>
              <Grid xs={12} sm={5}>
                <MDInput
                  type="number"
                  min="10"
                  max="100"
                  name={`entitlements[${fieldIndex}].efective_after_input`}
                  value={entitlement.efective_after_input}
                  onChange={(event: { target: { value: string } }) =>
                    handleFieldChange(fieldIndex, "efective_after_input", event.target.value)
                  }
                  sx={{ width: "40%" }}
                />
              </Grid>
              <Grid xs={12} sm={7}>
                <Autocomplete
                  value={entitlement.efective_after_select}
                  defaultValue="Year"
                  onChange={(_, value) =>
                    handleFieldChange(fieldIndex, "efective_after_select", value)
                  }
                  options={selectData.effectiveAter}
                  renderInput={(params) => (
                    <FormField
                      label={""}
                      InputLabelProps={{ shrink: true }}
                      name={`entitlements[${fieldIndex}].efective_after_select`}
                      onChange={(event: { target: { value: string } }) =>
                        handleFieldChange(fieldIndex, "efective_after_select", event.target.value)
                      }
                      value={entitlement.efective_after_select}
                      {...params}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
            </Grid>
            {/* ... other fields ... */}
            <Grid sm={4.5} container>
              <Grid sm={4}>
                <MDTypography variant="body2" ml={5}>
                  From
                </MDTypography>
              </Grid>
              <Grid sm={8}>
                <Autocomplete
                  // multiple
                  defaultValue="Date of Confirmation"
                  value={entitlement.efective_after_from}
                  onChange={(_, value) =>
                    handleFieldChange(fieldIndex, "efective_after_from", value)
                  }
                  options={selectData.effectiveFrom}
                  renderInput={(params) => (
                    <FormField
                      label={""}
                      InputLabelProps={{ shrink: true }}
                      name={`entitlements[${fieldIndex}].efective_after_from`}
                      onChange={(event: { target: { value: string } }) =>
                        handleFieldChange(fieldIndex, "efective_after_from", event.target.value)
                      }
                      value={entitlement.efective_after_from}
                      {...params}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
            </Grid>
            {leaveBalanceBasedon?.name == "Fixed entitlement" ? (
              <>
                {" "}
                <Grid>
                  <FormControlLabel
                    label="Accrual"
                    control={
                      <Checkbox
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                        defaultChecked
                      />
                    }
                  />
                </Grid>
                {isChecked && (
                  <Grid item xs={12} container spacing={2} padding={3}>
                    <Grid sm={2}>
                      <Autocomplete
                        // multiple
                        defaultValue="Yearly"
                        value={entitlement.accural_select1}
                        onChange={(_, value) =>
                          handleFieldChange(fieldIndex, "accural_select1", value)
                        }
                        options={selectData.effectiveFrom}
                        renderInput={(params) => (
                          <FormField
                            label={""}
                            InputLabelProps={{ shrink: true }}
                            name={`entitlements[${fieldIndex}].accural_select1`}
                            onChange={(event: { target: { value: string } }) =>
                              handleFieldChange(fieldIndex, "accural_select1", event.target.value)
                            }
                            value={entitlement.accural_select1}
                            {...params}
                            variant="standard"
                          />
                        )}
                      />
                    </Grid>
                    <Grid sm={0.8}>
                      <MDTypography variant="body2" ml={4.5}>
                        on
                      </MDTypography>
                    </Grid>
                    <Grid sm={2}>
                      <Autocomplete
                        // multiple
                        defaultValue="1st"
                        value={entitlement.accural_select2}
                        onChange={(_, value) =>
                          handleFieldChange(fieldIndex, "accural_select2", value)
                        }
                        options={selectData.date}
                        renderInput={(params) => (
                          <FormField
                            label={""}
                            InputLabelProps={{ shrink: true }}
                            name={`entitlements[${fieldIndex}].accural_select2`}
                            onChange={(event: { target: { value: string } }) =>
                              handleFieldChange(fieldIndex, "accural_select2", event.target.value)
                            }
                            value={entitlement.accural_select2}
                            {...params}
                            variant="standard"
                          />
                        )}
                      />
                    </Grid>
                    <Grid sm={2}>
                      <Autocomplete
                        // multiple
                        defaultValue="Jan"
                        value={entitlement.accural_select3}
                        onChange={(_, value) =>
                          handleFieldChange(fieldIndex, "accural_select3", value)
                        }
                        options={selectData.month}
                        renderInput={(params) => (
                          <FormField
                            label={""}
                            InputLabelProps={{ shrink: true }}
                            name={`entitlements[${fieldIndex}].accural_select3`}
                            onChange={(event: { target: { value: string } }) =>
                              handleFieldChange(fieldIndex, "accural_select3", event.target.value)
                            }
                            value={entitlement.accural_select3}
                            {...params}
                            variant="standard"
                          />
                        )}
                      />
                    </Grid>
                    <Grid>
                      <MDTypography ml={-2} mr={2} variant="body2">
                        No. of Days
                      </MDTypography>
                    </Grid>
                    <Grid sm={1.2}>
                      <MDInput
                        type="number"
                        min="10"
                        max="100"
                        name={`entitlements[${fieldIndex}].accural_input`}
                        value={entitlement.accural_input}
                        onChange={(event: { target: { value: string } }) =>
                          handleFieldChange(fieldIndex, "accural_input", event.target.value)
                        }
                        sx={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid sm={0.5}>
                      <MDTypography variant="body2">in</MDTypography>
                    </Grid>
                    <Grid sm={2}>
                      <Autocomplete
                        // multiple
                        defaultValue="Current Accural "
                        value={entitlement.accural_select4}
                        onChange={(_, value) =>
                          handleFieldChange(fieldIndex, "accural_select4", value)
                        }
                        options={selectData.accural_in}
                        renderInput={(params) => (
                          <FormField
                            label={""}
                            InputLabelProps={{ shrink: true }}
                            name={`entitlements[${fieldIndex}].accural_select4`}
                            onChange={(event: { target: { value: string } }) =>
                              handleFieldChange(fieldIndex, "accural_select4", event.target.value)
                            }
                            value={entitlement.accural_select4}
                            {...params}
                            variant="standard"
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                )}
              </>
            ) : (
              <Grid container spacing={2} p={2}>
                <Grid>
                  <FormControlLabel label="Leave Grant" control={<Checkbox checked />} />
                </Grid>
                <Grid>
                  {/* <MDTypography
                    component={Link}
                    to="/pages/leave/leaveGrant"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Set leave grant restrictions
                  </MDTypography> */}
                  {/* <MDButton> Set leave grant restrictions</MDButton> */}
                  <div>
                    <Button onClick={handleClickOpen}> Set leave grant Restrictions</Button>
                    <Dialog
                      open={open}
                      TransitionComponent={Transition}
                      keepMounted
                      disableEscapeKeyDown
                      onClose={handleClose}
                      aria-describedby="alert-dialog-slide-description"
                      // fullWidth={true}
                      // fullScreen
                      maxWidth="xl"
                      // sx={{ width: "160%" }}
                      // sx={{ width: 1 / 2 }}
                    >
                      <Grid container>
                        <Grid sm={11}>
                          {" "}
                          <DialogTitle>{"Leave Grant Restrictions"}</DialogTitle>
                        </Grid>

                        <Grid justifyContent={"right"} textAlign={"right"} sm={1}>
                          {" "}
                          <Button onClick={handleClose} sx={{ bgcolor: "black", padding: 0 }}>
                            {" "}
                            <ClearIcon color="primary" fontSize="large" sx={{ padding: 0 }} />
                            {/* <HomeIcon sx={{ fontSize: 50 }} /> */}
                          </Button>
                        </Grid>
                      </Grid>
                      <DialogContent>
                        <LeaveGrant />
                      </DialogContent>
                      <DialogActions>
                        {/* <Button onClick={handleClose}><CancelIcon /></Button> */}
                        {/* <Button onClick={handleClose}>Save</Button> */}
                      </DialogActions>
                    </Dialog>
                  </div>
                </Grid>
              </Grid>
            )}
            <Grid>
              <FormControlLabel
                label="Reset"
                control={
                  <Checkbox
                    checked={isCheckedReset}
                    onChange={() => setIsCheckedReset(!isCheckedReset)}
                    defaultChecked
                  />
                }
              />
            </Grid>
            {isCheckedReset && (
              <Grid item xs={12} container spacing={2} padding={3}>
                <Grid mb={5} sm={3}>
                  <Autocomplete
                    // multiple
                    defaultValue="Yearly"
                    value={entitlement.reset_select1}
                    onChange={(_, value) => handleFieldChange(fieldIndex, "reset_select1", value)}
                    options={selectData.type_accural}
                    renderInput={(params) => (
                      <FormField
                        label={""}
                        InputLabelProps={{ shrink: true }}
                        name={`entitlements[${fieldIndex}].reset_select1`}
                        onChange={(event: { target: { value: string } }) =>
                          handleFieldChange(fieldIndex, "reset_select1", event.target.value)
                        }
                        value={entitlement.reset_select1}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid mb={5} sm={0.8}>
                  <MDTypography variant="body2" ml={4.5}>
                    on
                  </MDTypography>
                </Grid>
                <Grid mb={5} sm={3}>
                  <Autocomplete
                    // multiple
                    defaultValue="1st"
                    value={entitlement.reset_select2}
                    onChange={(_, value) => handleFieldChange(fieldIndex, "reset_select2", value)}
                    options={selectData.date}
                    renderInput={(params) => (
                      <FormField
                        label={""}
                        InputLabelProps={{ shrink: true }}
                        name={`entitlements[${fieldIndex}].reset_select2`}
                        onChange={(event: { target: { value: string } }) =>
                          handleFieldChange(fieldIndex, "reset_select2", event.target.value)
                        }
                        value={entitlement.reset_select2}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid mb={5} sm={4.5} ml={1}>
                  <Autocomplete
                    // multiple
                    defaultValue="Jan"
                    value={entitlement.reset_select3}
                    onChange={(_, value) => handleFieldChange(fieldIndex, "reset_select3", value)}
                    options={selectData.month}
                    renderInput={(params) => (
                      <FormField
                        label={""}
                        InputLabelProps={{ shrink: true }}
                        name={`entitlements[${fieldIndex}].reset_select3`}
                        onChange={(event: { target: { value: string } }) =>
                          handleFieldChange(fieldIndex, "reset_select3", event.target.value)
                        }
                        value={entitlement.reset_select3}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid mb={5} sm={3}>
                  {/* <Autocomplete
                    defaultValue="Carry Forward"
                    // multiple
                    onChange={(event, value) => {
                      handleChange({ target: { name: "reset_select4", value } });
                    }}
                    // value={department}
                    // onChange={handleMainFieldChange}
                    options={selectData.resetCarryForward}
                    renderInput={(params) => (
                      <FormField
                        label={""}
                        InputLabelProps={{ shrink: true }}
                        name="reset_select4"
                        onChange={handleChange}
                        value={values.reset_select4}
                        {...params}
                        variant="standard"
                      />
                    )}
                  /> */}
                  <Autocomplete
                    // multiple
                    defaultValue="Carry Forward"
                    value={entitlement.reset_select4}
                    onChange={(_, value) => handleFieldChange(fieldIndex, "reset_select4", value)}
                    options={selectData.resetCarryForward}
                    renderInput={(params) => (
                      <FormField
                        label={""}
                        InputLabelProps={{ shrink: true }}
                        name={`entitlements[${fieldIndex}].reset_select4`}
                        onChange={(event: { target: { value: string } }) =>
                          handleFieldChange(fieldIndex, "reset_select4", event.target.value)
                        }
                        value={entitlement.reset_select4}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid mb={5} sm={1.8} ml={3}>
                  {/* <MDTypography ml={4.5}>on</MDTypography> */}

                  <MDInput
                    type="number"
                    min="10"
                    max="100"
                    name={`entitlements[${fieldIndex}].reset_input1`}
                    value={entitlement.reset_input1}
                    onChange={(event: { target: { value: string } }) =>
                      handleFieldChange(fieldIndex, "reset_input1", event.target.value)
                    }
                    sx={{ width: "40%" }}
                  />
                </Grid>
                <Grid mb={5} sm={3} ml={-10}>
                  <Autocomplete
                    // multiple
                    defaultValue="Unit"
                    value={entitlement.reset_select5}
                    onChange={(_, value) => handleFieldChange(fieldIndex, "reset_select5", value)}
                    options={selectData.unit}
                    renderInput={(params) => (
                      <FormField
                        label={""}
                        InputLabelProps={{ shrink: true }}
                        name={`entitlements[${fieldIndex}].reset_select5`}
                        onChange={(event: { target: { value: string } }) =>
                          handleFieldChange(fieldIndex, "reset_select5", event.target.value)
                        }
                        value={entitlement.reset_select5}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid mb={5} sm={2}>
                  <MDTypography variant="body2" ml={2}>
                    Max Limit
                  </MDTypography>
                </Grid>
                <Grid mb={5} sm={1.8}>
                  <MDInput
                    type="number"
                    min="10"
                    max="100"
                    name={`entitlements[${fieldIndex}].reset_input2`}
                    value={entitlement.reset_input2}
                    onChange={(event: { target: { value: string } }) =>
                      handleFieldChange(fieldIndex, "reset_input2", event.target.value)
                    }
                    sx={{ width: "40%" }}
                  />
                </Grid>
                <Grid mb={5} sm={3}>
                  <MDTypography variant="body2" ml={6.5}>
                    Encashment
                  </MDTypography>
                </Grid>
                <Grid mb={5} sm={1.8} ml={3}>
                  {/* <MDTypography ml={4.5}>on</MDTypography> */}

                  <MDInput
                    type="number"
                    min="10"
                    max="100"
                    name={`entitlements[${fieldIndex}].reset_input3`}
                    value={entitlement.reset_input3}
                    onChange={(event: { target: { value: string } }) =>
                      handleFieldChange(fieldIndex, "reset_input3", event.target.value)
                    }
                    sx={{ width: "40%" }}
                  />
                </Grid>
                <Grid mb={5} sm={3} ml={-10}>
                  <Autocomplete
                    // multiple
                    defaultValue="Unit"
                    // value={entitlement.reset_select6}
                    onChange={(_, value) => handleFieldChange(fieldIndex, "reset_select6", value)}
                    options={selectData.unit}
                    renderInput={(params) => (
                      <FormField
                        label={""}
                        InputLabelProps={{ shrink: true }}
                        name={`entitlements[${fieldIndex}].reset_select6`}
                        onChange={(event: { target: { value: string } }) =>
                          handleFieldChange(fieldIndex, "reset_select6", event.target.value)
                        }
                        value={entitlement.reset_select6}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid mb={5} sm={2} ml={2}>
                  <MDTypography variant="body2">Max Limit</MDTypography>
                </Grid>
                <Grid mb={5} sm={1.8} ml={-2}>
                  <MDInput
                    type="number"
                    min="10"
                    max="100"
                    name={`entitlements[${fieldIndex}].reset_input4`}
                    value={entitlement.reset_input4}
                    onChange={(event: { target: { value: string } }) =>
                      handleFieldChange(fieldIndex, "reset_input4", event.target.value)
                    }
                    sx={{ width: "40%" }}
                  />
                </Grid>
              </Grid>
            )}
            <Grid container spacing={3} p={5} mb={-5}>
              <Grid sm={3}>
                <MDTypography variant="body2">Opening Balance</MDTypography>
              </Grid>
              <Grid sm={3}>
                <MDInput
                  type="number"
                  min="10"
                  max="100"
                  name={`entitlements[${fieldIndex}].opening_balance`}
                  value={entitlement.opening_balance}
                  onChange={(event: { target: { value: string } }) =>
                    handleFieldChange(fieldIndex, "opening_balance", event.target.value)
                  }
                  sx={{ width: "40%" }}
                />
              </Grid>
              <Grid sm={3}>
                <MDTypography variant="body2">Prorate Accrual</MDTypography>
              </Grid>
              <Grid sm={3}>
                <Autocomplete
                  // multiple
                  defaultValue="Start of Policy"
                  // value={entitlement.prorate_accural}
                  onChange={(_, value) => handleFieldChange(fieldIndex, "prorate_accural", value)}
                  options={selectData.ProrateAccrual}
                  renderInput={(params) => (
                    <FormField
                      label={""}
                      InputLabelProps={{ shrink: true }}
                      name={`entitlements[${fieldIndex}].prorate_accural`}
                      onChange={(event: { target: { value: string } }) =>
                        handleFieldChange(fieldIndex, "prorate_accural", event.target.value)
                      }
                      value={entitlement.prorate_accural}
                      {...params}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} p={5} mb={-5}>
              <Grid sm={3}>
                <MDTypography variant="body2">Maximum Balance</MDTypography>
              </Grid>
              <Grid sm={3}>
                <MDInput
                  type="number"
                  min="10"
                  max="100"
                  name={`entitlements[${fieldIndex}].maximum_balance`}
                  value={entitlement.maximum_balance}
                  onChange={(event: { target: { value: string } }) =>
                    handleFieldChange(fieldIndex, "maximum_balance", event.target.value)
                  }
                  sx={{ width: "40%" }}
                />
              </Grid>
              <Grid sm={3}>
                <MDTypography variant="body2">Deductible Holidays</MDTypography>
              </Grid>
              <Grid sm={3}>
                <Autocomplete
                  // multiple
                  defaultValue="All Holiday"
                  // value={entitlement.deduction_holidays}
                  onChange={(_, value) =>
                    handleFieldChange(fieldIndex, "deduction_holidays", value)
                  }
                  options={selectData.DeductibleHolidays}
                  renderInput={(params) => (
                    <FormField
                      label={""}
                      InputLabelProps={{ shrink: true }}
                      name={`entitlements[${fieldIndex}].deduction_holidays`}
                      onChange={(event: { target: { value: string } }) =>
                        handleFieldChange(fieldIndex, "deduction_holidays", event.target.value)
                      }
                      value={entitlement.deduction_holidays}
                      {...params}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <MDButton color="info" fontWeight="medium" onClick={addNewPolicy} textGradient>
          Add New Policy
        </MDButton>
        <MDButton color="info" fontWeight="medium" onClick={removeLastPolicy} textGradient>
          Cancel
        </MDButton>
      </div>
      <hr />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <MDButton type="submit" color="info" fontWeight="medium" textGradient>
          Save
        </MDButton>
      </div>
    </form>
  );
};

export default EntitlementTable;
