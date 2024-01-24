import { useEffect, useMemo, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React TS examples components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import EventCalendar from "examples/Calendar";

// Calendar application components
import Header from "layouts/applications/calendar/components/Header";
import NextEvents from "layouts/applications/calendar/components/NextEvents";
import ProductivityChart from "layouts/applications/calendar/components/ProductivityChart";
import axios from "axios";
import Cookies from "js-cookie";
import MDTypography from "components/MDTypography";

// Data
// import calendarEventsData from "layouts/applications/calendar/data/calendarEventsData";

// export default calendarEventsData;

function CalendarView(): JSX.Element {
  const token = Cookies.get("token");

  console.log("token", token);
  const [data, setData] = useState([]);
  //   const calendarEventsData = [
  //     {
  //       title: "All day conference",
  //       start: "2021-08-01",
  //       end: "2021-08-01",
  //       className: "success",
  //     },

  //     {
  //       title: "Meeting with Mary",
  //       start: "2021-08-03",
  //       end: "2021-08-03",
  //       className: "info",
  //     },

  //     {
  //       title: "Cyber Week",
  //       start: "2021-08-04",
  //       end: "2021-08-04",
  //       className: "warning",
  //     },

  //     {
  //       title: "Winter Hackaton",
  //       start: "2021-08-05",
  //       end: "2021-08-05",
  //       className: "error",
  //     },

  //     {
  //       title: "Digital event",
  //       start: "2021-08-09",
  //       end: "2021-08-11",
  //       className: "warning",
  //     },

  //     {
  //       title: "Marketing event",
  //       start: "2021-08-12",
  //       end: "2021-08-12",
  //       className: "primary",
  //     },

  //     {
  //       title: "Dinner with Family",
  //       start: "2021-08-21",
  //       end: "2021-08-21",
  //       className: "error",
  //     },

  //     {
  //       title: "Black Friday",
  //       start: "2021-08-25",
  //       end: "2021-08-25",
  //       className: "info",
  //     },
  //   ];
  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/apply_leave", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);

        console.log(response.data, "data");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const calendarEventsData = [
    data.map((data) => ({
      title: data.employee_name,
      start: data.from_date,
      end: (function () {
        // Convert the start and end date strings to Date objects
        const startDate = new Date(data.from_date);
        const endDate = new Date(data.to_date);

        // Check if the start and end dates are not the same
        if (startDate.getTime() !== endDate.getTime()) {
          // Add one day to the end date
          endDate.setDate(endDate.getDate() + 1);
        }

        // Format the end date as a string in the same format
        return endDate.toISOString().slice(0, 10);
      })(),
      className: data.status == true ? (data.type === "paid" ? "success" : "info") : "error",
    })),
  ];

  console.log(calendarEventsData[0]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3}>
        <Grid container spacing={3} p={2}>
          <Grid item xs={12} sm={9}>
            <MDTypography variant="h5">{"Leave Calender"}</MDTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} xl={12} sx={{ height: "max-content" }}>
            {useMemo(
              () => (
                <EventCalendar
                  initialView="dayGridMonth"
                  initialDate="2023-08-10"
                  events={calendarEventsData[0]}
                  selectable
                  //   editable
                />
              ),
              [calendarEventsData[0]]
            )}
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default CalendarView;
