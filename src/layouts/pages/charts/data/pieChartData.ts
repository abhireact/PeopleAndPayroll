/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Mindcom Group (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// types
interface Types {
  labels: any;
  datasets: any;
}

const pieChartData: Types = {
  labels: ["Facebook", "Direct", "Organic", "Referral"],
  datasets: {
    label: "Projects",
    backgroundColors: ["info", "primary", "dark", "secondary", "primary"],
    data: [15, 20, 12, 60],
  },
};

export default pieChartData;
