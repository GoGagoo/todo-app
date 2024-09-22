import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './StatList.module.scss'

export const StatList = () => {
	const totalTodosCount = useSelector((state: any) => state.todos.totalTodos)
	const todoItems = useSelector((state: any) => state.todos.todos)

	const [totalTodos, setTotalTodos] = useState(0)

	useEffect(() => {
		const storedTotalTodos = Number(localStorage.getItem('totalTodos')) || 0
		setTotalTodos(storedTotalTodos)
	}, [])

	const activeTodosCount = todoItems.filter((item: any) => !item.isCompleted).length
	const completedTodosCount = todoItems.filter(
		(item: any) => item.isCompleted
	).length

	if (!totalTodos && !todoItems.length) return null

	return (
		<div className={styles.container}>
			<div className={styles.statItem}>
				<span>Total number of tasks:</span>
				<span>{totalTodosCount}</span>
			</div>
			<div className={styles.statItem}>
				<span>Active tasks:</span>
				<span>{activeTodosCount}</span>
			</div>
			<div className={styles.statItem}>
				<span>Completed tasks:</span>
				<span>{completedTodosCount}</span>
			</div>
		</div>
	)
}