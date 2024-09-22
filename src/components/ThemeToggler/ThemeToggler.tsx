import React from 'react'
import { useTheme } from '../../contexts/ThemeProvider'
import DarkThemeIcon from '../../icons/dark-theme.svg'
import LightThemeIcon from '../../icons/light-theme.svg'
import styles from './ThemeToggler.module.scss'

export const ThemeToggler = () => {
	const { theme, toggleThemeMode } = useTheme()

	return (
		<div className={styles.container}>
			<button onClick={toggleThemeMode} className={styles.button}>
				{theme === 'light' ? (
					<DarkThemeIcon className={styles.icon} />
				) : (
					<LightThemeIcon className={styles.icon} />
				)}
			</button>
		</div>
	)
}
