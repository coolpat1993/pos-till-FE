import React from 'react';
import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
async function Categories() {
  const docRef = doc(db, `ggg@hotmail.com/items/drinks`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }
}

export default Categories;
