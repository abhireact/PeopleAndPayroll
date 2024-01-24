import React from "react";
import jsPDF from "jspdf";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import axios from "axios";

const DownloadButton = () => {
  const downloadPDF = async () => {
    const content = document.getElementById("content");

    // const contentWidth = content.offsetWidth; Set content width

    // Create jsPDF instance with custom width

    const doc = new jsPDF("p", "pt", [722, 1000]);

    const padding = 23;

    let currentPageHeight = doc.internal.pageSize.height - padding * 2;

    let accumulatedHeight = 0;

    let currentPageNumber = 1;

    // Iterate through child nodes

    for (const child of content.childNodes) {
      const elementHeight = (child as HTMLElement).offsetHeight + padding;

      // Check if element fits on the current page

      if (elementHeight > currentPageHeight) {
        // Add the current page and start a new one

        doc.addPage();

        currentPageHeight = doc.internal.pageSize.height - padding * 2;

        currentPageNumber++;
      }

      // Add the element to the current page

      await doc.html(child as HTMLElement, { callback: () => {} });

      accumulatedHeight += elementHeight;

      currentPageHeight -= elementHeight;
    }

    // Save the PDF

    doc.save(`form16b.pdf`);
  };

  return (
    <>
      <MDButton onClick={downloadPDF} color="info" variant="contained">
        Download
      </MDButton>
    </>
  );
};

const Pdfdown = (props: any) => {
  const { setOpenupdate, emaildata } = props;
  const [data, setData] = useState({
    employee_name: "string",
    email: "string",
    pan: "string",
    present_address: "string",
    total_earnings: 0,
    total_hra: 0,
    total_travel_allowance: 0,
    total_gratuity: 0,
    commuted_value_of_pension: 0,
    cash_equivalent_of_leave_salary: 0,
    total_amount_of_exemption: 0,
    total_amount_of_salary_received: 0,
    standard_deduction: 0,
    entertainment_allowance: 0,
    tax_on_employment: 0,
    total_amount_of_deduction: 0,
    income_chargeable: 0,
    income_from_house_property: 0,
    income_under_the_head_source: 0,
    total_amount_of_other_income: 0,
    gross_total_income: 0,
    deduction_in_life_insurance: 0,
    contribution_to_pension: 0,
    contribution_by_taxpayer: 0,
    health_insurance_premia: 0,
    intrest_on_loan_taken: 0,
    total_deduction: 0,
    aggregate_of_deductible_amount: 0,
    total_tax_incomme: 0,
    rebate_under_section_87A: 0,
    tax_after_rebate_under_section_87A: 0,
    health_and_education_cess: 0,
    tax_payable: 0,
    net_tax_payable: 0,
  });
  useEffect(() => {
    axios
      .post(
        "http://10.0.20.133:8000/employee_salary_details/generate_pay_report/form16",

        {
          email: emaildata,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvX2lkIjoxLCJlbWFpbCI6IjIwMDNvbTE3MTFAZ21haWwuY29tIiwiZXhwIjoxNzAyOTgwOTc5fQ.dy21_oSwrreB3J0z2J7Kvw3oIcP216jFAqSxWUsG-5s`,
          },
        }
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const tableStyle: React.CSSProperties = {
    borderCollapse: "collapse",
    margin: "auto",
    width: "100%",
  };

  const tdStyle: React.CSSProperties = {
    border: "1px solid #151516",
    textAlign: "center",
    padding: "8px",
    fontSize: "14px",
  };

  const thStyle: React.CSSProperties = {
    border: "1px solid #151516",
    textAlign: "center",
    padding: "8px",
    fontSize: "16px",
    fontWeight: "bold",
  };

  const handleCloseupdate = () => {
    setOpenupdate(false);
  };
  return (
    <MDBox m={2}>
      <div>
        <Grid sx={{ display: "flex", justifyContent: "space-between" }} mb={2}>
          <MDButton
            color="primary"
            variant="outlined"
            onClick={() => {
              handleCloseupdate();
            }}
          >
            &lt;-BACK
          </MDButton>
          <DownloadButton />
        </Grid>
      </div>

      <div id="content">
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={thStyle} colSpan={5}>
                FORM NO. 16 B
              </td>
            </tr>
            <tr>
              <td style={tdStyle} colSpan={5}>
                Details of Salary Paid and any other income and tax deducted
              </td>
            </tr>
            <tr>
              <td style={tdStyle} colSpan={5}>
                Details of Salary Paid and any other income and tax deducted
              </td>
            </tr>

            <tr>
              <td style={tdStyle}>1.</td>
              <td style={tdStyle} colSpan={4}>
                Gross salary
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>(a)</td>
              <td style={tdStyle}>Salary as per provisions contained in section 17(1)</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>{data.total_earnings ? data.total_earnings : 0.0}</td>
              <td style={tdStyle}></td>
            </tr>
            <tr>
              <td style={tdStyle}>(b)</td>
              <td style={tdStyle}>Value of perquisites under section 17(2)</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>0</td>
              <td style={tdStyle}></td>
            </tr>
            <tr>
              <td style={tdStyle}>(c)</td>
              <td style={tdStyle}>Profits in lieu of salary under section 17(3)</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>0</td>
              <td style={tdStyle}></td>
            </tr>
            <tr>
              <td style={tdStyle}>(d)</td>
              <td style={tdStyle}>Total</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>{data.total_earnings ? data.total_earnings : 0.0}</td>
            </tr>
            <tr>
              <td style={tdStyle}>(e)</td>
              <td style={tdStyle}>
                Reported total amount of salary received from other employer(s)
              </td>
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>0</td>
            </tr>
            <tr>
              <td style={tdStyle}>2.</td>
              <td style={tdStyle} colSpan={4}>
                Less: Allowances to the extent exempt under section 10
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>(a)</td>
              <td style={tdStyle}>Travel concession or assistance under section 10(5)</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>
                {data.total_travel_allowance ? data.total_travel_allowance : 0}
              </td>
              <td style={tdStyle}></td>
            </tr>
            <tr>
              <td style={tdStyle}>(b)</td>
              <td style={tdStyle}>Death-cum-retirement gratuity under section 10(10)</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>{data.total_gratuity ? data.total_gratuity : 0}</td>
              <td style={tdStyle}></td>
            </tr>
            <tr>
              <td style={tdStyle}>(c)</td>
              <td style={tdStyle}>Commuted value of pension under section 10(10A)</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>
                {data.commuted_value_of_pension ? data.commuted_value_of_pension : 0}
              </td>
              <td style={tdStyle}></td>
            </tr>
            <tr>
              <td style={tdStyle}>(d)</td>
              <td style={tdStyle}>
                Cash equivalent of leave salary encashment under section 10(10AA)
              </td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>
                {data.cash_equivalent_of_leave_salary ? data.cash_equivalent_of_leave_salary : 0}
              </td>
              <td style={tdStyle}></td>
            </tr>
            <tr>
              <td style={tdStyle}>(e)</td>
              <td style={tdStyle}>House rent allowance under section 10(13A)</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>{data.total_hra ? data.total_hra : 0}</td>
              <td style={tdStyle}></td>
            </tr>
            <tr>
              <td style={tdStyle}>(f).</td>
              <td style={tdStyle}>
                Amount of any other exemption under section 10 [Note: Break-up to be filled and
                signed by employer in the table provide at the bottom of this form]
              </td>
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
            </tr>

            <tr>
              <td style={tdStyle}>(g)</td>
              <td style={tdStyle}>Total amount of any other exemption under section 10</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
            </tr>
            <tr>
              <td style={tdStyle}>(h)</td>
              <td style={tdStyle}>
                Total amount of exemption claimed under section 10 [2(a)+2(b)+2(c)+2(d)+2(e)+2(g)]
              </td>
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>
                {data.total_amount_of_exemption ? data.total_amount_of_exemption : 0}
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>3.</td>
              <td style={tdStyle}>
                Total amount of salary received from current employer [1(d)+2(h)]
              </td>{" "}
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>
                {" "}
                {data.total_amount_of_salary_received ? data.total_amount_of_salary_received : 0}
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>4.</td>
              <td style={tdStyle} colSpan={4}>
                Less: Deductions under section 16
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>(a)</td>
              <td style={tdStyle}>Standard deduction under section 16(a)</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>{data.standard_deduction ? data.standard_deduction : 0}</td>
              <td style={tdStyle}></td>
            </tr>
            <tr>
              <td style={tdStyle}>(b)</td>
              <td style={tdStyle}>Entertainment allowance under section 16(ii)</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>
                {data.entertainment_allowance ? data.entertainment_allowance : 0}
              </td>
              <td style={tdStyle}></td>
            </tr>
            <tr>
              <td style={tdStyle}>(c)</td>
              <td style={tdStyle}>Tax on employment under section 16(iii)</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>{data.tax_on_employment ? data.tax_on_employment : 0}</td>
              <td style={tdStyle}></td>
            </tr>
            <tr>
              <td style={tdStyle}>5.</td>
              <td style={tdStyle}>Total amount of deductions under section 16 [4(a)+4(b)+4(c)]</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>
                {data.total_amount_of_deduction ? data.total_amount_of_deduction : 0}
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>6.</td>
              <td style={tdStyle}>
                Income chargeable under the head &rdqou;Salaries&ldquo;[3+1(e)-5]
              </td>
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>{data.income_chargeable ? data.income_chargeable : 0}</td>
            </tr>
            <tr>
              <td style={tdStyle}>7.</td>
              <td style={tdStyle} colSpan={4}>
                Add: Any other income reported by the employee under as per section 192 (2B)
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>(a)</td>
              <td style={tdStyle}>
                Income (or admissible loss) from house property reported by employee offered for TDS
              </td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>
                {data.income_from_house_property ? data.income_from_house_property : 0}
              </td>
              <td style={tdStyle}></td>
            </tr>
            <tr>
              <td style={tdStyle}>(b)</td>
              <td style={tdStyle}>Income under the head Other Sources offered for TDS</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>
                {" "}
                {data.income_under_the_head_source ? data.income_under_the_head_source : 0}
              </td>
              <td style={tdStyle}></td>
            </tr>
            <tr>
              <td style={tdStyle}>8.</td>
              <td style={tdStyle}>
                Total amount of other income reported by the employee [7(a)+7(b)]
              </td>
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>
                {" "}
                {data.total_amount_of_other_income ? data.total_amount_of_other_income : 0}
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>9.</td>
              <td style={tdStyle}>Gross total income (6+8)</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>{data.gross_total_income ? data.gross_total_income : 0}</td>
            </tr>
            <tr>
              <td style={tdStyle}>10.</td>
              <td style={tdStyle} colSpan={2}>
                Deductions under Chapter VI-A
              </td>
              <td style={tdStyle}>Gross Amount</td>
              <td style={tdStyle}>Deductible Amount</td>
            </tr>
            <tr>
              <td style={tdStyle}>(a)</td>
              <td style={tdStyle}>
                Deduction in respect of life insurance premia, contributions to provident fund etc.
                under section 80C
              </td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>
                {data.deduction_in_life_insurance ? data.deduction_in_life_insurance : 0}
              </td>
              <td style={tdStyle}>
                {data.deduction_in_life_insurance ? data.deduction_in_life_insurance : 0}
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>(b)</td>
              <td style={tdStyle}>
                Deduction in respect of contribution to certain pension funds under section 80CCC
              </td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>
                {data.contribution_to_pension ? data.contribution_to_pension : 0}
              </td>
              <td style={tdStyle}>
                {data.contribution_to_pension ? data.contribution_to_pension : 0}
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>(c)</td>
              <td style={tdStyle}>
                Deduction in respect of contribution by taxpayer to pension scheme under section
                80CCD (1)
              </td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>
                {data.contribution_by_taxpayer ? data.contribution_by_taxpayer : 0}
              </td>
              <td style={tdStyle}>
                {data.contribution_by_taxpayer ? data.contribution_by_taxpayer : 0}
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>(d)</td>
              <td style={tdStyle}>Total deduction under section 80C, 80CCC and 80CCD(1)</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>150000</td>
              <td style={tdStyle}>150000</td>
            </tr>
            <tr>
              <td style={tdStyle}>(e)</td>
              <td style={tdStyle}>
                Deductions in respect of amount paid/deposited to notified pension scheme under
                section 80CCD (1B)
              </td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>0</td>
              <td style={tdStyle}>0</td>
            </tr>
            <tr>
              <td style={tdStyle}>(f)</td>
              <td style={tdStyle}>
                Deduction in respect of contribution by Employer to pension scheme under section
                80CCD (2)
              </td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>0</td>
              <td style={tdStyle}>0</td>
            </tr>
            <tr>
              <td style={tdStyle}>(g)</td>
              <td style={tdStyle}>
                Deduction in respect of health insurance premia under section 80D
              </td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>
                {data.health_insurance_premia ? data.health_insurance_premia : 0}
              </td>
              <td style={tdStyle}>
                {data.health_insurance_premia ? data.health_insurance_premia : 0}
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>(h)</td>
              <td style={tdStyle}>
                Deduction in respect of interest on loan taken for higher education under section
                80E
              </td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>{data.intrest_on_loan_taken ? data.intrest_on_loan_taken : 0}</td>
              <td style={tdStyle}>{data.intrest_on_loan_taken ? data.intrest_on_loan_taken : 0}</td>
            </tr>
            <tr>
              <td style={tdStyle} colSpan={2}></td>

              <td style={tdStyle}>
                <div>Gross</div>
                <div>Amount</div>
              </td>

              <td style={tdStyle}>
                <div>Qualifying</div>
                <div>Amount</div>
              </td>
              <td style={tdStyle}>
                <div>Deductible</div>
                <div>Amount</div>
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>(i)</td>
              <td style={tdStyle}>
                Total Deduction in respect of donations to certain funds, charitable institutions,
                etc. under section 80G
              </td>
              <td style={tdStyle}>{data.total_deduction ? data.total_deduction : 0}</td>
              <td style={tdStyle}>0</td>
              <td style={tdStyle}>0</td>
            </tr>
            <tr>
              <td style={tdStyle}>(j)</td>
              <td style={tdStyle}>
                Deduction in respect of interest on deposits in savings account under section 80TTA
              </td>
              <td style={tdStyle}>0</td>
              <td style={tdStyle}>0</td>
              <td style={tdStyle}>0</td>
            </tr>
            <tr>
              <td style={tdStyle}>(k)</td>
              <td style={tdStyle}>
                Amount Deductible under any other provision (s) of Chapter VI-A [Note: Break-up to
                be filled and signed by employer in the table provide at the bottom of this form]
              </td>
              <td style={tdStyle} colSpan={3}></td>
            </tr>
            <tr>
              <td style={tdStyle}>(l)</td>
              <td style={tdStyle}>
                Total of amount deductible under any other provision of Chapter VI-A
              </td>
              <td style={tdStyle}>0</td>
              <td style={tdStyle}>0</td>
              <td style={tdStyle}>0</td>
            </tr>
            <tr>
              <td style={tdStyle}>11.</td>
              <td style={tdStyle}>
                Aggregate of deductible amount under Chapter VI-A
                [10(d)+10(e)+10(f)+10(g)+10(h)+10(i)+10(j)+10(l)]
              </td>
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>
                {data.aggregate_of_deductible_amount ? data.aggregate_of_deductible_amount : 0}
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>12.</td>
              <td style={tdStyle}>Total taxable income (9-11)</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>0</td>
            </tr>
            <tr>
              <td style={tdStyle}>13.</td>
              <td style={tdStyle}>Tax on total income</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>{data.total_tax_incomme ? data.total_tax_incomme : 0}</td>
            </tr>
            <tr>
              <td style={tdStyle}>14.</td>
              <td style={tdStyle}>Rebate under section 87A, if applicable</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>
                {data.rebate_under_section_87A ? data.rebate_under_section_87A : 0}
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>15.</td>
              <td style={tdStyle}>Surcharge, wherever applicable</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>
                {data.tax_after_rebate_under_section_87A
                  ? data.tax_after_rebate_under_section_87A
                  : 0}
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>16.</td>
              <td style={tdStyle}>Health and eduacation cess</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>
                {data.health_and_education_cess ? data.health_and_education_cess : 0}
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>17.</td>
              <td style={tdStyle}>Tax payable (13+15+16-14)</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
              <td style={tdStyle}> {data.tax_payable ? data.tax_payable : 0}</td>
            </tr>
            <tr>
              <td style={tdStyle}>18.</td>
              <td style={tdStyle}>Less: Relief under section 89 (attach details)</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
              <td style={tdStyle}>0</td>
            </tr>
            <tr>
              <td style={tdStyle}>19.</td>
              <td style={tdStyle}>Net tax payable (17-18)</td>
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
              <td style={tdStyle}> {data.net_tax_payable ? data.net_tax_payable : 0}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </MDBox>
  );
};

export default Pdfdown;
