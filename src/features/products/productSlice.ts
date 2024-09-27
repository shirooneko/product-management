import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from './productAPI';

interface ProductState {
  products: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchAllProducts = createAsyncThunk('products/fetchAll', async () => {
  const products = await fetchProducts();
  return products;
});

export const createNewProduct = createAsyncThunk('products/create', async (product: any) => {
  const newProduct = await addProduct(product);
  return newProduct;
});

export const updateExistingProduct = createAsyncThunk('products/update', async ({ id, product }: { id: number, product: any }) => {
  const updatedProduct = await updateProduct(id, product);
  return updatedProduct;
});

export const removeProduct = createAsyncThunk('products/delete', async (id: number) => {
  await deleteProduct(id);
  return id; 
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      // Add product
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      // Update product
      .addCase(updateExistingProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      // Delete product
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
