// import React, { useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { useUploadedData } from '../context/UploadedDataContext';

// const SimpleBarChart = () => {
//   const { uploadedData } = useUploadedData();

//   // State to track the selected column index
//   const [selectedColumnIndex, setSelectedColumnIndex] = useState(209); // Default to 209 ("LEADS")

//   // Extract data from "Lead Source" sheet
//   const sheetName = 'Lead Source'; // Sheet name
//   const dataRange = { start: 4, end: 63 }; // Range from A4 to A63

//   // Convert the sheet data into the required format for the BarChart
//   const extractData = (data) => {
//     if (!data[sheetName]) return [];

//     const sheet = data[sheetName];
//     const extractedData = [];
//     for (let i = dataRange.start - 1; i < dataRange.end - 1 && i < sheet.length; i++) {
//       extractedData.push({
//         name: sheet[i][0], // Item names from column A
//         value: sheet[i][selectedColumnIndex] || 0 // Values from the selected column
//       });
//     }
//     return extractedData;
//   };

//   const data = extractData(uploadedData);

//   return (
//     <div className="rounded-md bg-card text-card-foreground shadow-sm">
//       <div className="flex flex-col space-y-1.5 px-4 py-4 mb-6 border-b border-border">
//         <h3 className="text-xl font-medium leading-none">Lead Source</h3>
        
//         {/* Buttons for selecting the column */}
//         <div className="flex space-x-2">
//           <button onClick={() => setSelectedColumnIndex(209)}style={{ backgroundColor: '#01A5E4', marginRight: '10px' }} className="px-4 py-2 bg-blue-500 text-white rounded">LEADS</button>
//           <button onClick={() => setSelectedColumnIndex(210)}style={{ backgroundColor: '#8DD7C0', marginRight: '10px' }} className="px-4 py-2 bg-green-500 text-white rounded">APPTS</button>
//           <button onClick={() => setSelectedColumnIndex(211)}style={{ backgroundColor: '#FF96C6', marginRight: '10px' }} className="px-4 py-2 bg-yellow-500 text-white rounded">SALES</button>
//           <button onClick={() => setSelectedColumnIndex(212)}style={{ backgroundColor: '#FF5768', marginRight: '10px' }} className="px-4 py-2 bg-red-500 text-white rounded">Amount $</button>
//         </div>
//       </div>
//       <div className="p-6 pt-0">
//         <ResponsiveContainer width="100%" height={2500}> {/* Adjust height as needed */}
//           <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, bottom: 20, left: 100 }}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis
//               type="number"
//               domain={[0, 350]} // Set domain to limit the range
//               stroke="hsl(215.3 19.3% 34.5%)"
//               tick={{ fontSize: 12 }} // Adjust font size for better readability
//             />
//             <YAxis
//               type="category"
//               dataKey="name"
//               stroke="hsl(215.3 19.3% 34.5%)"
//               tick={{ fontSize: 12 }} // Adjust font size for better readability
//               width={150} // Set width for Y-axis to accommodate long names
//               tickLine={false} // Hide tick lines for better appearance
//               axisLine={{ stroke: 'hsl(215.3 19.3% 34.5%)' }} // Customize axis line color
//             />
//             <Tooltip />
//             <Bar dataKey="value" fill="hsl(25 95% 53%)" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default SimpleBarChart;
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
      backgroundColor: 'white',
      color: '#333',
      marginRight: '0px',
      padding: '10px 20px ',
      border: '1px solid #ccc',
      borderRadius: '5px',
      cursor: 'pointer',
      boxShadow: 'none',
    },
    selected: {
      backgroundColor: '#EBEBEB',
      color: '#333',
      marginRight: '5px',
      marginLeft: '5px',
      padding: '10px 20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      cursor: 'pointer',
      boxShadow: 'inset 2px 2px 5px rgba(0, 0, 0, 0.2)',
    },
  };

  return (
    <div className="rounded-md bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 px-4 py-4 mb-6 border-b border-border">
        <h3 className="text-xl font-medium leading-none">Lead Source</h3>

        {/* Buttons for selecting the column */}
        <div className="flex space-x-2" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setSelectedColumnIndex(209)}
            style={selectedColumnIndex === 209 ? buttonStyle.selected : buttonStyle.default}
          >
            LEADS
          </button>
          <button
            onClick={() => setSelectedColumnIndex(210)}
            style={selectedColumnIndex === 210 ? buttonStyle.selected : buttonStyle.default}
          >
            APPTS
          </button>
          <button
            onClick={() => setSelectedColumnIndex(211)}
            style={selectedColumnIndex === 211 ? buttonStyle.selected : buttonStyle.default}
          >
            SALES
          </button>
          <button
            onClick={() => setSelectedColumnIndex(212)}
            style={selectedColumnIndex === 212 ? buttonStyle.selected : buttonStyle.default}
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
