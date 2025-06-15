import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './Slicers/LoadingSlice.js';
import categoryReducer from './Slicers/CategorySlice.js';
import productReducer from './Slicers/ProductSlice.ts';
import inventoryReducer from './Slicers/InventorySlice.js';
import cartReducer from './Slicers/CartSlice.ts';
import userReducer from './slicers/userSlice';
export default configureStore({
    reducer: {
        loading: loadingReducer,
        categories: categoryReducer,
        products: productReducer,
        inventory: inventoryReducer,
        cart: cartReducer,
        user: userReducer,
    },
});