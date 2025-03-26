import React from "react";
import Shopindex from "../../components/shop";
import SideBar from "../../app/sideBar";
// import { useParams } from "react-router-dom";
// import ShopProductFilter from "../../components/shop/ShopProductFiter";
import { useCurrentuser } from "../../app/hook";

const Shop = () => {
    const { data: user } = useCurrentuser();
    console.log(user, "<<<<<=user");
    //   const { category } = useParams();
    return (
        <>
            <div id="wrapper">
                <SideBar user={user?.currentUser} />
                <Shopindex />
                {/* {category === undefined ? <Shopindex /> : <ShopProductFilter />} */}
            </div>
        </>
    );
};

export default Shop;
