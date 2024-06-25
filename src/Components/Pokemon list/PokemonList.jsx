import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './PokemonList.css'
import Pokemon from '../Pokemon/Pokemon'

const PokemonList = () => {

    // const [pokemonList, setPokemonList] = useState([])
    // const [isLoading, setIsLoading] = useState(true)

    // const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
    // const [nextUrl, setNextUrl] = useState('');
    // const [prevUrl, setPrevUrl] = useState('');

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList : [],
        isLoading : true,
        pokedexUrl : 'https://pokeapi.co/api/v2/pokemon/',
        nextUrl : '',
        prevUrl : ''
    })

    async function downloadPokemon(){

        // setIsLoading(true);
        setPokemonListState((state) => ({...state, 
            isLoading : true
        }));

        const response = await axios.get(pokemonListState.pokedexUrl) // this downloads list of 20 pokemons
        console.log(response.data);

        // setNextUrl(response.data.next);
        setPokemonListState((state) => ({
            ...state, 
            nextUrl : response.data.next, 
            prevUrl : response.data.previous
        }));
        // setPrevUrl(response.data.previous);

        const pokemonResults = response.data.results; // we get the array of pokemons from results

        // console.log(response.results);

        //iterating over the array of pokemons and using their url, to create an array of promises that will download those 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url)) 
        // console.log(pokemonResultPromise);

        //axios returns a promise and axios.all is a method. When a array of promises is passed to it then it returns all the data when each and every data is loaded.
        //passing the promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise) //array of 0 pokemon detailed data

        // console.log(pokemonData);

        // now iterate on the data of each pokemon and extract id, name, image and types
        const pokeListResult = pokemonData.map((pokeData)=>{
            const pokemon = pokeData.data
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types
            }
        })
        // console.log(pokeListResult);

        // setPokemonList(pokeListResult)
        setPokemonListState((state) => ({
            ...state , 
            pokemonList : pokeListResult,
            isLoading : false
        }));

        // setIsLoading(false)
    }

    useEffect(() => {
        downloadPokemon();
    }, [pokemonListState.pokedexUrl])


  return (
    <div className='pokemon-list-wrapper'>
        <div className='pokemon-wrapper'>
        {(pokemonListState.isLoading) ? 'Loading....' : 
            pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)
        }
        </div>
        <div className='controls'>
            <button disabled={pokemonListState.prevUrl == null} onClick={()=> {
                const urlToSet = pokemonListState.prevUrl;
                setPokemonListState({...pokemonListState, pokedexUrl : urlToSet})
                }}>Prev</button>
            <button disabled={pokemonListState.nextUrl == null} onClick={()=> {
                const urlToSet = pokemonListState.nextUrl;
                setPokemonListState({...pokemonListState, pokedexUrl : urlToSet})
        }}>Next</button>
        </div>
    </div>
  )
}

export default PokemonList;