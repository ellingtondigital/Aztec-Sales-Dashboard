import React, { useState, useEffect } from 'react';
import { useUploadedData } from '../context/UploadedDataContext';

const Menubar = ({ onSheetChange }) => {
  const { uploadedData } = useUploadedData();
  const [selectedSheet, setSelectedSheet] = useState('');

  // Automatically set the first sheet as the default only if no sheet is already selected
  useEffect(() => {
    const sheetNames = Object.keys(uploadedData);
    if (sheetNames.length > 0 && !selectedSheet) {
      setSelectedSheet(sheetNames[0]); // Set the first sheet as selected
      onSheetChange(sheetNames[0]);    // Notify the parent component about the selection
    }
  }, [uploadedData, selectedSheet, onSheetChange]);

  const handleSheetChange = (event) => {
    const sheetName = event.target.value;
    setSelectedSheet(sheetName);
    onSheetChange(sheetName);  // Pass selected sheet to the parent component (Dashboard)
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h4>Menu</h4>
      <div>
        {Object.keys(uploadedData).length > 0 && (
          <div>
            <select
              onChange={handleSheetChange}
              value={selectedSheet}
              style={{ marginTop: '10px', width: '100%', height: '30px', textAlign: 'center' }}
            >
              {Object.keys(uploadedData).map((sheetName, index) => (
                <option key={index} value={sheetName}>{sheetName}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menubar;
