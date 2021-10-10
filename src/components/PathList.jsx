import React from "react";
import useDirectionsQuery from "../hooks/useDirectionsQuery";
import Path from "./Path";

export default function PathList({ fromPlace, toPlace }) {
  const { data, isFetching } = useDirectionsQuery({ fromPlace, toPlace });
  return (
    <>
      {data
        ? data?.plan?.itineraries?.map((pathInfo) => (
            <Path pathInfo={pathInfo} />
          ))
        : ""}
    </>
  );
}
