import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

async function login(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;
    console.log(user)
    const sessionToken = crypto.randomUUID(); // Unique session token

    // Store the session in Firestore (overwriting any existing session)
    //await setDoc(doc(db, "sessions", user.uid), { sessionToken, timestamp: Date.now() });

    localStorage.setItem("sessionToken", sessionToken);
}

// async function checkSession() {
//     const user = auth.currentUser;
//     console.log("here", user)
//     if (!user) return false;

//     const sessionRef = doc(db, "sessions", user.uid);
//     const sessionSnap = await getDoc(sessionRef);

//     if (sessionSnap.exists() && sessionSnap.data().sessionToken === localStorage.getItem("sessionToken")) {
//         return true;
//     } else {
//         logout(); // Force logout if session is invalid
//         return false;
//     }
// }

async function logout() {
    localStorage.removeItem("sessionToken");
    await signOut(auth);
}

// // Automatically check session when auth state changes
// onAuthStateChanged(auth, async (user) => {
//     console.log(user)
//     if (user) {
//         const validSession = await checkSession();
//         if (!validSession) logout();
//     }

//     return;
// });

export { auth, login, logout };
