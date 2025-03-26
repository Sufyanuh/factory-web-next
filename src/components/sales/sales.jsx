import React from "react";
import DataTable from "./table";

const Saleshistory = () => {
  return (
    <>
      <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
        <div className="main__inner">
          <div className="page__heading">
            <h1> Sales History </h1>
          </div>
          <DataTable />
        </div>
      </main>
    </>
  );
};

export default Saleshistory;
