import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchIcon } from '../../../icons'
import { setSearchQuery } from '../../../store/actions'
import { Input } from '../../../uikit'
import styles from './SearchTodosInput.module.scss'

export const SearchTodosInput = () => {
	const todoItems = useSelector((state: any) => state.todos.todos)

	const [searchTodosInputValue, setSearchTodosInputValue] = useState('')
	const dispatch = useDispatch()

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setSearchTodosInputValue(value)
		dispatch(setSearchQuery(value))
	}

	return (
		<div className={styles.container}>
			<Input
				value={searchTodosInputValue}
				placeholder='Search note...'
				type='text'
				onChange={handleInputChange}
				disabled={!todoItems.length}
			/>
			<SearchIcon
				className={`${styles.icon} ${!todoItems.length ? styles.disabledIcon : ''}`}
			/>
		</div>
	)
}
