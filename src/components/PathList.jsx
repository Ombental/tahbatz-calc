import React from "react";
import useDirectionsQuery from "../hooks/useDirectionsQuery";
import Path from "./Path";

export default function PathList({ fromPlace, toPlace /*setPrices*/ }) {
  // const [tempPrices, setTempPrices] = React.useState([]);

  const { data, isFetching } = useDirectionsQuery({ fromPlace, toPlace });

  // const updatePrices = (newPrice) => {
  //   setTempPrices([...tempPrices, newPrice]);
  // };
  // if (!isFetching && data) {
  //   if (data?.plan?.itineraries?.length === tempPrices.length)
  //     setPrices(tempPrices);
  // }
  return (
    <>
      {data
        ? data?.plan?.itineraries?.map((pathInfo) => (
            <Path pathInfo={pathInfo} /*updatePrices={updatePrices}*/ />
          ))
        : ""}
    </>
  );
}
