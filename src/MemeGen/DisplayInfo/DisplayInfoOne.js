import React from "react"
import Name from "./Name"
import Id from "./Id"
import Url from "./Url"

function DisplayInfoOne(props) {

    const { id, name, url } = props

    return (
        <div className="meme borderRed">
            <Name name={name} /> <Id id={id} />
            <Url url={url} />
        </div>
    )
}

export default DisplayInfoOne