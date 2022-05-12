import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getVideogameByName } from '../Redux/actions';
import Card from './Card';

function SearchVideogameByName(props) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getVideogameByName(props.videogameName));
	}, [dispatch, props.videogameName]);

	let errorState = useSelector((state) => state.error);
	let state = useSelector((state) => state.gamesByName);

	if (errorState.error) {
		return (
			<>
				<div>{errorState.error}</div>
			</>
		);
	}

	let videogamesByName = state.map((v) => {
		const { id, name, image, rating } = v;

		return (
			<Fragment key={id.toString()}>
				<div>
					<Card name={name} id={id} image={image} rating={rating} />
				</div>
			</Fragment>
		);
	});

	return videogamesByName;
}

export default SearchVideogameByName;
