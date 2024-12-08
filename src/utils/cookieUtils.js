export function getCookie(name) {
	const matches = document.cookie.match(
		new RegExp(
			'(?:^|; )' +
				// eslint-disable-next-line no-useless-escape
				name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
				'=([^;]*)',
		),
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, props) {
	props = {
		path: '/',
		...props,
	};

	let exp = props.expires;
	if (exp && typeof exp === 'number') {
		const d = new Date();
		d.setTime(d.getTime() + exp * 1000);
		exp = props.expires = d;
	}

	if (exp && exp instanceof Date) {
		props.expires = exp.toUTCString();
	}
	value = encodeURIComponent(value);
	let updatedCookie = name + '=' + value;
	for (const propName in props) {
		updatedCookie += '; ' + propName;
		const propValue = props[propName];
		if (propValue !== true) {
			updatedCookie += '=' + propValue;
		}
	}
	document.cookie = updatedCookie;
}

export function deleteCookie(name) {
	setCookie(name, '', { expires: -1 });
}
