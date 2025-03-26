import React, { useEffect } from "react";
import DataTable from "./table";
import { useQuery } from "@apollo/client";
import { GET_MY_PURCHASE } from "../../Graphql/Queries";

const Purchasehistory = () => {
  const { data, loading } = useQuery(GET_MY_PURCHASE);
console.log(data,"<======data")
  return (
    <>
      <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
        <div className="main__inner">
          <div className="page__heading">
            <h1> Purchase History </h1>
          </div>
          <DataTable />
        </div>
      </main>
    </>
  );
};

export default Purchasehistory;
