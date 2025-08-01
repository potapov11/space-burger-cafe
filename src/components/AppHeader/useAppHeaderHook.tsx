import { MouseEventHandler } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useNavigateHeader = (): [string, MouseEventHandler<HTMLParagraphElement>] => {
	const navigate = useNavigate();
	const location = useLocation();

	const isActiveProfile = location.pathname;

	const onClickNavigate: MouseEventHandler<HTMLParagraphElement> = (e: React.MouseEvent<HTMLParagraphElement>): void => {
		const resultTextContent = (e.target as HTMLParagraphElement).textContent?.trim();

		const routes: Record<string, string> = {
			'Лента заказов': '/feed',
			Конструктор: '/',
		};

		const targetRoute = routes[resultTextContent || ''] || '/profile';
		navigate(targetRoute);
	};

	return [isActiveProfile, onClickNavigate];
};
