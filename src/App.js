import "./App.css";
import React from 'react';
import NavBar from './components/nav-bar/NavBar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PokeApp from './components/pages/PokemonPage';
import CountriesApp from './components/pages/CountriesPage';

export default class App extends React.Component {

  
  render (){
    return (
      <Router>
        <div className="App">
          <NavBar/>
          <div className="App-body">
            <Switch>
              <Route exact path="/countries">
                <CountriesApp/>
              </Route>
              <Route exact path="/">
                <PokeApp/>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
