import { Stack, Link } from "@mui/material";
import { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import MDButton from "components/MDButton";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import Pdfdown from "./viewpdf";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "components/MDAvatar";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { message } from "antd";
import Cookies from "js-cookie";
import Grid from "@mui/material/Grid";

const Employeesm = () => {
  const token = Cookies.get("token");

  const [data, setData] = useState([]);
  const [deductor, setDeductor] = useState([]);

  const [emaildata, setEmaildata] = useState("");
  const [openupdate, setOpenupdate] = useState(false);
  const [showbutton, setShowbutton] = useState(true);
  const handleOpenupdate = (main_data: any) => {
    console.log(main_data, "maindata");

    setOpenupdate(true);
    setEmaildata(main_data);
  };
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };
  const fetchEmp = () => {
    axios
      .get("http://10.0.20.133:8000/employee", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data, "data");
        setData(response.data);
        if (response.status === 404) {
          message.error("No Data Available");
        }
      });
  };
  const fetchMgtaxes = () => {
    axios
      .get("http://10.0.20.133:8000/mg_taxes", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDeductor(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        message.error("Error on fetching taxes !");
      });
  };
  const fetchForm16status = () => {
    axios
      .get("http://10.0.20.133:8000/employee_salary_details/status/form16", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data, "show button");
        setShowbutton(response.data);
        if (response.status === 404) {
          message.error("No Data Available");
        }
      });
  };
  useEffect(() => {
    fetchForm16status();
    fetchMgtaxes();
    fetchEmp();
  }, []);
  const handleGenerateForm16 = async () => {
    console.log("hello generate button");
    await axios
      .post("http://10.0.20.133:8000//employee_salary_details/generate_pay_report/form16", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("form 16 for employees", response.data);
      })
      .catch((error) => {
        message.error("Error on generating form16 for employees");
      });
  };

  const dataTableData = {
    columns: [
      { Header: "Employee", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Action", accessor: "action", width: "20%" },
    ],
    rows: data.map((row, index) => ({
      name: (
        <MDTypography variant="p">
          {row.first_name} {row.last_name}
        </MDTypography>
      ),
      email: <MDTypography variant="p">{row.email}</MDTypography>,
      action: (
        <MDTypography variant="p">
          <IconButton
            onClick={() => {
              handleOpenupdate(row.email);
            }}
          >
            <DownloadIcon />
          </IconButton>
        </MDTypography>
      ),
    })),
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <Stack direction="row" justifyContent="center">
          <MDTypography variant="subtitle1">
            It&apos;s time to generate Form 16 for the financial year
          </MDTypography>
        </Stack>
        <Stack direction="row" justifyContent="center">
          <MDTypography variant="h6">
            Verify your tax deductor before you generate Form 16
          </MDTypography>
        </Stack>
        <Stack direction="row" justifyContent="center">
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
              p: 3,
              m: 3,
            }}
          >
            <CardContent>
              <Avatar src="" bgColor="light" />
            </CardContent>
            <Stack direction="column" justifyContent="center">
              <Stack direction="row" justifyContent="space-between">
                <MDTypography variant="body1">{deductor[0]?.deductor_father_name}</MDTypography>
                <Link href="/payrole/salarycomponent/taxes" variant="body2">
                  <IconButton>
                    <CreateRoundedIcon fontSize="medium" />
                  </IconButton>
                </Link>
              </Stack>
              <MDTypography variant="subtitle2">
                Son/Daughter of {deductor[0]?.deductor_name}
              </MDTypography>
            </Stack>
          </Card>
        </Stack>
      </MDBox>

      {showbutton ? (
        <MDBox>
          <Grid sx={{ display: "flex", justifyContent: "center" }} p={3}>
            <MDTypography variant="caption">
              Note: Remember that once you generate Form 16, you cannot change the deductor details.
            </MDTypography>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "center" }}>
            <MDButton color="info" onClick={() => handleGenerateForm16()}>
              Generate Form 16
            </MDButton>
          </Grid>
        </MDBox>
      ) : (
        <Grid>
          <Dialog open={openupdate} onClose={handleCloseupdate} maxWidth="md">
            <Pdfdown setOpenupdate={setOpenupdate} emaildata={emaildata} />
          </Dialog>
          <DataTable
            table={dataTableData}
            entriesPerPage={{
              defaultValue: 5,
              entries: [5, 10, 15, 20, 25],
            }}
          />
        </Grid>
      )}
    </DashboardLayout>
  );
};

export default Employeesm;
