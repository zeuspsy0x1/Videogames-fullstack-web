import React, { Fragment } from 'react';
import Card from './Card';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getVideogames } from '../Redux/actions';

function AllVideogames() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getVideogames());
	}, [dispatch]);

	const allVideogames = useSelector((state) => state.videogames);

	const mapeo = allVideogames.map((item) => {
		return (
			<Fragment key={item.id.toString()}>
				<Card name={item.name} id={item.id} image={item.image} rating={item.rating} />
			</Fragment>
		);
	});

	return mapeo;
}

export default AllVideogames;
