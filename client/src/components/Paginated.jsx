import React from "react";


export default function Paginated ({pokemonsPerPage, allPokemons, paginated}) {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="paginated">
                { pageNumbers && pageNumbers.map( number => (
                    <li className="number" key={number}>
                        <a href="/" onClick={() => paginated(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

