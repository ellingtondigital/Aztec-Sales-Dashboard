import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useUploadedData } from '../context/UploadedDataContext';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [selectedSheet, setSelectedSheet] = useState('');
    const { uploadedData, setUploadedData } = useUploadedData();

    useEffect(() => {
        // Fetch the most recent file name
        axios.get(`${API_BASE_URL}/last-uploaded`)
            .then(response => {
                console.log('Most recent file data:', response.data); // Log the fetched data

                const { fileName, sheetName, rows } = response.data;

                if (fileName && sheetName) {
                    // Fetch all records for the file
                    axios.get(`${API_BASE_URL}/files/${fileName}`)
                        .then(response => {
                            console.log('Data for the most recent file:', response.data); // Log data for the most recent file

                            const sheetData = response.data.reduce((acc, { sheet_name, rows }) => {
                                acc[sheet_name] = rows;
                                return acc;
                            }, {});
                            setUploadedData(sheetData);
                            setSelectedSheet(sheetName);
                        })
                        .catch(error => {
                            console.error('Error fetching data for the most recent file:', error);
                        });
                }
            })
            .catch(error => {
                console.error('Error fetching the most recent file:', error);
            });
    }, [setUploadedData]);

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onFileUpload = () => {
        const formData = new FormData();
        formData.append('file', file);

        axios.post(`${API_BASE_URL}/upload`, formData)
            .then(response => {
                console.log('Upload response:', response.data); // Log the upload response
                setUploadedData(response.data);
                setSelectedSheet(Object.keys(response.data)[0]);
            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });
    };

    const handleSheetChange = (e) => {
        setSelectedSheet(e.target.value);
    };

    const renderTable = (data) => {
        if (!data.length) return null;

        return (
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        {data[0].map((_, idx) => (
                            <th key={idx} style={{ border: '1px solid black', padding: '8px' }}>Column {idx + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={{ border: '1px solid black', padding: '8px' }}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div>
            <h1>Upload .xlsx File</h1>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>Upload</button>
            {Object.keys(uploadedData).length > 0 && (
                <div>
                    <h2>Select a sheet:</h2>
                    <select onChange={handleSheetChange} value={selectedSheet}>
                        {Object.keys(uploadedData).map((sheetName, index) => (
                            <option key={index} value={sheetName}>{sheetName}</option>
                        ))}
                    </select>
                    <div>
                        <h2>Data from {selectedSheet}:</h2>
                        {renderTable(uploadedData[selectedSheet])}
                    </div>
                </div>
            )}
        </div>
    );
}

export default FileUpload;
