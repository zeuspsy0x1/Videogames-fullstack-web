import React from 'react';
import { getVideogameById } from '../Redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Detail.css';
//el click a cada carta de todos los juegos, abre Detail, nada mas.
//si le dan click a una, se toma el id de esa carta y se manda a Detail.
//detail hace fetch con ese id y trae toda la info de ese juego.

//Con el useParams traigo el id del videojuego que busco desde la url ej. localhost/detail/69
function Detail() {
	const dispatch = useDispatch();
	const params = useParams();

	//console.log(params);

	useEffect(() => {
		dispatch(getVideogameById(params.id));
	}, [dispatch, params.id]);

	const videogame = useSelector((state) => state.gameById);

	//estos mapeos de plataformas y generos muestran los datos si los hay, si no no se muestran
	const listPlatforms = videogame.platforms?.map((p) => {
		return <li key={Math.random()}>{p}</li>; // le paso un random porque la probabilidad de colision es de 1 entre 7.000 billones
	});

	const vApiGenres = videogame.vApiGenres?.map((p) => {
		return <li key={Math.random()}>{p}</li>;
	});

	const img = videogame.image;

	return (
		<>
			<div className='wrapper'>
				<div className='container'>
					<img src={img} alt='not found' className='card-img' />
					<div className='i'> Name:</div> {videogame.name}
					<hr />
					<div> Rating: {videogame.rating}</div>
					<hr />
					<div>Release Date: {videogame.publishDate}</div>
					<hr />
					<div>Platforms: {listPlatforms}</div>
					<hr />
					<div>Genres: {vApiGenres}</div>
					<hr />
					<div>Description: {videogame.description}</div>
				</div>
			</div>
		</>
	);
}

export default Detail;
