import React from 'react'
import NotFoundImage from '../../../public/not-found.png'
import styles from './NotFound.module.scss'

export const NotFound = () => (
	<>
		<img src={NotFoundImage} alt='' />
		<p className={styles.empty}>Empty...</p>
	</>
)

