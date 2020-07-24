import React from 'react';
import './App.css';
import Home from './components/Home'
import Students from './components/studentpage/Students'
import WincLogo from './assets/logo_winc.jpg'
import Container from './Container';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";
  

function App() {
	return (
		<Router>
		  <div className="app">
			<nav>
			  <ul className="menu">
				<li>
					<img id="menuLogoWinc" src={WincLogo} alt="logowinc" />
				</li>
				<li>
					<h1>Student Dashboard </h1></li>  
				<li>
				  <Link className="link" to="/"><p>Home</p></Link>
				</li>
				<li>
				  <Link className="link" to="/container"><p>Results</p></Link>
				</li>
				<li>
				  <Link className="link" to="/students"><p>Students</p></Link>
				</li>
			  </ul>
			</nav>
	
			
			<Switch>
			  <Route path="/container">
				<Container />
			  </Route>
			  <Route path="/students">
				<Students />
			  </Route>
			  <Route path="/">
				<Home />
			  </Route>
			</Switch>
		  </div>
		</Router>
	  );

	  
	}

	
	  

export default App;
