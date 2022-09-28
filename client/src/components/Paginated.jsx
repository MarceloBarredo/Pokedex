import React from "react";


export default function Paginated ({pokemonsPerPage, allPokemons, paginated}) {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i + 1)
    }

    return (
        <nav>
            <ul className="paginated">
                { pageNumbers && pageNumbers.map( number => (
                    <li className="number" key={number.toString()}>
                        <button onClick={() => paginated(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

