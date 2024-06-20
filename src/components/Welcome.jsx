import React from 'react';
import '../styles/index.css';

const Welcome = ({ startGame }) => {
	return (
		<div className='w-full lg:w-576 h-auto border border-inherit shadow bg-white rounded-2xl'>
			<div className='flex items-center justify-center h-58'>
				<h1>Игра в города на время</h1>
			</div>
			<hr />
			<div className='flex flex-col mx-auto text-sm'>
				<h1 className='my-6 ml-5'>
					Цель: назвать как можно больше реальных городов.
				</h1>
				<ul className='list-disc ml-12 mr-7'>
					<li>Запрещается повторение городов.</li>
					<li>
						Названий городов на твердый “ъ” и мягкий “ъ” знак нет. Из-за этого
						бы пропускаем эту букву и игрок должен назвать город на букву
						стоящую перед ъ или ь знаком.
					</li>
					<li>
						Каждому игроку дается 2 минуты на размышления, если спустя это время
						игрок не вводит слово он считается проигравшим.
					</li>
				</ul>
				<button
					type='button'
					className='w-126 h-40 bg-startButton text-white border-inherit rounded text-base my-6 mx-auto'
					onClick={startGame}>
					Начать игру
				</button>
			</div>
		</div>
	);
};

export default Welcome;
