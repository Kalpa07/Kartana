"use client";
import Card from "./Card"
import {useState, useEffect} from "react";

const Listing = () => {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();

        // Optional: Filter to include only relevant "mocked" categories
        const filtered = data.filter((product) =>
          product.title.toLowerCase().includes('laptop') ||
          product.title.toLowerCase().includes('macbook') ||
          product.title.toLowerCase().includes('tablet') ||
          product.category === 'electronics' // as fallback
        );

        setProducts(filtered);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-white text-center">Loading products...</p>;

  return (
    <div className='h-auto'>
      <div>

      </div>
      <div className="flex flex-wrap justify-center">
      {products.map((product) => (
        <Card
          key={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
          image={product.image}
          rate={product.rating.rate}
        />
      ))}
    </div>
    </div>
  )
}

export default Listing
