import { useEffect, useState, useRef } from 'react';
import '../styles/index.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Timer from './Timer.jsx';
import TimerLine from './TimerLine.jsx';

const opponenetTurn = async (cities, usedCities, lastCity) => {
	return new Promise((resolve) => {
		const randomDelay = Math.floor(Math.random() * 180) * 1000;
		setTimeout(() => {
			const lastChar = lastCity.at(-1);
			const secondLastChar = lastCity.at(-2);
			const requiredChar =
				lastChar === 'ь' || lastChar === 'ъ' ? secondLastChar : lastChar;

			const availableCities = cities.filter(
				(city) =>
					city[0].toLowerCase() === requiredChar.toLowerCase() &&
					!usedCities.includes(city)
			);

			const randomCity =
				availableCities[Math.floor(Math.random() * availableCities.length)];

			resolve(randomCity);
		}, randomDelay);
	});
};

const Game = ({ setVictory, setGameOn, usedCities, setUsedCities }) => {
	const [yourTurn, setYourTurn] = useState(true);
	const [timeLeft, setTimeLeft] = useState(120);
	const [cities, setCities] = useState([]);
	const messagesEndRef = useRef(null);
	const inputRef = useRef(null);

	const handleOpponentTurn = async () => {
		const lastCity = usedCities.at(-1);
		const opponentCity = await opponenetTurn(cities, usedCities, lastCity);
		if (opponentCity) {
			setUsedCities([...usedCities, opponentCity]);
			setYourTurn(true);
			setTimeLeft(120);
		} else {
			setGameOn(false);
			setVictory(true);
		}
	};

	const citySchema = yup.object().shape({
		city: yup
			.string()
			.required('Необходимо ввести название города')
			.test(
				'is-valid-city',
				'Такого города не существует, или просто нет в базе данных игры',
				(value) => cities.includes(value)
			)
			.test(
				'is-not-duplicate',
				'Такой город уже называли',
				(value) => !usedCities.includes(value)
			)
			.test(
				'is-correct-letter',
				'Город должен начинатся с последней буквы предыдущего города',
				(value) => {
					if (usedCities.length === 0) {
						return true;
					}
					const lastCity = usedCities.at(-1);
					const lastChar = lastCity.at(-1);
					const secondLastChar = lastCity.at(-2);
					const requiredChar =
						lastChar === 'ь' || lastChar === 'ъ' ? secondLastChar : lastChar;
					return value[0].toLowerCase() === requiredChar;
				}
			),
	});

	const formik = useFormik({
		initialValues: {
			city: '',
		},
		validationSchema: citySchema,
		onSubmit: (values, { resetForm }) => {
			setUsedCities([...usedCities, values.city]);
			resetForm();
			setYourTurn(!yourTurn);
			setTimeLeft(120);
		},
	});

	useEffect(() => {
		const fetchCities = async () => {
			try {
				const response = await fetch('./cities.txt');
				const text = await response.text();
				const citiesArray = text.split('\n').map((city) => city.trim());
				setCities(citiesArray);
			} catch (err) {
				console.error('Cities fetching failed:', err);
			}
		};

		fetchCities();
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
	});

	useEffect(() => {
		!yourTurn ? handleOpponentTurn() : inputRef.current.focus();
	}, [usedCities]);

	useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [usedCities]);

	return (
		<div className='w-full sm:w-2/3 md:w-1/2 lg:w-1/3 h-full sm:h-2/3 md:h-1/2 lg:1/3 text-base sm:text-lg md:text-xl lg:text-2xl border border-inherit shadow bg-white rounded-2xl'>
			<div className='flex items-center justify-between px-5 h-64'>
				{yourTurn ? (
					<h1>Сейчас ваша очередь</h1>
				) : (
					<h1>Сейчас очередь соперника</h1>
				)}
				<Timer timeLeft={timeLeft} />
			</div>
			<TimerLine timeLeft={timeLeft} />
			<div className='h-320 flex flex-col items-center justify-center mt-2 mb-1'>
				{usedCities.length === 0 ? (
					<span className='text-gray-400'>
						Первый участник вспоминает города...
					</span>
				) : (
					<div className='w-full px-5 flex flex-col space-y-2 overflow-y-auto'>
						{usedCities.map((city, index) => (
							<div
								key={index}
								className={`self-${
									index % 2 === 0 ? 'end' : 'start'
								} p-3 text-center max-w-xs ${
									index % 2 === 0 ? 'bg-mainColor text-white rounded-t-2xl rounded-l-2xl' : 'bg-violet-50 rounded-t-2xl rounded-r-2xl'
								}`}>
								{city}
							</div>
						))}
						<div ref={messagesEndRef} />
					</div>
				)}
			</div>
			<form
				onSubmit={formik.handleSubmit}
				className='flex flex-col items-center'>
				<div className='relative flex items-center w-full'>
					<input
						type='text'
						placeholder={
							yourTurn
								? 'Напишите любой город, например, где вы живёте?'
								: 'Ожидаем ответа соперника...'
						}
						className='w-full h-48 mx-5 px-3 border-inherit rounded-md bg-messageBoxColor'
						onChange={formik.handleChange}
						onBlur={formik.onBlur}
						value={formik.values.city}
						name='city'
						disabled={yourTurn ? false : true}
						ref={inputRef}
					/>
					<button
						type='submit'
						className={`absolute right-7 top-1/2 transform -translate-y-1/2 text-white border-inherit rounded-md ${
							yourTurn ? 'bg-mainColor' : 'bg-gray-400'
						}`}
						disabled={yourTurn ? false : true}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='size-8'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5'
							/>
						</svg>
					</button>
				</div>
				{formik.touched.city && formik.errors.city ? (
					<p className='bg-red-500 text-white text-sm border-inherit rounded px-5 my-0.5 py-0.5'>
						{formik.errors.city}
					</p>
				) : null}
			</form>
		</div>
	);
};

export default Game;
