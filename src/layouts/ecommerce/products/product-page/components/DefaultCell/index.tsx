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

import { ReactNode } from "react";

// Material Dashboard 2 PRO React TS components
import MDTypography from "components/MDTypography";

function DefaultCell({ children }: { children: ReactNode }): JSX.Element {
  return (
    <MDTypography variant="button" color="secondary">
      {children}
    </MDTypography>
  );
}

export default DefaultCell;
