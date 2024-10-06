import classNames from 'classnames'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { SearchIcon } from '../../../icons'
import { setSearchQuery } from '../../../store/actions'
import { Input } from '../../../uikit'
import styles from './SearchTodosInput.module.scss'

export const SearchTodosInput = () => {
	const dispatch = useDispatch()
	const todoItems = useTypedSelector((state) => state.todos.todos)

	const [searchTodosInputValue, setSearchTodosInputValue] = useState('')

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
				className={classNames(styles.icon, {
					[styles.disabledIcon]: !todoItems.length,
				})}
			/>
		</div>
	)
}
