import React, { useState, useEffect } from "react";
import { useProduct } from '../hook/useProduct'
import { useSelector } from 'react-redux'
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";





const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);





const initialProducts = [
  {
    id: 1,
    name: "Off-White Linen Shirt",
    price: 1299,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80",
  },
  {
    id: 2,
    name: "Striped Button-Up Shirt",
    price: 1499,
    image: "https://images.unsplash.com/photo-1602810316693-3667c854239a?w=400&q=80",
  },
  {
    id: 3,
    name: "Classic Suede Loafers",
    price: 2499,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&q=80",
  },
  {
    id: 4,
    name: "Camel Double-Breasted Suit",
    price: 3999,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    id: 5,
    name: "Slim Fit Black Jeans",
    price: 1999,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80",
  },
  {
    id: 6,
    name: "Olive Overshirt Jacket",
    price: 1799,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80",
  },
];




export default function SellerDashboard() {


  const [products, setProducts] = useState(initialProducts);

  const { handleGetSellerProducts } = useProduct()
  const sellerProducts = useSelector(state => state.product.sellerProducts)


  useEffect(() => {
      handleGetSellerProducts()

  }, [])
    




  const handleEdit = (product) => {
    console.log("Edit product:", product);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCreateProduct = () => {
    console.log("Navigate to Create Product");
  };



  return (
    <div className="min-h-screen bg-[#f5f4f1] font-sans">

      {/* Navbar */}
      <Navbar />



      {/* Page content */}
      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Page header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-[#1a1a1a] text-[32px] font-bold tracking-tight leading-tight">
              Seller Dashboard
            </h1>
            <p className="text-[#888] text-[14px] mt-2">
              Manage your products and track your listings.
            </p>
          </div>

          <button
            onClick={handleCreateProduct}
            className="flex items-center gap-2 px-6 py-3.5 bg-linear-to-r from-[#c9a84c] to-[#b8963c] hover:from-[#d4b55a] hover:to-[#c9a84c] text-white text-sm font-semibold rounded-xl shadow-[0_4px_16px_rgba(184,150,60,0.3)] hover:shadow-[0_4px_24px_rgba(184,150,60,0.45)] transition-all duration-200"
          >
            <PlusIcon />
            Create Product
          </button>
        </div>
        

        {/* Products grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-[#aaa] text-lg font-medium">No products yet.</p>
            <p className="text-[#bbb] text-sm mt-1">Click "Create Product" to add your first listing.</p>
          </div>
        )}

      </main>
    </div>
  );
}