import axios from 'axios';

const API_URL = 'http://localhost:8000/api/products';

// Fetch all products
export const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data.data;
};

// Add a new product
export const addProduct = async (product: any) => {
  const response = await axios.post(API_URL, product);
  return response.data.data;
};

// Update an existing product
export const updateProduct = async (id: number, product: any) => {
  const response = await axios.put(`${API_URL}/${id}`, product);
  return response.data.data;
};

// Delete a product
export const deleteProduct = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
