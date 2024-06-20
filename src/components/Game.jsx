import { useEffect, useState } from 'react';
import '../styles/index.css';
import Timer from './Timer.jsx';

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

const Game = ({ setVictory, setGameOn, usedCitites, setUsedCitites }) => {
	const [yourTurn, setYourTurn] = useState(true);
	const [timeLeft, setTimeLeft] = useState(120);
	const [cities, setCitites] = useState([]);

	useEffect(() => {
		const fetchCitites = async () => {
			try {
				const response = await fetch('./cities.txt');
				const text = await response.text();
				const citiesArray = text.split('\n').map((city) => city.trim());
				setCitites(citiesArray);
			} catch (err) {
				console.error('Cities fetching failed:', err);
			}
		};

		fetchCitites();
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prevTime) => {
				if (prevTime > 0) {
					return prevTime - 1;
				} else if (prevTime === 0 && yourTurn === true) {
					setGameOn(false);
					setVictory(false);
				} else if (prevTime === 0 && yourTurn === false) {
					setGameOn(false);
					setVictory(true);
				}
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [yourTurn]);

	return (
		<div className='w-576 h-464 border border-inherit shadow bg-white rounded-2xl'>
			<div className='flex items-center justify-between px-5 h-64'>
				{yourTurn ? (
					<h1>Сейчас ваша очередь</h1>
				) : (
					<h1>Сейчас очередь соперника</h1>
				)}
				<Timer timeLeft={timeLeft} />
			</div>
			<TimerLine timeLeft={timeLeft} />
			<div className='h-320 flex items-center justify-center'>
				<span className='text-gray-400'>
					Первый участник вспоминает города...
				</span>
			</div>
			<div>
				<form>
					<div className='relative flex items-center'>
						<input
							type='text'
							placeholder='Напишите любой город, например, где вы живёте?'
							className='w-full h-48 mx-5 px-3 border-inherit rounded-md bg-messageBoxColor'
						/>
						<button
							type='submit'
							className='absolute right-7 top-1/2 transform -translate-y-1/2 bg-mainColor text-white border-inherit rounded-md'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke-width='1.5'
								stroke='currentColor'
								class='size-8'>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									d='M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5'
								/>
							</svg>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Game;
