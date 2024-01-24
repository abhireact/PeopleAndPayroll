import React, { useEffect, useState, useRef } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import Cookies from "js-cookie";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import DataTable from "examples/Tables/DataTable";
import Basic from "layouts/authentication/sign-in/basic";

import { useNavigate } from "react-router-dom";
const token = Cookies.get("token");
import { message } from "antd";

const SalaryTemp = () => {
  const [template, setTemplate] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  // EARNINGS
  const [data, setData] = useState([]);
  const [showElements, setShowElements] = useState([]);
  const [annualamount, setAnnualamount] = useState([]);
  const [annualctc, setAnnualctc] = useState(0);
  const [basicpercent, setBasicpercent] = useState(0);

  function transformEarningsArray(earningsArray: any[]) {
    return earningsArray.map(
      (earning: {
        monthly_amount: number;
        earning_type_name: any;
        calculation_type: any;
        enter_amount_or_percent: any;
      }) => {
        if (earning.calculation_type === "% of CTC") {
          const monthly_amount = ((earning.enter_amount_or_percent / 100) * annualctc) / 12;
          setBasicpercent(earning.enter_amount_or_percent);
          return {
            earning_type_name: earning.earning_type_name,
            calculation_type: earning.calculation_type,
            enter_amount_or_percent: earning.enter_amount_or_percent,
            monthly_amount: monthly_amount.toFixed(2),
            annual_amount: monthly_amount * 12,
          };
        } else if (earning.calculation_type === "% of Basic") {
          const ctc_amount = ((earning.enter_amount_or_percent / 100) * annualctc) / 12;
          const monthly_amount = ctc_amount * (basicpercent / 100);
          return {
            earning_type_name: earning.earning_type_name,
            calculation_type: earning.calculation_type,
            enter_amount_or_percent: earning.enter_amount_or_percent,
            monthly_amount: monthly_amount.toFixed(2),
            annual_amount: monthly_amount * 12,
          };
        } else {
          // Handle other calculation types if needed

          return {
            earning_type_name: earning.earning_type_name,
            calculation_type: earning.calculation_type,
            enter_amount_or_percent: earning.enter_amount_or_percent,
            monthly_amount: earning.monthly_amount || 0,
            annual_amount: earning.monthly_amount * 12 || 0,
          };
        }
      }
    );
  }
  // DEDUCTIONS
  const [datadeduction, setDatadeduction] = useState([]);
  const [showdeductions, setShowdeductions] = useState([]);

  function transformDeductionsArray(deductionsArray: any[]) {
    return deductionsArray.map(
      (deduction: { monthly_amount: number; pre_name_slip: any; calculation_type: any }) => {
        const monthly_amount = deduction.monthly_amount || 0;
        return {
          pre_name_slip: deduction.pre_name_slip,
          calculation_type: deduction.calculation_type || "Fixed Amount",

          monthly_amount: monthly_amount,
          annual_amount: monthly_amount * 12,
        };
      }
    );
  }
  // EARNING CHANGES

  const handleChange = (index: any, field: any, value: any) => {
    // Update the state with the modified data
    const updatedElements = [...showElements];
    updatedElements[index] = { ...updatedElements[index], [field]: value };
    setShowElements(updatedElements);
    console.log(showElements, "changing input elements");
  };
  const handleAddField = (addfield: any) => {
    console.log(showElements, "add field");
    setShowElements([...showElements, addfield]);
  };
  const handleRemoveField = (cancelledElement: any) => {
    const updatedElements = showElements.filter((element) => element !== cancelledElement);
    setShowElements(updatedElements);
    console.log(showElements, "remove field");
  };

  useEffect(() => {
    setShowElements(transformEarningsArray(showElements));
  }, [annualctc, showElements, basicpercent]);

  // DEDUCTION CHANGES

  const handleChangedeductions = (index: any, field: any, value: any) => {
    // Update the state with the modified data
    const updateddeductions = [...showdeductions];
    updateddeductions[index] = { ...updateddeductions[index], [field]: value };
    setShowdeductions(updateddeductions);
    console.log(showdeductions, "changing deduction input elements");
  };
  const handleAdd = (addfield: any) => {
    setShowdeductions([...showdeductions, addfield]);
    console.log(showdeductions, " add field deductions ");
  };
  const handleRemove = (cancelledElement: any) => {
    const updateddeductions = showdeductions.filter((element) => element !== cancelledElement);
    setShowdeductions(updateddeductions);
    console.log(showdeductions, " remove field deductions ");
  };
  useEffect(() => {
    setShowdeductions(transformDeductionsArray(showdeductions));
  }, [showdeductions]);

  // fetching deductions and earning

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://10.0.20.133:8000/employee_salary_details/combined_data",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setBasicpercent(response.data.earning_types[0].enter_amount_or_percent);
          console.log(
            Number(response.data.earning_types[0].enter_amount_or_percent),
            "basic percent"
          );
          console.log(response.data, " api data");
          const transformarray = transformEarningsArray(response.data.earning_types);

          setData(transformEarningsArray(transformarray.slice(1)));
          console.log(transformEarningsArray(transformarray.slice(1)), " transform api data");
          setShowElements([transformarray[0]]);
          setBasicpercent(transformarray[0].enter_amount_or_percent);
          console.log(showElements, "default element");
          console.log(response.data.pre_tax_deductions, " deduction api data ");
          console.log(
            transformDeductionsArray(response.data.pre_tax_deductions),
            " transform deduction api data "
          );
          setDatadeduction(transformDeductionsArray(response.data.pre_tax_deductions));
        }
      } catch (error) {
        console.log("Data not found");
      }
    };
    fetchData();
  }, []);
  const dataTableData = {
    columns: [
      { Header: "SALARY COMPONENTS", accessor: "earning_type_name", width: "20%" },
      { Header: "CALCULATION TYPE", accessor: "calculation_type", width: "20%" },
      { Header: "MONTHLY AMOUNT", accessor: "monthly_amount", width: "20%" },
      { Header: "ANNUAL  AMOUNT", accessor: "annual_amount", width: "20%" },
      { Header: "ACTION", accessor: "action", width: "20%" },
    ],

    rows: showElements.map((row, _index) => ({
      calculation_type: (
        <div>
          {row.calculation_type === "% of Basic" || row.calculation_type === "% of CTC" ? (
            <MDTypography variant="p">
              <MDInput
                onChange={(e: { target: { value: any } }) => {
                  handleChange(_index, "enter_amount_or_percent", e.target.value);
                  // if (row.calculation_type === "% of Basic") {
                  //   setBasicpercent(showElements[_index].enter_amount_or_percent);
                  // }
                }}
                sx={{ width: "50px" }}
                // value={showElements[_index].enter_amount_or_percent}
                value={showElements[_index].enter_amount_or_percent}
              />
            </MDTypography>
          ) : (
            <MDTypography variant="caption"> system calculated </MDTypography>
          )}
          <MDTypography variant="p"> {row.calculation_type} </MDTypography>
        </div>
      ),
      earning_type_name: <MDTypography variant="p">{row.earning_type_name}</MDTypography>,
      monthly_amount: (
        <MDTypography variant="p">
          {" "}
          <MDInput
            sx={{ width: "100px" }}
            type="number"
            disabled={
              row.calculation_type === "% of CTC" || row.calculation_type === "% of Basic"
                ? true
                : false
            }
            onChange={(e: { target: { value: any } }) => {
              let monthlyAmount = e.target.value;

              handleChange(_index, "monthly_amount", Number(monthlyAmount));
              // Calculate and update annual amount
            }}
            value={showElements[_index].monthly_amount}
          />
        </MDTypography>
      ),
      annual_amount: (
        <MDTypography variant="p">
          <MDInput
            value={showElements[_index].annual_amount}
            disabled
            sx={{ width: "100px" }}
            p={2}
          />
        </MDTypography>
      ),

      action: (
        <>
          {row.calculation_type === "% of CTC" ? (
            <MDButton>
              <RemoveCircleOutlineIcon color="disabled" />
            </MDButton>
          ) : (
            <MDButton>
              <RemoveCircleOutlineIcon onClick={() => handleRemoveField(row)} color="primary" />
            </MDButton>
          )}
        </>
      ),
    })),
  };
  const deductionData = {
    columns: [
      { accessor: "pre_name_slip", width: "20%" },
      { accessor: "calculation_type", width: "20%" },
      { accessor: "monthly_amount", width: "20%" },
      { accessor: "annual_amount", width: "20%" },

      { accessor: "action", width: "20%" },
    ],

    rows: showdeductions.map((row, _index) => ({
      pre_name_slip: <MDTypography variant="p">{row.pre_name_slip}</MDTypography>,
      calculation_type: <MDTypography variant="p"> {row.calculation_type} </MDTypography>,
      monthly_amount: (
        <MDTypography variant="p">
          <MDInput
            sx={{ width: "100px" }}
            type="number"
            onChange={(e: { target: { value: any } }) => {
              let monthlyAmount = e.target.value;

              handleChangedeductions(_index, "monthly_amount", Number(monthlyAmount));
              // Calculate and update annual amount
            }}
            value={showdeductions[_index].monthly_amount}
          />
        </MDTypography>
      ),
      annual_amount: (
        <MDTypography variant="p">
          <MDInput
            value={showdeductions[_index].annual_amount}
            disabled
            sx={{ width: "100px" }}
            p={2}
          />
        </MDTypography>
      ),
      action: (
        <MDButton>
          <RemoveCircleOutlineIcon onClick={() => handleRemove(row)} color="primary" />
        </MDButton>
      ),
    })),
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    function removeAnnualAmount(data: any[]) {
      return data.map((item: any) => {
        // Create a copy of the object to avoid modifying the original array
        const newItem = { ...item };

        // Remove the "annual_amount" property
        delete newItem.annual_amount;
        // Converting monthly  amount to string
        newItem.monthly_amount = Math.round(newItem.monthly_amount).toString();
        return newItem;
      });
    }

    axios
      .post(
        "http://10.0.20.133:8000/mg_salary_template",
        {
          template_name: template,
          template_description: description,
          annual_ctc: annualctc,
          earnings_type_name: removeAnnualAmount(showElements),
          pre_tax_name: removeAnnualAmount(showdeductions),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        message.success("created successfully");
        if (response.status === 200) {
          console.log("success");
        }
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        const myError = error as Error;
        message.error("An unexpected error occurred");
      });
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} mb={2}>
            <MDTypography variant="h5">Salary Details</MDTypography>
          </Grid>
          <Grid item sm={3}>
            <Card>
              <Grid p={2}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="body2">EARNING</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {data.map((info, index) => (
                      <div
                        key={index}
                        style={{
                          display: showElements.some(
                            (a) => a.earning_type_name === info.earning_type_name
                          )
                            ? "none"
                            : "block",
                        }}
                      >
                        <Grid container>
                          <Grid item sm={10}>
                            <Typography variant="overline">{info?.earning_type_name}</Typography>
                          </Grid>
                          <Grid item sm={2}>
                            <MDButton
                              color="info"
                              variant="text"
                              onClick={() => handleAddField(info)}
                            >
                              <AddIcon />
                            </MDButton>
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="body2">DEDUCTIONS</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {datadeduction.map((info, index) => (
                      <div
                        key={index}
                        style={{
                          display: showdeductions.some(
                            (a) => a.pre_name_slip === info.pre_name_slip
                          )
                            ? "none"
                            : "block",
                        }}
                      >
                        <Grid container>
                          <Grid item sm={10}>
                            <Typography variant="overline">{info?.pre_name_slip}</Typography>
                          </Grid>
                          <Grid item sm={2}>
                            <MDButton
                              color="info"
                              variant="text"
                              onClick={() => {
                                handleAdd(info);
                              }}
                            >
                              <AddIcon />
                            </MDButton>
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Card>
          </Grid>
          <Grid item sm={9}>
            <Card sx={{ borderRadius: 0 }}>
              <Grid container px={4} pt={2}>
                <Grid item sm={6} sx={{ display: "flex", justifyContent: "center" }}>
                  <MDTypography variant="h6">Template Name</MDTypography>
                </Grid>
                <Grid item sm={6} sx={{ display: "flex", justifyContent: "center" }}>
                  <MDTypography variant="h6">Description</MDTypography>
                </Grid>
              </Grid>
              <Grid container px={4}>
                <Grid item sm={6} sx={{ display: "flex", justifyContent: "center" }}>
                  <MDInput
                    required
                    onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
                      setTemplate(e.target.value)
                    }
                    value={template}
                  />
                </Grid>
                <Grid item sm={6} sx={{ display: "flex", justifyContent: "center" }}>
                  <MDInput
                    required
                    onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
                      setDescription(e.target.value)
                    }
                    value={description}
                  />
                </Grid>
              </Grid>
              <Grid container p={4}>
                <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                  <MDTypography variant="h6">Annual CTC *</MDTypography>
                </Grid>
                <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                  <MDInput
                    required
                    onChange={(e: { target: { value: React.SetStateAction<number> } }) =>
                      setAnnualctc(e.target.value)
                    }
                    value={annualctc}
                  />
                </Grid>
              </Grid>
              <Grid sx={{ display: "flex", justifyContent: "flex-start" }} p={2}>
                <MDTypography variant="h6">EARNINGS</MDTypography>
              </Grid>
              <DataTable
                table={dataTableData}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
              />
              {showdeductions.length === 0 ? (
                ""
              ) : (
                <Grid sx={{ display: "flex", justifyContent: "flex-start" }} pl={2}>
                  <MDTypography variant="h6">DEDUCTIONS</MDTypography>
                </Grid>
              )}
              <DataTable
                table={deductionData}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
              />
            </Card>
          </Grid>
        </Grid>
        <Grid container m={4}>
          <Grid item>
            <MDButton color="info" variant="contained" type="submit">
              Save
            </MDButton>
          </Grid>
          <Grid item ml={2}>
            <MDButton color="primary" variant="outlined" onClick={() => navigate("")}>
              Back
            </MDButton>
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
};

export default SalaryTemp;
