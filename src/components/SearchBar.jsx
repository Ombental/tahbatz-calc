import React from "react";
import useLocationQuery from "../hooks/useLocationQuery";
import Location from "./Location";

export default function SearchBar({}) {
  const [isSearching, setIsSearching] = React.useState(true);
  const [chosenLoc, setChosenLoc] = React.useState({});
  const [locQuery, setLocQuery] = React.useState("");

  const { data, isFetching, isError, isSuccess } = useLocationQuery({
    locQuery,
  });
  console.log(data);

  if (isSearching) {
    if (isFetching)
      return <p className="article-preview">Loading locations...</p>;
    if (isError)
      return <p className="article-preview">Loading locations failed :(</p>;
  }

  return (
    <>
      <label>
        QUERY LOCATION isSearching ?
        <input
          type="text"
          onChange={(e) => {
            console.log(e.target.value);
            setLocQuery(e.target.value);
          }}
        ></input>
      </label>
      {data?.map((loc) => (
        <Location loc setChosenLoc setIsSearching />
      ))}{" "}
      :{" "}
      <input
        type="text"
        value={chosenLoc}
        onFocus={() => (isSearching ? null : setIsSearching(true))}
      ></input>
    </>
  );
}
