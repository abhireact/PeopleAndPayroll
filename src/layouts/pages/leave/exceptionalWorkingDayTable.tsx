// import React, { useEffect, useState } from "react";
// import Card from "@mui/material/Card";

// import Dialog from "@mui/material/Dialog";

// import DialogContent from "@mui/material/DialogContent";

// // Material Dashboard 2 PRO React TS components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// // Material Dashboard 2 PRO React TS examples components
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Button from "components/MDButton";
// import DataTable from "examples/Tables/DataTable";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
// import axios from "axios";
// import Grid from "@mui/material/Grid";
// import MDInput from "components/MDInput";
// import { useFormik } from "formik";
// // import Updateworking from "./updateworking";

// function WorkingdaysTable() {
//   // updating  dialog box
//   const [tasks, setTasks] = useState([]);
//   const [editTaskData, setEditTaskData] = useState(null);
//   const [openupdate, setOpenupdate] = useState(false);
//   const handleOpenupdate = (index: number) => {
//     const main_data = tasks[index];
//     console.log(main_data, "maindata");

//     setOpenupdate(true);
//     setEditTaskData(main_data);
//   };
//   const handleCloseupdate = () => {
//     setOpenupdate(false);
//   };
//   //Deleting part
//   const handleDeleteTask = async (name:) => {
//     console.log(name, "function is working");
//     try {
//       await axios.delete("http://10.0.20.133:8001/exceptionalworkday", {
//         data: { name: name },
//       });
//       window.location.reload();
//     } catch (error) {
//       console.error("Not Deleted", error);
//     }
//   };
//   //for dialog box start
//   const [open, setOpen] = useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     axios
//       .get("http://10.0.20.133:8001/exceptionalworkday")
//       .then((response) => {
//         setData(response.data);
//         setTasks(response.data); //updating
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   const workingdata = {
//     columns: [
//       { Header: "Name", accessor: "name", width: "20%" },
//       { Header: "Date", accessor: "date", width: "20%" },
//       { Header: "Location", accessor: "location", width: "20%" },
//       { Header: "Description", accessor: "description", width: "25%" },
//       { Header: "Action", accessor: "action", width: "10" },
//     ],
//     rows: data.map((row, index) => ({
//       name: <p>{row.name}</p>,
//       date: <p>{row.date}</p>,
//       location: <p>{row.applicable_for}</p>,
//       description: <p>{row.description} </p>,
//       action: (
//         <MDTypography variant="p">
//           <IconButton
//             onClick={() => {
//               handleOpenupdate(index);
//             }}
//           >
//             <CreateRoundedIcon />
//           </IconButton>
//           <IconButton onClick={() => handleDeleteTask(row.name)}>
//             <DeleteIcon />
//           </IconButton>
//         </MDTypography>
//       ),
//     })),
//   };
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       date: "",
//       location: "",
//       description: "",
//     },

//     onSubmit: (values, action) => {
//       axios
//         .post("http://10.0.20.133:8001/exceptionalworkday", {
//           name: values.name,
//           date: values.date,
//           applicable_for: [values.location],
//           description: values.description,
//         })
//         .then((response) => {
//           console.log(response);
//         })
//         .catch((error) => {
//           console.log(error);
//         });

//       console.log(values);
//       action.resetForm();
//     },
//   });
//   return (
//     <>
//       <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
//         <Button variant="contained" color="info" onClick={handleClickOpen}>
//           + ADD
//         </Button>
//       </Grid>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogContent>
//           <Card>
//             <form onSubmit={formik.handleSubmit}>
//               <MDBox p={4}>
//                 <Grid container spacing={2}>
//                   <Grid sm={12}>
//                     <MDInput
//                       sx={{ width: "75%" }}
//                       // id="email"
//                       variant="standard"
//                       name="name"
//                       label="Name"
//                       value={formik.values.name}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       error={formik.touched.name && Boolean(formik.errors.name)}
//                       helperText={formik.touched.name && formik.errors.name}
//                       mb={10}
//                       mt={10}
//                     />
//                   </Grid>
//                   <Grid sm={12}>
//                     <MDInput
//                       sx={{ width: "75%" }}
//                       // id="email"
//                       variant="standard"
//                       name="date"
//                       label="Date"
//                       value={formik.values.date}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       error={formik.touched.date && Boolean(formik.errors.date)}
//                       helperText={formik.touched.date && formik.errors.date}
//                       mb={10}
//                       mt={10}
//                     />
//                   </Grid>
//                   <Grid sm={12}>
//                     <MDInput
//                       // id="email"
//                       sx={{ width: "75%" }}
//                       variant="standard"
//                       name="location"
//                       label="Location"
//                       value={formik.values.location}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       error={formik.touched.location && Boolean(formik.errors.location)}
//                       helperText={formik.touched.location && formik.errors.location}
//                       mb={10}
//                       mt={10}
//                     />
//                   </Grid>

//                   <Grid sm={12}>
//                     <MDInput
//                       variant="standard"
//                       name="description"
//                       label="Description..."
//                       value={formik.values.description}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       error={formik.touched.description && Boolean(formik.errors.description)}
//                       helperText={formik.touched.description && formik.errors.description}
//                       mb={10}
//                       mt={10}
//                       sx={{ width: "80%" }}
//                       multiline
//                       rows={5}
//                     />
//                   </Grid>

//                   <Grid mt={3}>
//                     <Button color="info" variant="contained" type="submit" onClick={handleClose}>
//                       Save
//                     </Button>
//                   </Grid>
//                   <Grid ml={2} mt={3}>
//                     <Button color="primary" variant="contained" onClick={handleClose}>
//                       Cancel
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </MDBox>
//             </form>
//           </Card>
//         </DialogContent>
//       </Dialog>
//       <Dialog open={openupdate} onClose={handleCloseupdate}>
//         {/* <Updateworking openupdate={openupdate} setOpenupdate={setOpenupdate} task={editTaskData} /> */}
//       </Dialog>

//       <DataTable table={workingdata} canSearch />
//     </>
//   );
// }

// export default WorkingdaysTable;
// import * as React from "react";
// // import { DataGrid, GridToolbarContainer, GridToolbarFilterButton } from "@mui/x-data-grid";
// import {
//   DataGridPro,
//   GridLogicOperator,
//   GridToolbarContainer,
//   GridToolbarFilterButton,
// } from "@mui/x-data-grid-pro";
// import { useDemoData } from "@mui/x-data-grid-generator";

// const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

// interface CustomToolbarProps {
//   setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
// }

// function CustomToolbar({ setFilterButtonEl }: CustomToolbarProps) {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarFilterButton ref={setFilterButtonEl} />
//     </GridToolbarContainer>
//   );
// }

// export default function CustomFilterPanelPosition() {
//   const { data } = useDemoData({
//     dataSet: "Employee",
//     visibleFields: VISIBLE_FIELDS,
//     rowLength: 100,
//   });
//   console.log(data, "data");
//   const [filterButtonEl, setFilterButtonEl] = React.useState<HTMLButtonElement | null>(null);

//   return (
//     <div style={{ height: 400, width: "100%" }}>
//       <DataGridPro
//         {...data}
//         slots={{
//           toolbar: CustomToolbar,
//         }}
//         slotProps={{
//           panel: {
//             anchorEl: filterButtonEl,
//           },
//           toolbar: {
//             setFilterButtonEl,
//           },
//         }}
//       />
//     </div>
//   );
// }

// import * as React from "react";
// import { DataGridPro, GridLogicOperator, GridToolbar } from "@mui/x-data-grid-pro";
// import { useDemoData } from "@mui/x-data-grid-generator";
// import type { Theme } from "@mui/material/styles";
// import axios from "axios";

// const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];
// interface MyData {
//   columns: Array<any>; // Define the correct type for your columns array
//   rows: Array<any>; // Define the correct type for your rows array
//   initialState: any; // Define the correct type for initialState
// }
// export default function CustomFilterPanelContent() {
//   const [dataa, setDataa] = React.useState<MyData | undefined>();

//   React.useEffect(() => {
//     fetchdata(); // Fetch data from API on component mount
//   }, []);

//   // Inside the fetchdata function
//   const fetchdata = async () => {
//     try {
//       const response = await fetch("http://10.0.20.133:8001/exceptionalworkday", {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const fetchedData = await response.json();
//       console.log(fetchedData, "fetchedData");

//       if (typeof fetchedData === "object" && fetchedData.columns && fetchedData.rows) {
//         setDataa(fetchedData);
//       } else {
//         console.log("Fetched data is not in the expected format.");
//       }
//     } catch (error) {
//       console.log("Error fetching data:", error);
//     }
//   };

//   // const { data } = useDemoData({
//   //   dataSet: "Employee",
//   //   visibleFields: VISIBLE_FIELDS,
//   //   rowLength: 100,
//   // });
//   console.log(dataa, "lauda");

//   return (
//     <div style={{ height: 400, width: "100%" }}>
//       {dataa && (
//         <DataGridPro
//           {...dataa}
//           // Rest of your DataGridPro configuration...
//           slots={{
//             toolbar: GridToolbar,
//             // Use custom FilterPanel only for deep modification
//             // FilterPanel: MyCustomFilterPanel,
//           }}
//           slotProps={{
//             filterPanel: {
//               // Force usage of "And" operator
//               logicOperators: [GridLogicOperator.And],
//               // Display columns by ascending alphabetical order
//               columnsSort: "asc",
//               filterFormProps: {
//                 // Customize inputs by passing props
//                 logicOperatorInputProps: {
//                   variant: "outlined",
//                   size: "small",
//                 },
//                 columnInputProps: {
//                   variant: "outlined",
//                   size: "small",
//                   sx: { mt: "auto" },
//                 },
//                 operatorInputProps: {
//                   variant: "outlined",
//                   size: "small",
//                   sx: { mt: "auto" },
//                 },
//                 valueInputProps: {
//                   InputComponentProps: {
//                     variant: "outlined",
//                     size: "small",
//                   },
//                 },
//                 deleteIconProps: {
//                   sx: {
//                     "& .MuiSvgIcon-root": { color: "#d32f2f" },
//                   },
//                 },
//               },
//               sx: {
//                 // Customize inputs using css selectors
//                 "& .MuiDataGrid-filterForm": { p: 2 },
//                 "& .MuiDataGrid-filterForm:nth-child(even)": {
//                   backgroundColor: (theme: Theme) =>
//                     theme.palette.mode === "dark" ? "#444" : "#f5f5f5",
//                 },
//                 "& .MuiDataGrid-filterFormLogicOperatorInput": { mr: 2 },
//                 "& .MuiDataGrid-filterFormColumnInput": { mr: 2, width: 150 },
//                 "& .MuiDataGrid-filterFormOperatorInput": { mr: 2 },
//                 "& .MuiDataGrid-filterFormValueInput": { width: 200 },
//               },
//             },
//           }}
//           initialState={{
//             ...dataa.initialState,
//             filter: {
//               ...dataa.initialState?.filter,
//               filterModel: {
//                 items: [
//                   // {
//                   //   id: 1,
//                   //   field: "name",
//                   //   operator: "contains",
//                   //   value: "D",
//                   // },
//                   // {
//                   //   id: 2,
//                   //   field: "name",
//                   //   operator: "contains",
//                   //   value: "D",
//                   // },
//                   // {
//                   //   id: 3,
//                   //   field: "rating",
//                   //   operator: ">",
//                   //   value: "0",
//                   // },
//                 ],
//               },
//             },
//           }}
//         />
//       )}
//     </div>
//   );
// }

// import * as React from "react";
// import { DataGridPro, GridLogicOperator, GridToolbar } from "@mui/x-data-grid-pro";
// import axios from "axios";
// import type { Theme } from "@mui/material/styles";

// const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

// interface MyData {
//   columns: Array<any>;
//   rows: Array<any>;
//   initialState: any;
// }

// export default function CustomFilterPanelContent() {
//   const [dataa, setDataa] = React.useState<MyData | undefined>();

//   React.useEffect(() => {
//     fetchdata();
//   }, []);

//   const fetchdata = async () => {
//     try {
//       const response = await fetch("http://10.0.20.133:8001/exceptionalworkday", {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const fetchedData = await response.json();

//       if (typeof fetchedData === "object" && fetchedData.columns && fetchedData.rows) {
//         setDataa(fetchedData);
//       } else {
//         console.log("Fetched data is not in the expected format.");
//       }
//     } catch (error) {
//       console.log("Error fetching data:", error);
//     }
//   };

//   const handleCellEditCommit = async (params: { id: any; field: any; value: any }) => {
//     const { id, field, value } = params;

//     const updatedRows = dataa.rows.map((row) => (row.id === id ? { ...row, [field]: value } : row));
//     setDataa((prevData) => ({ ...prevData, rows: updatedRows }));

//     try {
//       await axios.put(
//         `http://10.0.20.133:8001/exceptionalworkday/${id}`,
//         { [field]: value },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       // Handle success response
//     } catch (error) {
//       console.log("Error updating data:", error);
//       // Handle error
//     }
//   };

//   return (
//     <div style={{ height: 400, width: "100%" }}>
//       {dataa && (
//         <DataGridPro
//           {...dataa}
//           editMode="cell"
//           onCellEditCommit={(params: any) => handleCellEditCommit(params)}
//           slots={{
//             toolbar: GridToolbar,
//           }}
//           slotProps={
//             {
//               // FilterPanel customization...
//             }
//           }
//           initialState={{
//             ...dataa.initialState,
//             filter: {
//               ...dataa.initialState?.filter,
//               filterModel: {
//                 items: [
//                   // Filter items...
//                 ],
//               },
//             },
//           }}
//         />
//       )}
//     </div>
//   );
// }
