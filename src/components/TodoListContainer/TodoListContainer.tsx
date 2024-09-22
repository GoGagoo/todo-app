import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { TodoItem as TodoItemType } from '../../store/store'
import { Spinner } from '../../uikit/Spinner/Spinner'
import { NotFound } from '../NotFound/NotFound'
import { TodoList } from '../TodoList/TodoList'
import styles from './TodoListContainer.module.scss'
import { loadTodoItems } from '../../store/actions'

export const TodoListContainer = () => {
	const dispatch = useDispatch()
	const todoItems = useTypedSelector((state) => state.todos.todos)
	const sortFilter = useSelector((state: any) => state.todos.sortFilter)
	const searchQuery = useSelector((state: any) => state.todos.searchQuery)

	const [isLoadedTodos, setIsLoadedTodos] = useState(false)

	const sortedTodos = todoItems.filter((todoItem: TodoItemType) => {
		switch (sortFilter) {
			case 'all':
				return true
			case 'complete':
				return todoItem.isCompleted
			case 'incomplete':
				return !todoItem.isCompleted
			default:
				return true
		}
	})

	const filteredTodos = sortedTodos.filter((todoItem: TodoItemType) =>
		todoItem.text.toLowerCase().includes(searchQuery.toLowerCase())
	)

	useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todoItems') || '[]')
    dispatch(loadTodoItems(savedTodos))
    setIsLoadedTodos(true)
  }, [dispatch])

  useEffect(() => {
    if (isLoadedTodos) {
      localStorage.setItem('todoItems', JSON.stringify(todoItems))
    }
  }, [todoItems, isLoadedTodos])

	return (
		<div className={styles.todo_container}>
			{isLoadedTodos ? (
				!!todoItems.length ? (
					<TodoList todos={filteredTodos} />
				) : (
					<NotFound />
				)
			) : (
				<Spinner width='525px' height='150px' size='large' color='gradient' />
			)}
		</div>
	)
}
