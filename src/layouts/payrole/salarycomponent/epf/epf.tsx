import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
} from "@mui/material";
import react from "react";
import * as yup from "yup";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useFormik } from "formik";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import TungstenOutlinedIcon from "@mui/icons-material/TungstenOutlined";
import { Autocomplete, Card, Checkbox, Divider, Grid } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const wage_patment = [
  {
    salary_components: "Basic Always considered for EPF",
    package1: 847585.0,
    package2: 45767586.0,
    package3: 847558.0,
  },
  {
    salary_components: "Transport Allowance Considered",
    package1: 847585.0,
    package2: 45767586.0,
    package3: 847558.0,
  },
  {
    salary_components: "Telephone Allowance Considered",
    package1: 989357.0,
    package2: 983576332.0,
    package3: 847558.0,
  },
];
const token = Cookies.get("token");
export const signUpSchema = yup.object({
  epf_number: yup.string().min(2).max(25).required("epf_number address is required."),
  epf_deduction_cycle: yup.string().min(2).required("epf_deduction_cycle address is required."),
});

const Employees_Provident_Fund = (props: any) => {
  const [showdaysloop, setShowdaysloop] = useState(false);
  let initialValues = {
    epf_number: "",
    epf_deduction_cycle: "",
    employee_contribution_rate: "12% Of Actual PF Wage",
    employer_contribution_rate: "12% Of Actual PF Wage",
    employer_contribution_ctc: [] as string[],
    contribution_at_employee_level: [] as string[],
    configuration_lop_applied: [] as string[],
    abry_eligibility: [] as string[],
  };
  if (props.data) {
    initialValues = props.data;
  }
  const handleCheckboxChange = (event: any) => {
    setShowdaysloop(event.target.checked);
  };
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,

    onSubmit: async (values, action) => {
      const sendData = {
        abry_eligibility: values.abry_eligibility.join(", "),
        configuration_lop_applied: values.configuration_lop_applied,
        contribution_at_employee_level: values.contribution_at_employee_level.join(", "),
        employee_contribution_rate: values.employee_contribution_rate,
        employer_contribution_ctc: values.employer_contribution_ctc,
        employer_contribution_rate: values.employer_contribution_rate,
        epf_deduction_cycle: values.epf_deduction_cycle,
        epf_number: values.epf_number,
      };
      try {
        await axios
          .post("http://10.0.20.133:8000/mg_epf", sendData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              action.resetForm();
              console.log("Created Earning Successfully");
              navigate("/payrole/salarycomponent/epf");
            }
            window.location.reload();
            action.resetForm();
          });
      } catch (error) {
        console.error("Error saving data:", error);
      }
    },
  });

  const [open, setOpen] = react.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  interface Row {
    salary_components: React.ReactNode;
    package1: number;
    package2: number;
    package3: number;
  }

  const wagepayment = {
    columns: [
      {
        Header: (
          <span>
            SALARY COMPONENTS
            {showdaysloop ? (
              <span
                style={{
                  color: "white",
                  border: "1px solid",
                  padding: "2px 4px",
                  fontSize: "1.0em",
                  cursor: "pointer",
                  borderRadius: "4px",
                  backgroundColor: "#ff8f00",
                }}
              >
                WITH 15 DAYS LOP
              </span>
            ) : (
              ""
            )}
          </span>
        ),
        accessor: "salary_components",
      },
      { Header: "PACKAGE 1", accessor: "package1" },
      { Header: "PACKAGE 2", accessor: "package2" },
      { Header: "PACKAGE 3", accessor: "package3" },
    ],

    rows: ([] as Row[]).concat(
      wage_patment.map((data, index) => ({
        salary_components: data.salary_components,
        package1: showdaysloop ? data.package1 / 2 : data.package1,
        package2: showdaysloop ? data.package2 / 2 : data.package2,
        package3: showdaysloop ? data.package3 / 2 : data.package3,
      })),
      {
        salary_components: (
          <span style={{ fontWeight: "bold" }}>
            EPF Contribution
            {showdaysloop ? (
              <span
                style={{
                  color: "white",
                  border: "1px solid",
                  padding: "2px 4px",
                  fontSize: "0.8em",
                  cursor: "pointer",
                  borderRadius: "4px",
                  backgroundColor: "#ff8f00",
                }}
              >
                WITH 15 DAYS LOP
              </span>
            ) : (
              ""
            )}
          </span>
        ),
        package1: wage_patment.reduce(
          (total, data) => total + (showdaysloop ? data.package1 / 2 : data.package1),
          0
        ),
        package2: wage_patment.reduce(
          (total, data) => total + (showdaysloop ? data.package2 / 2 : data.package2),
          0
        ),
        package3: wage_patment.reduce(
          (total, data) => total + (showdaysloop ? data.package3 / 2 : data.package3),
          0
        ),
      }
    ),
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={3}>
              <Card sx={{ width: "100%", mt: "3" }}>
                <form onSubmit={handleSubmit}>
                  <MDBox p={3}>
                    <Grid container>
                      <Grid item xs={12} sm={12}>
                        <MDTypography variant="h5" py={2}>
                          Employee Provident Fund
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={7}>
                        <MDTypography variant="h6">EPF Number</MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <MDTypography variant="h6">Deduction Cycle</MDTypography>
                      </Grid>
                    </Grid>

                    <Grid container mb={2}>
                      <Grid item xs={12} sm={7}>
                        <MDInput
                          sx={{ width: "90%" }}
                          type="text"
                          placeholder="AA/AAA/00000/XXX"
                          name="epf_number"
                          value={values.epf_number}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.epf_number && Boolean(errors.epf_number)}
                          helperText={touched.epf_number && errors.epf_number}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <MDInput
                          sx={{ width: "80%" }}
                          type="text"
                          placeholder="Monthly"
                          name="epf_deduction_cycle"
                          value={values.epf_deduction_cycle}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.epf_deduction_cycle && Boolean(errors.epf_deduction_cycle)}
                          helperText={touched.epf_deduction_cycle && errors.epf_deduction_cycle}
                        />
                      </Grid>
                    </Grid>

                    <Grid container mb={2}>
                      <Grid item xs={12} sm={6}>
                        <MDTypography variant="h6">Employee Contribution Rate</MDTypography>

                        <Autocomplete
                          defaultValue="12% Of Actual PF Wages"
                          options={[
                            "12% Of Actual PF Wages",
                            "Restric Contribution fo 15,000 of PF Wage",
                          ]}
                          renderInput={(params) => (
                            <MDInput
                              {...params}
                              sx={{ width: "80%" }}
                              type="text"
                              placeholder="12% Of Actual PF Wage"
                              name="employee_contribution_rate"
                              value={values.employee_contribution_rate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.employee_contribution_rate &&
                                Boolean(errors.employee_contribution_rate)
                              }
                              helperText={
                                touched.employee_contribution_rate &&
                                errors.employee_contribution_rate
                              }
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MDTypography variant="h6">Employer Contribution Rate</MDTypography>

                        <Autocomplete
                          defaultValue="12% Of Actual PF Wages"
                          options={[
                            "12% Of Actual PF Wages",
                            "Restric Contribution fo 15,000 of PF Wage",
                          ]}
                          renderInput={(params) => (
                            <MDInput
                              {...params}
                              sx={{ width: "80%" }}
                              type="text"
                              placeholder="12% Of Actual PF Wage"
                              name="employer_contribution_rate"
                              value={values.employer_contribution_rate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.employer_contribution_rate &&
                                Boolean(errors.employer_contribution_rate)
                              }
                              helperText={
                                touched.employer_contribution_rate &&
                                errors.employer_contribution_rate
                              }
                            />
                          )}
                        />
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={12} sm={12}>
                        <FormControlLabel
                          label={
                            <MDTypography variant="button">
                              Include employer`s contribution in the CTC
                            </MDTypography>
                          }
                          control={
                            <Checkbox
                              name="employer_contribution_ctc"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value="Include employer`s contribution in the CTC"
                              checked={values.employer_contribution_ctc.includes(
                                "Include employer`s contribution in the CTC"
                              )}
                            />
                          }
                        />
                        {values.employer_contribution_ctc.includes(
                          "Include employer`s contribution in the CTC"
                        ) ? (
                          <FormControlLabel
                            label={
                              <MDTypography variant="button">
                                Pro rate Restricted PF Wage
                              </MDTypography>
                            }
                            control={
                              <Checkbox
                                name="employer_contribution_ctc"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value="Pro rate Restricted PF Wage"
                                checked={values.employer_contribution_ctc.includes(
                                  "Pro rate Restricted PF Wage"
                                )}
                              />
                            }
                          />
                        ) : null}

                        {values.employer_contribution_ctc.includes(
                          "Include employer`s contribution in the CTC"
                        ) ? (
                          <FormControlLabel
                            label={
                              <MDTypography variant="button">Pro rate Restricted</MDTypography>
                            }
                            control={
                              <Checkbox
                                name="employer_contribution_ctc"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value="Pro rate Restricted"
                                checked={values.employer_contribution_ctc.includes(
                                  "Pro rate Restricted"
                                )}
                              />
                            }
                          />
                        ) : null}
                      </Grid>
                    </Grid>

                    <Grid container mb={2}>
                      <Grid item xs={12} sm={12}>
                        <FormControlLabel
                          label={
                            <MDTypography variant="button">
                              Override PF contribution rate at employee level
                            </MDTypography>
                          }
                          control={
                            <Checkbox
                              name="contribution_at_employee_level"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value="Override PF contribution rate at employee level"
                              checked={values.contribution_at_employee_level.includes(
                                "Override PF contribution rate at employee level"
                              )}
                            />
                          }
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <MDTypography variant="h6">PF Configuration when LOP Applied</MDTypography>
                    </Grid>

                    <Grid container>
                      <Grid item xs={12} sm={12}>
                        <FormControlLabel
                          label={
                            <MDTypography variant="button">
                              Pro rate Restricted PF Wage
                            </MDTypography>
                          }
                          control={
                            <Checkbox
                              name="configuration_lop_applied"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value="Pro rate Restricted PF Wage"
                              checked={values.configuration_lop_applied.includes(
                                "Pro rate Restricted PF Wage"
                              )}
                            />
                          }
                        />
                      </Grid>

                      <Grid item xs={12} sm={12}>
                        <MDTypography variant="caption">
                          PF contribution will be pro-rated based on the number of days worked by
                          the employee.
                        </MDTypography>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={12} sm={12}>
                        <FormControlLabel
                          label={
                            <MDTypography variant="button">
                              Consider all applicable salary components if PF wage is less than
                              ₹15,000 after Loss of Pay
                            </MDTypography>
                          }
                          control={
                            <Checkbox
                              name="configuration_lop_applied"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value="Consider all applicable salary components if PF wage is less than ₹15,000 after Loss of Pay"
                              checked={values.configuration_lop_applied.includes(
                                "Consider all applicable salary components if PF wage is less than ₹15,000 after Loss of Pay"
                              )}
                            />
                          }
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} mb={2}>
                      <MDTypography variant="caption">
                        PF wage will be computed using the salary earned in that particular month
                        (based on LOP) rather than the actual amount mentioned in the salary
                        structure.
                      </MDTypography>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <MDTypography variant="h6">ABRY eligibility</MDTypography>
                    </Grid>

                    <Grid container>
                      <Grid item xs={12} sm={12}>
                        <FormControlLabel
                          label={
                            <MDTypography variant="button">Eligible for ABRY Scheme</MDTypography>
                          }
                          control={
                            <Checkbox
                              name="abry_eligibility"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value="Eligible for ABRY Scheme"
                              checked={values.abry_eligibility.includes("Eligible for ABRY Scheme")}
                            />
                          }
                        />

                        <Grid item xs={12} sm={12}>
                          <MDTypography variant="caption">
                            The EPF contribution of both the employee and the employer (with a few
                            exceptions) will be paid by the Government for eligible employees who
                            receive up to ₹ 15,000 in monthly wages.
                          </MDTypography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={12} sm={10.5} sx={{ textAlign: "right" }}>
                        <MDButton variant="contained" color="secondary">
                          cancel
                        </MDButton>
                      </Grid>

                      <Grid item xs={12} sm={1.5} sx={{ textAlign: "right" }}>
                        <MDButton variant="contained" color="info" type="submit">
                          save
                        </MDButton>
                      </Grid>
                    </Grid>
                  </MDBox>
                </form>
              </Card>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card style={{ backgroundColor: "#11ffeeff" }} sx={{ width: "100%", mt: "3" }}>
              <MDBox p={3}>
                <MDTypography variant="h5">Sample EPF Calculation</MDTypography>
                <Divider />
                <MDTypography variant="button">
                  Let`s assume the PF wage is ₹ 20,000. The breakup of contribution will be:
                </MDTypography>
              </MDBox>

              <Card sx={{ width: "85%", margin: "auto", mt: "4%", mb: "2%" }}>
                <MDBox p={2}>
                  <MDTypography variant="h5">Employee`s Contribution</MDTypography>

                  <Grid container>
                    <Grid item xs={12} sm={8}>
                      <MDTypography variant="caption">EPF (12% of 20000)</MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                      <MDTypography variant="caption">₹ 2400</MDTypography>
                    </Grid>
                  </Grid>
                  <Divider />

                  <MDTypography variant="h6">Employer`s Contribution</MDTypography>
                  <Grid container>
                    <Grid item xs={12} sm={8}>
                      <MDTypography variant="caption">
                        EPS (8.33% of 20000 (Max of ₹ 15,000))
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                      <MDTypography variant="caption">₹ 1250</MDTypography>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={12} sm={8}>
                      <MDTypography variant="caption">EPF (12% of 20000 - EPS)</MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                      <MDTypography variant="caption">₹ 1150</MDTypography>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={12} sm={8}>
                      {values.employer_contribution_ctc.includes("Pro rate Restricted PF Wage") ? (
                        <Grid container>
                          <Grid item xs={12} sm={8}>
                            <MDTypography variant="caption">
                              EDLI Contribution (0.50% of 20000)
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                            <MDTypography variant="caption"> ₹ 75</MDTypography>
                          </Grid>
                        </Grid>
                      ) : null}
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={12} sm={8}>
                      {values.employer_contribution_ctc.includes("Pro rate Restricted") ? (
                        <Grid container>
                          <Grid item xs={12} sm={8}>
                            <MDTypography variant="caption">
                              EPF Admin Charges (0.50% of 20000)
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                            <MDTypography variant="caption">₹ 100</MDTypography>
                          </Grid>
                        </Grid>
                      ) : null}
                    </Grid>
                  </Grid>
                  <Divider />
                  <div>
                    <Button variant="text" onClick={handleClickOpen}>
                      <RemoveRedEyeOutlinedIcon /> Preview EPF Calculation
                    </Button>

                    <Card sx={{ width: "100%", margin: "auto", mt: "4%" }}>
                      <Dialog open={open} onClose={handleClose} maxWidth="lg">
                        <DialogTitle variant="h6">EPF Sample Calculation</DialogTitle>
                        <Divider />

                        <MDBox p={2} mt={-2} mb={-2}>
                          <DialogContent>
                            <DialogContentText>
                              Lets assume the salary packages considered for EPF is as shown as
                              below, the calculation is based on the settings weve configured
                            </DialogContentText>

                            <Accordion sx={{ boxShadow: "none" }}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography variant="overline" sx={{ color: "#2962ff" }}>
                                  Show current configuration
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Grid container>
                                  <Grid item xs={12} sm={12}>
                                    <Typography variant="overline" sx={{ color: "#2962ff" }}>
                                      PF CONTRIBUTION SETTINGS
                                    </Typography>
                                  </Grid>

                                  <Grid item xs={12} sm={12}>
                                    <Typography variant="overline">
                                      Employer Contribution : 12% of Actual PF Wage
                                    </Typography>
                                  </Grid>

                                  <Grid item xs={12} sm={12}>
                                    <Typography variant="overline">
                                      Employee Contribution: 12% of Actual PF Wage
                                    </Typography>
                                  </Grid>
                                </Grid>

                                <Grid container>
                                  <Grid item xs={12} sm={12}>
                                    <Typography variant="overline" sx={{ color: "#2962ff" }}>
                                      LOP CONTRIBUTION
                                    </Typography>
                                  </Grid>

                                  <Grid item xs={12} sm={12}>
                                    {values.configuration_lop_applied.includes(
                                      "Pro rate Restricted PF Wage"
                                    ) ? (
                                      <>
                                        <Typography variant="overline">
                                          Pro-rate Restricted PF Wage :
                                          <span style={{ fontWeight: "bold", color: "#66bb6a" }}>
                                            Enabled
                                          </span>
                                        </Typography>
                                      </>
                                    ) : (
                                      <Typography variant="overline">
                                        Pro-rate Restricted PF Wage :
                                        <span style={{ fontWeight: "bold" }}>Disabled</span>
                                      </Typography>
                                    )}
                                  </Grid>

                                  <Grid item xs={12} sm={12}>
                                    {values.configuration_lop_applied.includes(
                                      "Consider all applicable salary components if PF wage is less than ₹15,000 after Loss of Pay"
                                    ) ? (
                                      <>
                                        <Typography variant="overline">
                                          Consider all components when PF wage less ₹15,000 after
                                          LOP :
                                          <span style={{ fontWeight: "bold", color: "#66bb6a" }}>
                                            Enabled
                                          </span>
                                        </Typography>
                                      </>
                                    ) : (
                                      <Typography variant="overline">
                                        Consider all components when PF wage less ₹15,000 after LOP
                                        : <span style={{ fontWeight: "bold" }}>Disabled</span>
                                      </Typography>
                                    )}
                                  </Grid>
                                </Grid>
                              </AccordionDetails>
                            </Accordion>
                          </DialogContent>

                          <Grid container>
                            <Grid item xs={12} sm={8}>
                              <MDTypography variant="h6">Payroll Journal Summary</MDTypography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <MDTypography variant="h6" sx={{ textAlign: "right" }}>
                                <Checkbox checked={showdaysloop} onChange={handleCheckboxChange} />
                                With 15 days LOP
                              </MDTypography>
                            </Grid>

                            <DataTable table={wagepayment} />
                          </Grid>
                        </MDBox>
                        <Divider />
                        <DialogActions>
                          <Button onClick={handleClose}>Okay got it!</Button>
                        </DialogActions>
                      </Dialog>
                    </Card>
                  </div>
                </MDBox>
              </Card>

              <Grid container>
                <Grid item xs={12} sm={1}>
                  <TungstenOutlinedIcon />
                </Grid>
                <Grid item xs={12} sm={11}>
                  <MDTypography variant="button">
                    Do you want to preview EPF calculation for multiple cases, based on the
                    preferences you have configured ?
                  </MDTypography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
};

export default Employees_Provident_Fund;
