import { useState } from 'react';
import './App.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from './components/AppHeader/AppHeader';
import MainBox from './components/MainBox/MainBox';

function App() {
	return (
		<>
			<AppHeader />
			<MainBox />
		</>
	);
}

export default App;
