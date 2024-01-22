import { db } from "@/config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const AddReview = async (id, review, userId) => {
  try {
    if (id) {
      const docRef = doc(db, "products", id);
      const colRef = collection(docRef, "reviews");
      await addDoc(colRef, {
        userId: userId,
        review: review,
        likes: "0",
        comments: "0",
      })
        .then((res) => {
          updateDoc(doc(colRef, res.id), {
            uid: res.id,
          });
        })
        .then(async () => {
          const productRef = doc(db, "products", id);
          updateDoc(productRef, {
            reviews: increment(1),
          });
        });
    }
  } catch (err) {
    console.log(err);
  }
};
export const removeReview = async (id, reviewId) => {
  try {
    if (reviewId) {
      const docRef = doc(db, "products", id, "reviews", reviewId);
      await deleteDoc(docRef);
    }
  } catch (err) {
    console.log(err);
  }
};

export const addReviewLike = async (productId, userId, reviewId, setLike) => {
  const reviewRef = doc(db, "products", productId, "reviews", reviewId);
  const userCollection = collection(
    db,
    "products",
    productId,
    "reviews",
    reviewId,
    "likes"
  );
  const userRef = doc(userCollection, userId);

  try {
    // Get the current state of the review
    const reviewSnapshot = await getDoc(reviewRef);
    const reviewData = reviewSnapshot.data();

    const likeRef = await getDoc(userRef);
    const userData = likeRef.data();

    if (!reviewData) {
      console.error("Review not found");
      return;
    }

    // Check if the user has already liked the review
    if (userData != userId) {
      // User hasn't liked the review yet, proceed with liking

      // Update the review with the like and increment the likes field
      await updateDoc(reviewRef, {
        likes: increment(1), // Increment the likes field by 1
      });

      // Create a sub-collection for user likes

      // Store the user ID document in the sub-collection

      await setDoc(userRef, {
        timestamp: serverTimestamp(),
        uid: userId,
      });
    } else {
      // User has already liked the review, handle this case accordingly
      console.log("User already liked the review");
    }
  } catch (error) {
    console.error("Error liking the review:", error);
  }
};

export const removeReviewLike = async (
  productId,
  userId,
  reviewId,
  setLike
) => {
  const reviewRef = doc(db, "products", productId, "reviews", reviewId);
  const userCollection = collection(
    db,
    "products",
    productId,
    "reviews",
    reviewId,
    "likes"
  );
  const userRef = doc(userCollection, userId);

  try {
    // Get the current state of the review
    const reviewSnapshot = await getDoc(reviewRef);
    const reviewData = reviewSnapshot.data();

    const likeRef = await getDoc(userRef);
    const userData = likeRef.data();

    if (!reviewData) {
      console.error("Review not found");
      return;
    }

    // Check if the user has already liked the review
    if (userData != userId) {
      // User hasn't liked the review yet, proceed with liking

      // Update the review with the like and increment the likes field
      await updateDoc(reviewRef, {
        likes: increment(-1), // Increment the likes field by 1
      });

      // Create a sub-collection for user likes

      // Store the user ID document in the sub-collection

      await deleteDoc(userRef, {
        timestamp: serverTimestamp(),
        uid: userId,
      });
    } else {
      // User has already liked the review, handle this case accordingly
      console.log("User already liked the review");
    }
  } catch (error) {
    console.error("Error liking the review:", error);
  }
};

export const isUserLiked = async (productId, userId, reviewId, setLike) => {
  const userCollection = collection(
    db,
    "products",
    productId,
    "reviews",
    reviewId,
    "likes"
  );
  const userRef = doc(userCollection, userId);

  try {
    const likeRef = await getDoc(userRef);
    const userData = likeRef.data();

    if (userData) {
      setLike(true);
    } else {
      setLike(false);
    }
  } catch (e) {
    console.log(e);
  }
};

export const addReviewComment = async (
  productId,
  userId,
  reviewId,
  comment
) => {
  const reviewRef = doc(db, "products", productId, "reviews", reviewId);
  const commentsCollection = collection(
    db,
    "products",
    productId,
    "reviews",
    reviewId,
    "comments"
  );

  try {
    // Get the current state of the review
    const reviewSnapshot = await getDoc(reviewRef);
    const reviewData = reviewSnapshot.data();

    if (!reviewData) {
      console.error("Review not found");
      return;
    }

    // Check if the user has already liked the review

    // User hasn't liked the review yet, proceed with liking

    // Update the review with the like and increment the likes field
    await updateDoc(reviewRef, {
      comments: increment(1), // Increment the likes field by 1
    });

    // Create a sub-collection for user likes

    // Store the user ID document in the sub-collection

    await addDoc(commentsCollection, {
      timestamp: serverTimestamp(),
      userId: userId,
      comment: comment,
    });
  } catch (error) {
    console.error("Error liking the review:", error);
  }
};

export const getReviewCommentsById = async (productId, reviewId) => {
  try {
    if (productId) {
      const docRef = doc(db, "products", productId);
      const colRef = collection(docRef, "reviews", reviewId, "comments");
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
