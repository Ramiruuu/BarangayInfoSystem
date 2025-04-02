// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDoc, addDoc, onSnapshot, updateDoc, orderBy, query } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAbTB6NDiFYDt__qEDun7IRZlJ6zP3hIHc",
    authDomain: "barangaydigitalmanagementsys.firebaseapp.com",
    projectId: "barangaydigitalmanagementsys",
    storageBucket: "barangaydigitalmanagementsys.firebasestorage.app",
    messagingSenderId: "1077188180614",
    appId: "1:1077188180614:web:10a3adc37391d65f47ef07",
    measurementId: "G-1KG8YLSG69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Registration
function registerUser(email, password, role = 'resident') {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setDoc(doc(db, 'users', user.uid), {
                email: email,
                role: role,
                created_at: new Date()
            }).then(() => {
                alert('Registration successful! Please login.');
                window.location.href = 'login.html';
            });
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
}

// Login
function loginUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            getDoc(doc(db, 'users', user.uid)).then((docSnap) => {
                if (docSnap.exists()) {
                    const role = docSnap.data().role;
                    window.location.href = role === 'admin' ? 'admin.html' : 'dashboard.html';
                }
            });
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
}

// Logout
function logoutUser() {
    signOut(auth).then(() => {
        window.location.href = 'index.html';
    });
}

// Check auth state
onAuthStateChanged(auth, (user) => {
    if (user) {
        const currentPage = window.location.pathname.split('/').pop();
        getDoc(doc(db, 'users', user.uid)).then((docSnap) => {
            const role = docSnap.data().role;
            if (currentPage === 'dashboard.html' && role !== 'resident') {
                window.location.href = 'index.html';
            } else if (currentPage === 'admin.html' && role !== 'admin') {
                window.location.href = 'index.html';
            }
        });
    } else if (!['index.html', 'login.html', 'register.html'].includes(window.location.pathname.split('/').pop())) {
        window.location.href = 'index.html';
    }
});

// Export functions for use in other files (if needed)
export { auth, db, registerUser, loginUser, logoutUser };