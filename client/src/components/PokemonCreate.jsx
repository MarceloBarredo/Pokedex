/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {postPokemon, getTypes } from '../actions/index';
import { useDispatch, useSelector } from "react-redux";

function inputValidations(input) {
    let errors = {}

    if(!input.name) errors.name = "Se debe ingresar un nombre"
    // else if (!input.life) errors.life = "Se debe ingresar un valor numérico de vida"
    // else if (!input.attack) errors.attack = "Se debe ingresar un valor numérico de ataque"
    // else if (!input.defense) errors.defense = "Se debe ingresar un valor numérico de defensa"
    // else if (!input.speed) errors.speed = "Se debe ingresar un valor numérico de velocidad"
    // else if (!input.height) errors.height = "Se debe ingresar un valor numérico de altura"
    // else if (!input.weight) errors.weight = "Se debe ingresar un valor numérico de peso"
    // else if (!input.image) errors.image = "Debe ser ingresada la URL de una imagen"
    
    return errors
}

export default function PokemonCreate () {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: "",
        life: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        image: "",
        type: []
    })

    function handleChange(event) {
        event.preventDefault();
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        setErrors(inputValidations({
            ...input,
            [event.target.name]: event.target.value
        }))
    }

    function handleCheck(event) {
        if (event.target.checked) {
            setInput({
                ...input,
                type: [...input.type, event.target.value.toLowerCase()]
            })
        }
    }

    function handleSubmit(event) {
        if (errors.name || !input.name) {
            event.preventDefault();
            alert("Complete/Modifique los campos necesarios")
        } else {
            event.preventDefault();
            dispatch(postPokemon(input))
            alert("Pokemon creado con exito!")
            setInput({
                name: "",
                life: "",
                attack: "",
                defense: "",
                speed: "",
                height: "",
                weight: "",
                image: "",
                type: ""
            })
            history.push('/pokemons')
        }
    }

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    return (
        <div>
            <Link to="/home"><button>Volver</button></Link>
            <h1>Crear tu propio Pokemon!</h1>
            <form onSubmit={s => handleSubmit(s)}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={input.name} name="name" onChange={c => handleChange(c)} />
                    {errors.name && (<p>{errors.name}</p>)}
                </div>
                <div>
                    <label>Vida: </label>
                    <input type="text" value={input.life} name="life" onChange={c => handleChange(c)} />
                </div>
                <div>
                    <label>Ataque: </label>
                    <input type="number" value={input.attack} name="attack" onChange={c => handleChange(c)} />
                </div>
                <div>
                    <label>Defensa: </label>
                    <input type="number" value={input.defense} name="defense" onChange={c => handleChange(c)} />
                </div>
                <div>
                    <label>Velocidad: </label>
                    <input type="number" value={input.speed} name="speed" onChange={c => handleChange(c)} />
                </div>
                <div>
                    <label>Peso: </label>
                    <input type="number" value={input.weight} name="weight" onChange={c => handleChange(c)} />
                </div>
                <div>
                    <label>Altura: </label>
                    <input type="number" value={input.height} name="height" onChange={c => handleChange(c)} />
                </div>
                <div>
                    <label>Imagen: </label>
                    <input type="text" value={input.image} name="image" onChange={c => handleChange(c)} />
                </div>
                <div>
                    <label>Tipo: </label>
                    <label><input type="checkbox" value="Poison" name="Poison" onChange={c => handleCheck(c)} />Poison</label>
                    <label><input type="checkbox" value="Rock" name="Rock" onChange={c => handleCheck(c)} />Rock</label>
                    <label><input type="checkbox" value="Water" name="Water" onChange={c => handleCheck(c)} />Water</label>
                    <label><input type="checkbox" value="Dragon" name="Dragon" onChange={c => handleCheck(c)} />Dragon</label>
                    <label><input type="checkbox" value="Flying" name="Flying" onChange={c => handleCheck(c)} />Flying</label>
                    <label><input type="checkbox" value="Ghost" name="Ghost" onChange={c => handleCheck(c)} />Ghost</label>
                    <label><input type="checkbox" value="Electric" name="Electric" onChange={c => handleCheck(c)} />Electric</label>
                    <label><input type="checkbox" value="Fairy" name="Fairy" onChange={c => handleCheck(c)} />Fairy</label>
                    <label><input type="checkbox" value="Normal" name="Normal" onChange={c => handleCheck(c)} />Normal</label>
                    <label><input type="checkbox" value="Steel" name="Steel" onChange={c => handleCheck(c)} />Steel</label>
                    <label><input type="checkbox" value="Ice" name="Ice" onChange={c => handleCheck(c)} />Ice</label>
                    <label><input type="checkbox" value="Shadow" name="Shadow" onChange={c => handleCheck(c)} />Shadow</label>
                    <label><input type="checkbox" value="Fighting" name="Fighting" onChange={c => handleCheck(c)} />Fighting</label>
                    <label><input type="checkbox" value="Fire" name="Fire" onChange={c => handleCheck(c)} />Fire</label>
                    <label><input type="checkbox" value="Psychic" name="Psychic" onChange={c => handleCheck(c)} />Psychic</label>
                    <label><input type="checkbox" value="Unknown" name="Unknown" onChange={c => handleCheck(c)} />Unknown</label>
                    <label><input type="checkbox" value="Ground" name="Ground" onChange={c => handleCheck(c)} />Ground</label>
                    <label><input type="checkbox" value="Bug" name="Bug" onChange={c => handleCheck(c)} />Bug</label>
                    <label><input type="checkbox" value="Grass" name="Grass" onChange={c => handleCheck(c)} />Grass</label>
                    <label><input type="checkbox" value="Dark" name="Dark" onChange={c => handleCheck(c)} />Dark</label>
                </div>

                {/* Formato lista desplegable */}
                {/* <select>
                    {types.map( (t) => (
                        <option value={t.name}>{t.name}</option>
                    ))}
                </select> */}
                <div>
                    <button type="submit">Crear Personaje</button>
                </div>      
                
            </form>
        </div>
    )
}