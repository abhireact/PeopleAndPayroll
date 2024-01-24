import * as React from "react";
// import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import { useCallback, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { message } from "antd";
import DataTable from "examples/Tables/DataTable";
import { blue } from "@mui/material/colors";
import MDButton from "components/MDButton";
import { options } from "dropzone";
import FormField from "../account/components/FormField";

const chartSetting = {
  yAxis: [
    {
      label: "work location (leaves)",
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-5px, 0)",
    },
  },
};
const dataset = [
  {
    bengaluru: 59,
    newdelhi: 57,
    mumbai: 86,
    lucknow: 21,
    month: "Jan",
  },
  {
    bengaluru: 50,
    newdelhi: 52,
    mumbai: 78,
    lucknow: 28,
    month: "Feb",
  },
  {
    bengaluru: 47,
    newdelhi: 53,
    mumbai: 106,
    lucknow: 41,
    month: "Mar",
  },
  {
    bengaluru: 54,
    newdelhi: 56,
    mumbai: 92,
    lucknow: 73,
    month: "Apr",
  },
  {
    bengaluru: 57,
    newdelhi: 69,
    mumbai: 92,
    lucknow: 99,
    month: "May",
  },
  {
    bengaluru: 60,
    newdelhi: 63,
    mumbai: 103,
    lucknow: 144,
    month: "June",
  },
  {
    bengaluru: 59,
    newdelhi: 60,
    mumbai: 105,
    lucknow: 119,
    month: "July",
  },
  {
    bengaluru: 65,
    newdelhi: 60,
    mumbai: 106,
    lucknow: 49,
    month: "Aug",
  },
  {
    bengaluru: 51,
    newdelhi: 51,
    mumbai: 95,
    lucknow: 131,
    month: "Sept",
  },
  {
    bengaluru: 60,
    newdelhi: 65,
    mumbai: 97,
    lucknow: 55,
    month: "Oct",
  },
  {
    bengaluru: 67,
    newdelhi: 64,
    mumbai: 76,
    lucknow: 48,
    month: "Nov",
  },
  {
    bengaluru: 61,
    newdelhi: 70,
    mumbai: 103,
    lucknow: 25,
    month: "Dec",
  },
];
const initialValues = {
  period: "",
  department: [] as string[],

  designation: [] as string[],

  location: [] as string[],

  gender: [] as string[],
  marital_status: [] as string[],
  fromDate: "",
  toDate: "",
};
const valueFormatter = (value: number) => `${value}leaves`;

export default function LeaveReport() {
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
  const [selectedLocation, setSelectedLocation] = useState("bengaluru");
  const [employeAddition, setEmployeAddition] = useState(null);
  const [tabledata, setTabledata] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeItem, setActiveItem] = useState(dataset[activeIndex]);
  // const activeItem = dataset[activeIndex];

  const handlepostApi = async () => {
    const formValues = {
      ...values,
      location: [selectedLocation],
      label: activeItem.month,
      // value: attendancedata[clickedSliceData.dataIndex].value,
    };
    const response = await axios.post(
      "http://10.0.20.133:8000/apply_leave/report/location",
      formValues,
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
      setTabledata(response.data[0].data);
      // setDesignationData(response.data);
      // setLocationData(response.data);
      message.success("Created Employee Successfully");
    }
  };
  const handleClick = useCallback(
    async (entry: any, index: number) => {
      setActiveIndex((prevIndex) => {
        if (prevIndex !== index || prevIndex !== activeIndex) {
          setActiveIndex(index);
          setActiveItem(dataset[activeIndex]);
          // Only update the state if the index is different
          handlepostApi();
        }
        return index;
      });
    },
    [setActiveIndex, handlepostApi]
  );

  console.log(activeItem, "clicked data");
  // get location data
  // const WorkLocation = useSelector((state: any) => state.workLocationData);
  // console.log("WorkLocation", WorkLocation);

  // const location_name = [];

  // if (WorkLocation && WorkLocation?.length > 0) {
  //   const uniqueLocationNames = new Set();

  //   for (let i = 0; i < WorkLocation?.length; i++) {
  //     const locationName = WorkLocation[i]["location_name"];
  //     uniqueLocationNames.add(locationName);
  //   }

  //   // Convert the Set to an array if needed
  //   location_name.push(...uniqueLocationNames);
  // }

  // console.log(location_name, "location");

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
  // get leave data
  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/apply_leave/report/location      ", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEmployeAddition(response.data);
        const activeItem = dataset[activeIndex];
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token]); // Include token as a dependency for the useEffect

  const filteredData = employeAddition
    ? employeAddition.map((data: { [x: string]: any; month: any }) => ({
        month: data.month,
        leaves: (data as any)[selectedLocation] || 0, // Default to 0 if the selected location data is undefined
      }))
    : [];

  console.log(filteredData, "filterdata");
  // const filteredData = dataset.map((data) => ({
  //   month: data.month,
  //   leaves: (data as any)[selectedLocation], // Use type assertion here
  // }));
  // console.log(filteredData, "filterdata");

  // datatable
  const dataTableData = {
    columns: [
      { Header: `${"Employee Name"}`, accessor: "employee_name" },
      { Header: `${"Department "}`, accessor: "department" },
      { Header: `${"Designation "}`, accessor: "designation" },
      { Header: `${"Gender "}`, accessor: "gender" },

      // { Header: `${"action"}`, accessor: "action" },
    ],

    rows: Array.isArray(tabledata)
      ? tabledata.map(
          (
            row: {
              employee_name: any;
              designation: any;
              department: any;
              gender: any;
              //   email_id: any;
            },
            index: any
          ) => ({
            employee_name: row.employee_name,
            designation: row.designation,
            department: row.department,
            gender: row.gender,
          })
        )
      : [],
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Grid p={3}>
          <MDTypography variant="h5">Leave Report</MDTypography>
          <Autocomplete
            options={location_name}
            value={selectedLocation}
            onChange={(event, newValue) => {
              setSelectedLocation(newValue as string);
            }}
            renderInput={(params) => <TextField {...params} label="Select Work Location" />}
          />
        </Grid>

        <BarChart
          width={600}
          height={300}
          data={filteredData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="leaves" fill="#8884d8" onClick={handleClick} />
        </BarChart>
        {/* <p className="content">{`Uv of "${activeItem.month}": ${activeItem}`}</p> */}
        {tabledata?.length > 0 ? <DataTable table={dataTableData} /> : ""}
      </Card>
    </DashboardLayout>
  );
}
