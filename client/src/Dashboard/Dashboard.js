import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Dashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/dashboard");
        const responseData = await response.json();
        console.log(responseData.appStats);
        setData(responseData.appStats);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <div className="card-container">
        <Row className="mt-5">
          {data &&
            Object.keys(data).map((key, index) => (
              <Col key={index} md={3} className="mb-5 text-center">
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Text>{key}</Card.Text>
                    <Card.Title>{data[key]}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
