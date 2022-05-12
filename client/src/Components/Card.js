import React from 'react';
import './Card.css';
import Detail from './Detail';
import { useNavigate } from 'react-router-dom';

function Card(props) {
	const navigate = useNavigate();

	const { name, id, image, rating } = props;

	const moveToDetailsOfTheVideogame = () => {
		navigate(`/detail/${id}`);
	};

	return (
		<>
			<div onClick={moveToDetailsOfTheVideogame} className='carta'>
				<img src={image} alt='imagen del videojuego' className='img' />{' '}
				<div className='contenedor'>
					{' '}
					<h4>
						<b>{name}</b>
					</h4>
					<p>{id}</p>
					<p>{rating}</p>
				</div>
			</div>
		</>
	);
}

export default Card;
