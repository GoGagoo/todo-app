import React from 'react'
import styles from './Select.module.scss'

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
	children: React.ReactNode
	disabled: boolean
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
	defaultValue: string
}

export const Select: React.FC<Props> = ({
	disabled,
	onChange,
	defaultValue,
	children,
}) => (
	<select
		disabled={disabled}
		className={styles.select}
		onChange={onChange}
		defaultValue={defaultValue}
	>
		{children}
	</select>
)
