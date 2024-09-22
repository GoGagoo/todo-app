import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSortTodo } from '../../store/actions'
import { Select } from '../../uikit'
import styles from './SortSelect.module.scss'

export const SortSelect = () => {
	const dispatch = useDispatch()
	const todoItems = useSelector((state: any) => state.todos.todos)

	const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value
		dispatch(setSortTodo(value))
		localStorage.setItem('sortFilter', value)
	}

	useEffect(() => {
		const savedSortFilter = localStorage.getItem('sortFilter') || 'all'
		dispatch(setSortTodo(savedSortFilter))
	}, [dispatch])

	return (
		<Select
			disabled={!todoItems.length}
			onChange={handleSort}
			defaultValue={localStorage.getItem('sortFilter') || 'all'}
		>
			<option className={styles.option} value='all'>
				All
			</option>
			<option className={styles.option} value='complete'>
				Complete
			</option>
			<option className={styles.option} value='incomplete'>
				Incomplete
			</option>
		</Select>
	)
}
