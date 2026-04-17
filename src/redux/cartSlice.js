import { createSlice } from '@reduxjs/toolkit';

// Load from localStorage
const loadCartFromLocalStorage = () => {
    try {
        const data = localStorage.getItem('cart');
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

const saveCartToLocalStorage = (items) => {
    try {
        localStorage.setItem('cart', JSON.stringify(items));
    } catch (err) {
        console.error('Save error:', err);
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: loadCartFromLocalStorage(),
    },
    reducers: {
        addToCart: (state, action) => {
            const index = state.items.findIndex(
                item => item.id === action.payload.id
            );

            if (index >= 0) {
                state.items[index].quantity =
                    (state.items[index].quantity || 1) + 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }

            saveCartToLocalStorage(state.items);
        },

        // ✅ ADD THIS (missing in your code)
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;

            const item = state.items.find(i => i.id === id);
            if (item) {
                item.quantity = quantity;
            }

            saveCartToLocalStorage(state.items);
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                item => item.id !== action.payload
            );

            saveCartToLocalStorage(state.items);
        },

        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem('cart');
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity // ✅ export this
} = cartSlice.actions;

export default cartSlice.reducer;