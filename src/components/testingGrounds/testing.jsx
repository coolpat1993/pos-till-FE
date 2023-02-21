import React from "react";
import { useQuery } from 'react-query';

import { db } from '../../firebase-config';
import {
    collection,
    getDocs,

} from 'firebase/firestore';

let docLink = `ncdemo@demo.com/Window 2/drinks`;

const getItems = async (docLink) => {
    const data = await getDocs(collection(db, docLink));
    // setitems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    console.log('i have fetched data')
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

const Testing = () => {
    const { isLoading, isError, data } = useQuery(['items', docLink], () => getItems(docLink));
    console.log(data)
    // setitems(data)
    if (isError) {
        return <p>There was an error</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>items</h2>
        </div>
    )

};

export default Testing;