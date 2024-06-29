import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const OrderForm = () => {
  const [orderDetails, setOrderDetails] = useState({
    product: '',
    quantity: 1,
    address: '',
  });

  const handleChange = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle order submission logic here
  };

  return (
    <Container>
      <h2>Place an Order</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formProduct">
          <Form.Label>Product</Form.Label>
          <Form.Control
            type="text"
            name="product"
            value={orderDetails.product}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={orderDetails.quantity}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Delivery Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={orderDetails.address}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Submit Order</Button>
      </Form>
    </Container>
  );
};

export default OrderForm;
