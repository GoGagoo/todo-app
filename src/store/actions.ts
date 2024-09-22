import { TodoItem } from './store'

export const ADD_TODO_ITEM = 'ADD_TODO_ITEM'
export const TODO_ITEM_COMPLETED = 'TODO_ITEM_COMPLETED'
export const DELETE_TODO_ITEM = 'DELETE_TODO_ITEM'
export const DELETE_ALL_TODO_ITEMS = 'DELETE_ALL_TODO_ITEMS'
export const EDIT_TODO_ITEM = 'EDIT_TODO_ITEM'
export const SET_SORT_TODO = 'SET_SORT_TODO'
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'
export const LOAD_TODO_ITEMS = 'LOAD_TODO_ITEMS'

export const addTodoItem = (text: string) => {
	return {
		type: 'ADD_TODO_ITEM',
		payload: { id: Date.now(), text },
	}
}

export const completeTodoItem = (todoItemId: number) => {
	return {
		type: 'TODO_ITEM_COMPLETED',
		payload: { todoItemId },
	}
}

export const deleteTodoItem = (todoItemId: number) => {
	return {
		type: 'DELETE_TODO_ITEM',
		payload: { todoItemId },
	}
}

export const deleteAllTodoItems = () => {
	return {
		type: 'DELETE_ALL_TODO_ITEMS',
	}
}

export const editTodoItem = (todoItemId: number, newTodoText: string) => {
	return {
		type: 'EDIT_TODO_ITEM',
		payload: {
			todoItemId,
			newTodoText,
		},
	}
}

export const setSortTodo = (sortFilter: string) => {
	return {
		type: 'SET_SORT_TODO',
		payload: sortFilter,
	}
}

export const setSearchQuery = (query: string) => {
	return {
		type: 'SET_SEARCH_QUERY',
		payload: query,
	}
}

export const loadTodoItems = (todoItem: TodoItem[]) => {
	return {
		type: LOAD_TODO_ITEMS,
		payload: todoItem,
	}
}
