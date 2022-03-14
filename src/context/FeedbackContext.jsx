import { useState, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import feedbackData from "../Data/FeedbackData";
const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      rating: 10,
      text: "This is feedback item 1 coming from the backend",
    },
    {
      id: 2,
      rating: 8,
      text: "This is feedback item 2 coming from the backend",
    },
    {
      text: "This is feedback item 3 coming from the backend",
      rating: 10,
      id: 3,
    },
  ]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });
  //   delt feedback
  const dltFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      setFeedback(feedback.filter((feedback) => feedback.id !== id));
    }
  };
  // add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };
  // set item edited
  const editFeedback = (item) => {
    setFeedbackEdit({ item, edit: true });
  };
  const updateFeedback = (id, updItem) => {
    console.log(id, updItem);
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  };
  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        addFeedback,
        dltFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
