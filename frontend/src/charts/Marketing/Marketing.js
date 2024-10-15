// export default MarketingBarChart;
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useUploadedData } from "../../context/UploadedDataContext";

const MarketingBarChart = () => {
  const { uploadedData } = useUploadedData();

  // State to track the selected column index
  const [selectedColumnIndex, setSelectedColumnIndex] = useState(7); // Default to 209 ("LEADS")

  // Extract data from "Marketing" sheet
  const sheetName = "Marketing"; // Sheet name
  const dataRange = {
    start: 3,
    end: 17,
  }; // Range from G3 to G16

  // Convert the sheet data into the required format for the BarChart
  const extractData = (data) => {
    if (!data[sheetName]) return [];

    const sheet = data[sheetName];
    const extractedData = [];

    // Iterate over the range from row 3 to row 16 (inclusive)
    for (
      let rowIndex = dataRange.start - 1;
      rowIndex < dataRange.end - 1 && rowIndex < sheet.length;
      rowIndex++
    ) {
      extractedData.push({
        name: sheet[rowIndex][6], // Access column G (index 6) for item names
        value: sheet[rowIndex][selectedColumnIndex] || 0, // Value from selected column
      });
    }
    return extractedData;
  };

  const data = extractData(uploadedData);

  // Calculate min and max values dynamically for the selected column
  const calculateDomain = (data) => {
    const values = data.map((item) => item.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    return [minValue < 0 ? minValue : 0, maxValue]; // Ensure the min is at least 0 or negative if values are negative
  };

  // Get the dynamic domain
  const domain = calculateDomain(data);

  // Style for the buttons
  const buttonStyle = {
    default: {
      height: "50px",
      fontSize: 13,
      backgroundColor: "#F7FDFF",
      color: "#333",
      padding: "10px 20px",
      border: "0.5px solid #CCCCCC",
      cursor: "pointer",
      boxShadow: "none",
      flex: 1, // Make buttons occupy equal width
      transition: "background-color 0.3s",
    },
    selected: {
      height: "50px",
      fontSize: 12,
      backgroundColor: "#E6E6E6",
      color: "#333",
      padding: "10px 20px",
      border: "0.5px solid #CCCCCC",
      cursor: "pointer",
      boxShadow: "inset 2px 2px 5px rgba(0, 0, 0, 0.2)",
      flex: 1, // Make buttons occupy equal width
      transition: "background-color 0.3s",
    },
    hover: {
      backgroundColor: "#E6E6E6", // Hover effect background color
    },
  };

  return (
    <div className="rounded-md bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 px-4 py-4 mb-6 border-b border-border">
        <h3 className="text-xl font-medium leading-none"> Marketing </h3>
        {/* Buttons for selecting the column */}{" "}
        <div
          className="flex space-x-2"
          style={{
            marginLeft: "10%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => setSelectedColumnIndex(7)}
            style={{
              ...buttonStyle.default,
              borderRadius: "5px 0 0 5px", // First button rounded corners
              ...(selectedColumnIndex === 7 ? buttonStyle.selected : {}),
            }}
          >
            Campaign Cost{" "}
          </button>{" "}
          <button
            onClick={() => setSelectedColumnIndex(8)}
            style={
              selectedColumnIndex === 8
                ? buttonStyle.selected
                : buttonStyle.default
            }
          >
            # of Leads{" "}
          </button>{" "}
          <button
            onClick={() => setSelectedColumnIndex(9)}
            style={
              selectedColumnIndex === 9
                ? buttonStyle.selected
                : buttonStyle.default
            }
          >
            Cost Per Lead{" "}
          </button>{" "}
          <button
            onClick={() => setSelectedColumnIndex(10)}
            style={
              selectedColumnIndex === 10
                ? buttonStyle.selected
                : buttonStyle.default
            }
          >
            # of Appts{" "}
          </button>{" "}
          <button
            onClick={() => setSelectedColumnIndex(11)}
            style={
              selectedColumnIndex === 11
                ? buttonStyle.selected
                : buttonStyle.default
            }
          >
            Cost per Appt{" "}
          </button>{" "}
          <button
            onClick={() => setSelectedColumnIndex(12)}
            style={
              selectedColumnIndex === 12
                ? buttonStyle.selected
                : buttonStyle.default
            }
          >
            # of Sales{" "}
          </button>{" "}
          <button
            onClick={() => setSelectedColumnIndex(13)}
            style={
              selectedColumnIndex === 13
                ? buttonStyle.selected
                : buttonStyle.default
            }
          >
            Cost per Sale{" "}
          </button>{" "}
          <button
            onClick={() => setSelectedColumnIndex(14)}
            style={
              selectedColumnIndex === 14
                ? buttonStyle.selected
                : buttonStyle.default
            }
          >
            # of Appts{" "}
          </button>{" "}
          <button
            onClick={() => setSelectedColumnIndex(15)}
            style={
              selectedColumnIndex === 15
                ? buttonStyle.selected
                : buttonStyle.default
            }
          >
            Revenue{" "}
          </button>{" "}
          <button
            onClick={() => setSelectedColumnIndex(16)}
            style={{
              ...buttonStyle.default,
              borderRadius: "0 5px 5px 0", // Last button rounded corners
              ...(selectedColumnIndex === 16 ? buttonStyle.selected : {}),
            }}
          >
            % Cost of Revenue{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
      <div className="p-6 pt-0">
        <ResponsiveContainer width="100%" height={1000}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 20,
              right: 30,
              bottom: 20,
              left: 0,
            }} // Removed space on the left side
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              domain={domain} // Set dynamic domain based on data
              stroke="hsl(215.3 19.3% 34.5%)"
              tick={{
                fontSize: 12,
              }} // Adjust font size for better readability
            />{" "}
            <YAxis
              type="category"
              dataKey="name"
              stroke="hsl(215.3 19.3% 34.5%)"
              tick={{
                fontSize: 12,
              }} // Adjust font size for better readability
              width={350} // Reduced width for Y-axis
              tickLine={false} // Hide tick lines for better appearance
              axisLine={{
                stroke: "hsl(215.3 19.3% 34.5%)",
              }} // Customize axis line color
            />{" "}
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#63F700" // Updated bar color to #00C2DD
              barSize={20} // Adjusted bar thickness to 10
            />{" "}
          </BarChart>{" "}
        </ResponsiveContainer>{" "}
      </div>{" "}
    </div>
  );
};

export default MarketingBarChart;
