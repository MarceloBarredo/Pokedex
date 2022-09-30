import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../actions";

export default function SearchBar () {
    const dispatch = useDispatch();
    const [name, setName] = useState("")

    function handleInputChange (event) {
        event.preventDefault();
        setName(event.target.value)
        
    }

    function handleSubmitButton (event) {
        event.preventDefault();
        dispatch(getNamePokemons(name))
        setName("")
    }

    return (
        <div>
            <input type="text" placeholder="Buscar pokemon..." onChange={e => handleInputChange(e)} />
            <button type="submit" onClick={e => handleSubmitButton(e)}>Buscar</button>
        </div>
    )
}
