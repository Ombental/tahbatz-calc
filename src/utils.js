export function prepareRequestBody(route) {
  let requestBody = { legs: [] };
  route.legs.forEach((leg) => {
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
  return requestBody;
}

export function prepareInitialFilters() {
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
  return initialFilters;
}
