import React from "react";
import usePriceCalcQuery from "../hooks/usePriceCalcQuery";

export default function Path({ pathInfo }) {
  let requestBody = { legs: [] };
  pathInfo.legs.forEach((leg) => {
    if (leg.mode !== "WALK") {
      requestBody.legs.push({
        startTime: leg.startTime,
        endTime: leg.endTime,
        route: leg.route,
        routeId: leg.routeId,
        agencyId: leg.agencyId,
        fromZoneId: leg.from.zoneId,
        fromStopCode: leg.from.stopCode,
        toZoneId: leg.to.zoneId,
        toStopCode: leg.to.stopCode,
      });
    }
  });

  const { data, isFetching } = usePriceCalcQuery({ requestBody });

  return (
    <>
      {isFetching ? (
        <p>loading</p>
      ) : (
        <>
          <button onClick={() => console.log(data)}>CLICK</button>
          {/* <PriceCalc data={data} /> */}
        </>
      )}
    </>
  );
}
