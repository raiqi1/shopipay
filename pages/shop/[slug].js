import React from "react";
import User from "../../models/User";
import db from "../../utils/db";
import Product from "../../models/Product";
export default function shop({ shops,products }) {
  console.log("shops", shops);
  console.log("products", products);
  
  return (
    <div>
      <h1>Shop</h1>
      <h1>{shops.name}</h1>
    </div>
  );
}
export async function getServerSideProps(context) {
  const { query,req } = context;
  const { slug } = query;
  const {shopId} = req.body
  db.connectDb();
  const shop = await User(shopId);
  const products = await Product(shopId)

  db.disconnectDb();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      shops: JSON.parse(JSON.stringify(shop)),
    },
  };
}
