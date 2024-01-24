import MYProfile from "layouts/pages/auth/myProfile";
import LeaveReport from "layouts/pages/report/agereport";
import Dailyleave from "layouts/pages/report/dailyleavestatus";
import DetailedAttandencereport from "layouts/pages/report/detailedattendancereport";
import DistributionReport from "layouts/pages/report/distributionreport";
import DiversityReport from "layouts/pages/report/diversity";
import EmployeeAdditionreport from "layouts/pages/report/employeAddition";
import LeaveBookedandBalance from "layouts/pages/report/leavebookedandbalance";
import LeaveDistributionReport from "layouts/pages/report/leavedistribution";
import LeaveDiversityReport from "layouts/pages/report/leavediversity";
import LTWreport from "layouts/pages/report/leavetypewisesummary";
import Resourceavailibility from "layouts/pages/report/resourceavailibility";
import Calendarattandence from "layouts/pages/report/tableattandance";
import CoverLogin from "layouts/pages/auth/Signin";
import Employee from "layouts/pages/employee/employee";
import EmployeeInvitation from "layouts/pages/employee/employeinvitation";
import EmployeeUpdation from "layouts/pages/employee/updateemployee";

import Icon from "@mui/material/Icon";
import axios from "axios";
// Images

import MainRoutes from "./mainrotes";
import Cookies from "js-cookie";
import { CloseFullscreen } from "@mui/icons-material";

//With page rendering in ui
import Analytics from "layouts/dashboards/analytics";
import CreateEarning from "layouts/payrole/salarycomponent/earning/createearning";
import CreatePreTaxDeduction from "layouts/payrole/salarycomponent/deduction/create_pre_tax_deduction";
import CreatePostTaxDeduction from "layouts/payrole/salarycomponent/deduction/create_post_tax_deduction";
// Taxes and Forms
import Tax_Deduction_Summary from "layouts/payrole/salarycomponent/reports/Taxes and Forms/Tax_Deduction_Summary";

// Loan Reports
import Loan_Perquisite_Summary from "layouts/payrole/salarycomponent/reports/Loan Reports/Loan_Perquisite_Summary";

// personal information
import Personal_information from "layouts/payrole/salarycomponent/reports/personal information/personal_information";

// Dashboard
import Dashboard from "layouts/payrole/salarycomponent/reports/Dashboard/dashboard";

// Employees_Provident_Fund
import Employees_Provident_Fund from "layouts/payrole/salarycomponent/reports/Employees Provident Fund/Employees_Provident_Fund";

// Payroll Journal
import Payroll_Journal_Summary from "layouts/payrole/salarycomponent/reports/Payroll Journal/Payroll_Journal_Summary";

// Activity
import ActivityLog from "layouts/payrole/salarycomponent/reports/Activity/Activity_log";

//staturious report
import EPF_ECR_Report from "layouts/payrole/salarycomponent/reports/Statutory Reports/EPF_ECR_Report";
import ESI_Summary from "layouts/payrole/salarycomponent/reports/Statutory Reports/ESI_Summary";
import ESIC_Return_Report from "layouts/payrole/salarycomponent/reports/Statutory Reports/ESIC_Return_Report";
import PT_Summary from "layouts/payrole/salarycomponent/reports/Statutory Reports/PT_Summary";
import PT_Monthly_statement from "layouts/payrole/salarycomponent/reports/Statutory Reports/PT_Monthly_statement";
import Annual_Return_Statement from "layouts/payrole/salarycomponent/reports/Statutory Reports/PT_Annual_Return_Statement";
import LWF_Summary from "layouts/payrole/salarycomponent/reports/Statutory Reports/LWF_Summary";

//  payroll Overview
import PayrollLiabilitySummary from "layouts/payrole/salarycomponent/reports/Payroll Overview/payroll_liability_summary";
import Payroll_summary from "layouts/payrole/salarycomponent/reports/Payroll Overview/Payroll_summary";
import Employees_Pay_Summary from "layouts/payrole/salarycomponent/reports/Payroll Overview/Employees_Pay_Summary";
import Leave_Encashment_Summary from "layouts/payrole/salarycomponent/reports/Payroll Overview/Leave_Encashment_Summary";
import LOP_Summary from "layouts/payrole/salarycomponent/reports/Payroll Overview/LOP_Summary";
import Variable_Pay_Earnings_Report from "layouts/payrole/salarycomponent/reports/Payroll Overview/Variable Pay Earnings Report";

//employee reports
import Employees_Perquisite from "layouts/payrole/salarycomponent/reports/Employee Reports/Employees_Perquisite_Summary";
import Employees_Settlement from "layouts/payrole/salarycomponent/reports/Employee Reports/Employees_Settlement";
import Salary_Revision_Report from "layouts/payrole/salarycomponent/reports/Employee Reports/Salary_Revision_Report";
import Salary_Withhold_Report from "layouts/payrole/salarycomponent/reports/Employee Reports/Salary_Withhold_Report";

// DeductionSummary
import DeductionSummary from "layouts/payrole/salarycomponent/reports/Deduction Reports/DeductionSummary";
import Post_Tax_Deductions_Summary from "layouts/payrole/salarycomponent/reports/Deduction Reports/Post_Tax_Deductions_Summary";
import Pre_Tax_Deductions_Summary from "layouts/payrole/salarycomponent/reports/Deduction Reports/Pre_Tax_Deductions_Summary";
import EmployeDetails from "layouts/payrole/salarycomponent/employee_pages/employe_details";
//create epf
import CreteEpf from "layouts/payrole/salarycomponent/epf/epf";
import CreateEsi from "layouts/payrole/salarycomponent/esi/esi";
import Loan from "layouts/payrole/salarycomponent/loan/viewrecord";
import Login from "layouts/payrole/salarycomponent/login";
import CreateSalaryTemplate from "layouts/payrole/salarycomponent/salary_template/create";
import EditSalaryTemplate from "layouts/payrole/salarycomponent/salary_template/edit";
import PayRunRecord from "layouts/payrole/salarycomponent/payrun/record";
import EmployeeSalaryDetails from "layouts/pages/employee/employeesalarydetails";
// import Payslip from "layouts/employee_portal/payroll_details/payslip";
interface RouteItem {
  name: string;
  key: string;
  type: string;
  icon: string;
  collapse?: {
    name: string;
    key: string;
    collapse?: Array<RouteItem>;
  }[];
}
import CreateLeavePage from "layouts/pages/leave/create";
import Rbac from "layouts/pages/rbac/rbac";
import CreateEmployee from "layouts/pages/employee/createmployee";
const mod: string[] = [];
let submm: string[] = [];

// const token = useSelector((state: any) => state.name);
// const token = localStorage.getItem("token");
const token = Cookies.get("token");

// const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvX2lkIjozLCJlbWFpbCI6Im1pbmRjb21AZXhhbXBsZS5jb20iLCJleHAiOjE2OTgxNDAzNjd9.LWk4BqMDLI6on9PU6HDe2L7D5PStMtQbjXyU4NnnnMQ`;
try {
  if (token) {
    const response = await axios.get("http://10.0.20.133:8000/mg_rbac_current_user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status == 200) {
      submm = response.data;
    }
  }
} catch (error) {
  console.error(error);
}

const routes2 = MainRoutes;
const routes: any[] = [
  {
    name: "CreateEmployeeSalaryDetails",
    key: "createsalarydetails",
    route: "/createemployeesalarydetails",
    component: <EmployeeSalaryDetails />,
  },
  {
    name: "SignIN",
    key: "signin",
    route: "/pages/authentication/signin",
    component: <CoverLogin />,
  },
  {
    name: " My Profile ",
    key: "myprofile",
    route: "/pages/authentication/myprofile",
    component: <MYProfile />,
  },
  {
    name: "Manage RBAC",
    key: "manage_rbac",
    route: "manage_rbac",
    component: <Rbac />,
  },
  // employee
  {
    name: "New Employee",
    key: "newemployee",
    route: "/pages/employee/newemployee",
    component: <Employee />,
  },
  {
    name: "Create New Employee",
    key: "createnewemployee",
    route: "/pages/employee/createnewemployee",
    component: <CreateEmployee />,
  },
  {
    name: "Employee Invitation",
    key: "employeeinvitation",
    route: "/pages/employee/employeeinvitation",
    component: <EmployeeInvitation />,
  },
  {
    name: "update Employee",
    key: "updateemployee",
    route: "/pages/employee/updateemployee",
    component: <EmployeeUpdation />,
  },
  // Leave
  {
    name: "New Leave Type",
    key: "newleavetype",
    route: "/pages/leave/newleavetype",
    component: <CreateLeavePage />,
  },
  {
    name: "Diversity Report",
    key: "genderdiversity",
    route: "/pages/reports/genderdiversity",
    component: <DiversityReport />,
  },
  {
    name: "Distribution Report",
    key: "distributionreport",
    route: "/pages/reports/distributionreport",
    component: <DistributionReport />,
  },
  {
    name: "Employee Addition Report ",
    key: "employeeadditionreports",
    route: "/pages/reports/employeeadditionreports",
    component: <EmployeeAdditionreport />,
  },
  {
    name: "Employee Leave trend",
    key: "leavetrend",
    route: "/pages/reports/leavetrend",
    component: <LeaveReport />,
  },
  {
    name: " Leave Diversity",
    key: "leavediversity",
    route: "/pages/leavereport/leavediversity",
    component: <LeaveDiversityReport />,
  },
  {
    name: " Leave Distribution",
    key: "leavedistribution",
    route: "/pages/leavereport/leavedistribution",
    component: <LeaveDistributionReport />,
  },
  {
    name: " Detailed Attandance ",
    key: "detailedattendance",
    route: "/pages/leavereport/detailedattendance",
    component: <DetailedAttandencereport />,
  },

  {
    name: " Daily Leave  Status",
    key: "dailyleavestatus",
    route: "/pages/leavereport/dailyleavestatus",
    component: <Dailyleave />,
  },
  {
    name: " Resource Availibility",
    key: "resourceavailbility",
    route: "/pages/leavereport/resourceavailbility",
    component: <Resourceavailibility />,
  },
  {
    name: " Leave Balance",
    key: "leavebalance",
    route: "/pages/leavereport/leavebalance",
    component: <LeaveDistributionReport />,
  },
  {
    name: " Leave Booked and Balance",
    key: "leavebookedandbalance",
    route: "/pages/leavereport/leavebookedandbalance",
    component: <LeaveBookedandBalance />,
  },
  {
    name: " Leave Typewise Summery",
    key: "leavetypewisesummary",
    route: "/pages/leavereport/leavetypewisesummary",
    component: <LTWreport />,
  },
  {
    name: " Employee Attandance status",
    key: "employeeattandancestatus",
    route: "/pages/leavereport/employeeattandancestatus",
    component: <Calendarattandence />,
  },

  {
    name: "createTemplate",
    key: "createsalarytemplate",
    route: "/createsalarytemplate",
    component: <CreateSalaryTemplate />,
  },
  {
    name: "Pay Run",
    key: "payrunrecord",
    route: "payrole/payrun/record",
    component: <PayRunRecord />,
  },
  {
    name: "editTemplate",
    key: "editsalarytemplate",
    route: "/editsalarytemplate",
    component: <EditSalaryTemplate />,
  },
  {
    name: "Login",
    key: "login",
    route: "login",
    component: <Login />,
  },
  {
    name: "EPF",
    key: "createepf",
    route: "payrole/salarycomponent/createepf",
    component: <CreteEpf />,
  },
  {
    name: "ESI",
    key: "esi",
    route: "payrole/salarycomponent/createesi",
    component: <CreateEsi />,
  },
  {
    name: "Employe Details",
    key: "create-earning",
    route: "payrole/employedetails",
    component: <EmployeDetails />,
  },
  {
    name: "Create Earning",
    key: "create-earning",
    route: "payrole/salarycomponent/earning/createearning",
    component: <CreateEarning />,
  },
  {
    name: "Create Pre Tax Deduction",
    key: "create-pre-tax-deduction",
    route: "payrole/salarycomponent/deduction/create_pre_tax_deduction",
    component: <CreatePreTaxDeduction />,
  },
  {
    name: "Create Post Tax Deduction",
    key: "create-post-tax-deduction",
    route: "payrole/salarycomponent/deduction/create_post_tax_deduction",
    component: <CreatePostTaxDeduction />,
  },

  {
    name: "Payroll summary",
    key: "Payroll summary",
    route: "/pages/profile/Payroll_summary",
    component: <Payroll_summary />,
  },
  {
    name: "payroll liability summary",
    key: "payroll liability summary",
    route: "/pages/profile/payroll liability summary",
    component: <PayrollLiabilitySummary />,
  },
  {
    name: "employees ctc",
    key: "employees ctc",
    route: "/pages/profile/Employees_Perquisite",
    component: <Employees_Perquisite />,
  },
  {
    name: "Employees Settlement",
    key: "Employees Settlement",
    route: "/pages/profile/Employees Settlement",
    component: <Employees_Settlement />,
  },
  {
    name: "Salary Revision Report",
    key: "Salary Revision Report",
    route: "/pages/profile/Salary Revision Report",
    component: <Salary_Revision_Report />,
  },
  {
    name: "Salary Withhold Report",
    key: "Salary Withhold Report",
    route: "/pages/profile/Salary Withhold Report",
    component: <Salary_Withhold_Report />,
  },
  {
    name: "Annual Return Statement",
    key: "Annual Return Statement",
    route: "/pages/profile/Annual Return Statement",
    component: <Annual_Return_Statement />,
  },
  {
    name: "LWF Summary",
    key: "LWF Summary",
    route: "/pages/profile/LWF Summary",
    component: <LWF_Summary />,
  },
  {
    name: "PT Monthly statement",
    key: "PT Monthly statement",
    route: "/pages/profile/PT Monthly statement",
    component: <PT_Monthly_statement />,
  },
  {
    name: "PT Summary",
    key: "PT Summary",
    route: "/pages/profile/PT Summary",
    component: <PT_Summary />,
  },
  {
    name: "ESIC Return Report",
    key: "ESIC Return Report",
    route: "/pages/profile/ESIC Return Report",
    component: <ESIC_Return_Report />,
  },
  {
    name: "ESI Summary",
    key: "ESI Summary",
    route: "/pages/profile/ESI Summary",
    component: <ESI_Summary />,
  },
  {
    name: "EPF ECR Report",
    key: "EPF ECR Report",
    route: "/pages/profile/EPF ECR Report",
    component: <EPF_ECR_Report />,
  },
  {
    name: "Payroll Journal Summary",
    key: "Payroll Journal Summary",
    route: "/pages/profile/Payroll Journal Summary",
    component: <Payroll_Journal_Summary />,
  },
  {
    name: "Activity log ",
    key: "Activity log ",
    route: "/pages/profile/activelog",
    component: <ActivityLog />,
  },
  {
    name: "DeductionSummary ",
    key: "DeductionSummary ",
    route: "/pages/profile/DeductionSummary",
    component: <DeductionSummary />,
  },
  {
    name: "Post Tax Deductions Summary",
    key: "Post Tax Deductions Summary",
    route: "/pages/profile/Post_Tax_Deductions_Summary",
    component: <Post_Tax_Deductions_Summary />,
  },
  {
    name: "Pre Tax Deductions Summary",
    key: "Pre Tax Deductions Summary",
    route: "/pages/profile/Pre_Tax_Deductions_Summary",
    component: <Pre_Tax_Deductions_Summary />,
  },
  {
    name: "Employees Pay Summary",
    key: "Employees Pay Summary",
    route: "/pages/profile/Employees_Pay_Summary",
    component: <Employees_Pay_Summary />,
  },
  {
    name: "Leave Encashment Summary",
    key: "Leave Encashment Summary",
    route: "/pages/profile/Leave_Encashment_Summary",
    component: <Leave_Encashment_Summary />,
  },
  {
    name: "LOP Summary",
    key: "LOP Summary",
    route: "/pages/profile/LOP_Summary",
    component: <LOP_Summary />,
  },
  {
    name: "Variable Pay Earnings Report",
    key: "Variable Pay Earnings Report",
    route: "/pages/profile/Variable_Pay_Earnings_Report",
    component: <Variable_Pay_Earnings_Report />,
  },
  {
    name: "Tax Deduction Summary",
    key: "Tax Deduction Summary",
    route: "/pages/profile/Tax_Deduction_Summary",
    component: <Tax_Deduction_Summary />,
  },
  {
    name: "Loan Perquisite Summary",
    key: "Loan Perquisite Summary",
    route: "/pages/profile/Loan_Perquisite_Summary",
    component: <Loan_Perquisite_Summary />,
  },
  {
    name: "personal information",
    key: "personal information",
    route: "/pages/profile/personal_information",
    component: <Personal_information />,
  },
  {
    name: "dashboard",
    key: "dashboard",
    route: "/pages/profile/dashboard",
    component: <Dashboard />,
  },
  {
    name: "Employees Provident Fund",
    key: "Employees Provident Fund",
    route: "/pages/profile/Employees_Provident_Fund",
    component: <Employees_Provident_Fund />,
  },
  {
    name: "Analytics",
    key: "analytics",
    route: "/dashboards/analytics",
    component: <Analytics />,
  },
];
// for (const i: Object of routes2) {
//   const module: any = {};
//   module.name = i.name;
//   module.key = i.key;
//   module.type = i.type;
//   module.icon = i.icon;
//   const submodule: any[] = [];
//   CloseFullscreen;
//   if (i.collapse) {
//     for (const j of i.collapse) {
//       if ("collapse" in j && j.collapse) {
//         const separatesubmodule: any = {};
//         separatesubmodule.name = j.name;
//         separatesubmodule.key = j.key;
//         const submodulemenu: any[] = [];
//         for (const k of j.collapse) {
//           if (submm.includes(k.key)) {
//             submodulemenu.push(k);
//           }
//         }
//         separatesubmodule.collapse = submodulemenu;
//         if (Object.keys(separatesubmodule).length > 0) {
//           submodule.push(separatesubmodule);
//         }
//       } else {
//         if (submm.includes(j.key)) {
//           submodule.push(j);
//         }
//       }
//     }
//   }
//   module.collapse = submodule;
//   if (module.collapse.length > 0) {
//     routes.push(module);
//   }
// }
for (const i of routes2 as RouteItem[]) {
  const module: any = {};
  module.name = i.name;
  module.key = i.key;
  module.type = i.type;
  module.icon = i.icon;
  const submodule: any[] = [];
  if (i.type === "title") {
    routes.push(i);
  }
  if (i.collapse) {
    for (const j of i.collapse) {
      if (submm.includes(j.key)) {
        const separatesubmodule: any = {};
        // separatesubmodule.name = j.name;
        // separatesubmodule.key = j.key;
        // const submodulemenu: any[] = [];
        // for (const k of j.collapse) {
        //   if (submm.includes(k.key)) {
        //     submodulemenu.push(k);
        //   }
        // }
        // separatesubmodule.collapse = submodulemenu;
        // if (Object.keys(separatesubmodule).length > 0) {
        //   submodule.push(separatesubmodule);
        // }
        submodule.push(j);
      } else {
        if (submm.includes(j.key)) {
          submodule.push(j);
        }
      }
    }
  }

  module.collapse = submodule;
  if (module.collapse.length > 0) {
    routes.push(module);
  }
}
export default routes;
