import firebase from "firebase";
import firebaseConfig from "./auth";

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
