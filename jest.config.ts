// export default {
// 	testEnvironment: 'jest-environment-jsdom',
// 	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
// 	moduleNameMapper: {
// 		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
// 		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
// 		'^@/(.*)$': '<rootDir>/src/$1',
// 	},
// 	globals: {
// 		fetch: global.fetch,
// 	},
// };

// export default {
// 	preset: 'ts-jest', // Используем ts-jest для поддержки TypeScript
// 	testEnvironment: 'jest-environment-jsdom',
// 	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
// 	moduleNameMapper: {
// 		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
// 		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
// 		'^@/(.*)$': '<rootDir>/src/$1',
// 	},
// 	globals: {
// 		'ts-jest': {
// 			tsconfig: 'tsconfig.json', // Укажите путь к вашему tsconfig.json
// 		},
// 		fetch: global.fetch,
// 	},
// 	transform: {
// 		'^.+\\.tsx?$': 'ts-jest', // Преобразование файлов TypeScript
// 	},
// 	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Поддерживаемые расширения файлов
// };

export default {
	preset: 'ts-jest', // Используем ts-jest для поддержки TypeScript
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleNameMapper: {
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json', // Укажите путь к вашему tsconfig.json
			useESM: true, // Включите поддержку ESM
		},
		fetch: global.fetch,
	},
	transform: {
		'^.+\\.tsx?$': 'ts-jest', // Преобразование файлов TypeScript
		'^.+\\.jsx?$': 'babel-jest', // Преобразование файлов JavaScript (если необходимо)
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Поддерживаемые расширения файлов
	extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'], // Обработка файлов как ESM
};
