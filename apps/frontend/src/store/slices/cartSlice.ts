import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CartItem {
    productId: string
    name: string
    price: number
    quantity: number
}

export interface CartState {
    items: CartItem[]
    total: number
}

const initialState: CartState = {
    items: [],
    total: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existing = state.items.find(i => i.productId === action.payload.productId)
            if (existing) existing.quantity += action.payload.quantity
            else state.items.push(action.payload)
            state.total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(i => i.productId !== action.payload)
            state.total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
        },
        clearCart: (state) => {
            state.items = []
            state.total = 0
        },
        updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number; price: number; name: string }>) => {
            const existingItem = state.items.find(i => i.productId === action.payload.productId)

            if (action.payload.quantity === 0) {
                // Remove item if quantity is 0
                state.items = state.items.filter(i => i.productId !== action.payload.productId)
            } else if (existingItem) {
                // Update existing item
                existingItem.quantity = action.payload.quantity
                existingItem.price = action.payload.price
                existingItem.name = action.payload.name
            } else {
                // Add new item
                state.items.push({
                    productId: action.payload.productId,
                    name: action.payload.name,
                    price: action.payload.price,
                    quantity: action.payload.quantity
                })
            }

            state.total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
        },
    },
})


export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions
export default cartSlice.reducer
