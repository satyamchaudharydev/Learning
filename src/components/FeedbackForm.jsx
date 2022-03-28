import { useState, useContext, useEffect } from "react";
import Button from "./shared/Button";
import { AnimatePresence, motion } from "framer-motion";
import Card from "./shared/Card";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

export default function FeedbackForm() {
  const {
    addFeedback,
    updateFeedback,
    feedbackEdit,
    ip,
    setReview,
    onSubmit,
    setOnSubmit,
  } = useContext(FeedbackContext);
  const [err, setError] = useState(false);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [msg, setMsg] = useState("");
  const [submit, setSubmit] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const handleChange = (e) => {
    setText(e.target.value);
    if (!err?.length > 0) {
      setError(false);
    }

    if (text === "") {
      setBtnDisabled(true);
      setMsg(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setBtnDisabled(true);
      setMsg("Must be at least 10 characters");
    } else {
      setBtnDisabled(false);
      setMsg(null);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length === 0) {
      setError(true);
      setMsg("Please enter feedback");
      return;
    }

    setOnSubmit(true);
    // setText("");

    let newFeedback = { text, rating, ip };
    if (feedbackEdit.edit === true) {
      console.log(feedbackEdit);
      updateFeedback(feedbackEdit.item.id, newFeedback);
    } else {
      addFeedback(newFeedback);
    }
    setText("");
  };
  useEffect(() => {
    if (feedbackEdit.edit) {
      console.log(feedbackEdit.item);
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
      console.log(feedbackEdit.item.text, feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);
  return (
    <>
      <p className="text-accent reviews-text" onClick={() => setReview(true)}>
        See all reviews
      </p>

      <Card>
        {!onSubmit && (
          <motion.form
            initial={{ x: submit && "-100%" }}
            animate={{ x: 0 }}
            onSubmit={handleSubmit}
          >
            <div className="logo">
              <img src="/images/icon-star.svg" alt="logo" />
            </div>
            <h2>How did we do?</h2>
            <p className="text-accent paragraph">
              Please let us know how we did with your support request. All
              feedback is appreciated to help us improve our offering!
            </p>
            <RatingSelect
              select={(rating) => setRating(rating)}
              rating={rating}
            />
            <input
              className={` ${err && "input-error"}`}
              type="text"
              value={text}
              onChange={(e) => handleChange(e)}
              placeholder="write a review"
            />
            <button type="submit" className="submit-btn">
              Submit
            </button>
            {/* {msg && <p className="message">{msg}</p>} */}
          </motion.form>
        )}
        {onSubmit && (
          <motion.div
            className="thanksgiving"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
          >
            <div
              className="back-btn"
              onClick={() => {
                setSubmit(true);
                setOnSubmit(!onSubmit);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                width="20"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <img src="/images/illustration-thank-you.svg" alt="thanks" />
            <div className="tq-rating-show">{`You selected ${rating} out of 5 stars`}</div>
            <p className="tq-text" style={{ color: "#fff" }}>
              Thank you
            </p>
            <p className="paragraph text-accent">
              We appreciate you taking the time to give a rating. If you ever
              need more support, don’t hesitate to get in touch!
            </p>
          </motion.div>
        )}
      </Card>
    </>
  );
}
