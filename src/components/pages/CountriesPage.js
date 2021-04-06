import React from 'react';
import axios from 'axios';
import CountryCard from '../card-component/CountryCard'
import SearchBar from '../search-bar/SearchBar';

export default class CountriesPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading : true,
            countries :[],
            currentEndpoint : 'region',
            endpointValue : 'americas'
        }
    }

    componentDidMount(){
        this.getCountries()
    }

    getCountries(){
        axios.get(`https://restcountries.eu/rest/v2/${this.state.currentEndpoint}/${this.state.endpointValue}`).then(
            result => {
                this.setState({countries : result.data, loading: false});
                console.log(result.data)
            }
        ).catch(err => this.setState({loading: false, countries:[]}))
    }

    render(){
        return (
            <div>
                <div className="r-flex justify-content-center">
                    <SearchBar currentOption={this.state.currentEndpoint} currentValue={this.state.endpointValue} refreshFunc={this.refreshCountries.bind(this)}/>
                </div>
                <div className="r-flex row justify-content-center">
                    { (()=>{
                            if(this.state.loading){
                                return(<div> Loading ....</div>)
                            }else if(this.state.countries.length === 0){
                                return(<h3>Ups tu busqueda no obtuvo resultados</h3>)
                            }else{
                                return (this.state.countries.map(c => 
                                    <CountryCard key={c.name} country={c}/>
                                ))
                            }
                        })()
                    }
                </div>
            </div>
        )
    }

    async refreshCountries(endpoint,value){
        await this.setState({loading:true,currentEndpoint:endpoint,endpointValue:value});
        this.getCountries();
    }
}