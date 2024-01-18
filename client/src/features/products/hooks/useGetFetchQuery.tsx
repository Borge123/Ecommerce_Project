import { useQueryClient } from "react-query";
export const UseGetFetchQuery = (name) => {
  //custom hook that can be used to access querydata

  const queryClient = useQueryClient();

  return queryClient.getQueryData(name);
};
