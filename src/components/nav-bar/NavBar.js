import React from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom'

export default class NavBar extends React.Component{

    render(){
        return(
            <div className="Navbar r-flex justify-content-center"> 
                <h4 className="nav-header nav-container">QueryApp</h4>
                <div className="r-flex justify-content-center nav-container">
                    <Link to="/">
                        <button className="generic-button nav-button">
                            PokeAPi
                        </button>
                    </Link>
                    <Link to="/countries">
                        <button className="generic-button nav-button">
                            RestCountries
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

}