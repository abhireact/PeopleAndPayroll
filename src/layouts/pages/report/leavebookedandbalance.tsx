import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
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

const thsStyle: React.CSSProperties = {
  background: "#f2f2f2",
  textAlign: "left",
  padding: "8px",
  border: "3px solid #ddd",
};

const tdStyle: React.CSSProperties = {
  border: "2px solid #ddd",
  textAlign: "left",
  padding: "8px",
};

const LeaveBookedandBalance = () => {
  const [data, setData] = useState([]);
  const token = Cookies.get("token");
  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/currentleave/report/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
      <div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle} rowSpan={2}>
                Employee
              </th>
              {data[0]?.emp_leave_report.map(
                (
                  leaveReport: {
                    leave_type:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                      | React.ReactFragment
                      | React.ReactPortal;
                  },
                  leaveIndex: React.Key
                ) => (
                  <th key={leaveIndex} colSpan={3} style={thStyle}>
                    {leaveReport.leave_type}
                  </th>
                )
              )}
              <th style={thStyle} rowSpan={2}>
                Total
              </th>
            </tr>
            <tr>
              {data[0]?.emp_leave_report.map((leaveReport: any, leaveIndex: React.Key) => (
                <React.Fragment key={leaveIndex}>
                  <td style={thsStyle}>Booked</td>
                  <td style={thsStyle}>Balanced</td>
                  <td style={thsStyle}>Total</td>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((employee, employeeIndex) => (
              <tr key={employeeIndex}>
                <td style={tdStyle}>{employee.emp_email}</td>

                {employee.emp_leave_report.map(
                  (
                    leaveReport: {
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
                      <td style={tdStyle}>{leaveReport.booked}</td>
                      <td style={tdStyle}>{leaveReport.no_leaves}</td>
                      <td style={tdStyle}>{leaveReport.total}</td>
                    </React.Fragment>
                  )
                )}

                <td style={tdStyle}>
                  {totalSums[employeeIndex]} {/* Display the total sum for this employee */}
                </td>
              </tr>
            ))}{" "}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default LeaveBookedandBalance;
