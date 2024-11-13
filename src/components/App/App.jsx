import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/Home/Home';
import LoginPage from '../../pages/Login/Login';
import RegisterPage from '../../pages/Register/Register';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import AppHeader from '../AppHeader/AppHeader';

function App() {
	return (
		<Router>
			<AppHeader />
			<Routes>
				<Route path="/home" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/reg" element={<RegisterPage />} />
				<Route path="/forgot" element={<ForgotPassword />} />
				<Route path="/reset" element={<ResetPassword />} />
			</Routes>
		</Router>
	);
}

export default App;
