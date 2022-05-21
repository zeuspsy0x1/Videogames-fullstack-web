import React from 'react';
import LandingPage from './Components/LandingPage';
import Detail from './Components/Detail';
import CreateVideogame from './Components/CreateVideogame';
import AllVideogames from './Components/AllVideogames';
import Filters from './Components/Filters';
import SearchVideogameByName from './Components/SearchVideogameByName';
import Nuevocomp from './Components/Nuevocomp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
	//let showAllVideogames = useSelector((state) => state.videogames);
	//let dispatch = useDispatch();
	//console.log(showAllVideogames);
	//<div> All videogames are {showAllVideogames}</div>
	//<button onClick={() => dispatch(getVideogames())}>Click to load all videogames</button>
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/detail/:id' element={<Detail />} />
				<Route path='/allVideogames' element={<AllVideogames />} />
				<Route path='/nuevocomp' element={<Nuevocomp />} />
				<Route path='/searchVideogameByName' element={<SearchVideogameByName />} />
				<Route path='/createVideogame' element={<CreateVideogame />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

/* <Route path = '/home' component={}/>
<Route path= '/pokemon' component={}/>
<Route path= '/id/:id' component={}/>
*/

/* <nav>
	<Link to='/LandingPage'>Invoices</Link> | <Link to='/Detail'>Expenses</Link>
</nav> */
