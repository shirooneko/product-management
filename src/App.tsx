import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductModal from './components/ProductModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);

  const openModal = (product?: any) => {
    setSelectedProduct(product || null);
    setEditMode(!!product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setEditMode(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Product Management</h1>
      <div className="mb-4 text-right">
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
          onClick={() => openModal()}
        >
          Add New Product
        </button>
      </div>
      <ProductList openModal={openModal} />
      <ProductModal product={selectedProduct} editMode={editMode} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;