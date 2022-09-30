/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions";
import { useEffect } from "react";

export default function Details () {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetails())
    }, [dispatch])

    const pokemonDetails = useSelector((state) => state.detail)

    return (
        <div>
            
        </div>
    )
}