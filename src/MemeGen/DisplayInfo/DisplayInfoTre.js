import React from "react"
import BoxCount from "./BoxCount"

function DisplayInfoTre(props) {


    return (
        <div className="meme borderGreen">
            <BoxCount width={props.boxCount} />
        </div>
    )
}

export default DisplayInfoTre