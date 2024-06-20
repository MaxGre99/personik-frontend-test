import React from 'react';
import '../styles/index.css';
import Timer from './Timer';

const Results = ({ victory, lastCity, citiesCount, startGame }) => {
	return (
		<div className='xs:w-full sm:w-1/2 md:w-380 lg:w-544 h-auto flex flex-col content-end border border-inherit shadow bg-white rounded-2xl text-center gap-4 py-5'>
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
				className='w-180 h-40 bg-startButton text-white border-inherit rounded text-base mx-auto' onClick={startGame}>
				Начать новую игру
			</button>
		</div>
	);
};

export default Results;
