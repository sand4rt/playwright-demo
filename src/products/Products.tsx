import { useEffect, useState } from 'react';

async function getProducts(): Promise<string[]> {
  const response = await fetch('/api/v1/products.json');
  return await response.json();
}

export function Products() {
  const [products, setProducts] = useState<string[]>([]);
  useEffect(() => {
    getProducts().then(setProducts)
  }, []);
  return <ul>{products.map(product => <li key={product}>{product}</li>)}</ul>
}
