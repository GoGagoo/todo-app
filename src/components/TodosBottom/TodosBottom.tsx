import React from 'react'

import { StatList } from '../StatList/StatList'
import { AddTaskBtn } from '../AddTaskBtn/AddTaskBtn'

import styles from './TodosBottom.module.scss'

export const TodosBottom = () => (
	<div className={styles.bottomContainer}>
		<StatList />
		<AddTaskBtn />
	</div>
)
