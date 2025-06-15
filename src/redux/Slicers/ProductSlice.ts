import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define Product interface
interface Product {
    productId: string;
    name: string;
    sku: string;
    price: number;
    discountPrice?: number;
    categoryId: string;
    categoryName: string;
    productImage?: string;
    createdAt: string;
    updatedAt: string;
    brand?: string;
    rating?: number;
    reviewCount?: number;
    description?: string;
    subcategory?: string;
}

// Define state interface
interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: [],
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        addProducts: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        updateProduct: (state, action: PayloadAction<Partial<Product> & { productId: string }>) => {
            const { productId, name, sku, price, discountPrice, categoryId } = action.payload;
            const index = state.products.findIndex((prod) => prod.productId === productId);
            if (index !== -1) {
                state.products[index] = {
                    ...state.products[index],
                    name: name ?? state.products[index].name,
                    sku: sku ?? state.products[index].sku,
                    price: price ?? state.products[index].price,
                    discountPrice: discountPrice ?? state.products[index].discountPrice,
                    categoryId: categoryId ?? state.products[index].categoryId,
                };
            }
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter((prod) => prod.productId !== action.payload);
        },
    },
});

export const { setProducts, addProducts, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;