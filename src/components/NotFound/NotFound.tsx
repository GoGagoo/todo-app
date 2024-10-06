import React from 'react'
import styles from './NotFound.module.scss'
import NotFoundImage from './NotFoundImage/NotFoundImage'

export const NotFound = () => (
	<>
		<NotFoundImage />
		<p className={styles.empty}>Empty...</p>
	</>
)
