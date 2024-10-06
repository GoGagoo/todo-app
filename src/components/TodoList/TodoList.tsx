import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TODOS_LOCAL_STORAGE_KEY } from '../../constants/todos'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { loadTodoItems } from '../../store/actions'
import { TodoItem as TodoItemType } from '../../store/store'
import { NotFound } from '../NotFound/NotFound'
import { TodoItem } from '../TodoItem/TodoItem'
import { SortTodosFilter } from '../TodoListContainer/TodoListContainer'
import styles from './TodoList.module.scss'

interface Props {
	todos: TodoItemType[]
	sortTodos: SortTodosFilter
}

export const TodoList: React.FC<Props> = ({ todos, sortTodos }) => {
	const dispatch = useDispatch()
	const sortFilter = useSelector((state: any) => state.todos.sortFilter)
	const todoItems = useTypedSelector((state) => state.todos.todos)

	return (
		<>
			{todos.length === 0 ? (
				sortTodos === SortTodosFilter.COMPLETE ? (
					<div className={styles.sort_incmpl_txt}>
						Не все задачи у вас выполнены.
					</div>
				) : sortTodos === SortTodosFilter.INCOMPLETE ? (
					<div className={styles.sort_cmpl_txt}>Нет невыполненных задач.</div>
				) : (
					<NotFound />
				)
			) : (
				todos.map((item) => <TodoItem key={item.id} {...item} />)
			)}
		</>
	)
}
