import React from "react";
import useLocationQuery from "../hooks/useLocationQuery";
import Location from "./Location";

export default function SearchBar({
  setSelectedLocInfo,
  searchCategory,
  query,
}) {
  const [isSearching, setIsSearching] = React.useState(true);
  const [locQuery, setLocQuery] = React.useState("");

  const { data, isFetching } = useLocationQuery({
    locQuery,
  });

  return (
    <>
      <label htmlFor={searchCategory}>
        {searchCategory === "from" ? "תחנת מוצא" : "תחנת סיום"}
        {"     "}
        <input
          type="text"
          name={searchCategory}
          value={
            query ? (isSearching ? locQuery : query.split("::")[0]) : locQuery
          }
          onChange={async (e) => {
            setLocQuery(e.target.value);
          }}
          onFocus={() => {
            if (!isSearching) {
              setIsSearching(true);
            }
          }}
          required
          autoComplete="off"
          className="w-fit"
        ></input>
      </label>
      {locQuery !== "" && isFetching && isSearching ? (
        <p className="article-preview">Loading locations...</p>
      ) : (
        isSearching &&
        data?.map((loc) => (
          <Location
            loc={loc}
            setLocQuery={setLocQuery}
            setIsSearching={setIsSearching}
            setSelectedLocInfo={setSelectedLocInfo}
          />
        ))
      )}
    </>
  );
}
