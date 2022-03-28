import { React, useContext } from "react";
import FeedbackList from "./FeedbackList";
import FeedbackStats from "./FeedbackStats";
import FeedbackContext from "../context/FeedbackContext";
import { motion, AnimatePresence } from "framer-motion";
function Reviews() {
  const { review, setReview } = useContext(FeedbackContext);
  return (
    <>
      {review && (
        <motion.div layout className="reviews-container">
          <div className="reviews">
            <button className="close-btn" onClick={() => setReview(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                width="25px"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <FeedbackStats />
            <FeedbackList />
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Reviews;
