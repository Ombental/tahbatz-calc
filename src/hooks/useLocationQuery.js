import { useQuery } from "react-query";

export default function useLocationQuery({ locQuery }) {
  return useQuery([`/geocode`, { locale: "he", query: locQuery }]);
}
