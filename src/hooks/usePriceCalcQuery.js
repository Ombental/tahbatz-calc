import { useQuery } from "react-query";

async function fetchPriceCalc({ queryKey }) {
  const { data } = await axios.post(queryKey[0], priceCalcQueryBody);
  return data;
}

export default function usePriceCalcQuery({ priceCalcQueryBody }) {
  return useQuery(
    [`/pricecalc`, { lang: "he", os: "browser", ...priceCalcQueryBody }],
    fetchPriceCalc
  );
}

/*
priceCalcQueryBody
 legs: [
     {
         agencyId: "",
         endTime: 0,
         fromStopCode: "",
         fromZoneId: "",
         route: "",
         routeId: "",
         startTime: 0,
         toStopCode: "",
         toZoneId: ""
     }
 ]
*/
