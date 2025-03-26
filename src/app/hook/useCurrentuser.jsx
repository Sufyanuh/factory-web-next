import { useQuery } from "@apollo/client";
import { USER_CURRENT } from "../../Graphql/Queries";

export const useCurrentuser = () => {
  const data = useQuery(USER_CURRENT);
  return data;
};
