import { auth, db } from "@/config/firebase";
import { loginUser, logoutUser } from "@/redux/slices/user";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const createUser = async (email, password, fName, lName) => {
  try {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => signInWithEmailAndPassword(auth, email, password))
      .then((res) => {
        setDoc(doc(db, "users", res.user.uid), {
          fName: fName,
          lName: lName,
          email: email,
          role: "user",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          uid: res.user.uid,
        });
      });
  } catch (err) {
    alert(err);
  }
};

export const signinUser = async (email, password) => {
  try {
    signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert(err);
  }
};

export const signoutUser = (dispatch) => {
  signOut(auth).then(() => {
    dispatch(logoutUser());
  });
};

export const ListenForUser = (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      getDoc(doc(db, "users", user.uid)).then((res) => {
        const userData = res.data();

        dispatch(
          loginUser({
            fName: userData?.fName,
            lName: userData?.lName,
            email: userData?.email,
            role: userData?.role,
            uid: userData?.uid,
            phoneNo: userData?.phoneNo,
          })
        );
      });
    }
  });
};

export const getUserById = async (id) => {
  try {
    if (id) {
      const userDocRef = doc(db, "users", id);

      // Get the document snapshot
      const userDocSnapshot = await getDoc(userDocRef);

      // Check if the document exists
      if (userDocSnapshot.exists()) {
        // Extract user data from the snapshot
        const userData = userDocSnapshot.data();
        return userData;
      } else {
        // User not found
        console.log(`User with ID ${id} not found`);
        return null;
      }
    }
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
};
