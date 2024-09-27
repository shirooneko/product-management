import React from 'react';
import ProductForm from './ProductForm';

interface ProductModalProps {
  product?: any;
  editMode?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, editMode, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg relative">
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>X</button>
        <ProductForm product={product} editMode={editMode} onClose={onClose} />
      </div>
    </div>
  );
};

export default ProductModal;