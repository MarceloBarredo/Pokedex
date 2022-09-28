import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {postPokemon, getTypes } from '../actions/index';
import { useDispatch, useSelector } from "react-redux";

export default function PokemonCreate () {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);

    const [input, setInput] = useState({
        name: "",
        life: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        type: []
    })

    function handleChange(event) {
        setInput({
            ...input,
            [event.target.value]: event.target.value
        })
    }

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    return (
        <div>
            <Link to="/home"><button>Volver</button></Link>
            <h1>Crear tu propio Pokemon!</h1>
            <form>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={input.name} name="name" />
                </div>
                <div>
                    <label>Vida:</label>
                    <input type="text" value={input.life} name="life" />
                </div>
                <div>
                    <label>Ataque:</label>
                    <input type="number" value={input.attack} name="attack" />
                </div>
                <div>
                    <label>Defensa:</label>
                    <input type="number" value={input.defense} name="defense" />
                </div>
                <div>
                    <label>Velocidad:</label>
                    <input type="number" value={input.speed} name="speed" />
                </div>
                <div>
                    <label>Peso:</label>
                    <input type="number" value={input.weight} name="weight" />
                </div>
                <div>
                    <label>Altura:</label>
                    <input type="number" value={input.height} name="height" />
                </div>
                <div>
                    <label>Tipo:</label>
                    <label><input type="checkbox" value="Poison" name="Poison" />Poison</label>
                    <label><input type="checkbox" value="Rock" name="Rock" />Rock</label>
                    <label><input type="checkbox" value="Water" name="Water" />Water</label>
                    <label><input type="checkbox" value="Dragon" name="Dragon" />Dragon</label>
                    <label><input type="checkbox" value="Flying" name="Flying" />Flying</label>
                    <label><input type="checkbox" value="Ghost" name="Ghost" />Ghost</label>
                    <label><input type="checkbox" value="Electric" name="Electric" />Electric</label>
                    <label><input type="checkbox" value="Fairy" name="Fairy" />Fairy</label>
                    <label><input type="checkbox" value="Normal" name="Normal" />Normal</label>
                    <label><input type="checkbox" value="Steel" name="Steel" />Steel</label>
                    <label><input type="checkbox" value="Ice" name="Ice" />Ice</label>
                    <label><input type="checkbox" value="Shadow" name="Shadow" />Shadow</label>
                    <label><input type="checkbox" value="Fighting" name="Fighting" />Fighting</label>
                    <label><input type="checkbox" value="Fire" name="Fire" />Fire</label>
                    <label><input type="checkbox" value="Psychic" name="Psychic" />Psychic</label>
                    <label><input type="checkbox" value="Unknown" name="Unknown" />Unknown</label>
                    <label><input type="checkbox" value="Ground" name="Ground" />Ground</label>
                    <label><input type="checkbox" value="Bug" name="Bug" />Bug</label>
                    <label><input type="checkbox" value="Grass" name="Grass" />Grass</label>
                    <label><input type="checkbox" value="Dark" name="Dark" />Dark</label>
                </div>
                <select>
                    {types.map( (t) => (
                        <option value={t.name}>{t.name}</option>
                    ))}
                </select>

                <button type="submit">Crear Personaje</button>
            </form>
        </div>
    )
}