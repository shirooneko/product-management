import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewProduct, updateExistingProduct, removeProduct } from '../features/products/productSlice';
import { AppDispatch } from '../store';
import '../style/styles.css';

interface ProductFormProps {
  product?: any;
  editMode?: boolean;
  onClose: () => void;
}

const formatRupiah = (value: number) => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });
  return formatter.format(value);
};

const ProductForm: React.FC<ProductFormProps> = ({ product, editMode = false, onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const [productName, setProductName] = useState(product?.product_name || '');
  const [category, setCategory] = useState(product?.category || '');
  const [price, setPrice] = useState(product?.price || 0);
  const [discount, setDiscount] = useState(product?.discount || 0);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isHovered, setIsHovered] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    const newErrors: { [key: string]: string } = {};
    if (!productName) newErrors.productName = 'Product Name is required.';
    if (!category) newErrors.category = 'Category is required.';
    if (price <= 0) newErrors.price = 'Price must be greater than 0.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const cleanedPrice = parseFloat(price.toString().replace(/\D/g, ''));

    const newProduct = { product_name: productName, category, price: cleanedPrice, discount };

    if (editMode) {
      dispatch(updateExistingProduct({ id: product.id, product: newProduct }));
    } else {
      dispatch(createNewProduct(newProduct));
    }
    onClose();
  };

  const handleDelete = () => {
    console.log("Delete button clicked");
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("User confirmed deletion");
      dispatch(removeProduct(product.id));
      alert("Your product has been deleted.");
      onClose();
    } else {
      console.log("User canceled deletion");
    }
  };

  const isFormValid = productName && category && price > 0;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const numericValue = parseFloat(value);
    
    if (!isNaN(numericValue)) {
      setPrice(numericValue);
    } else {
      setPrice(0);
    }
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">{editMode ? 'Edit Product' : 'Add New Product'}</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Product Name</label>
        <input
          type="text"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${errors.productName ? 'border-red-600' : ''}`}
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        {errors.productName && <p className="text-red-600 text-sm">{errors.productName}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <input
          type="text"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${errors.category ? 'border-red-600' : ''}`}
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {errors.category && <p className="text-red-600 text-sm">{errors.category}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <input
          type="text"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${errors.price ? 'border-red-600' : ''}`}
          placeholder="Price"
          value={formatRupiah(price)}
          onChange={handlePriceChange}
        />
        {errors.price && <p className="text-red-600 text-sm">{errors.price}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Discount</label>
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          placeholder="Discount"
          value={discount}
          onChange={(e) => setDiscount(parseFloat(e.target.value))}
        />
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          className={`w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition ${isHovered && !isFormValid ? 'move-right' : ''} ${isReturning ? 'move-left' : ''}`}
          onMouseEnter={() => {
            if (!isFormValid) {
              setIsHovered(true);
            }
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            if (!isFormValid) {
              setIsReturning(true);
              setTimeout(() => setIsReturning(false), 500);
            }
          }}
        >
          {editMode ? 'Update Product' : 'Add Product'}
        </button>

        {editMode && (
          <button
            type="button"
            onClick={onClose}
            className="ml-2 w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
