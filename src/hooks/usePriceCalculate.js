import React from "react";
import axios from "axios";

export default function usePriceCalculate(fromPlace, toPlace) {
  const [prices, setPrices] = React.useState([]);
  const [directionData, setDirectionData] = React.useState(null);

  function updateDirectionData() {}
  const tempDate = new Date();
  while (tempDate.getDay > 5) {
    tempDate.setDate((tempDate.getDate() + 1) % 28);
  }
  const initialFilters = {
    date:
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate(),
    time: "12:00",
    // tempDate.getHours().toString().padStart(2, "0") +
    // ":" +
    // tempDate.getMinutes().toString().padStart(2, "0"),
    arriveBy: false,
    locale: "he",
    mode: "WALK,BUS,RAIL,TRAM,CABLE_CAR",
    showIntermediateStops: true,
    maxWalkDistance: 2000,
    optimize: "QUICK",
    numItineraries: 6,
    ignoreRealtimeUpdates: false,
  };

  React.useEffect(() => {
    if (fromPlace && toPlace) {
      async function getDirectionData() {
        const { data } = await axios.get("/directions", {
          params: { fromPlace: fromPlace, toPlace: toPlace, ...initialFilters },
        });
        setDirectionData(data.plan.itineraries);
      }
      getDirectionData();
    }
  });

  React.useEffect(() => {
    async function fetchPriceData(requestBody) {
      const { data } = await axios.post("/pricecalc", {
        lang: "he",
        os: "browser",
        ...requestBody,
      });
      setPrices([...prices, data]);
    }

    async function getPrices() {
      let requestBody = { legs: [] };
      directionData[0].legs.forEach((leg) => {
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
      fetchPriceData(requestBody);
      updateDirectionData();
    }
    if (directionData) getPrices();
  });
  console.log(prices);
  return prices;
}
