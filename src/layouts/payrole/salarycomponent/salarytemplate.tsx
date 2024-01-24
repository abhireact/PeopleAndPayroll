import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import FormField from "layouts/applications/wizard/components/FormField";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
// import "./weekday.css";
import { FormControlLabel, Card, Grid } from "@mui/material";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import axios from "axios";
import DataTable from "examples/Tables/DataTable";
import { Input } from "antd";
import Cookies from "js-cookie";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const token = Cookies.get("token");
function SalaryTemplate() {
  const [selectedOptions, setSelectedOptions] = useState([]); // State to store selected options
  const [selecteddeduction, setSelectedDeduction] = useState([]);
  // const [selectedEarningOptions, setSelectedDeduction] = useState([]);
  const [allEarnings, setAllEarnings] = useState([]);
  const [allDeductions, setAllDeductions] = useState([]);
  let Earnings: any[] = [];
  const initialValues: { [key: string]: any } = {
    template_name: "",
    template_description: "",
    annual_ctc: "",
    employers_contribution: "",
    pre_tax_name: allDeductions.map((item, index) => ({
      pre_tax_id: item.pre_name_slip,
      calculation_type: item.calculation_type,
      monthly_amount: "",
      // {
      //   "deduction_with": "80C-Life Insurance Premiums",
      //   "pre_name_slip": "sssssss",
      //   "employee_contribution_ctc": true,
      //   "calculate_prorata_basis": true,
      //   "mark_as_active": true,
      //   "location_name": "Banglore"
      // }
    })),
    post_tax_name: [] as string[],
    earnings_type_name: allEarnings.map((item, index) => ({
      earnings_id: item.earning_type_name,
      calculation_type: item.calculation_type,
      monthly_amount: "",
      enter_amount_or_percent: 0,
    })),
  };

  //   "pre_tax_name": [
  //     {
  //       "pre_tax_id": "string",
  //       "calculation_type": "string",
  //       "monthly_amount": "string"
  //     }
  //   ],
  //   "post_tax_name": [
  //     {
  //       "post_tax_id": "string",
  //       "calculation_type": "string",
  //       "monthly_amont": "string"
  //     }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://10.0.20.133:8000/mg_earning_type/by_name?organization_name=Mindcom&location_name=Banglore",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          // console.log(response.data, "all earning data");
          setAllEarnings(response.data);
        }

        const responsededuction = await axios.get("http://10.0.20.133:8000/mg_pre_tax_deduction", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (responsededuction.status === 200) {
          console.log(responsededuction.data, "all deduction data");
          setAllDeductions(responsededuction.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSelectedOptionsChange = (_: any, newValue: any) => {
    setSelectedOptions(newValue);
  };
  const handlechangededuction = (_: any, newValue: any) => {
    setSelectedDeduction(newValue);
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: (values, action) => {
        console.log(values, "ssssssssssssssssss");
        action.resetForm();
      },
    });

  const dataTableData = {
    columns: [
      { Header: "SALARY COMPONENTS", accessor: "salary_component", width: "25%" },
      { Header: "CALCULATION TYPE", accessor: "calculation_type", width: "25%" },
      { Header: "MONTHLY AMOUNT", accessor: "monthly_amount", width: "25%" },
      { Header: "ANNUAL AMOUNT", accessor: "annual_amount", width: "25%" },
    ],
    rows: [
      {
        salary_component: (
          <MDTypography variant="h6" color="text">
            EARNINGS
          </MDTypography>
        ),
      },
      {
        salary_component: "Basic",
        calculation_type: "% CTC",
        monthly_amount: (values.annual_ctc / 100) * (50 / 12),
        annual_amount: (values.annual_ctc / 100) * (50 / 12) * 12,
      },
      ...selectedOptions.map((earning_name, index) => {
        // Declare the variable outside the returned object
        let earning_data_index = allEarnings.findIndex(
          (item) => item.earning_type_name === earning_name
        );
        let earning_data = allEarnings[earning_data_index];
        // console.log(earning_data);

        return {
          salary_component: earning_data.earning_type_name,
          calculation_type: (
            <Input
              addonAfter={earning_data.calculation_type}
              type="number"
              name={`earnings_type_name[${earning_data_index}].enter_amount_or_percent`}
              value={values.earnings_type_name[earning_data_index]?.enter_amount_or_percent}
              onChange={handleChange}
              style={{ width: 150 }}
            />
          ),
          monthly_amount: (values.annual_ctc / 100) * (50 / 12),
          annual_amount: (values.annual_ctc / 100) * (50 / 12) * 12,
        };
      }),
      {
        salary_component: (
          <MDTypography variant="h6" color="text">
            DEDUCTIONS
          </MDTypography>
        ),
      },
      ...selecteddeduction.map((deduction_name, index) => {
        // Declare the variable outside the returned object
        let deduction_data_index = allDeductions.findIndex(
          (item) => item.pre_name_slip === deduction_name
        );
        let deduction_data = allDeductions[deduction_data_index];
        // console.log(deduction_data, "deduction nnnnnnnnn");

        return {
          salary_component: deduction_data.pre_name_slip,
          calculation_type: (
            <Input
              addonAfter={deduction_data.calculation_type}
              type="number"
              name={`pre_tax_name[${deduction_data_index}].enter_amount_or_percent`}
              value={values.pre_tax_name[deduction_data_index]?.enter_amount_or_percent}
              onChange={handleChange}
              style={{ width: 150 }}
            />
          ),
          monthly_amount: (values.annual_ctc / 100) * (50 / 12),
          annual_amount: (values.annual_ctc / 100) * (50 / 12) * 12,
        };
      }),
    ],
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Card sx={{ width: "100%", margin: "auto" }}>
              <MDBox p={2}>
                <Autocomplete
                  multiple
                  options={[...allEarnings.map((item) => item.earning_type_name)]}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox checked={selected} />
                      {option}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Earnings" placeholder="Select" />
                  )}
                  value={selectedOptions} // Set the selected options from state
                  onChange={handleSelectedOptionsChange} // Update state on selection change
                />
              </MDBox>
              <MDBox px={2} pb={2}>
                <Autocomplete
                  multiple
                  options={[...allDeductions.map((item) => item.pre_name_slip)]}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox checked={selected} />
                      {option}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Deduction" placeholder="Select" />
                  )}
                  value={selecteddeduction} // Set the selected options from state
                  onChange={handlechangededuction} // Update state on selection change
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Card sx={{ width: "100%", margin: "auto" }}>
              <MDBox p={3}>
                <Grid item xs={12} sm={9} mb={2}>
                  <MDTypography variant="h5">New Salary Template</MDTypography>
                </Grid>
                <Grid container spacing={3} p={2}>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      label="Template Name *"
                      name="template_name"
                      value={values.template_name}
                      placeholder="Enter Template Name"
                      variant="standard"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      label="Description"
                      name="template_description"
                      value={values.template_description}
                      placeholder="Enter Description"
                      variant="standard"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      type="number"
                      label="Annual CTC"
                      name="annual_ctc"
                      value={values.annual_ctc}
                      placeholder="Enter Annual CTC per year"
                      variant="standard"
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
            <DataTable table={dataTableData} entriesPerPage={false} canSearch={false} />
            <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
              <MDButton variant="gradient" color="info" type="submit">
                {"Save"}
              </MDButton>
            </Grid>
            {/* <Card sx={{ width: "100%", margin: "auto", mt: "2%" }}>
              <MDBox p={3}>
                <Grid container spacing={3} p={2}>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button">SALARY COMPONENTS</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button">CALCULATION TYPE</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button">MONTHLY AMOUNT</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button">ANNUAL AMOUNT</MDTypography>
                  </Grid>
                </Grid>
                <Grid sm={12}>
                  <Divider sx={{ margin: 0 }} />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MDTypography variant="button">SALARY COMPONENTS</MDTypography>
                </Grid>
                <Grid container spacing={3} p={2}>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button">Basic</MDTypography>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <FormField
                      label="% of CTC"
                      // name="annual_ctc"
                      name="earnings_type_name[0].earnings_id"
                      // value={values.annual_ctc}
                      value={values.earnings_type_name[0].earnings_id}
                      placeholder="Enter % of CTC"
                      variant="outlined"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormField
                      type="number"
                      label=""
                      name="annual_ctc"
                      value={values.annual_ctc}
                      placeholder="0"
                      variant="outlined"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
                    <MDTypography variant="button">0</MDTypography>
                  </Grid>
                </Grid>

                {selectedOptions.map((option, index) => (
                  <Grid container spacing={3} p={2} key={index}>
                    <Grid item xs={12} sm={3}>
                      <MDTypography variant="button">{option}</MDTypography>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <FormField
                        label="% of Basic"
                        name={`hous_rent_allowance`} // Use a unique name for each input field
                        value={option.hous_rent_allowance} // Assuming each option has its own 'hous_rent_allowance' property
                        placeholder="Enter % of Basic"
                        variant="outlined"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormField
                        type="number"
                        label=""
                        name={`annual_ctc_${index}`} // Use a unique name for each input field
                        value={option.annual_ctc} // Assuming each option has its own 'annual_ctc' property
                        placeholder="0"
                        variant="outlined"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
                      <MDTypography variant="button">0</MDTypography>
                    </Grid>
                  </Grid>
                ))}
                

                <Grid container spacing={3} p={2}>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button">Fixed Allowance</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button">Fixed amount</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
                    <MDTypography variant="button">0</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
                    <MDTypography variant="button">0</MDTypography>
                  </Grid>
                </Grid>
                <Divider sx={{ margin: 0 }} />
                <Grid container spacing={3} p={2}>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="h6">Cost to Company</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="button"></MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
                    <MDTypography variant="h6">0</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
                    <MDTypography variant="h6">0</MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
              <Grid item xs={12} sm={3} p={3} display="flex" justifyContent="flex-end">
                <MDButton variant="gradient" color="info" type="submit" onClick={handleFormSubmit}>
                  {"Save"}
                </MDButton>
              </Grid>
            </Card> */}
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
}

export default SalaryTemplate;
