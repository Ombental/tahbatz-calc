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

export function applyMotDiscount(currentSum) {
  let discountSum = 0;
  if (currentSum > 195.5) {
    discountSum += 195.5;
    currentSum -= 195.5;
    if (currentSum > 196) {
      discountSum += 196 * 0.75;
      currentSum -= 196;
      if (currentSum > 587) {
        discountSum += 587 * 0.5;
        console.log("");
        return discountSum + (currentSum - 587) * 0.25;
      } else {
        return discountSum + currentSum * 0.5;
      }
    } else {
      return discountSum + currentSum * 0.75;
    }
  } else {
    return currentSum;
  }
}

export function sortTripPriceData(prices, numDays, numBackAndForthDays) {
  let sortedPriceData = {
    allProfiles: {},
    cheapestProfile: {},
    ravKavPrice: {},
    ravPassPrice: {},
  };
  for (const price of prices) {
    for (const profile of price?.periodTickets) {
      if (sortedPriceData.allProfiles[profile.ShareCode] === undefined) {
        sortedPriceData.allProfiles[profile.ShareCode] = {
          student: profile.AnnualStudent,
          senior: profile.MonthlySenior * 12,
          regular: profile.Monthly * 12,
        };
      }

      if (Object.keys(sortedPriceData.cheapestProfile).length === 0) {
        sortedPriceData.cheapestProfile = {
          student: profile.AnnualStudent,
          senior: profile.MonthlySenior * 12,
          regular: profile.Monthly * 12,
          shareCode: profile.ShareCode,
        };
      } else if (
        sortedPriceData.cheapestProfile.regular >
        profile.Monthly * 12
      ) {
        sortedPriceData.cheapestProfile = {
          student: profile.AnnualStudent,
          senior: profile.MonthlySenior * 12,
          regular: profile.Monthly * 12,
          shareCode: profile.ShareCode,
        };
      }
    }

    //student === senior, missing 33%
    if (Object.keys(sortedPriceData.ravKavPrice).length === 0) {
      sortedPriceData.ravKavPrice = {
        student:
          price.totalCreditValue33 * numDays +
          price.totalCreditValue33For2Rides * numBackAndForthDays,
        student50:
          price.totalCreditValue50 * numDays +
          price.totalCreditValue50For2Rides * numBackAndForthDays,
        senior:
          price.totalCreditValue50 * numDays +
          price.totalCreditValue50For2Rides * numBackAndForthDays,
        regular:
          price.totalCreditValue25 * numDays +
          price.totalCreditValue25For2Rides * numBackAndForthDays,
      };
    } else {
      sortedPriceData.ravKavPrice = {
        student:
          (sortedPriceData.ravKavPrice.student +
            price.totalCreditValue33 * numDays +
            price.totalCreditValue33For2Rides * numBackAndForthDays) /
          2,
        student50:
          (sortedPriceData.ravKavPrice.student50 +
            price.totalCreditValue50 * numDays +
            price.totalCreditValue50For2Rides * numBackAndForthDays) /
          2,
        senior:
          (sortedPriceData.ravKavPrice.senior +
            price.totalCreditValue50 * numDays +
            price.totalCreditValue50For2Rides * numBackAndForthDays) /
          2,
        regular:
          (sortedPriceData.ravKavPrice.regular +
            price.totalCreditValue25 * numDays +
            price.totalCreditValue25For2Rides * numBackAndForthDays) /
          2,
      };
    }

    //student === senior, missing 33%
    if (Object.keys(sortedPriceData.ravPassPrice).length === 0) {
      sortedPriceData.ravPassPrice = {
        student:
          price.totalMotPrice33 * numDays +
          price.totalMot2Rides33 * numBackAndForthDays,
        senior:
          price.totalMotPrice50 * numDays +
          price.totalMot2Rides50 * numBackAndForthDays,
        regular:
          price.totalMotPrice * numDays +
          price.totalMot2Rides * numBackAndForthDays,
      };
    } else {
      sortedPriceData.ravPassPrice = {
        student:
          (sortedPriceData.ravPassPrice.student +
            price.totalMotPrice33 * numDays +
            price.totalMot2Rides33 * numBackAndForthDays) /
          2,
        senior:
          (sortedPriceData.ravPassPrice.student +
            price.totalMotPrice50 * numDays +
            price.totalMot2Rides50 * numBackAndForthDays) /
          2,
        regular:
          (sortedPriceData.ravPassPrice.student +
            price.totalMotPrice * numDays +
            price.totalMot2Rides * numBackAndForthDays) /
          2,
      };
    }
  }
  return sortedPriceData;
}

export function createSortedProfiles(profiles) {
  let sortable = [];
  for (let key of Object.keys(profiles)) {
    sortable.push([key, profiles[key].regular]);
  }
  sortable.sort(function (a, b) {
    return a[1] - b[1];
  });
  return Array.from(sortable, (x) => x[0]);
}

export function getTempYearlyProfile(trips, profileType) {
  const tempFirstCheapestShareCode = trips[0].cheapestProfile.shareCode;
  let tempYearlyProfile = {};
  if (
    trips.every(
      (trip) => trip.cheapestProfile.shareCode === tempFirstCheapestShareCode
    )
  ) {
    tempYearlyProfile = {
      shareCode: trips[0].cheapestProfile.shareCode,
      price: trips[0].cheapestProfile[profileType],
    };
  } else {
    const tempFirstAllProfiles = createSortedProfiles(trips[0].allProfiles);
    for (const profile of tempFirstAllProfiles) {
      if (
        trips.every((trip) => Object.keys(trip.allProfiles).includes(profile))
      ) {
        tempYearlyProfile = {
          shareCode: profile,
          price: trips[0].allProfiles[profile][profileType],
        };
        break;
      }
    }
  }
  return tempYearlyProfile;
}

export function getComplexPrices(trips, profileType, sharedProfile) {
  // PER PROFILE CREATE PROFILE+RAVPASS ==> take profile, remove all trips that have this profile
  // write profile + price. remaining trips -> add new line with remaining rav pass price (add sum?)
  let complexPrices = []; // [{shareCode, shareCodePrice, ravPassPrice}]
  let allProfileCodes = {};

  for (const trip of trips) {
    for (const profile of Object.keys(trip.allProfiles)) {
      if (
        profile !== sharedProfile &&
        !Object.keys(allProfileCodes).includes(profile) &&
        parseInt(trip.allProfiles[profile][profileType]) !== 0
      ) {
        allProfileCodes[profile] = trip.allProfiles[profile][profileType];
      }
    }
  }

  for (const profileCode of Object.keys(allProfileCodes)) {
    let relevantTrips = trips.filter(
      (trip) => !Object.keys(trip.allProfiles).includes(profileCode)
    );
    complexPrices.push({
      shareCode: profileCode,
      shareCodePrice: allProfileCodes[profileCode],
      ravPassPrice:
        applyMotDiscount(
          relevantTrips.reduce((a, b) => a + b.ravPassPrice[profileType], 0)
        ) * 12,
      ravKavPrice:
        relevantTrips.reduce((a, b) => a + b.ravKavPrice["student50"], 0) * 12,
    });
  }

  return complexPrices;
}

export function normalize(num) {
  return (Math.round(num * 100) / 100).toFixed(0);
}
