import React from "react";
import './Card.css';
import axios from 'axios';
import AttribTable from './AttribTable';

const ImageContainer = props => {
    return (
        <div>
            <div className='r-flex justify-content-center align-items-center'>
                <button className="Image-next-button" onClick={props.prevFunc}>
                    {"<"}
                </button>
                <img className="Card-image" src={props.image} alt="" id="pokeImage"></img>
                <button className="Image-next-button" onClick={props.nextFunc}>
                    {">"}
                </button>
            </div>
            <div className="r-flex justify-content-center">
                <button className="Image-container-button generic-button" onClick={props.changeFunc}>Change skin</button>
            </div>
        </div> 
    );
}

export default class Card extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading : true,
            object : props.pokemon,
            pokemonData : null,
            sprites : null,
            imgLinks : [],
            currentImage: 0,
            defaultSkin : true,
            cardProps : [
                {
                    label : "Puntos de salud",
                    path : "stats.0.base_stat"
                },
                {
                    label : "Ataque",
                    path : "stats.1.base_stat"
                },
                {
                    label : "Defensa",
                    path : "stats.2.base_stat"
                },
                {
                    label : "Altura",
                    path : "height"
                },
                {
                    label : "Peso",
                    path : "weight"
                },
                {
                    label : "Velocidad",
                    path : "stats.5.base_stat"
                }
            ]  
        };
    }

    componentDidMount(){
        axios.get(this.state.object.url).then(result => {
            this.setState({pokemonData : result.data, loading: false, sprites: result.data.sprites});
            let arr = Object.getOwnPropertyNames(result.data.sprites).filter(x => !x.includes('shiny')  && (x.includes('back') || x.includes('front'))
                && result.data.sprites[x]);
            this.setState({imgLinks : arr});
        }).catch(console.log);
    }

    render() {
        return(
            <div className="Card">
                {
                    this.state.loading ? (<div> loading </div>) :
                        (
                        <div>
                            <div className="r-flex">
                                <h3 className="CardHeader">{this.state.object.name}</h3>
                            </div>
                            
                            <ImageContainer image={this.state.pokemonData.sprites[this.state.imgLinks[this.state.currentImage]]} 
                            changeFunc={this.changeSkin.bind(this)}
                            nextFunc={this.nextSprite.bind(this)}
                            prevFunc={this.prevSprite.bind(this)}></ImageContainer>
                            <AttribTable object={this.state.pokemonData} properties={this.state.cardProps}></AttribTable>
                        </div>
                    )
                }
            </div>
        );
    }

    changeSkin(){
        let cond = this.state.defaultSkin ? (o) =>  o.includes('shiny'): (o) => !o.includes('shiny');
        let arr = Object.getOwnPropertyNames(this.state.pokemonData.sprites).filter(x =>  cond(x) && (x.includes('back') || x.includes('front'))
            && this.state.pokemonData.sprites[x] != null);
        this.setState({defaultSkin : !this.state.defaultSkin, imgLinks: arr}); 
    }

    nextSprite(){
        this.setState({currentImage : (this.state.currentImage + 1) %this.state.imgLinks.length})
    }

    prevSprite(){
        let val = this.state.currentImage - 1 < 0 ? 3 : this.state.currentImage - 1; 
        this.setState({currentImage : val % this.state.imgLinks.length})
    }
}
