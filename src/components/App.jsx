import React, { useState } from 'react';
import '../styles/index.css';

import Welcome from './Welcome.jsx';
import Game from './Game.jsx';
import Results from './Results.jsx';

const App = () => {
	const [gameOn, setGameOn] = useState(null);
	const [victory, setVictory] = useState(null);
	const [usedCities, setUsedCities] = useState([]);

	const startGame = () => {
		setUsedCities([]);
		setGameOn(true);
	};

	return (
		<div className='grid place-items-center min-h-screen bg-bgColor'>
			{(() => {
				switch (gameOn) {
					case null:
						return <Welcome startGame={startGame} />;
					case true:
						return (
							<Game
								setVictory={setVictory}
								setGameOn={setGameOn}
								usedCities={usedCities}
								setUsedCities={setUsedCities}
							/>
						);
					case false:
						return (
							<Results
								victory={victory}
								lastCity={usedCities.at(-1)}
								citiesCount={usedCities.length}
								startGame={startGame}
							/>
						);
					default:
						return null;
				}
			})()}
		</div>
	);
};

export default App;
