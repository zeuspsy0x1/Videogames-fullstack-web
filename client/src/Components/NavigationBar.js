import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllVideogames from './AllVideogames';
import SearchVideogameByName from './SearchVideogameByName';

function NavigationBar() {
	const [nameInput, setNameInput] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		setNameInput(e.target[0].value);
	};

	//console.log(nameInput);

	if (nameInput) {
		return (
			<>
				<form onSubmit={(e) => handleSubmit(e)}>
					<input placeholder='videogame name here' type='text' />
					<input type='submit' value={'Search Videogame'}></input>
				</form>

				<SearchVideogameByName videogameName={nameInput} />
			</>
		);
	}

	if (!nameInput) {
		return (
			<>
				<form onSubmit={(e) => handleSubmit(e)}>
					<input placeholder='videogame name here' type='text' />
					<input type='submit' value={'Search Videogame'}></input>
				</form>

				<AllVideogames />
			</>
		);
	}
}

export default NavigationBar;
