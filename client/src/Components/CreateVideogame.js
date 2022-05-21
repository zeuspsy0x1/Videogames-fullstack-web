import React, { Fragment } from 'react';
import { useState } from 'react';
import { getGenres, getPlatforms } from '../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

function CreateVideogame() {
	const dispatch = useDispatch();
	const [vName, setvName] = useState('');
	const [vRating, setvRating] = useState(0);
	const [vReleaseDate, setvReleaseDate] = useState('');
	const [vDescription, setvDescription] = useState('');
	const [vImage, setvImage] = useState('');
	const [vGenres, setvGenres] = useState([]);
	const [vPlatforms, setvPlatforms] = useState([]);

	useEffect(() => {
		dispatch(getGenres());
		dispatch(getPlatforms());
	}, [dispatch]);

	let fetchGenres = useSelector((state) => state.genres);
	let mappedGenres = fetchGenres.map((v) => {
		return (
			<Fragment key={v.id}>
				<option value={v.name}>{v.name}</option>
			</Fragment>
		);
	});
	let fetchPlatforms = useSelector((state) => state.platforms);
	let mappedPlatforms = fetchPlatforms.map((p) => {
		return (
			<Fragment key={p.id}>
				<option value={p.name}>{p.name}</option>
			</Fragment>
		);
	});
	//validaciones que se renderizan
	const validationName = () => {
		return vName.length > 2 && vName.length < 20 ? (
			<div className='correctInput'>Name length is ok</div>
		) : (
			<div className='error'>Name is too short or too long</div>
		);
	};
	const validationRating = () => {
		return vRating > 0 && vRating <= 5 ? (
			<div className='correctInput'>Rating is ok</div>
		) : (
			<div className='error'>Rating should be between 0 and 5</div>
		);
	};
	const validationRelease = () => {
		return vReleaseDate.length > 5 ? (
			<div className='correctInput'>Date is ok</div>
		) : (
			<div className='error'>Select a Date</div>
		);
	};
	const validationDescription = () => {
		return vDescription.length > 10 && vDescription.length < 500 ? (
			<div className='correctInput'>Description is ok</div>
		) : (
			<div className='error'>Description is too short or too long</div>
		);
	};
	const validationImage = () => {
		return vImage.length > 20 ? (
			<div className='correctInput'>Image link is valid</div>
		) : (
			<div className='error'>Image link is too short</div>
		);
	};

	//funciones que cambian el estado de generos y plataformas
	const handleInputGenres = (e) => {
		e.preventDefault();
		if (vGenres.includes(e.target.value)) {
			let arr = vGenres;
			let arrFiltered = arr.filter((g) => g !== e.target.value); //lo hice con MAP y no borraba, sino que mandaba true o false vGenres
			if (vGenres.length) {
				// solo permito 4 generos maximo
				setvGenres(arrFiltered);
			}
		} else setvGenres([...vGenres, e.target.value]);
	};

	const handleInputPlatforms = (e) => {
		e.preventDefault();
		if (vPlatforms.includes(e.target.value)) {
			let arr = vPlatforms;
			let arrFiltered = arr.filter((p) => p !== e.target.value); //lo hice con MAP y no borraba, sino que mandaba true o false vGenres
			setvPlatforms(arrFiltered);
		} else setvPlatforms([...vPlatforms, e.target.value]);
	};

	//validaciones que NO se renderizan, pero que si no se cumplen, no muestran el boton de enviar

	const validateInputsThenSubmitVideogame = async (e) => {
		e.preventDefault();

		if (vName.length < 2 || vName.length > 20) {
			return alert('Name is not correct');
		}
		if (vRating < 0 || vRating > 5) {
			return alert('Rating is not correct');
		}
		if (vDescription.length < 10 || vDescription.length > 500) {
			return alert('Your description is too long, maximum 500 characters');
		}
		if (vImage.length < 20) {
			return alert('Your image link is too short');
		}
		if (!vReleaseDate) {
			return alert('Pick a release date');
		}
		if (vGenres.length === 0) {
			return alert('Pick a genre');
		}
		if (vPlatforms.length === 0) {
			return alert('Pick a platform');
		}

		let videogame = {
			name: vName,
			rating: vRating,
			publishDate: vReleaseDate,
			description: vDescription,
			image: vImage,
			vApiGenres: vGenres,
			platforms: vPlatforms,
			created: true,
		};

		//console.log(JSON.stringify(videogame));
		let post = await axios.post(`http://localhost:5000/videogames/add`, videogame);
		//console.log(post.data);

		if (post.status === 200) {
			alert('videogame creation successfull');
		} else if (post.status !== 200) {
			alert('videogame creation failed, change the name of the videogame');
		}
	};

	return (
		<>
			<form>
				<div> Create a videogame here </div>
				<h4>Videogame name</h4>
				<input
					name='name'
					onChange={(e) => {
						setvName(e.target.value);
					}}
				></input>
				<div>{validationName()}</div>

				<h4>Rating</h4>
				<input
					onChange={(e) => {
						setvRating(e.target.value);
					}}
				></input>
				<div>{validationRating()}</div>

				<h4>Release Date</h4>
				<input
					type='date'
					onChange={(e) => {
						setvReleaseDate(e.target.value);
					}}
				></input>
				<div>{validationRelease()}</div>

				<h4>Description</h4>
				<textarea
					type='text'
					onChange={(e) => {
						setvDescription(e.target.value);
					}}
				></textarea>
				<div>{validationDescription()}</div>
				<br />
				<br />
				<div>Paste a link to the videogame image</div>
				<input type='url' onChange={(e) => setvImage(e.target.value)}></input>
				<div>{validationImage()}</div>
				<div>
					<h4>Genres</h4>
					{vGenres.length > 0 ? (
						vGenres.map((g) => <li key={Math.random()}>{g}</li>)
					) : (
						<>Click some genres down here, remove them by clicking them again:</>
					)}
					<br />
					<select size='10' multiple onChange={(e) => handleInputGenres(e)}>
						{mappedGenres}
					</select>
				</div>

				<div>
					<h4>Platforms</h4>
					{vPlatforms.length > 0 ? (
						vPlatforms.map((p) => <li key={Math.random()}>{p}</li>)
					) : (
						<>Click some Platforms down here, remove them by clicking them again:</>
					)}
					<br />
					<select size='10' multiple onChange={(e) => handleInputPlatforms(e)}>
						{mappedPlatforms}
					</select>
				</div>

				<br />
				<br />
				<button onClick={(e) => validateInputsThenSubmitVideogame(e)}>AAAAAAAA</button>
			</form>
		</>
	);
}

export default CreateVideogame;
