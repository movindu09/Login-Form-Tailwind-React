import formsPlugin from '@tailwindcss/forms';

export default {
	content: ['./index.html', './src/**/*.{js,jsx}'],
	theme: {
		extend: {},
	},
	plugins: [formsPlugin],
};
