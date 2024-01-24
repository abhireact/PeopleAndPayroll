import Analytics from "layouts/dashboards/analytics";
import Sales from "layouts/dashboards/sales";
import ProfileOverview from "layouts/pages/profile/profile-overview";
import AllProjects from "layouts/pages/profile/all-projects";
import NewUser from "layouts/pages/users/new-user";
import Settings from "layouts/pages/account/settings";
import Billing from "layouts/pages/account/billing";
import Invoice from "layouts/pages/account/invoice";
import Timeline from "layouts/pages/projects/timeline";
import PricingPage from "layouts/pages/pricing-page";
import Widgets from "layouts/pages/widgets";
import RTL from "layouts/pages/rtl";
import Charts from "layouts/pages/charts";
import Notifications from "layouts/pages/notifications";
import Kanban from "layouts/applications/kanban";
import Wizard from "layouts/applications/wizard";
import DataTables from "layouts/applications/data-tables";
import Calendar from "layouts/applications/calendar";
import NewProduct from "layouts/ecommerce/products/new-product";
import EditProduct from "layouts/ecommerce/products/edit-product";
import ProductPage from "layouts/ecommerce/products/product-page";
import OrderList from "layouts/ecommerce/orders/order-list";
import OrderDetails from "layouts/ecommerce/orders/order-details";
import SignInBasic from "layouts/authentication/sign-in/basic";
import SignInCover from "layouts/authentication/sign-in/cover";
import SignInIllustration from "layouts/authentication/sign-in/illustration";
import SignUpCover from "layouts/authentication/sign-up/cover";
import ResetCover from "layouts/authentication/reset-password/cover";

// Material Dashboard 2 PRO React TS components
import MDAvatar from "components/MDAvatar";

// @mui icons
import Icon from "@mui/material/Icon";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PeopleIcon from "@mui/icons-material/People";
// Images
import BeachAccessRoundedIcon from "@mui/icons-material/BeachAccessRounded";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import profilePicture from "assets/images/team-3.jpg";
import Cover from "layouts/pages/auth/Signup";
import CoverLogin from "layouts/pages/auth/Signin";
import Orgprofile from "layouts/pages/organisation/neworganisation";
import Worklocations from "layouts/pages/worklocation/worklocation";
import Department from "layouts/pages/department/department";
import Designations from "layouts/pages/designation/designation";
import Employee from "layouts/pages/employee/employee";
import EmployeeInvitation from "layouts/pages/employee/employeinvitation";
import TakeAttandance from "layouts/pages/attandance/takeattandance";
import ShowAllAttandance from "layouts/pages/attandance/showattandance";
import CreateLeavePage from "layouts/pages/leave/create";
import LeaveType from "layouts/pages/leave/leaveType";
import ListView from "layouts/pages/leave/listview";
import CalendarView from "layouts/pages/leave/calenderview";
import Applyleave from "layouts/pages/leave/applyLeaves";
import LeaveApplication from "layouts/pages/leave/leaveapplication";
import MYAttandance from "layouts/pages/attandance/myattandance";
import GenderDiversity from "layouts/pages/report/diversity";
import AgeDiversity from "layouts/pages/report/agereport";
import LeaveReport from "layouts/pages/report/agereport";
import ReportIcon from "@mui/icons-material/Report";
import EmployeeDashboard from "layouts/pages/report/dashboard";
import EmployeeAdditionreport from "layouts/pages/report/employeAddition";
import DiversityReport from "layouts/pages/report/diversity";
import DistributionReport from "layouts/pages/report/distributionreport";
import LeaveDashboard from "layouts/pages/report/leavereportdashboard";
import LeaveDistributionReport from "layouts/pages/report/leavedistribution";
import LeaveDiversityReport from "layouts/pages/report/leavediversity";
import Calendarattandence from "layouts/pages/report/tableattandance";
import ShowHoliday from "layouts/pages/leave/showholiday";
import Dailyleave from "layouts/pages/report/dailyleavestatus";
import LeaveBookedandBalance from "layouts/pages/report/leavebookedandbalance";
import DetailedAttandencereport from "layouts/pages/report/detailedattendancereport";
import Resourceavailibility from "layouts/pages/report/resourceavailibility";
import LTWreport from "layouts/pages/report/leavetypewisesummary";
import ShowEmployee from "layouts/pages/employee/showemployee";
import MyChart from "layouts/pages/report/chart";
import MYAccount from "layouts/pages/auth/myaccount";
import MYProfile from "layouts/pages/auth/myProfile";
import EmployeeUpdation from "layouts/pages/employee/updateemployee";
import Rbac from "layouts/pages/rbac/rbac";
import Showrole from "layouts/pages/rbac/showroles";
// import DateRangePicker from "layouts/pages/report/leavediversity";
import Earning from "layouts/payrole/salarycomponent/earning";

import Deduction from "layouts/payrole/salarycomponent/deduction";
import PaySchedule from "layouts/payrole/salarycomponent/paysheadule";
import Taxes from "layouts/payrole/salarycomponent/taxes";
import Epf from "layouts/payrole/salarycomponent/epf";
import Esi from "layouts/payrole/salarycomponent/esi";
// import Reports from "layouts/payrole/salarycomponent/report";
import PayRun from "layouts/payrole/salarycomponent/payrun";
import ProfessionalTax from "layouts/payrole/salarycomponent/professionaltax/statutory";
import LabourWelfareFund from "layouts/payrole/salarycomponent/labourwelfarefund";
import SalaryTemplate from "layouts/payrole/salarycomponent/salary_template";
import Reports from "layouts/payrole/salarycomponent/reports/reports";
import Loan from "layouts/payrole/salarycomponent/loan/viewrecord";
import PaymentsIcon from "@mui/icons-material/Payments";
// import SalaryDetails from "layouts/employee_portal/payroll_details/salarydetails";
import Form16 from "layouts/payrole/salarycomponent/form16/form16";
// import Employee from "layouts/payrole/salarycomponent/employee";
// Material Dashboard 2 PRO React TS components

// @mui icons
import SettingsIcon from "@mui/icons-material/Settings";
import PersonPinIcon from "@mui/icons-material/PersonPin"; //portal
import CreditScoreIcon from "@mui/icons-material/CreditScore"; //loan
import SummarizeIcon from "@mui/icons-material/Summarize"; //reports
import LockPersonIcon from "@mui/icons-material/LockPerson"; //rbac
import ResetPassword from "layouts/pages/auth/resetpassword";
const routes = [
  //common for ALL module
  {
    type: "collapse",
    name: "Rbac",
    key: "RBAC",
    icon: <LockPersonIcon />,
    collapse: [
      {
        name: "Roles",
        key: "rbac",
        route: "rbac",
        component: <Showrole />,
      },
    ],
  },
  //payroll
  { type: "title", title: "PAYROLL", key: "payroll-heading" },
  {
    type: "collapse",
    name: "Portal",
    key: "portal",
    icon: <PersonPinIcon />,
    collapse: [
      {
        name: "Payroll_portal",
        key: "payroll_portal",
        collapse: [
          // {
          //   name: "Salary Details",
          //   key: "salarydetails",
          //   route: "payrole/portal/salarydetails",
          //   component: <SalaryDetails />,
          // },
        ],
      },
    ],
  },
  {
    type: "collapse",
    name: "Settings",
    key: "setting",
    icon: <SettingsIcon />,
    collapse: [
      // {
      //   name: "Employee",
      //   key: "employee",
      //   collapse: [
      //     {
      //       name: "Manage Employee",
      //       key: "manage_employee",
      //       route: "payrole/setting/employee",
      //       component: <Employee />,
      //     },
      //   ],
      // },
      {
        name: "Salary Components",
        key: "salary_components",
        collapse: [
          {
            name: "Earning",
            key: "earning",
            route: "payrole/earning",
            component: <Earning />,
          },
          {
            name: "Deduction",
            key: "deduction",
            route: "payrole/deduction",
            component: <Deduction />,
          },
        ],
      },
      {
        name: "Statutory Components",
        key: "statutory_components",
        collapse: [
          {
            name: "EPF",
            key: "epf",
            route: "payrole/salarycomponent/epf",
            component: <Epf />,
          },
          {
            name: "ESI",
            key: "esi",
            route: "payrole/salarycomponent/esi",
            component: <Esi />,
          },
          {
            name: "Professional Tax",
            key: "professionaltax",
            route: "payrole/salarycomponent/professionaltax",
            component: <ProfessionalTax />,
          },
          {
            name: "Labour Welfare Fund",
            key: "labourwelfarefund",
            route: "payrole/salarycomponent/labourwelfarefund",
            component: <LabourWelfareFund />,
          },
        ],
      },
      {
        name: "Salary Templates",
        key: "salary_templates",
        collapse: [
          {
            name: "Templates",
            key: "salarytemplate",
            route: "payrole/salarycomponent/salarytemplate",
            component: <SalaryTemplate />,
          },
        ],
      },
      {
        name: "Taxes",
        key: "taxes",
        collapse: [
          {
            name: "Organisation Tax",
            key: "tax",
            route: "payrole/salarycomponent/taxes",
            component: <Taxes />,
          },
        ],
      },

      {
        name: "Pay Schedule",
        key: "pay_shedule",
        collapse: [
          {
            name: "Schedule",
            key: "pay-sheadule",
            route: "payrole/salarycomponent/paysheadule",
            component: <PaySchedule />,
          },
        ],
      },
    ],
  },
  {
    type: "collapse",
    name: "Pay Runs",
    key: "payruns",
    icon: <PaymentsIcon />,
    collapse: [
      {
        name: "Pay Run",
        key: "payrun",
        route: "payrole/payrun",
        component: <PayRun />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Form 16",
    key: "form16",
    icon: <PaymentsIcon />,
    collapse: [
      {
        name: "Form16",
        key: "form16main",
        route: "payrole/form16",
        component: <Form16 />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Loans",
    key: "loans",
    icon: <CreditScoreIcon />,
    collapse: [
      {
        name: "Manage Loans",
        key: "loan",
        route: "loan",
        component: <Loan />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Reports",
    key: "payrollreports",
    icon: <SummarizeIcon />,
    collapse: [
      {
        name: "Reports",
        key: "payrollreport",
        route: "payrole/reports",
        component: <Reports />,
      },
    ],
  },
  // {
  //   type: "collapse",
  //   name: "Brooklyn Alice",
  //   key: "brooklyn-alice",
  //   icon: <MDAvatar src={profilePicture} alt="Brooklyn Alice" size="sm" />,
  //   collapse: [
  //     {
  //       name: "My Profile",
  //       key: "my-profile",
  //       route: "/pages/profile/profile-overview",
  //       component: <ProfileOverview />,
  //     },
  //     {
  //       name: "Settings",
  //       key: "profile-settings",
  //       route: "/pages/account/settings",
  //       component: <Settings />,
  //     },
  //     {
  //       name: "Logout",
  //       key: "logout",
  //       route: "/authentication/sign-in/basic",
  //       component: <SignInBasic />,
  //     },
  //   ],
  // },
  // { type: "divider", key: "divider-0" },
  //   {
  //     type: "collapse",
  //     name: "Dashboards",
  //     key: "dashboards",
  //     icon: <Icon fontSize="medium">dashboard</Icon>,
  //     collapse: [
  //       {
  //         name: "Analytics",
  //         key: "analytics",
  //         route: "/dashboards/analytics",
  //         component: <Analytics />,
  //       },
  //       {
  //         name: "Sales",
  //         key: "sales",
  //         route: "/dashboards/sales",
  //         component: <Sales />,
  //       },
  //     ],
  //   },
  //   { type: "title", title: "Pages", key: "title-pages" },

  //   {
  //     name: "Profile",
  //     key: "profile",
  //     collapse: [
  //       {
  //         name: "Profile Overview",
  //         key: "profile-overview",
  //         route: "/pages/profile/profile-overview",
  //         component: <ProfileOverview />,
  //       },
  //       {
  //         name: "All Projects",
  //         key: "all-projects",
  //         route: "/pages/profile/all-projects",
  //         component: <AllProjects />,
  //       },
  //     ],
  //   },
  { type: "title", title: "LEAVE", key: "leave-heading" },

  {
    type: "collapse",
    name: "Authentication",
    key: "authentication",
    icon: (
      <Icon fontSize="medium">
        <VpnKeyIcon />
      </Icon>
    ),
    collapse: [
      {
        name: "SignUP",
        key: "signup",
        route: "/pages/authentication/signup",
        component: <Cover />,
      },

      {
        name: "SignIN",
        key: "signin",
        route: "/pages/authentication/signin",
        component: <CoverLogin />,
      },
      {
        name: "Reset Password",
        key: "resetpassword",
        route: "/pages/authentication/resetpassword",
        component: <ResetPassword />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Organisation",
    key: "organisation",
    icon: (
      <Icon fontSize="medium">
        <CorporateFareIcon />
      </Icon>
    ),
    collapse: [
      {
        name: "New-Organisation",
        key: "neworganisation",
        route: "/pages/organisation/neworganisation",
        component: <Orgprofile />,
      },
      {
        name: "Work Location",
        key: "worklocation",
        route: "/pages/organisation/worklocation",
        component: <Worklocations />,
      },
      {
        name: "Department",
        key: "department",
        route: "/pages/organisation/department",
        component: <Department />,
      },
      {
        name: "Designation",
        key: "designation",
        route: "/pages/organisation/designation",
        component: <Designations />,
      },
    ],
  },
  {
    name: "Employee",
    key: "employee",
    type: "collapse",
    icon: (
      <Icon fontSize="medium">
        <PeopleIcon />
      </Icon>
    ),
    collapse: [
      {
        name: "Show Employee",
        key: "showemployee",
        route: "/pages/employee/showemployee",
        component: <ShowEmployee key="showemployee" />,
      },
    ],
  },
  {
    name: "Attendance",
    key: "attandance",
    type: "collapse",
    icon: (
      <Icon fontSize="medium">
        <EditCalendarIcon />
      </Icon>
    ),
    collapse: [
      {
        name: "Take Attendance",
        key: "takeattandance",
        route: "/pages/attandance/takeattandance",
        component: <TakeAttandance />,
      },
      {
        name: "Show Attendance",
        key: "showattandance",
        route: "/pages/attandance/showattandance",
        component: <ShowAllAttandance />,
      },
      {
        name: "My Attendance ",
        key: "myattandance",
        route: "/pages/attandance/myattandance",
        component: <MYAttandance />,
      },

      // {
      //   name: "Calendarattandence",
      //   key: "calenderatatn",
      //   route: "/pages/attandance/calenderatatn",
      //   component: <Calendarattandence />,
      // },
    ],
  },

  {
    name: "Leave",
    key: "leave",
    type: "collapse",
    icon: (
      <Icon fontSize="medium">
        <BeachAccessRoundedIcon />
      </Icon>
    ),
    collapse: [
      {
        name: "Show Leave Type",
        key: "showleavetype",
        route: "/pages/leave/showleavetype",
        component: <LeaveType />,
      },
      {
        name: "Leave Balance",
        key: "listview",
        route: "/pages/leave/listview",
        component: <ListView />,
      },
      {
        name: " Leave Calendar ",
        key: "calanderview",
        route: "/pages/leave/calanderview",
        component: <CalendarView />,
      },
      {
        name: "Apply Leave",
        key: "applyleave",
        route: "/pages/leave/applyleave",
        component: <Applyleave />,
      },
      {
        name: " Leave Application",
        key: "leaveapplication",
        route: "/pages/leave/leaveapplication",
        component: <LeaveApplication />,
      },
      {
        name: "Holiday",
        key: "holiday",
        route: "/pages/holiday/allholiday",
        component: <ShowHoliday />,
      },
      {
        name: " Break",
        key: "break",
        route: "/pages/leave/break",
        component: <MYAccount />,
      },
    ],
  },
  {
    name: "Reports",
    key: "reports",
    type: "collapse",
    icon: (
      <Icon fontSize="medium">
        <ReportIcon />
      </Icon>
    ),
    collapse: [
      // {
      //   name: "Diversity Report",
      //   key: "genderdiversity",
      //   route: "/pages/reports/genderdiversity",
      //   component: <DiversityReport />,
      // },
      // {
      //   name: "Distribution Report",
      //   key: "distributionreport",
      //   route: "/pages/reports/distributionreport",
      //   component: <DistributionReport />,
      // },

      {
        name: "Employee Report ",
        key: "mydashboardreports",
        route: "/pages/reports/mydashboardreports",
        component: <EmployeeDashboard />,
      },
      {
        name: "Leave Report ",
        key: "myleavedashboardreports",
        route: "/pages/reports/myleavedashboardreports",
        component: <LeaveDashboard />,
      },
      // {
      //   name: "Employee Addition Report ",
      //   key: "employeeadditionreports",
      //   route: "/pages/reports/employeeadditionreports",
      //   component: <EmployeeAdditionreport />,
      // },
    ],
  },
];

export default routes;
