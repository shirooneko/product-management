// ProductList.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchAllProducts, removeProduct } from '../features/products/productSlice';

const ProductList: React.FC<{ openModal: (product?: any) => void }> = ({ openModal }) => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  React.useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="flex items-center space-x-2">
          <svg
            className="animate-spin h-5 w-5 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 118 8"
            ></path>
          </svg>
          <p className="text-lg font-medium text-blue-600">Loading...</p>
        </div>
      </div>
    );
  }  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200 rounded-lg">
            <tr>
              <th className="py-3 px-4 border-b border-gray-300 rounded-tl-lg">Name</th>
              <th className="py-3 px-4 border-b border-gray-300">Category</th>
              <th className="py-3 px-4 border-b border-gray-300">Price</th>
              <th className="py-3 px-4 border-b border-gray-300">Discount</th>
              <th className="py-3 px-4 border-b border-gray-300 rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className={`hover:bg-gray-100 ${index === products.length - 1 ? 'rounded-b-lg' : ''}`}>
                <td className="border px-4 py-2 border-gray-300">{product.product_name}</td>
                <td className="border px-4 py-2 border-gray-300">{product.category}</td>
                <td className="border px-4 py-2 border-gray-300">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(product.price)}
                </td>
                <td className="border px-4 py-2 border-gray-300">{product.discount}%</td>
                <td className="border px-4 py-2 border-gray-300">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded-full mr-2 hover:bg-blue-700 transition"
                    onClick={() => openModal(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 transition"
                    onClick={() => dispatch(removeProduct(product.id))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
