import React from "react"

function Select(props) {

    const { randomImg, handleChange, filteredMemes } = props

    return (
        <>
            <form className="meme-form">
                <select
                    value={randomImg}
                    onChange={handleChange}
                    name="selectedMeme">
                    {
                        filteredMemes.length
                            ? filteredMemes.map((meme) =>
                                <option key={meme.id}
                                    value={meme.url}> {meme.name}
                                </option>
                            )
                            : <option>no memes available</option>
                    }
                </select>
            </form>
        </>
    )

}

export default Select