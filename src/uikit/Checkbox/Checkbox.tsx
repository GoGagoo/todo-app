import React, { useEffect, useState } from 'react'
import styles from './Checkbox.module.scss'

interface CheckboxProps {
	checked: boolean
	label?: string
	onChange: (checked: boolean) => void
	disabled: boolean
}

export const Checkbox: React.FC<CheckboxProps> = ({
	label,
	onChange,
	disabled,
	checked
}) => {
	const [isChecked, setIsChecked] = useState(checked || false)

	const handleChange = () => {
		onChange(!checked)
	}

	useEffect(()=>{
		setIsChecked(checked || false)
	}, [checked])

	return (
		<label className={styles.checkbox}>
			<input
				type='checkbox'
				checked={isChecked}
				onChange={handleChange}
				className={styles.checkbox__input}
				disabled={disabled}
			/>
			<span className={styles.checkmark}></span>
      {label && <span>{label}</span>}
		</label>
	)
}