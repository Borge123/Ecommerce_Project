import { matchSorter } from "match-sorter";
import { queryClient } from "../../../context/queryProvider";
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  //TODO set up match sorter to get sorted results from queryClient
  //return { products, q };
}
