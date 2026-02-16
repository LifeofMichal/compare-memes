import React from "react";

function Select(props) {
  const { randomImg, handleChange, filteredMemes } = props;

  if (filteredMemes.length === 0) {
    return (
      <>
        <form className="meme-form">
          <select value={randomImg}>
            {<option>-- no available memes --</option>}
          </select>
        </form>
      </>
    );
  } else {
    return (
      <>
        <form className="meme-form">
          <select value={randomImg} onChange={handleChange} name="selectedImg">
            {filteredMemes.map((meme) => (
              <option key={meme.id} value={meme.url}>
                {" "}
                {meme.name}
              </option>
            ))}
          </select>
        </form>
      </>
    );
  }
}

export default Select;
