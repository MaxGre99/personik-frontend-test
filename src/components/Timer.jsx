import React from 'react';

const Timer = ({ timeLeft = 0, color = 'black' }) => {
	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;
	return (
		<h1
			className={color !== 'black' ? 'text-3xl' : 'text-lg'}
			style={{ color }}>
			{`0${minutes}`}:{seconds < 10 ? `0${seconds}` : seconds}
		</h1>
	);
};

export default Timer;
