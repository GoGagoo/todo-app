import React from 'react'
import styles from './Switch.module.scss'
import { Spinner } from '../Spinner/Spinner'

interface Props {
	onChange: () => void
	checked: boolean
	disabled: boolean
}

export const Switch: React.FC<Props> = ({ onChange, checked, disabled }) => {
	return (
		<label className={styles.switch}>
			<input
				type='checkbox'
				onChange={onChange}
				checked={checked}
				disabled={disabled}
			/>
			<span className={styles.sliderContainer}>
				<span
					className={`${styles.slider} ${checked ? styles.green : styles.red}`}
				>
					{disabled}
				</span>
			</span>
		</label>
	)
}
