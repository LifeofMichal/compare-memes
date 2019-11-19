import React from "react"

function Select(props) {

    const { randomImg: rI, handleChange: hC, filteredMemes: fMs } = props

    if (fMs.length === 0) {
        return (
            <>
                <form className="meme-form">
                    <select
                        value={rI}
                        onChange={hC}
                        name="randomImg">
                        {
                            <option>-- no available memes --</option>
                        }
                    </select>
                </form>
            </>
        )
    } else {
        return (
            <>
                <form className="meme-form">
                    <select
                        value={rI}
                        onChange={hC}
                        name="randomImg">
                        {
                            fMs.map((meme) =>
                                <option key={meme.id}
                                    value={meme.url}> {meme.name}
                                </option>
                            )
                        }
                    </select>
                </form>
            </>
        )
    }
}

export default Select