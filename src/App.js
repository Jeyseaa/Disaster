import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Loginpage from './components/Loginpage';
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Import Firestore

// Initialize Firebase app
const firebaseConfig = {
  apiKey: "AIzaSyCZNzV46ZpxIPOZIsBoAzOpnl6mdyCP_RM",
  authDomain: "disaster-76d62.firebaseapp.com",
  databaseURL: "https://disaster-76d62-default-rtdb.firebaseio.com",
  projectId: "disaster-76d62",
  storageBucket: "disaster-76d62.appspot.com",
  messagingSenderId: "208851692863",
  appId: "1:208851692863:web:e5e654aceb8dec4ee1778a",
  measurementId: "G-F0WTCPNT87"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp); // Initialize Firestore

function App() {
  
  // Function to add a document to Firestore
  const addDocumentToFirestore = async (data) => {
    try {
      const docRef = await addDoc(collection(firestore, "users"), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* Pass firestore instance to Loginpage */}
          <Route path="/login" element={<Loginpage firebaseApp={firebaseApp} auth={auth} firestore={firestore} addDocumentToFirestore={addDocumentToFirestore} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
