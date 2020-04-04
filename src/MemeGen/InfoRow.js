import React from "react"

function InfoRow(props) {
    return (
        <p className="meme borderRed">
            {props.children}
        </p>
    )
}


export default InfoRow