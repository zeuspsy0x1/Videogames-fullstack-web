import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllVideogames from './AllVideogames';
import SearchVideogameByName from './SearchVideogameByName';
import { filterById, getVideogames, getVideogameByName } from '../Redux/actions';

//funcional sin filtros
function Filters() {
	const [nameInput, setNameInput] = useState('');
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		setNameInput(e.target[0].value);
	};
	let state = useSelector((state) => state.videogames);

	const filterState = () => {
		let filteredState = state.filter((v) => v.id === 3498);
		dispatch(filterById(filteredState));
	};
	const resetFilters = () => {
		dispatch(getVideogames());
	};

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
				<button onClick={filterState}>filtrarPorGeneros</button>
				<button onClick={resetFilters}>ResetFilters</button>
				<button onClick={resetFilters}>ResetFilters</button>

				<AllVideogames />
			</>
		);
	}
}

export default Filters;
