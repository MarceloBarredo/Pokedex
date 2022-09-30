/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, filterPokemonsByType, filterByCreationType, orderByAscDesc } from "../actions";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Card from "./Card";
import Paginated from "./Paginated";

export default function Home () {

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons)

    //Declaro los estados locales.
    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
    const indexOfLastPokemon = currentPage * pokemonsPerPage
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (() => {
        dispatch(getPokemons()); //Dispatch aqui es lo mismo que hacer map dispatch to props.
    },[dispatch])

    // Declaro los handlers.
    function handleClickEvent(event){
        event.preventDefault();
        dispatch(getPokemons());
    }

    function handleFilterOrder(event) {
        event.preventDefault();
        dispatch(orderByAscDesc(event.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${event.target.value}`);
    }

    function handleFilterType(event) {
        dispatch(filterPokemonsByType(event.target.value)) //Toma el valor elegido en la lista despegable.
    }

    function handleFilterCreation(event) {
        dispatch(filterByCreationType(event.target.value))
    }

    return (
        <div>
            <Link to="/pokemons">Crear Pokemon</Link>
            <h1>¡Bievenido a nuestro POKEDEX!</h1>
            <button onClick={e => {handleClickEvent(e)}}>
                Cargar POKEMONS nuevamente
            </button>
            <div>
                <select onChange={e => handleFilterOrder(e)}>
                    <option value="asc">Ascendente</option> {/* Teniendo un value ya puedo configurar una action que a partir del value, puedo decirle que haga "algo". */}
                    <option value="des">Descendente</option>
                </select>
                <select onChange={e => handleFilterType(e)}>
                    <option value="all">Todos</option>
                    <option value="normal">Normal</option>
                    <option value="fighting">Fighting</option>
                    <option value="flying">Flying</option>
                    <option value="poison">Poison</option>
                    <option value="ground">Ground</option>
                    <option value="rock">Rock</option>
                    <option value="bug">Bug</option>
                    <option value="ghost">Ghost</option>
                    <option value="steel">Steel</option>
                    <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="grass">Grass</option>
                    <option value="electric">Electric</option>
                    <option value="psychic">Psychic</option>
                    <option value="ice">Ice</option>
                    <option value="dragon">Dragon</option>
                    <option value="dark">Dark</option>
                    <option value="fairy">Fairy</option>
                    <option value="unknown">Unknown</option>
                    <option value="shadow">Shadow</option>
                </select>
                <select onChange={e => handleFilterCreation(e)}>
                    <option value="all">Todos</option>
                    <option value="originals">Originales</option>
                    <option value="selfmade">Creados</option>
                </select>

                <Paginated
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length}
                paginated = {paginated}
                />

                <SearchBar/>

                {currentPokemons?.map( (p) => {

                    let tipo = []
                    if(typeof p.id === 'number') tipo = p.type
                    else tipo = p.Types.map( t => t.name)

                    return (
                        <div key={p.name} className='cartas'>
                        <Link to={"/pokemons" + p.id}>
                            <Card key={p.id.toString()} name={p.name} image={p.image} type={tipo}/>
                        </Link>
                        </div>
                    ) 
                })}
            </div>
        </div>
    )
}