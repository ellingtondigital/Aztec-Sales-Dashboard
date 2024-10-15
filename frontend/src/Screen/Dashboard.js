// export default Dashboard;
import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import SimpleBarChart from "../charts/LeadSource/SimpleBarChart";
import MarketingBarChart from "../charts/Marketing/Marketing";
import Menubar from "./Menubar";
import { useUploadedData } from "../context/UploadedDataContext";

function Dashboard() {
  const { uploadedData } = useUploadedData(); // Get available sheets
  const [selectedSheet, setSelectedSheet] = useState("");

  // Handle sheet change from Menubar
  const handleSheetChange = (sheetName) => {
    setSelectedSheet(sheetName);
  };

  return (
    <Container>
      <Row
        style={{
          padding: "10px",
        }}
      >
        <Menubar onSheetChange={handleSheetChange} />
      </Row>
      <Row>
        <Col md={12}>
          <Card
            style={{
              border: "none",
            }}
          >
            <Card.Body>
              {" "}
              {/* Conditionally render SimpleBarChart if 'Sheet1' (or relevant sheet) is selected */}{" "}
              {selectedSheet === "Lead Source" && <SimpleBarChart />}{" "}
            </Card.Body>{" "}
          </Card>{" "}
        </Col>
        <Col md={12}>
          <Card
            style={{
              border: "none",
            }}
          >
            <Card.Body>
              {" "}
              {/* Conditionally render MarketingBarChart if 'Marketing' sheet is selected */}{" "}
              {selectedSheet === "Marketing" && <MarketingBarChart />}{" "}
            </Card.Body>{" "}
          </Card>{" "}
        </Col>
        {/* You can add more charts here for different sheets */}{" "}
      </Row>{" "}
    </Container>
  );
}

export default Dashboard;
