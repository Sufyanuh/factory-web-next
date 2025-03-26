import React from "react";
import { useCurrentuser } from "../../../app/hook";
import SideBar from "../../../app/sideBar";
import ShopProductFilter from "../../../components/shop/ShopProductFiter";

const FilterShopProduct = () => {
  const { data: user } = useCurrentuser();
  return (
    <>
      <SideBar user={user?.currentUser} />;
      <ShopProductFilter />
    </>
  );
};

export default FilterShopProduct;
