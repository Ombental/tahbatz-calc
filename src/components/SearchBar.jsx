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
  console.log(data);

  return (
    <>
      <label>
        {searchCategory}
        <input
          type="text"
          value={query ? query.split("::")[0] : locQuery}
          onChange={async (e) => {
            console.log(e.target.value);
            setLocQuery(e.target.value);
          }}
          onFocus={() => (isSearching ? null : setIsSearching(true))}
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
