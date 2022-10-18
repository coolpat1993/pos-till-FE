const delAlldrinks = async () => {
    const data = await getDocs(collection(db, `${userName}/items/drinks`));
    setdrinks(data.docs.map((docu) => (deleteDoc(doc(db, `${userName}/items/drinks`, docu.id)))));

};