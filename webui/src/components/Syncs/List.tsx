import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Sync {
  title: string;
  description?: string;
}

function List() {
  const syncs: Array<Sync> = [];

  return syncs.length === 0 ? (
    <h5 className="mt-3">You don't have any Syncs setup yet.</h5>
  ) : (
    <div className="mt-3">
      <Row>
        {syncs.map((sync) => (
          <Col sm={4}>
            <Card className="mb-4" style={{ minHeight: 250 }}>
              <Card.Body>
                <Card.Title>{sync.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {sync.description}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default List;
