import React from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import {
  prepareRequestBody,
  prepareInitialFilters,
  sortTripPriceData,
} from "../utils";
import { FaCheck } from "react-icons/fa";

export default function Trip({
  tripId,
  handleUpdateTrip,
  setCanAddTrip,
  setLoadingTripData,
}) {
  const [fromPlace, setFromPlace] = React.useState(null);
  const [toPlace, setToPlace] = React.useState(null);
  const [numDays, setNumDays] = React.useState("");
  const [numBackAndForthDays, setNumBackAndForthDays] = React.useState("");
  const [finishedTrip, setFinishedTrip] = React.useState(false);

  const handleInput = (e, setFunction) => {
    if (e.target.validity.valid) {
      setFunction(parseInt(e.target.value));
    } else if (e.target.value === "") {
      setFunction("");
    }
  };

  const handleEditTrip = () => {
    console.log(toPlace, fromPlace);
    setFinishedTrip(false);
    setCanAddTrip(false);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (numBackAndForthDays > numDays) {
      alert("יש יותר ימי הלוך ושוב מימי נסיעה...נא לתקן");
      return;
    }
    setFinishedTrip(true);
    setLoadingTripData(true);

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
    const sortedTripPrice = sortTripPriceData(
      prices,
      numDays - numBackAndForthDays,
      numBackAndForthDays
    );
    handleUpdateTrip(tripId, sortedTripPrice);
    setLoadingTripData(false);
  };

  if (!finishedTrip) {
    return (
      <form dir="rtl" onSubmit={handleOnSubmit} autoComplete="new-password">
        <SearchBar
          setSelectedLocInfo={setFromPlace}
          query={fromPlace}
          searchCategory="from"
        />
        <br></br>
        <SearchBar
          setSelectedLocInfo={setToPlace}
          query={toPlace}
          searchCategory="to"
        />
        <br></br>
        <label>
          כמה פעמים בחודש בערך אני אעשה את הנסיעה{"  "}
          <input
            type="text"
            pattern="[0-9]*"
            value={numDays}
            onInput={(e) => handleInput(e, setNumDays)}
            required
            autoComplete="off"
            className="w-fit-s"
          ></input>
        </label>
        <br></br>
        <label>
          כמה ימים מתוך זה זה הלוך ושוב?{"  "}
          <input
            type="text"
            pattern="[0-9]*"
            value={numBackAndForthDays}
            onInput={(e) => handleInput(e, setNumBackAndForthDays)}
            required
            autoComplete="off"
            className="w-fit-s"
          ></input>
        </label>
        <br></br>
        <button type="submit" className="custom-button submit-button">
          <FaCheck />
        </button>
      </form>
    );
  } else {
    return (
      <>
        <div onClick={handleEditTrip} className="finished-trip">
          {tripId + 1}
          from: {fromPlace ? fromPlace.split("::")[0] : ""}, to:{" "}
          {toPlace ? toPlace.split("::")[0] : ""} || numDays: {numDays},
          backAndForth: {numBackAndForthDays}
        </div>
      </>
    );
  }
}
