import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Link from 'next/link';

const ProductList = ({ products }) => {
  return (
    <Container>
      <Row>
        {products.map((product) => (
          <Col key={product._id} md={4}>
            <Card>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Link href={`/products/${product._id}`}>
                  <a className="btn btn-primary">View Details</a>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
