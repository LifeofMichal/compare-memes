import React from "react"

function Form(props) {
    const { topText: tT, bottomText: bT, handleChange: hC, rngImg: rI } = props

    return (
        <form className="meme-form">
            <input
                type="text"
                name="topText"
                placeholder="Top Text"
                value={tT}
                onChange={hC}
            />
            <input
                type="text"
                name="bottomText"
                placeholder="Bottom Text"
                value={bT}
                onChange={hC}
            />

            <button type="button" onClick={rI}>Gen</button>
        </form>
    )
}

export default Form