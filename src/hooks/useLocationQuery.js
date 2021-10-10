import { useQuery } from "react-query";

export default function useArticlesQuery({ locQuery }) {
  return useQuery([`/geocode`, { locale: "he", query: locQuery }]);
}
