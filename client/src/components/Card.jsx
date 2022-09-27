import React from "react";

export default function Card({name, image, type}) {
    return (
        <div>
            <img src={image} alt="imagen pokemon" width="300px" height="300px"/>
            <h2>{name}</h2>
            <h5>{type}</h5>
        </div>
    )
}