import * as XLSX from "xlsx";

export function exportToExcel(data, fileName = "Products.xlsx") {
  // Step 1: Prepare Data for Export
  const formattedData = data.map((product) => ({
    ID: product.id,
    Name: product.name,
    "Product Code": product.productCode,
    "Batch Code": product.batchCode,
    "DP Value": product.dpvalue,
    "Expiry Date": product.expiryDate,
    MRP: product.mrp,
    Quantity: product.quantity,
    Principle: product.principle
      ? product.principle.name
      : "No Principle Available",
  }));

  // Step 2: Create a Workbook and Add the Data
  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

  // Step 3: Export the Workbook as an Excel File
  XLSX.writeFile(workbook, fileName);
}
