import { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");
function Payslips() {
  const [pagestatus, setPageStatus] = useState("create");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://10.0.20.133:8000/mg_payschedule/by_name?organization_name=Mindcom&location_name=  `",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data, "all earning data");
          // setEarnings(response.data);
          setPageStatus("edit");
        }
      } catch (error) {
        // console.error(error);
        console.log("location not found");
      }
    };
    fetchData();
  });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <h1>Payslips</h1>
    </DashboardLayout>
  );
}

export default Payslips;
