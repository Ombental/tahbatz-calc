import React from "react";
import classNames from "classnames";
import SearchBar from "./SearchBar";
import PathList from "./PathList";
import usePriceCalculate from "../hooks/usePriceCalculate";

export default function Trip({ divId }) {
  const [fromPlace, setFromPlace] = React.useState(null);
  const [toPlace, setToPlace] = React.useState(null);
  const [numDays, setNumDays] = React.useState("");
  const [numBackAndForthDays, setNumBackAndForthDays] = React.useState("");
  const [finishedTrip, setFinishedTrip] = React.useState(false);
  // const [prices, setPrices] = React.useState([]);

  const handleInput = (e, setFunction) => {
    if (e.target.validity.valid) {
      setFunction(e.target.value);
    }
  };

  const handleFinishedTrip = () => {
    if (
      numBackAndForthDays === "" ||
      numDays === "" ||
      fromPlace === null ||
      toPlace === null
    ) {
      alert("כל השדות צריכים להיות מלאים...");
      return;
    } else if (numBackAndForthDays > numDays) {
      alert("יש יותר ימי הלוך ושוב מימי נסיעה... נא לתקן");
      return;
    }
    setFinishedTrip(true);
  };

  const handleEditTrip = () => {
    setFinishedTrip(false);
  };

  React.useEffect(() => {
    if (!finishedTrip) return;
    // PUT EVERYTHING HERE AND HAVE A FUNCTION THAT HELPS WITH IT ***OR*** WRITE CUSTOM HOOK
  }, [finishedTrip]);
  usePriceCalculate(fromPlace, toPlace);
  if (!finishedTrip) {
    return (
      <div dir="rtl" id={divId}>
        <SearchBar
          setSelectedLocInfo={setFromPlace}
          query={fromPlace}
          searchCategory="מ"
        />
        <SearchBar
          setSelectedLocInfo={setToPlace}
          query={toPlace}
          searchCategory="אל"
        />
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
        {/* {fromPlace && toPlace && (
          <PathList
            fromPlace={fromPlace}
            toPlace={toPlace}
            // setPrices={setPrices}
          />
        )} */}
        {/* {prices.length > 0 && (
          <>
            <button onClick={handleFinishedTrip}>FINISHED THIS TRIP</button>
            <button onClick={() => console.log(prices)}>PRICES</button>
            <br></br>
            <br></br>
          </>
        )} */}
      </div>
    );
  } else {
    return (
      <>
        <p>
          from: {fromPlace ? fromPlace.split("::")[0] : ""}, to:{" "}
          {toPlace ? toPlace.split("::")[0] : ""} || numDays: {numDays},
          backAndForth: {numBackAndForthDays}
        </p>
        <button onClick={handleEditTrip}>Edit again</button>
        <br></br>
        <br></br>
        <br></br>
      </>
    );
  }
}
