import React from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

interface ExportToExcelProps {
  jsonData: any[];
}

const ExportToExcel: React.FC<ExportToExcelProps> = ({ jsonData }) => {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    console.log(worksheet, typeof worksheet, "mmmmmmmmmmmmmmmmmmmmmmmm");
    worksheet.B1.s = { font: { bold: true } };
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "data.xlsx");
  };

  return (
    <>
      <button onClick={handleExport}>Export to Excel</button>
    </>
  );
};

export default ExportToExcel;
