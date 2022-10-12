import React from "react";
import { db } from "../../firebase-config";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";

function ListsOfItems() {
  const { user } = UserAuth();
  let userName = user.email;
  const [items, setItems] = useState();

  useEffect(() => {
    const getItems = async () => {
      const data = await getDocs(collection(db, `${userName}/items/drinks`));
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log("warning for if this is running too many times");
    };

    getItems();
  }, [userName]);
  console.log(items);

  return <div>listsOfItems</div>;
}

export default ListsOfItems;
