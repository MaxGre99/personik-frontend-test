/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./public/**/*.html', './src/**/*.{js,jsx}'],
	theme: {
		extend: {
			width: {
				35: '35vw',
				576: '576px',
				126: '126px',
				544: '544px',
				180: '180px',
				380: '380px',
			},
			height: {
				58: '58px',
				347: '347px',
				40: '40px',
				464: '464px',
				64: '64px',
				320: '320px',
				48: '48px',
				485: '485px',
			},
			colors: {
				bgColor: '#F3F4F6',
				startButton: '#7C3AED',
				mainColor: '#8B5CF6',
				messageBoxColor: '#F3F4F6',
			},
		},
	},
	plugins: [],
};
