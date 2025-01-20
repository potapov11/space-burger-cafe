import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		supportFile: false, // Отключение файла поддержки
		setupNodeEvents(on, config) {
			// Реализуйте обработчики событий здесь
		},
	},
});
