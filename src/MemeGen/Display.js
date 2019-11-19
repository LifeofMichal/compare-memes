import React from "react"

function Display(props) {

    return (
        <div className="meme">
            <img src={props.randomImg} alt={props.randomImg} />
            <h2 className="top">{props.topText}</h2>
            <h2 className="bottom">{props.bottomText}</h2>
        </div>
    )
}

export default Display