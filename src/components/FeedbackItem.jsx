import { FaTimes, FaEdit } from "react-icons/fa";
import { useState, useContext } from "react";

import PropTypes from "prop-types";
import FeedbackContext from "../context/FeedbackContext";
function FeedbackItem({ item }) {
  const {
    dltFeedback,
    editFeedback,
    feedbackEdit,
    ip,
    deleting,
    setOnSubmit,
    onSubmit,
    setReview,
  } = useContext(FeedbackContext);
  console.log(ip);
  return (
    <div className={`review-item ${deleting === item.id && "deleting"}`}>
      <div className="num-display">{item.rating}</div>
      {item.ip === ip && (
        <>
          <button
            className="close"
            onClick={() => {
              dltFeedback(item.id);
            }}
          >
            <FaTimes />
          </button>

          <button
            className="edit"
            onClick={() => {
              setOnSubmit(false);
              editFeedback(item);
              setReview(false);
            }}
          >
            <FaEdit />
          </button>
        </>
      )}

      <div className="text-display">{item.text}</div>
    </div>
  );
}
FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default FeedbackItem;
