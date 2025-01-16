import { Middleware, MiddlewareAPI } from 'redux';
import { IWSActions, RootState } from '../utils/types';
import { TWSActions, TWSAuthActions } from '../services/actions/socket-action';
import { Dispatch } from 'redux';

export const socketMiddleware = (wsUrl: string, wsActions: IWSActions): Middleware => {
	return (store: MiddlewareAPI<Dispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return (next) => (action: TWSActions | TWSAuthActions) => {
			const { dispatch } = store;
			const { type, payload } = action;
			const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

			if (type === wsInit) {
				socket = new WebSocket(`${wsUrl}${payload}`);
			}

			if (socket) {
				socket.onopen = (event) => {
					dispatch({ type: onOpen, payload: event });
				};

				socket.onerror = (event) => {
					dispatch({ type: onError, payload: event });
				};

				socket.onmessage = (event) => {
					const { data } = event;
					const parsedJsonData = JSON.parse(data);
					const { success, ...restparsedJsonData } = parsedJsonData;

					if (success) {
						dispatch({ type: onMessage, payload: restparsedJsonData });
					} else {
						console.error('Ошибка:', parsedJsonData.message);
						if (parsedJsonData.message === 'Invalid or missing token') {
							dispatch({ type: 'TOKEN_INVALID' });
						}
					}
				};

				socket.onclose = (event) => {
					dispatch({ type: onClose, payload: event });
					socket = null;
				};
			}

			next(action);
		};
	};
};
