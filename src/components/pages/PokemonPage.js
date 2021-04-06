import React from 'react';
import axios from 'axios';
import PokemonCard from "../card-component/PokemonCard";

export default class PokemonPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            loading: true,
            pokemonsData : null
        }
    }

    componentDidMount(){
        axios.get('https://pokeapi.co/api/v2/pokemon/').then(result => {
            this.setState({pokemonsData : result.data});
            this.setState({loading : false});
            console.log(result.data);
        }).catch(console.log);
    }

    render(){
        return (
            <div className="r-flex row justify-content-center">
                {
                    this.state.loading ? <div> Loading...</div> :
                    this.state.pokemonsData && this.state.pokemonsData.results.map( obj =>
                        <PokemonCard key={obj.name} pokemon={obj} ></PokemonCard>
                    )  
                }
            </div>
        )
    }
}