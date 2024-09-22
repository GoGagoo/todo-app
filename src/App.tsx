import React from 'react'
import {
	Container,
	TodoListContainer,
	TodosBottom,
	TodosControlPanel,
	TodoTitle,
} from './components'

const App: React.FC = () => (
	<>
		<Container>
			<TodoTitle />
			<TodosControlPanel />

			<TodoListContainer />
		</Container>
		<TodosBottom />
	</>
)

export default App
