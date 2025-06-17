import { createSlice } from "@reduxjs/toolkit"

const initialState = { value: 0 }

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value = state.value + 1
        },
        // we are able to right a short syntax like this due to Immer library
        decrement: (state) => {
            state.value -= 1
        },
        reset: (state) => {
            state.value = 0
        }
    }
})

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;