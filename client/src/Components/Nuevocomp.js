import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterById } from '../Redux/actions';

function Nuevocomp() {
	const dispatch = useDispatch();

	useEffect(() => {
		const arr = [
			1, 2, 3, 4, 5, 6, 7, 8, 8, 45342, 34, 45, 4576, 476, 6345, 346, 23541234, 324, 234, 234, 324, 2341, 3241, 435,
			4356,
		];

		dispatch(filterById(arr));
	}, [dispatch]);

	const asdadw = useSelector((state) => state.vvvvv);

	let aaaaaa = asdadw.map((n) => {
		return <li>{n}</li>;
	});

	return aaaaaa;
}

export default Nuevocomp;
