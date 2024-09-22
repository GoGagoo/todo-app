import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CancelIcon, CheckmarkIcon, PencilIcon, TrashIcon } from '../../icons'
import {
	completeTodoItem,
	deleteTodoItem,
	editTodoItem,
} from '../../store/actions'
import { Checkbox } from '../../uikit'
import styles from './TodoItem.module.scss'

interface TodoItemProps {
	id: number
	text: string
	isCompleted: boolean
}

enum TodoErrMsg {
	SHORT_TODO_ITEM_NAME = 'Название задачи должно быть не менее 3 символов',
}

export const TodoItem: React.FC<TodoItemProps> = ({
	text,
	id,
	isCompleted,
}) => {
	const dispatch = useDispatch()

	const [isCompletedTodo, setIsCompletedTodo] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [newTodoText, setNewTodoText] = useState(text)
	const [error, setError] = useState('')
	const [isTextChanged, setIsTextChanged] = useState(false)

	const handleEditClick = () => {
		setIsEditing(true)
		setError('')
	}

	const handleSaveNewTodoText = () => {
		if (newTodoText.length <= 2) {
			setError(TodoErrMsg.SHORT_TODO_ITEM_NAME)
		} else {
			dispatch(editTodoItem(id, newTodoText))
			setIsEditing(false)
			setError('')
		}
	}

	const handleCheckboxChange = () => {
		setIsCompletedTodo(!isCompletedTodo)
		dispatch(completeTodoItem(id))
	}

	const handleDelete = () => {
		dispatch(deleteTodoItem(id))
	}

	const handleChangeTodoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoText(e.target.value)
		setIsTextChanged(e.target.value !== text)
	}

	const handleKeyboardChangeTodoItemName = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			setIsEditing(false)
		} else if (e.key === 'Enter') {
			handleSaveNewTodoText()
		}
	}

	const handleKeyboardApplyChange = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleEditClick()
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.todo_item}>
				<div className={styles.left_content}>
					<Checkbox
						checked={isCompleted}
						onChange={handleCheckboxChange}
						disabled={isEditing}
					/>
					{isEditing ? (
						<div className={styles.edit_container}>
							<input
								type='text'
								value={newTodoText}
								onChange={handleChangeTodoTitle}
								className={styles.edit_input}
								autoFocus
								onKeyDown={handleKeyboardChangeTodoItemName}
							/>
							{error && <div className={styles.error_message}>{error}</div>}
						</div>
					) : (
						<div
							className={`${styles.todo_title} ${isCompleted ? styles.checked : ''}`}
							style={{ marginLeft: '17px' }}
						>
							{text}
						</div>
					)}
				</div>
				<div className={styles.button_container}>
					{!isEditing && (
						<div>
							<button
								onClick={handleEditClick}
								className={styles.btn}
								onKeyDown={handleKeyboardApplyChange}
							>
								<PencilIcon className={styles.pencil_icon} />
							</button>
							<button onClick={handleDelete} className={styles.btn}>
								<TrashIcon className={styles.trash_icon} />
							</button>
						</div>
					)}

					{isEditing && (
						<div>
							<button
								disabled={!isTextChanged}
								onClick={handleSaveNewTodoText}
								className={styles.btn}
							>
								<CheckmarkIcon
									className={`${styles.sve_icon} ${!isTextChanged ? styles.disabled : ''}`}
								/>
							</button>
							<button onClick={handleEditClick} className={styles.btn}>
								<CancelIcon className={styles.cnl_icon} />
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
