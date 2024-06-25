import Search from "../Search/Search";
import './Pokedex.css'
import PokemonList from "../Pokemon list/PokemonList";

function Pokedex(){


    return (
        <div className="pokedex-wrapper">
            <Search />
            <PokemonList />
        </div>
    )
}

export default Pokedex;