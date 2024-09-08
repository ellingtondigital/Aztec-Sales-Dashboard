    import React from 'react';
    import { Container, Row, Col, Card } from 'react-bootstrap';
    import SimpleBarChart from '../charts/SimpleBarChart';
    import Menubar from './Menubar';

    function Dashboard() {
    return (
        
        
        <Container>
        {/* <h1>Dashboard</h1> */}
        <Row style={{ border: '1px solid black', padding: '10px', }}>      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Menubar />
        </div>
        </Row>


        <Row>
        <Col md={12}>
            <Card style={{ border: 'none' }}>
                {/* <Card.Header>Lead Source Bar Chart</Card.Header> */}
                <Card.Body>
                <SimpleBarChart /> {/* Display the SimpleBarChart component */}
                </Card.Body>
            </Card>
        </Col>
            {/* <Col md={4}>
            <Card>
                <Card.Header>Card Title 1</Card.Header>
                <Card.Body>
                <Card.Text>
                    This is some content for the first card.
                </Card.Text>
                </Card.Body>
            </Card>
            </Col> */}

        {/* <Col md={4}>
            <Card>
                <Card.Header>Card Title 3</Card.Header>
                <Card.Body>
                <Card.Text>
                    This is some content for the third card.
                </Card.Text>
                </Card.Body>
            </Card>
            </Col> */}
        </Row>
        </Container>
    );
    }

    export default Dashboard;
