import { Button, Card, Grid, Link } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function reports(): JSX.Element {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "100%", margin: "auto", mt: "4%" }}>
        <MDBox p={4}>
          <MDTypography variant="h4" mb={3}>
            Reports
          </MDTypography>

          <Grid container>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="h6" mb={2}>
                Payroll Overview
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="h6" mb={2}>
                Statutory Reports
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="h6" mb={2}>
                Employee Reports
              </MDTypography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="button">
                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href="/pages/profile/Payroll_summary"
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    Payroll Summary
                  </Link>
                </Grid>

                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href="/pages/profile/Employees_Pay_Summary"
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    Employees` Pay Summary
                  </Link>
                </Grid>

                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href="/pages/profile/payroll liability summary"
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    Payroll Liability Summary
                  </Link>
                </Grid>

                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href="/pages/profile/payroll liability summary"
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    Payroll Liability Summary
                  </Link>
                </Grid>

                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href="/pages/profile/payroll liability summary"
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    Leave Encashment Summary
                  </Link>
                </Grid>

                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href="/pages/profile/payroll liability summary"
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    LOP Summary
                  </Link>
                </Grid>

                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href="/pages/profile/payroll liability summary"
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    Variable Pay Earnings Report
                  </Link>
                </Grid>
              </MDTypography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <MDTypography variant="button">
                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href="/pages/profile/EPF ECR Report"
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    EPF ECR Report
                  </Link>
                </Grid>

                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href="/pages/profile/ESI Summary"
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    ESI Summary
                  </Link>
                </Grid>

                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href="/pages/profile/ESIC Return Report"
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    ESIC Return Report
                  </Link>
                </Grid>

                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link href="/pages/profile/PT Summary" sx={{ color: "#2962ff" }} underline="none">
                    PT Summary
                  </Link>
                </Grid>

                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href="/pages/profile/PT Monthly statement"
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    PT Monthly Statement
                  </Link>
                </Grid>

                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href="/pages/profile/Annual Return Statement "
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    Annual Return Statement
                  </Link>
                </Grid>

                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href="/pages/profile/LWF Summary "
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    LWF Summary
                  </Link>
                </Grid>
              </MDTypography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <MDTypography variant="button">
                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href=" /pages/profile/Employees_Perquisite"
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    Employees Perquisite summary
                  </Link>
                </Grid>

                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href="/pages/profile/Employees Settlement"
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    Employees Full and Final Settlement
                  </Link>
                </Grid>

                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href="/pages/profile/Salary Revision Report"
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    Salary Revision Report
                  </Link>
                </Grid>

                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href="/pages/profile/Salary Withhold Report"
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    Salary Withhold Report
                  </Link>
                </Grid>
              </MDTypography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="h6" mb={2} mt={1}>
                Deduction Reports
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="h6" mb={2} mt={1}>
                Taxes and Forms
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="h6" mb={2} mt={1}>
                Loan Reports
              </MDTypography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="button">
                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href="/pages/profile/DeductionSummary"
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    Deductions Summary
                  </Link>
                </Grid>

                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href="/pages/profile/Post_Tax_Deductions_Summary"
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    Post-Tax Deductions Summary
                  </Link>
                </Grid>

                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href="/pages/profile/Pre_Tax_Deductions_Summary"
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    Pre-Tax Deductions Summary
                  </Link>
                </Grid>
              </MDTypography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <MDTypography variant="button">
                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href="/pages/profile/Tax_Deduction_Summary"
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    Tax Deduction Summary
                  </Link>
                </Grid>
              </MDTypography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <MDTypography variant="button">
                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href="/pages/profile/Loan_Perquisite_Summary"
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    Loan Perquisite Summary
                  </Link>
                </Grid>
              </MDTypography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="h6" mb={2} mt={1}>
                Payroll Journal
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="h6" mb={2} mt={1}>
                Activity
              </MDTypography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="button">
                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link
                    href="/pages/profile/Payroll Journal Summary"
                    sx={{ color: "#2962ff" }}
                    underline="none"
                  >
                    Payroll Journal Summary
                  </Link>
                </Grid>
              </MDTypography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <MDTypography variant="button">
                <Grid item xs={12} sm={12} mb={1}>
                  <KeyboardArrowRightIcon />
                  <Link href="/pages/profile/activelog" sx={{ color: "#2962ff" }} underline="none">
                    Activity Logs
                  </Link>
                </Grid>
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}
export default reports;
