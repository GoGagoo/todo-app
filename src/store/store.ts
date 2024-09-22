import { combineReducers, createStore } from 'redux'
import { todoItemsReducer } from './reducers'

export interface TodoItem {
	id: number
	text: string
	isCompleted: boolean
}

const rootReducer = combineReducers({
	todos: todoItemsReducer,
})

const store = createStore(rootReducer)

export type TypedRootState = ReturnType<typeof rootReducer>

export default store
