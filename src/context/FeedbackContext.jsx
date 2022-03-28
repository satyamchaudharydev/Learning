import { useEffect } from "react";
import { useState, createContext } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [review, setReview] = useState(false);
  const [onSubmit, setOnSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const [feedback, setFeedback] = useState([]);
  const [ip, setIp] = useState("");
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });
  useEffect(() => {
    getId();
    getFeedback();
  }, []);
  const getId = async () => {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    // setIp(data.ip);
    const res = await fetch(
      `https://ipinfo.io/${data.ip}/?token=9e779e34f9ee46`
    );
    const json = await res.json();
    setIp(json.loc.split(",").join(""));
  };
  const getFeedback = async () => {
    // get item from firebase
    const feedbacksRef = collection(db, "feedbacks");
    // convert to array
    const feedbackSnap = await getDocs(feedbacksRef);
    const feedbacksArray = feedbackSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // set state
    setFeedback(feedbacksArray);
    setLoading(false);
  };
  const dltFeedback = async (id) => {
    setDeleting(id);
    // get item from firebase
    const feedbacksRef = doc(db, "feedbacks", id);
    // delete item
    await deleteDoc(feedbacksRef);
    setDeleting(null);
    setFeedback(feedback.filter((feedback) => feedback.id !== id));
  };
  const editFeedback = async (item) => {
    console.log(item);
    setFeedbackEdit({ item, edit: true });
  };
  const updateFeedback = async (id, newFeedback) => {
    // get item from firebase
    const feedbacksRef = doc(db, "feedbacks", id);
    // update item
    await updateDoc(feedbacksRef, newFeedback);
    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, ...newFeedback } : item
      )
    );
  };
  const addFeedback = async (newFeedback) => {
    const addedDoc = await addDoc(collection(db, "feedbacks"), newFeedback);
    setFeedback([...feedback, { ...newFeedback, id: addedDoc.id }]);
  };

  return (
    <FeedbackContext.Provider
      value={{
        ip,
        onSubmit,
        setOnSubmit,
        loading,
        feedback,
        addFeedback,
        dltFeedback,
        editFeedback,
        feedbackEdit,
        deleting,
        updateFeedback,
        review,
        setReview,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
