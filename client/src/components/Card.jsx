import React from "react";

export default function Card({name, image, type}) {
    return (
        <div>
            <img src={image} alt="imagen pokemon" width="300px" height="300px"/>
            <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
            <h5>{type.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(' / ')}</h5>
        </div>
    )
}