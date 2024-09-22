import React, { useState } from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { useEscape } from '../../hooks/useEscape'
import CrossIcon from '../../icons/cross.svg'
import { addTodoItem } from '../../store/actions'
import { Modal } from '../../uikit'
import styles from './AddTaskBtn.module.scss'

interface Props {
	className?: string
	isDeleteWarning?: boolean
	onTaskAdded?: () => void
}

interface Props {
	onTaskAdded?: () => void
}

export const AddTaskBtn: React.FC<Props> = ({ onTaskAdded }) => {
	const dispatch = useDispatch()

	const [isOpen, setIsOpen] = useState(false)
	const [text, setText] = useState('')
	const [error, setError] = useState(false)

	const shortEditTodoItemName = text.length > 2

	const handleSubmit = () => {
		if (text.trim() && shortEditTodoItemName) {
			dispatch(addTodoItem(text))
			onTaskAdded && onTaskAdded()
			localStorage.setItem('totalTodos', (Number(localStorage.getItem('totalTodos')) + 1).toString())
			setText('')
			setIsOpen(false)
		} else {
			setError(true)
		}
	}

	const handleOpenModal = () => {
		setIsOpen(true)
	}

	const handleCloseModal = () => {
		setIsOpen(false)
	}

	useEscape(handleCloseModal)

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value)
		setError(false)
	}

	const handleKeyEnter = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') handleSubmit()
	}

	return (
		<div className={styles.container}>
			<button
				onClick={handleOpenModal}
				className={classNames(styles.button, styles.right)}
			>
				<CrossIcon className={styles.icon} />
			</button>
			{isOpen && (
				<Modal isVisible={isOpen} onClose={handleCloseModal}>
					<div onKeyDown={handleKeyEnter}>
						<p className={styles.title}>NEW NOTE</p>
						<input
							type='text'
							autoFocus
							className={styles.input}
							placeholder='Input your note...'
							value={text}
							onChange={onInputChange}
						/>
						{error && (
							<p className={styles.err_msg}>
								Длина названия задачи должна быть более 3 символов
							</p>
						)}
						<div className={styles.bottom_buttons}>
							<button onClick={handleCloseModal} className={styles.close_btn}>
								Cancel
							</button>
							<button onClick={handleSubmit} className={styles.add_btn}>
								Apply
							</button>
						</div>
					</div>
				</Modal>
			)}
		</div>
	)
}
