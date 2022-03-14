import React from "react";
import { useContext } from "react";
import FeedbackItem from "./FeedbackItem";
import FeedbackContext from "../context/FeedbackContext";
import { motion, AnimatePresence, animate } from "framer-motion";
function FeedbackList({ handleDlt }) {
  const { feedback, loading } = useContext(FeedbackContext);
  if (!loading && (!feedback || feedback.length === 0)) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      {loading ? (
        <div class="spinner">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : (
        <div className="feedback-list">
          <AnimatePresence>
            {feedback.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FeedbackItem item={item} handleDlt={handleDlt} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </>
  ); 
}

export default FeedbackList;
