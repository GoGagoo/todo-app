import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { loadTodoItems } from '../../store/actions'
import { TodoItem as TodoItemType } from '../../store/store'
import { NotFound } from '../NotFound/NotFound'
import { TodoItem } from '../TodoItem/TodoItem'
import styles from './TodoList.module.scss'

interface Props {
	todos: TodoItemType[]
}

export const TodoList: React.FC<Props> = ({ todos }) => {
	const dispatch = useDispatch()
	const sortFilter = useSelector((state: any) => state.todos.sortFilter)
	const todoItems = useTypedSelector((state) => state.todos.todos)

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

	useEffect(() => {
		const savedTodos = JSON.parse(localStorage.getItem('todoItems') || '[]')
		dispatch(loadTodoItems(savedTodos))
		setIsLoadedTodos(true)
	}, [dispatch])

	return (
		<>
			{!!todos.length ? (
				!!todos.length ? (
					todos.map((item: TodoItemType) => (
						<TodoItem key={item.id} {...item} />
					))
				) : sortFilter === 'complete' ? (
					<div className={styles.sort_incmpl_txt}>
						Не все задачи у вас выполнены.
					</div>
				) : sortFilter === 'incomplete' ? (
					<div className={styles.sort_cmpl_txt}>Нет невыполненных задач.</div>
				) : (
					<NotFound />
				)
			) : (
				<NotFound />
			)}
		</>
	)
}
