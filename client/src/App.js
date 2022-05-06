import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
//import { getVideogames } from './Redux/actions';
import { getVideogames } from './Redux/actions';

function App() {
	let showAllVideogames = useSelector((state) => state.videogames);

	let dispatch = useDispatch();
	console.log(showAllVideogames);

	//<div> All videogames are {showAllVideogames}</div>
	return (
		<>
			<button onClick={() => dispatch(getVideogames())}>Click to load all videogames</button>
		</>
	);
}

export default App;
