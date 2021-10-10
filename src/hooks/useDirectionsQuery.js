import { useQuery } from "react-query";

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

export default function useDirectionsQuery({ fromPlace, toPlace }) {
  return useQuery([`/directions`, { fromPlace, toPlace, ...initialFilters }]);
}
