
const { 
    collection, getDocs, 
    doc, getDoc, query, where, setDoc
} = require('firebase/firestore');

const { v4 }   = require('uuid')
const { hash, compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const saltRounds = 10

const JWT_SECRET = "4129-iqhh23-0wi9efsidnsg-w0ut32ihg-0ewtewhishyt"

async function getAllData(appFirebase, keyString, type = "array"){
    const store  = new Map()
    const dbRef  = collection(appFirebase, keyString)
    const docGet = await getDocs(dbRef)
    const arrayStore = []

    docGet.forEach((snapshot) => {
        if(type === 'array'){
            arrayStore.push({
                id: snapshot.id,
                ...snapshot.data()
            });
        }else{
            store.set(snapshot.id, snapshot.data())
        }
    });
    return type === 'array' ? arrayStore : Object.fromEntries(store.entries())
}

async function getById(appFirestore, keyString, id) {
   try{
        const doct = doc(appFirestore, keyString, id)
        const getDoct = await getDoc(doct)
        return getDoct.data()
   }
   catch(err){
        throw new Error(err?.message)
   }
}

async function login(appFirestore, data) {
    const q = query(collection(appFirestore, "users"), where('email', "==", data?.email))
    const querySnapshot = await getDocs(q)
    const users = []

    querySnapshot.forEach((snapshow)=> {
       users.push(snapshow.data())
    })
    const user = users.find((val) => val.email === data?.email)

    if(user){
        const { email, password, full_name, email_verified_at } = user;
        const hasingPassword =  await compare(data?.password, password);
        if(hasingPassword){
            const payload = sign({
                email,
                full_name,
                email_verified_at
            }, JWT_SECRET, { expiresIn: '12h' })

            return {
                code: 201,
                message: "login success",
                token: payload
            }
        }
        throw new Error('cek email or password')
    }
    throw new Error('User not Found...')
}

async function register(appFirestore, body) {
    const userRef = collection(appFirestore, 'users');
 
    if(!await cekUserWithEmail(userRef, body?.email)){
        const userID  = v4()
        await setDoc(doc(userRef, userID), {
            ...body,  
            id: userID,
            email_verified_at: true,
            password: await hash(body?.password, saltRounds),
            created_at: (new Date()).toUTCString(),
            updated_at: (new Date()).toUTCString(),
        })
        return true;
    }
    throw new Error('email is ready exits...')
}

async function cekUserWithEmail(userRef, email) {
    const user = []
    const cekEmail = query(userRef, where("email", "==", email))
    const doc  = await getDocs(cekEmail);

    doc.forEach((val) => user.push(val.data()))
    return user.length > 0 ? true : false;
}

async function setData(appFirestore, body, key){

    const refData = collection(appFirestore, key);
    const uuidV4 = v4();
    await setDoc(doc(refData, uuidV4), {
        ...body
    });
    return true
}


module.exports = {
    getAllData, getById, 
    login, register, JWT_SECRET, setData
}