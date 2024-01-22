import { db, storage } from "@/config/firebase";
import { createCategory } from "@/redux/slices/categories";
import { createProducts } from "@/redux/slices/products";
import { createUsers } from "@/redux/slices/users";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const searchCollection = async (searchTerm, collectionName) => {
  const ref = collection(db, collectionName);
  const q = query(
    collection(db, collectionName),
    where("name", ">=", searchTerm),
    where("name", "<=", searchTerm + "\uf8ff")
  );
  try {
    const querySnapshot = await getDocs(q);
    const searchData = [];

    querySnapshot.forEach((doc) => {
      searchData.push(doc.data());
    });

    return searchData;
  } catch (error) {
    console.error("Error searching products:", error);
  }
};

export const getDataByCategory = async (data, dispatch) => {
  const q = query(
    collection(db, "products"),
    where("category", "==", data),
    orderBy("createdAt", "asc")
  );
  try {
    const querySnapshot = await getDocs(q);
    const categoryData = [];

    querySnapshot.forEach((doc) => {
      categoryData.push(doc.data());
    });

    console.log(categoryData);

    dispatch(createProducts(categoryData));
  } catch (error) {
    console.error("Error searching products:", error);
  }
};

export const getDataByCollection = async (name, dispatch) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, name),
      orderBy("createdAt", "asc")
    );
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    documents.slice(0, 2);

    if (!documents) {
      return;
    }
    if (name == "products") {
      dispatch(createProducts(documents));
    } else if (name == "categories") {
      dispatch(createCategory(documents));
    } else if (name == "users") {
      dispatch(createUsers(documents));
    }
  } catch (error) {
    console.error("Error fetching documents: ", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    if (id) {
      const productsDocRef = doc(db, "products", id);

      // Get the document snapshot
      const productDocSnapshot = await getDoc(productsDocRef);

      // Check if the document exists
      if (productDocSnapshot.exists()) {
        // Extract user data from the snapshot
        const productData = productDocSnapshot.data();
        return productData;
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
export const editBanner = async (img, mainText, subText, btn) => {
  const id = "PAl1q2X2TKB6gBuWkVbh";

  try {
    // Step 1: Upload the image to Firebase Storage
    const storageRef = ref(storage, `bannerImages/${img.name}`);
    const uploadTask = uploadBytesResumable(storageRef, img);
    await uploadTask;

    // Get the download URL of the uploaded image
    const imageRef = ref(storage, `bannerImages/${img.name}`);
    const imageUrl = await getDownloadURL(imageRef);

    // Step 2: Save the additional product data to Firestore
    const productCollectionRef = doc(db, "bannerInfo", id);
    const productDocRef = await updateDoc(productCollectionRef, {
      mainText: mainText,
      subText: subText,
      btn: {
        name: btn.name,
        path: `/${btn.path}`,
      },
      createdAt: new Date().toISOString(),
    });

    // Step 3: Update the Firestore document with the image URL
    const productDoc = doc(db, "bannerInfo", id);
    await setDoc(
      productDoc,
      {
        ...{ mainText, subText, btn },
        imageURL: imageUrl,
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error saving product with image: ", error);
    return null;
  }
};

export const getBannerInfo = async () => {
  const id = "PAl1q2X2TKB6gBuWkVbh";
  try {
    if (id) {
      const bannerDocRef = doc(db, "bannerInfo", id);

      // Get the document snapshot
      const bannerDocSnapshot = await getDoc(bannerDocRef);

      // Check if the document exists
      if (bannerDocSnapshot.exists()) {
        // Extract user data from the snapshot
        const bannerData = bannerDocSnapshot.data();
        return bannerData;
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

export const addAddress = async (
  id,
  street,
  street2,
  postCode,
  city,
  country
) => {
  try {
    if (id) {
      const docRef = doc(db, "users", id);
      const colRef = collection(docRef, "addresses");
      await addDoc(colRef, {
        street: street,
        street2: street2,
        postCode: postCode,
        city: city,
        country: country,
      })
        .then((res) => {
          updateDoc(doc(colRef, res.id), {
            uid: res.id,
          });
        })
        .then(() => {
          const userRef = doc(db, "users", id);
          updateDoc(userRef, {
            addresses: increment(1),
          });
        });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getUserAddresses = async (id, dispatch) => {
  try {
    if (id) {
      const docRef = doc(db, "users", id);
      const colRef = collection(docRef, "addresses");
      const querySnapshot = await getDocs(colRef);
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (!documents) {
        return;
      }

      return documents;
    }
  } catch (error) {
    console.error("Error fetching documents: ", error);
    throw error;
  }
};

export const deleteUserAddress = async (id, addressId) => {
  try {
    const docRef = doc(db, "users", id);
    const colRef = collection(docRef, "addresses");
    deleteDoc(doc(colRef, addressId)).then(() => {
      updateDoc(docRef, {
        addresses: increment(-1),
      });
    });
  } catch (error) {
    console.error("Error fetching documents: ", error);
    throw error;
  }
};

export const searchUserByUsername = async (search) => {
  const q = query(
    collection(db, "users"),
    where("fName", "==", search.toLowerCase())
  );

  try {
    // Execute the query
    const querySnapshot = await getDocs(q);

    // Map the query snapshot to an array of user objects
    const users = querySnapshot.docs.map((doc) => doc.data());

    return users;
  } catch (error) {
    console.error("Error searching for users:", error.message);
    throw error;
  }
};

export const searchProducts = async (search) => {
  const q = query(collection(db, "products"), where("name", ">=", search));

  try {
    // Execute the query
    const querySnapshot = await getDocs(q);

    // Map the query snapshot to an array of user objects
    const products = querySnapshot.docs.map((doc) => doc.data());

    return products;
  } catch (error) {
    console.error("Error searching for users:", error.message);
    throw error;
  }
};
export const mainSearch = async (search, dispatch) => {
  const q = query(collection(db, "products"), where("name", ">=", search));

  try {
    // Execute the query
    const querySnapshot = await getDocs(q);

    // Map the query snapshot to an array of user objects
    const products = querySnapshot.docs.map((doc) => doc.data());

    dispatch(createProducts(products));
  } catch (error) {
    console.error("Error searching for users:", error.message);
    throw error;
  }
};

export const getProductReviews = async (id) => {
  try {
    if (id) {
      const docRef = doc(db, "products", id);
      const colRef = collection(docRef, "reviews");
      const querySnapshot = await getDocs(colRef);
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (!documents) {
        return;
      }

      return documents;
    }
  } catch (error) {
    console.error("Error fetching documents: ", error);
    throw error;
  }
};
