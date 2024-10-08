import React, { useEffect, useState } from 'react'
import styles from './Input.module.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	type: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	disabled: boolean
	placeholder: string
	value: string
	className?: string
}

export const Input: React.FC<Props> = ({ type, onChange, disabled, placeholder, value }) => {
	const [innerValue, setInnerValue] = useState(value || '')

	useEffect(()=>{
		setInnerValue(value || "")
	}, [value])

	return (
		<div className={styles.container}>
			<input
				value={innerValue}
				placeholder={placeholder}
				type={type}
				disabled={disabled}
				onChange={onChange}
				className={styles.input}
			/>
		</div>
	)
}
