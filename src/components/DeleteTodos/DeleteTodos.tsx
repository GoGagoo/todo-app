import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { deleteAllTodoItems } from '../../store/actions'
import { Modal, Spinner, Switch } from '../../uikit'
import styles from './DeleteTodos.module.scss'

interface Props {
	onClose?: () => void
}

export const DeleteTodos: React.FC<Props> = () => {
	const dispatch = useDispatch()
	const todoItems = useTypedSelector((state) => state.todos.todos)

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isCreatingTask, setIsCreatingTask] = useState(false)
	const [isLoadedTodos, setIsLoadedTodos] = useState(false)
	const [isSpinning, setIsSpinning] = useState(true)

	useEffect(() => {
		if (todoItems.length) {
			setIsLoadedTodos(true)
		}
		setIsSpinning(false)
	}, [todoItems])

	const handleDeleteAllTasks = () => {
		if (todoItems.length) {
			setIsCreatingTask(false)
			setIsModalOpen(true)
		} else {
			setIsCreatingTask(true)
			setIsModalOpen(true)
		}
	}

	const handleConfirmDelete = () => {
		dispatch(deleteAllTodoItems())
		setIsModalOpen(false)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setIsCreatingTask(false)
	}

	return (
		<Spinner
			width='100%'
			height='100%'
			size='small'
			color='black'
			spinning={isSpinning}
		>
			<Switch
				disabled={!isLoadedTodos}
				checked={!!todoItems.length}
				onChange={handleDeleteAllTasks}
			/>
			{isModalOpen && (
				<Modal isVisible={true} onClose={handleCloseModal}>
					<>
						<p className={styles.title}>
							Do you really want to delete all your tasks?
						</p>
						<div className={styles.bottom_buttons}>
							<button onClick={handleCloseModal} className={styles.close_btn}>
								Cancel
							</button>
							<button onClick={handleConfirmDelete} className={styles.add_btn}>
								Delete
							</button>
						</div>
					</>
				</Modal>
			)}
		</Spinner>
	)
}
