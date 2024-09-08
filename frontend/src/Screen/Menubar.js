import React, { useState } from 'react';
import { useUploadedData } from '../context/UploadedDataContext';

const Menubar = () => {
  const { uploadedData } = useUploadedData();
  const [selectedSheet, setSelectedSheet] = useState('');

  const handleSheetChange = (event) => {
    setSelectedSheet(event.target.value);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h4>Menu</h4>
      <div>
        {Object.keys(uploadedData).length > 0 && (
          <div>

            <select onChange={handleSheetChange} value={selectedSheet} style={{ marginTop: '10px' }}>
              <option value="" disabled>Select a sheet</option>
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
