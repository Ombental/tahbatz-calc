import React from "react";
import classNames from "classnames";
import SearchBar from "./SearchBar";
import PathList from "./PathList";

// CHECK numBackAndForthDays < numDays
export default function Trip({ divId }) {
  const [fromPlace, setFromPlace] = React.useState(null);
  const [toPlace, setToPlace] = React.useState(null);
  const [numDays, setNumDays] = React.useState(0);
  const [numBackAndForthDays, setNumBackAndForthDays] = React.useState(0);

  const handleInput = (e, setFunction) => {
    if (e.target.validity.valid) {
      setFunction(e.target.value);
    }
  };
  return (
    <div dir="rtl" id={divId}>
      <SearchBar setSelectedLocInfo={setFromPlace} searchCategory="מ" />
      <SearchBar setSelectedLocInfo={setToPlace} searchCategory="אל" />
      <br></br>
      <label>
        כמה פעמים בחודש בערך אני אעשה את הנסיעה
        <input
          type="text"
          pattern="[0-9]*"
          value={numDays}
          onInput={(e) => handleInput(e, setNumDays)}
        ></input>
      </label>
      <label>
        כמה ימים מתוך זה זה הלוך ושוב?
        <input
          type="text"
          pattern="[0-9]*"
          value={numBackAndForthDays}
          onInput={(e) => handleInput(e, setNumBackAndForthDays)}
        ></input>
      </label>
      <br></br>
      {fromPlace && toPlace ? (
        <PathList fromPlace={fromPlace} toPlace={toPlace} />
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
