import React from "react"

function Form(props) {
    const { topText, bottomText, handleChange, numberOfMemes } = props

    return (
        <form className="meme-form">
            <input
                type="text"
                name="topText"
                placeholder="Top Text"
                value={topText}
                onChange={handleChange}
            />
            <input
                type="text"
                name="bottomText"
                placeholder="Bottom Text"
                value={bottomText}
                onChange={handleChange}
            />

            <button
                type="button"
                name="randomImg"
                onClick={handleChange}
                disabled={!numberOfMemes ? true : false}
            >Gen</button>
        </form>
    )
}

export default Form