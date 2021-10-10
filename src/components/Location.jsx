import React from "react";

export default function Location({
  loc,
  setLocQuery,
  setIsSearching,
  setSelectedLocInfo,
}) {
  const locText =
    loc.formatted_address === undefined
      ? loc.description === undefined
        ? ""
        : loc.description
      : loc.description === undefined
      ? loc.formatted_address
      : loc.formatted_address.includes(loc.description)
      ? loc.formatted_address
      : loc.description + " " + loc.formatted_address;

  const handleClick = () => {
    setIsSearching(false);
    setLocQuery(
      loc.formatted_address ? loc.formatted_address : loc.description
    );
    setSelectedLocInfo(
      locText.concat("::", loc.lat.toString(), ",", loc.lng.toString())
    );
  };
  return (
    <>
      <div onClick={handleClick}>{locText}</div>
    </>
  );
}
