import {
	ADD_TODO_ITEM,
	DELETE_ALL_TODO_ITEMS,
	DELETE_TODO_ITEM,
	EDIT_TODO_ITEM,
	LOAD_TODO_ITEMS,
	SET_SEARCH_QUERY,
	SET_SORT_TODO,
	TODO_ITEM_COMPLETED,
} from './actions'
import { TodoItem } from './store'

interface TodoState {
	todos: TodoItem[]
	totalTodos: number
	sortFilter: string
	searchQuery: string
}

interface AddTodoAction {
	type: typeof ADD_TODO_ITEM
	payload: TodoItem
}

interface CompleteTodoAction {
	type: typeof TODO_ITEM_COMPLETED
	payload: { todoItemId: number }
}

interface DeleteTodoAction {
	type: typeof DELETE_TODO_ITEM
	payload: { todoItemId: number }
}

interface LoadTodoItemsAction {
	type: typeof LOAD_TODO_ITEMS
	payload: TodoItem[]
}

interface SetSortTodoAction {
	type: typeof SET_SORT_TODO
	payload: string
}

interface EditTodoAction {
	type: typeof EDIT_TODO_ITEM
	payload: {
		todoItemId: number
		newTodoText: string
	}
}

interface DeleteAllTodosAction {
	type: typeof DELETE_ALL_TODO_ITEMS
}

interface SetSearchQueryAction {
	type: typeof SET_SEARCH_QUERY
	payload: string
}

type TodoAction =
	| AddTodoAction
	| CompleteTodoAction
	| DeleteTodoAction
	| LoadTodoItemsAction
	| SetSortTodoAction
	| EditTodoAction
	| DeleteAllTodosAction
	| SetSearchQueryAction

const initialState: TodoState = {
	todos: [],
	totalTodos: Number(localStorage.getItem('totalTodos')) || 0,
	sortFilter: 'all',
	searchQuery: ''
}

export const todoItemsReducer = (state = initialState, action: TodoAction) => {
	switch (action.type) {
		case ADD_TODO_ITEM: {
			const newTotalTodos = state.totalTodos + 1
			return {
				...state,
				todos: [...state.todos, action.payload],
				totalTodos: newTotalTodos,
			}
		}
		case TODO_ITEM_COMPLETED: {
			const updateTodoCompletion = state.todos.map((todoItem: TodoItem) => {
				if (todoItem.id === action.payload.todoItemId) {
					return { ...todoItem, isCompleted: !todoItem.isCompleted }
				}
				return todoItem
			})

			return {
				...state,
				todos: updateTodoCompletion,
			}
		}
		case DELETE_TODO_ITEM: {
			const filteredTodosAfterDeleteOne = state.todos.filter(
				(item: TodoItem) => item.id !== action.payload.todoItemId
			)

			return {
				...state,
				todos: filteredTodosAfterDeleteOne,
			}
		}
		case LOAD_TODO_ITEMS: {
			return {
				...state,
				todos: action.payload,
			}
		}
		case DELETE_ALL_TODO_ITEMS: {
			return { ...state, todos: [], }
		}
		case SET_SORT_TODO:
			return { ...state, sortFilter: action.payload }
		case EDIT_TODO_ITEM: {
			const editTodoItemName = state.todos.map((item) => {
				if (item.id === action.payload.todoItemId) {
					return {
						...item,
						text: action.payload.newTodoText,
					}
				}
				return item
			})

			return {
				...state,
				todos: editTodoItemName,
			}
		}
		case SET_SEARCH_QUERY: {
			return { ...state, searchQuery: action.payload }
		}
		default: {
			return state
		}
	}
}