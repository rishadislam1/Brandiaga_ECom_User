import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    color: string;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

// Load initial state from localStorage
const loadStateFromLocalStorage = (): CartItem[] => {
    try {
        const serializedState = localStorage.getItem('cart');
        return serializedState ? JSON.parse(serializedState) : [];
    } catch (e) {
        console.warn('Error loading cart from localStorage:', e);
        return [];
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        ...initialState,
        items: loadStateFromLocalStorage(),
    },
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItemIndex = state.items.findIndex(
                (item) => item.productId === action.payload.productId && item.color === action.payload.color
            );
            if (existingItemIndex >= 0) {
                state.items[existingItemIndex].quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
            // Sync with localStorage
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        updateCartItem: (state, action: PayloadAction<{ productId: string; color: string; quantity: number }>) => {
            const { productId, color, quantity } = action.payload;
            const existingItemIndex = state.items.findIndex(
                (item) => item.productId === productId && item.color === color
            );
            if (existingItemIndex >= 0) {
                if (quantity <= 0) {
                    state.items.splice(existingItemIndex, 1);
                } else {
                    state.items[existingItemIndex].quantity = quantity;
                }
                // Sync with localStorage
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        removeFromCart: (state, action: PayloadAction<{ productId: string; color: string }>) => {
            state.items = state.items.filter(
                (item) => !(item.productId === action.payload.productId && item.color === action.payload.color)
            );
            // Sync with localStorage
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem('cart');
        },
        initializeCart: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
    },
});

export const { addToCart, updateCartItem, removeFromCart, clearCart, initializeCart } = cartSlice.actions;
export default cartSlice.reducer;