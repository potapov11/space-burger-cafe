import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import HomePage from '../../pages/Home/Home';
import LoginPage from '../../pages/Login/Login';
import RegisterPage from '../../pages/Register/Register';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import ProfilePage from '../../pages/Profile/ProfilePage';
import AppHeader from '../AppHeader/AppHeader';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { fetchUserData } from '../../services/actions/data-action';

console.log(fetchUserData, '...fetchUserdata');

function App() {
	const location = useLocation();
	const background = location.state && location.state.background;
	const dispatch = useDispatch();
	const storeIngredients = useSelector((store) => store);
	console.log(storeIngredients, '...storeIngredients...');

	useEffect(() => {
		dispatch(fetchUserData());
	}, []);

	return (
		<>
			<AppHeader />
			<Routes location={background || location}>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/reset-password" element={<ResetPassword />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/ingredients/:id" element={<IngredientDetails />} />
			</Routes>

			{background && (
				<Routes>
					<Route
						path="/ingredients/:id"
						element={
							<Modal>
								<IngredientDetails />
							</Modal>
						}
					/>
				</Routes>
			)}
		</>
	);
}

export default App;
