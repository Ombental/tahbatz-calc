import React from "react";
import axios from "axios";
import classNames from "classnames";
import SearchBar from "./SearchBar";
import { prepareRequestBody, prepareInitialFilters } from "../utils";

export default function Trip({ tripId, handleUpdateTrip }) {
  const [fromPlace, setFromPlace] = React.useState(null);
  const [toPlace, setToPlace] = React.useState(null);
  const [numDays, setNumDays] = React.useState("");
  const [numBackAndForthDays, setNumBackAndForthDays] = React.useState("");
  const [finishedTrip, setFinishedTrip] = React.useState(false);

  const handleInput = (e, setFunction) => {
    if (e.target.validity.valid) {
      setFunction(e.target.value);
    }
  };

  const handleEditTrip = () => {
    setFinishedTrip(false);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (numBackAndForthDays > numDays) {
      alert("יש יותר ימי הלוך ושוב מימי נסיעה... נא לתקן");
      return;
    }
    setFinishedTrip(true);

    const initialFilters = prepareInitialFilters();
    const { data: initialDirectionsData } = await axios.get("/directions", {
      params: { fromPlace: fromPlace, toPlace: toPlace, ...initialFilters },
    });
    const directionData = initialDirectionsData.plan.itineraries;
    const prices = [];
    for (const route of directionData) {
      const requestBody = prepareRequestBody(route);
      const { data } = await axios.post("/pricecalc", {
        lang: "he",
        os: "browser",
        ...requestBody,
      });
      prices.push(data);
    }
    handleUpdateTrip(tripId, prices);
  };

  if (!finishedTrip) {
    return (
      <form dir="rtl" onSubmit={handleOnSubmit}>
        <SearchBar
          setSelectedLocInfo={setFromPlace}
          query={fromPlace}
          searchCategory="from"
        />
        <SearchBar
          setSelectedLocInfo={setToPlace}
          query={toPlace}
          searchCategory="to"
        />
        <br></br>
        <label>
          כמה פעמים בחודש בערך אני אעשה את הנסיעה
          <input
            type="text"
            pattern="[0-9]*"
            value={numDays}
            onInput={(e) => handleInput(e, setNumDays)}
            required
          ></input>
        </label>
        <label>
          כמה ימים מתוך זה זה הלוך ושוב?
          <input
            type="text"
            pattern="[0-9]*"
            value={numBackAndForthDays}
            onInput={(e) => handleInput(e, setNumBackAndForthDays)}
            required
          ></input>
        </label>
        <br></br>
        <input type="submit" value="סיימתי עם הנסיעה הזאת"></input>
      </form>
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
