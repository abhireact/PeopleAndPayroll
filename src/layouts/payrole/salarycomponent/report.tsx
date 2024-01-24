import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ExportToExcel from "layouts/payrole/salarycomponent/exportexcel";
import axios from "axios";

function Reports() {
  const [allEmployeeDetails, setAllEmployeeDetails] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://10.0.20.133:8001/mg_employees/new", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          console.log(response.data, "all employee dta");
          setAllEmployeeDetails(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ExportToExcel jsonData={allEmployeeDetails} />
    </DashboardLayout>
  );
}

export default Reports;
