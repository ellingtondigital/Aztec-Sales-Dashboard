
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useUploadedData } from '../context/UploadedDataContext';

const SimpleBarChart = () => {
  const { uploadedData } = useUploadedData();

  // State to track the selected column index
  const [selectedColumnIndex, setSelectedColumnIndex] = useState(209); // Default to 209 ("LEADS")

  // Extract data from "Lead Source" sheet
  const sheetName = 'Lead Source'; // Sheet name
  const dataRange = { start: 4, end: 63 }; // Range from A4 to A63

  // Convert the sheet data into the required format for the BarChart
  const extractData = (data) => {
    if (!data[sheetName]) return [];

    const sheet = data[sheetName];
    const extractedData = [];
    for (let i = dataRange.start - 1; i < dataRange.end - 1 && i < sheet.length; i++) {
      extractedData.push({
        name: sheet[i][0], // Item names from column A
        value: sheet[i][selectedColumnIndex] || 0, // Values from the selected column
      });
    }
    return extractedData;
  };

  const data = extractData(uploadedData);

  // Style for the buttons
  const buttonStyle = {
    default: {
      height: '50px',
      fontSize: 13,
      backgroundColor: '#F7FDFF',
      color: '#333',
      padding: '10px 20px',
      border: '0.5px solid #CCCCCC',
      cursor: 'pointer',
      boxShadow: 'none',
      flex: 1,  // Make buttons occupy equal width
      transition: 'background-color 0.3s',
    },
    selected: {
      height: '50px',
      fontSize: 12,
      backgroundColor: '#E6E6E6',
      color: '#333',
      padding: '10px 20px',
      border: '0.5px solid #CCCCCC',
      cursor: 'pointer',
      boxShadow: 'inset 2px 2px 5px rgba(0, 0, 0, 0.2)',
      flex: 1,  // Make buttons occupy equal width
      transition: 'background-color 0.3s', 
    },
    hover: {
      backgroundColor: '#E6E6E6', // Hover effect background color
    },
  };

  return (
    <div className="rounded-md bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 px-4 py-4 mb-6 border-b border-border">
        <h3 className="text-xl font-medium leading-none">Lead Source</h3>

        {/* Buttons for selecting the column */}
        <div className="flex space-x-2" style={{ marginLeft: '60%', display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={() => setSelectedColumnIndex(209)}
            style={{
              ...buttonStyle.default,
              borderRadius: '5px 0 0 5px', // First button rounded corners
              ...(selectedColumnIndex === 209 ? buttonStyle.selected : {}),
            }}
          >
            LEADS
          </button>
          <button
            onClick={() => setSelectedColumnIndex(210)}
            style={{
              ...buttonStyle.default,
              ...(selectedColumnIndex === 210 ? buttonStyle.selected : {}),
            }}
          >
            APPTS
          </button>
          <button
            onClick={() => setSelectedColumnIndex(211)}
            style={{
              ...buttonStyle.default,
              ...(selectedColumnIndex === 211 ? buttonStyle.selected : {}),
            }}
          >
            SALES
          </button>
          <button
            onClick={() => setSelectedColumnIndex(212)}
            style={{
              ...buttonStyle.default,
              borderRadius: '0 5px 5px 0', // Last button rounded corners
              ...(selectedColumnIndex === 212 ? buttonStyle.selected : {}),
            }}
          >
            Amount $
          </button>
        </div>
      </div>
      <div className="p-6 pt-0">
        <ResponsiveContainer width="100%" height={2500}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, bottom: 20, left: 0 }} // Removed space on the left side
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              domain={[0, 350]} // Set domain to limit the range
              stroke="hsl(215.3 19.3% 34.5%)"
              tick={{ fontSize: 12 }} // Adjust font size for better readability
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="hsl(215.3 19.3% 34.5%)"
              tick={{ fontSize: 12 }} // Adjust font size for better readability
              width={350} // Reduced width for Y-axis
              tickLine={false} // Hide tick lines for better appearance
              axisLine={{ stroke: 'hsl(215.3 19.3% 34.5%)' }} // Customize axis line color
            />
            <Tooltip />
            <Bar 
              dataKey="value" 
              fill="#00C2DD" // Updated bar color to #00C2DD
              barSize={20} // Adjusted bar thickness to 10
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SimpleBarChart;
