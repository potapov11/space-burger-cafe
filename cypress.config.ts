import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// Реализуйте обработчики событий здесь
		},
		baseUrl: 'http://localhost:5174/',
	},
});
