import React from 'react';
import '../styles/index.css';
import Timer from './Timer';

const Results = ({ victory, lastCity, citiesCount, startGame }) => {
	return (
		<div className='w-full sm:w-2/3 md:w-1/2 lg:w-1/3 h-full sm:h-2/3 md:h-1/2 lg:1/3 text-base sm:text-lg md:text-xl lg:text-2xl flex flex-col content-end border border-inherit shadow bg-white rounded-2xl text-center justify-around'>
			{victory ? (
				<p>
					Поздравляем тебя с победой! <br /> Твой противник не вспомнил нужный
					город!
				</p>
			) : (
				<p>
					К сожалению твоё время вышло! <br /> Твой противник победил!
				</p>
			)}
			<div className='text-5xl'>
				<Timer color={victory ? 'green' : 'red'} />
			</div>
			<p>
				Всего было перечислено городов: {citiesCount} <br /> Очень неплохой
				результат!
			</p>
			<p>
				Последний город, названный победителем:{' '}
				<h1 className='text-xl pt-5 font-medium'>{lastCity}</h1>
			</p>
			<button
				type='button'
				className='w-180 h-40 bg-startButton text-white border-inherit rounded text-base my-6 mx-auto' onClick={startGame}>
				Начать новую игру
			</button>
		</div>
	);
};

export default Results;
