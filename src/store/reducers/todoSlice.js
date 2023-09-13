import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
//Reducer Thunk
export const getTodos = createAsyncThunk('todos/todoFetched', async () => {
    const respone = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    return respone.data
})

export const addTodo = createAsyncThunk('todos/todoAdded', async title => {
    const newTodo = {
        id: nanoid(),
        title,
        completed: false
    }

    await axios.post('https://jsonplaceholder.typicode.com/todos?', newTodo)

    return newTodo
})

export const deleteTodo = createAsyncThunk('todos/todoDelete', async todoID => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoID}`)
    return todoID
})

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        allTodos: []
    },
    reducers: {
        markComplete(state, action) {
            const todoId = action.payload
            state.allTodos = state.allTodos.map(todo => {
                if (todo.id === todoId) todo.completed = !todo.completed
                return todo
            })
        }
    },
    extraReducers: {
        //GET all todos
        [getTodos.pending]: (state, action) => {
            console.log('Fetching todos from backend ...')
        },
        [getTodos.fulfilled]: (state, action) => {
            console.log('done')
            state.allTodos = action.payload
        },
        [getTodos.rejected]: (state, action) => {
            console.log('Failed to get todos!')
        },
        //ADD todo
        [addTodo.fulfilled]: (state, action) => {
            state.allTodos.unshift(action.payload)
        },
        //DELETE todo
        [deleteTodo.fulfilled]: (state, action) => {
            const todoID = action.payload
            state.allTodos = state.allTodos.filter(todo => todo.id !== todoID)
        }
    }
})
//Reducer
const todoReducer = todoSlice.reducer
//Selector
export const todoSelector = state => state.todoReducer.allTodos
//Action export
export const { markComplete } = todoSlice.actions
//export reducer
export default todoReducer
