import { useQuery } from "react-query";
import axios from "axios";

async function fetchPriceCalc({ queryKey }) {
  console.log(queryKey);
  const { data } = await axios.post(queryKey[0], queryKey[1]);
  return data;
}

export default function usePriceCalcQuery({ requestBody }) {
  console.log("request is");
  console.log(requestBody);
  return useQuery(
    [`/pricecalc`, { lang: "he", os: "browser", ...requestBody }],
    fetchPriceCalc
  );
}
