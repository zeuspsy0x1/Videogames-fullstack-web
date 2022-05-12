import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
	const navigate = useNavigate();
	const aaaaa = () => {
		navigate('/detail');
	};

	return (
		<>
			<div className='LandingPage'>
				<button onClick={aaaaa} className='Enter'>
					Enter
				</button>
			</div>
		</>
	);
}

export default LandingPage;
