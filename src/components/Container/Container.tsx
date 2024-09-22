import React from 'react'
import styles from './Container.module.scss'

export const Container = ({ children }: { children: React.ReactNode }) => (
	<div className={styles.container}>{children}</div>
)

