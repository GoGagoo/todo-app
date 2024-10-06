import classNames from 'classnames'
import React, { CSSProperties } from 'react'
import styles from './Spinner.module.scss'

type Props = {
	size?: 'small' | 'large'
	width?: CSSProperties['width']
	height?: CSSProperties['height']
	color?: 'black' | 'gradient'
	children?: React.ReactNode
	spinning?: boolean
}

export const Spinner: React.FC<Props> = ({
	children,
	size = 'large',
	color = 'gradient',
	width,
	height,
	spinning = true,
}) => {	
	const spinnerSize = classNames({
		[styles.small]: size === 'small',
		[styles.large]: size === 'large',
	})

	const spinnerColor = classNames({
		[styles.black]: color === 'black',
		[styles.gradient]: color === 'gradient',
	})
	
	const spinnerSpinning = classNames(
		{[styles.hidden]: !spinning }
	)

	const spinnerClass = classNames(
		styles.spinner,
		spinnerSize,
		spinnerColor,
		width,
		height,
		spinnerSpinning
)

	return <div style={{ width, height }} className={spinnerClass}>{children}</div>
}
