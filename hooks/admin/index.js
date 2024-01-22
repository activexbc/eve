import { db, storage } from "@/config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

export const addCategory = async (category, img) => {
  try {
    // Step 1: Upload the image to Firebase Storage
    const storageRef = ref(storage, `categoryImages/${img.name}`);
    const uploadTask = uploadBytesResumable(storageRef, img);
    await uploadTask;

    // Get the download URL of the uploaded image
    const imageRef = ref(storage, `categoryImages/${img.name}`);
    const imageUrl = await getDownloadURL(imageRef);

    // Step 2: Save the additional product data to Firestore
    const productCollectionRef = collection(db, "categories");
    const productDocRef = await addDoc(productCollectionRef, {
      name: category,
      createdAt: new Date().toISOString(),
    });

    // Step 3: Update the Firestore document with the image URL
    const productDoc = doc(db, "categories", productDocRef.id);
    await setDoc(
      productDoc,
      {
        ...{ name: category },
        imageURL: imageUrl,
      },
      { merge: true }
    );

    return productDocRef.id; // Return the ID of the newly created product document
  } catch (error) {
    console.error("Error saving product with image: ", error);
    return null;
  }
};

export const addPostWithImages = async (
  name,
  desc,
  category,
  stock,
  price,
  images
) => {
  try {
    // Step 1: Add post to collection
    const postsCollection = collection(db, "products");
    const postDocRef = await addDoc(postsCollection, {
      name,
      desc,
      category,
      stock,
      price,
      createdAt: new Date().toISOString(),
    });
    const postID = postDocRef.id;

    // Step 2: Upload images to storage and get download URLs
    const imageUrls = [];
    for (const image of images) {
      const storageRef = ref(storage, `images/${postID}/${image.name}`);
      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);
      imageUrls.push(downloadURL);
    }

    // Step 3: Update product document with image URLs
    await updateDoc(postDocRef, { images: imageUrls, id: postDocRef.id });

    console.log("Post and images successfully added!");
  } catch (error) {
    console.error("Error adding post with images: ", error);
    throw error;
  }
};

export const addProduct = async (name, desc, category, stock, price, img) => {
  try {
    // Step 1: Upload the image to Firebase Storage

    // Get the download URL of the uploaded image

    // Step 2: Save the additional product data to Firestore
    const productCollectionRef = collection(db, "products");
    const productDocRef = await addDoc(productCollectionRef, {
      name,
      desc,
      category,
      stock: stock,
      price: price,
      createdAt: new Date().toISOString(),
    });
    const storageRef = ref(storage, `images/${productDocRef.id}/${img.name}`);
    const uploadTask = uploadBytesResumable(storageRef, img);
    await uploadTask;
    const imageRef = ref(storage, `images/${productDocRef.id}/${img.name}`);
    const imageUrl = await getDownloadURL(imageRef);

    // Step 3: Update the Firestore document with the image URL
    const productDoc = doc(db, "products", productDocRef.id);
    await setDoc(
      productDoc,
      {
        ...{ name, desc, category, stock, price },
        imageURL: imageUrl,
        id: productDocRef.id,
      },
      { merge: true }
    );

    return productDocRef.id; // Return the ID of the newly created product document
  } catch (error) {
    console.error("Error saving product with image: ", error);
    return null;
  }
};

export const updateUser = async (id, fName, lName, email, isAdmin) => {
  try {
    if (id) {
      const userDocRef = doc(db, "users", id);

      // Get the document snapshot
      const userDocSnapshot = await updateDoc(userDocRef, {
        fName,
        lName,
        email,
        role: isAdmin == "False" ? "user" : "admin",
      });

      return userDocSnapshot;
    }
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
};

export const updateProduct = async (
  id,
  name,
  desc,
  price,
  stock,
  category,
  img
) => {
  try {
    if (id) {
      // Get the document snapshot
      const productCollectionRef = doc(db, "products", id);
      const productDocRef = await updateDoc(productCollectionRef, {
        name,
        desc,
        category,
        stock: stock,
        price: price,
        updatedAt: new Date().toISOString(),
      });
      // Step 3: Update the Firestore document with the image URL
      if (img) {
        const storageRef = ref(
          storage,
          `images/${productDocRef.id}/${img.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, img);
        await uploadTask;

        // Get the download URL of the uploaded image
        const imageRef = ref(storage, `images/${productDocRef.id}/${img.name}`);
        const imageUrl = await getDownloadURL(imageRef);
        const productDoc = doc(db, "products", id);
        await setDoc(
          productDoc,
          {
            ...{ name, desc, category, stock, price },
            imageURL: imageUrl,
          },
          { merge: true }
        );
      }
    }
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
};

export const removeDoc = async (id, img, name) => {
  try {
    if (img) {
      // Step 1: Upload the image to Firebase Storage
      const fileRef = ref(storage, img);
      deleteObject(fileRef);
    }

    // Step 2: Save the additional product data to Firestore
    const productCollectionRef = doc(db, name, id);
    const productDocRef = deleteDoc(productCollectionRef);
  } catch (error) {
    console.error("Error saving product with image: ", error);
    return null;
  }
};
