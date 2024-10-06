import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { TODOS_LOCAL_STORAGE_KEY } from '../../constants/todos'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { loadTodoItems } from '../../store/actions'
import { TodoItem as TodoItemType } from '../../store/store'
import { Spinner } from '../../uikit/Spinner/Spinner'
import { NotFound } from '../NotFound/NotFound'
import { TodoList } from '../TodoList/TodoList'
import styles from './TodoListContainer.module.scss'

export enum SortTodosFilter {
	ALL = 'all',
	COMPLETE = 'complete',
	INCOMPLETE = 'incomplete',
}

export const TodoListContainer = () => {
	const dispatch = useDispatch()
	const todoItems = useTypedSelector((state) => state.todos.todos)
	const sortFilter: SortTodosFilter = useTypedSelector((state) => state.todos.sortFilter) as SortTodosFilter
	const searchTodosQuery = useTypedSelector((state) => state.todos.searchQuery)

	const [isLoadedTodos, setIsLoadedTodos] = useState(false)

	const { sortedTodos, filteredTodos } = useMemo(() => {
		const sorted = todoItems.filter((todoItem) => {
			switch (sortFilter) {
				case SortTodosFilter.ALL:
					return true
				case SortTodosFilter.COMPLETE:
					return todoItem.isCompleted
				case SortTodosFilter.INCOMPLETE:
					return !todoItem.isCompleted
				default:
					return true
			}
		})
	
		const filtered = sorted.filter((todoItem: TodoItemType) =>
			todoItem.text.toLowerCase().includes(searchTodosQuery.toLowerCase())
		)
	
		return { sortedTodos: sorted, filteredTodos: filtered }
	}, [todoItems, sortFilter, searchTodosQuery])

	useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem(TODOS_LOCAL_STORAGE_KEY) || '[]')
    dispatch(loadTodoItems(savedTodos))
    setIsLoadedTodos(true)
  }, [dispatch])

  useEffect(() => {
    if (isLoadedTodos) {
      localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(todoItems))
    }
  }, [todoItems, isLoadedTodos])

	return (
		<div className={styles.todo_container}>
			{isLoadedTodos ? (
				!!todoItems.length ? (
					<TodoList sortTodos={sortFilter} todos={filteredTodos} />
				) : (
					<NotFound />
				)
			) : (
				<Spinner width='525px' height='150px' size='large' color='gradient' />
			)}
		</div>
	)
}
