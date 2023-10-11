
const { collection, onSnapshot, getDocs }  = require('firebase/firestore');

async function getAllData(appFirebase, keyString){
    const store = [];
    const dbRef = collection(appFirebase, keyString)
    const docGet = await getDocs(dbRef)
    
    docGet.forEach((snapshot) => {
        store.push(snapshot.data())
    });

    return store
}

module.exports = {
    getAllData
}