import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TODOS_LOCAL_STORAGE_SORTED_TODOS } from '../../constants/todos'
import { setSortTodo } from '../../store/actions'
import { Select } from '../../uikit'
import styles from './SortSelect.module.scss'

const options = [
	{ value: 'all', label: 'All' },
	{ value: 'complete', label: 'Complete' },
	{ value: 'incomplete', label: 'Incomplete' },
]

export const SortSelect = () => {
	const dispatch = useDispatch()
	const todoItems = useSelector((state: any) => state.todos.todos)

	const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value
		dispatch(setSortTodo(value))
		localStorage.setItem(TODOS_LOCAL_STORAGE_SORTED_TODOS, value)
	}

	useEffect(() => {
		const savedSortFilter =
			localStorage.getItem(TODOS_LOCAL_STORAGE_SORTED_TODOS) || 'all'
		dispatch(setSortTodo(savedSortFilter))
	}, [dispatch])

	return (
		<Select
			disabled={!todoItems.length}
			onChange={handleSort}
			defaultValue={
				localStorage.getItem(TODOS_LOCAL_STORAGE_SORTED_TODOS) || 'all'
			}
		>
			{options.map((option) => (
        <option className={styles.option} key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
		</Select>
	)
}
