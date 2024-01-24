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
import { useFormik } from "formik";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import TungstenOutlinedIcon from "@mui/icons-material/TungstenOutlined";
import { Autocomplete, Card, Checkbox, Divider, Grid } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const signUpSchema = yup.object({
  epf: yup.string().min(2).max(25).required("epf address is required."),
  Monthly: yup.string().min(2).max(15).required("Monthly address is required."),
  // employee_contribution: yup
  //   .string()
  //   .min(2)
  //   .max(15)
  //   .required("employee contribution address is required."),
});

const initialValues = {
  epf: "",
  Monthly: "",
  employee_contribution: "",
  Contribution: [] as string[],
  emplevel: [] as string[],
  pfWage: [] as string[],
  lossPay: [] as string[],
  abrySchema: [] as string[],
  wage: [] as string[],
  computed: [] as string[],
};

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

let packag1 = 0;
let packag2 = 0;
let packag3 = 0;

for (let package1: any = 0; package1 < wage_patment.length; package1++) {
  packag1 = packag1 + wage_patment[package1].package1;
}
console.log(packag1);

for (let package2: any = 0; package2 < wage_patment.length; package2++) {
  packag2 = packag2 + wage_patment[package2].package2;
}
console.log(packag2);

for (let package3: any = 0; package3 < wage_patment.length; package3++) {
  packag3 = packag3 + wage_patment[package3].package3;
}
console.log(packag3);

const total_payment = {
  salary_components: "EPF Contribution",
  package1: packag1,
  package2: packag2,
  package3: packag3,
};
wage_patment.push(total_payment);

const wagepayment = {
  columns: [
    { Header: "SALARY COMPONENTS", accessor: "salary_components" },
    { Header: "PACKAGE 1", accessor: "package1" },
    { Header: "PACKAGE 2", accessor: "package2" },
    { Header: "PACKAGE 3", accessor: "package3" },
  ],
  rows: wage_patment.map((data, index) => ({
    salary_components: data.salary_components,
    package1: data.package1,
    package2: data.package2,
    package3: data.package3,
  })),
};

const Employees_Provident_Fund = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      console.log("🚀 ~ file: Employees_Provident_Fund.tsx:23 ~ values:", values);
      action.resetForm();
    },
  });

  // console.log("🚀 ~ file: Employees_Provident_Fund.tsx:28 ~ errors:", errors);

  const [open, setOpen] = react.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox mt={4}>
        <Grid container spacing={3}>
          <Grid container>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="h5" p={2}>
                Employee Provident Fund
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="h5" p={2}>
                EPF Calculation
              </MDTypography>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Grid container spacing={3}>
              <Card sx={{ width: "100%", mt: "3" }}>
                <form onSubmit={handleSubmit}>
                  <MDBox p={3}>
                    <Grid container>
                      <Grid item xs={12} sm={7}>
                        <MDTypography variant="h6">EPF Number</MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <MDTypography variant="h6">Deduction Cycle</MDTypography>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={12} sm={7}>
                        <MDInput
                          sx={{ width: "90%" }}
                          type="text"
                          placeholder="AA/AAA/00000/XXX"
                          name="epf"
                          value={values.epf}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.epf && Boolean(errors.epf)}
                          helperText={touched.epf && errors.epf}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <MDInput
                          sx={{ width: "80%" }}
                          type="text"
                          placeholder="Monthly"
                          name="Monthly"
                          value={values.Monthly}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.Monthly && Boolean(errors.Monthly)}
                          helperText={touched.Monthly && errors.Monthly}
                        />
                      </Grid>
                    </Grid>
                    <br />

                    <Grid item xs={12} sm={12}>
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
                            name="employee contribution"
                            value={values.employee_contribution}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.employee_contribution && Boolean(errors.employee_contribution)
                            }
                            helperText={
                              touched.employee_contribution && errors.employee_contribution
                            }
                          />
                        )}
                      />
                    </Grid>
                    <br />

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
                              name="Contribution"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value="Include employer`s contribution in the CTC"
                              checked={values.Contribution.includes(
                                "Include employer`s contribution in the CTC"
                              )}
                            />
                          }
                        />
                        {values.Contribution.includes(
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
                                name="wage"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value="PF wage will be computed"
                                checked={values.wage.includes("PF wage will be computed")}
                              />
                            }
                          />
                        ) : null}

                        {values.Contribution.includes(
                          "Include employer`s contribution in the CTC"
                        ) ? (
                          <FormControlLabel
                            label={
                              <MDTypography variant="button">Pro rate Restricted</MDTypography>
                            }
                            control={
                              <Checkbox
                                name="computed"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value="wage will be computed"
                                checked={values.computed.includes("wage will be computed")}
                              />
                            }
                          />
                        ) : null}
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={12} sm={12}>
                        <FormControlLabel
                          label={
                            <MDTypography variant="button">
                              Override PF contribution rate at employee level
                            </MDTypography>
                          }
                          control={
                            <Checkbox
                              name="emplevel"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value="Override PF contribution rate at employee level"
                              checked={values.emplevel.includes(
                                "Override PF contribution rate at employee level"
                              )}
                            />
                          }
                        />
                      </Grid>
                    </Grid>
                    <br />

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
                              name="pfWage"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value="PF contribution will be pro-rated "
                              checked={values.pfWage.includes("PF contribution will be pro-rated ")}
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
                              Pro rate Restricted PF Wage
                            </MDTypography>
                          }
                          control={
                            <Checkbox
                              name="lossPay"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value="PF wage will be computed using the salary "
                              checked={values.lossPay.includes(
                                "PF wage will be computed using the salary "
                              )}
                            />
                          }
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <MDTypography variant="caption">
                        PF wage will be computed using the salary earned in that particular month
                        (based on LOP) rather than the actual amount mentioned in the salary
                        structure.
                      </MDTypography>
                    </Grid>
                    <br />

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
                              name="abrySchema"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value="Eligible for ABRY Scheme"
                              checked={values.abrySchema.includes("Eligible for ABRY Scheme")}
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
                        <MDButton variant="contained" color="secondary" type="submit">
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

              <Card sx={{ width: "85%", margin: "auto", mt: "4%" }}>
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
                      {values.wage.includes("PF wage will be computed") ? (
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
                      {values.computed.includes("wage will be computed") ? (
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
                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle variant="h6">EPF Sample Calculation</DialogTitle>
                        <Divider />

                        <MDBox p={5}>
                          <DialogContent>
                            <DialogContentText>
                              Let`s assume the salary packages considered for EPF is as shown as
                              below, the calculation is based on the settings we`ve configured
                            </DialogContentText>

                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography variant="body2">Show current configuration </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography variant="overline">
                                  PF CONTRIBUTION SETTINGS <br /> Employer Contribution: 12% of
                                  Actual PF Wage <br /> Employee Contribution: 12% of Actual PF{" "}
                                  <br /> Wage LOP CONTRIBUTION Pro-rate Restricted PF Wage : disable
                                  <br />
                                  Consider all components when PF wage ₹15,000 after LOP : Disabled
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          </DialogContent>

                          <Grid container>
                            <Grid item xs={12} sm={8}>
                              <MDTypography variant="h6">Payroll Journal Summary</MDTypography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <MDTypography variant="h6" sx={{ textAlign: "right" }}>
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
              <br />

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
