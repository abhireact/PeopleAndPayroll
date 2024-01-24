import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MDButton from "components/MDButton";

import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Cookies from "js-cookie";

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle: React.CSSProperties = {
  background: "#f2f2f2",
  textAlign: "left",
  padding: "8px",
  border: "2px solid #ddd",
};

const tdStyle: React.CSSProperties = {
  border: "2px solid #ddd",
  textAlign: "left",
  padding: "8px",
};

const LTWreport = () => {
  const token = Cookies.get("token");

  const [leaves, setLeaves] = useState([]);
  const [leave, setLeave] = useState({
    leave_type_name: "Casual Leaves",
    leave_type_code: "casual",
    leave_type: "paid",
    unit: "days",
    balance_based_on: "Leave grant",
    description: "bfbhg",
    start_date: "2022-06-04 00:00:00",
    end_date: "2023-10-29 00:00:00",
    gender: ["male", "female", "other"],
    marital_status: ["single", "married"],
    department: ["5", "2", "1"],
    designation: null,
  });
  const [data, setData] = useState([]);
  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://10.0.20.133:8000/mg_leave_type", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let leavelist = response.data;
      console.log(leavelist);
      setLeaves(leavelist);
      setLeave(leavelist[0]);
    } catch (error) {
      console.error("error fetching tasks:", error);
    }
  };
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://10.0.20.133:8000/currentleave/report/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      console.log(response.data, "Employees");
    } catch (error) {
      console.error("error fetching tasks:", error);
    }
  };

  console.log(leave, "leave");

  useEffect(() => {
    fetchLeaves();
    fetchEmployees();
  }, []);
  const totalSums = data.map((employee, index) => {
    const totalSum = employee.emp_leave_report
      .filter((report: { total: string }) => report.total !== "N/A")
      .reduce((acc: number, report: { total: string }) => acc + parseInt(report.total), 0);

    return totalSum;
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container>
        <Grid sm={2} sx={{ justifyContent: "flex-center" }}>
          <MDTypography variant="body1"> LEAVE TYPE :</MDTypography>
        </Grid>
        <Grid sm={4}>
          <Autocomplete
            options={leaves}
            getOptionLabel={(place) => place.leave_type_name}
            renderInput={(params) => <TextField {...params} />}
            value={leave}
            onChange={(event, newleave) => {
              setLeave(newleave);
              console.log(newleave);
            }}
          />
        </Grid>
      </Grid>

      <MDBox my={5}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle} rowSpan={2}>
                Employee
              </th>
            </tr>
            <tr>
              <th style={thStyle} rowSpan={2}>
                Granted
              </th>
              <th style={thStyle} rowSpan={2}>
                Booked
              </th>
              <th style={thStyle} rowSpan={2}>
                Balanced
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, employeeIndex) => (
              <tr key={employeeIndex}>
                <td style={tdStyle}>{employee.emp_email}</td>

                {employee.emp_leave_report.map(
                  (
                    leaveReport: {
                      leave_type: string;
                      booked:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                        | React.ReactFragment
                        | React.ReactPortal;
                      no_leaves:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                        | React.ReactFragment
                        | React.ReactPortal;
                      total:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                        | React.ReactFragment
                        | React.ReactPortal;
                    },
                    leaveIndex: React.Key
                  ) => (
                    <React.Fragment key={leaveIndex}>
                      {leaveReport.leave_type === leave.leave_type_name ? (
                        <>
                          {" "}
                          <td style={tdStyle}>{leaveReport.total}</td>
                          <td style={tdStyle}>{leaveReport.booked}</td>
                          <td style={tdStyle}>{leaveReport.no_leaves}</td>
                        </>
                      ) : null}
                    </React.Fragment>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </MDBox>
    </DashboardLayout>
  );
};

export default LTWreport;
