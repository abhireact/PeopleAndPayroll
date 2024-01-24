import { Card, Grid, List, Switch } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

const rowforcoloum = [
  {
    payroll_journal: "Salaries and Employee Wages",
    debit: 120000.0,
    credit: 9846.0,
  },
  {
    payroll_journal: "Payroll Tax pPayable",
    debit: 28746.0,
    credit: 9876.0,
  },
  {
    payroll_journal: "Net Salary Payable",
    debit: 28746.0,
    credit: 9876.0,
  },
];

let total_debit = 0;
let total_creadit = 0;
for (let debit: any = 0; debit < rowforcoloum.length; debit++) {
  total_debit = total_debit + rowforcoloum[debit].debit;
}
console.log(total_debit);
for (let credit: any = 0; credit < rowforcoloum.length; credit++) {
  total_creadit = total_creadit + rowforcoloum[credit].credit;
}
console.log(total_creadit);

const total = {
  payroll_journal: "Total",
  debit: total_debit,
  credit: total_creadit,
};
rowforcoloum.push(total);

const dataTableData = {
  columns: [
    { Header: "01/09/2023-PAYROLL JOURNAL", accessor: "payroll_journal" },
    { Header: "DEBIT", accessor: "debit" },
    { Header: "CREDIT", accessor: "credit" },
  ],
  rows: rowforcoloum.map((data, index) => ({
    payroll_journal: data.payroll_journal,
    debit: data.debit,
    credit: data.credit,
  })),
};

const wage_patment = [
  {
    wage_payment: "Net Salary Payable",
    debit: 847585.0,
    credit: 45767586.0,
  },
  {
    wage_payment: "Zoho Payaroll_Bank Account",
    debit: 989357.0,
    credit: 983576332.0,
  },
];

let debite = 0;
let creadit = 0;

for (let debit: any = 0; debit < wage_patment.length; debit++) {
  debite = debite + wage_patment[debit].debit;
}
console.log(debite);

for (let credit: any = 0; credit < wage_patment.length; credit++) {
  creadit = creadit + wage_patment[credit].credit;
}
console.log(creadit);

const total_payment = {
  wage_payment: "Total AMOUNT",
  debit: debite,
  credit: creadit,
};
wage_patment.push(total_payment);

const wagepayment = {
  columns: [
    { Header: "01/09/2023-WAGE PAYMENT", accessor: "wage_payment" },
    { Header: "DEBIT", accessor: "debit" },
    { Header: "CREDIT", accessor: "credit" },
  ],
  rows: wage_patment.map((data, index) => ({
    wage_payment: data.wage_payment,
    debit: data.debit,
    credit: data.credit,
  })),
};

const Payroll_Journal_Summary = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "75%", margin: "auto", mt: "3%" }}>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            MindCom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            Payroll Journal Summary
          </MDTypography>
          <MDTypography variant="body2" sx={{ textAlign: "center" }}>
            01/09/2023 to 30/09/2023
          </MDTypography>
        </MDBox>
        <DataTable table={dataTableData} />
      </Card>
      <Card sx={{ width: "75%", margin: "auto", mt: "3%" }}>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            MindCom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            Payroll Journal Summary
          </MDTypography>
          <MDTypography variant="body2" sx={{ textAlign: "center" }}>
            01/09/2023 to 30/09/2023
          </MDTypography>
        </MDBox>
        <DataTable table={wagepayment} />
      </Card>
    </DashboardLayout>
  );
};

export default Payroll_Journal_Summary;
