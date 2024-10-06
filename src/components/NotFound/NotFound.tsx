import React from 'react'
import styles from './NotFound.module.scss'
import { NotFoundImage } from './NotFoundImage/NotFoundImage'

export const NotFound = () => (
	<div className={styles.container}>
		<NotFoundImage />
		<p className={styles.empty}>There are no tasks at this time. Create a new task by clicking on the cross in the bottom right corner.</p>
	</div>
)
