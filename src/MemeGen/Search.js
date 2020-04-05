import React from "react"

function Search(props) {

    const { searchQuote, handleChange } = props

    return (
        <form className="meme-form">
            <input
                className="search"
                type="text"
                name="searchQuote"
                placeholder="Search by name"
                value={searchQuote}
                onChange={handleChange}
            />
        </form>
    )
}

export default Search