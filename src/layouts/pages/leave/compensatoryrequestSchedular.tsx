import { Card, Checkbox, FormControlLabel, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import React, { useEffect, useState } from "react";
// import value from "../valueset/value";
import SelectDataFor from "./selectthings";
import { leaveSchema } from "./schema";
import axios from "axios";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import MDButton from "components/MDButton";
import { TreeSelect } from "antd";
const initialValues = {
  date: "",
  include_overtime_done: [] as string[],
  schedule_name: "",
  time_of_schedule: "",
};
const { SHOW_PARENT } = TreeSelect;

// const treeData = [
//   {
//     title: "All Roles",
//     value: "All_Roles",
//     key: "All_Roles",
//     children: [
//       {
//         title: "Team Incharge",
//         value: "Roles-0",
//         key: "Roles-0",
//       },
//       {
//         title: "Team member",
//         value: "Roles-1",
//         key: "Roles-1",
//       },
//       {
//         title: "Director",
//         value: "Roles-2",
//         key: "Roles-2",
//       },
//       {
//         title: "Admin",
//         value: "Roles-3",
//         key: "Roles-0=3",
//       },
//       {
//         title: "Manager",
//         value: "Roles-4",
//         key: "Roles-4",
//       },
//     ],
//   },
//   {
//     title: "All Departments",
//     value: "All_Department",
//     key: "All_Department",
//     children: [
//       {
//         title: "Departments1",
//         value: "Department-0",
//         key: "Department-0",
//       },
//       {
//         title: "Departments2",
//         value: "Department-1",
//         key: "Department-1",
//       },
//       {
//         title: "Departments3",
//         value: "Department-2",
//         key: "Department-2",
//       },
//     ],
//   },
//   {
//     title: "All Designations",
//     value: "All_Designations",
//     key: "All_Designations",
//     children: [
//       {
//         title: "Designations1",
//         value: "Designations-0",
//         key: "Designations-0",
//       },
//       {
//         title: "Designations2",
//         value: "Designations-1",
//         key: "Designations-1",
//       },
//       {
//         title: "Designations3",
//         value: "Designations-2",
//         key: "Designations-2",
//       },
//     ],
//   },
//   {
//     title: "All Locations",
//     value: "All_Locations",
//     key: "All_Locations",
//     children: [
//       {
//         title: "Locations1",
//         value: "Locations-0",
//         key: "Locations-0",
//       },
//       {
//         title: "Locations2",
//         value: "Locations-1",
//         key: "Locations-1",
//       },
//       {
//         title: "Locations3",
//         value: "Locations-2",
//         key: "Locations-2",
//       },
//     ],
//   },
//   {
//     title: "All Groups",
//     value: "All_Groups",
//     key: "All_Groups",
//     children: [
//       {
//         title: "Groups1",
//         value: "Groups-0",
//         key: "Groups-0",
//       },
//       {
//         title: "Groups2",
//         value: "Groups-1",
//         key: "Groups-1",
//       },
//       {
//         title: "Groups3",
//         value: "Groups-2",
//         key: "Groups-2",
//       },
//     ],
//   },
//   {
//     title: "All Users",
//     value: "All_Users",
//     key: "All_Users",
//     children: [
//       {
//         title: "Users1",
//         value: "Users-0",
//         key: "Users-0",
//       },
//       {
//         title: "Users2",
//         value: "Users-1",
//         key: "Users-1",
//       },
//       {
//         title: "Users3",
//         value: "Users-2",
//         key: "Users-2",
//       },
//     ],
//   },
// ];
const CompensatoryrequestSchedular = () => {
  const [treeData, setTreeData] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedDesignations, setSelectedDesignations] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: leaveSchema,
    enableReinitialize: true,
    onSubmit: (values: any, action: { resetForm: () => void }) => {
      console.log(" ~ file: Registration.jsx ~ line 11 ~ Registration ~ values", values);
      action.resetForm();
    },
  });

  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/shifts/tree_data", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTreeData(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const token = Cookies.get("token");

  console.log("token", token);

  const [value, setValue] = useState(["All_Users"]);
  console.log(value, "value");

  const onChange = (newValue: string[]) => {
    console.log("onChange ", value);
    // const value_toadd = newValue[newValue.length - 1];
    // console.log(value_toadd, "du2ce gyvvvvvvqwui");
    // const category = value_toadd.split("-");
    // console.log(category[0], typeof category[0], "categoryfggv");

    // switch (category[0]) {
    //   case "Roles":
    //     setSelectedRoles([value_toadd]);
    //     break;
    //   case "Department":
    //     setSelectedDepartments([value_toadd]);
    //     break;
    //   case "Designations":
    //     setSelectedDesignations([value_toadd]);
    //     break;
    //   case "Locations":
    //     setSelectedLocations([value_toadd]);
    //     break;
    //   case "Groups":
    //     setSelectedGroups([value_toadd]);
    //     break;
    //   case "Users":
    //     setSelectedUsers([value_toadd]);
    //     break;
    //   default:
    //     break;
    // }
    // console.log(
    //   selectedRoles,
    //   selectedDepartments,
    //   selectedDesignations,
    //   selectedLocations,
    //   selectedUsers,
    //   "dataa viegfygyuxcgyudbhu"
    // );
    setValue(newValue);
  };

  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
  };
  const handleFormSubmit = async () => {
    event.preventDefault();

    try {
      const formValues = {
        ...values,
        applicable: value,
      };
      ("");
      console.log(formValues, "formdata");
      const response = await axios.post("http://10.0.20.133:8001/payperiod", formValues, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      if (response.status === 200) {
        console.log("Created SchoolPage Successfully");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <MDBox p={5}>
        <Grid container spacing={3}>
          <Grid sm={2.5}>
            <MDTypography variant="h6" fontWeight={700}>
              Schedule Name
            </MDTypography>
          </Grid>
          <Grid sm={3.5}>
            <MDInput
              name="schedule_name"
              value={values.schedule_name}
              // disabled={values.weekend_between_leave_period[0] == "C" ? false : true}
              // type="number"
              onChange={handleChange}
              sx={{ width: "70%" }}
            />
          </Grid>
          <Grid sm={2.5}>
            <MDTypography variant="h6" fontWeight={700}>
              Time of Schedule
            </MDTypography>
          </Grid>
          <Grid sm={3.5}>
            <MDInput
              type="time"
              name="time_of_schedule"
              value={values.time_of_schedule}
              // disabled={values.weekend_between_leave_period[0] == "C" ? false : true}
              // type="number"
              onChange={handleChange}
              sx={{ width: "70%" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} pt={5}>
          <Grid sm={2.5}>
            <MDTypography variant="h6" fontWeight={700}>
              Date
            </MDTypography>
          </Grid>
          <Grid sm={3.5}>
            <MDInput
              type="date"
              name="date"
              value={values.date}
              onChange={handleChange}
              sx={{ width: "70%" }}
            />
          </Grid>
          <Grid sm={2.5}>
            <MDTypography variant="h6" fontWeight={700}>
              Applicable For
            </MDTypography>
          </Grid>
          <Grid sm={3.5}>
            {/* <MDInput /> */}
            <TreeSelect {...tProps} />
          </Grid>
          <Grid>
            <FormControlLabel
              value="top"
              control={
                <Checkbox
                  checked={values.include_overtime_done.includes(
                    "Include overtime done on working day"
                  )}
                  onChange={handleChange}
                  name="include_overtime_done"
                  value="Include overtime done on working day"
                />
              }
              label={
                <MDTypography variant="body2"> Include overtime done on working day</MDTypography>
              }
              labelPlacement="end"
            />
          </Grid>
        </Grid>
      </MDBox>
      <MDButton type="submit" onClick={handleFormSubmit}>
        Submit
      </MDButton>
    </form>
  );
};

export default CompensatoryrequestSchedular;

// import { Card, Checkbox, FormControlLabel, Grid } from "@mui/material";
// import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
// import MDTypography from "components/MDTypography";
// import React, { useState } from "react";
// // import value from "../valueset/value";
// import SelectDataFor from "./selectthings";
// import { leaveSchema } from "./schema";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useFormik } from "formik";
// import MDButton from "components/MDButton";
// import { TreeSelect } from "antd";
// const initialValues = {
//   date: "",
//   include_overtime_done: [] as string[],
//   schedule_name: "",
//   time_of_schedule: "",
// };
// const { SHOW_PARENT } = TreeSelect;

// const treeData = [
//   {
//     title: "All Roles",
//     value: "All_Roles",
//     key: "All_Roles",
//     children: [
//       {
//         title: "Team Incharge",
//         value: "Roles-0",
//         key: "Roles-0",
//       },
//       {
//         title: "Team member",
//         value: "Roles-1",
//         key: "Roles-1",
//       },
//       {
//         title: "Director",
//         value: "Roles-2",
//         key: "Roles-2",
//       },
//       {
//         title: "Admin",
//         value: "Roles-3",
//         key: "Roles-0=3",
//       },
//       {
//         title: "Manager",
//         value: "Roles-4",
//         key: "Roles-4",
//       },
//     ],
//   },
//   {
//     title: "All Departments",
//     value: "All_Department",
//     key: "All_Department",
//     children: [
//       {
//         title: "Departments1",
//         value: "Department-0",
//         key: "Department-0",
//       },
//       {
//         title: "Departments2",
//         value: "Department-1",
//         key: "Department-1",
//       },
//       {
//         title: "Departments3",
//         value: "Department-2",
//         key: "Department-2",
//       },
//     ],
//   },
//   {
//     title: "All Designations",
//     value: "All_Designations",
//     key: "All_Designations",
//     children: [
//       {
//         title: "Designations1",
//         value: "Designations-0",
//         key: "Designations-0",
//       },
//       {
//         title: "Designations2",
//         value: "Designations-1",
//         key: "Designations-1",
//       },
//       {
//         title: "Designations3",
//         value: "Designations-2",
//         key: "Designations-2",
//       },
//     ],
//   },
//   {
//     title: "All Locations",
//     value: "All_Locations",
//     key: "All_Locations",
//     children: [
//       {
//         title: "Locations1",
//         value: "Locations-0",
//         key: "Locations-0",
//       },
//       {
//         title: "Locations2",
//         value: "Locations-1",
//         key: "Locations-1",
//       },
//       {
//         title: "Locations3",
//         value: "Locations-2",
//         key: "Locations-2",
//       },
//     ],
//   },
//   {
//     title: "All Groups",
//     value: "All_Groups",
//     key: "All_Groups",
//     children: [
//       {
//         title: "Groups1",
//         value: "Groups-0",
//         key: "Groups-0",
//       },
//       {
//         title: "Groups2",
//         value: "Groups-1",
//         key: "Groups-1",
//       },
//       {
//         title: "Groups3",
//         value: "Groups-2",
//         key: "Groups-2",
//       },
//     ],
//   },
//   {
//     title: "All Users",
//     value: "All_Users",
//     key: "All_Users",
//     children: [
//       {
//         title: "Users1",
//         value: "Users-0",
//         key: "Users-0",
//       },
//       {
//         title: "Users2",
//         value: "Users-1",
//         key: "Users-1",
//       },
//       {
//         title: "Users3",
//         value: "Users-2",
//         key: "Users-2",
//       },
//     ],
//   },
// ];
// const CompensatoryrequestSchedular = () => {
// const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
// const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
// const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
// const [selectedDesignations, setSelectedDesignations] = useState<string[]>([]);
// const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
// const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
//   const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
//     initialValues,
//     validationSchema: leaveSchema,
//     enableReinitialize: true,
//     onSubmit: (values: any, action: { resetForm: () => void }) => {
//       console.log(" ~ file: Registration.jsx ~ line 11 ~ Registration ~ values", values);
//       action.resetForm();
//     },
//   });
//   const token = Cookies.get("token");

//   console.log("token", token);

//   const [value, setValue] = useState(["All_Users"]);
//   console.log(value, "value");
//   const onChange = (newValue: string[]) => {
//     console.log(newValue, "newvcsdhgucvyug");

//     // const category = newValue[0].split("-")[0]; // Extract category from the selected value
//     // console.log(category, "category");
//     // Handle each category separately and update the corresponding state variable
//     // switch (category) {
//     //   case "Roles":
//     //     setSelectedRoles(newValue);
//     //     break;
//     //   case "Department":
//     //     setSelectedDepartments(newValue);
//     //     break;
//     //   case "Designations":
//     //     setSelectedDesignations(newValue);
//     //     break;
//     //   case "Locations":
//     //     setSelectedLocations(newValue);
//     //     break;
//     //   case "Groups":
//     //     setSelectedGroups(newValue);
//     //     break;
//     //   case "Users":
//     //     setSelectedUsers(newValue);
//     //     break;
//     //   default:
//     //     break;
//     // }
//     // console.log(
//     //   selectedRoles,
//     //   selectedDepartments,
//     //   selectedDesignations,
//     //   selectedLocations,
//     //   selectedUsers
//     // );

//     // Update the main 'value' array with selected values from all categories
//     setValue([newValue]);
//   };

//   const tProps = {
//     treeData,
//     value,
//     onChange,
//     treeCheckable: true,
//     showCheckedStrategy: SHOW_PARENT,
//     placeholder: "Please select",
//     style: {
//       width: "100%",
//     },
//   };
//   const handleFormSubmit = async () => {
//     event.preventDefault();

//     try {
//       const formValues = {
//         ...values,
//         applicable: value,
//       };
//       ("");
//       console.log(formValues, "formdata");
//       const response = await axios.post("http://10.0.20.133:8001/payperiod", formValues, {
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
//       <MDBox p={5}>
//         <Grid container spacing={3}>
//           <Grid sm={2.5}>
//             <MDTypography variant="h6" fontWeight={700}>
//               Schedule Name
//             </MDTypography>
//           </Grid>
//           <Grid sm={3.5}>
//             <MDInput
//               name="schedule_name"
//               value={values.schedule_name}
//               // disabled={values.weekend_between_leave_period[0] == "C" ? false : true}
//               // type="number"
//               onChange={handleChange}
//               sx={{ width: "70%" }}
//             />
//           </Grid>
//           <Grid sm={2.5}>
//             <MDTypography variant="h6" fontWeight={700}>
//               Time of Schedule
//             </MDTypography>
//           </Grid>
//           <Grid sm={3.5}>
//             <MDInput
//               type="time"
//               name="time_of_schedule"
//               value={values.time_of_schedule}
//               // disabled={values.weekend_between_leave_period[0] == "C" ? false : true}
//               // type="number"
//               onChange={handleChange}
//               sx={{ width: "70%" }}
//             />
//           </Grid>
//         </Grid>
//         <Grid container spacing={3} pt={5}>
//           <Grid sm={2.5}>
//             <MDTypography variant="h6" fontWeight={700}>
//               Date
//             </MDTypography>
//           </Grid>
//           <Grid sm={3.5}>
//             <MDInput
//               type="date"
//               name="date"
//               value={values.date}
//               onChange={handleChange}
//               sx={{ width: "70%" }}
//             />
//           </Grid>
//           <Grid sm={2.5}>
//             <MDTypography variant="h6" fontWeight={700}>
//               Applicable For
//             </MDTypography>
//           </Grid>
//           <Grid sm={3.5}>
//             {/* <MDInput /> */}
//             <TreeSelect {...tProps} />
//           </Grid>
//           <Grid>
//             <FormControlLabel
//               value="top"
//               control={
//                 <Checkbox
//                   checked={values.include_overtime_done.includes(
//                     "Include overtime done on working day"
//                   )}
//                   onChange={handleChange}
//                   name="include_overtime_done"
//                   value="Include overtime done on working day"
//                 />
//               }
//               label={
//                 <MDTypography variant="body2"> Include overtime done on working day</MDTypography>
//               }
//               labelPlacement="end"
//             />
//           </Grid>
//         </Grid>
//       </MDBox>
//       <MDButton type="submit" onClick={handleFormSubmit}>
//         Submit
//       </MDButton>
//     </form>
//   );
// };

// export default CompensatoryrequestSchedular;
