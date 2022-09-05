import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Gravity from './Gravity/Gravity';

const App = () => {
	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route path='*' element={<Gravity />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
