import React from 'react'
import { DeleteTodos } from '../DeleteTodos/DeleteTodos'
import { SearchTodosInput } from './SearchTodosInput/SearchTodosInput'
import { SortSelect } from '../SortSelect/SortSelect'
import { ThemeToggler } from '../ThemeToggler/ThemeToggler'

import styles from './TodosControlPanel.module.scss'

export const TodosControlPanel = () => (
		<div className={styles.panel}>
			<SearchTodosInput />
			<SortSelect />
			<ThemeToggler />
			<DeleteTodos />
		</div>
)
