import { createSlice, nanoid } from "@reduxjs/toolkit"


const initialState = [{
    id: 1,
    text: "Hello World"
}]


export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.push(todo)
        },
        removeTodo: (state, action) => {
            return state.filter((item) => item.id !== action.payload)
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload
            const updateTodo = state.find((item) => item.id === id)
            if (updateTodo) {
                updateTodo.text = text
            }
        }
    }
})

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;