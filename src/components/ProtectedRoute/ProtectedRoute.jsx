import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const Protected = ({ onlyUnAuth = false, component }) => {
	// isAuthChecked это флаг, показывающий что проверка токена произведена
	// при этом результат этой проверки не имеет значения, важно только,
	// что сам факт проверки имел место.
	const isAuthChecked = useSelector((store) => store.loginReducer.isAuthChecked);
	const user = useSelector((store) => store.loginReducer.name);

	console.log(isAuthChecked, '...isAuthChecked Protected...');
	console.log(user, '...user Protected...');
	console.log(onlyUnAuth, '...onlyUnAuth Protected...');

	// alert(user, 'user', isAuthChecked, 'isAuthChecked');

	const location = useLocation();

	if (!isAuthChecked) {
		console.log('Условие здесь !isAuthChecked');
		// Запрос еще выполняется
		// Выводим прелоадер в ПР
		// Здесь возвращается просто null для экономии времени
		return null;
	}

	if (onlyUnAuth && user) {
		console.log('Условие здесь onlyUnAuth && user');

		// Пользователь авторизован, но роут предназначен для неавторизованного пользователя
		// Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
		const { from } = location.state || { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	if (!onlyUnAuth && !user) {
		return <Navigate to="/login" state={{ from: location }} />;
	}

	// !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

	return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => <Protected onlyUnAuth={true} component={component} />;
