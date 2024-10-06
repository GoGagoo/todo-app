import React, { useRef } from 'react'
import useOutClick from '../../hooks/useOutClick'
import styles from './Modal.module.scss'

interface ModalProps {
	children: React.ReactNode
	isVisible?: boolean
	hasError?: boolean
	errorMsg?: string
	onClose: () => void
	onConfirm?: () => void
}

export const Modal: React.FC<ModalProps> = (
	{ children }: { children: React.ReactNode },
	{ onClose, onConfirm, isVisible, hasError, errorMsg }
) => {
	const modalRef = useRef<HTMLDivElement>(null)

	useOutClick(modalRef, onClose)

	if (isVisible) return null

	return (
		<div
			className={styles.modal}
			onChange={onConfirm}
			onClick={onClose}
			ref={modalRef}
		>
			<div className={styles.modalContent}>
				{children}
				{hasError && (
							<p className={styles.err_msg}>
								{errorMsg}
							</p>
						)
				}
			</div>
		</div>
	)
}
