import React, { useState, useEffect } from "react";
import axios from "axios";
import MDTypography from "components/MDTypography";
import Cookies from "js-cookie";
const token = Cookies.get("token");
interface StateData {
  state: string;
  monthly_gross_salary: string[];
  monthly_tax_amount: number[];
}

interface DataTableProps {
  data: StateData[];
  stateToFind: string;
}
const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle: React.CSSProperties = {
  background: "#f2f2f2",
  textAlign: "left",
  padding: "8px",
  border: "2px solid #ddd",
};

const tdStyle: React.CSSProperties = {
  border: "2px solid #ddd",
  textAlign: "left",
  padding: "8px",
};

const DataTable: React.FC<DataTableProps> = ({ data, stateToFind }) => {
  const matchingState = data.find((item) => item.state === stateToFind); // changes based on location

  if (!matchingState) {
    return <p>{`State '${stateToFind}' not found in the data.`}</p>;
  }

  const renderTableData = () => {
    if (
      matchingState.monthly_gross_salary.length === 0 &&
      matchingState.monthly_tax_amount.length === 0
    ) {
      return <p>{`No data available for ${stateToFind}.`}</p>;
    }

    return matchingState.monthly_gross_salary.map((salary, index) => (
      <tr key={index}>
        <td style={tdStyle}>
          <MDTypography variant="subtitle2">{salary}</MDTypography>
        </td>
        <td style={tdStyle}>
          <MDTypography variant="subtitle2">{matchingState.monthly_tax_amount[index]}</MDTypography>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <MDTypography variant="subtitle1">Tax Slabs for {stateToFind}</MDTypography>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>
              <MDTypography variant="body1">Monthly Gross Salary</MDTypography>
            </th>
            <th style={thStyle}>
              <MDTypography variant="body1">Monthly Tax Amount</MDTypography>
            </th>
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
    </div>
  );
};
interface ViewProps {
  stateToFind: string;
}
// Usage
const View: React.FC<ViewProps> = ({ stateToFind }) => {
  const [taxdata, setTaxdata] = useState([]);
  // Fetch views on component mount --start
  const fetchViews = async () => {
    try {
      const response = await axios.get("http://10.0.20.133:8000/professional_tax/view_slabs", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setTaxdata(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  //end

  useEffect(() => {
    fetchViews();
  }, []);

  return <DataTable data={taxdata} stateToFind={stateToFind} />;
};

export default View;
