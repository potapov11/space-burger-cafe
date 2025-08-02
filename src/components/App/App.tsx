import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '../../hooks/useDispatch';
import Modal from '../Modal/Modal';
import AppHeader from '../AppHeader/AppHeader';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderInfo from '../OrderModal/OrderModal';
import { fetchUserData, fetchServerData } from '../../services/actions/data-action';
import { OnlyAuth, OnlyUnAuth } from '../ProtectedRoute/ProtectedRoute';

const HomePage = React.lazy(() => import('../../pages/Home/Home'));
const LoginPage = React.lazy(() => import('../../pages/Login/Login'));
const RegisterPage = React.lazy(() => import('../../pages/Register/Register'));
const ForgotPassword = React.lazy(() => import('../../pages/ForgotPassword/ForgotPassword'));
const ResetPassword = React.lazy(() => import('../../pages/ResetPassword/ResetPassword'));
const ProfilePage = React.lazy(() => import('../../pages/Profile/ProfilePage'));
const Feed = React.lazy(() => import('../../pages/Feed/Feed'));
const ProfileOrders = React.lazy(() => import('../../pages/ProfileOrders/ProfileOrders'));

const App = (): React.JSX.Element => {
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;

	const dispatch = useDispatch();
	const [isModalOrderOpen, setModalOrderOpen] = React.useState<boolean>(false);

	useEffect(() => {
		dispatch(fetchUserData());
		dispatch(fetchServerData());
	}, [dispatch]);

	const closeModal = () => {
		navigate(-1);
		setModalOrderOpen(false);
	};

	return (
		<>
			<AppHeader />
			<Suspense fallback={<div>Загрузка...</div>}>
				<Routes location={background || location}>
					<Route path="/" element={<HomePage onClose={closeModal} isModalOrderOpen={isModalOrderOpen} setModalOrderOpen={setModalOrderOpen} />} />
					<Route path="/feed" element={<Feed />} />
					<Route path="/feed/:orderId" element={<OrderInfo styleCenter={true} />} />
					<Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
					<Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
					<Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
					<Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
					<Route path="/profile/orders" element={<OnlyAuth component={<ProfileOrders />} />} />
					<Route path="/profile/orders/:orderId" element={<OnlyAuth component={<OrderInfo styleCenter={true} />} />} />
					<Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
					<Route path="/ingredients/:id" element={<IngredientDetails styleCenter={true} />} />
				</Routes>

				{background && (
					<Routes>
						<Route
							path="/ingredients/:id"
							element={
								<Modal onClose={closeModal}>
									<IngredientDetails />
								</Modal>
							}
						/>
						<Route
							path="/profile/orders/:orderId"
							element={
								<OnlyAuth
									component={
										<Modal onClose={closeModal}>
											<OrderInfo />
										</Modal>
									}
								/>
							}
						/>
						<Route
							path="/feed/:orderId"
							element={
								<Modal onClose={closeModal}>
									<OrderInfo styleCenter={false} />
								</Modal>
							}
						/>
					</Routes>
				)}
			</Suspense>
		</>
	);
};

export default App;
