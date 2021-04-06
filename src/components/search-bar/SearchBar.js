import './SearchBar.css';
import React from 'react';

class SearchBar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            currentOption : props.currentOption,
            currentValue : props.currentValue,
            refreshFunc : props.refreshFunc
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onClick = (e) => {
        console.log(this.state.currentOption);
        this.state.refreshFunc(this.state.currentOption,this.state.currentValue);
    }

    render(){
        return (
            <div className="r-flex justify-content-center bar-container">
                <select name="currentOption" className="bar-select" value={this.state.currentOption} onChange={this.onChange}>
                    <option value="name">Nombre</option>
                    <option value="lang">Lenguaje</option>
                    <option value="region">Region</option>
                </select>
                <input name="currentValue" className={`bar-input ${this.state.currentValue.length === 0 ? "bar-input-red" : ""}`} type="text" value={this.state.currentValue} onChange={this.onChange}/>
                <button disabled={this.state.currentValue.length === 0} className="generic-button bar-button" onClick={this.onClick}>Buscar</button>
            </div>
        )
    }
}

export default SearchBar;