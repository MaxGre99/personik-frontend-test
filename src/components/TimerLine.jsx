import React from "react";
import '../styles/index.css';

const TimerLine = ({ timeLeft }) => {
	const duration = 120;
	const percentage = (timeLeft / duration) * 100;

	return (
		<div className='w-full h-1 bg-gray-100 rounded'>
			<div
				className='h-1 bg-violet-300 rounded'
				style={{ width: `${percentage}%` }}
			/>
		</div>
	);
};

export default TimerLine;