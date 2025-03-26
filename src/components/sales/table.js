import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { GET_MY_SALES } from "../../Graphql/Queries";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "Product Name",
    headerName: "Product Name",
    width: 130,
    valueGetter: (params) => params?.row?.product?.title,
  },
  {
    field: "Product Description",
    headerName: "Product Description",
    width: 130,
    valueGetter: (params) => params?.row?.product?.description,
  },
  {
    field: "Product Price",
    headerName: "Product Price",
    width: 130,
    valueGetter: (params) => params?.row?.product?.price,
  },
  {
    field: "Product Status",
    headerName: "Product Status",
    width: 130,
    valueGetter: (params) => params?.row?.product?.status,
  },
  {
    field: "Product Images",
    headerName: "Product Images",
    width: 200,
    height: 200,
    renderCell: (params) => {
      const imageUrl = params.row?.product?.productImages[0]?.url;
      if (imageUrl) {
        return (
          <Image
            src={imageUrl}
            alt={params?.row?.product?.title}
            width={50}
            height={100}
            className="img-rounded h-full p-1"
          />
        );
      }
    },
  },
];

export default function DataTable(props) {
  const { data, loading } = useQuery(GET_MY_SALES);
  console.log(data, "<======data");

  return (
    <>
      {loading && <div className="loader" />}

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          className="dark:!text-white/90 "
          rows={data?.getSales ?? []}
          columns={columns}
        />
      </div>
    </>
  );
}
