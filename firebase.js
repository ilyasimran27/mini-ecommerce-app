import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGd50UeyRFaFwEFgtaq6q7uVaixDscsMY",
  authDomain: "puzzleapp-b159a.firebaseapp.com",
  projectId: "puzzleapp-b159a",
  storageBucket: "puzzleapp-b159a.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "1:121233244203:android:c222d2db868b07c670ea6e",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
let auth;
try {
  const ReactNativeAsyncStorage =
    require("@react-native-async-storage/async-storage").default;
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
  console.log("Firebase Auth initialized with AsyncStorage persistence");
} catch (error) {
  console.warn("AsyncStorage not available, using memory persistence");

  const { getAuth } = require("firebase/auth");
  auth = getAuth(app);
}

export { auth };
export default app;
