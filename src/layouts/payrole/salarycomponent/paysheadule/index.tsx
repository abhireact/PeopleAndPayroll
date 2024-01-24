import { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CreatePaysheadule from "layouts/payrole/salarycomponent/paysheadule/create_paysheadule";
import CreateAndShowPaysheadule from "layouts/payrole/salarycomponent/paysheadule/edit_and_show_paysheadule";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const initialValues = {
  payslipname: "",
  salarymonth: "",
  fastpayrollform: "",
  payemployeeon: [] as string[],
  whichday: 0,
  calculatemonthlysalarybasedon: [] as string[],
};

// "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvX2lkIjoxLCJlbWFpbCI6IjIwMDNvbTE3MTFAZ21haWwuY29tIiwiZXhwIjoxNjk3NTM5ODk1LCJhZG1pbiI6dHJ1ZX0.GMv9vetjKfiM8fEoyrS_k5SfjizqDcam4m7QZJ0Muoo",
function CreatePage() {
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
      {pagestatus === "create" ? (
        <CreatePaysheadule />
      ) : pagestatus === "edit" ? (
        <CreateAndShowPaysheadule />
      ) : null}
    </DashboardLayout>
  );
}

export default CreatePage;
