import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductList from '../components/ProductList';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h2>Products</h2>
          <ProductList products={products} />
        </Col>
      </Row>
    </Container>
  );
}
