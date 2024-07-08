import Search from "../Search/Search";
import './Pokedex.css'
import PokemonList from "../Pokemon list/PokemonList";
import { useEffect, useState } from "react";
import PokemonDetails from "../Pokemon Details/PokemonDetails";

function Pokedex(){

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="pokedex-wrapper">
            <Search updateSearchTerm = {setSearchTerm} />
            { (!searchTerm) ? <PokemonList /> : <PokemonDetails key={searchTerm} pokemonName={searchTerm} /> }
        </div>
    )
}

export default Pokedex;