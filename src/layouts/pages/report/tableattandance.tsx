import { Card, Grid } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DataTable from "examples/Tables/DataTable";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import axios from "axios";
import { message } from "antd";
interface DailyAttendance {
  date: string;
  day: string;
  checkin: string | null;
  checkout: string | null;
  total_hours: string | null;
  status: string;
}

const initialValues = {
  from_date: "",
  to_date: "",
  //   email: "",
  // marital_status: [] as string[],
};
const Calendarattandence = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = React.useState([]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Dummy employee data for demonstration
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

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());

  const handleFormSubmit = async (currentDate: Date) => {
    console.log(currentDate, "current dat");
    // Assuming currentDate is your current date
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Format the dates as "YYYY-MM-DD"
    const fromDateFormatted = formatDate(firstDayOfMonth);
    const toDateFormatted = formatDate(lastDayOfMonth);

    // Now, you have the formatted "from" and "to" dates
    console.log("From Date:", fromDateFormatted);
    console.log("To Date:", toDateFormatted);

    // Function to format date as "YYYY-MM-DD"
    function formatDate(date: Date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    try {
      console.log(values, "formdata");

      const response = await axios.post(
        "http://10.0.20.133:8000/attendance/all",
        { from_date: fromDateFormatted, to_date: toDateFormatted },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response, "responsr");
      // setData(response);
      if (response.status === 200) {
        setData(response.data);
        // console.log(" Created Employee Successfully");
        // message.success(" Created Employee Successfully");
        // setIsSubmit(true);
        // navigate("/pages/employee/employee-invitation");
        // setDataSubmitted(true);
        // console.log(dataSubmitted, isSubmit, "hj wdjkdx");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  useEffect(() => {
    handleFormSubmit(currentDate);
  }, []);
  console.log(data, "dataa");

  const daysData = Array.from({ length: daysInMonth }, (_, index) => {
    const dayOfMonth = index + 1;
    const dayOfWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      dayOfMonth
    ).getDay();
    const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayOfWeek];
    return { dayName, dayOfMonth };
  });
  const getStatusLabel = (status: string): string => {
    const statusParts = status.split("-");
    const mainStatus = statusParts[0];

    switch (mainStatus) {
      case "Weekend":
        return "W";
      case "Absent":
        return "A";
      case "Present":
        return "P";
      case "No data":
        return "---";
      case "Holiday":
        return "H";
      case "Leave":
        return "L"; // Default case for generic Leave
      default:
        return status;
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Grid className="calendar">
          <Grid className="nav" style={{ textAlign: "center", margin: "5px" }}>
            <span
              className="arrow"
              onClick={() => {
                handleFormSubmit(
                  new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
                ); // Call handleformsubmit
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
              }}
            >
              <ArrowBackIosIcon />
            </span>
            <span>
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <span
              className="arrow"
              onClick={() => {
                handleFormSubmit(
                  new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
                ); // Call handleformsubmit
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
              }}
            >
              <ArrowForwardIosIcon />{" "}
            </span>
          </Grid>

          <DataTable
            table={{
              columns: [
                { Header: "Employee Name", accessor: "employee_name", width: "30%" },
                { Header: "Email", accessor: "email", width: "30%" },
                ...daysData.map((day, index) => ({
                  Header: `${day.dayName} ${day.dayOfMonth.toString().padStart(2, "0")}`, // Add leading zeros
                  accessor: `day_${(index + 1).toString().padStart(2, "0")}.status`, // Access status for each day with leading zeros
                })),
              ],

              rows: data.map((employeeData) => {
                const rowData = {
                  employee_name: <p>{employeeData.employee_name}</p>,
                  email: <p>{employeeData.email}</p>,
                  ...employeeData.data.reduce(
                    (
                      acc: { [x: string]: { status: string } },
                      entry: { status: string; date: string }
                    ) => {
                      const statusLabel = getStatusLabel(entry.status);
                      acc[`day_${entry.date.split("-")[2]}`] = { status: statusLabel };
                      return acc;
                    },
                    {}
                  ),
                };
                return rowData;
              }),
            }}
          />
        </Grid>
      </Card>
    </DashboardLayout>
  );
};

export default Calendarattandence;
