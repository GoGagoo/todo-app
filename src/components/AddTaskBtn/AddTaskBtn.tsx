import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { TODOS_LOCAL_STORAGE_TOTAL_TODOS } from '../../constants/todos'
import useClickOutside from '../../hooks/useClickOutside'
import { useKeyStroke } from '../../hooks/useKeyStroke'
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
	const [todoText, setTodoText] = useState('')
	const [error, setError] = useState(false)

	const isTooShortTodoText = todoText.length > 2

	const handleSubmit = () => {
		if (todoText.trim() && isTooShortTodoText) {
			dispatch(addTodoItem(todoText))
			onTaskAdded && onTaskAdded()
			localStorage.setItem(
				TODOS_LOCAL_STORAGE_TOTAL_TODOS,
				(
					Number(localStorage.getItem(TODOS_LOCAL_STORAGE_TOTAL_TODOS)) + 1
				).toString()
			)
			setTodoText('')
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

	useKeyStroke('Escape', (e: KeyboardEvent) => {
		handleCloseModal()
	})

	useKeyStroke('Enter', (e: KeyboardEvent) => {
		handleSubmit()
	})

	const modalRef = useRef<HTMLDivElement>(null)

	useClickOutside(modalRef, handleCloseModal)

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTodoText(e.target.value)
		setError(false)
	}

	const isTooShortTodoErrorMessage =
		'Длина названия задачи должна быть более 3 символов'

	return (
		<div className={styles.container}>
			<button
				onClick={handleOpenModal}
				className={classNames(styles.button, styles.right)}
			>
				<CrossIcon className={styles.icon} />
			</button>
			{isOpen && (
				<Modal
					errorMsg={isTooShortTodoErrorMessage}
					hasError={error}
					isVisible={isOpen}
					onClose={handleCloseModal}
				>
					<div ref={modalRef}>
						<p className={styles.title}>NEW NOTE</p>
						<input
							type='text'
							autoFocus
							className={styles.input}
							placeholder='Input your note...'
							value={todoText}
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
