import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginated from "./Paginated";

export default function Home () {

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons)

    //Declaro los estados locales.
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

    function handleClickEvent(event){
        event.preventDefault(); //Para evitar que se recargue la página.
        dispatch(getPokemons());
    }

    return (
        <div>
            <Link to="/pokemons">Crear Pokemon</Link>
            <h1>¡Bievenido!</h1>
            <button onClick={e => {handleClickEvent(e)}}>
                Cargar POKEMONS
            </button>
            <div>
                <select>
                    <option value="asc">Ascendente</option> {/* Teniendo un value ya puedo configurar una action que a partir del value, puedo decirle que haga "algo". */}
                    <option value="des">Descendente</option>
                </select>
                <select>
                    <option value="Normal">Normal</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Flying">Flying</option>
                    <option value="Poison">Poison</option>
                    <option value="Ground">Ground</option>
                    <option value="Rock">Rock</option>
                    <option value="Bug">Bug</option>
                    <option value="Ghost">Ghost</option>
                    <option value="Steel">Steel</option>
                    <option value="Fire">Fire</option>
                    <option value="Water">Water</option>
                    <option value="Grass">Grass</option>
                    <option value="Electric">Electric</option>
                    <option value="Psychic">Psychic</option>
                    <option value="Ice">Ice</option>
                    <option value="Dragon">Dragon</option>
                    <option value="Dark">Dark</option>
                    <option value="Fairy">Fairy</option>
                    <option value="Unknown">Unknown</option>
                    <option value="Shadow">Shadow</option>
                </select>
                <select>
                    <option value="Todos">Todos</option>
                    <option value="Originales">Originales</option>
                    <option value="Creados">Creados</option>
                </select>

                <Paginated
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length}
                paginated = {paginated}
                />

                {currentPokemons?.map( (p) => {
                    return (
                        <div className='cartas'>
                        <Link to={"/pokemons" + p.id}>
                            <Card name={p.name} image={p.image} type={p.type}/>
                        </Link>
                        </div>
                    ) 
                })};
            </div>
        </div>
    )
}