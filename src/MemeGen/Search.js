import React from "react"

function Search(props) {

    const { searchQuote: sQ, handleChange: hC } = props

    return (
        <form className="meme-form">
            <input
                className="search"
                type="text"
                name="searchQuote"
                placeholder="Search by name"
                value={sQ}
                onChange={hC}
            />
        </form>
    )
}

export default Search