import React from 'react';
import AttribTable from './AttribTable';
import './Card.css'

export default class Card extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            country : props.country,
            cardProps : [
                {
                    label : "Alpha code",
                    path : "alpha3Code"
                },
                {
                    label : "Region",
                    path : "subregion"
                },
                {
                    label : "Area",
                    path : "area"
                },
                {
                    label : "Capital",
                    path : "capital"
                },
                {
                    label : "Lenguaje principal",
                    path : "languages.0.nativeName"
                }
            ]  
        };
    }

    render(){
        return (
            <div className="Card">
                <div>
                    <div className="r-flex">
                        <h3 className="CardHeader">{this.state.country.name}</h3>
                    </div>
                    <div className='r-flex justify-content-center align-items-center'>
                        <img className="Card-image" src={this.state.country.flag} alt="" id="pokeImage"></img>
                    </div>
                    <AttribTable object={this.state.country} properties={this.state.cardProps}></AttribTable>
                </div>
            </div>
        )
    }
}